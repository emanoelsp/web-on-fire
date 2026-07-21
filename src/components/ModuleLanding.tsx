import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getAulaLocks } from "@/services/progressService";

export interface LandingAula {
  slug: string;
  num: string;
  title: string;
  desc: string;
  href: string;
  icon: string;
  duration: string;
  slides: number | null;
  challenge?: boolean;
}

export interface LandingGroup {
  label: string;
  title: string;
  desc: string;
  items: LandingAula[];
}

export interface ModuleLandingProps {
  moduleTag: string; // ex: "módulo 03"
  badge: string; // ex: "🎨 Módulo 03 — Aulas 09 a 13"
  titleTop: string; // ex: "ESTILIZAÇÃO"
  titleBottom: string; // ex: "AVANÇADA & UI"
  description: string;
  ctaHref: string;
  ctaLabel: string;
  stats: { value: string; label: string; fire?: boolean }[];
  tags: string[];
  groups: LandingGroup[];
  trilhaHint: string;
}

export default async function ModuleLanding({
  moduleTag,
  badge,
  titleTop,
  titleBottom,
  description,
  ctaHref,
  ctaLabel,
  stats,
  tags,
  groups,
  trilhaHint,
}: ModuleLandingProps) {
  const { lockedAulas } = await getAulaLocks();

  return (
    <div style={{ minHeight: "100vh", background: "var(--dark-1)", display: "flex", flexDirection: "column" }}>
      <Navbar />

      <main style={{ flex: 1 }}>
        <section style={{ position: "relative", padding: "5rem 1.5rem 4rem", maxWidth: "1100px", margin: "0 auto", overflow: "hidden" }}>
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

          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "2rem", fontSize: "0.78rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
            <Link href="/" style={{ color: "var(--text-muted)", textDecoration: "none" }}>início</Link>
            <span>/</span>
            <span style={{ color: "rgba(255,119,68,0.7)" }}>{moduleTag}</span>
          </div>

          <div style={{ display: "flex", alignItems: "flex-start", gap: "2rem", flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: "280px" }}>
              <span className="badge badge-fire" style={{ marginBottom: "1.25rem", display: "inline-flex" }}>
                {badge}
              </span>
              <h1
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2.2rem, 5.5vw, 4rem)",
                  lineHeight: 0.95,
                  letterSpacing: "0.02em",
                  color: "var(--text-primary)",
                  marginBottom: "1.25rem",
                }}
              >
                {titleTop}
                <br />
                <span className="fire-text">{titleBottom}</span>
              </h1>
              <p style={{ fontSize: "1rem", color: "var(--text-muted)", lineHeight: 1.8, maxWidth: "540px", marginBottom: "2rem" }}>
                {description}
              </p>

              <Link
                href={ctaHref}
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
                🔥 {ctaLabel}
              </Link>
            </div>

            <div className="card fire-border" style={{ borderRadius: "16px", padding: "1.75rem", minWidth: "220px", flexShrink: 0 }}>
              {stats.map((s) => (
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
                  <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>{s.label}</span>
                  <span
                    className={s.fire ? "fire-text" : ""}
                    style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", color: s.fire ? undefined : "var(--text-primary)" }}
                  >
                    {s.value}
                  </span>
                </div>
              ))}
              <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                {tags.map((t) => (
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

        <section style={{ padding: "4rem 1.5rem", maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 3vw, 2.5rem)", letterSpacing: "0.04em", color: "var(--text-primary)" }}>
              TRILHA DO MÓDULO
            </h2>
            <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginTop: "0.4rem" }}>{trilhaHint}</p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {groups.map((grupo) => (
              <div key={grupo.label}>
                <div style={{ marginBottom: "0.9rem" }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "0.75rem", flexWrap: "wrap" }}>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", color: "#FF7744", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 700 }}>
                      {grupo.label}
                    </span>
                    <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", letterSpacing: "0.03em", color: "var(--text-primary)" }}>
                      {grupo.title}
                    </h3>
                  </div>
                  <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "0.2rem" }}>{grupo.desc}</p>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {grupo.items.map((aula) => {
                    const locked = lockedAulas.includes(aula.slug);
                    const isChallenge = !!aula.challenge && !locked;

                    return (
                      <div
                        key={aula.slug}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "1.25rem",
                          padding: "1.25rem 1.5rem",
                          borderRadius: "14px",
                          background: "var(--dark-2)",
                          border: locked
                            ? "1px solid rgba(255,255,255,0.04)"
                            : isChallenge
                            ? "1px solid rgba(251,191,36,0.2)"
                            : "1px solid rgba(255,85,0,0.2)",
                          opacity: locked ? 0.55 : 1,
                        }}
                      >
                        <div
                          style={{
                            width: "3rem",
                            height: "3rem",
                            borderRadius: "10px",
                            background: locked
                              ? "rgba(255,255,255,0.05)"
                              : isChallenge
                              ? "linear-gradient(135deg, #FFB800, #FF6600)"
                              : "linear-gradient(135deg, #FF5500, #CC2200)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "1.3rem",
                            flexShrink: 0,
                            boxShadow: locked ? undefined : isChallenge ? "0 0 20px rgba(251,191,36,0.15)" : "0 0 20px rgba(255,85,0,0.25)",
                          }}
                        >
                          {locked ? "🔒" : aula.icon}
                        </div>

                        <div style={{ flex: 1, minWidth: "200px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.2rem", flexWrap: "wrap" }}>
                            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: locked ? "rgba(255,255,255,0.2)" : "#FF7744", letterSpacing: "0.08em" }}>
                              {aula.num}
                            </span>
                            {locked ? (
                              <span className="badge badge-blue" style={{ fontSize: "0.58rem" }}>🔒 Bloqueada pelo professor</span>
                            ) : isChallenge ? (
                              <span className="badge badge-amber" style={{ fontSize: "0.58rem" }}>🏆 Desafio</span>
                            ) : (
                              <span className="badge badge-fire" style={{ fontSize: "0.58rem" }}>Disponível</span>
                            )}
                            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", color: "rgba(255,255,255,0.2)" }}>
                              {aula.duration}
                              {aula.slides ? ` · ${aula.slides} slides` : " · checklist interativo"}
                            </span>
                          </div>
                          <h4 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", letterSpacing: "0.03em", color: "var(--text-primary)", marginBottom: "0.2rem" }}>
                            {aula.title}
                          </h4>
                          <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", lineHeight: 1.5 }}>{aula.desc}</p>
                        </div>

                        {locked ? (
                          <span
                            style={{
                              flexShrink: 0,
                              padding: "0.6rem 1.25rem",
                              borderRadius: "8px",
                              fontSize: "0.82rem",
                              fontWeight: 600,
                              color: "rgba(255,255,255,0.25)",
                              background: "rgba(255,255,255,0.03)",
                              border: "1px solid rgba(255,255,255,0.06)",
                            }}
                          >
                            Em breve
                          </span>
                        ) : (
                          <Link
                            href={aula.href}
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
                              textDecoration: "none",
                              color: "#fff",
                            }}
                          >
                            {isChallenge ? "Ver Desafio →" : "Iniciar →"}
                          </Link>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
