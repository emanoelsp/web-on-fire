import { NextRequest, NextResponse } from "next/server";
import { validateToken, verifyFirebaseAdmin, ADMIN_COOKIE } from "@/lib/adminAuth";
import { adminAuth, adminDb } from "@/lib/firebaseAdmin";

async function isAuthorized(req: NextRequest): Promise<boolean> {
  const token = req.cookies.get(ADMIN_COOKIE)?.value ?? "";
  if (await validateToken(token)) return true;
  const authHeader = req.headers.get("authorization") ?? "";
  if (authHeader.startsWith("Bearer ")) return verifyFirebaseAdmin(authHeader.slice(7));
  return false;
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ uid: string }> }
) {
  if (!(await isAuthorized(req))) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  const { uid } = await params;
  if (!uid) return NextResponse.json({ error: "UID inválido." }, { status: 400 });

  try {
    await adminAuth().deleteUser(uid);
  } catch (err: unknown) {
    // user-not-found: conta já inexistente no Auth — prosseguimos limpando Firestore
    if ((err as { code?: string }).code !== "auth/user-not-found") {
      console.error("Erro ao excluir conta Firebase Auth:", err);
      return NextResponse.json({ error: "Falha ao excluir conta." }, { status: 500 });
    }
  }

  const db = adminDb();
  await db.doc(`alunos/${uid}`).delete();
  try { await db.doc(`progresso/${uid}`).delete(); } catch { /* sem progresso */ }

  return NextResponse.json({ ok: true });
}
