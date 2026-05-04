import { NextResponse } from "next/server";
import * as admin from "firebase-admin";
import type { DocumentData } from "firebase-admin/firestore";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import { getDb } from "@/lib/firebaseAdmin";

function isDrivenPassState(data: DocumentData): boolean {
  const status = String(data.status ?? "")
    .toLowerCase()
    .trim();
  if (status === "gefahren") return true;
  const years = data.drivenYears;
  if (Array.isArray(years) && years.length > 0) return true;
  if (data.drivenUnknown === true) return true;
  return false;
}

function parseJoinMillis(
  authUser: admin.auth.UserRecord | undefined,
  firestoreData: DocumentData | undefined,
): number {
  const fromDoc =
    firestoreData?.joinDate ??
    firestoreData?.joinedAt ??
    firestoreData?.createdAt;
  if (fromDoc && typeof fromDoc === "object" && "toDate" in fromDoc) {
    try {
      return (fromDoc as { toDate: () => Date }).toDate().getTime();
    } catch {
      /* ignore */
    }
  }
  if (typeof fromDoc === "string" && fromDoc.length > 0) {
    const t = Date.parse(fromDoc);
    if (!Number.isNaN(t)) return t;
  }
  const meta = authUser?.metadata?.creationTime;
  if (meta) {
    const t = Date.parse(meta);
    if (!Number.isNaN(t)) return t;
  }
  return 0;
}

export async function GET() {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const db = getDb();

    const passStateSnap = await db.collectionGroup("pass_states").get();
    const drivenCountByUid = new Map<string, number>();
    for (const doc of passStateSnap.docs) {
      if (!isDrivenPassState(doc.data())) continue;
      const parent = doc.ref.parent.parent;
      if (!parent) continue;
      const uid = parent.id;
      drivenCountByUid.set(uid, (drivenCountByUid.get(uid) ?? 0) + 1);
    }

    const usersSnap = await db.collection("users").get();
    const uids = usersSnap.docs.map((d) => d.id);
    const authByUid = new Map<string, admin.auth.UserRecord>();
    const chunkSize = 100;
    for (let i = 0; i < uids.length; i += chunkSize) {
      const slice = uids.slice(i, i + chunkSize);
      const res = await admin.auth().getUsers(slice.map((uid) => ({ uid })));
      for (const u of res.users) {
        authByUid.set(u.uid, u);
      }
    }

    const users = usersSnap.docs.map((doc) => {
      const data = doc.data();
      const authUser = authByUid.get(doc.id);
      const email =
        authUser?.email ?? (data.email as string | undefined) ?? null;
      const username =
        (data.username as string | undefined) ??
        (data.displayName as string | undefined) ??
        null;
      const isPremium =
        typeof data.isPremium === "boolean" ? data.isPremium : false;
      const joinMillis = parseJoinMillis(authUser, data);
      let joinDate: string | null = null;
      if (joinMillis > 0) {
        joinDate = new Date(joinMillis).toISOString();
      } else if (authUser?.metadata?.creationTime) {
        joinDate = new Date(authUser.metadata.creationTime).toISOString();
      }

      return {
        uid: doc.id,
        username,
        email,
        joinDate,
        isPremium,
        passCount: drivenCountByUid.get(doc.id) ?? 0,
        _sort: joinMillis,
      };
    });

    users.sort((a, b) => b._sort - a._sort);

    const payload = users.map(({ _sort: _x, ...u }) => u);

    return NextResponse.json({ users: payload });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Firestore error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
