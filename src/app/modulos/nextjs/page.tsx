import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getAulaLocks } from "@/services/progressService";

export const dynamic = "force-dynamic";

interface AulaItem {
  slug: string;
  num: string;
  title: string;
  desc: string;
  href: string;
  icon: string;
  duration: string;
  slides: number | null;
  challenge?: boolean;
}

interface AulaGroup {
  label: string;
  title: string;
  desc: string;
  items: AulaItem[];
}

const grupos: AulaGroup[] = [
  {
    label: "Aula 01",
    title: "Roteamento, Componentes e Páginas",
    desc: "URLs, componentes reutilizáveis (Header/Footer/Nav) e como organizar páginas de conteúdo.",
    items: [
      {
        slug: "nextjs-aula-02",
        num: "P1",
        title: "App Router & Roteamento",
        desc: "File-system routing, rotas dinâmicas, catch-all segments, route groups, Link e useRouter.",
        href: "/modulos/nextjs/aula-02",
        icon: "🗺️",
        duration: "~40 min",
        slides: 11,
      },
      {
        slug: "nextjs-aula-componentes",
        num: "P2",
        title: "Componentes Reutilizáveis",
        desc: "Criação de Header, Footer e Navbar reutilizáveis — arquitetura da pasta components/ e composição com layout.tsx.",
        href: "/modulos/nextjs/aula-componentes",
        icon: "🧱",
        duration: "~35 min",
        slides: 11,
      },
      {
        slug: "nextjs-aula-paginas",
        num: "P3",
        title: "Páginas de Conteúdo & URLs",
        desc: "Como criar /sobre, /contato e /blog, Route Groups para organização sem poluir a URL, e rewrites no next.config.ts.",
        href: "/modulos/nextjs/aula-paginas",
        icon: "📄",
        duration: "~35 min",
        slides: 11,
      },
    ],
  },
  {
    label: "Aula 02",
    title: "Fundações do Next.js (App Router)",
    desc: "Estrutura de diretórios, next.config.ts e o paradigma central: Server vs Client Components.",
    items: [
      {
        slug: "nextjs-intro",
        num: "P1",
        title: "Introdução e Estrutura",
        desc: "O que o Next.js resolve, estrutura de diretórios, next.config.ts e o primeiro Server Component.",
        href: "/modulos/nextjs/intro",
        icon: "⚡",
        duration: "~40 min",
        slides: 11,
      },
      {
        slug: "nextjs-aula-03",
        num: "P2",
        title: "Server vs Client Components",
        desc: "A decisão mais importante do App Router: RSC por padrão, \"use client\" só com interatividade.",
        href: "/modulos/nextjs/aula-03",
        icon: "⚙️",
        duration: "~45 min",
        slides: 11,
      },
    ],
  },
  {
    label: "Aula 03",
    title: "Data Fetching e Mock Data",
    desc: "fetch nativo no servidor, simulação com constantes locais, cache e revalidação.",
    items: [
      {
        slug: "nextjs-data-fetching",
        num: "03",
        title: "Data Fetching & Mock Data",
        desc: "Server Components async, camada de serviço com mocks tipados, force-cache, revalidate e no-store.",
        href: "/modulos/nextjs/data-fetching",
        icon: "💾",
        duration: "~45 min",
        slides: 12,
      },
    ],
  },
  {
    label: "Aula 04",
    title: "Otimizações e Lazy Loading",
    desc: "next/dynamic para reduzir a carga inicial, next/image e next/font.",
    items: [
      {
        slug: "nextjs-otimizacoes",
        num: "04",
        title: "Otimizações & Lazy Loading",
        desc: "Code splitting, importação dinâmica, imagens e fontes otimizadas, Core Web Vitals.",
        href: "/modulos/nextjs/otimizacoes",
        icon: "🚀",
        duration: "~40 min",
        slides: 11,
      },
    ],
  },
  {
    label: "Aula 05",
    title: "UX Estrutural e Tratamento de Exceções",
    desc: "loading.tsx, Error Boundaries com error.tsx e not-found.tsx.",
    items: [
      {
        slug: "nextjs-aula-04",
        num: "05",
        title: "Loading, Error & Not Found",
        desc: "layout.tsx, loading.tsx, error.tsx, not-found.tsx e Metadata API para SEO profissional.",
        href: "/modulos/nextjs/aula-04",
        icon: "🎨",
        duration: "~40 min",
        slides: 11,
      },
    ],
  },
  {
    label: "Fechamento",
    title: "Desafio Final do Módulo",
    desc: "Um projeto que cobra tudo: rotas, RSC, dados, otimização e UX.",
    items: [
      {
        slug: "nextjs-desafio",
        num: "🏆",
        title: "Desafio Final — TechBlog",
        desc: "Construa um blog técnico completo com todas as técnicas do módulo. Checklist com critérios de avaliação.",
        href: "/modulos/nextjs/desafio",
        icon: "🏆",
        duration: "~90 min",
        slides: null,
        challenge: true,
      },
    ],
  },
];

export const metadata = {
  title: "Módulo 02 — Arquitetura Core do Next.js · Web On Fire Academy",
};

export default async function NextJSModulePage() {
  const { lockedAulas } = await getAulaLocks();
  const todas = grupos.flatMap((g) => g.items);
  const totalSlides = todas.reduce((acc, a) => acc + (a.slides ?? 0), 0);

  return (
    <div style={{ minHeight: "100vh", background: "var(--dark-1)", display: "flex", flexDirection: "column" }}>
      <Navbar />

      <main style={{ flex: 1 }}>
        {/* HERO */}
        <section style={{ position: "relative", padding: "5rem 1.5rem 4rem", maxWidth: "1100px", margin: "0 auto", overflow: "hidden" }}>
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "500px",
              height: "400px",
              background: "radial-gradient(ellipse, rgba(255,85,0,0.07) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />

          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "2rem", fontSize: "0.78rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
            <Link href="/" style={{ color: "var(--text-muted)", textDecoration: "none" }}>início</Link>
            <span>/</span>
            <span style={{ color: "rgba(255,119,68,0.7)" }}>módulo 02</span>
          </div>

          <div style={{ display: "flex", alignItems: "flex-start", gap: "2rem", flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: "280px" }}>
              <span className="badge badge-fire" style={{ marginBottom: "1.25rem", display: "inline-flex" }}>
                ⚡ Módulo 02 — Aulas 01 a 05
              </span>
              <h1
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2.2rem, 5.5vw, 4rem)",
                  lineHeight: 0.95,
                  letterSpacing: "0.02em",
                  color: "var(--text-primary)",
                  marginBottom: "1.25rem",
                }}
              >
                ARQUITETURA CORE
                <br />
                <span className="fire-text">DO NEXT.JS</span>
              </h1>
              <p style={{ fontSize: "1rem", color: "var(--text-muted)", lineHeight: 1.8, maxWidth: "540px", marginBottom: "2rem" }}>
                Imersão exclusiva nas funcionalidades nativas do framework: fluxo de
                dados, paradigmas de renderização, roteamento, otimizações e UX
                estrutural — sem bibliotecas visuais externas.
              </p>

              <Link
                href="/modulos/nextjs/aula-02"
                className="fire-btn"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.85rem 2rem",
                  borderRadius: "10px",
                  color: "#fff",
                  textDecoration: "none",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  letterSpacing: "0.02em",
                }}
              >
                🔥 Começar pela Aula 01
              </Link>
            </div>

            {/* Stats card */}
            <div className="card fire-border" style={{ borderRadius: "16px", padding: "1.75rem", minWidth: "220px", flexShrink: 0 }}>
              {[
                { value: "7", label: "Aulas", fire: true },
                { value: String(totalSlides), label: "Slides", fire: false },
                { value: "~4h", label: "de conteúdo", fire: false },
                { value: "1", label: "Desafio final", fire: false },
              ].map((s) => (
                <div
                  key={s.label}
                  style={{
                    marginBottom: "1.1rem",
                    paddingBottom: "1.1rem",
                    borderBottom: "1px solid rgba(255,255,255,0.04)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>{s.label}</span>
                  <span
                    className={s.fire ? "fire-text" : ""}
                    style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", color: s.fire ? undefined : "var(--text-primary)" }}
                  >
                    {s.value}
                  </span>
                </div>
              ))}
              <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                {["Next.js 16", "App Router", "RSC"].map((t) => (
                  <span
                    key={t}
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.62rem",
                      padding: "0.15rem 0.5rem",
                      borderRadius: "9999px",
                      background: "rgba(255,85,0,0.06)",
                      border: "1px solid rgba(255,85,0,0.15)",
                      color: "rgba(255,119,68,0.7)",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="divider" style={{ maxWidth: "1100px", margin: "0 auto" }} />

        {/* TRILHA */}
        <section style={{ padding: "4rem 1.5rem", maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 3vw, 2.5rem)", letterSpacing: "0.04em", color: "var(--text-primary)" }}>
              TRILHA DO MÓDULO
            </h2>
            <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginTop: "0.4rem" }}>
              Cada aula termina com uma missão prática — e o módulo fecha com o desafio TechBlog 🏆
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {grupos.map((grupo) => (
              <div key={grupo.label}>
                <div style={{ marginBottom: "0.9rem" }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "0.75rem", flexWrap: "wrap" }}>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.68rem",
                        color: "#FF7744",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        fontWeight: 700,
                      }}
                    >
                      {grupo.label}
                    </span>
                    <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", letterSpacing: "0.03em", color: "var(--text-primary)" }}>
                      {grupo.title}
                    </h3>
                  </div>
                  <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "0.2rem" }}>{grupo.desc}</p>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {grupo.items.map((aula) => {
                    const locked = lockedAulas.includes(aula.slug);
                    const isChallenge = !!aula.challenge && !locked;

                    return (
                      <div
                        key={aula.slug}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "1.25rem",
                          padding: "1.25rem 1.5rem",
                          borderRadius: "14px",
                          background: "var(--dark-2)",
                          border: locked
                            ? "1px solid rgba(255,255,255,0.04)"
                            : isChallenge
                            ? "1px solid rgba(251,191,36,0.2)"
                            : "1px solid rgba(255,85,0,0.2)",
                          opacity: locked ? 0.55 : 1,
                        }}
                      >
                        <div
                          style={{
                            width: "3rem",
                            height: "3rem",
                            borderRadius: "10px",
                            background: locked
                              ? "rgba(255,255,255,0.05)"
                              : isChallenge
                              ? "linear-gradient(135deg, #FFB800, #FF6600)"
                              : "linear-gradient(135deg, #FF5500, #CC2200)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "1.3rem",
                            flexShrink: 0,
                            boxShadow: locked
                              ? undefined
                              : isChallenge
                              ? "0 0 20px rgba(251,191,36,0.15)"
                              : "0 0 20px rgba(255,85,0,0.25)",
                          }}
                        >
                          {locked ? "🔒" : aula.icon}
                        </div>

                        <div style={{ flex: 1, minWidth: "200px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.2rem", flexWrap: "wrap" }}>
                            <span
                              style={{
                                fontFamily: "var(--font-mono)",
                                fontSize: "0.65rem",
                                color: locked ? "rgba(255,255,255,0.2)" : "#FF7744",
                                letterSpacing: "0.08em",
                              }}
                            >
                              {aula.num}
                            </span>
                            {locked ? (
                              <span className="badge badge-blue" style={{ fontSize: "0.58rem" }}>🔒 Bloqueada pelo professor</span>
                            ) : isChallenge ? (
                              <span className="badge badge-amber" style={{ fontSize: "0.58rem" }}>🏆 Desafio</span>
                            ) : (
                              <span className="badge badge-fire" style={{ fontSize: "0.58rem" }}>Disponível</span>
                            )}
                            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", color: "rgba(255,255,255,0.2)" }}>
                              {aula.duration}
                              {aula.slides ? ` · ${aula.slides} slides` : " · checklist interativo"}
                            </span>
                          </div>
                          <h4 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", letterSpacing: "0.03em", color: "var(--text-primary)", marginBottom: "0.2rem" }}>
                            {aula.title}
                          </h4>
                          <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", lineHeight: 1.5 }}>{aula.desc}</p>
                        </div>

                        {locked ? (
                          <span
                            style={{
                              flexShrink: 0,
                              padding: "0.6rem 1.25rem",
                              borderRadius: "8px",
                              fontSize: "0.82rem",
                              fontWeight: 600,
                              color: "rgba(255,255,255,0.25)",
                              background: "rgba(255,255,255,0.03)",
                              border: "1px solid rgba(255,255,255,0.06)",
                            }}
                          >
                            Em breve
                          </span>
                        ) : (
                          <Link
                            href={aula.href}
                            className="fire-btn"
                            style={{
                              flexShrink: 0,
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "0.4rem",
                              padding: "0.6rem 1.25rem",
                              borderRadius: "8px",
                              fontSize: "0.82rem",
                              fontWeight: 600,
                              textDecoration: "none",
                              color: "#fff",
                            }}
                          >
                            {isChallenge ? "Ver Desafio →" : "Iniciar →"}
                          </Link>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
