import type { Slide } from "@/types/slides";

export const COMPONENTES_SLIDES: Slide[] = [
  {
    id: 1,
    type: "cover",
    tag: "Módulo 03 · Aula 10",
    title: "COMPONENTIZAÇÃO\n& PADRONIZAÇÃO",
    subtitle: "Um botão para governar todos: reutilização, variantes e ícones.",
  },
  {
    id: 2,
    type: "concept",
    tag: "O problema",
    title: "Quando o copy-paste vira dívida",
    items: [
      { icon: "📋", text: "Você copiou o mesmo bloco de classes do botão em 12 lugares. Agora o designer mudou o raio da borda." },
      { icon: "😰", text: "São 12 edições manuais — e você vai esquecer uma. A UI fica inconsistente e o bug nasce." },
      { icon: "🧩", text: "Solução: um componente <Button> único. Muda numa peça, reflete em todo o app." },
      { icon: "🎯", text: "Este é o coração de um Design System: componentes reutilizáveis com variantes previsíveis." },
    ],
  },
  {
    id: 3,
    type: "concept",
    tag: "Organização",
    title: "Onde cada componente mora",
    items: [
      { icon: "🧱", text: "components/ui/ — peças burras e genéricas: Button, Card, Input, Badge. Não sabem nada do seu negócio." },
      { icon: "🏢", text: "components/features/ — peças do domínio: ProdutoCard, CarrinhoResumo. Combinam as peças de ui/." },
      { icon: "🔁", text: "components/shared/ — peças de layout reusadas: Navbar, Footer, Container." },
      { icon: "📐", text: "Regra: se serve para qualquer app, é ui/. Se fala do SEU produto, é feature/." },
    ],
  },
  {
    id: 4,
    type: "code",
    tag: "Componente com variantes",
    title: "Um Button de verdade",
    codeLabel: "components/ui/Button.tsx",
    code: `interface ButtonProps extends React.ComponentProps<"button"> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
}

const variants = {
  primary:   "bg-orange-500 text-white hover:bg-orange-600",
  secondary: "bg-slate-800 text-white hover:bg-slate-700",
  ghost:     "bg-transparent text-slate-300 hover:bg-white/5",
};
const sizes = { sm: "px-3 py-1.5 text-sm", md: "px-5 py-2", lg: "px-7 py-3 text-lg" };

export function Button({ variant = "primary", size = "md", className, ...props }: ButtonProps) {
  return (
    <button
      className={\`rounded-lg font-semibold transition \${variants[variant]} \${sizes[size]} \${className ?? ""}\`}
      {...props}
    />
  );
}`,
    tip: "O ...props repassa tudo (onClick, disabled, type) para o <button> real. O componente vira um <button> turbinado, não uma caixa fechada.",
  },
  {
    id: 5,
    type: "concept",
    tag: "O bug das classes",
    title: "O conflito silencioso do Tailwind",
    items: [
      { icon: "💥", text: 'Problema: className="px-4 px-8" — as duas valem no CSS, e "quem ganha" depende da ordem no arquivo do Tailwind, não do seu código.' },
      { icon: "🎭", text: "Isso explode quando um componente tem px-4 fixo e você passa px-8 por fora esperando sobrescrever." },
      { icon: "🧰", text: "clsx: monta a string de classes condicionalmente (liga/desliga classes com booleanos)." },
      { icon: "🔀", text: "tailwind-merge: resolve o conflito de verdade — o último px- vence, como você espera." },
    ],
  },
  {
    id: 6,
    type: "code",
    tag: "clsx + tailwind-merge",
    title: "O helper cn() que todo projeto tem",
    codeLabel: "lib/utils.ts",
    code: `// npm install clsx tailwind-merge
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// O padrão universal (é o mesmo do Shadcn/UI):
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ── Uso ──────────────────────────────────────────────
cn("px-4 py-2", "px-8")               // → "py-2 px-8"  (px-8 vence!)
cn("text-white", isError && "text-red-500")  // condicional
cn("rounded-lg", className)            // mescla props externas sem conflito

// No Button do slide anterior, troque a template string por:
// className={cn("rounded-lg font-semibold", variants[variant], sizes[size], className)}`,
    tip: "cn() é o helper mais copiado do ecossistema React. Sempre que um componente aceita className por fora, use cn() para mesclar sem brigas.",
  },
  {
    id: 7,
    type: "quiz",
    tag: "Quiz",
    title: "Resolvendo o conflito",
    question: 'Com o helper cn(), qual o resultado de cn("p-2 bg-blue-500", "p-6")?',
    options: [
      {
        text: '"p-2 bg-blue-500 p-6" — mantém os dois p-',
        correct: false,
        explanation: "Isso é o que clsx sozinho faria. O twMerge dentro do cn() remove o conflito.",
      },
      {
        text: '"bg-blue-500 p-6" — o p-6 vence o p-2',
        correct: true,
        explanation: "Exato! tailwind-merge detecta que p-2 e p-6 controlam a mesma coisa e mantém só o último. bg-blue-500 não conflita, então fica.",
      },
      {
        text: '"p-2 bg-blue-500" — o primeiro p- sempre vence',
        correct: false,
        explanation: "Ao contrário: a intenção do cn() é deixar o ÚLTIMO vencer, permitindo sobrescrever via props.",
      },
      {
        text: "Erro — não pode ter dois p- na mesma chamada",
        correct: false,
        explanation: "Pode sim — é justamente para isso que o cn() existe: receber classes conflitantes e resolver.",
      },
    ],
    xp: 15,
  },
  {
    id: 8,
    type: "code",
    tag: "Ícones",
    title: "Lucide React: ícones como componentes",
    codeLabel: "usando-icones.tsx",
    code: `// npm install lucide-react
import { Flame, Github, ChevronRight, Loader2 } from "lucide-react";

// Ícones são componentes: aceitam size, color, className
<Flame size={20} className="text-orange-500" />

<button className="flex items-center gap-2">
  <Github size={18} />
  Entrar com GitHub
  <ChevronRight size={16} />
</button>

// Truque de spinner: qualquer ícone + animate-spin do Tailwind
<Loader2 className="animate-spin" size={24} />`,
    tip: "Lucide tem +1500 ícones com traço consistente. Como são SVG inline, herdam a cor do texto (currentColor) — text-orange-500 pinta o ícone junto.",
  },
  {
    id: 9,
    type: "concept",
    tag: "Boas práticas",
    title: "Anatomia de um bom componente",
    items: [
      { icon: "🎛️", text: "Props com valores padrão: variant = \"primary\" — funciona sem configurar, flexível quando precisa." },
      { icon: "🔌", text: "Estenda o elemento nativo (ComponentProps<\"button\">) e repasse ...props — nunca feche o componente." },
      { icon: "🎨", text: "Aceite className e mescle com cn() — deixe quem usa ajustar sem hackear." },
      { icon: "🧬", text: "Componha, não duplique: um IconButton é um Button + um ícone, não um componente do zero." },
    ],
  },
  {
    id: 10,
    type: "fill-blank",
    tag: "Mão na massa",
    title: "Complete o helper",
    instruction:
      "O famoso helper cn() combina duas bibliotecas. Complete a função que envolve o clsx (digite só o nome da função de merge):",
    prefix: `import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return _________(clsx(inputs));
}`,
    answer: "twMerge",
    hint: "É a função importada do tailwind-merge que resolve os conflitos.",
    xp: 20,
  },
  {
    id: 11,
    type: "mini-challenge",
    tag: "🎯 Missão 10",
    title: "KIT DE\nCOMPONENTES",
    subtitle: "Construa a base do seu Design System",
    tasks: [
      "Instale clsx, tailwind-merge e lucide-react; crie o helper cn() em lib/utils.ts",
      "Crie components/ui/Button.tsx com variantes (primary/secondary/ghost) e tamanhos (sm/md/lg)",
      "Use cn() no Button e aceite className por fora — teste sobrescrevendo o padding",
      "Crie components/ui/Card.tsx (container padronizado) e components/ui/Badge.tsx",
      "Adicione ícones do Lucide nos botões (ex: Flame, ChevronRight)",
      "Monte uma página /kit exibindo todas as variantes lado a lado",
    ],
    bonus: [
      "Crie um IconButton compondo o Button (não do zero)",
      "Adicione um estado de loading no Button com <Loader2 className=\"animate-spin\" />",
    ],
    xp: 50,
    nextHref: "/modulos/ui/shadcn",
    nextLabel: "Aula 11: Headless UI & Shadcn →",
  },
];
