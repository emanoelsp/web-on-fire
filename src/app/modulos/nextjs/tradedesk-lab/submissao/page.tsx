"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ActivityGate from "@/components/ActivityGate";
import { useAuth } from "@/contexts/AuthContext";

const CHARADAS: { id: string; num: string; categoria: string; charada: string }[] = [
  {
    id: "b1",
    num: "B1",
    categoria: "Componentes",
    charada:
      "Sou o guardião da identidade visual — logo, menu, navegação. O layout raiz já me inclui em todas as páginas. Mas o estagiário me invocou uma segunda vez na homepage. Qual arquivo duplicou minha presença e em qual outro eu deveria aparecer exclusivamente?",
  },
  {
    id: "b2",
    num: "B2",
    categoria: "Componentes",
    charada:
      "Sou um componente marcado com 'use client', então posso usar hooks. Mas fui projetado para receber os dados do ativo via props — meu pai, um Server Component, já buscou tudo. Por que então faço um useEffect com fetch para buscar os mesmos dados de novo?",
  },
  {
    id: "b3",
    num: "B3",
    categoria: "Componentes",
    charada:
      "Server Components podem passar strings, números e objetos para Client Components. Mas existe um tipo de valor que o Next.js não consegue serializar durante o pré-render. Que tipo é esse, qual prop carrega esse problema, e em qual componente isso explode?",
  },
  {
    id: "b4",
    num: "B4",
    categoria: "Roteamento",
    charada:
      "No Next.js 15, o objeto de parâmetros de rota dinâmica não é síncrono — ele é uma Promise. O estagiário pegou o ticker diretamente, sem aguardar a resolução. Qual keyword está faltando, e em qual página do projeto?",
  },
  {
    id: "b5",
    num: "B5",
    categoria: "Roteamento",
    charada:
      "Route Groups agrupam rotas sem afetar a URL. Mas o layout desse grupo importou o Header manualmente — ignorando que o RootLayout já faz isso. Qual rota sofre com o cabeçalho duplo resultante?",
  },
  {
    id: "b6",
    num: "B6",
    categoria: "Componentes",
    charada:
      "Na tabela de ações, cada linha tem um botão 'Ver →'. Todos levam ao mesmo lugar — literalmente. O estagiário esqueceu que o ticker é uma variável que muda a cada linha. Qual é o valor incorreto no atributo href e qual deveria ser o valor correto?",
  },
  {
    id: "b7",
    num: "B7",
    categoria: "Server vs Client",
    charada:
      "O Next.js permite buscar dados direto no servidor, sem spinner, sem hydration. Mas a página de listagem de ações usa 'use client', useEffect e useState para buscar os dados no browser. Qual é o arquivo, e como ele deveria ser reescrito?",
  },
  {
    id: "b8",
    num: "B8",
    categoria: "Server vs Client",
    charada:
      "Sou um componente Client-side. Qualquer pessoa que abrir o DevTools e ir na aba Console verá minha constante impressa. O problema: ela não deveria estar exposta ao cliente. Qual é o nome da constante e em qual componente ela aparece?",
  },
  {
    id: "b9",
    num: "B9",
    categoria: "API Routes",
    charada:
      "Peço PETR5 — um ticker que não existe. O servidor responde com {} e status 200. Mas 200 significa 'tudo certo'. O que ele deveria responder para comunicar que o recurso não foi encontrado?",
  },
  {
    id: "b10",
    num: "B10",
    categoria: "API Routes",
    charada:
      "Na B3 (Bolsa de Valores brasileira) as ações são negociadas em lotes de 100 unidades — você não compra 3 ações avulsas de PETR4. O endpoint de ordens aceita qualquer número, até 0 e negativos. Onde no código a validação deve ser feita, e qual condição garante que a quantidade é múltipla de 100?",
  },
  {
    id: "b11",
    num: "B11",
    categoria: "API Routes",
    charada:
      "O mercado da B3 funciona das 10h às 17h30 no horário de Brasília (UTC-3). Mas o servidor pode estar rodando em qualquer fuso do mundo. O código usa new Date().getHours() diretamente. Como corrigir para garantir que sempre seja o horário de Brasília?",
  },
  {
    id: "b12",
    num: "B12",
    categoria: "Lógica Crítica",
    charada:
      "Registrei 3 ordens de compra. Fui ver a lista de ações em /api/acoes — e minhas ordens apareceram misturadas com os tickers. O POST /api/ordens faz push num array, mas no array errado. Qual array é modificado e qual deveria ser?",
  },
  {
    id: "b13",
    num: "B13",
    categoria: "Lógica Crítica",
    charada:
      "Abri /api/acoes no browser. Vi no JSON: 'regularMarketPrice', 'symbol', 'shortName'. Mas o componente tenta usar acao.preco, acao.ticker, acao.nome. Todos undefined. O tipo Acao usa nomes diferentes dos que a API real retorna. Como corrigir?",
  },
  {
    id: "b14",
    num: "B14",
    categoria: "Lógica Crítica",
    charada:
      "Acesso /api/acoes/PETR4 várias vezes seguidas. A partir da segunda requisição, o JSON retornado traz um campo extra que eu nunca pedi — e na terceira, outro campo acumulado. O Route Handler encontra o ativo no array de mocks e adiciona lastChecked diretamente nesse objeto. Em JavaScript, objetos são referências: modificar o objeto encontrado contamina o próprio array original a cada chamada. Qual operador cria a cópia rasa necessária antes de adicionar o campo, e em qual arquivo a correção deve ser feita?",
  },
];

const CATEGORIA_COR: Record<string, { bg: string; border: string; color: string }> = {
  Componentes:     { bg: "rgba(96,165,250,0.07)",  border: "rgba(96,165,250,0.25)",  color: "#60a5fa" },
  Roteamento:      { bg: "rgba(168,85,247,0.07)",  border: "rgba(168,85,247,0.25)",  color: "#c084fc" },
  "Server vs Client": { bg: "rgba(251,191,36,0.07)", border: "rgba(251,191,36,0.25)", color: "#fbbf24" },
  "API Routes":    { bg: "rgba(34,197,94,0.07)",   border: "rgba(34,197,94,0.25)",   color: "#4ade80" },
  "Lógica Crítica":{ bg: "rgba(239,68,68,0.07)",   border: "rgba(239,68,68,0.25)",   color: "#f87171" },
};

export default function SubmissaoPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [respostas, setRespostas] = useState<Record<string, string>>({});
  const [githubUrl, setGithubUrl] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState("");

  const totalPreenchidos = Object.values(respostas).filter((v) => v.trim().length > 0).length;
  const pct = Math.round((totalPreenchidos / CHARADAS.length) * 100);

  async function handleSubmit() {
    if (!user) { setErro("Você precisa estar logado."); return; }
    if (!user.displayName) { setErro("Seu perfil não tem nome (displayName). Configure no Firebase Auth."); return; }
    if (!githubUrl.trim()) { setErro("Cole o link do seu repositório GitHub."); return; }
    if (totalPreenchidos < CHARADAS.length) {
      setErro(`Responda todas as ${CHARADAS.length} charadas antes de enviar (${CHARADAS.length - totalPreenchidos} em branco).`);
      return;
    }

    setEnviando(true);
    setErro("");
    try {
      const res = await fetch("/api/trabalho1", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          displayName: user.displayName,
          githubUrl: githubUrl.trim(),
          respostas,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Erro ao enviar. Tente novamente.");
      }
      router.push("/modulos/nextjs/tradedesk-lab/submissao/confirmado");
    } catch (err: any) {
      setErro(err.message || "Erro ao enviar. Tente novamente.");
    } finally {
      setEnviando(false);
    }
  }

  return (
    <ActivityGate label="Submissão — TradeDesk Lab">
      <div style={{ minHeight: "100vh", background: "var(--dark-1)", display: "flex", flexDirection: "column" }}>
        <Navbar />

        <main style={{ flex: 1, maxWidth: "900px", margin: "0 auto", width: "100%", padding: "3rem 1.5rem" }}>
          {/* Breadcrumb */}
          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", marginBottom: "2rem", fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--text-muted)" }}>
            <Link href="/" style={{ color: "var(--text-muted)", textDecoration: "none" }}>início</Link>
            <span>/</span>
            <Link href="/modulos/nextjs/tradedesk-lab" style={{ color: "var(--text-muted)", textDecoration: "none" }}>tradedesk-lab</Link>
            <span>/</span>
            <span style={{ color: "rgba(255,119,68,0.8)" }}>submissão</span>
          </div>

          {/* Header */}
          <div style={{ marginBottom: "2.5rem" }}>
            <span className="badge badge-fire" style={{ marginBottom: "1rem", display: "inline-flex" }}>
              📋 Trabalho 1 · Submissão Final
            </span>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "0.04em", marginBottom: "0.75rem" }}>
              ENVIAR TRABALHO
            </h1>
            {user && (
              <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
                Aluno: <strong style={{ color: "var(--text-primary)" }}>{user.displayName ?? user.email}</strong>
              </p>
            )}
          </div>

          {/* Progress */}
          <div style={{ marginBottom: "2.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--text-muted)" }}>Charadas respondidas</span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: totalPreenchidos === CHARADAS.length ? "#4ade80" : "var(--fire-orange)" }}>
                {totalPreenchidos}/{CHARADAS.length}
              </span>
            </div>
            <div style={{ height: "6px", background: "rgba(255,255,255,0.06)", borderRadius: "9999px", overflow: "hidden" }}>
              <div
                style={{
                  height: "100%",
                  width: `${pct}%`,
                  background: totalPreenchidos === CHARADAS.length ? "linear-gradient(90deg, #22c55e, #16a34a)" : "linear-gradient(90deg, #FF5500, #FF8C00)",
                  transition: "width 0.4s ease",
                  borderRadius: "9999px",
                }}
              />
            </div>
          </div>

          {/* GitHub URL */}
          <div className="card" style={{ borderRadius: "14px", padding: "1.5rem 1.75rem", marginBottom: "2rem", border: "1px solid rgba(255,85,0,0.15)" }}>
            <label style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--fire-orange)", letterSpacing: "0.06em", textTransform: "uppercase", display: "block", marginBottom: "0.6rem" }}>
              Link do repositório GitHub (fork)
            </label>
            <input
              type="url"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              placeholder="https://github.com/SEU_USUARIO/tradedesk-lab"
              className="input-field"
              style={{ width: "100%", fontFamily: "var(--font-mono)", fontSize: "0.85rem" }}
            />
            <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.5rem" }}>
              O repositório deve ser público e ter o GitHub Actions passando (check verde ✓).
            </p>
          </div>

          {/* Charadas */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2.5rem" }}>
            {CHARADAS.map((c) => {
              const cor = CATEGORIA_COR[c.categoria] ?? CATEGORIA_COR["Componentes"];
              const respondida = respostas[c.id]?.trim().length > 0;
              return (
                <div
                  key={c.id}
                  className="card"
                  style={{
                    borderRadius: "14px",
                    padding: "1.35rem 1.75rem",
                    border: respondida ? "1px solid rgba(34,197,94,0.2)" : "1px solid rgba(255,255,255,0.05)",
                    background: respondida ? "rgba(34,197,94,0.02)" : "var(--dark-2)",
                    transition: "all 0.2s",
                  }}
                >
                  <div style={{ display: "flex", gap: "0.6rem", alignItems: "center", marginBottom: "0.75rem", flexWrap: "wrap" }}>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.6rem",
                        fontWeight: 700,
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        padding: "0.18rem 0.5rem",
                        borderRadius: "9999px",
                        background: "rgba(255,85,0,0.08)",
                        border: "1px solid rgba(255,85,0,0.2)",
                        color: "var(--fire-orange)",
                      }}
                    >
                      {c.num}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.6rem",
                        fontWeight: 600,
                        letterSpacing: "0.04em",
                        padding: "0.18rem 0.5rem",
                        borderRadius: "9999px",
                        background: cor.bg,
                        border: `1px solid ${cor.border}`,
                        color: cor.color,
                      }}
                    >
                      {c.categoria}
                    </span>
                    {respondida && (
                      <span style={{ color: "#4ade80", fontSize: "0.75rem", marginLeft: "auto" }}>✓ respondida</span>
                    )}
                  </div>

                  <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.65, marginBottom: "0.9rem" }}>
                    {c.charada}
                  </p>

                  <textarea
                    value={respostas[c.id] ?? ""}
                    onChange={(e) => setRespostas((prev) => ({ ...prev, [c.id]: e.target.value }))}
                    placeholder="Sua resposta aqui..."
                    rows={3}
                    style={{
                      width: "100%",
                      background: "rgba(0,0,0,0.3)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: "8px",
                      padding: "0.75rem",
                      color: "var(--text-primary)",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.8rem",
                      lineHeight: 1.5,
                      resize: "vertical",
                      outline: "none",
                      transition: "border-color 0.2s",
                    }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(255,85,0,0.4)"; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}
                  />
                </div>
              );
            })}
          </div>

          {/* Erro */}
          {erro && (
            <div
              style={{
                padding: "0.9rem 1.25rem",
                borderRadius: "10px",
                background: "rgba(239,68,68,0.08)",
                border: "1px solid rgba(239,68,68,0.25)",
                color: "#f87171",
                fontSize: "0.85rem",
                marginBottom: "1.5rem",
              }}
            >
              ⚠️ {erro}
            </div>
          )}

          {/* Submit */}
          <div style={{ display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" }}>
            <Link
              href="/modulos/nextjs/tradedesk-lab"
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
              ← Voltar
            </Link>
            <button
              onClick={handleSubmit}
              disabled={enviando}
              style={{
                padding: "0.85rem 2.5rem",
                borderRadius: "10px",
                background: enviando ? "rgba(255,85,0,0.3)" : "linear-gradient(135deg, #FF5500, #CC2200)",
                color: "#fff",
                border: "none",
                fontSize: "0.9rem",
                fontWeight: 700,
                cursor: enviando ? "not-allowed" : "pointer",
                letterSpacing: "0.03em",
                fontFamily: "inherit",
                transition: "all 0.2s",
              }}
            >
              {enviando ? "Enviando..." : "FINALIZAR SUBMISSÃO →"}
            </button>
          </div>
        </main>

        <Footer />
      </div>
    </ActivityGate>
  );
}
