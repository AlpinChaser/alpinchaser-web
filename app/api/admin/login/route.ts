import { NextRequest, NextResponse } from "next/server";

const ADMIN_PASSWORD = "alpin2024admin";

export async function POST(req: NextRequest) {
  let body: { password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const { password } = body;
  if (password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const res = NextResponse.json({ success: true });
  res.cookies.set("admin_auth", "true", {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7,
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });
  return res;
}
