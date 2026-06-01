import Link from "next/link";
import Navbar from "@/components/Navbar";

const modules = [
  {
    id: "backend",
    label: "Módulo Atual",
    badge: "badge-fire",
    badgeText: "🔥 Em andamento",
    title: "Backend com Firebase",
    desc: "Aprenda a configurar e usar o Firebase Firestore em projetos Next.js. Crie cadastros com arquitetura em camadas profissional.",
    atividades: ["Atividade 1 — Config. do Firestore", "Atividade 2 — Cadastro em camadas"],
    href: "/modulos/backend",
  },
  {
    id: "componentes",
    label: "Módulo 2",
    badge: "badge-blue",
    badgeText: "🔒 Em breve",
    title: "Componentes React",
    desc: "Criação de componentes reutilizáveis, props, composição, Context API e gerenciamento de estado avançado.",
    atividades: ["useState e useEffect", "Context API na prática"],
    href: "#",
  },
  {
    id: "roteamento",
    label: "Módulo 3",
    badge: "badge-blue",
    badgeText: "🔒 Em breve",
    title: "App Router & APIs",
    desc: "Next.js App Router, Server Components, Route Handlers e criação de APIs REST internas com TypeScript.",
    atividades: ["Server vs Client Components", "API Routes na prática"],
    href: "#",
  },
  {
    id: "auth",
    label: "Módulo 4",
    badge: "badge-blue",
    badgeText: "🔒 Em breve",
    title: "Autenticação & Segurança",
    desc: "Firebase Auth, NextAuth.js, proteção de rotas, middleware e boas práticas de segurança em aplicações web.",
    atividades: ["Login com Firebase Auth", "Rotas protegidas"],
    href: "#",
  },
];

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
    desc: "Roteiro claro do zero ao deploy: objetivo, pré-requisitos, desafio extra e critérios de avaliação em cada atividade.",
  },
  {
    icon: "🔥",
    title: "O que está Pegando Fogo",
    desc: "Next.js 16, React 19, TypeScript, Tailwind CSS v4 e Firebase — o que o mercado está usando agora.",
  },
];

export default function HomePage() {
  return (
    <main style={{ minHeight: "100vh", background: "var(--dark-1)" }}>
      <Navbar />

      {/* HERO */}
      <section
        style={{
          position: "relative",
          padding: "7rem 1.5rem 6rem",
          textAlign: "center",
          overflow: "hidden",
        }}
      >
        {/* background glow */}
        <div
          style={{
            position: "absolute",
            top: "20%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "600px",
            height: "400px",
            background:
              "radial-gradient(ellipse, rgba(255,85,0,0.12) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div style={{ maxWidth: "860px", margin: "0 auto", position: "relative" }}>
          <span className="badge badge-fire" style={{ marginBottom: "1.5rem", display: "inline-flex" }}>
            🔥 &nbsp;Next.js · React · Firebase · TypeScript
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
              { value: "4", label: "Módulos" },
              { value: "2", label: "Labs ativos" },
              { value: "100%", label: "Prático" },
            ].map((s) => (
              <div key={s.label} style={{ textAlign: "center" }}>
                <div
                  className="fire-text"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "2.8rem",
                    lineHeight: 1,
                  }}
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

      {/* MODULES */}
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
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {modules.map((mod) => (
            <div
              key={mod.id}
              className={`card ${mod.id === "backend" ? "fire-border" : ""}`}
              style={{ borderRadius: "14px", padding: "1.75rem", position: "relative" }}
            >
              {mod.id === "backend" && (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: "14px",
                    background:
                      "radial-gradient(ellipse at top left, rgba(255,85,0,0.06) 0%, transparent 60%)",
                    pointerEvents: "none",
                  }}
                />
              )}

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.25rem" }}>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.7rem",
                    color: "var(--text-muted)",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  {mod.label}
                </span>
                <span className={`badge ${mod.badge}`}>{mod.badgeText}</span>
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

              <p
                style={{
                  fontSize: "0.85rem",
                  color: "var(--text-muted)",
                  lineHeight: 1.7,
                  marginBottom: "1.25rem",
                }}
              >
                {mod.desc}
              </p>

              <ul style={{ listStyle: "none", marginBottom: "1.5rem" }}>
                {mod.atividades.map((at) => (
                  <li
                    key={at}
                    style={{
                      fontSize: "0.82rem",
                      color: "rgba(255,255,255,0.5)",
                      padding: "0.3rem 0",
                      borderBottom: "1px solid rgba(255,255,255,0.04)",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <span style={{ color: "var(--fire-orange)", fontSize: "0.6rem" }}>▶</span>
                    {at}
                  </li>
                ))}
              </ul>

              <Link
                href={mod.href}
                className={mod.id === "backend" ? "fire-btn" : ""}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  padding: "0.6rem 1.2rem",
                  borderRadius: "8px",
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  textDecoration: "none",
                  color: mod.id === "backend" ? "#fff" : "var(--text-muted)",
                  background: mod.id !== "backend" ? "rgba(255,255,255,0.04)" : undefined,
                  border: mod.id !== "backend" ? "1px solid rgba(255,255,255,0.07)" : undefined,
                  cursor: mod.id !== "backend" ? "not-allowed" : "pointer",
                }}
              >
                {mod.id === "backend" ? "Começar Lab →" : "Em breve"}
              </Link>
            </div>
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
            <div
              key={f.title}
              className="card"
              style={{ borderRadius: "12px", padding: "1.75rem" }}
            >
              <span style={{ fontSize: "2rem", display: "block", marginBottom: "1rem" }}>
                {f.icon}
              </span>
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
            Comece agora pelo Módulo Backend com Firebase.
          </p>
          <Link
            href="/modulos/backend/atividade-1"
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
            🔥 Ir para Atividade 1
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        style={{
          borderTop: "1px solid rgba(255,255,255,0.04)",
          padding: "2rem 1.5rem",
          textAlign: "center",
        }}
      >
        <span
          className="fire-text"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.1rem",
            letterSpacing: "0.1em",
          }}
        >
          WEB ON FIRE ACADEMY
        </span>
        <p style={{ color: "var(--text-muted)", fontSize: "0.8rem", marginTop: "0.5rem" }}>
          Laboratórios 100% interativos · Códigos testados e comentados · Passo a passo intuitivo · 2025
        </p>
      </footer>
    </main>
  );
}
