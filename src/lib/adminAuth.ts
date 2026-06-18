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
