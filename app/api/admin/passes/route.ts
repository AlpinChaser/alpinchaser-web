import { NextResponse } from "next/server";
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

function passNameFromDoc(passId: string, data: DocumentData): string {
  const n =
    (data.name as string | undefined) ??
    (data.title as string | undefined) ??
    (data.displayName as string | undefined);
  if (n && n.trim().length > 0) return n.trim();
  return passId;
}

export async function GET() {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const db = getDb();

    const ridersByPass = new Map<string, Set<string>>();
    const passStateSnap = await db.collectionGroup("pass_states").get();
    for (const doc of passStateSnap.docs) {
      if (!isDrivenPassState(doc.data())) continue;
      const userRef = doc.ref.parent.parent;
      if (!userRef) continue;
      const uid = userRef.id;
      const passId = doc.id;
      if (!ridersByPass.has(passId)) ridersByPass.set(passId, new Set());
      ridersByPass.get(passId)!.add(uid);
    }

    const rideCountByPassId = new Map<string, number>();
    ridersByPass.forEach((set, passId) => {
      rideCountByPassId.set(passId, set.size);
    });

    const passesSnap = await db.collection("passes").get();
    const rows: Array<{ id: string; name: string; rideCount: number }> = [];

    passesSnap.docs.forEach((doc) => {
      rows.push({
        id: doc.id,
        name: passNameFromDoc(doc.id, doc.data()),
        rideCount: rideCountByPassId.get(doc.id) ?? 0,
      });
    });

    rideCountByPassId.forEach((count, passId) => {
      if (rows.some((r) => r.id === passId)) return;
      rows.push({
        id: passId,
        name: passId,
        rideCount: count,
      });
    });

    rows.sort((a, b) => {
      const rc = b.rideCount - a.rideCount;
      if (rc !== 0) return rc;
      return a.name.localeCompare(b.name);
    });

    return NextResponse.json({ passes: rows });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Firestore error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
