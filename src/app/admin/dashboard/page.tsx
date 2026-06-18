"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ALL_MODULES, ModulesVisibility, DEFAULT_VISIBILITY, ModuleId } from "@/types/modules";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [visibility, setVisibility] = useState<ModulesVisibility>(DEFAULT_VISIBILITY);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<ModuleId | null>(null);
  const [savedMsg, setSavedMsg] = useState("");

  const fetchVisibility = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/modules");
      if (res.status === 401) { router.push("/admin/login"); return; }
      const data = await res.json();
      setVisibility(data);
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => { fetchVisibility(); }, [fetchVisibility]);

  async function toggle(id: ModuleId) {
    const next = { ...visibility, [id]: !visibility[id] };
    setVisibility(next);
    setSaving(id);
    try {
      await fetch("/api/admin/modules", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(next),
      });
      setSavedMsg(`${id} atualizado!`);
      setTimeout(() => setSavedMsg(""), 2000);
    } catch {
      setVisibility(visibility);
    } finally {
      setSaving(null);
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  const visibleCount = Object.values(visibility).filter(Boolean).length;

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
            maxWidth: "1100px",
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
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.72rem",
                color: "rgba(255,119,68,0.8)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              admin
            </span>
          </div>
          <button
            onClick={handleLogout}
            style={{
              padding: "0.4rem 1rem",
              borderRadius: "8px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.07)",
              color: "rgba(255,255,255,0.5)",
              fontSize: "0.78rem",
              cursor: "pointer",
              fontFamily: "inherit",
              transition: "all 0.2s",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.color = "#fff";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,85,0,0.3)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)";
            }}
          >
            Sair
          </button>
        </div>
      </header>

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "3rem 1.5rem" }}>
        {/* Title */}
        <div style={{ marginBottom: "3rem" }}>
          <span className="badge badge-fire" style={{ marginBottom: "1rem", display: "inline-flex" }}>
            Painel Administrativo
          </span>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              letterSpacing: "0.04em",
              color: "var(--text-primary)",
              marginBottom: "0.5rem",
            }}
          >
            CONTROLE DE MÓDULOS
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
            {visibleCount} de {ALL_MODULES.length} módulos visíveis para os alunos
          </p>
        </div>

        {/* Stats */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: "1rem",
            marginBottom: "3rem",
          }}
        >
          {[
            { label: "Total de módulos", value: ALL_MODULES.length, icon: "📦" },
            { label: "Visíveis", value: visibleCount, icon: "👁", highlight: true },
            { label: "Ocultos", value: ALL_MODULES.length - visibleCount, icon: "🔒" },
          ].map((s) => (
            <div
              key={s.label}
              className="card"
              style={{
                borderRadius: "12px",
                padding: "1.25rem 1.5rem",
                border: s.highlight ? "1px solid rgba(255,85,0,0.25)" : undefined,
              }}
            >
              <span style={{ fontSize: "1.5rem", display: "block", marginBottom: "0.5rem" }}>{s.icon}</span>
              <div
                className={s.highlight ? "fire-text" : ""}
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "2rem",
                  color: s.highlight ? undefined : "var(--text-primary)",
                }}
              >
                {s.value}
              </div>
              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.2rem" }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Toast */}
        {savedMsg && (
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
            ✓ {savedMsg}
          </div>
        )}

        {/* Modules list */}
        {loading ? (
          <div style={{ textAlign: "center", padding: "4rem", color: "var(--text-muted)" }}>
            Carregando módulos...
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {ALL_MODULES.map((mod) => {
              const isVisible = visibility[mod.id] ?? false;
              const isSaving = saving === mod.id;

              return (
                <div
                  key={mod.id}
                  className="card"
                  style={{
                    borderRadius: "14px",
                    padding: "1.25rem 1.75rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "1.25rem",
                    border: isVisible ? "1px solid rgba(255,85,0,0.2)" : "1px solid rgba(255,255,255,0.05)",
                    transition: "all 0.3s ease",
                    opacity: isSaving ? 0.7 : 1,
                  }}
                >
                  {/* Icon */}
                  <span style={{ fontSize: "1.75rem", flexShrink: 0 }}>{mod.icon}</span>

                  {/* Info */}
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.25rem" }}>
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.65rem",
                          color: "rgba(255,119,68,0.6)",
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                        }}
                      >
                        {mod.label}
                      </span>
                      {mod.isAdvanced && (
                        <span className="badge badge-fire" style={{ fontSize: "0.58rem" }}>avançado</span>
                      )}
                    </div>
                    <h3
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "1.15rem",
                        letterSpacing: "0.04em",
                        color: "var(--text-primary)",
                        marginBottom: "0.2rem",
                      }}
                    >
                      {mod.title}
                    </h3>
                    <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", lineHeight: 1.5 }}>
                      {mod.atividades.length} atividade{mod.atividades.length !== 1 ? "s" : ""}
                      {" · "}
                      {mod.href !== "#" ? (
                        <Link href={mod.href} style={{ color: "rgba(255,119,68,0.7)", textDecoration: "none" }}>
                          ver módulo →
                        </Link>
                      ) : (
                        <span>sem página ainda</span>
                      )}
                    </p>
                  </div>

                  {/* Status badge */}
                  <span
                    className={isVisible ? "badge badge-green" : "badge badge-blue"}
                    style={{ flexShrink: 0 }}
                  >
                    {isVisible ? "👁 Visível" : "🔒 Oculto"}
                  </span>

                  {/* Toggle */}
                  <button
                    onClick={() => toggle(mod.id)}
                    disabled={isSaving}
                    style={{
                      flexShrink: 0,
                      padding: "0.55rem 1.25rem",
                      borderRadius: "8px",
                      fontSize: "0.78rem",
                      fontWeight: 600,
                      cursor: isSaving ? "not-allowed" : "pointer",
                      fontFamily: "inherit",
                      letterSpacing: "0.03em",
                      transition: "all 0.2s",
                      ...(isVisible
                        ? {
                            background: "rgba(255,255,255,0.04)",
                            border: "1px solid rgba(255,255,255,0.08)",
                            color: "rgba(255,255,255,0.5)",
                          }
                        : {
                            background: "linear-gradient(135deg, #FF5500, #CC2200)",
                            border: "none",
                            color: "#fff",
                          }),
                    }}
                  >
                    {isSaving ? "..." : isVisible ? "Ocultar" : "Mostrar"}
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* Footer note */}
        <div
          style={{
            marginTop: "3rem",
            padding: "1rem 1.25rem",
            borderRadius: "10px",
            background: "rgba(255,85,0,0.04)",
            border: "1px solid rgba(255,85,0,0.1)",
            fontSize: "0.78rem",
            color: "var(--text-muted)",
            lineHeight: 1.6,
          }}
        >
          💡 Alterações são aplicadas imediatamente. Alunos que recarregarem a página verão as mudanças.
          Módulos ocultos não aparecem na homepage mas seus links diretos continuam acessíveis.
        </div>
      </div>
    </main>
  );
}
