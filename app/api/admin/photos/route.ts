import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import { getAdminStorageBucket } from "@/lib/firebaseAdmin";

const PATH_RE = /^passes\/([^/]+)\/(user|photos)\/(.+)$/;

function parsePath(name: string): {
  passId: string;
  folder: "user" | "photos";
  fileName: string;
} | null {
  const m = name.match(PATH_RE);
  if (!m) return null;
  return { passId: m[1], folder: m[2] as "user" | "photos", fileName: m[3] };
}

async function readCustomMetadata(
  file: ReturnType<ReturnType<typeof getAdminStorageBucket>["file"]>,
): Promise<Record<string, string>> {
  const [md] = await file.getMetadata();
  const raw = md.metadata ?? {};
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(raw)) {
    if (v === null || v === undefined) continue;
    out[k] = typeof v === "string" ? v : String(v);
  }
  return out;
}

export async function GET() {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const bucket = getAdminStorageBucket();
    const [files] = await bucket.getFiles({
      prefix: "passes/",
      autoPaginate: true,
    });
    type Item = {
      passId: string;
      fileName: string;
      url: string;
      folder: "user" | "photos";
      uploadedAt: string | null;
      adminStatus?: string;
      storagePath: string;
    };
    const items: Item[] = [];

    for (const file of files) {
      const name = file.name;
      const parsed = parsePath(name);
      if (!parsed) continue;
      const custom = await readCustomMetadata(file);
      if ((custom.adminStatus ?? "").toLowerCase() === "rejected") continue;

      const [url] = await file.getSignedUrl({
        action: "read",
        expires: Date.now() + 1000 * 60 * 60 * 24,
      });
      const uploadedAt =
        file.metadata.timeCreated ?? file.metadata.updated ?? null;
      const adminStatus = custom.adminStatus;
      items.push({
        passId: parsed.passId,
        fileName: parsed.fileName,
        url,
        folder: parsed.folder,
        uploadedAt,
        ...(adminStatus ? { adminStatus } : {}),
        storagePath: name,
      });
    }

    items.sort((a, b) => {
      const ta = a.uploadedAt ? new Date(a.uploadedAt).getTime() : 0;
      const tb = b.uploadedAt ? new Date(b.uploadedAt).getTime() : 0;
      return tb - ta;
    });

    return NextResponse.json({ photos: items });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Storage error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  let body: { storagePath?: string; action?: "approve" | "reject" };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const { storagePath, action } = body;
  if (!storagePath || !action || (action !== "approve" && action !== "reject")) {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
  const parsed = parsePath(storagePath);
  if (!parsed) {
    return NextResponse.json({ error: "Invalid path" }, { status: 400 });
  }
  try {
    const bucket = getAdminStorageBucket();
    const file = bucket.file(storagePath);
    const [exists] = await file.exists();
    if (!exists) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const ts = new Date().toISOString();

    if (action === "reject") {
      const meta = await readCustomMetadata(file);
      await file.setMetadata({
        metadata: {
          ...meta,
          adminStatus: "rejected",
        },
      });
      return NextResponse.json({ success: true, action: "reject" });
    }

    if (storagePath.includes("/photos/")) {
      const destPath = `passes/${parsed.passId}/hero/${parsed.fileName}`;
      await file.copy(bucket.file(destPath));
    }

    const meta = await readCustomMetadata(file);
    await file.setMetadata({
      metadata: {
        ...meta,
        adminStatus: "approved",
        adminApprovedAt: ts,
      },
    });
    return NextResponse.json({ success: true, action: "approve" });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Storage error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
