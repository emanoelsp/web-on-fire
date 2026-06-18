import type { Slide } from "@/types/slides";

export const AULA04_SLIDES: Slide[] = [
  {
    id: 1,
    type: "cover",
    tag: "Aula 04",
    title: "LAYOUTS\nLOADING\n& ERROR",
    subtitle: "A UX profissional começa aqui.",
  },
  {
    id: 2,
    type: "concept",
    tag: "layout.tsx",
    title: "O que é um layout?",
    items: [
      { icon: "🏗️", text: "layout.tsx envolve todas as páginas da mesma pasta e subpastas." },
      { icon: "⚡", text: "Persiste entre navegações — não re-renderiza ao trocar de página dentro da mesma rota." },
      { icon: "🎯", text: "Ideal para: Header, Footer, Sidebar, Providers, SessionProvider, ThemeProvider." },
      { icon: "🔁", text: "Pode ser aninhado: RootLayout → DashboardLayout → SettingsLayout." },
    ],
    tip: "O RootLayout (src/app/layout.tsx) é obrigatório e deve ter as tags <html> e <body>.",
  },
  {
    id: 3,
    type: "code",
    tag: "Na prática",
    title: "Layout com providers",
    codeLabel: "src/app/layout.tsx",
    code: `import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/providers/ThemeProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: { default: "Meu App", template: "%s · Meu App" },
  description: "Descrição padrão do app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body>
        <ThemeProvider>      {/* Provider global */}
          <Header />          {/* Persiste em todas as páginas */}
          <main>{children}</main>  {/* page.tsx aparece aqui */}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}`,
  },
  {
    id: 4,
    type: "code",
    tag: "Layout aninhado",
    title: "Layout exclusivo por seção",
    codeLabel: "src/app/dashboard/layout.tsx",
    tip: "Layouts aninhados são cumulativos: /dashboard/settings usa RootLayout + DashboardLayout ao mesmo tempo.",
    code: `// Esse layout só aparece em /dashboard/*
// src/app/dashboard/layout.tsx

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar só aparece no dashboard */}
      <aside style={{ width: "260px", borderRight: "1px solid #eee" }}>
        <nav>
          <Link href="/dashboard">Visão Geral</Link>
          <Link href="/dashboard/alunos">Alunos</Link>
          <Link href="/dashboard/cursos">Cursos</Link>
        </nav>
      </aside>

      {/* Conteúdo de cada page.tsx aparece aqui */}
      <main style={{ flex: 1, padding: "2rem" }}>
        {children}
      </main>
    </div>
  );
}`,
  },
  {
    id: 5,
    type: "concept",
    tag: "loading.tsx",
    title: "Loading automático com Suspense",
    items: [
      { icon: "⏳", text: "loading.tsx é exibido automaticamente enquanto a page.tsx está carregando." },
      { icon: "✨", text: "O Next.js embrulha a página em um <Suspense> automaticamente — você não precisa fazer nada." },
      { icon: "🎨", text: "Use para criar skeletons, spinners, ou qualquer UI de loading." },
      { icon: "🏗️", text: "O layout e a navegação aparecem imediatamente — só o conteúdo fica pendente." },
    ],
    tip: "Com loading.tsx, o usuário nunca vê uma tela em branco. A navbar e o layout aparecem de imediato.",
  },
  {
    id: 6,
    type: "code",
    tag: "loading.tsx",
    title: "Skeleton de loading",
    codeLabel: "src/app/produtos/loading.tsx",
    code: `// Exibido AUTOMATICAMENTE enquanto page.tsx carrega
// Não precisa de 'use client' — é Server Component

export default function Loading() {
  return (
    <div>
      <h1 style={{ color: "transparent", background: "#e5e7eb",
                   borderRadius: "8px", width: "200px" }}>
        &nbsp;
      </h1>

      {/* Skeleton cards */}
      {[1, 2, 3].map((i) => (
        <div key={i} style={{
          height: "120px",
          background: "#f3f4f6",
          borderRadius: "12px",
          marginBottom: "1rem",
          animation: "pulse 2s infinite",
        }} />
      ))}
    </div>
  );
}

// Você também pode usar Suspense manual para partes da página:
// <Suspense fallback={<Loading />}>
//   <ComponenteLento />
// </Suspense>`,
  },
  {
    id: 7,
    type: "concept",
    tag: "error.tsx",
    title: "Error Boundary automático",
    items: [
      { icon: "🛡️", text: "error.tsx captura erros de renderização em Server e Client Components automaticamente." },
      { icon: "🔁", text: "Recebe a prop reset() — permite o usuário tentar novamente sem recarregar a página." },
      { icon: "⚠️", text: "Deve ser um Client Component (precisa de interatividade para o botão de retry)." },
      { icon: "📍", text: "Cada pasta pode ter seu próprio error.tsx — o erro é capturado no nível mais próximo." },
    ],
    tip: "error.tsx não captura erros no próprio layout.tsx — para isso, use o global-error.tsx na raiz do /app.",
  },
  {
    id: 8,
    type: "code",
    tag: "error.tsx",
    title: "Error boundary na prática",
    codeLabel: "src/app/produtos/error.tsx",
    code: `"use client"; // obrigatório — precisa do botão onClick

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;  // retry automático do Next.js
}) {
  useEffect(() => {
    // Log para serviço de monitoramento (Sentry, etc.)
    console.error("Erro na rota /produtos:", error);
  }, [error]);

  return (
    <div style={{ textAlign: "center", padding: "4rem" }}>
      <h2>Algo deu errado!</h2>
      <p style={{ color: "#666", marginBottom: "1.5rem" }}>
        {error.message ?? "Erro inesperado. Tente novamente."}
      </p>
      <button onClick={reset}>
        Tentar novamente
      </button>
    </div>
  );
}`,
  },
  {
    id: 9,
    type: "concept",
    tag: "Metadata API",
    title: "SEO sem esforço",
    items: [
      { icon: "📊", text: "Metadata API substitui tags <meta> manuais — mais simples, TypeScript, e automático." },
      { icon: "🔒", text: "Static: export const metadata = { title: 'Produtos' } — definido em build time." },
      { icon: "⚡", text: "Dynamic: generateMetadata({ params }) — calculado com dados reais em runtime." },
      { icon: "🌐", text: "Suporta: title, description, openGraph, twitter, robots, canonical, e muito mais." },
    ],
    tip: "Use o template do title: { default: 'App', template: '%s · App' } para automatizar o formato de todos os títulos.",
  },
  {
    id: 10,
    type: "code",
    tag: "Metadata",
    title: "Metadata estática e dinâmica",
    codeLabel: "src/app/produtos/[id]/page.tsx",
    code: `import type { Metadata } from "next";

// Metadata DINÂMICA — gerada com dados reais
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const produto = await fetch(\`/api/produtos/\${id}\`).then(r => r.json());

  return {
    title: produto.nome,  // template do RootLayout é aplicado aqui
    description: produto.descricao,
    openGraph: {
      title: produto.nome,
      description: produto.descricao,
      images: [{ url: produto.imagem, width: 1200, height: 630 }],
    },
    // SEO avançado
    alternates: { canonical: \`https://seusite.com/produtos/\${id}\` },
  };
}

export default async function ProdutoPage({ params }) {
  // ...mesma página, a metadata é gerada separadamente
}`,
  },
  {
    id: 11,
    type: "mini-challenge",
    tag: "🎯 Missão 04",
    title: "UX\nCOMPLETA",
    subtitle: "Implemente a experiência de usuário profissional",
    tasks: [
      "Crie um /dashboard/layout.tsx com sidebar de navegação",
      "Adicione /dashboard/loading.tsx com skeleton de cards",
      "Adicione /dashboard/error.tsx com botão 'Tentar novamente'",
      "Crie /dashboard/not-found.tsx personalizado",
      "Adicione metadata estática com título e description",
    ],
    bonus: [
      "Gere metadata dinâmica para /dashboard/alunos/[id]",
      "Use Suspense granular para carregar partes da página independentemente",
      "Adicione openGraph para compartilhamento em redes sociais",
    ],
    nextHref: "/modulos/nextjs/desafio",
    nextLabel: "🏆 Desafio Final →",
  },
];
