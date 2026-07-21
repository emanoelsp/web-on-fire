// Web Crypto API — funciona no Edge Runtime (middleware) e no Node.js 18+
const SECRET = process.env.ADMIN_SECRET ?? "dev-secret-change-me";

async function hmacHex(message: string): Promise<string> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, encoder.encode(message));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function signToken(password: string): Promise<string> {
  return hmacHex(password);
}

export async function validateToken(token: string): Promise<boolean> {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return false;
  const expected = await hmacHex(password);
  return token === expected;
}

export const ADMIN_COOKIE = "wof_admin";
export const ADMIN_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

// ─── Admin por conta Firebase (Google) ───────────────────────────────────────
// E-mails que têm papel de professor/admin. Fonte única da verdade.
export const ADMIN_EMAILS = [
  "emanoelsp@gmail.com",
  "emanoel.spanhol@edu.sc.senai.br",
];

export function isAdminEmail(email: string | null | undefined): boolean {
  return !!email && ADMIN_EMAILS.includes(email.toLowerCase());
}

/**
 * Verifica no servidor se um ID token do Firebase pertence a um admin.
 * Usa a API pública do Identity Toolkit (accounts:lookup) — valida o token
 * de verdade e exige e-mail verificado (fecha o furo de contas e-mail/senha
 * criadas com um e-mail que a pessoa não possui).
 */
export async function verifyFirebaseAdmin(idToken: string): Promise<boolean> {
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  if (!apiKey || !idToken) return false;
  try {
    const res = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      }
    );
    if (!res.ok) return false;
    const data = await res.json();
    const user = data?.users?.[0];
    if (!user) return false;
    return user.emailVerified === true && isAdminEmail(user.email);
  } catch {
    return false;
  }
}
