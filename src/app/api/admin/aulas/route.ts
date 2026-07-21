import { NextRequest, NextResponse } from "next/server";
import { validateToken, ADMIN_COOKIE } from "@/lib/adminAuth";
import { getAulaLocks, setAulaLocks } from "@/services/progressService";
import { AulaLockSettings } from "@/types/gamification";

async function isAuthorized(req: NextRequest): Promise<boolean> {
  const token = req.cookies.get(ADMIN_COOKIE)?.value ?? "";
  return validateToken(token);
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
