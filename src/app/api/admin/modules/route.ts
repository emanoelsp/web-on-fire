import { NextRequest, NextResponse } from "next/server";
import { validateToken, verifyFirebaseAdmin, ADMIN_COOKIE } from "@/lib/adminAuth";
import { getModulesVisibility, setModulesVisibility } from "@/services/moduleVisibilityService";
import { ModulesVisibility } from "@/types/modules";

async function isAuthorized(req: NextRequest): Promise<boolean> {
  // Caminho 1: cookie de senha (ADMIN_PASSWORD)
  const token = req.cookies.get(ADMIN_COOKIE)?.value ?? "";
  if (await validateToken(token)) return true;
  // Caminho 2: conta Firebase admin (ex: emanoelsp@gmail.com) via Bearer token
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
  const visibility = await getModulesVisibility();
  return NextResponse.json(visibility);
}

export async function PUT(req: NextRequest) {
  if (!(await isAuthorized(req))) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }
  const body: ModulesVisibility = await req.json();
  await setModulesVisibility(body);
  return NextResponse.json({ ok: true });
}
