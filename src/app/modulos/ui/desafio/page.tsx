import ModuleChallenge, { type ChallengeSection } from "@/components/ModuleChallenge";

export const metadata = {
  title: "Desafio Final — Painel On Fire · Web On Fire Academy",
};

const quickstart = [
  {
    label: "1. Projeto base com Tailwind",
    code: `npx create-next-app@latest painel-on-fire --ts --tailwind --app
cd painel-on-fire`,
    note: "Já pode reaproveitar um projeto existente. O importante é Next (App Router) + Tailwind v4.",
  },
  {
    label: "2. Instale o toolkit do módulo",
    code: `npm install clsx tailwind-merge lucide-react sonner sweetalert2 canvas-confetti recharts`,
    note: "Mesmas libs das aulas. (Usamos recharts no lugar do Tremor: o projeto é React 19 + Tailwind v4.)",
  },
  {
    label: "3. Shadcn + componentes acessíveis",
    code: `npx shadcn@latest init
npx shadcn@latest add button input dialog dropdown-menu switch`,
    note: "O init cria/atualiza o lib/utils.ts com o cn(). Cada 'add' vira um arquivo seu em components/ui/.",
  },
  {
    label: "4. Monte o feedback global",
    code: `// app/layout.tsx
import { Toaster } from "sonner";
// dentro do <body>:
<Toaster theme="dark" richColors position="bottom-right" />`,
    note: "O <Toaster /> vai UMA vez no layout raiz; o toast() você chama de qualquer Client Component.",
  },
];

const sections: ChallengeSection[] = [
  {
    section: "Estágio 1 · Fundação (Tailwind)",
    icon: "🎨",
    tasks: [
      { id: "s1", text: "Dark mode configurado (variante dark:) e paleta zinc/orange do projeto" },
      { id: "s2", text: "Hero da 'Central On Fire': título em gradiente (bg-clip-text), subtítulo e 2 botões" },
      { id: "s3", text: "Botões com bordas, sombra, hover (-translate-y, brightness) e active:scale — tudo Tailwind" },
      { id: "s4", text: "Layout mobile-first: empilhado no celular, grid a partir de md/lg" },
    ],
  },
  {
    section: "Estágio 2 · Design System (Componentes + Ícones)",
    icon: "🧩",
    tasks: [
      { id: "s5", text: "Helper cn() em lib/utils.ts (clsx + tailwind-merge)" },
      { id: "s6", text: "components/ui: Button (variantes primary/secondary/outline/ghost + tamanhos), Card e Badge" },
      { id: "s7", text: "Ícones do Lucide integrados aos botões e ao header (com aria-label nos icon-only)" },
      { id: "s8", text: "O CTA principal dispara um toast.success ao ser clicado" },
    ],
  },
  {
    section: "Estágio 3 · Acessível (Headless / Shadcn)",
    icon: "♿",
    tasks: [
      { id: "s9", text: "Header com menu de usuário (DropdownMenu) e um Switch de preferência" },
      { id: "s10", text: "Modal de login (Dialog) com Input e Button do Shadcn" },
      { id: "s11", text: "Modal de confirmação ao 'excluir/sair' — foco preso, fecha no Esc, navega por Tab" },
    ],
  },
  {
    section: "Estágio 4 · Micro-interações (Feedback)",
    icon: "✨",
    tasks: [
      { id: "s12", text: "Sonner: toast.promise numa operação async (loading → success/error)" },
      { id: "s13", text: "SweetAlert2: confirmação bloqueante antes de uma ação destrutiva" },
      { id: "s14", text: "canvas-confetti: celebração (paleta fire) ao concluir uma missão/cadastro" },
    ],
  },
  {
    section: "Estágio 5 · Painel de Dados (recharts)",
    icon: "📊",
    tasks: [
      { id: "s15", text: "3 cards de KPI (alunos, XP médio, taxa de conclusão) com tendência (TrendingUp/Down)" },
      { id: "s16", text: "BarChart (acessos por semana) e AreaChart (evolução) dentro de ResponsiveContainer" },
      { id: "s17", text: "DonutChart (alunos por nível) com uma cor por fatia (Cell + paleta fire)" },
      { id: "s18", text: "Dados buscados/agregados num Server Component e passados prontos para o Client desenhar" },
    ],
  },
];

const bonus = [
  { id: "b1", text: "Persistir o tema (claro/escuro) no localStorage e reaplicar no reload" },
  { id: "b2", text: "Agregar os dados dos gráficos com reduce a partir de uma lista crua de alunos" },
  { id: "b3", text: "Validação do formulário de login/cadastro com React Hook Form + Zod" },
  { id: "b4", text: "Ao concluir a missão, disparar confete E toast.success juntos" },
  { id: "b5", text: "Degradê 'fire' sob o AreaChart usando um <linearGradient> no <defs>" },
];

const criteria = [
  "O layout responde corretamente em mobile, tablet e desktop (mobile-first)",
  "Dark mode funciona em toda a interface (fundos, textos, bordas)",
  "Componentes de UI são reutilizados via cn() — sem copy-paste de classes",
  "O modal (Radix/Shadcn) é acessível: teclado, foco preso e Esc",
  "Cada feedback combina com a gravidade da ação (toast x modal x confete)",
  "Os gráficos do recharts renderizam com os dados corretos e são responsivos",
  "TypeScript sem erros (npx tsc --noEmit)",
];

export default function DesafioUIPage() {
  return (
    <ModuleChallenge
      aulaSlug="ui-desafio"
      moduleLabel="Módulo 03"
      moduleHref="/modulos/ui"
      moduleName="Estilização & UI"
      title={"PAINEL\nON FIRE"}
      subtitle="Pegue a 'Central On Fire' que nasceu na Aula 01 e leve-a ao painel administrativo completo da Academy."
      intro="Este desafio é a soma do módulo, montada estágio a estágio — do primeiro botão em Tailwind ao dashboard com gráficos. Cada seção corresponde a uma aula: construa na ordem e você recria, ao vivo, a mesma página que evoluiu nos slides. Marque cada item conforme conclui — ao completar todos, o módulo é registrado no seu progresso."
      quickstart={quickstart}
      sections={sections}
      bonus={bonus}
      criteria={criteria}
      xp={120}
    />
  );
}
