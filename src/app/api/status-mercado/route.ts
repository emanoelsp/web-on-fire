import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const db = adminDb();
    const snap = await db.collection("config").doc("mercado").get();

    if (!snap.exists) {
      return NextResponse.json({
        status: "aberto",
        crash: false,
        mensagem: "Mercado operando normalmente",
      });
    }

    const data = snap.data() ?? {};
    return NextResponse.json({
      status: data.status ?? "aberto",
      crash: data.status === "CRASH",
      mensagem: data.mensagem ?? "Mercado operando normalmente",
    });
  } catch {
    return NextResponse.json({
      status: "aberto",
      crash: false,
      mensagem: "Mercado operando normalmente",
    });
  }
}
