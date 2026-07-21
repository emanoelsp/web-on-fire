import Link from "next/link";
import Navbar from "@/components/Navbar";

const entidades = [
  {
    n: "01",
    emoji: "👤",
    label: "Alunos",
    desc: "Busque, edite e exclua alunos. Pesquisa por nome e e-mail em tempo real.",
    href: "/modulos/backend/parte2/alunos",
    badge: "badge-blue",
    badgeText: "CRUD",
    features: ["busca por nome/e-mail", "edição inline", "exclusão com confirmação"],
    col: "#60a5fa",
  },
  {
    n: "02",
    emoji: "📚",
    label: "Cursos",
    desc: "Gerencie o catálogo de cursos com edição de nome, descrição e carga horária.",
    href: "/modulos/backend/parte2/cursos",
    badge: "badge-green",
    badgeText: "CRUD",
    features: ["listagem completa", "edição inline", "exclusão com confirmação"],
    col: "#4ade80",
  },
  {
    n: "03",
    emoji: "🏫",
    label: "Turmas",
    desc: "Edite turmas existentes, altere período e vagas, exclua com segurança.",
    href: "/modulos/backend/parte2/turmas",
    badge: "badge-amber",
    badgeText: "CRUD",
    features: ["vínculo com cursos", "edição de período/vagas", "exclusão segura"],
    col: "#fbbf24",
  },
  {
    n: "04",
    emoji: "📋",
    label: "Matrículas",
    desc: "Altere o status de matrículas (matriculado, pendente, evadido, transferido) e cancele quando necessário.",
    href: "/modulos/backend/parte2/matriculas",
    badge: "badge-fire",
    badgeText: "CRUD",
    features: ["troca de status", "cancelamento", "histórico de alunos"],
    col: "#FF7744",
  },
];

const fluxo = [
  { label: "Buscar", sub: "getDocs + filtro" },
  { label: "Editar", sub: "updateDoc()" },
  { label: "Confirmar", sub: "confirm()" },
  { label: "Excluir", sub: "deleteDoc()" },
  { label: "Recarregar", sub: "lista atualizada" },
];

export default function Parte2Page() {
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
            ← Módulo 05
          </Link>

          <div style={{ marginBottom: "3rem" }}>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1rem" }}>
              <span className="badge badge-fire">🔥 Módulo 05</span>
              <span className="badge badge-amber">Atividade Final</span>
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
              <br />
              <span style={{ fontSize: "0.6em", color: "var(--text-muted)", letterSpacing: "0.02em" }}>
                BUSCA · ALTERAÇÃO · EXCLUSÃO
              </span>
            </h1>
            <p style={{ color: "var(--text-muted)", lineHeight: 1.75, fontSize: "1rem", maxWidth: "560px" }}>
              Evolução da Atividade Intermediária. Agora o sistema acadêmico tem{" "}
              <strong style={{ color: "var(--text-primary)" }}>CRUD completo</strong>:{" "}
              busca por nome, edição inline e exclusão com confirmação para todas as 4 entidades.
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
              Fluxo de atualização e exclusão
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

          {/* O QUE É NOVO */}
          <section
            style={{
              background: "linear-gradient(135deg, rgba(255,85,0,0.06), rgba(204,34,0,0.02))",
              border: "1px solid rgba(255,85,0,0.18)",
              borderRadius: "16px", padding: "1.75rem", marginBottom: "2.5rem",
            }}
          >
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", letterSpacing: "0.04em", marginBottom: "1.25rem" }}>
              🆕 O QUE HÁ DE NOVO NESTA ATIVIDADE
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
              {[
                { icon: "🔍", label: "Busca", desc: "Filtre por nome e e-mail em tempo real — sem recarregar a página" },
                { icon: "✏️", label: "Edição", desc: "Formulário inline pré-preenchido com os dados atuais do documento" },
                { icon: "🗑️", label: "Exclusão", desc: "Delete com confirmação e remoção imediata da lista na tela" },
                { icon: "🔄", label: "Status", desc: "Troca de status das matrículas com updateDoc() em um campo só" },
              ].map(f => (
                <div
                  key={f.label}
                  style={{
                    padding: "1rem", borderRadius: "10px",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  <div style={{ fontSize: "1.5rem", marginBottom: "0.4rem" }}>{f.icon}</div>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: "0.9rem", letterSpacing: "0.04em", marginBottom: "0.3rem" }}>
                    {f.label}
                  </div>
                  <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", lineHeight: 1.5 }}>{f.desc}</div>
                </div>
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
                    {e.features.map(f => (
                      <span
                        key={f}
                        style={{
                          fontFamily: "var(--font-mono)", fontSize: "0.68rem",
                          padding: "0.2rem 0.55rem", borderRadius: "4px",
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(255,255,255,0.07)",
                          color: e.col,
                        }}
                      >
                        {f}
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

          {/* FUNÇÕES NOVAS */}
          <section
            style={{
              background: "var(--dark-2)", borderRadius: "16px",
              padding: "1.75rem", marginBottom: "2.5rem",
              border: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", letterSpacing: "0.04em", marginBottom: "1.25rem" }}>
              🔥 FUNÇÕES ADICIONADAS AOS SERVICES
            </h2>
            <pre className="code-block" style={{ fontFamily: "var(--font-mono)", margin: 0 }}>
{`// alunoService.ts
+ atualizarAluno(id, dados)   → updateDoc(doc(db, "alunos", id), dados)
+ excluirAluno(id)            → deleteDoc(doc(db, "alunos", id))
+ buscarAlunosPorNome(termo)  → getDocs + filter pelo nome/e-mail

// cursoService.ts
+ atualizarCurso(id, dados)   → updateDoc(doc(db, "cursos", id), dados)
+ excluirCurso(id)            → deleteDoc(doc(db, "cursos", id))

// turmaService.ts
+ atualizarTurma(id, dados)   → updateDoc(doc(db, "turmas", id), dados)
+ excluirTurma(id)            → deleteDoc(doc(db, "turmas", id))

// matriculaService.ts
+ atualizarStatus(id, status) → updateDoc(doc(db, "matriculas", id), { status })
+ excluirMatricula(id)        → deleteDoc(doc(db, "matriculas", id))`}
            </pre>
          </section>

          {/* CRITÉRIOS */}
          <section
            style={{
              background: "linear-gradient(135deg, rgba(255,85,0,0.06), rgba(204,34,0,0.03))",
              border: "1px solid rgba(255,85,0,0.2)", borderRadius: "16px",
              padding: "2rem", marginBottom: "2.5rem",
            }}
          >
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", letterSpacing: "0.04em", marginBottom: "1.5rem" }}>
              🎯 CRITÉRIOS DE AVALIAÇÃO
            </h2>
            {[
              {
                titulo: "Obrigatório", icone: "✅",
                items: [
                  "Edição inline funciona para alunos (nome, e-mail, telefone, CPF)",
                  "Exclusão de alunos pede confirmação e remove da lista imediatamente",
                  "Busca por nome filtra a lista sem recarregar a página",
                  "Status de matrículas pode ser alterado (matriculado / pendente / evadido / transferido)",
                  "Exclusão de matrículas funciona corretamente",
                ],
              },
              {
                titulo: "Bônus", icone: "⭐",
                items: [
                  "Edição e exclusão de cursos e turmas também implementados",
                  "Feedback visual de loading durante operações de escrita",
                  "Campo de busca para filtrar matrículas por nome do aluno",
                  "Contagem de registros visível na listagem",
                ],
              },
            ].map((sec) => (
              <div key={sec.titulo} style={{ marginBottom: "1.5rem" }}>
                <h3
                  style={{
                    fontFamily: "var(--font-display)", fontSize: "1rem", letterSpacing: "0.04em",
                    color: "var(--text-primary)", marginBottom: "0.6rem",
                    display: "flex", alignItems: "center", gap: "0.5rem",
                  }}
                >
                  {sec.icone} {sec.titulo}
                </h3>
                <ul style={{ listStyle: "none" }}>
                  {sec.items.map((item) => (
                    <li
                      key={item}
                      style={{
                        color: "var(--text-muted)", fontSize: "0.85rem", padding: "0.3rem 0",
                        display: "flex", alignItems: "flex-start", gap: "0.5rem",
                      }}
                    >
                      <span style={{ color: "var(--fire-orange)", marginTop: "0.15rem" }}>▸</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Link
              href="/modulos/backend/parte2/alunos"
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
              ← Módulo 05
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
