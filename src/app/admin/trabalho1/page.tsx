"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { adminAuthHeaders } from "@/lib/adminClient";

type Submissao = {
  id: string;
  displayName: string;
  githubUrl: string;
  respostas: Record<string, string>;
  submissaoEm: string;
};

type MercadoStatus = "aberto" | "CRASH" | "carregando";

export default function AdminTrabalho1Page() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [submissoes, setSubmissoes] = useState<Submissao[]>([]);
  const [loading, setLoading] = useState(true);
  const [mercadoStatus, setMercadoStatus] = useState<MercadoStatus>("carregando");
  const [surpresaAtiva, setSurpresaAtiva] = useState(false);
  const [toast, setToast] = useState("");
  const [expandido, setExpandido] = useState<string | null>(null);

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  }

  const fetchData = useCallback(async () => {
    const headers = await adminAuthHeaders(user);
    const res = await fetch("/api/admin/trabalho1", { headers });
    if (res.status === 401) { router.push("/admin/login"); return; }
    const data: Submissao[] = await res.json();
    setSubmissoes(data);

    // Status do mercado
    const mRes = await fetch("/api/status-mercado");
    const mData = await mRes.json();
    setMercadoStatus(mData.status === "CRASH" ? "CRASH" : "aberto");

    // Surpresa
    const wRes = await fetch("/api/admin/trabalho1", { headers });
    if (wRes.ok) {
      // já lemos acima; status da surpresa vem do Firestore diretamente
      // Por ora: a surpresaAtiva é gerenciada localmente após toggle
    }
    setLoading(false);
  }, [router, user]);

  useEffect(() => {
    if (authLoading) return;
    fetchData();
  }, [authLoading, fetchData]);

  async function toggleMercado() {
    const action = mercadoStatus === "CRASH" ? "normalizar" : "crash";
    const headers = await adminAuthHeaders(user);
    const res = await fetch("/api/admin/trabalho1", {
      method: "PUT",
      headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify({ action }),
    });
    if (res.ok) {
      const data = await res.json();
      setMercadoStatus(data.novoStatus === "CRASH" ? "CRASH" : "aberto");
      showToast(data.novoStatus === "CRASH" ? "💥 Crash ativado!" : "✓ Mercado normalizado");
    }
  }

  async function toggleSurpresa() {
    const action = surpresaAtiva ? "surpresa-off" : "surpresa-on";
    const headers = await adminAuthHeaders(user);
    const res = await fetch("/api/admin/trabalho1", {
      method: "PUT",
      headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify({ action }),
    });
    if (res.ok) {
      const data = await res.json();
      setSurpresaAtiva(data.surpresaAtiva);
      showToast(data.surpresaAtiva ? "🎲 Surpresa ativada!" : "✓ Surpresa desativada");
    }
  }

  if (loading) {
    return (
      <main style={{ minHeight: "100vh", background: "var(--dark-1)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-muted)" }}>
        Carregando submissões…
      </main>
    );
  }

  const isCrash = mercadoStatus === "CRASH";

  return (
    <main style={{ minHeight: "100vh", background: "var(--dark-1)" }}>
      {/* Header */}
      <header
        style={{
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          background: "rgba(8,8,8,0.95)",
          backdropFilter: "blur(20px)",
          position: "sticky",
          top: 0,
          zIndex: 50,
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 1.5rem",
            height: "64px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <span style={{ fontSize: "1.2rem" }}>🔥</span>
              <span className="fire-text" style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", letterSpacing: "0.06em" }}>
                WEB ON FIRE
              </span>
            </Link>
            <span style={{ color: "rgba(255,255,255,0.15)", fontSize: "0.8rem" }}>/</span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "rgba(255,119,68,0.8)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              admin · trabalho 1
            </span>
          </div>
          <Link
            href="/admin/dashboard"
            style={{
              padding: "0.4rem 1rem",
              borderRadius: "8px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.07)",
              color: "rgba(255,255,255,0.6)",
              fontSize: "0.78rem",
              textDecoration: "none",
            }}
          >
            ← Painel
          </Link>
        </div>
      </header>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "3rem 1.5rem" }}>
        {/* Title */}
        <div style={{ marginBottom: "2.5rem" }}>
          <span className="badge badge-fire" style={{ marginBottom: "1rem", display: "inline-flex" }}>
            🏦 Trabalho 1 — TradeDesk Lab
          </span>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 5vw, 3rem)", letterSpacing: "0.04em" }}>
            SUBMISSÕES
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginTop: "0.35rem" }}>
            {submissoes.length} aluno{submissoes.length !== 1 ? "s" : ""} enviou o trabalho
          </p>
        </div>

        {/* Controles */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1rem", marginBottom: "2.5rem" }}>
          {/* Crash no mercado */}
          <div
            className="card"
            style={{
              borderRadius: "14px",
              padding: "1.5rem",
              border: isCrash ? "1px solid rgba(239,68,68,0.4)" : "1px solid rgba(255,255,255,0.07)",
              background: isCrash ? "rgba(239,68,68,0.04)" : undefined,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.6rem" }}>
              <span style={{ fontSize: "1.5rem" }}>📈</span>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1rem", letterSpacing: "0.04em" }}>
                Status do Mercado
              </h3>
            </div>
            <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", lineHeight: 1.5, marginBottom: "1rem" }}>
              {isCrash
                ? "🔴 CRASH ativo — o MercadoStatus dos alunos sem no-store mostra dado antigo."
                : "🟢 Mercado aberto — clique para simular o crash e testar o bug de cache."}
            </p>
            <button
              onClick={toggleMercado}
              style={{
                width: "100%",
                padding: "0.65rem",
                borderRadius: "8px",
                fontWeight: 700,
                fontSize: "0.85rem",
                cursor: "pointer",
                fontFamily: "inherit",
                border: "none",
                letterSpacing: "0.03em",
                transition: "all 0.2s",
                background: isCrash
                  ? "linear-gradient(135deg, #22c55e, #16a34a)"
                  : "linear-gradient(135deg, #ef4444, #b91c1c)",
                color: "#fff",
              }}
            >
              {isCrash ? "✓ Normalizar mercado" : "💥 Ativar CRASH"}
            </button>
          </div>

          {/* Surpresa */}
          <div
            className="card"
            style={{
              borderRadius: "14px",
              padding: "1.5rem",
              border: surpresaAtiva ? "1px solid rgba(251,191,36,0.4)" : "1px solid rgba(255,255,255,0.07)",
              background: surpresaAtiva ? "rgba(251,191,36,0.03)" : undefined,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.6rem" }}>
              <span style={{ fontSize: "1.5rem" }}>🎲</span>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1rem", letterSpacing: "0.04em" }}>
                Banner Surpresa
              </h3>
            </div>
            <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", lineHeight: 1.5, marginBottom: "1rem" }}>
              {surpresaAtiva
                ? "⚡ Banner visível na página do lab para os alunos logados."
                : "Exibe um banner de aviso na página do lab durante a aula."}
            </p>
            <button
              onClick={toggleSurpresa}
              style={{
                width: "100%",
                padding: "0.65rem",
                borderRadius: "8px",
                fontWeight: 700,
                fontSize: "0.85rem",
                cursor: "pointer",
                fontFamily: "inherit",
                letterSpacing: "0.03em",
                transition: "all 0.2s",
                background: surpresaAtiva
                  ? "rgba(255,255,255,0.06)"
                  : "linear-gradient(135deg, rgba(251,191,36,0.9), rgba(245,158,11,0.9))",
                color: surpresaAtiva ? "rgba(255,255,255,0.6)" : "#000",
                border: surpresaAtiva ? "1px solid rgba(255,255,255,0.08)" : "none",
              }}
            >
              {surpresaAtiva ? "Desativar surpresa" : "🎲 Liberar surpresa"}
            </button>
          </div>
        </div>

        {/* Lista de submissões */}
        {submissoes.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "4rem",
              color: "var(--text-muted)",
              border: "1px dashed rgba(255,255,255,0.08)",
              borderRadius: "16px",
            }}
          >
            Nenhum aluno enviou o trabalho ainda.
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {submissoes.map((s) => {
              const isOpen = expandido === s.id;
              const totalRespondidas = Object.values(s.respostas ?? {}).filter((v) => v.trim().length > 0).length;
              return (
                <div
                  key={s.id}
                  className="card"
                  style={{
                    borderRadius: "14px",
                    border: "1px solid rgba(255,255,255,0.05)",
                    overflow: "hidden",
                  }}
                >
                  {/* Row principal */}
                  <div
                    style={{
                      padding: "1.1rem 1.5rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                      cursor: "pointer",
                    }}
                    onClick={() => setExpandido(isOpen ? null : s.id)}
                  >
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: "0.95rem", marginBottom: "0.25rem" }}>
                        {s.displayName}
                      </div>
                      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--text-muted)" }}>
                          {new Date(s.submissaoEm).toLocaleString("pt-BR")}
                        </span>
                        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: totalRespondidas === 14 ? "#4ade80" : "#fbbf24" }}>
                          {totalRespondidas}/14 respostas
                        </span>
                      </div>
                    </div>

                    {s.githubUrl && (
                      <a
                        href={s.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        style={{
                          padding: "0.35rem 0.85rem",
                          borderRadius: "8px",
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(255,255,255,0.08)",
                          color: "rgba(255,255,255,0.6)",
                          textDecoration: "none",
                          fontSize: "0.75rem",
                          flexShrink: 0,
                        }}
                      >
                        GitHub ↗
                      </a>
                    )}

                    <span style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>
                      {isOpen ? "▲" : "▼"}
                    </span>
                  </div>

                  {/* Respostas expandidas */}
                  {isOpen && (
                    <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "1.25rem 1.5rem" }}>
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                        {Object.entries(s.respostas ?? {}).map(([bugId, resposta]) => (
                          <div key={bugId} style={{ display: "flex", gap: "0.75rem" }}>
                            <span
                              style={{
                                flexShrink: 0,
                                fontFamily: "var(--font-mono)",
                                fontSize: "0.65rem",
                                fontWeight: 700,
                                letterSpacing: "0.06em",
                                textTransform: "uppercase",
                                padding: "0.2rem 0.5rem",
                                borderRadius: "9999px",
                                background: "rgba(255,85,0,0.08)",
                                border: "1px solid rgba(255,85,0,0.2)",
                                color: "var(--fire-orange)",
                                height: "fit-content",
                              }}
                            >
                              {bugId.toUpperCase()}
                            </span>
                            <p style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.5, margin: 0 }}>
                              {resposta || <em style={{ color: "rgba(255,255,255,0.3)" }}>sem resposta</em>}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Toast */}
      {toast && (
        <div
          style={{
            position: "fixed",
            bottom: "2rem",
            right: "2rem",
            background: "rgba(34,197,94,0.12)",
            border: "1px solid rgba(34,197,94,0.3)",
            borderRadius: "10px",
            padding: "0.8rem 1.25rem",
            fontSize: "0.82rem",
            color: "#4ade80",
            zIndex: 200,
            backdropFilter: "blur(10px)",
          }}
        >
          {toast}
        </div>
      )}
    </main>
  );
}
