import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";
import { validateToken, verifyFirebaseAdmin, ADMIN_COOKIE } from "@/lib/adminAuth";

async function isAuthorized(req: NextRequest): Promise<boolean> {
  const token = req.cookies.get(ADMIN_COOKIE)?.value ?? "";
  if (await validateToken(token)) return true;
  const authHeader = req.headers.get("authorization") ?? "";
  if (authHeader.startsWith("Bearer ")) {
    return verifyFirebaseAdmin(authHeader.slice(7));
  }
  return false;
}

export async function GET(req: NextRequest) {
  if (!(await isAuthorized(req))) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const db = adminDb();
  const snap = await db.collection("trabalho1").orderBy("submissaoEm", "desc").get();
  const submissions = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  return NextResponse.json(submissions);
}

export async function PUT(req: NextRequest) {
  if (!(await isAuthorized(req))) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const { action } = await req.json();
  const db = adminDb();

  if (action === "crash") {
    await db.collection("config").doc("mercado").set({
      status: "CRASH",
      mensagem: "🔴 CRASH — sistema de cotações fora do ar",
    });
    return NextResponse.json({ ok: true, novoStatus: "CRASH" });
  }

  if (action === "normalizar") {
    await db.collection("config").doc("mercado").set({
      status: "aberto",
      mensagem: "Mercado operando normalmente",
    });
    return NextResponse.json({ ok: true, novoStatus: "aberto" });
  }

  if (action === "surpresa-on") {
    await db.collection("config").doc("trabalho1").set({ surpresaAtiva: true }, { merge: true });
    return NextResponse.json({ ok: true, surpresaAtiva: true });
  }

  if (action === "surpresa-off") {
    await db.collection("config").doc("trabalho1").set({ surpresaAtiva: false }, { merge: true });
    return NextResponse.json({ ok: true, surpresaAtiva: false });
  }

  if (action === "limpar-tudo") {
    const snap = await db.collection("trabalho1").get();
    const batch = db.batch();
    snap.docs.forEach((d) => batch.delete(d.ref));
    await batch.commit();
    return NextResponse.json({ ok: true, removidos: snap.docs.map((d) => d.id) });
  }

  return NextResponse.json({ error: "Ação desconhecida" }, { status: 400 });
}
