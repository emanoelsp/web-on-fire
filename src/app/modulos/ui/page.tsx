import ModuleLanding, { type LandingGroup } from "@/components/ModuleLanding";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Módulo 03 — Estilização Avançada, Design System e UI · Web On Fire Academy",
};

const groups: LandingGroup[] = [
  {
    label: "Aula 09",
    title: "Tailwind CSS e Design Responsivo",
    desc: "Utility-first, mobile first, espaçamento, tipografia e dark mode.",
    items: [
      {
        slug: "ui-tailwind",
        num: "09",
        title: "Tailwind CSS & Responsivo",
        desc: "Paradigma utility-first, breakpoints mobile first, dark mode e design tokens.",
        href: "/modulos/ui/tailwind",
        icon: "🎨",
        duration: "~45 min",
        slides: 11,
      },
    ],
  },
  {
    label: "Aula 10",
    title: "Componentização e Padronização",
    desc: "Organização de componentes, clsx, tailwind-merge e ícones Lucide.",
    items: [
      {
        slug: "ui-componentes",
        num: "10",
        title: "Componentização & cn()",
        desc: "Componentes com variantes, o helper cn(), resolução de conflitos e Lucide React.",
        href: "/modulos/ui/componentes",
        icon: "🧩",
        duration: "~40 min",
        slides: 11,
      },
    ],
  },
  {
    label: "Aula 11",
    title: "Headless UI e Shadcn/UI",
    desc: "Componentes acessíveis e não estilizados, e o modelo copy-paste do Shadcn.",
    items: [
      {
        slug: "ui-shadcn",
        num: "11",
        title: "Headless UI & Shadcn/UI",
        desc: "Radix, acessibilidade de fábrica, e componentes que viram código seu: formulários, botões e modais.",
        href: "/modulos/ui/shadcn",
        icon: "♿",
        duration: "~40 min",
        slides: 11,
      },
    ],
  },
  {
    label: "Aula 12",
    title: "Micro-interações e Feedback",
    desc: "Sonner (toasts), SweetAlert2 (alertas críticos) e React Confetti.",
    items: [
      {
        slug: "ui-microinteracoes",
        num: "12",
        title: "Micro-interações & Feedback",
        desc: "O espectro do feedback: toast discreto, modal bloqueante e celebração visual.",
        href: "/modulos/ui/microinteracoes",
        icon: "🎉",
        duration: "~40 min",
        slides: 11,
      },
    ],
  },
  {
    label: "Aula 13",
    title: "Visualização de Dados para Dashboards",
    desc: "Painéis administrativos com Tremor: barras, linhas, roscas e métricas.",
    items: [
      {
        slug: "ui-dashboards",
        num: "13",
        title: "Dados em Dashboards (Tremor)",
        desc: "KPIs, BarChart, DonutChart e a integração Server busca → Client desenha.",
        href: "/modulos/ui/dashboards",
        icon: "📊",
        duration: "~40 min",
        slides: 11,
      },
    ],
  },
  {
    label: "Fechamento",
    title: "Desafio Final do Módulo",
    desc: "Um painel admin completo cobrando tudo: Tailwind, componentes, Shadcn, feedback e gráficos.",
    items: [
      {
        slug: "ui-desafio",
        num: "🏆",
        title: "Desafio — Painel On Fire",
        desc: "Construa o painel administrativo da Academy: responsivo, com dark mode, componentes, gráficos e micro-interações.",
        href: "/modulos/ui/desafio",
        icon: "🏆",
        duration: "~120 min",
        slides: null,
        challenge: true,
      },
    ],
  },
];

export default function UIModulePage() {
  return (
    <ModuleLanding
      moduleTag="módulo 03"
      badge="🎨 Módulo 03 — Aulas 09 a 13"
      titleTop="ESTILIZAÇÃO,"
      titleBottom="DESIGN SYSTEM & UI"
      description="A construção da camada visual da aplicação: o paradigma utility-first do Tailwind, um design system de componentes, integração com o ecossistema moderno (Shadcn, Lucide, Tremor) e micro-interações que dão vida à interface."
      ctaHref="/modulos/ui/tailwind"
      ctaLabel="Começar pela Aula 09"
      stats={[
        { value: "5", label: "Aulas", fire: true },
        { value: "55", label: "Slides" },
        { value: "~4h", label: "de conteúdo" },
        { value: "1", label: "Desafio final" },
      ]}
      tags={["Tailwind v4", "Shadcn/UI", "Tremor"]}
      groups={groups}
      trilhaHint="Cada aula fecha com uma missão prática — e o módulo termina com o Painel On Fire 🏆"
    />
  );
}
