import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getModulesVisibility } from "@/services/moduleVisibilityService";
import { ALL_MODULES, ModuleMeta } from "@/types/modules";

const features = [
  {
    icon: "⚗️",
    title: "Labs 100% Interativos",
    desc: "Cada módulo é um laboratório real: você escreve, roda e vê funcionando. Nada de copiar código sem entender.",
  },
  {
    icon: "💬",
    title: "Código Comentado",
    desc: "Todo código é testado e comentado linha a linha. Você aprende o que cada parte faz e por quê está ali.",
  },
  {
    icon: "🪜",
    title: "Passo a Passo Intuitivo",
    desc: "Roteiro claro do zero ao deploy: objetivo, pré-requisitos, desafio extra e critérios de avaliação.",
  },
  {
    icon: "🔥",
    title: "O que está Pegando Fogo",
    desc: "Next.js 16, React 19, TypeScript, Tailwind v4 e Firebase — o que o mercado está usando agora.",
  },
];

export default async function HomePage() {
  const visibility = await getModulesVisibility();

  const visibleModules = ALL_MODULES.filter((m) => visibility[m.id]);
  const activeModule = visibleModules[0] ?? null;

  return (
    <div style={{ minHeight: "100vh", background: "var(--dark-1)", display: "flex", flexDirection: "column" }}>
      <Navbar />

      <main style={{ flex: 1 }}>
        {/* HERO */}
        <section
          style={{
            position: "relative",
            padding: "7rem 1.5rem 6rem",
            textAlign: "center",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "20%",
              left: "50%",
              transform: "translateX(-50%)",
              width: "700px",
              height: "450px",
              background: "radial-gradient(ellipse, rgba(255,85,0,0.1) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />

          <div style={{ maxWidth: "860px", margin: "0 auto", position: "relative" }}>
            <span className="badge badge-fire" style={{ marginBottom: "1.5rem", display: "inline-flex" }}>
              🔥 &nbsp;Next.js · React · Tailwind · Firebase · TypeScript
            </span>

            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(3rem, 8vw, 6.5rem)",
                lineHeight: 0.95,
                letterSpacing: "0.02em",
                marginBottom: "1.5rem",
                color: "var(--text-primary)",
              }}
            >
              APRENDA NA PRÁTICA
              <br />
              <span className="fire-text">O QUE ESTÁ</span>
              <br />
              <span className="fire-text">PEGANDO FOGO</span>
              <br />
              NA WEB.
            </h1>

            <p
              style={{
                fontSize: "1.1rem",
                color: "var(--text-muted)",
                lineHeight: 1.8,
                maxWidth: "560px",
                margin: "0 auto 2.5rem",
              }}
            >
              Laboratórios <strong style={{ color: "var(--text-primary)" }}>100% interativos</strong>,
              códigos <strong style={{ color: "var(--text-primary)" }}>testados e comentados</strong>,
              passo a passo <strong style={{ color: "var(--text-primary)" }}>intuitivo</strong>.
            </p>

            {activeModule && (
              <Link
                href={activeModule.href}
                className="fire-btn"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.95rem 2.5rem",
                  borderRadius: "12px",
                  color: "#fff",
                  textDecoration: "none",
                  fontWeight: 700,
                  fontSize: "1rem",
                  letterSpacing: "0.02em",
                }}
              >
                🔥 Começar agora — {activeModule.title}
              </Link>
            )}

            {/* stats */}
            <div
              style={{
                display: "flex",
                gap: "3rem",
                justifyContent: "center",
                marginTop: "4rem",
                flexWrap: "wrap",
              }}
            >
              {[
                { value: String(ALL_MODULES.length), label: "Módulos" },
                { value: String(visibleModules.length), label: "Ativos" },
                { value: "100%", label: "Prático" },
              ].map((s) => (
                <div key={s.label} style={{ textAlign: "center" }}>
                  <div
                    className="fire-text"
                    style={{ fontFamily: "var(--font-display)", fontSize: "2.8rem", lineHeight: 1 }}
                  >
                    {s.value}
                  </div>
                  <div
                    style={{
                      fontSize: "0.8rem",
                      color: "var(--text-muted)",
                      marginTop: "0.3rem",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                    }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="divider" style={{ maxWidth: "1200px", margin: "0 auto 0" }} />

        {/* MODULES GRID */}
        <section style={{ padding: "5rem 1.5rem", maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ marginBottom: "3rem" }}>
            <span className="badge badge-fire" style={{ marginBottom: "1rem", display: "inline-flex" }}>
              Trilha de aprendizado
            </span>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                letterSpacing: "0.04em",
                color: "var(--text-primary)",
              }}
            >
              MÓDULOS DO CURSO
            </h2>
            <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginTop: "0.5rem" }}>
              {visibleModules.length} módulo{visibleModules.length !== 1 ? "s" : ""} disponível{visibleModules.length !== 1 ? "s" : ""}
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "1.25rem",
            }}
          >
            {ALL_MODULES.map((mod) => (
              <ModuleCard
                key={mod.id}
                mod={mod}
                visible={visibility[mod.id] ?? false}
              />
            ))}
          </div>
        </section>

        <div className="divider" style={{ maxWidth: "1200px", margin: "0 auto" }} />

        {/* FEATURES */}
        <section style={{ padding: "5rem 1.5rem", maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ marginBottom: "3rem" }}>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                letterSpacing: "0.04em",
                color: "var(--text-primary)",
              }}
            >
              POR QUE WEB ON FIRE?
            </h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "1.25rem",
            }}
          >
            {features.map((f) => (
              <div key={f.title} className="card" style={{ borderRadius: "12px", padding: "1.75rem" }}>
                <span style={{ fontSize: "2rem", display: "block", marginBottom: "1rem" }}>{f.icon}</span>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.3rem",
                    letterSpacing: "0.04em",
                    marginBottom: "0.6rem",
                    color: "var(--text-primary)",
                  }}
                >
                  {f.title}
                </h3>
                <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.7 }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        {activeModule && (
          <section style={{ padding: "5rem 1.5rem", textAlign: "center" }}>
            <div
              style={{
                maxWidth: "700px",
                margin: "0 auto",
                padding: "4rem 2rem",
                borderRadius: "20px",
                background: "var(--dark-2)",
                border: "1px solid rgba(255,85,0,0.2)",
                boxShadow: "0 0 60px rgba(255,85,0,0.08)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%,-50%)",
                  width: "400px",
                  height: "300px",
                  background: "radial-gradient(ellipse, rgba(255,85,0,0.1) 0%, transparent 70%)",
                  pointerEvents: "none",
                }}
              />
              <h2
                className="fire-text"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2.5rem, 6vw, 4rem)",
                  lineHeight: 1,
                  letterSpacing: "0.04em",
                  marginBottom: "1rem",
                  position: "relative",
                }}
              >
                PRONTO PARA
                <br />
                PEGAR FOGO?
              </h2>
              <p
                style={{
                  color: "var(--text-muted)",
                  marginBottom: "2rem",
                  fontSize: "1rem",
                  position: "relative",
                  lineHeight: 1.7,
                }}
              >
                Labs interativos, código comentado e passo a passo intuitivo.
                <br />
                Comece agora com <strong style={{ color: "var(--text-primary)" }}>{activeModule.title}</strong>.
              </p>
              <Link
                href={activeModule.href}
                className="fire-btn"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.95rem 2.5rem",
                  borderRadius: "12px",
                  color: "#fff",
                  textDecoration: "none",
                  fontWeight: 700,
                  fontSize: "1rem",
                  letterSpacing: "0.02em",
                  position: "relative",
                }}
              >
                🔥 {activeModule.title}
              </Link>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}

function ModuleCard({ mod, visible }: { mod: ModuleMeta; visible: boolean }) {
  const isActive = visible && mod.href !== "#";
  const isLocked = !visible;

  return (
    <div
      className={`card ${isActive ? "fire-border" : ""}`}
      style={{
        borderRadius: "14px",
        padding: "1.75rem",
        position: "relative",
        opacity: isLocked ? 0.45 : 1,
        transition: "all 0.3s ease",
      }}
    >
      {isActive && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "14px",
            background: "radial-gradient(ellipse at top left, rgba(255,85,0,0.06) 0%, transparent 60%)",
            pointerEvents: "none",
          }}
        />
      )}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "1.25rem",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.7rem",
            color: "var(--text-muted)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
          }}
        >
          <span style={{ fontSize: "1.1rem" }}>{mod.icon}</span>
          {mod.label}
        </span>
        <span className={`badge ${isActive ? "badge-fire" : isLocked ? "badge-blue" : "badge-amber"}`}>
          {isLocked ? "🔒 Bloqueado" : isActive ? "🔥 Disponível" : "⏳ Em breve"}
        </span>
      </div>

      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "1.5rem",
          letterSpacing: "0.04em",
          marginBottom: "0.75rem",
          color: "var(--text-primary)",
        }}
      >
        {mod.title}
      </h3>

      <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.7, marginBottom: "1.25rem" }}>
        {mod.desc}
      </p>

      <ul style={{ listStyle: "none", marginBottom: "1.5rem" }}>
        {mod.atividades.slice(0, 3).map((at) => (
          <li
            key={at}
            style={{
              fontSize: "0.82rem",
              color: "rgba(255,255,255,0.4)",
              padding: "0.3rem 0",
              borderBottom: "1px solid rgba(255,255,255,0.04)",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <span style={{ color: isActive ? "var(--fire-orange)" : "rgba(255,255,255,0.2)", fontSize: "0.6rem" }}>
              ▶
            </span>
            {at}
          </li>
        ))}
        {mod.atividades.length > 3 && (
          <li
            style={{
              fontSize: "0.75rem",
              color: "rgba(255,255,255,0.25)",
              padding: "0.3rem 0",
              fontFamily: "var(--font-mono)",
            }}
          >
            +{mod.atividades.length - 3} mais...
          </li>
        )}
      </ul>

      {isActive ? (
        <Link
          href={mod.href}
          className="fire-btn"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            padding: "0.6rem 1.2rem",
            borderRadius: "8px",
            fontSize: "0.82rem",
            fontWeight: 600,
            textDecoration: "none",
            color: "#fff",
          }}
        >
          Começar Lab →
        </Link>
      ) : (
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            padding: "0.6rem 1.2rem",
            borderRadius: "8px",
            fontSize: "0.82rem",
            fontWeight: 600,
            color: "var(--text-muted)",
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {isLocked ? "🔒 Bloqueado" : "Em breve"}
        </span>
      )}
    </div>
  );
}
