import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const aulas = [
  {
    num: "01",
    title: "Introdução ao Next.js",
    desc: "O que é, por que existe e como se diferencia de um projeto React puro. SSR, App Router e primeiros passos.",
    href: "/modulos/nextjs/intro",
    status: "active",
    icon: "⚡",
    duration: "~35 min",
    slides: 10,
  },
  {
    num: "02",
    title: "App Router & Roteamento",
    desc: "File-system routing, rotas dinâmicas, route groups, layouts compartilhados, Link e useRouter.",
    href: "/modulos/nextjs/aula-02",
    status: "active",
    icon: "🗺️",
    duration: "~40 min",
    slides: 11,
  },
  {
    num: "03",
    title: "Server vs Client Components",
    desc: "A decisão mais importante do App Router: quando usar cada tipo, composição e anti-patterns.",
    href: "/modulos/nextjs/aula-03",
    status: "active",
    icon: "⚙️",
    duration: "~45 min",
    slides: 11,
  },
  {
    num: "04",
    title: "Layouts, Loading & Error",
    desc: "layout.tsx, loading.tsx, error.tsx, not-found.tsx e Metadata API para SEO profissional.",
    href: "/modulos/nextjs/aula-04",
    status: "active",
    icon: "🎨",
    duration: "~40 min",
    slides: 11,
  },
  {
    num: "05",
    title: "Desafio Final — TechBlog",
    desc: "Construa um blog técnico completo com todas as técnicas do módulo. Checklist interativo com critérios de avaliação.",
    href: "/modulos/nextjs/desafio",
    status: "challenge",
    icon: "🏆",
    duration: "~60 min",
    slides: null,
  },
];

export const metadata = {
  title: "Módulo Next.js Fundamentos · Web On Fire Academy",
};

export default function NextJSModulePage() {
  const totalSlides = aulas.reduce((acc, a) => acc + (a.slides ?? 0), 0);
  const totalMin = 35 + 40 + 45 + 40 + 60;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--dark-1)",
        display: "flex",
        flexDirection: "column",
      }}
    >
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
              background:
                "radial-gradient(ellipse, rgba(255,85,0,0.07) 0%, transparent 70%)",
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

          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "2rem",
              flexWrap: "wrap",
            }}
          >
            <div style={{ flex: 1, minWidth: "280px" }}>
              <span
                className="badge badge-fire"
                style={{ marginBottom: "1.25rem", display: "inline-flex" }}
              >
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
                Domine os fundamentos que todo desenvolvedor Next.js precisa conhecer:
                roteamento, Server Components, layouts, UX profissional e um desafio
                completo para consolidar tudo.
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
                🔥 Começar pela Aula 01
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
              {[
                { value: String(aulas.length), label: "Aulas", fire: true },
                { value: String(totalSlides), label: "Slides", fire: false },
                { value: `~${Math.round(totalMin / 60)}h`, label: "de conteúdo", fire: false },
                { value: "1", label: "Desafio final", fire: false },
              ].map((s) => (
                <div
                  key={s.label}
                  style={{
                    marginBottom: "1.1rem",
                    paddingBottom: "1.1rem",
                    borderBottom: "1px solid rgba(255,255,255,0.04)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                    {s.label}
                  </span>
                  <span
                    className={s.fire ? "fire-text" : ""}
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.5rem",
                      color: s.fire ? undefined : "var(--text-primary)",
                    }}
                  >
                    {s.value}
                  </span>
                </div>
              ))}
              <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                {["Next.js 16", "TypeScript", "App Router"].map((t) => (
                  <span
                    key={t}
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.62rem",
                      padding: "0.15rem 0.5rem",
                      borderRadius: "9999px",
                      background: "rgba(255,85,0,0.06)",
                      border: "1px solid rgba(255,85,0,0.15)",
                      color: "rgba(255,119,68,0.7)",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="divider" style={{ maxWidth: "1100px", margin: "0 auto" }} />

        {/* TRILHA */}
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
            <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginTop: "0.4rem" }}>
              Siga as aulas em ordem para melhor aproveitamento
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {aulas.map((aula, i) => {
              const isActive = aula.status === "active";
              const isChallenge = aula.status === "challenge";

              return (
                <div
                  key={aula.num}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1.25rem",
                    padding: "1.25rem 1.5rem",
                    borderRadius: "14px",
                    background: "var(--dark-2)",
                    border: isActive
                      ? "1px solid rgba(255,85,0,0.2)"
                      : isChallenge
                      ? "1px solid rgba(251,191,36,0.2)"
                      : "1px solid rgba(255,255,255,0.04)",
                  }}
                >
                  {/* Icon */}
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
                      boxShadow: isActive
                        ? "0 0 20px rgba(255,85,0,0.25)"
                        : isChallenge
                        ? "0 0 20px rgba(251,191,36,0.15)"
                        : undefined,
                    }}
                  >
                    {aula.icon}
                  </div>

                  {/* Content */}
                  <div style={{ flex: 1, minWidth: "200px" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.6rem",
                        marginBottom: "0.2rem",
                        flexWrap: "wrap",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.65rem",
                          color: isActive || isChallenge ? "#FF7744" : "rgba(255,255,255,0.2)",
                          letterSpacing: "0.08em",
                        }}
                      >
                        {aula.num}
                      </span>
                      {isActive && (
                        <span className="badge badge-fire" style={{ fontSize: "0.58rem" }}>
                          Disponível
                        </span>
                      )}
                      {isChallenge && (
                        <span className="badge badge-amber" style={{ fontSize: "0.58rem" }}>
                          🏆 Desafio
                        </span>
                      )}
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.62rem",
                          color: "rgba(255,255,255,0.2)",
                        }}
                      >
                        {aula.duration}
                        {aula.slides ? ` · ${aula.slides} slides` : " · checklist interativo"}
                      </span>
                    </div>
                    <h3
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "1.15rem",
                        letterSpacing: "0.03em",
                        color: "var(--text-primary)",
                        marginBottom: "0.2rem",
                      }}
                    >
                      {aula.title}
                    </h3>
                    <p
                      style={{
                        fontSize: "0.8rem",
                        color: "var(--text-muted)",
                        lineHeight: 1.5,
                      }}
                    >
                      {aula.desc}
                    </p>
                  </div>

                  {/* Connector line */}
                  {i < aulas.length - 1 && (
                    <div
                      style={{
                        position: "absolute",
                        left: "3.5rem",
                        marginTop: "4rem",
                        display: "none",
                      }}
                    />
                  )}

                  {/* Action */}
                  <Link
                    href={aula.href}
                    className={isActive || isChallenge ? "fire-btn" : ""}
                    style={{
                      flexShrink: 0,
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.4rem",
                      padding: "0.6rem 1.25rem",
                      borderRadius: "8px",
                      fontSize: "0.82rem",
                      fontWeight: 600,
                      textDecoration: "none",
                      ...(isActive || isChallenge
                        ? { color: "#fff" }
                        : {
                            color: "var(--text-muted)",
                            background: "rgba(255,255,255,0.03)",
                            border: "1px solid rgba(255,255,255,0.06)",
                          }),
                    }}
                  >
                    {isChallenge ? "Ver Desafio →" : "Iniciar →"}
                  </Link>
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
