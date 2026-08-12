"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/contexts/AuthContext";

type Mode = "login" | "registro";

const ERROS: Record<string, string> = {
  "auth/invalid-credential": "E-mail ou senha incorretos.",
  "auth/user-not-found": "Nenhuma conta com esse e-mail. Crie seu cadastro!",
  "auth/wrong-password": "Senha incorreta.",
  "auth/email-already-in-use": "Esse e-mail já tem conta. Faça login.",
  "auth/weak-password": "A senha precisa de pelo menos 6 caracteres.",
  "auth/invalid-email": "E-mail inválido.",
  "auth/popup-closed-by-user": "Login com Google cancelado.",
  "auth/cancelled-popup-request": "Login com Google cancelado.",
  "auth/popup-blocked": "O navegador bloqueou o pop-up. Permita pop-ups e tente de novo.",
  "auth/unauthorized-domain": "Este domínio não está autorizado no Firebase (Authentication → Settings → Authorized domains).",
  "auth/operation-not-allowed": "O provedor Google não está habilitado no Firebase Authentication.",
  "permission-denied": "Entrou, mas o Firestore bloqueou a gravação do perfil. Ajuste as Regras do Firestore.",
};

export default function LoginPage() {
  const router = useRouter();
  const { user, loading, loginWithEmail, registerWithEmail, loginWithGoogle } = useAuth();
  const [mode, setMode] = useState<Mode>("login");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [busy, setBusy] = useState(false);

  // Volta para a atividade de origem (?next=...) ou vai ao progresso
  function destino() {
    if (typeof window === "undefined") return "/progresso";
    const next = new URLSearchParams(window.location.search).get("next");
    return next && next.startsWith("/") ? next : "/progresso";
  }

  useEffect(() => {
    if (!loading && user) router.replace(destino());
  }, [user, loading, router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro("");
    setBusy(true);
    try {
      if (mode === "login") {
        await loginWithEmail(email, senha);
      } else {
        if (!nome.trim()) {
          setErro("Digite seu nome.");
          setBusy(false);
          return;
        }
        await registerWithEmail(email, senha, nome.trim());
      }
      router.replace(destino());
    } catch (err) {
      const code = (err as { code?: string }).code ?? "";
      setErro(ERROS[code] ?? "Algo deu errado. Tente novamente.");
    } finally {
      setBusy(false);
    }
  }

  async function handleGoogle() {
    setErro("");
    setBusy(true);
    try {
      await loginWithGoogle();
      router.replace(destino());
    } catch (err) {
      const code = (err as { code?: string }).code ?? "";
      console.error("[login] Google falhou:", err);
      setErro(ERROS[code] ?? `Não foi possível entrar com o Google.${code ? ` (${code})` : ""}`);
    } finally {
      setBusy(false);
    }
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.8rem 1rem",
    borderRadius: "10px",
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.09)",
    color: "var(--text-primary)",
    fontSize: "0.9rem",
    fontFamily: "inherit",
    outline: "none",
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--dark-1)", display: "flex", flexDirection: "column" }}>
      <Navbar />
      <main style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "3rem 1.5rem" }}>
        <div style={{ width: "100%", maxWidth: "400px" }}>
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <span style={{ fontSize: "2.5rem", display: "block", marginBottom: "0.75rem" }}>🔥</span>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "2.2rem",
                letterSpacing: "0.03em",
                color: "var(--text-primary)",
              }}
            >
              {mode === "login" ? "ACENDA SUA " : "CRIE SUA "}
              <span className="fire-text">{mode === "login" ? "CHAMA" : "CONTA"}</span>
            </h1>
            <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginTop: "0.5rem", lineHeight: 1.6 }}>
              {mode === "login"
                ? "Entre para salvar seu XP, badges e manter sua sequência semanal."
                : "Cadastre-se para acompanhar seu progresso como no Duolingo."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="card fire-border" style={{ borderRadius: "16px", padding: "1.75rem", display: "flex", flexDirection: "column", gap: "0.9rem" }}>
            {mode === "registro" && (
              <input
                type="text"
                placeholder="Seu nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                style={inputStyle}
                autoComplete="name"
              />
            )}
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
              autoComplete="email"
              required
            />
            <input
              type="password"
              placeholder="Senha (mín. 6 caracteres)"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              style={inputStyle}
              autoComplete={mode === "login" ? "current-password" : "new-password"}
              required
            />

            {erro && (
              <p style={{ fontSize: "0.8rem", color: "#f87171", background: "rgba(239,68,68,0.07)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: "8px", padding: "0.6rem 0.9rem" }}>
                {erro}
              </p>
            )}

            <button
              type="submit"
              disabled={busy}
              className="fire-btn"
              style={{
                padding: "0.85rem",
                borderRadius: "10px",
                color: "#fff",
                fontWeight: 700,
                fontSize: "0.92rem",
                fontFamily: "inherit",
                cursor: busy ? "wait" : "pointer",
                opacity: busy ? 0.7 : 1,
              }}
            >
              {busy ? "Aguarde..." : mode === "login" ? "🔥 Entrar" : "🔥 Criar conta"}
            </button>

            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", margin: "0.25rem 0" }}>
              <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.07)" }} />
              <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>ou</span>
              <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.07)" }} />
            </div>

            <button
              type="button"
              onClick={handleGoogle}
              disabled={busy}
              style={{
                padding: "0.8rem",
                borderRadius: "10px",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.8)",
                fontWeight: 600,
                fontSize: "0.88rem",
                fontFamily: "inherit",
                cursor: busy ? "wait" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.6rem",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
              </svg>
              Continuar com Google
            </button>
          </form>

          <p style={{ textAlign: "center", marginTop: "1.5rem", fontSize: "0.83rem", color: "var(--text-muted)" }}>
            {mode === "login" ? (
              <>
                Primeira vez aqui?{" "}
                <button
                  onClick={() => { setMode("registro"); setErro(""); }}
                  style={{ background: "none", border: "none", color: "#FF7744", cursor: "pointer", fontSize: "0.83rem", fontFamily: "inherit", fontWeight: 600 }}
                >
                  Crie sua conta
                </button>
              </>
            ) : (
              <>
                Já tem conta?{" "}
                <button
                  onClick={() => { setMode("login"); setErro(""); }}
                  style={{ background: "none", border: "none", color: "#FF7744", cursor: "pointer", fontSize: "0.83rem", fontFamily: "inherit", fontWeight: 600 }}
                >
                  Faça login
                </button>
              </>
            )}
          </p>

          <p style={{ textAlign: "center", marginTop: "0.75rem" }}>
            <Link href="/" style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.3)", textDecoration: "none", fontFamily: "var(--font-mono)" }}>
              ← voltar para o início
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
