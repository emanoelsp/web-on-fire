import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const atividades = [
  {
    num: "01",
    title: "Introdução ao Next.js",
    desc: "O que é, por que existe, e como ele se diferencia de um projeto React puro.",
    href: "/modulos/nextjs/intro",
    status: "active",
    icon: "⚡",
  },
  {
    num: "02",
    title: "Arquitetura e App Router",
    desc: "Como o Next.js organiza rotas, layouts e páginas com a pasta /app.",
    href: "#",
    status: "soon",
    icon: "🏗️",
  },
  {
    num: "03",
    title: "Principais Arquivos e Pastas",
    desc: "page.tsx, layout.tsx, loading.tsx, error.tsx, route.ts — entenda cada um.",
    href: "#",
    status: "soon",
    icon: "📁",
  },
  {
    num: "04",
    title: "Boas Práticas no Dia a Dia",
    desc: "Server vs Client Components, data fetching, metadata, otimização de imagens.",
    href: "#",
    status: "soon",
    icon: "✅",
  },
  {
    num: "05",
    title: "Desafio: Primeiro Sistema",
    desc: "Crie um sistema completo com listagem, detalhe e formulário usando o que aprendeu.",
    href: "#",
    status: "challenge",
    icon: "🏆",
  },
];

export default function NextJSModulePage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--dark-1)", display: "flex", flexDirection: "column" }}>
      <Navbar />

      <main style={{ flex: 1 }}>
        {/* HERO */}
        <section
          style={{
            position: "relative",
            padding: "5rem 1.5rem 4rem",
            maxWidth: "1100px",
            margin: "0 auto",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "500px",
              height: "400px",
              background: "radial-gradient(ellipse, rgba(255,85,0,0.07) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />

          {/* Breadcrumb */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              marginBottom: "2rem",
              fontSize: "0.78rem",
              color: "var(--text-muted)",
              fontFamily: "var(--font-mono)",
            }}
          >
            <Link href="/" style={{ color: "var(--text-muted)", textDecoration: "none" }}>início</Link>
            <span>/</span>
            <span style={{ color: "rgba(255,119,68,0.7)" }}>módulo 01</span>
          </div>

          <div style={{ display: "flex", alignItems: "flex-start", gap: "2rem", flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: "280px" }}>
              <span className="badge badge-fire" style={{ marginBottom: "1.25rem", display: "inline-flex" }}>
                ⚡ Módulo 01 — Fundamentos
              </span>
              <h1
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                  lineHeight: 0.95,
                  letterSpacing: "0.02em",
                  color: "var(--text-primary)",
                  marginBottom: "1.25rem",
                }}
              >
                NEXT.JS
                <br />
                <span className="fire-text">FUNDAMENTOS</span>
              </h1>
              <p
                style={{
                  fontSize: "1rem",
                  color: "var(--text-muted)",
                  lineHeight: 1.8,
                  maxWidth: "500px",
                  marginBottom: "2rem",
                }}
              >
                Do zero ao seu primeiro sistema. Entenda a arquitetura, domine os principais arquivos
                e aplique boas práticas que todo desenvolvedor Next.js precisa conhecer.
              </p>

              <Link
                href="/modulos/nextjs/intro"
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
                  fontSize: "0.95rem",
                  letterSpacing: "0.02em",
                }}
              >
                🔥 Começar módulo
              </Link>
            </div>

            {/* Stats card */}
            <div
              className="card fire-border"
              style={{
                borderRadius: "16px",
                padding: "1.75rem",
                minWidth: "220px",
                flexShrink: 0,
              }}
            >
              <div style={{ marginBottom: "1.5rem" }}>
                <div className="fire-text" style={{ fontFamily: "var(--font-display)", fontSize: "3rem", lineHeight: 1 }}>
                  5
                </div>
                <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                  Atividades
                </div>
              </div>
              {[
                { icon: "🎯", label: "1 Desafio final" },
                { icon: "📊", label: "Slides gamificados" },
                { icon: "💻", label: "Código real" },
                { icon: "🏆", label: "Certificado" },
              ].map((s) => (
                <div
                  key={s.label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.6rem",
                    padding: "0.4rem 0",
                    borderBottom: "1px solid rgba(255,255,255,0.04)",
                    fontSize: "0.8rem",
                    color: "var(--text-muted)",
                  }}
                >
                  <span>{s.icon}</span>
                  {s.label}
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="divider" style={{ maxWidth: "1100px", margin: "0 auto" }} />

        {/* ATIVIDADES */}
        <section style={{ padding: "4rem 1.5rem", maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ marginBottom: "2.5rem" }}>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
                letterSpacing: "0.04em",
                color: "var(--text-primary)",
              }}
            >
              TRILHA DO MÓDULO
            </h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {atividades.map((at, i) => {
              const isActive = at.status === "active";
              const isChallenge = at.status === "challenge";

              return (
                <div
                  key={at.num}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1.25rem",
                    padding: "1.5rem",
                    borderRadius: "14px",
                    background: isActive ? "var(--dark-2)" : "var(--dark-2)",
                    border: isActive
                      ? "1px solid rgba(255,85,0,0.25)"
                      : isChallenge
                      ? "1px solid rgba(251,191,36,0.2)"
                      : "1px solid rgba(255,255,255,0.04)",
                    opacity: at.status === "soon" ? 0.5 : 1,
                    transition: "all 0.2s",
                  }}
                >
                  {/* Number/icon */}
                  <div
                    style={{
                      width: "3rem",
                      height: "3rem",
                      borderRadius: "10px",
                      background: isActive
                        ? "linear-gradient(135deg, #FF5500, #CC2200)"
                        : isChallenge
                        ? "linear-gradient(135deg, #FFB800, #FF6600)"
                        : "rgba(255,255,255,0.05)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.3rem",
                      flexShrink: 0,
                      boxShadow: isActive ? "0 0 20px rgba(255,85,0,0.3)" : undefined,
                    }}
                  >
                    {at.icon}
                  </div>

                  {/* Content */}
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.2rem" }}>
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.65rem",
                          color: isActive ? "#FF7744" : "rgba(255,255,255,0.2)",
                          letterSpacing: "0.08em",
                        }}
                      >
                        {at.num}
                      </span>
                      {isActive && <span className="badge badge-fire" style={{ fontSize: "0.6rem" }}>Disponível</span>}
                      {isChallenge && <span className="badge badge-amber" style={{ fontSize: "0.6rem" }}>🏆 Desafio</span>}
                    </div>
                    <h3
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "1.2rem",
                        letterSpacing: "0.03em",
                        color: "var(--text-primary)",
                        marginBottom: "0.2rem",
                      }}
                    >
                      {at.title}
                    </h3>
                    <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", lineHeight: 1.5 }}>
                      {at.desc}
                    </p>
                  </div>

                  {/* Action */}
                  {isActive ? (
                    <Link
                      href={at.href}
                      className="fire-btn"
                      style={{
                        flexShrink: 0,
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.4rem",
                        padding: "0.6rem 1.25rem",
                        borderRadius: "8px",
                        fontSize: "0.82rem",
                        fontWeight: 600,
                        color: "#fff",
                        textDecoration: "none",
                      }}
                    >
                      Iniciar →
                    </Link>
                  ) : (
                    <span
                      style={{
                        flexShrink: 0,
                        fontSize: "0.75rem",
                        color: "rgba(255,255,255,0.2)",
                        fontFamily: "var(--font-mono)",
                      }}
                    >
                      {i === 0 ? "" : `após ${String(i).padStart(2, "0")}`}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
