"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const REQS = [
  {
    section: "Estrutura do projeto",
    icon: "📁",
    tasks: [
      { id: "r1", text: "Crie um projeto Next.js com TypeScript e Tailwind: npx create-next-app@latest techblog --typescript --tailwind" },
      { id: "r2", text: "Organize em: /app, /components, /lib, /types, /services" },
      { id: "r3", text: "Crie um RootLayout com Header de navegação e Footer" },
    ],
  },
  {
    section: "Roteamento",
    icon: "🗺️",
    tasks: [
      { id: "r4", text: "Rota /: homepage com hero e lista de posts recentes (máx. 3)" },
      { id: "r5", text: "Rota /posts: listagem completa de todos os posts com filtro por categoria" },
      { id: "r6", text: "Rota /posts/[slug]: página de detalhe de um post" },
      { id: "r7", text: "Rota /sobre: página sobre o blog (quem escreve, propósito)" },
      { id: "r8", text: "Crie e use notFound() quando o slug do post não existir" },
    ],
  },
  {
    section: "Componentes",
    icon: "🧩",
    tasks: [
      { id: "r9", text: "Crie PostCard.tsx (Server Component) para exibir prévia de um post" },
      { id: "r10", text: "Crie CategoryFilter.tsx (Client Component) com useState para filtrar posts" },
      { id: "r11", text: "Compôs: /posts page (Server) renderiza CategoryFilter (Client) + lista de PostCard (Server)" },
    ],
  },
  {
    section: "Dados",
    icon: "💾",
    tasks: [
      { id: "r12", text: "Crie /lib/posts.ts com um array de 6 posts fictícios como fonte de dados" },
      { id: "r13", text: "Cada post: { slug, titulo, categoria, resumo, conteudo, autor, data }" },
      { id: "r14", text: "Crie funções: getAllPosts(), getPostBySlug(slug), getPostsByCategory(cat)" },
    ],
  },
  {
    section: "UX & Loading",
    icon: "✨",
    tasks: [
      { id: "r15", text: "Adicione loading.tsx em /posts com skeleton de cards" },
      { id: "r16", text: "Adicione error.tsx em /posts com botão 'Tentar novamente'" },
      { id: "r17", text: "Adicione metadata estática em cada página (title + description)" },
      { id: "r18", text: "Adicione metadata dinâmica em /posts/[slug] com o título do post" },
    ],
  },
];

const BONUS = [
  { id: "b1", text: "Adicione Suspense granular na homepage para a lista de posts recentes" },
  { id: "b2", text: "Crie /posts/[slug]/not-found.tsx personalizado com link para /posts" },
  { id: "b3", text: "Adicione tempo de leitura estimado em cada post (calculado pela contagem de palavras)" },
  { id: "b4", text: "Gere metadata com openGraph para compartilhamento em redes sociais" },
  { id: "b5", text: "Adicione uma página /categorias/[nome] que lista posts por categoria" },
];

const CRITERIA = [
  "Todas as rotas funcionam sem erro no console",
  "O filtro de categoria funciona sem recarregar a página",
  "Metadata aparece correta na aba do browser",
  "loading.tsx aparece ao navegar para /posts",
  "notFound() é chamado com slug inválido",
  "Composição Server + Client está correta (fetch no servidor)",
  "TypeScript sem erros (npx tsc --noEmit)",
];

export default function DesafioPage() {
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [bonusChecked, setBonusChecked] = useState<Set<string>>(new Set());

  const totalReqs = REQS.flatMap((s) => s.tasks).length;
  const doneReqs = [...checked].filter((id) => id.startsWith("r")).length;
  const doneBonus = bonusChecked.size;
  const pct = Math.round((doneReqs / totalReqs) * 100);

  function toggle(id: string) {
    setChecked((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function toggleBonus(id: string) {
    setBonusChecked((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  const allDone = doneReqs === totalReqs;

  return (
    <div style={{ minHeight: "100vh", background: "var(--dark-1)", display: "flex", flexDirection: "column" }}>
      <Navbar />

      <main style={{ flex: 1, maxWidth: "1000px", margin: "0 auto", width: "100%", padding: "3rem 1.5rem" }}>
        {/* Breadcrumb */}
        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", marginBottom: "2rem", fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--text-muted)" }}>
          <Link href="/" style={{ color: "var(--text-muted)", textDecoration: "none" }}>início</Link>
          <span>/</span>
          <Link href="/modulos/nextjs" style={{ color: "var(--text-muted)", textDecoration: "none" }}>next.js</Link>
          <span>/</span>
          <span style={{ color: "rgba(255,119,68,0.8)" }}>desafio final</span>
        </div>

        {/* Header */}
        <div style={{ marginBottom: "3rem" }}>
          <span className="badge badge-amber" style={{ marginBottom: "1.25rem", display: "inline-flex" }}>
            🏆 Desafio Final — Módulo Next.js
          </span>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.5rem, 7vw, 5rem)",
              lineHeight: 0.95,
              letterSpacing: "0.02em",
              marginBottom: "1rem",
            }}
          >
            <span className="fire-text">TECHBLOG</span>
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.7, maxWidth: "620px", marginBottom: "1.5rem" }}>
            Construa um blog técnico completo usando Next.js App Router, Server Components, roteamento dinâmico,
            layouts aninhados, loading/error states e Metadata API.
          </p>

          {/* Progress bar */}
          <div style={{ maxWidth: "480px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--text-muted)" }}>
                Progresso
              </span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: allDone ? "#4ade80" : "var(--fire-orange)" }}>
                {doneReqs}/{totalReqs} requisitos {allDone ? "✓ Concluído!" : ""}
              </span>
            </div>
            <div style={{ height: "8px", background: "rgba(255,255,255,0.06)", borderRadius: "9999px", overflow: "hidden" }}>
              <div
                style={{
                  height: "100%",
                  width: `${pct}%`,
                  background: allDone
                    ? "linear-gradient(90deg, #22c55e, #16a34a)"
                    : "linear-gradient(90deg, #FF5500, #FF8C00)",
                  transition: "width 0.4s ease",
                  borderRadius: "9999px",
                }}
              />
            </div>
          </div>
        </div>

        {/* Requisitos */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem", marginBottom: "2.5rem" }}>
          {REQS.map((section) => (
            <div key={section.section}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1rem" }}>
                <span style={{ fontSize: "1.3rem" }}>{section.icon}</span>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", letterSpacing: "0.04em", color: "var(--text-primary)" }}>
                  {section.section}
                </h2>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "rgba(255,255,255,0.3)" }}>
                  {section.tasks.filter((t) => checked.has(t.id)).length}/{section.tasks.length}
                </span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {section.tasks.map((task) => {
                  const done = checked.has(task.id);
                  return (
                    <div
                      key={task.id}
                      onClick={() => toggle(task.id)}
                      className="card"
                      style={{
                        borderRadius: "10px",
                        padding: "0.9rem 1.25rem",
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "0.85rem",
                        cursor: "pointer",
                        border: done ? "1px solid rgba(34,197,94,0.2)" : "1px solid rgba(255,255,255,0.04)",
                        background: done ? "rgba(34,197,94,0.04)" : "var(--dark-2)",
                        userSelect: "none",
                        transition: "all 0.2s",
                      }}
                    >
                      <span
                        style={{
                          width: "1.4rem",
                          height: "1.4rem",
                          borderRadius: "5px",
                          flexShrink: 0,
                          marginTop: "0.1rem",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "0.8rem",
                          fontWeight: 900,
                          transition: "all 0.2s",
                          ...(done
                            ? { background: "linear-gradient(135deg, #22c55e, #16a34a)", color: "#fff", boxShadow: "0 0 8px rgba(34,197,94,0.3)" }
                            : { background: "rgba(255,85,0,0.05)", border: "2px solid rgba(255,85,0,0.25)", color: "transparent" }),
                        }}
                      >
                        ✓
                      </span>
                      <span
                        style={{
                          fontSize: "0.85rem",
                          color: done ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.72)",
                          lineHeight: 1.5,
                          textDecoration: done ? "line-through" : "none",
                          transition: "all 0.2s",
                        }}
                      >
                        {task.text}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="divider" />

        {/* Bonus */}
        <div style={{ marginTop: "2.5rem", marginBottom: "2.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1rem" }}>
            <span style={{ fontSize: "1.3rem" }}>⭐</span>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", letterSpacing: "0.04em", color: "var(--text-primary)" }}>
              Desafio Bônus
            </h2>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "rgba(251,191,36,0.5)" }}>
              {doneBonus}/{BONUS.length} completos
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {BONUS.map((task) => {
              const done = bonusChecked.has(task.id);
              return (
                <div
                  key={task.id}
                  onClick={() => toggleBonus(task.id)}
                  className="card"
                  style={{
                    borderRadius: "10px",
                    padding: "0.9rem 1.25rem",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "0.85rem",
                    cursor: "pointer",
                    border: done ? "1px solid rgba(251,191,36,0.25)" : "1px solid rgba(255,255,255,0.04)",
                    background: done ? "rgba(251,191,36,0.04)" : "var(--dark-2)",
                    userSelect: "none",
                    transition: "all 0.2s",
                  }}
                >
                  <span style={{ color: done ? "rgba(251,191,36,0.9)" : "rgba(251,191,36,0.3)", flexShrink: 0, marginTop: "0.1rem" }}>
                    ⭐
                  </span>
                  <span
                    style={{
                      fontSize: "0.85rem",
                      color: done ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.65)",
                      lineHeight: 1.5,
                      textDecoration: done ? "line-through" : "none",
                      transition: "all 0.2s",
                    }}
                  >
                    {task.text}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="divider" />

        {/* Critérios de avaliação */}
        <div style={{ marginTop: "2.5rem", marginBottom: "3rem" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", letterSpacing: "0.04em", color: "var(--text-primary)", marginBottom: "1rem" }}>
            ✅ Critérios de Avaliação
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "0.5rem" }}>
            {CRITERIA.map((c, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: "0.6rem",
                  alignItems: "flex-start",
                  padding: "0.7rem 1rem",
                  borderRadius: "8px",
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.04)",
                  fontSize: "0.82rem",
                  color: "rgba(255,255,255,0.6)",
                  lineHeight: 1.5,
                }}
              >
                <span style={{ color: "var(--fire-orange)", flexShrink: 0 }}>▶</span>
                {c}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
          <Link
            href="/modulos/nextjs"
            style={{
              padding: "0.75rem 1.5rem",
              borderRadius: "10px",
              border: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(255,255,255,0.03)",
              color: "rgba(255,255,255,0.6)",
              textDecoration: "none",
              fontSize: "0.85rem",
              fontWeight: 600,
            }}
          >
            ← Voltar ao módulo
          </Link>

          {allDone && (
            <div
              style={{
                padding: "0.75rem 1.5rem",
                borderRadius: "10px",
                background: "rgba(34,197,94,0.1)",
                border: "1px solid rgba(34,197,94,0.25)",
                color: "#4ade80",
                fontSize: "0.85rem",
                fontWeight: 700,
              }}
            >
              🎉 Parabéns! Módulo Next.js concluído!
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
