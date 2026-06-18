import { NextRequest, NextResponse } from "next/server";
import { validateToken, ADMIN_COOKIE } from "@/lib/adminAuth";
import { getModulesVisibility, setModulesVisibility } from "@/services/moduleVisibilityService";
import { ModulesVisibility } from "@/types/modules";

async function isAuthorized(req: NextRequest): Promise<boolean> {
  const token = req.cookies.get(ADMIN_COOKIE)?.value ?? "";
  return validateToken(token);
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
