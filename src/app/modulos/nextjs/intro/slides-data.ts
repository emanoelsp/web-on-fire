import type { Slide } from "@/types/slides";

export const INTRO_SLIDES: Slide[] = [
  {
    id: 1,
    type: "cover",
    tag: "Bem-vindo",
    title: "O QUE É\nNEXT.JS?",
    subtitle: "Antes de codar, entender. Antes de entender, sentir.",
  },
  {
    id: 2,
    type: "concept",
    tag: "Contexto",
    title: "O problema que o Next.js resolve",
    items: [
      { icon: "😩", text: "React puro exige configurar tudo: bundler, roteamento, SSR, SEO, deploy — você começa do zero sempre." },
      { icon: "📦", text: "Cada projeto reinventa a roda: Webpack, Babel, React Router, Helmet... horas de config antes de codar." },
      { icon: "🐌", text: "SPAs têm problema de performance e SEO — o HTML chega vazio ao browser, o Google não vê o conteúdo." },
      { icon: "🔥", text: "Next.js chega como o framework que já vem configurado e pronto para produção desde o primeiro npx." },
    ],
  },
  {
    id: 3,
    type: "definition",
    tag: "Definição",
    title: "Next.js em uma frase",
    quote: "Next.js é um framework React de produção que adiciona roteamento baseado em arquivos, renderização no servidor, otimização automática e convenções prontas para escalar.",
    highlights: [
      "roteamento baseado em arquivos",
      "renderização no servidor",
      "otimização automática",
      "convenções prontas para escalar",
    ],
  },
  {
    id: 4,
    type: "comparison",
    tag: "React vs Next.js",
    title: "A diferença que importa",
    left: {
      label: "React puro",
      items: [
        "Apenas biblioteca de UI",
        "Você configura tudo",
        "SPA por padrão (SEO ruim)",
        "Nenhum roteamento incluído",
        "Deploy manual e complexo",
      ],
    },
    right: {
      label: "Next.js",
      items: [
        "Framework completo",
        "Configuração zero",
        "SSR + SSG + ISR nativos",
        "App Router por arquivo",
        "Deploy com 1 clique na Vercel",
      ],
    },
  },
  {
    id: 5,
    type: "architecture",
    tag: "Arquitetura",
    title: "Como o Next.js funciona",
    subtitle: "O fluxo de uma requisição no App Router",
    steps: [
      { icon: "1️⃣", text: "Browser faz requisição para /produtos" },
      { icon: "2️⃣", text: "Next.js encontra src/app/produtos/page.tsx" },
      { icon: "3️⃣", text: "Executa o componente no servidor (Node.js)" },
      { icon: "4️⃣", text: "Retorna HTML completo para o browser" },
      { icon: "5️⃣", text: "React hidrata a página — JS assume o controle" },
    ],
    tip: "SSR = Server Side Rendering. O HTML já vem preenchido, então o SEO e a performance são muito melhores que um SPA tradicional.",
  },
  {
    id: 6,
    type: "files",
    tag: "Estrutura",
    title: "Os arquivos que você precisa dominar",
    codeLabel: "Estrutura de pastas recomendada",
    code: `📁 src/
  📁 app/
    📄 layout.tsx        ← HTML base + fontes + providers (global)
    📄 page.tsx          ← Página raiz — rota "/"
    📄 globals.css       ← CSS global
    📁 sobre/
      📄 page.tsx        ← Rota "/sobre"
    📁 blog/
      📁 [slug]/
        📄 page.tsx      ← Rota dinâmica "/blog/qualquer-slug"
      📄 loading.tsx     ← Exibido enquanto a página carrega
      📄 error.tsx       ← Exibido em caso de erro
  📁 components/         ← Componentes reutilizáveis
  📁 lib/                ← Firebase, utils, configurações
  📁 services/           ← Acesso a dados (Firestore, APIs)
  📁 types/              ← Tipos TypeScript

📄 next.config.ts        ← Configuração do Next.js
📄 tailwind.config.ts    ← Configuração do Tailwind`,
  },
  {
    id: 7,
    type: "concept",
    tag: "Server vs Client",
    title: "A regra de ouro do App Router",
    items: [
      { icon: "🖥️", text: "Server Components (padrão): rodam no servidor, sem JavaScript no cliente. Perfeitos para buscar dados." },
      { icon: "🌐", text: "Client Components ('use client'): rodam no browser. Para useState, useEffect, eventos e interatividade." },
      { icon: "✅", text: "Regra: use Server Component por padrão. Adicione 'use client' só quando precisar de interatividade." },
      { icon: "⚡", text: "Benefício: bundle menor, carregamento mais rápido, SEO automático, sem loading spinner inicial." },
    ],
  },
  {
    id: 8,
    type: "code",
    tag: "Na prática",
    title: "Seu primeiro Server Component",
    codeLabel: "src/app/page.tsx",
    tip: "Este componente busca dados no servidor. O HTML já chega preenchido — zero loading spinner, zero JS desnecessário.",
    code: `// Sem 'use client' = Server Component por padrão

async function getProdutos() {
  // Roda no SERVIDOR — pode acessar banco, segredos, APIs internas
  const res = await fetch('https://api.exemplo.com/produtos', {
    next: { revalidate: 60 }, // revalida cache a cada 60s
  });
  return res.json();
}

export default async function PaginaInicial() {
  const produtos = await getProdutos(); // await direto no componente!

  return (
    <main>
      <h1>Produtos ({produtos.length})</h1>
      <ul>
        {produtos.map((p) => (
          <li key={p.id}>{p.nome}</li>
        ))}
      </ul>
    </main>
  );
}`,
  },
  {
    id: 9,
    type: "best-practices",
    tag: "Boas Práticas",
    title: "O que todo dev Next.js faz",
    items: [
      { icon: "📁", text: "Organiza código por feature (/features/produtos), não por tipo (/components, /hooks)." },
      { icon: "🖥️", text: "Prefere Server Components — menos JS enviado = mais velocidade e melhor SEO." },
      { icon: "🔒", text: "Nunca expõe segredos no cliente. NEXT_PUBLIC_ só para o que realmente precisa ser público." },
      { icon: "🖼️", text: "Usa <Image> do Next.js — lazy loading, WebP automático, sem layout shift." },
      { icon: "🔗", text: "Usa <Link> do Next.js — prefetch automático, navegação sem reload de página." },
      { icon: "📊", text: "Usa Metadata API para SEO em vez de tags meta manuais (mais simples e correto)." },
    ],
  },
  {
    id: 10,
    type: "mini-challenge",
    tag: "🎯 Missão 01",
    title: "AQUECIMENTO",
    subtitle: "Crie seu primeiro projeto Next.js do zero",
    tasks: [
      "Crie um projeto: npx create-next-app@latest meu-app",
      "Explore a estrutura de pastas gerada automaticamente",
      "Identifique layout.tsx e page.tsx na pasta /app",
      "Altere o título via Metadata API (export const metadata)",
      "Crie a rota /sobre com uma página simples",
      "Use <Link> para navegar entre / e /sobre",
    ],
    bonus: [
      "Adicione uma imagem usando o componente <Image>",
      "Troque o conteúdo do rodapé pelo seu nome e stack",
    ],
    nextHref: "/modulos/nextjs/aula-02",
    nextLabel: "Aula 02: Roteamento →",
  },
];
