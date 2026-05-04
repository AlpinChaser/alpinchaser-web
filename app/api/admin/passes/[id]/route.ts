import { NextRequest, NextResponse } from "next/server";
import {
  Timestamp,
  GeoPoint,
  FieldValue,
} from "firebase-admin/firestore";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import { getDb } from "@/lib/firebaseAdmin";

function serializeFirestoreValue(value: unknown): unknown {
  if (value instanceof Timestamp) {
    return value.toDate().toISOString();
  }
  if (value instanceof GeoPoint) {
    return { latitude: value.latitude, longitude: value.longitude };
  }
  if (Array.isArray(value)) {
    return value.map((v) => serializeFirestoreValue(v));
  }
  if (value !== null && typeof value === "object" && !(value instanceof Date)) {
    const obj = value as Record<string, unknown>;
    if (
      typeof (obj as { toDate?: () => Date }).toDate === "function" &&
      "seconds" in obj
    ) {
      try {
        return (obj as { toDate: () => Date }).toDate().toISOString();
      } catch {
        /* fall through */
      }
    }
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(obj)) {
      out[k] = serializeFirestoreValue(v);
    }
    return out;
  }
  return value;
}

const PUT_KEYS = [
  "name",
  "description",
  "mustRide",
  "besteSite",
  "highlights",
  "gefahren",
  "difficulty",
  "region",
  "country",
  "elevation",
  "length",
] as const;

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> | { id: string } },
) {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await Promise.resolve(params);
  if (!id) {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
  try {
    const db = getDb();
    const snap = await db.collection("passes").doc(id).get();
    if (!snap.exists) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    const raw = snap.data();
    if (!raw) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    const data: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(raw)) {
      data[k] = serializeFirestoreValue(v);
    }
    return NextResponse.json({
      id: snap.id,
      ...data,
      adminEditCount:
        typeof data.adminEditCount === "number" ? data.adminEditCount : 0,
      adminLastEditedAt:
        (data.adminLastEditedAt as string | null | undefined) ?? null,
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Firestore error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> | { id: string } },
) {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await Promise.resolve(params);
  if (!id) {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  try {
    const payload: Record<string, unknown> = {};
    for (const key of PUT_KEYS) {
      if (Object.prototype.hasOwnProperty.call(body, key)) {
        const v = body[key];
        if (v === undefined) continue;
        if (key === "difficulty" || key === "elevation" || key === "length") {
          if (v === null) {
            payload[key] = null;
            continue;
          }
          const n = typeof v === "number" ? v : Number(v);
          if (!Number.isFinite(n)) continue;
          payload[key] = n;
          continue;
        }
        if (typeof v === "string" || typeof v === "number" || v === null) {
          payload[key] = v;
        }
      }
    }
    if (Object.keys(payload).length === 0) {
      return NextResponse.json({ error: "No valid fields" }, { status: 400 });
    }
    const db = getDb();
    const ref = db.collection("passes").doc(id);
    const nowIso = new Date().toISOString();
    await db.runTransaction(async (tx) => {
      await tx.get(ref);
      tx.set(
        ref,
        {
          ...payload,
          adminEditCount: FieldValue.increment(1),
          adminLastEditedAt: nowIso,
        },
        { merge: true },
      );
    });
    return NextResponse.json({ success: true });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Firestore error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
