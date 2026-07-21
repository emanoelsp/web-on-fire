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

  useEffect(() => {
    if (!loading && user) router.replace("/progresso");
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
      router.replace("/progresso");
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
      router.replace("/progresso");
    } catch (err) {
      const code = (err as { code?: string }).code ?? "";
      setErro(ERROS[code] ?? "Não foi possível entrar com o Google.");
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
              <span style={{ fontWeight: 800 }}>G</span> Continuar com Google
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
