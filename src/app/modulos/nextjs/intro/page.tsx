"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

// ─── SLIDES DATA ─────────────────────────────────────────────────────────────

const slides = [
  {
    id: 1,
    type: "cover",
    tag: "Bem-vindo",
    title: "O QUE É\nNEXT.JS?",
    subtitle: "Antes de codar, entender. Antes de entender, sentir.",
    body: null,
    tip: null,
    code: null,
  },
  {
    id: 2,
    type: "concept",
    tag: "Contexto",
    title: "O problema que o Next.js resolve",
    subtitle: null,
    body: [
      { icon: "😩", text: "React puro exige configurar tudo: bundler, roteamento, SSR, SEO, deploy..." },
      { icon: "📦", text: "Cada projeto reinventa a roda. Webpack, Babel, React Router, Helmet..." },
      { icon: "🐌", text: "SPAs têm problema de performance e SEO — o HTML chega vazio ao browser." },
      { icon: "🔥", text: "Next.js chega como o framework que já vem configurado e pronto para produção." },
    ],
    tip: null,
    code: null,
  },
  {
    id: 3,
    type: "definition",
    tag: "Definição",
    title: "Next.js em uma frase",
    subtitle: null,
    body: null,
    tip: null,
    code: null,
    quote: "Next.js é um framework React de produção que adiciona roteamento baseado em arquivos, renderização no servidor, otimização automática e convenções prontas para escalar.",
    highlights: ["roteamento baseado em arquivos", "renderização no servidor", "otimização automática", "convenções prontas para escalar"],
  },
  {
    id: 4,
    type: "comparison",
    tag: "React vs Next.js",
    title: "A diferença que importa",
    subtitle: null,
    body: null,
    tip: null,
    code: null,
    comparison: [
      { label: "React puro", items: ["Apenas biblioteca de UI", "Você configura tudo", "SPA por padrão (SEO ruim)", "Nenhum roteamento incluído", "Deploy manual complexo"] },
      { label: "Next.js", items: ["Framework completo", "Configuração zero", "SSR + SSG + ISR nativos", "App Router por arquivo", "Deploy com 1 clique na Vercel"] },
    ],
  },
  {
    id: 5,
    type: "architecture",
    tag: "Arquitetura",
    title: "Como o Next.js funciona",
    subtitle: "O fluxo de uma requisição",
    body: [
      { icon: "1️⃣", text: "Browser faz requisição para /produtos" },
      { icon: "2️⃣", text: "Next.js encontra src/app/produtos/page.tsx" },
      { icon: "3️⃣", text: "Executa o componente no servidor" },
      { icon: "4️⃣", text: "Retorna HTML pronto para o browser" },
      { icon: "5️⃣", text: "React hidrata a página no cliente" },
    ],
    tip: "Isso se chama SSR — Server Side Rendering. O HTML já vem preenchido, então o SEO e a performance são muito melhores.",
    code: null,
  },
  {
    id: 6,
    type: "files",
    tag: "Estrutura",
    title: "Os arquivos que você precisa dominar",
    subtitle: null,
    body: null,
    tip: null,
    code: `📁 src/
  📁 app/
    📄 layout.tsx       ← HTML base + fontes + providers
    📄 page.tsx         ← Página raiz (rota "/")
    📄 globals.css      ← CSS global
    📁 sobre/
      📄 page.tsx       ← Rota "/sobre"
    📁 blog/
      📁 [slug]/
        📄 page.tsx     ← Rota dinâmica "/blog/qualquer-coisa"
  📁 components/        ← Componentes reutilizáveis
  📁 lib/               ← Utilitários e configs
  📁 services/          ← Comunicação com APIs/DB

📄 next.config.ts       ← Configuração do Next.js
📄 tailwind.config.ts   ← Configuração do Tailwind`,
    codeLabel: "Estrutura de pastas recomendada",
  },
  {
    id: 7,
    type: "concept",
    tag: "Server vs Client",
    title: "A regra de ouro do App Router",
    subtitle: null,
    body: [
      { icon: "🖥️", text: "Server Components (padrão): rodam no servidor, sem JavaScript no cliente. Perfeitos para buscar dados." },
      { icon: "🌐", text: "Client Components ('use client'): rodam no browser. Necessários para useState, useEffect, eventos e interatividade." },
      { icon: "✅", text: "Regra: use Server Component por padrão. Adicione 'use client' só quando precisar de interatividade." },
      { icon: "⚡", text: "Benefício: páginas mais rápidas, menos JS enviado ao browser, SEO automático." },
    ],
    tip: null,
    code: null,
  },
  {
    id: 8,
    type: "code",
    tag: "Na prática",
    title: "Seu primeiro Server Component",
    subtitle: null,
    body: null,
    tip: "Este componente busca dados no servidor. O usuário não precisa esperar o JavaScript carregar — o HTML já vem pronto.",
    code: `// src/app/page.tsx — Server Component (padrão)
// Nenhum 'use client' aqui!

async function getProdutos() {
  const res = await fetch('https://api.exemplo.com/produtos');
  return res.json();
}

export default async function PaginaInicial() {
  // Isso roda no SERVIDOR — não no browser
  const produtos = await getProdutos();

  return (
    <main>
      <h1>Produtos</h1>
      <ul>
        {produtos.map((p) => (
          <li key={p.id}>{p.nome}</li>
        ))}
      </ul>
    </main>
  );
}`,
    codeLabel: "src/app/page.tsx",
  },
  {
    id: 9,
    type: "best-practices",
    tag: "Boas Práticas",
    title: "O que todo dev Next.js faz",
    subtitle: null,
    body: [
      { icon: "📁", text: "Organiza código por feature, não por tipo de arquivo." },
      { icon: "🖥️", text: "Prefere Server Components — menos JS = mais velocidade." },
      { icon: "🔒", text: "Nunca expõe segredos no cliente (sem NEXT_PUBLIC_ em dados sensíveis)." },
      { icon: "🖼️", text: "Usa <Image> do Next.js — otimização automática de imagens." },
      { icon: "🔗", text: "Usa <Link> do Next.js — prefetch automático de rotas." },
      { icon: "📊", text: "Usa Metadata API para SEO em vez de tags meta manuais." },
    ],
    tip: null,
    code: null,
  },
  {
    id: 10,
    type: "challenge",
    tag: "🏆 Desafio",
    title: "PRIMEIRO DESAFIO",
    subtitle: "Chegou a hora de codar",
    body: null,
    tip: null,
    code: null,
    challenge: {
      objective: "Crie uma página de portfólio simples com Next.js",
      tasks: [
        "Crie a rota /portfolio com uma página listando 3 projetos fictícios",
        "Cada projeto deve ter: nome, descrição e tecnologias usadas",
        "Crie um componente <ProjectCard /> reutilizável",
        "Use um array de objetos como fonte de dados (sem API por agora)",
        "Adicione uma rota /portfolio/[id] para exibir o detalhe do projeto",
        "Garanta que a página funcione sem erros no console",
      ],
      bonus: [
        "Adicione metadata (title e description) na página",
        "Use a tag <Image> para exibir uma imagem de capa",
        "Crie um loading.tsx para a rota /portfolio",
      ],
    },
  },
];

// ─── COMPONENT ───────────────────────────────────────────────────────────────

export default function NextJSIntroPage() {
  const [current, setCurrent] = useState(0);
  const [completed, setCompleted] = useState<Set<number>>(new Set());
  const [animKey, setAnimKey] = useState(0);

  const slide = slides[current];
  const isLast = current === slides.length - 1;
  const isFirst = current === 0;
  const progress = ((current + 1) / slides.length) * 100;

  const goTo = useCallback((index: number) => {
    if (index < 0 || index >= slides.length) return;
    setCompleted((prev) => new Set([...prev, current]));
    setAnimKey((k) => k + 1);
    setCurrent(index);
  }, [current]);

  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if (e.key === "ArrowRight" || e.key === " ") goTo(current + 1);
      if (e.key === "ArrowLeft") goTo(current - 1);
    }
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [current, goTo]);

  return (
    <div style={{ minHeight: "100vh", background: "var(--dark-1)", display: "flex", flexDirection: "column" }}>
      <Navbar />

      {/* Progress bar */}
      <div style={{ height: "3px", background: "rgba(255,255,255,0.05)", position: "sticky", top: "64px", zIndex: 40 }}>
        <div
          style={{
            height: "100%",
            width: `${progress}%`,
            background: "linear-gradient(90deg, #FF5500, #FF8C00)",
            transition: "width 0.5s cubic-bezier(0.4,0,0.2,1)",
            boxShadow: "0 0 10px rgba(255,85,0,0.6)",
          }}
        />
      </div>

      {/* Main slide area */}
      <main
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          maxWidth: "900px",
          margin: "0 auto",
          width: "100%",
          padding: "3rem 1.5rem 2rem",
        }}
      >
        {/* Top bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "2.5rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <Link
              href="/modulos/nextjs"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.72rem",
                color: "var(--text-muted)",
                textDecoration: "none",
              }}
            >
              ← Next.js
            </Link>
            <span style={{ color: "rgba(255,255,255,0.1)", fontSize: "0.8rem" }}>/</span>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.72rem",
                color: "rgba(255,119,68,0.7)",
              }}
            >
              Introdução
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            {/* Slide dots */}
            <div style={{ display: "flex", gap: "0.3rem" }}>
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  title={`Slide ${i + 1}`}
                  style={{
                    width: i === current ? "1.5rem" : "0.4rem",
                    height: "0.4rem",
                    borderRadius: "9999px",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    background: i === current
                      ? "var(--fire-orange)"
                      : completed.has(i)
                      ? "rgba(255,85,0,0.4)"
                      : "rgba(255,255,255,0.1)",
                    padding: 0,
                  }}
                />
              ))}
            </div>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.72rem",
                color: "var(--text-muted)",
              }}
            >
              {current + 1}/{slides.length}
            </span>
          </div>
        </div>

        {/* SLIDE CONTENT */}
        <div
          key={animKey}
          style={{
            flex: 1,
            animation: "slideIn 0.4s cubic-bezier(0.4,0,0.2,1) both",
          }}
        >
          <SlideContent slide={slide} />
        </div>

        {/* Navigation */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "2.5rem",
            paddingTop: "1.5rem",
            borderTop: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <button
            onClick={() => goTo(current - 1)}
            disabled={isFirst}
            style={{
              padding: "0.65rem 1.5rem",
              borderRadius: "10px",
              border: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(255,255,255,0.03)",
              color: isFirst ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.6)",
              fontSize: "0.85rem",
              fontWeight: 600,
              cursor: isFirst ? "not-allowed" : "pointer",
              fontFamily: "inherit",
              transition: "all 0.2s",
            }}
          >
            ← Anterior
          </button>

          <div style={{ textAlign: "center" }}>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.65rem",
                color: "rgba(255,255,255,0.15)",
                letterSpacing: "0.06em",
              }}
            >
              Use ← → ou espaço
            </span>
          </div>

          {isLast ? (
            <Link
              href="/modulos/nextjs"
              className="fire-btn"
              style={{
                padding: "0.65rem 1.5rem",
                borderRadius: "10px",
                color: "#fff",
                textDecoration: "none",
                fontSize: "0.85rem",
                fontWeight: 700,
              }}
            >
              🏆 Ver Desafio →
            </Link>
          ) : (
            <button
              onClick={() => goTo(current + 1)}
              className="fire-btn"
              style={{
                padding: "0.65rem 1.5rem",
                borderRadius: "10px",
                color: "#fff",
                fontSize: "0.85rem",
                fontWeight: 700,
                fontFamily: "inherit",
                cursor: "pointer",
              }}
            >
              Próximo →
            </button>
          )}
        </div>
      </main>

      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(24px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}

// ─── SLIDE RENDERER ───────────────────────────────────────────────────────────

function SlideContent({ slide }: { slide: typeof slides[0] }) {
  if (slide.type === "cover") return <SlideCover slide={slide} />;
  if (slide.type === "concept") return <SlideConcept slide={slide} />;
  if (slide.type === "definition") return <SlideDefinition slide={slide} />;
  if (slide.type === "comparison") return <SlideComparison slide={slide} />;
  if (slide.type === "architecture") return <SlideArchitecture slide={slide} />;
  if (slide.type === "files") return <SlideFiles slide={slide} />;
  if (slide.type === "code") return <SlideCode slide={slide} />;
  if (slide.type === "best-practices") return <SlideConcept slide={slide} />;
  if (slide.type === "challenge") return <SlideChallenge slide={slide} />;
  return null;
}

function TagBadge({ tag }: { tag: string }) {
  return (
    <span className="badge badge-fire" style={{ marginBottom: "1.5rem", display: "inline-flex" }}>
      {tag}
    </span>
  );
}

function SlideTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      style={{
        fontFamily: "var(--font-display)",
        fontSize: "clamp(2rem, 5vw, 3.5rem)",
        lineHeight: 1,
        letterSpacing: "0.02em",
        color: "var(--text-primary)",
        marginBottom: "1.5rem",
        whiteSpace: "pre-line",
      }}
    >
      {children}
    </h2>
  );
}

function SlideCover({ slide }: { slide: typeof slides[0] }) {
  return (
    <div style={{ textAlign: "center", paddingTop: "3rem" }}>
      <div style={{ position: "relative", display: "inline-block", marginBottom: "2rem" }}>
        <div
          style={{
            position: "absolute",
            inset: "-40px",
            background: "radial-gradient(ellipse, rgba(255,85,0,0.15) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <span style={{ fontSize: "5rem", display: "block" }}>⚡</span>
      </div>

      <TagBadge tag={slide.tag} />

      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(3.5rem, 10vw, 7rem)",
          lineHeight: 0.9,
          letterSpacing: "0.02em",
          whiteSpace: "pre-line",
        }}
      >
        <span className="fire-text">{slide.title}</span>
      </h1>

      <p
        style={{
          marginTop: "2rem",
          fontSize: "1.1rem",
          color: "var(--text-muted)",
          lineHeight: 1.7,
          maxWidth: "480px",
          margin: "2rem auto 0",
        }}
      >
        {slide.subtitle}
      </p>
    </div>
  );
}

function SlideConcept({ slide }: { slide: typeof slides[0] }) {
  return (
    <div>
      <TagBadge tag={slide.tag} />
      <SlideTitle>{slide.title}</SlideTitle>

      {slide.body && (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", maxWidth: "680px" }}>
          {(slide.body as Array<{ icon: string; text: string }>).map((item, i) => (
            <div
              key={i}
              className="card"
              style={{
                borderRadius: "12px",
                padding: "1rem 1.25rem",
                display: "flex",
                alignItems: "flex-start",
                gap: "1rem",
                animationDelay: `${i * 0.08}s`,
              }}
            >
              <span style={{ fontSize: "1.4rem", flexShrink: 0, marginTop: "0.1rem" }}>{item.icon}</span>
              <p style={{ fontSize: "0.92rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.6 }}>
                {item.text}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function SlideDefinition({ slide }: { slide: typeof slides[0] & { quote?: string; highlights?: string[] } }) {
  const quote = slide.quote ?? "";
  const highlights = slide.highlights ?? [];

  const highlighted = highlights.reduce((acc, h) => {
    return acc.replace(h, `<mark style="background:rgba(255,85,0,0.15);color:#FF7744;border-radius:4px;padding:0 3px">${h}</mark>`);
  }, quote);

  return (
    <div>
      <TagBadge tag={slide.tag} />
      <SlideTitle>{slide.title}</SlideTitle>

      <div
        style={{
          maxWidth: "680px",
          padding: "2.5rem",
          borderRadius: "16px",
          background: "var(--dark-2)",
          border: "1px solid rgba(255,85,0,0.2)",
          boxShadow: "0 0 40px rgba(255,85,0,0.06)",
          position: "relative",
        }}
      >
        <span
          style={{
            position: "absolute",
            top: "1rem",
            left: "1.5rem",
            fontFamily: "var(--font-display)",
            fontSize: "4rem",
            lineHeight: 1,
            color: "rgba(255,85,0,0.15)",
          }}
        >
          &ldquo;
        </span>
        <p
          style={{
            fontSize: "1.1rem",
            color: "rgba(255,255,255,0.8)",
            lineHeight: 1.8,
            paddingTop: "1rem",
          }}
          dangerouslySetInnerHTML={{ __html: highlighted }}
        />
      </div>
    </div>
  );
}

function SlideComparison({ slide }: { slide: typeof slides[0] & { comparison?: Array<{ label: string; items: string[] }> } }) {
  const comparison = slide.comparison ?? [];
  return (
    <div>
      <TagBadge tag={slide.tag} />
      <SlideTitle>{slide.title}</SlideTitle>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem", maxWidth: "700px" }}>
        {comparison.map((col, ci) => (
          <div
            key={col.label}
            className="card"
            style={{
              borderRadius: "14px",
              padding: "1.5rem",
              border: ci === 1 ? "1px solid rgba(255,85,0,0.25)" : undefined,
              background: ci === 1 ? "var(--dark-2)" : undefined,
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.1rem",
                letterSpacing: "0.04em",
                marginBottom: "1rem",
                color: ci === 1 ? "#FF7744" : "var(--text-muted)",
              }}
            >
              {col.label}
            </div>
            <ul style={{ listStyle: "none" }}>
              {col.items.map((item, ii) => (
                <li
                  key={ii}
                  style={{
                    fontSize: "0.83rem",
                    color: ci === 1 ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0.35)",
                    padding: "0.35rem 0",
                    borderBottom: "1px solid rgba(255,255,255,0.04)",
                    display: "flex",
                    gap: "0.5rem",
                    alignItems: "flex-start",
                    lineHeight: 1.5,
                  }}
                >
                  <span style={{ color: ci === 1 ? "var(--fire-orange)" : "rgba(255,255,255,0.15)", fontSize: "0.6rem", marginTop: "0.3rem" }}>
                    {ci === 1 ? "✓" : "·"}
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

function SlideArchitecture({ slide }: { slide: typeof slides[0] }) {
  return (
    <div>
      <TagBadge tag={slide.tag} />
      <SlideTitle>{slide.title}</SlideTitle>
      {slide.subtitle && (
        <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem", fontSize: "0.9rem" }}>
          {slide.subtitle}
        </p>
      )}

      {slide.body && (
        <div style={{ maxWidth: "600px" }}>
          {(slide.body as Array<{ icon: string; text: string }>).map((step, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: "1rem",
                alignItems: "flex-start",
                paddingBottom: i < slide.body!.length - 1 ? "1rem" : 0,
                position: "relative",
              }}
            >
              {i < slide.body!.length - 1 && (
                <div
                  style={{
                    position: "absolute",
                    left: "1.35rem",
                    top: "2.2rem",
                    width: "2px",
                    height: "calc(100% - 0.5rem)",
                    background: "linear-gradient(to bottom, rgba(255,85,0,0.4), rgba(255,85,0,0.1))",
                  }}
                />
              )}
              <div
                style={{
                  width: "2.7rem",
                  height: "2.7rem",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #FF5500, #CC2200)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1rem",
                  flexShrink: 0,
                  boxShadow: "0 0 15px rgba(255,85,0,0.3)",
                  zIndex: 1,
                }}
              >
                {step.icon}
              </div>
              <div style={{ paddingTop: "0.4rem" }}>
                <p style={{ fontSize: "0.92rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.5 }}>
                  {step.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {slide.tip && (
        <div className="tip-box" style={{ marginTop: "1.5rem", maxWidth: "600px" }}>
          <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.6 }}>
            💡 <strong style={{ color: "#FF7744" }}>Conceito:</strong> {slide.tip}
          </p>
        </div>
      )}
    </div>
  );
}

function SlideFiles({ slide }: { slide: typeof slides[0] & { codeLabel?: string } }) {
  return (
    <div>
      <TagBadge tag={slide.tag} />
      <SlideTitle>{slide.title}</SlideTitle>

      {slide.code && (
        <div style={{ maxWidth: "680px" }}>
          {slide.codeLabel && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                marginBottom: "0.5rem",
                fontFamily: "var(--font-mono)",
                fontSize: "0.7rem",
                color: "rgba(255,119,68,0.6)",
              }}
            >
              📁 {slide.codeLabel}
            </div>
          )}
          <pre
            className="code-block"
            style={{
              margin: 0,
              fontFamily: "var(--font-mono)",
              fontSize: "0.82rem",
              lineHeight: 1.85,
              whiteSpace: "pre",
              overflowX: "auto",
            }}
          >
            {slide.code}
          </pre>
        </div>
      )}
    </div>
  );
}

function SlideCode({ slide }: { slide: typeof slides[0] & { codeLabel?: string } }) {
  return (
    <div>
      <TagBadge tag={slide.tag} />
      <SlideTitle>{slide.title}</SlideTitle>

      {slide.code && (
        <div style={{ maxWidth: "700px" }}>
          {slide.codeLabel && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.5rem 1rem",
                background: "#0a0a0a",
                borderRadius: "10px 10px 0 0",
                border: "1px solid rgba(255,85,0,0.15)",
                borderBottom: "none",
                fontFamily: "var(--font-mono)",
                fontSize: "0.72rem",
                color: "rgba(255,119,68,0.7)",
              }}
            >
              <span style={{ opacity: 0.5 }}>●</span>
              <span style={{ opacity: 0.5 }}>●</span>
              <span style={{ opacity: 0.5 }}>●</span>
              <span style={{ marginLeft: "0.5rem" }}>{slide.codeLabel}</span>
            </div>
          )}
          <pre
            className="code-block"
            style={{
              margin: 0,
              fontFamily: "var(--font-mono)",
              fontSize: "0.8rem",
              lineHeight: 1.8,
              borderRadius: slide.codeLabel ? "0 0 10px 10px" : undefined,
              whiteSpace: "pre",
              overflowX: "auto",
            }}
          >
            {slide.code}
          </pre>
        </div>
      )}

      {slide.tip && (
        <div className="tip-box" style={{ marginTop: "1.25rem", maxWidth: "700px" }}>
          <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.6 }}>
            💡 {slide.tip}
          </p>
        </div>
      )}
    </div>
  );
}

function SlideChallenge({ slide }: { slide: typeof slides[0] & { challenge?: { objective: string; tasks: string[]; bonus: string[] } } }) {
  const challenge = slide.challenge;
  if (!challenge) return null;

  return (
    <div>
      <TagBadge tag={slide.tag} />
      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
          lineHeight: 0.95,
          letterSpacing: "0.02em",
          marginBottom: "0.5rem",
        }}
      >
        <span className="fire-text">{slide.title}</span>
      </h2>
      <p style={{ color: "var(--text-muted)", marginBottom: "2rem", fontSize: "1rem" }}>
        {slide.subtitle}
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem", maxWidth: "820px" }}>
        {/* Objective */}
        <div
          className="card fire-border"
          style={{ borderRadius: "14px", padding: "1.5rem", gridColumn: "1 / -1" }}
        >
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "rgba(255,119,68,0.6)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.5rem" }}>
            Objetivo
          </div>
          <p style={{ fontSize: "1rem", color: "var(--text-primary)", lineHeight: 1.6 }}>
            🎯 {challenge.objective}
          </p>
        </div>

        {/* Tasks */}
        <div className="card" style={{ borderRadius: "14px", padding: "1.5rem" }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "rgba(255,119,68,0.6)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "1rem" }}>
            Tarefas obrigatórias
          </div>
          <ul style={{ listStyle: "none" }}>
            {challenge.tasks.map((task, i) => (
              <li
                key={i}
                style={{
                  display: "flex",
                  gap: "0.75rem",
                  alignItems: "flex-start",
                  padding: "0.5rem 0",
                  borderBottom: i < challenge.tasks.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                  fontSize: "0.82rem",
                  color: "rgba(255,255,255,0.65)",
                  lineHeight: 1.5,
                }}
              >
                <span
                  style={{
                    width: "1.3rem",
                    height: "1.3rem",
                    borderRadius: "4px",
                    border: "2px solid rgba(255,85,0,0.3)",
                    background: "rgba(255,85,0,0.05)",
                    flexShrink: 0,
                    marginTop: "0.1rem",
                  }}
                />
                {task}
              </li>
            ))}
          </ul>
        </div>

        {/* Bonus */}
        <div className="card" style={{ borderRadius: "14px", padding: "1.5rem" }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "rgba(251,191,36,0.6)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "1rem" }}>
            🏆 Desafio bônus
          </div>
          <ul style={{ listStyle: "none" }}>
            {challenge.bonus.map((b, i) => (
              <li
                key={i}
                style={{
                  display: "flex",
                  gap: "0.75rem",
                  alignItems: "flex-start",
                  padding: "0.5rem 0",
                  borderBottom: i < challenge.bonus.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                  fontSize: "0.82rem",
                  color: "rgba(255,255,255,0.5)",
                  lineHeight: 1.5,
                }}
              >
                <span style={{ color: "rgba(251,191,36,0.5)", flexShrink: 0 }}>⭐</span>
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
