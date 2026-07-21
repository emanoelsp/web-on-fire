"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/contexts/AuthContext";

/**
 * Portão de atividade: os módulos e descrições são públicos, mas iniciar
 * qualquer atividade (slides ou desafio) exige login — assim registramos
 * XP, streak e progresso do aluno. Envolve o conteúdo da atividade.
 */
export default function ActivityGate({
  children,
  label,
}: {
  children: ReactNode;
  label?: string;
}) {
  const { user, loading } = useAuth();
  const pathname = usePathname();

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", background: "var(--dark-1)", display: "flex", flexDirection: "column" }}>
        <Navbar />
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontSize: "2rem", animation: "wofGatePulse 1s ease infinite" }}>🔥</span>
        </div>
        <style>{`@keyframes wofGatePulse {0%,100%{opacity:.4}50%{opacity:1}}`}</style>
      </div>
    );
  }

  if (!user) {
    return (
      <div style={{ minHeight: "100vh", background: "var(--dark-1)", display: "flex", flexDirection: "column" }}>
        <Navbar />
        <main style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "3rem 1.5rem" }}>
          <div
            className="card fire-border"
            style={{ maxWidth: "460px", textAlign: "center", padding: "2.75rem 2rem", borderRadius: "20px" }}
          >
            <span style={{ fontSize: "3rem", display: "block", marginBottom: "1rem" }}>🔒</span>
            <h1
              className="fire-text"
              style={{ fontFamily: "var(--font-display)", fontSize: "2rem", letterSpacing: "0.03em", marginBottom: "0.75rem", lineHeight: 1.05 }}
            >
              ENTRE PARA COMEÇAR
            </h1>
            <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: 1.7, marginBottom: "1.75rem" }}>
              {label ?? "Esta atividade"} registra seu XP, sua sequência semanal 🔥 e seu
              progresso. Faça login — é rápido — para começar e não perder sua evolução.
            </p>
            <Link
              href={`/login?next=${encodeURIComponent(pathname)}`}
              className="fire-btn"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.85rem 2rem",
                borderRadius: "10px",
                color: "#fff",
                textDecoration: "none",
                fontWeight: 700,
                fontSize: "0.92rem",
              }}
            >
              🔥 Entrar / Criar conta
            </Link>
            <div style={{ marginTop: "1.25rem" }}>
              <Link
                href="/"
                style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.35)", textDecoration: "none", fontFamily: "var(--font-mono)" }}
              >
                ← voltar aos módulos
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return <>{children}</>;
}
