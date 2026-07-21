import { NextRequest, NextResponse } from "next/server";
import { validateToken, verifyFirebaseAdmin, ADMIN_COOKIE } from "@/lib/adminAuth";
import { getAulaLocks, setAulaLocks } from "@/services/progressService";
import { AulaLockSettings } from "@/types/gamification";

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
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }
  const locks = await getAulaLocks();
  return NextResponse.json(locks);
}

export async function PUT(req: NextRequest) {
  if (!(await isAuthorized(req))) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }
  const body: AulaLockSettings = await req.json();
  await setAulaLocks({ lockedAulas: body.lockedAulas ?? [] });
  return NextResponse.json({ ok: true });
}
