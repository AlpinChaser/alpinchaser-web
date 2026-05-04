import * as admin from "firebase-admin";
import { getApps } from "firebase-admin/app";
import path from "path";
import fs from "fs";

function initializeFirebaseAdmin() {
  if (getApps().length > 0) return getApps()[0];
  const serviceAccountPath = path.join(process.cwd(), "service-account.json");
  const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf-8"));
  return admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "alpinchasse.firebasestorage.app",
  });
}

export function getDb() {
  initializeFirebaseAdmin();
  return admin.firestore();
}

export function getAdminStorageBucket() {
  initializeFirebaseAdmin();
  return admin.storage().bucket();
}
