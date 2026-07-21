import Link from "next/link";
import Navbar from "@/components/Navbar";

const aulas = [
  {
    n: "5.1",
    badge: "badge-blue",
    badgeText: "Aula",
    emoji: "🔥",
    title: "Firebase Firestore",
    desc: "Configure o banco NoSQL do Google: crie o projeto no Firebase Console, configure o .env.local, instale o SDK e grave o primeiro documento.",
    items: [
      "O que é Firebase e Firestore",
      "SQL vs NoSQL — quando usar cada um",
      "Coleções e Documentos",
      ".env.local com as credenciais",
      "firebaseConfig.ts e o primeiro teste",
    ],
    href: "/modulos/backend/aula-71",
    hrefExtra: "/modulos/backend/atividade-1",
    ctaExtra: "Roteiro ↗",
    cta: "Ver Slides →",
    cor: "#60a5fa",
  },
  {
    n: "5.2",
    badge: "badge-green",
    badgeText: "Aula",
    emoji: "🏗️",
    title: "Cadastro em Camadas",
    desc: "Construa um formulário de cadastro profissional com a arquitetura types → services → lib → app, redirect automático e página de perfil.",
    items: [
      "Por que arquitetura em camadas?",
      "types/user.ts — interface e Omit<>",
      "services/userService.ts com addDoc",
      "Formulário com 'use client' e useRouter",
      "Página de perfil com Server Component",
    ],
    href: "/modulos/backend/aula-72",
    hrefExtra: "/modulos/backend/atividade-2",
    ctaExtra: "Roteiro ↗",
    cta: "Ver Slides →",
    cor: "#4ade80",
  },
  {
    n: "AI",
    badge: "badge-amber",
    badgeText: "Atividade Intermediária",
    emoji: "🎯",
    title: "Sistema Acadêmico — Cadastro e Busca",
    desc: "Projeto completo com 4 entidades no Firestore: alunos, cursos, turmas e matrículas. Cadastro e listagem funcionando com arquitetura em camadas.",
    items: [
      "Alunos (nome, email, telefone, CPF)",
      "Cursos (nome, descrição, carga horária)",
      "Turmas vinculadas a cursos",
      "Matrículas com status e data/hora",
      "4 services + 4 interfaces TypeScript",
    ],
    href: "/modulos/backend/parte1",
    hrefExtra: null,
    ctaExtra: null,
    cta: "Acessar Sistema →",
    cor: "#fbbf24",
  },
  {
    n: "5.3",
    badge: "badge-fire",
    badgeText: "Aula",
    emoji: "✏️",
    title: "CRUD Completo",
    desc: "Adicione busca, atualização (updateDoc) e exclusão (deleteDoc) ao sistema — evoluindo o mesmo projeto da Aula 5.2 com CRUD completo.",
    items: [
      "O que é CRUD — Create, Read, Update, Delete",
      "updateDoc() — atualização parcial de campos",
      "deleteDoc() — exclusão com confirmação",
      "Busca filtrando no cliente com .filter()",
      "Formulário de edição inline pré-preenchido",
    ],
    href: "/modulos/backend/aula-73",
    hrefExtra: null,
    ctaExtra: null,
    cta: "Ver Slides →",
    cor: "#FF7744",
  },
  {
    n: "AF",
    badge: "badge-fire",
    badgeText: "Atividade Final",
    emoji: "🏆",
    title: "Sistema Acadêmico — Busca, Alteração e Exclusão",
    desc: "Evolução da Atividade Intermediária com CRUD completo: busca por nome, edição inline, troca de status de matrículas e exclusão para todas as 4 entidades.",
    items: [
      "Busca por nome/email de alunos em tempo real",
      "Edição inline de alunos, cursos e turmas",
      "Exclusão com confirm() antes de deletar",
      "Troca de status de matrículas (updateDoc)",
      "Exclusão de matrículas canceladas",
    ],
    href: "/modulos/backend/parte2",
    hrefExtra: null,
    ctaExtra: null,
    cta: "Acessar Sistema →",
    cor: "#FF5500",
  },
];

const stack = [
  { name: "Next.js 16", desc: "App Router + Server Components", cor: "#fff" },
  { name: "TypeScript", desc: "Tipagem estática e interfaces", cor: "#3b82f6" },
  { name: "Firebase", desc: "Firestore NoSQL database", cor: "#FF7744" },
  { name: "Tailwind CSS", desc: "Estilização utilitária", cor: "#06b6d4" },
];

const fluxo = [
  { label: "Aula 5.1", sub: "Firebase Config" },
  { label: "Aula 5.2", sub: "Cadastro" },
  { label: "Ativ. Int.", sub: "Sistema CRUD" },
  { label: "Aula 5.3", sub: "Update + Delete" },
  { label: "Ativ. Final", sub: "CRUD Completo" },
];

export default function ModuloBackendPage() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", background: "var(--dark-1)", padding: "2rem 1.5rem" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>

          <Link
            href="/"
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.4rem",
              color: "var(--text-muted)", textDecoration: "none",
              fontSize: "0.85rem", marginBottom: "2rem",
            }}
          >
            ← Home
          </Link>

          {/* HEADER */}
          <div style={{ marginBottom: "3rem" }}>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1rem" }}>
              <span className="badge badge-fire">🔥 Web On Fire Academy</span>
              <span className="badge badge-blue">Módulo 05</span>
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
              <span className="fire-text">MÓDULO 05</span>
              <br />
              FIREBASE &amp; BACKEND
            </h1>
            <p style={{ color: "var(--text-muted)", lineHeight: 1.75, fontSize: "1rem", maxWidth: "600px" }}>
              Do zero ao CRUD completo com Firebase Firestore. Duas aulas com slides
              interativos, duas atividades práticas e um sistema acadêmico real evoluindo
              a cada etapa.
            </p>
          </div>

          {/* FLUXO DO MÓDULO */}
          <section
            style={{
              background: "var(--dark-2)", borderRadius: "16px",
              padding: "1.75rem", marginBottom: "2rem",
              border: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--text-muted)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1rem" }}>
              Jornada do módulo
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap", fontFamily: "var(--font-mono)", fontSize: "0.78rem" }}>
              {fluxo.map((item, i, arr) => (
                <span key={item.label} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span
                    style={{
                      padding: "0.4rem 0.9rem", borderRadius: "8px", textAlign: "center",
                      background: "rgba(255,85,0,0.08)", border: "1px solid rgba(255,85,0,0.2)",
                    }}
                  >
                    <span style={{ color: "#FF7744", display: "block" }}>{item.label}</span>
                    <span style={{ color: "var(--text-muted)", fontSize: "0.65rem" }}>{item.sub}</span>
                  </span>
                  {i < arr.length - 1 && <span style={{ color: "rgba(255,85,0,0.4)" }}>→</span>}
                </span>
              ))}
            </div>
          </section>

          {/* STACK */}
          <section style={{ marginBottom: "2rem" }}>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--text-muted)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1rem" }}>
              Stack utilizada
            </p>
            <div style={{ display: "flex", gap: "0.65rem", flexWrap: "wrap" }}>
              {stack.map((s) => (
                <div
                  key={s.name}
                  style={{
                    padding: "0.5rem 1rem", borderRadius: "8px",
                    background: "var(--dark-2)", border: "1px solid rgba(255,255,255,0.06)",
                    display: "flex", alignItems: "center", gap: "0.5rem",
                  }}
                >
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: s.cor, flexShrink: 0 }} />
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "var(--text-primary)", fontWeight: 600 }}>{s.name}</span>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{s.desc}</span>
                </div>
              ))}
            </div>
          </section>

          <div className="divider" />

          {/* AULAS + ATIVIDADES */}
          <section style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", letterSpacing: "0.04em", marginBottom: "1.5rem" }}>
              AULAS &amp; ATIVIDADES
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {aulas.map((at) => (
                <div
                  key={at.n}
                  className="card fire-border"
                  style={{ borderRadius: "16px", padding: "2rem", position: "relative", overflow: "hidden" }}
                >
                  <div
                    style={{
                      position: "absolute", inset: 0,
                      background: "radial-gradient(ellipse at top left, rgba(255,85,0,0.04) 0%, transparent 60%)",
                      pointerEvents: "none",
                    }}
                  />

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem", flexWrap: "wrap", gap: "0.5rem" }}>
                    <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                      <span className={`badge ${at.badge}`}>{at.badgeText}</span>
                    </div>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)", fontSize: "2.5rem",
                        color: "rgba(255,85,0,0.1)", fontWeight: 900, lineHeight: 1,
                      }}
                    >
                      {at.n}
                    </span>
                  </div>

                  <div style={{ fontSize: "1.6rem", marginBottom: "0.5rem" }}>{at.emoji}</div>
                  <h3
                    style={{
                      fontFamily: "var(--font-display)", fontSize: "1.5rem",
                      letterSpacing: "0.04em", marginBottom: "0.75rem", color: "var(--text-primary)",
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
                          fontSize: "0.83rem", color: "rgba(255,255,255,0.5)",
                          padding: "0.35rem 0", borderBottom: "1px solid rgba(255,255,255,0.04)",
                          display: "flex", alignItems: "center", gap: "0.5rem",
                        }}
                      >
                        <span style={{ color: at.cor, fontSize: "0.6rem" }}>▶</span>
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                    <Link
                      href={at.href}
                      className="fire-btn"
                      style={{
                        padding: "0.7rem 1.5rem", borderRadius: "10px",
                        color: "#fff", textDecoration: "none",
                        fontSize: "0.85rem", fontWeight: 700,
                      }}
                    >
                      {at.cta}
                    </Link>
                    {at.hrefExtra && (
                      <Link
                        href={at.hrefExtra}
                        style={{
                          padding: "0.7rem 1.25rem", borderRadius: "10px",
                          color: "var(--text-muted)", textDecoration: "none",
                          fontSize: "0.85rem", fontWeight: 600,
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(255,255,255,0.07)",
                        }}
                      >
                        {at.ctaExtra}
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* FLUXO COMPLETO ATIVIDADE FINAL */}
          <section
            style={{
              background: "var(--dark-2)", borderRadius: "16px",
              padding: "2rem", marginBottom: "2.5rem",
              border: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", letterSpacing: "0.04em", marginBottom: "1.25rem" }}>
              🔄 FLUXO DA ATIVIDADE FINAL
            </h2>
            <div
              style={{
                display: "flex", alignItems: "center", gap: "0.5rem",
                flexWrap: "wrap", fontFamily: "var(--font-mono)", fontSize: "0.78rem",
              }}
            >
              {[
                { label: "Listar", sub: "getDocs()" },
                { label: "Buscar", sub: ".filter()" },
                { label: "Editar", sub: "updateDoc()" },
                { label: "Confirmar", sub: "confirm()" },
                { label: "Excluir", sub: "deleteDoc()" },
              ].map((item, i, arr) => (
                <span key={item.label} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span
                    style={{
                      padding: "0.4rem 0.8rem", borderRadius: "8px", textAlign: "center",
                      background: "rgba(255,85,0,0.08)", border: "1px solid rgba(255,85,0,0.2)",
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
              href="/modulos/backend/aula-71"
              className="fire-btn"
              style={{
                flex: 1, minWidth: "220px", padding: "1rem",
                textAlign: "center", borderRadius: "12px",
                color: "#fff", textDecoration: "none",
                fontSize: "0.9rem", fontWeight: 700,
              }}
            >
              🔥 Começar pela Aula 5.1
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
