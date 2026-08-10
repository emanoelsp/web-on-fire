import type { Slide } from "@/types/slides";

export const AULA_PAGINAS_SLIDES: Slide[] = [
  {
    id: 1,
    type: "cover",
    tag: "Módulo 02 · Aula 01 · Parte 3",
    title: "PÁGINAS DE\nCONTEÚDO\n& URLs",
    subtitle: "Você tem rotas e componentes. Agora: como estruturar páginas e controlar as URLs.",
  },
  {
    id: 2,
    type: "concept",
    tag: "Revisão rápida",
    title: "Como o App Router gera URLs",
    items: [
      { icon: "📁", text: "Regra: pasta com page.tsx = rota acessível no browser. Sempre." },
      { icon: "🌐", text: "app/sobre/page.tsx → URL: /sobre" },
      { icon: "🌐", text: "app/blog/page.tsx → URL: /blog" },
      { icon: "🌐", text: "app/contato/page.tsx → URL: /contato" },
    ],
    tip: "O nome da pasta vira exatamente o segmento da URL — zero configuração extra para rotas simples.",
  },
  {
    id: 3,
    type: "files",
    tag: "Na prática",
    title: "Estrutura de páginas de conteúdo",
    codeLabel: "app/ — páginas típicas de um site institucional",
    code: `📁 src/app/
  📄 page.tsx              → /         (home)
  📄 layout.tsx            → layout global (Header + Footer)
  📁 sobre/
    📄 page.tsx            → /sobre
  📁 contato/
    📄 page.tsx            → /contato
  📁 blog/
    📄 page.tsx            → /blog     (lista de posts)
    📁 [slug]/
      📄 page.tsx          → /blog/meu-post
  📁 privacidade/
    📄 page.tsx            → /privacidade
  📁 termos/
    📄 page.tsx            → /termos`,
    tip: "Cada pasta é uma decisão de URL pública. Pense primeiro no que o usuário vai digitar no browser.",
  },
  {
    id: 4,
    type: "code",
    tag: "Página /sobre",
    title: "Criando uma página de conteúdo",
    codeLabel: "src/app/sobre/page.tsx",
    tip: "export const metadata define o título da aba e a description para SEO — sem bibliotecas extras, nativo do Next.js.",
    code: `import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre nós · MeuSite",
  description: "Conheça a história e a missão da nossa empresa.",
};

export default function SobrePage() {
  return (
    <main style={{ maxWidth: "760px", margin: "0 auto", padding: "4rem 1.5rem" }}>
      <h1>Sobre nós</h1>
      <p>
        Somos uma empresa apaixonada por tecnologia. Fundada em 2020,
        nossa missão é simplificar o desenvolvimento web para todos.
      </p>

      <h2>Nossa equipe</h2>
      <p>
        Times distribuídos em 5 países, todos remotos e com foco em
        entregar valor real para os nossos clientes.
      </p>
    </main>
  );
}`,
  },
  {
    id: 5,
    type: "files",
    tag: "O problema",
    title: "Quando a organização interna não combina com a URL",
    codeLabel: "Cenário: você quer agrupar páginas por tipo",
    code: `// Você quer organizar internamente assim:
📁 src/app/
  📁 paginas/             ← agrupa conteúdo institucional
    📁 sobre/
      📄 page.tsx         → URL gerada: /paginas/sobre ❌
    📁 contato/
      📄 page.tsx         → URL gerada: /paginas/contato ❌

// Mas a URL pública que você quer é:
//   /sobre     (não /paginas/sobre)
//   /contato   (não /paginas/contato)

// Duas soluções:
// ──────────────────────────────────────
// Opção A: Rewrites no next.config.ts
//   → mapeia /sobre para /paginas/sobre no servidor
//   → mais configuração, mais manutenção
//
// Opção B: Route Groups com parênteses  ← recomendado
//   → app/(institucional)/sobre/page.tsx → URL: /sobre ✅
//   → zero configuração, zero restart`,
  },
  {
    id: 6,
    type: "code",
    tag: "Opção A — Rewrites",
    title: "Rewrites no next.config.ts",
    codeLabel: "next.config.ts",
    tip: "Rewrites são invisíveis ao browser — /sobre no endereço, mas Next.js serve /paginas/sobre internamente.",
    code: `import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      // /sobre → serve o conteúdo de /paginas/sobre (invisível ao browser)
      { source: "/sobre",   destination: "/paginas/sobre" },
      { source: "/contato", destination: "/paginas/contato" },

      // Com padrão: /p/:slug → /paginas/:slug
      // Cobre /p/sobre, /p/contato, /p/qualquer em uma regra só
      { source: "/p/:slug", destination: "/paginas/:slug" },
    ];
  },
};

export default nextConfig;
// ⚠️ Rewrites exigem restart do servidor de dev (npm run dev)`,
  },
  {
    id: 7,
    type: "comparison",
    tag: "Rewrite vs Redirect",
    title: "Rewrite não é Redirect — a diferença importa",
    left: {
      label: "rewrite (invisível)",
      items: [
        "URL do browser: /sobre",
        "Next.js serve: /paginas/sobre",
        "Usuário não percebe a troca",
        "Browser não navega de novo",
        "Ideal para organização interna",
      ],
    },
    right: {
      label: "redirect (visível)",
      items: [
        "URL do browser: /sobre",
        "Browser recebe 301/302",
        "Browser navega para /paginas/sobre",
        "URL pública muda visivelmente",
        "Ideal para migrar URLs antigas",
      ],
    },
    tip: "Use rewrite para esconder estrutura interna. Use redirect para redirecionar URLs legadas (ex: /blog-antigo → /blog).",
  },
  {
    id: 8,
    type: "code",
    tag: "Opção B — Route Groups",
    title: "Route Groups: a solução nativa (recomendada)",
    codeLabel: "app/ com Route Group — parênteses = sem URL",
    tip: "Parênteses na pasta = Next.js ignora na URL. Organização interna sem afetar URL pública — zero config, zero restart.",
    code: `// Estrutura com Route Group:
📁 src/app/
  📁 (institucional)/     ← parênteses: NÃO vira segmento de URL
    📁 sobre/
      📄 page.tsx         → URL: /sobre ✅
    📁 contato/
      📄 page.tsx         → URL: /contato ✅
    📁 privacidade/
      📄 page.tsx         → URL: /privacidade ✅
  📁 (produto)/           ← outro grupo
    📁 blog/
      📄 page.tsx         → URL: /blog ✅
    📁 precos/
      📄 page.tsx         → URL: /precos ✅

// A pasta (institucional) existe no seu editor
// mas NÃO existe na URL. Zero next.config.ts, zero restart.
// Bônus: cada grupo pode ter seu próprio layout.tsx.`,
  },
  {
    id: 9,
    type: "code",
    tag: "Decisão",
    title: "Qual solução usar? Árvore de decisão",
    codeLabel: "guia rápido",
    code: `// Quero uma URL simples e já sei a estrutura?
//   └── Crie a pasta direto: app/sobre/page.tsx → /sobre
//       ✅ Mais simples. Comece aqui.

// Quero organizar pastas internamente sem mudar a URL pública?
//   └── Route Group: app/(institucional)/sobre/page.tsx → /sobre
//       ✅ Solução nativa. Zero config. Recomendada.

// Quero redirecionar uma URL antiga para uma nova (SEO, migração)?
//   └── next.config.ts → redirects()
//       { source: "/blog-antigo", destination: "/blog", permanent: true }
//       ⚠️ Browser vê a URL nova (visível).

// Quero que /publica sirva conteúdo de /outra (proxy invisível)?
//   └── next.config.ts → rewrites()
//       { source: "/sobre", destination: "/paginas/sobre" }
//       ⚠️ Browser vê /sobre, Next.js serve /paginas/sobre.

// Preciso rotear para uma API ou servidor externo?
//   └── next.config.ts → rewrites() com destination externo
//       { source: "/api/:path*", destination: "https://api.meuservidor.com/:path*" }`,
  },
  {
    id: 10,
    type: "code",
    tag: "Bônus",
    title: "Layout exclusivo por Route Group",
    codeLabel: "app/(institucional)/layout.tsx",
    tip: "Cada Route Group pode ter layout.tsx próprio — sem afetar o RootLayout global nem outras rotas.",
    code: `// app/(institucional)/layout.tsx
// Só as páginas dentro de (institucional) recebem este layout
export default function InstitucionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {/* Barra extra só nas páginas institucionais */}
      <div style={{ background: "#f5f5f5", padding: "0.5rem 2rem", fontSize: "0.875rem" }}>
        📌 Conteúdo institucional
      </div>
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "2rem 1.5rem" }}>
        {children}
      </div>
    </div>
  );
}

// Resultado:
// /sobre    → RootLayout (Header/Footer) + InstitucionalLayout + page.tsx
// /blog     → RootLayout (Header/Footer) + page.tsx  (sem InstitucionalLayout)`,
  },
  {
    id: 11,
    type: "mini-challenge",
    tag: "🎯 Missão 05 · P3",
    title: "PÁGINAS E\nARQUITETURA\nDE URLs",
    subtitle: "Monte a estrutura de páginas de um site real",
    tasks: [
      "Crie /sobre/page.tsx com metadata (title e description)",
      "Crie /contato/page.tsx com um formulário simples (só HTML, sem lógica de envio)",
      "Organize /sobre e /contato em um Route Group (institucional) — confirme que as URLs /sobre e /contato continuam funcionando",
    ],
    bonus: [
      "Adicione um layout.tsx exclusivo para o grupo (institucional) com uma barra extra no topo",
      "Crie um rewrite em next.config.ts: /info → /sobre (e teste no browser)",
      "Crie /blog/page.tsx com lista estática de 3 posts e /blog/[slug]/page.tsx com generateMetadata dinâmica",
    ],
    nextHref: "/modulos/nextjs/intro",
    nextLabel: "Aula 02 · P1: Fundações do Next.js →",
  },
];
