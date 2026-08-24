import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { readFileSync } from "fs";
import { resolve } from "path";

// Lê .env.local manualmente
const envPath = resolve(process.cwd(), ".env.local");
const env = Object.fromEntries(
  readFileSync(envPath, "utf8")
    .split("\n")
    .filter((l) => l && !l.startsWith("#") && l.includes("="))
    .map((l) => {
      const idx = l.indexOf("=");
      return [l.slice(0, idx).trim(), l.slice(idx + 1).trim()];
    })
);

if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: env.FIREBASE_ADMIN_PROJECT_ID,
      clientEmail: env.FIREBASE_ADMIN_CLIENT_EMAIL,
      privateKey: env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  });
}

const db = getFirestore();
const snap = await db.collection("trabalho1").get();

if (snap.empty) {
  console.log("Coleção trabalho1 já está vazia.");
  process.exit(0);
}

const nomes = snap.docs.map((d) => d.id);
const batch = db.batch();
snap.docs.forEach((d) => batch.delete(d.ref));
await batch.commit();

console.log(`🗑️  ${nomes.length} documento(s) removido(s): ${nomes.join(", ")}`);
