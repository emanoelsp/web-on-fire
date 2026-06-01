import Link from "next/link";
import Navbar from "@/components/Navbar";

const atividades = [
  {
    n: "01",
    badge: "badge-amber",
    badgeText: "Atividade 1",
    title: "Configuração do Firebase Firestore",
    desc: "Crie o projeto no Firebase Console, configure o Firestore, crie o .env.local com suas credenciais e teste a conexão gravando o primeiro documento.",
    items: [
      "Criar projeto no Firebase Console",
      "Configurar Cloud Firestore (modo teste)",
      "Criar .env.local com as credenciais",
      "Instalar e configurar a biblioteca Firebase",
      "Testar conexão com /hello-firebase",
    ],
    href: "/modulos/backend/atividade-1",
    hrefTest: "/modulos/backend/hello-firebase",
    cta: "Começar Atividade 1",
  },
  {
    n: "02",
    badge: "badge-green",
    badgeText: "Atividade 2",
    title: "Cadastro com Arquitetura em Camadas",
    desc: "Construa um formulário de cadastro (nome, e-mail, telefone) usando a arquitetura types → services → lib → app. Após o cadastro, o usuário é redirecionado ao perfil.",
    items: [
      "Criar types/user.ts com interface User",
      "Criar services/userService.ts",
      "Formulário de cadastro com useClient",
      "Página de perfil com busca no Firestore",
      "Redirect automático após cadastro",
    ],
    href: "/modulos/backend/atividade-2",
    hrefTest: null,
    cta: "Começar Atividade 2",
  },
];

const stack = [
  { name: "Next.js 16", desc: "App Router + Server Components", cor: "#fff" },
  { name: "TypeScript", desc: "Tipagem estática e interfaces", cor: "#3b82f6" },
  { name: "Firebase", desc: "Firestore NoSQL database", cor: "#FF7744" },
  { name: "Tailwind CSS", desc: "Estilização utilitária", cor: "#06b6d4" },
];

export default function ModuloBackendPage() {
  return (
    <>
    <Navbar />
    <main style={{ minHeight: "100vh", background: "var(--dark-1)", padding: "2rem 1.5rem" }}>
      <div style={{ maxWidth: "860px", margin: "0 auto" }}>

        {/* BACK */}
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            color: "var(--text-muted)",
            textDecoration: "none",
            fontSize: "0.85rem",
            marginBottom: "2rem",
          }}
        >
          ← Home
        </Link>

        {/* HEADER */}
        <div style={{ marginBottom: "3rem" }}>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1rem" }}>
            <span className="badge badge-fire">🔥 Web On Fire Academy</span>
            <span className="badge badge-blue">Módulo Atual</span>
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.5rem, 6vw, 4rem)",
              letterSpacing: "0.04em",
              lineHeight: 1,
              marginBottom: "1.25rem",
            }}
          >
            <span className="fire-text">MÓDULO</span>
            <br />
            BACKEND
          </h1>
          <p style={{ color: "var(--text-muted)", lineHeight: 1.75, fontSize: "1rem", maxWidth: "560px" }}>
            Aprenda a integrar o Firebase Firestore em um projeto Next.js com
            arquitetura profissional em camadas. Duas atividades práticas com
            roteiro completo, conceitos didáticos e desafios extras.
          </p>
        </div>

        {/* STACK */}
        <section style={{ marginBottom: "2.5rem" }}>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--text-muted)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1rem" }}>
            Stack utilizada
          </p>
          <div style={{ display: "flex", gap: "0.65rem", flexWrap: "wrap" }}>
            {stack.map((s) => (
              <div
                key={s.name}
                style={{
                  padding: "0.5rem 1rem",
                  borderRadius: "8px",
                  background: "var(--dark-2)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: s.cor, flexShrink: 0 }} />
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "var(--text-primary)", fontWeight: 600 }}>
                  {s.name}
                </span>
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{s.desc}</span>
              </div>
            ))}
          </div>
        </section>

        <div className="divider" />

        {/* ATIVIDADES */}
        <section style={{ marginBottom: "2.5rem" }}>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.5rem",
              letterSpacing: "0.04em",
              marginBottom: "1.5rem",
            }}
          >
            ATIVIDADES
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {atividades.map((at) => (
              <div
                key={at.n}
                className="card fire-border"
                style={{ borderRadius: "16px", padding: "2rem", position: "relative", overflow: "hidden" }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "radial-gradient(ellipse at top left, rgba(255,85,0,0.04) 0%, transparent 60%)",
                    pointerEvents: "none",
                  }}
                />

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem", flexWrap: "wrap", gap: "0.5rem" }}>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "3rem",
                      color: "rgba(255,85,0,0.12)",
                      fontWeight: 900,
                      lineHeight: 1,
                      position: "absolute",
                      top: "1.25rem",
                      right: "1.5rem",
                    }}
                  >
                    {at.n}
                  </span>
                  <span className={`badge ${at.badge}`}>{at.badgeText}</span>
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
                  {at.title}
                </h3>

                <p style={{ color: "var(--text-muted)", fontSize: "0.87rem", lineHeight: 1.7, marginBottom: "1.25rem" }}>
                  {at.desc}
                </p>

                <ul style={{ listStyle: "none", marginBottom: "1.5rem" }}>
                  {at.items.map((item) => (
                    <li
                      key={item}
                      style={{
                        fontSize: "0.83rem",
                        color: "rgba(255,255,255,0.5)",
                        padding: "0.35rem 0",
                        borderBottom: "1px solid rgba(255,255,255,0.04)",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                      }}
                    >
                      <span style={{ color: "var(--fire-orange)", fontSize: "0.6rem" }}>▶</span>
                      {item}
                    </li>
                  ))}
                </ul>

                <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                  <Link
                    href={at.href}
                    className="fire-btn"
                    style={{
                      padding: "0.7rem 1.5rem",
                      borderRadius: "10px",
                      color: "#fff",
                      textDecoration: "none",
                      fontSize: "0.85rem",
                      fontWeight: 700,
                    }}
                  >
                    {at.cta} →
                  </Link>
                  {at.hrefTest && (
                    <Link
                      href={at.hrefTest}
                      style={{
                        padding: "0.7rem 1.25rem",
                        borderRadius: "10px",
                        color: "var(--text-muted)",
                        textDecoration: "none",
                        fontSize: "0.85rem",
                        fontWeight: 600,
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.07)",
                      }}
                    >
                      ⚗️ Testar Firebase
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FLUXO */}
        <section
          style={{
            background: "var(--dark-2)",
            borderRadius: "16px",
            padding: "2rem",
            marginBottom: "2.5rem",
            border: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", letterSpacing: "0.04em", marginBottom: "1.25rem" }}>
            🔄 FLUXO COMPLETO DA ATIVIDADE 2
          </h2>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              flexWrap: "wrap",
              fontFamily: "var(--font-mono)",
              fontSize: "0.78rem",
            }}
          >
            {[
              { label: "Formulário", sub: "atividade-2/page.tsx" },
              { label: "handleSubmit()", sub: "use client" },
              { label: "cadastrarUsuario()", sub: "userService.ts" },
              { label: "Firestore", sub: "coleção: usuarios" },
              { label: "/perfil/[id]", sub: "page.tsx" },
            ].map((item, i, arr) => (
              <span key={item.label} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span
                  style={{
                    padding: "0.4rem 0.8rem",
                    borderRadius: "8px",
                    background: "rgba(255,85,0,0.08)",
                    border: "1px solid rgba(255,85,0,0.2)",
                    textAlign: "center",
                  }}
                >
                  <span style={{ color: "#FF7744", display: "block" }}>{item.label}</span>
                  <span style={{ color: "var(--text-muted)", fontSize: "0.65rem" }}>{item.sub}</span>
                </span>
                {i < arr.length - 1 && <span style={{ color: "rgba(255,85,0,0.4)", fontSize: "1rem" }}>→</span>}
              </span>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <Link
            href="/modulos/backend/atividade-1"
            className="fire-btn"
            style={{
              flex: 1, minWidth: "220px", padding: "1rem",
              textAlign: "center", borderRadius: "12px",
              color: "#fff", textDecoration: "none",
              fontSize: "0.9rem", fontWeight: 700,
            }}
          >
            🔥 Começar pela Atividade 1
          </Link>
          <Link
            href="/"
            style={{
              flex: 1, minWidth: "220px", padding: "1rem",
              textAlign: "center", borderRadius: "12px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.07)",
              color: "var(--text-muted)", textDecoration: "none",
              fontSize: "0.9rem", fontWeight: 600,
            }}
          >
            ← Todos os módulos
          </Link>
        </div>
      </div>
    </main>
    </>
  );
}
