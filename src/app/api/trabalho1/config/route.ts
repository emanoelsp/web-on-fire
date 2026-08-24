import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const db = adminDb();
    const snap = await db.collection("config").doc("trabalho1").get();
    const data = snap.exists ? snap.data() ?? {} : {};
    return NextResponse.json({ surpresaAtiva: data.surpresaAtiva === true });
  } catch {
    return NextResponse.json({ surpresaAtiva: false });
  }
}
