import ModuleLanding, { type LandingGroup } from "@/components/ModuleLanding";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Módulo 03 — Estilização Avançada, Design System e UI · Web On Fire Academy",
};

const groups: LandingGroup[] = [
  {
    label: "Aula 01",
    title: "Tailwind CSS e Design Responsivo",
    desc: "Um botão nasce do zero e vira fogo: bordas, efeitos, hover e gradientes — ao vivo.",
    items: [
      {
        slug: "ui-tailwind",
        num: "01",
        title: "Tailwind CSS & Responsivo",
        desc: "Estilização incremental com preview ao vivo: botões, links, bordas, efeitos, gradientes, mobile first e dark mode.",
        href: "/modulos/ui/tailwind",
        icon: "🎨",
        duration: "~45 min",
        slides: 16,
      },
    ],
  },
  {
    label: "Aula 02",
    title: "Ícones, Componentes & Feedback",
    desc: "Ícones Lucide reais, um <Button> com variantes e cn(), e a UI respondendo com toast e alertas.",
    items: [
      {
        slug: "ui-componentes",
        num: "02",
        title: "Ícones, Componentes & Feedback",
        desc: "Lucide ao vivo, o helper cn() e variantes clicáveis, mais Sonner (toast) e SweetAlert2 disparando de verdade.",
        href: "/modulos/ui/componentes",
        icon: "🧩",
        duration: "~45 min",
        slides: 15,
      },
    ],
  },
  {
    label: "Aula 03",
    title: "Headless UI e Shadcn/UI",
    desc: "Componentes acessíveis e não estilizados, e o modelo copy-paste do Shadcn.",
    items: [
      {
        slug: "ui-shadcn",
        num: "03",
        title: "Headless UI & Shadcn/UI",
        desc: "Radix ao vivo (modal, dropdown, tooltip, switch, accordion), acessibilidade de fábrica e o modelo copy-paste do Shadcn.",
        href: "/modulos/ui/shadcn",
        icon: "♿",
        duration: "~40 min",
        slides: 13,
      },
    ],
  },
  {
    label: "Aula 04",
    title: "Micro-interações e Feedback",
    desc: "Sonner (toast.promise/custom), SweetAlert2 e canvas-confetti — feedback que dispara ao vivo.",
    items: [
      {
        slug: "ui-microinteracoes",
        num: "04",
        title: "Micro-interações & Feedback",
        desc: "O espectro do feedback ao vivo: toast.promise, toast.custom, alertas SweetAlert e a explosão de confete.",
        href: "/modulos/ui/microinteracoes",
        icon: "🎉",
        duration: "~40 min",
        slides: 11,
      },
    ],
  },
  {
    label: "Aula 05",
    title: "Visualização de Dados para Dashboards",
    desc: "Painéis administrativos com recharts: KPIs, barras, área e rosca — gráficos interativos ao vivo.",
    items: [
      {
        slug: "ui-dashboards",
        num: "05",
        title: "Dados em Dashboards (recharts)",
        desc: "KPIs, BarChart, AreaChart e Donut ao vivo, e a integração Server busca → Client desenha.",
        href: "/modulos/ui/dashboards",
        icon: "📊",
        duration: "~40 min",
        slides: 13,
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
      description="A construção da camada visual da aplicação: o paradigma utility-first do Tailwind, um design system de componentes, integração com o ecossistema moderno (Shadcn, Radix, Lucide, recharts) e micro-interações que dão vida à interface."
      ctaHref="/modulos/ui/tailwind"
      ctaLabel="Começar pela Aula 01"
      stats={[
        { value: "5", label: "Aulas", fire: true },
        { value: "68", label: "Slides" },
        { value: "~4h", label: "de conteúdo" },
        { value: "1", label: "Desafio final" },
      ]}
      tags={["Tailwind v4", "Shadcn/UI", "recharts"]}
      groups={groups}
      trilhaHint="Cada aula fecha com uma missão prática — e o módulo termina com o Painel On Fire 🏆"
    />
  );
}
