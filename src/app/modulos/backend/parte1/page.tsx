import Link from "next/link";
import Navbar from "@/components/Navbar";

const entidades = [
  {
    n: "01",
    emoji: "👤",
    label: "Alunos",
    desc: "Cadastre alunos com informações básicas: nome, e-mail, telefone e CPF.",
    href: "/modulos/backend/parte1/alunos",
    badge: "badge-blue",
    badgeText: "CRUD",
    campos: ["nome", "email", "telefone", "cpf (opcional)"],
    col: "#60a5fa",
  },
  {
    n: "02",
    emoji: "📚",
    label: "Cursos",
    desc: "Gerencie os cursos disponíveis na instituição com nome e carga horária.",
    href: "/modulos/backend/parte1/cursos",
    badge: "badge-green",
    badgeText: "CRUD",
    campos: ["nome", "descricao", "cargaHoraria"],
    col: "#4ade80",
  },
  {
    n: "03",
    emoji: "🏫",
    label: "Turmas",
    desc: "Crie turmas vinculando-as a cursos já cadastrados no banco.",
    href: "/modulos/backend/parte1/turmas",
    badge: "badge-amber",
    badgeText: "CRUD",
    campos: ["nome", "curso (select)", "periodo", "vagas"],
    col: "#fbbf24",
  },
  {
    n: "04",
    emoji: "📋",
    label: "Matrículas",
    desc: "Matricule alunos em turmas. Gera data/hora automática e controla o status.",
    href: "/modulos/backend/parte1/matriculas",
    badge: "badge-fire",
    badgeText: "Feature",
    campos: ["aluno (select)", "turma (select)", "status", "dataHora (auto)"],
    col: "#FF7744",
  },
];

const fluxo = [
  { label: "Cadastrar Curso", sub: "/cursos" },
  { label: "Criar Turma", sub: "vincula curso" },
  { label: "Cadastrar Aluno", sub: "/alunos" },
  { label: "Realizar Matrícula", sub: "aluno + turma" },
  { label: "Firestore", sub: "4 coleções" },
];

export default function Parte1Page() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", background: "var(--dark-1)", padding: "2rem 1.5rem" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>

          <Link
            href="/modulos/backend"
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.4rem",
              color: "var(--text-muted)", textDecoration: "none",
              fontSize: "0.85rem", marginBottom: "2rem",
            }}
          >
            ← Módulo Backend
          </Link>

          <div style={{ marginBottom: "3rem" }}>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1rem" }}>
              <span className="badge badge-fire">🔥 Módulo Backend</span>
              <span className="badge badge-amber">Parte 1</span>
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
              <span className="fire-text">SISTEMA</span>
              <br />ACADÊMICO
            </h1>
            <p style={{ color: "var(--text-muted)", lineHeight: 1.75, fontSize: "1rem", maxWidth: "560px" }}>
              Projeto completo de cadastro e busca com Firebase Firestore. Quatro
              entidades interligadas: <strong style={{ color: "var(--text-primary)" }}>alunos, cursos, turmas e matrículas</strong>.
            </p>
          </div>

          {/* FLUXO */}
          <section
            style={{
              background: "var(--dark-2)", borderRadius: "16px",
              padding: "1.75rem", marginBottom: "2.5rem",
              border: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--text-muted)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1rem" }}>
              Fluxo do sistema
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

          <div className="divider" />

          {/* CARDS */}
          <section style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", letterSpacing: "0.04em", marginBottom: "1.5rem" }}>
              ENTIDADES
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))", gap: "1.25rem" }}>
              {entidades.map((e) => (
                <div
                  key={e.n}
                  className="card fire-border"
                  style={{ borderRadius: "16px", padding: "1.75rem", position: "relative", overflow: "hidden" }}
                >
                  <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at top left, rgba(255,85,0,0.04) 0%, transparent 60%)", pointerEvents: "none" }} />

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                    <span className={`badge ${e.badge}`}>{e.badgeText}</span>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "2rem", color: "rgba(255,85,0,0.1)", fontWeight: 900, lineHeight: 1 }}>{e.n}</span>
                  </div>

                  <div style={{ fontSize: "2rem", marginBottom: "0.6rem" }}>{e.emoji}</div>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", letterSpacing: "0.04em", marginBottom: "0.6rem" }}>
                    {e.label.toUpperCase()}
                  </h3>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", lineHeight: 1.65, marginBottom: "1.25rem" }}>
                    {e.desc}
                  </p>

                  <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
                    {e.campos.map(c => (
                      <span
                        key={c}
                        style={{
                          fontFamily: "var(--font-mono)", fontSize: "0.68rem",
                          padding: "0.2rem 0.55rem", borderRadius: "4px",
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(255,255,255,0.07)",
                          color: e.col,
                        }}
                      >
                        {c}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={e.href}
                    className="fire-btn"
                    style={{
                      display: "inline-block", padding: "0.65rem 1.4rem",
                      borderRadius: "10px", color: "#fff", textDecoration: "none",
                      fontSize: "0.85rem", fontWeight: 700,
                    }}
                  >
                    Abrir {e.label} →
                  </Link>
                </div>
              ))}
            </div>
          </section>

          {/* COLEÇÕES FIRESTORE */}
          <section
            style={{
              background: "var(--dark-2)", borderRadius: "16px",
              padding: "1.75rem", marginBottom: "2.5rem",
              border: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", letterSpacing: "0.04em", marginBottom: "1.25rem" }}>
              🔥 COLEÇÕES NO FIRESTORE
            </h2>
            <pre className="code-block" style={{ fontFamily: "var(--font-mono)", margin: 0 }}>
{`Firestore/
├── alunos/          { nome, email, telefone, cpf?, createdAt }
├── cursos/          { nome, descricao, cargaHoraria, createdAt }
├── turmas/          { nome, cursoId, cursoNome, periodo, vagas, createdAt }
└── matriculas/      { alunoId, alunoNome, turmaId, turmaNome,
                       cursoNome, status, dataHora, createdAt }`}
            </pre>
          </section>

          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Link
              href="/modulos/backend/parte1/alunos"
              className="fire-btn"
              style={{
                flex: 1, minWidth: "220px", padding: "1rem", textAlign: "center",
                borderRadius: "12px", color: "#fff", textDecoration: "none",
                fontSize: "0.9rem", fontWeight: 700,
              }}
            >
              👤 Começar pelos Alunos
            </Link>
            <Link
              href="/modulos/backend"
              style={{
                flex: 1, minWidth: "180px", padding: "1rem", textAlign: "center",
                borderRadius: "12px", background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.07)", color: "var(--text-muted)",
                textDecoration: "none", fontSize: "0.9rem", fontWeight: 600,
              }}
            >
              ← Módulo Backend
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
