export type ModuleId =
  | "infra"
  | "nextjs"
  | "ui"
  | "dados"
  | "backend";

export interface ModuleConfig {
  id: ModuleId;
  visible: boolean;
}

export interface ModulesVisibility {
  infra: boolean;
  nextjs: boolean;
  ui: boolean;
  dados: boolean;
  backend: boolean;
}

export const DEFAULT_VISIBILITY: ModulesVisibility = {
  infra: true,
  nextjs: true,
  ui: true,
  dados: true,
  backend: true,
};

export interface ModuleMeta {
  id: ModuleId;
  order: number;
  label: string;
  title: string;
  desc: string;
  icon: string;
  tag: string;
  atividades: string[];
  href: string;
  isAdvanced?: boolean;
}

export const ALL_MODULES: ModuleMeta[] = [
  {
    id: "infra",
    order: 0,
    label: "Módulo 01",
    title: "Infraestrutura e Nivelamento Tecnológico",
    desc: "As fundações do ecossistema JavaScript/TypeScript e as práticas de engenharia para o trabalho colaborativo: Node.js, tipagem estática e versionamento com Git.",
    icon: "🏗️",
    tag: "fundamentos",
    atividades: [
      "Aula 01 — Fundamentos de Node.js e Ecossistema (3 partes)",
      "Aula 02 — Tipagem Estática para Web (TypeScript)",
      "Aula 03 — Controle de Versão (Git & GitHub)",
    ],
    href: "/modulos/infra",
  },
  {
    id: "nextjs",
    order: 1,
    label: "Módulo 02",
    title: "Arquitetura Core do Next.js",
    desc: "Imersão nas funcionalidades nativas do framework: renderização (RSC), roteamento, data fetching, otimizações e UX estrutural — sem bibliotecas visuais externas.",
    icon: "⚡",
    tag: "fundamentos",
    atividades: [
      "Aula 04 — Fundações do Next.js (App Router)",
      "Aula 05 — Roteamento e Navegação Nativa",
      "Aula 06 — Data Fetching e Mock Data",
      "Aula 07 — Otimizações e Lazy Loading",
      "Aula 08 — UX Estrutural e Exceções",
      "Desafio Final — TechBlog completo",
    ],
    href: "/modulos/nextjs",
  },
  {
    id: "ui",
    order: 2,
    label: "Módulo 03",
    title: "Estilização Avançada, Design System e UI",
    desc: "A camada visual da aplicação com o paradigma utility-first: Tailwind, design system de componentes, Shadcn/UI, micro-interações e visualização de dados.",
    icon: "🎨",
    tag: "interface",
    atividades: [
      "Aula 09 — Tailwind CSS e Design Responsivo",
      "Aula 10 — Componentização e Padronização",
      "Aula 11 — Headless UI e Shadcn/UI",
      "Aula 12 — Micro-interações e Feedback",
      "Aula 13 — Visualização de Dados (Tremor)",
      "Desafio Final — Painel On Fire",
    ],
    href: "/modulos/ui",
  },
  {
    id: "dados",
    order: 3,
    label: "Módulo 04",
    title: "Persistência de Dados e Backend as a Service",
    desc: "Integração com o Firebase e mutações modernas, culminando na entrega do software: autenticação, Firestore (leitura e escrita), Server Actions e deploy.",
    icon: "🔥",
    tag: "backend",
    atividades: [
      "Aula 14 — Identidade e Segurança (Firebase Auth)",
      "Aula 15 — Firestore (Leitura e Modelagem)",
      "Aula 16 — Firestore (Escrita e Mutações)",
      "Aula 17 — Server Actions",
      "Aula 18 — Deploy e Entrega na Vercel",
      "Desafio Final — Software Entregue",
    ],
    href: "/modulos/dados",
    isAdvanced: true,
  },
  {
    id: "backend",
    order: 4,
    label: "Módulo 05",
    title: "Laboratório — Sistema Acadêmico com Firestore",
    desc: "Projeto guiado ponta a ponta: arquitetura em camadas, CRUD completo e um sistema acadêmico real construído com Next.js e Firestore.",
    icon: "🧪",
    tag: "projeto",
    atividades: [
      "Aula 8.1 — Firebase Config",
      "Aula 8.2 — Cadastro em camadas",
      "Aula 8.3 — Update + Delete (CRUD completo)",
    ],
    href: "/modulos/backend",
    isAdvanced: true,
  },
];
