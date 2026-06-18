export type ModuleId =
  | "nextjs"
  | "componentes"
  | "tailwind"
  | "apis"
  | "roteamento"
  | "redux"
  | "backend"
  | "auth";

export interface ModuleConfig {
  id: ModuleId;
  visible: boolean;
}

export interface ModulesVisibility {
  nextjs: boolean;
  componentes: boolean;
  tailwind: boolean;
  apis: boolean;
  roteamento: boolean;
  redux: boolean;
  backend: boolean;
  auth: boolean;
}

export const DEFAULT_VISIBILITY: ModulesVisibility = {
  nextjs: true,
  componentes: false,
  tailwind: false,
  apis: false,
  roteamento: false,
  redux: false,
  backend: true,
  auth: false,
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
    id: "nextjs",
    order: 0,
    label: "Módulo 01",
    title: "Next.js Fundamentos",
    desc: "Entenda a arquitetura, o funcionamento e os principais arquivos do Next.js. Boas práticas e criação do primeiro sistema no primeiro desafio.",
    icon: "⚡",
    tag: "fundamentos",
    atividades: [
      "Aula 01 — Introdução ao Next.js (10 slides)",
      "Aula 02 — App Router & Roteamento (11 slides)",
      "Aula 03 — Server vs Client Components (11 slides)",
      "Aula 04 — Layouts, Loading & Error (11 slides)",
      "Desafio Final — TechBlog completo",
    ],
    href: "/modulos/nextjs",
  },
  {
    id: "componentes",
    order: 1,
    label: "Módulo 02",
    title: "Componentes React",
    desc: "Criação de componentes reutilizáveis, props, composição, hooks essenciais e Context API.",
    icon: "🧩",
    tag: "react",
    atividades: ["useState e useEffect na prática", "Context API e composição"],
    href: "#",
  },
  {
    id: "tailwind",
    order: 2,
    label: "Módulo 03",
    title: "Tailwind CSS",
    desc: "Utility-first CSS: responsividade, dark mode, animações e criação de um design system com Tailwind.",
    icon: "🎨",
    tag: "estilização",
    atividades: ["Classes utilitárias e responsividade", "Design system com Tailwind"],
    href: "#",
  },
  {
    id: "apis",
    order: 3,
    label: "Módulo 04",
    title: "APIs REST & Microserviços",
    desc: "Consumo de APIs externas com Fetch e Axios, TanStack Query para cache, e introdução a arquitetura de microserviços.",
    icon: "🔌",
    tag: "integração",
    atividades: ["Fetch e Axios com TypeScript", "TanStack Query na prática", "Introdução a Microserviços"],
    href: "#",
  },
  {
    id: "roteamento",
    order: 4,
    label: "Módulo 05",
    title: "App Router & APIs Internas",
    desc: "Next.js App Router, Server Components, Route Handlers e criação de APIs REST internas.",
    icon: "🗺️",
    tag: "roteamento",
    atividades: ["Server vs Client Components", "API Routes na prática"],
    href: "#",
  },
  {
    id: "redux",
    order: 5,
    label: "Módulo 06",
    title: "Gerenciamento de Estado",
    desc: "Zustand para estado simples, Redux Toolkit para estado complexo. Padrões avançados de estado global.",
    icon: "🔄",
    tag: "estado",
    atividades: ["Zustand do zero", "Redux Toolkit na prática"],
    href: "#",
  },
  {
    id: "backend",
    order: 6,
    label: "Módulo 07",
    title: "Backend com Firebase",
    desc: "Firebase Firestore em projetos Next.js. Arquitetura em camadas, CRUD completo e sistema acadêmico real.",
    icon: "🔥",
    tag: "avançado",
    atividades: ["Configurar Firestore", "Cadastro em camadas", "Sistema Acadêmico completo"],
    href: "/modulos/backend",
    isAdvanced: true,
  },
  {
    id: "auth",
    order: 7,
    label: "Módulo 08",
    title: "Autenticação & Segurança",
    desc: "Firebase Auth, NextAuth.js, proteção de rotas, middleware e boas práticas de segurança.",
    icon: "🔐",
    tag: "segurança",
    atividades: ["Login com Firebase Auth", "Rotas protegidas com middleware"],
    href: "#",
    isAdvanced: true,
  },
];
