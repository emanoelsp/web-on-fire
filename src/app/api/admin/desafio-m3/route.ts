import { NextRequest, NextResponse } from "next/server";
import { readFile } from "node:fs/promises";
import path from "node:path";
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
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }
  const filePath = path.join(process.cwd(), "docs", "resolucao_desafio_modulo3.md");
  const content = await readFile(filePath, "utf-8");
  return NextResponse.json({ content });
}
