import * as admin from "firebase-admin";
import { getApps } from "firebase-admin/app";
import path from "path";
import fs from "fs";

function initializeFirebaseAdmin() {
  if (getApps().length > 0) return getApps()[0];

  let serviceAccount: admin.ServiceAccount;
  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    serviceAccount = JSON.parse(
      process.env.FIREBASE_SERVICE_ACCOUNT,
    ) as admin.ServiceAccount;
  } else {
    const serviceAccountPath = path.join(process.cwd(), "service-account.json");
    serviceAccount = JSON.parse(
      fs.readFileSync(serviceAccountPath, "utf-8"),
    ) as admin.ServiceAccount;
  }

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
