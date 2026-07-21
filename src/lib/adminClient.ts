import type { User } from "firebase/auth";

/**
 * Monta os headers de autorização para as APIs de admin.
 * Se houver um usuário Firebase logado, anexa o ID token como Bearer —
 * o servidor aceita isso quando o e-mail é admin (ex: emanoelsp@gmail.com).
 * Se não houver, as APIs caem no cookie de senha (ADMIN_PASSWORD).
 */
export async function adminAuthHeaders(user: User | null): Promise<Record<string, string>> {
  if (!user) return {};
  try {
    const token = await user.getIdToken();
    return { Authorization: `Bearer ${token}` };
  } catch {
    return {};
  }
}
