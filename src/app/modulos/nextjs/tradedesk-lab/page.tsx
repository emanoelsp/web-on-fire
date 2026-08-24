"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ActivityGate from "@/components/ActivityGate";
import { useAuth } from "@/contexts/AuthContext";

const ETAPAS = [
  {
    num: "01",
    titulo: "Fork & Clone",
    icon: "🍴",
    steps: [
      "Acesse o repositório do projeto base: github.com/emanoelsp/tradedesk-lab",
      'Clique em "Fork" no canto superior direito do GitHub',
      "Clone o fork para sua máquina: git clone https://github.com/SEU_USUARIO/tradedesk-lab",
      "Entre na pasta: cd tradedesk-lab",
      "Instale as dependências: npm install",
      "Suba o servidor de desenvolvimento: npm run dev",
      "Acesse http://localhost:3000 e explore a aplicação",
    ],
  },
  {
    num: "02",
    titulo: "Abra todas as rotas de API",
    icon: "🔍",
    steps: [
      "Acesse /api/acoes no browser e examine o JSON retornado",
      "Compare os campos retornados com a interface Acao em src/types/acao.ts",
      "Acesse /api/acoes/PETR4 e observe a estrutura de um ativo específico",
      "Acesse /api/cotacao — leia com atenção o aviso no JSON retornado",
      "Acesse /api/mercado e veja como o horário de funcionamento é calculado",
      "Abra o DevTools (F12) → aba Console e observe mensagens suspeitas",
    ],
    destaque: "📌 A análise dos endpoints é essencial para entender a raiz dos bugs. Não pule esta etapa.",
  },
  {
    num: "03",
    titulo: "Análise e Correção de Bugs",
    icon: "🐛",
    steps: [
      "Identifique todos os bugs do sistema (há 14 bugs distribuídos em 5 categorias)",
      "Para cada bug encontrado: crie um commit separado descrevendo a correção",
      "git add <arquivo> && git commit -m 'fix: [descrição do bug corrigido]'",
      "Categorias: Componentes, Roteamento, Server vs Client, API Routes, Lógica Crítica",
    ],
    destaque: "🔔 IMPORTANTE: Faça um commit por bug corrigido. O histórico de commits faz parte da avaliação.",
  },
  {
    num: "04",
    titulo: "Build & Push",
    icon: "🚀",
    steps: [
      "Após todas as correções, rode: npm run build",
      "O build deve passar sem erros (✓ Compiled successfully)",
      "git push origin main",
      "Verifique o status do GitHub Actions na aba 'Actions' do seu repositório",
      "O check verde (✓) no Actions é obrigatório para a submissão",
    ],
  },
  {
    num: "05",
    titulo: "Submissão",
    icon: "📋",
    steps: [
      "Acesse a página de submissão deste lab (link abaixo)",
      "Cole o link do seu repositório GitHub (fork)",
      "Responda as 14 charadas — cada uma corresponde a um bug do sistema",
      "Finalize e aguarde a confirmação",
    ],
  },
];

const CATEGORIAS = [
  { icon: "🧩", label: "Componentes", bugs: 5, desc: "Header, props, 'use client'" },
  { icon: "🗺️", label: "Roteamento", bugs: 2, desc: "Links, params" },
  { icon: "⚙️", label: "Server vs Client", bugs: 2, desc: "RSC vs useEffect" },
  { icon: "🔌", label: "API Routes", bugs: 2, desc: "Status codes, timezone" },
  { icon: "💥", label: "Lógica Crítica", bugs: 3, desc: "Tipos, mutação, campos" },
];

export default function TradesDeskLabPage() {
  const { user } = useAuth();
  const [crashAtivo, setCrashAtivo] = useState(false);
  const [surpresaAtiva, setSurpresaAtiva] = useState(false);

  useEffect(() => {
    fetch("/api/status-mercado")
      .then((r) => r.json())
      .then((d) => { if (d.status === "CRASH") setCrashAtivo(true); })
      .catch(() => {});

    fetch("/api/trabalho1/config")
      .then((r) => r.json())
      .then((d) => { if (d.surpresaAtiva) setSurpresaAtiva(true); })
      .catch(() => {});
  }, []);

  return (
    <ActivityGate label="Lab de Refatoração — TradeDesk">
      <div style={{ minHeight: "100vh", background: "var(--dark-1)", display: "flex", flexDirection: "column" }}>
        <Navbar />

        {crashAtivo && (
          <div
            style={{
              background: "linear-gradient(90deg, #1a0000, #2a0000)",
              borderBottom: "2px solid #ef4444",
              padding: "0.9rem 1.5rem",
              textAlign: "center",
              color: "#ef4444",
              fontFamily: "var(--font-mono)",
              fontSize: "0.85rem",
              fontWeight: 700,
              letterSpacing: "0.08em",
            }}
          >
            🔴 CRASH NO MERCADO — O professor ativou uma situação de crise no TradeDesk. Verifique seu projeto!
          </div>
        )}

        {surpresaAtiva && (
          <div
            style={{
              background: "linear-gradient(90deg, #1a0f00, #2a1500)",
              borderBottom: "2px solid #f59e0b",
              padding: "0.9rem 1.5rem",
              textAlign: "center",
              color: "#f59e0b",
              fontFamily: "var(--font-mono)",
              fontSize: "0.85rem",
              fontWeight: 700,
              letterSpacing: "0.08em",
            }}
          >
            ⚡ AVISO DO PROFESSOR — Uma nova situação foi liberada. Fique atento às instruções em sala!
          </div>
        )}

        <main style={{ flex: 1, maxWidth: "1000px", margin: "0 auto", width: "100%", padding: "3rem 1.5rem" }}>
          {/* Breadcrumb */}
          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", marginBottom: "2rem", fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--text-muted)" }}>
            <Link href="/" style={{ color: "var(--text-muted)", textDecoration: "none" }}>início</Link>
            <span>/</span>
            <Link href="/modulos/nextjs" style={{ color: "var(--text-muted)", textDecoration: "none" }}>next.js</Link>
            <span>/</span>
            <span style={{ color: "rgba(255,119,68,0.8)" }}>tradedesk-lab</span>
          </div>

          {/* Hero */}
          <div style={{ marginBottom: "3rem" }}>
            <span className="badge badge-fire" style={{ marginBottom: "1.25rem", display: "inline-flex" }}>
              🏦 Trabalho 1 · Valendo Nota
            </span>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.5rem, 7vw, 5rem)",
                lineHeight: 0.92,
                letterSpacing: "0.02em",
                marginBottom: "1.25rem",
              }}
            >
              <span className="fire-text">TRADEDESK</span>
              <br />
              <span style={{ color: "var(--text-primary)", fontSize: "0.6em" }}>LAB DE REFATORAÇÃO</span>
            </h1>
            <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.7, maxWidth: "680px", marginBottom: "1.5rem" }}>
              Um estagiário deixou um home broker com <strong style={{ color: "var(--text-primary)" }}>14 bugs</strong> espalhados por todo o código
              antes de ser demitido. Sua missão: clonar o projeto, encontrar e corrigir cada problema,
              e documentar tudo com commits precisos.
            </p>

            {/* Stats bar */}
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "2rem" }}>
              {[
                { label: "Bugs", value: "14" },
                { label: "Commits mínimos", value: "14" },
                { label: "API real", value: "brapi.dev" },
                { label: "Build requerido", value: "✓ verde" },
              ].map((s) => (
                <div
                  key={s.label}
                  style={{
                    padding: "0.5rem 1rem",
                    borderRadius: "8px",
                    background: "rgba(255,85,0,0.06)",
                    border: "1px solid rgba(255,85,0,0.15)",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.75rem",
                  }}
                >
                  <span style={{ color: "var(--fire-orange)", fontWeight: 700 }}>{s.value}</span>
                  <span style={{ color: "var(--text-muted)", marginLeft: "0.4rem" }}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Categorias de bugs */}
          <div style={{ marginBottom: "3rem" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", letterSpacing: "0.04em", marginBottom: "1.25rem" }}>
              CATEGORIAS DE BUGS
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "0.75rem" }}>
              {CATEGORIAS.map((c) => (
                <div
                  key={c.label}
                  className="card"
                  style={{ borderRadius: "12px", padding: "1rem 1.25rem", border: "1px solid rgba(255,255,255,0.05)" }}
                >
                  <span style={{ fontSize: "1.5rem", display: "block", marginBottom: "0.5rem" }}>{c.icon}</span>
                  <div style={{ fontWeight: 700, fontSize: "0.9rem", marginBottom: "0.2rem" }}>{c.label}</div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--fire-orange)", marginBottom: "0.3rem" }}>
                    {c.bugs} bug{c.bugs > 1 ? "s" : ""}
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{c.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Etapas */}
          <div style={{ marginBottom: "3rem" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", letterSpacing: "0.04em", marginBottom: "1.5rem" }}>
              COMO FAZER
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {ETAPAS.map((etapa) => (
                <div
                  key={etapa.num}
                  className="card"
                  style={{
                    borderRadius: "14px",
                    padding: "1.5rem 1.75rem",
                    border: "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  <div style={{ display: "flex", gap: "1.25rem", alignItems: "flex-start" }}>
                    <div style={{ flexShrink: 0 }}>
                      <div
                        style={{
                          width: "2.5rem",
                          height: "2.5rem",
                          borderRadius: "10px",
                          background: "linear-gradient(135deg, rgba(255,85,0,0.2), rgba(255,85,0,0.05))",
                          border: "1px solid rgba(255,85,0,0.3)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontFamily: "var(--font-display)",
                          fontSize: "1rem",
                          color: "var(--fire-orange)",
                          letterSpacing: "0.04em",
                        }}
                      >
                        {etapa.num}
                      </div>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.9rem" }}>
                        <span style={{ fontSize: "1.1rem" }}>{etapa.icon}</span>
                        <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.15rem", letterSpacing: "0.04em" }}>
                          {etapa.titulo}
                        </h3>
                      </div>
                      <ol style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                        {etapa.steps.map((step, i) => (
                          <li
                            key={i}
                            style={{
                              display: "flex",
                              gap: "0.75rem",
                              alignItems: "flex-start",
                              fontSize: "0.85rem",
                              color: "rgba(255,255,255,0.72)",
                              lineHeight: 1.5,
                            }}
                          >
                            <span
                              style={{
                                flexShrink: 0,
                                width: "1.4rem",
                                height: "1.4rem",
                                borderRadius: "50%",
                                background: "rgba(255,85,0,0.08)",
                                border: "1px solid rgba(255,85,0,0.2)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontFamily: "var(--font-mono)",
                                fontSize: "0.62rem",
                                color: "var(--fire-orange)",
                                marginTop: "0.1rem",
                              }}
                            >
                              {i + 1}
                            </span>
                            <span style={{ fontFamily: step.startsWith("git ") || step.startsWith("npm ") || step.startsWith("cd ") ? "var(--font-mono)" : "inherit", fontSize: step.startsWith("git ") || step.startsWith("npm ") || step.startsWith("cd ") ? "0.78rem" : "inherit" }}>
                              {step}
                            </span>
                          </li>
                        ))}
                      </ol>
                      {etapa.destaque && (
                        <div
                          style={{
                            marginTop: "1rem",
                            padding: "0.65rem 1rem",
                            borderRadius: "8px",
                            background: "rgba(251,191,36,0.06)",
                            border: "1px solid rgba(251,191,36,0.2)",
                            fontSize: "0.8rem",
                            color: "rgba(251,191,36,0.9)",
                            lineHeight: 1.5,
                          }}
                        >
                          {etapa.destaque}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Critérios */}
          <div style={{ marginBottom: "3rem" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", letterSpacing: "0.04em", marginBottom: "1rem" }}>
              CRITÉRIOS DE AVALIAÇÃO
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "0.5rem" }}>
              {[
                "14 commits — um por bug corrigido",
                "npm run build passa sem erros",
                "GitHub Actions com check verde (✓)",
                "Respostas corretas nas charadas",
                "Link do repositório válido e público",
                "Defesa oral na próxima aula",
              ].map((c, i) => (
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
          <div style={{ display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" }}>
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
              ← Módulo Next.js
            </Link>

            {user ? (
              <Link
                href="/modulos/nextjs/tradedesk-lab/submissao"
                style={{
                  padding: "0.75rem 2rem",
                  borderRadius: "10px",
                  background: "linear-gradient(135deg, #FF5500, #CC2200)",
                  color: "#fff",
                  textDecoration: "none",
                  fontSize: "0.9rem",
                  fontWeight: 700,
                  letterSpacing: "0.03em",
                }}
              >
                ENVIAR SUBMISSÃO →
              </Link>
            ) : (
              <Link
                href="/login"
                style={{
                  padding: "0.75rem 2rem",
                  borderRadius: "10px",
                  background: "rgba(255,85,0,0.1)",
                  border: "1px solid rgba(255,85,0,0.3)",
                  color: "var(--fire-orange)",
                  textDecoration: "none",
                  fontSize: "0.9rem",
                  fontWeight: 700,
                }}
              >
                Faça login para submeter →
              </Link>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </ActivityGate>
  );
}
