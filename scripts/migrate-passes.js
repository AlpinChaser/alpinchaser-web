/**
 * Migrates passes from the Flutter app JSON bundle into Firestore `passes/{id}`.
 *
 * Usage (from repo root):
 *   node scripts/migrate-passes.js
 *
 * Requires service-account.json in the web project root.
 * Optional env PASSES_JSON_PATH overrides the default Flutter asset path.
 */

const fs = require("fs");
const path = require("path");
const admin = require("firebase-admin");

const WEB_ROOT = path.join(__dirname, "..");
const SERVICE_ACCOUNT_PATH = path.join(WEB_ROOT, "service-account.json");
const DEFAULT_PASSES_JSON = path.join(
  "C:",
  "Users",
  "Chris",
  "Desktop",
  "Projekte",
  "AlpinChaserApp",
  "alpinchaser_map",
  "assets",
  "data",
  "passes.json",
);

function stripUndefined(obj) {
  const out = {};
  for (const [k, v] of Object.entries(obj)) {
    if (v !== undefined) out[k] = v;
  }
  return out;
}

async function main() {
  const passesJsonPath =
    process.env.PASSES_JSON_PATH ||
    process.env.PASSES_JSON ||
    DEFAULT_PASSES_JSON;

  if (!fs.existsSync(SERVICE_ACCOUNT_PATH)) {
    console.error("Missing:", SERVICE_ACCOUNT_PATH);
    process.exit(1);
  }

  if (!fs.existsSync(passesJsonPath)) {
    console.error("Missing passes JSON:", passesJsonPath);
    process.exit(1);
  }

  const serviceAccount = JSON.parse(
    fs.readFileSync(SERVICE_ACCOUNT_PATH, "utf8"),
  );

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }

  const db = admin.firestore();

  let raw = fs.readFileSync(passesJsonPath, "utf8");
  if (raw.charCodeAt(0) === 0xfeff) raw = raw.slice(1);

  const decoded = JSON.parse(raw);
  const list = Array.isArray(decoded) ? decoded : decoded.passes;
  if (!Array.isArray(list)) {
    throw new Error("Invalid passes JSON: expected array or { passes: [] }");
  }

  let written = 0;
  const total = list.length;

  for (let i = 0; i < list.length; i++) {
    const pass = list[i];
    if (!pass || typeof pass !== "object") {
      console.warn("Skip invalid entry at index", i);
      continue;
    }
    const id = typeof pass.id === "string" ? pass.id.trim() : "";
    if (!id) {
      console.warn("Skip pass without id at index", i);
      continue;
    }

    const { route: _route, ...rest } = pass;
    const payload = stripUndefined(rest);

    await db.collection("passes").doc(id).set(payload);
    written++;

    if (written % 50 === 0) {
      console.log(`Progress: ${written} / ${total} passes written…`);
    }
  }

  console.log(`Migration complete: ${written} passes written`);
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
