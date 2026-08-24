import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { displayName, githubUrl, respostas } = body;

    if (!displayName || typeof displayName !== "string") {
      return NextResponse.json({ error: "displayName obrigatório" }, { status: 400 });
    }

    const db = adminDb();
    await db.collection("trabalho1").doc(displayName).set({
      displayName,
      githubUrl: githubUrl ?? "",
      respostas: respostas ?? {},
      submissaoEm: new Date().toISOString(),
    });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("trabalho1 POST:", err);
    return NextResponse.json({ error: "Erro ao salvar", details: err?.message || String(err) }, { status: 500 });
  }
}
