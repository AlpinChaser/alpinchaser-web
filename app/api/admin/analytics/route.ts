import { NextResponse } from "next/server";
import * as admin from "firebase-admin";
import type { DocumentData } from "firebase-admin/firestore";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import { getDb } from "@/lib/firebaseAdmin";

const MAX_AUTH_USERS = 1000;

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

function parseAuthTime(value: string | undefined): number | null {
  if (!value) return null;
  const t = Date.parse(value);
  return Number.isNaN(t) ? null : t;
}

function utcDayStartMs(nowMs: number): number {
  const d = new Date(nowMs);
  return Date.UTC(
    d.getUTCFullYear(),
    d.getUTCMonth(),
    d.getUTCDate(),
    0,
    0,
    0,
    0,
  );
}

export async function GET() {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const db = getDb();

    const authUsers: admin.auth.UserRecord[] = [];
    let pageToken: string | undefined;
    while (authUsers.length < MAX_AUTH_USERS) {
      const page = await admin.auth().listUsers(
        Math.min(1000, MAX_AUTH_USERS - authUsers.length),
        pageToken,
      );
      authUsers.push(...page.users);
      pageToken = page.pageToken;
      if (!pageToken) break;
    }

    const cohortIds = new Set(authUsers.map((u) => u.uid));
    const totalUsers = authUsers.length;

    const passStateSnap = await db.collectionGroup("pass_states").get();
    const drivenCountByUid = new Map<string, number>();
    for (const doc of passStateSnap.docs) {
      if (!isDrivenPassState(doc.data())) continue;
      const parent = doc.ref.parent.parent;
      if (!parent) continue;
      const uid = parent.id;
      if (!cohortIds.has(uid)) continue;
      drivenCountByUid.set(uid, (drivenCountByUid.get(uid) ?? 0) + 1);
    }

    let premiumUsers = 0;
    const usersSnap = await db.collection("users").get();
    for (const doc of usersSnap.docs) {
      if (!cohortIds.has(doc.id)) continue;
      const data = doc.data();
      if (data.isPremium === true) premiumUsers += 1;
    }

    const now = Date.now();
    const todayStart = utcDayStartMs(now);
    const todayEnd = todayStart + 86_400_000;
    const weekAgo = now - 7 * 86_400_000;

    let newToday = 0;
    let newThisWeek = 0;
    let activeToday = 0;
    let activeThisWeek = 0;

    for (const u of authUsers) {
      const created = parseAuthTime(u.metadata.creationTime);
      if (created !== null) {
        if (created >= todayStart && created < todayEnd) newToday += 1;
        if (created >= weekAgo) newThisWeek += 1;
      }
      const lastSignIn = parseAuthTime(u.metadata.lastSignInTime);
      if (lastSignIn !== null) {
        if (lastSignIn >= todayStart && lastSignIn < todayEnd) activeToday += 1;
        if (lastSignIn >= weekAgo) activeThisWeek += 1;
      }
    }

    let passSum = 0;
    for (const u of authUsers) {
      passSum += drivenCountByUid.get(u.uid) ?? 0;
    }

    const conversionRate =
      totalUsers > 0
        ? Math.round((premiumUsers / totalUsers) * 10_000) / 100
        : 0;

    const avgPassesPerUser =
      totalUsers > 0
        ? Math.round((passSum / totalUsers) * 100) / 100
        : 0;

    return NextResponse.json({
      totalUsers,
      newToday,
      newThisWeek,
      activeToday,
      activeThisWeek,
      premiumUsers,
      conversionRate,
      avgPassesPerUser,
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Analytics error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
