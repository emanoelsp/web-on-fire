import ModuleChallenge, { type ChallengeSection } from "@/components/ModuleChallenge";

export const metadata = {
  title: "Desafio Final — Estilização & UI · Web On Fire Academy",
};

const sections: ChallengeSection[] = [
  {
    section: "Setup e Design System",
    icon: "🎨",
    tasks: [
      { id: "s1", text: "Projeto Next.js + Tailwind com dark mode configurado (variante dark:)" },
      { id: "s2", text: "Helper cn() em lib/utils.ts (clsx + tailwind-merge)" },
      { id: "s3", text: "Componentes base em components/ui: Button (com variantes), Card e Badge" },
      { id: "s4", text: "Ícones do Lucide React integrados aos botões e à navegação" },
    ],
  },
  {
    section: "Tela: Painel Admin da Academy",
    icon: "📊",
    tasks: [
      { id: "s5", text: "Layout responsivo mobile-first: 1 coluna no celular, grid de 3 no desktop" },
      { id: "s6", text: "3 cards de KPI com Tremor (alunos, XP médio, conclusão) usando mock data" },
      { id: "s7", text: "Um BarChart (acessos por semana) e um DonutChart (alunos por nível)" },
      { id: "s8", text: "Uma tabela/lista de alunos usando os componentes de UI padronizados" },
    ],
  },
  {
    section: "Componentes acessíveis (Shadcn)",
    icon: "🧩",
    tasks: [
      { id: "s9", text: "Modal de confirmação (Dialog do Shadcn) ao 'excluir' um aluno" },
      { id: "s10", text: "Formulário de novo aluno com Input e Button do Shadcn" },
      { id: "s11", text: "Acessibilidade verificada: modal fecha no Esc e navega com Tab" },
    ],
  },
  {
    section: "Micro-interações e Feedback",
    icon: "✨",
    tasks: [
      { id: "s12", text: "Sonner: toast.success ao salvar, toast.error ao falhar" },
      { id: "s13", text: "SweetAlert2: confirmação bloqueante antes de excluir" },
      { id: "s14", text: "React Confetti: celebração ao concluir o cadastro de um aluno" },
    ],
  },
];

const bonus = [
  { id: "b1", text: "Persistir o tema (claro/escuro) no localStorage e reaplicar no reload" },
  { id: "b2", text: "Agregar os dados dos gráficos com reduce a partir de uma lista crua" },
  { id: "b3", text: "Validação do formulário com React Hook Form + Zod (Form do Shadcn)" },
  { id: "b4", text: "toast.promise numa operação assíncrona (loading → success/error)" },
];

const criteria = [
  "O layout responde corretamente em mobile, tablet e desktop",
  "Dark mode funciona em toda a interface (fundos, textos, bordas)",
  "Componentes de UI são reutilizados (sem copy-paste de classes)",
  "Os gráficos do Tremor renderizam com os dados corretos",
  "O modal do Shadcn é acessível (teclado + foco preso)",
  "Cada feedback combina com a gravidade da ação (toast x modal x confete)",
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
      subtitle="Construa o painel administrativo completo da Academy — bonito, responsivo, acessível e cheio de vida."
      intro="Este desafio junta tudo do módulo: Tailwind responsivo, design system com componentes reutilizáveis, Shadcn/UI, micro-interações e gráficos com Tremor. Marque cada item conforme conclui — ao completar todos, o módulo é registrado no seu progresso."
      sections={sections}
      bonus={bonus}
      criteria={criteria}
      xp={120}
    />
  );
}
