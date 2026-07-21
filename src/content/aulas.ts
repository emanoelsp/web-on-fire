import type { ModuleId } from "@/types/modules";

export interface AulaMeta {
  /** slug único usado em progresso, badges e locks */
  slug: string;
  moduleId: ModuleId;
  title: string;
  href: string;
  icon: string;
}

/** Registro central de todas as aulas com conteúdo publicado. */
export const ALL_AULAS: AulaMeta[] = [
  // Módulo 01 — Infraestrutura e Nivelamento Tecnológico
  { slug: "infra-node-1",     moduleId: "infra", title: "Aula 01 · P1 — O que é Node.js",         href: "/modulos/infra/node-1",     icon: "🟢" },
  { slug: "infra-node-2",     moduleId: "infra", title: "Aula 01 · P2 — Como o Node funciona",    href: "/modulos/infra/node-2",     icon: "⚡" },
  { slug: "infra-node-3",     moduleId: "infra", title: "Aula 01 · P3 — Node no mundo real",      href: "/modulos/infra/node-3",     icon: "🌍" },
  { slug: "infra-typescript", moduleId: "infra", title: "Aula 02 — Tipagem Estática (TypeScript)", href: "/modulos/infra/typescript", icon: "🛡️" },
  { slug: "infra-git",        moduleId: "infra", title: "Aula 03 — Git & GitHub",                 href: "/modulos/infra/git",        icon: "⏳" },

  // Módulo 02 — Arquitetura Core do Next.js
  { slug: "nextjs-intro",         moduleId: "nextjs", title: "Aula 04 · P1 — Fundações do Next.js",     href: "/modulos/nextjs/intro",         icon: "⚡" },
  { slug: "nextjs-aula-03",       moduleId: "nextjs", title: "Aula 04 · P2 — Server vs Client",         href: "/modulos/nextjs/aula-03",       icon: "⚙️" },
  { slug: "nextjs-aula-02",       moduleId: "nextjs", title: "Aula 05 — Roteamento e Navegação",        href: "/modulos/nextjs/aula-02",       icon: "🗺️" },
  { slug: "nextjs-data-fetching", moduleId: "nextjs", title: "Aula 06 — Data Fetching e Mock Data",     href: "/modulos/nextjs/data-fetching", icon: "💾" },
  { slug: "nextjs-otimizacoes",   moduleId: "nextjs", title: "Aula 07 — Otimizações e Lazy Loading",    href: "/modulos/nextjs/otimizacoes",   icon: "🚀" },
  { slug: "nextjs-aula-04",       moduleId: "nextjs", title: "Aula 08 — UX Estrutural e Erros",         href: "/modulos/nextjs/aula-04",       icon: "🎨" },
  { slug: "nextjs-desafio",       moduleId: "nextjs", title: "Desafio Final — TechBlog",               href: "/modulos/nextjs/desafio",       icon: "🏆" },

  // Módulo 03 — Estilização Avançada, Design System e UI
  { slug: "ui-tailwind",         moduleId: "ui", title: "Aula 09 — Tailwind CSS e Responsivo",   href: "/modulos/ui/tailwind",         icon: "🎨" },
  { slug: "ui-componentes",      moduleId: "ui", title: "Aula 10 — Componentização",             href: "/modulos/ui/componentes",      icon: "🧩" },
  { slug: "ui-shadcn",           moduleId: "ui", title: "Aula 11 — Headless UI e Shadcn/UI",     href: "/modulos/ui/shadcn",           icon: "♿" },
  { slug: "ui-microinteracoes",  moduleId: "ui", title: "Aula 12 — Micro-interações",            href: "/modulos/ui/microinteracoes",  icon: "🎉" },
  { slug: "ui-dashboards",       moduleId: "ui", title: "Aula 13 — Dados em Dashboards",         href: "/modulos/ui/dashboards",       icon: "📊" },
  { slug: "ui-desafio",          moduleId: "ui", title: "Desafio Final — Painel On Fire",        href: "/modulos/ui/desafio",          icon: "🏆" },

  // Módulo 04 — Persistência de Dados e Backend as a Service
  { slug: "dados-auth",              moduleId: "dados", title: "Aula 14 — Identidade e Segurança",       href: "/modulos/dados/auth",              icon: "🔐" },
  { slug: "dados-firestore-leitura", moduleId: "dados", title: "Aula 15 — Firestore (Leitura)",          href: "/modulos/dados/firestore-leitura", icon: "🗄️" },
  { slug: "dados-firestore-escrita", moduleId: "dados", title: "Aula 16 — Firestore (Escrita)",          href: "/modulos/dados/firestore-escrita", icon: "✍️" },
  { slug: "dados-server-actions",    moduleId: "dados", title: "Aula 17 — Server Actions",               href: "/modulos/dados/server-actions",    icon: "⚙️" },
  { slug: "dados-deploy",            moduleId: "dados", title: "Aula 18 — Deploy e Entrega",             href: "/modulos/dados/deploy",            icon: "🚀" },
  { slug: "dados-desafio",           moduleId: "dados", title: "Desafio Final — Software Entregue",      href: "/modulos/dados/desafio",           icon: "🏆" },

  // Módulo 05 — Laboratório Sistema Acadêmico
  { slug: "backend-aula-81", moduleId: "backend", title: "Aula 8.1 — Firebase Config", href: "/modulos/backend/aula-71", icon: "🔥" },
  { slug: "backend-aula-82", moduleId: "backend", title: "Aula 8.2 — Cadastro",        href: "/modulos/backend/aula-72", icon: "🔥" },
  { slug: "backend-aula-83", moduleId: "backend", title: "Aula 8.3 — Update + Delete", href: "/modulos/backend/aula-73", icon: "🔥" },
];

export function getAulasByModule(moduleId: ModuleId): AulaMeta[] {
  return ALL_AULAS.filter((a) => a.moduleId === moduleId);
}

export function getAula(slug: string): AulaMeta | undefined {
  return ALL_AULAS.find((a) => a.slug === slug);
}
