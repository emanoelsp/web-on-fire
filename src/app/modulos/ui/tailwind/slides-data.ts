import type { Slide } from "@/types/slides";

export const TAILWIND_SLIDES: Slide[] = [
  {
    id: 1,
    type: "cover",
    tag: "Módulo 03 · Aula 09",
    title: "TAILWIND CSS\n& RESPONSIVO",
    subtitle: "Estilize na marcação, pense mobile first, domine o dark mode.",
  },
  {
    id: 2,
    type: "concept",
    tag: "Utility-first",
    title: "A virada de chave do Tailwind",
    items: [
      { icon: "🎨", text: "CSS tradicional: você inventa nomes de classe (.card, .btn-primary) e pula entre 2 arquivos o tempo todo." },
      { icon: "🧩", text: "Utility-first: você compõe o visual com classes pequenas e prontas — bg-orange-500, p-4, rounded-xl — direto no JSX." },
      { icon: "🚀", text: "Sem sair do arquivo, sem inventar nomes, sem CSS morto: o que não está na tela não vai para o bundle final." },
      { icon: "🤔", text: "Parece 'poluído' no começo. Depois de uma semana, você lê o visual do componente sem abrir nenhum .css." },
    ],
  },
  {
    id: 3,
    type: "code",
    tag: "Comparação",
    title: "O mesmo botão, duas filosofias",
    codeLabel: "css-tradicional vs tailwind",
    code: `/* ❌ CSS tradicional: 2 arquivos, 1 nome inventado */
/* styles.css */
.btn-primary {
  background: #FF5500;
  padding: 0.5rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 700;
  color: white;
}
/* Component.tsx */
<button className="btn-primary">Enviar</button>


/* ✅ Tailwind: tudo na marcação, zero nome inventado */
<button className="bg-orange-500 px-6 py-2 rounded-lg
                   font-bold text-white hover:bg-orange-600">
  Enviar
</button>`,
    tip: "Cada classe faz UMA coisa. bg- é fundo, p- é padding, rounded- é borda arredondada, text- é cor/tamanho de texto.",
  },
  {
    id: 4,
    type: "concept",
    tag: "Anatomia das classes",
    title: "O vocabulário essencial",
    items: [
      { icon: "📏", text: "Espaçamento: p-4 (padding), m-2 (margin), gap-3 (espaço no flex/grid). A escala é *4px (p-4 = 16px)." },
      { icon: "🔤", text: "Tipografia: text-lg, font-bold, text-center, leading-relaxed, tracking-wide." },
      { icon: "🎨", text: "Cores: bg-slate-900, text-orange-500, border-white/10 (o /10 é opacidade de 10%)." },
      { icon: "📐", text: "Layout: flex, grid, items-center, justify-between, w-full, max-w-4xl, rounded-xl." },
    ],
  },
  {
    id: 5,
    type: "diagram",
    tag: "Mobile First",
    title: "O paradigma Mobile First",
    subtitle: "Estilo base = celular. Breakpoints ADICIONAM em telas maiores.",
    layers: [
      {
        icon: "📱",
        label: "BASE (sem prefixo)",
        desc: "flex-col — o layout do celular é o padrão, para TODAS as telas",
        color: "fire",
        connector: "a partir de 768px (tablet)...",
      },
      {
        icon: "💻",
        label: "md: (≥768px)",
        desc: "md:flex-row — sobrescreve só do tablet para cima",
        color: "amber",
        connector: "a partir de 1024px (desktop)...",
      },
      {
        icon: "🖥️",
        label: "lg: (≥1024px)",
        desc: "lg:gap-8 — refinamentos para telas grandes",
        color: "green",
      },
    ],
    tip: "Regra de ouro: escreva primeiro para o celular SEM prefixo, depois adicione md: e lg: para crescer. Nunca o contrário.",
  },
  {
    id: 6,
    type: "code",
    tag: "Responsivo",
    title: "Um card que se adapta",
    codeLabel: "Card.tsx",
    code: `// Empilhado no celular, lado a lado no desktop
<div className="flex flex-col md:flex-row gap-4 p-4 md:p-6">
  <img className="w-full md:w-48 rounded-lg" src="..." />
  <div>
    <h3 className="text-lg md:text-xl font-bold">Título</h3>
    <p className="text-sm text-slate-400">Descrição...</p>
  </div>
</div>

// Grid responsivo clássico: 1 → 2 → 3 colunas
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
  {produtos.map(p => <Card key={p.id} {...p} />)}
</div>`,
    tip: "Redimensione a janela do navegador com o DevTools aberto (modo responsivo, Ctrl+Shift+M) para ver os breakpoints em ação.",
  },
  {
    id: 7,
    type: "quiz",
    tag: "Quiz",
    title: "Pensando mobile first",
    question: 'O que a classe "text-sm md:text-lg" produz?',
    options: [
      {
        text: "Texto pequeno sempre, ignorando o md:",
        correct: false,
        explanation: "O md: não é ignorado — ele entra em ação a partir de 768px.",
      },
      {
        text: "Texto pequeno no celular, grande a partir de 768px",
        correct: true,
        explanation: "Isso! text-sm é a base (mobile), e md:text-lg sobrescreve do tablet para cima. Mobile first puro.",
      },
      {
        text: "Texto grande no celular, pequeno no desktop",
        correct: false,
        explanation: "Ao contrário: sem prefixo é a base (menor tela); o prefixo cresce para telas maiores.",
      },
      {
        text: "Texto grande em todas as telas",
        correct: false,
        explanation: "Só a partir de md: (768px) o texto fica grande. Abaixo disso vale o text-sm.",
      },
    ],
    xp: 15,
  },
  {
    id: 8,
    type: "code",
    tag: "Dark Mode",
    title: "Dark mode com uma variante",
    codeLabel: "dark-mode.tsx",
    code: `// tailwind: a variante dark: aplica quando o tema escuro está ativo
<div className="bg-white text-slate-900
                dark:bg-slate-900 dark:text-white">
  <h1 className="text-orange-600 dark:text-orange-400">
    Web On Fire
  </h1>
</div>

// Como LIGAR o dark mode? Duas estratégias:
// 1. Automático — segue a preferência do sistema operacional
// 2. Manual — você adiciona/remove a classe "dark" no <html>

// Alternância manual (o padrão para um botão de tema):
function toggleTheme() {
  document.documentElement.classList.toggle("dark");
}`,
    tip: "Para o toggle manual sobreviver ao reload, salve a escolha no localStorage e reaplique no carregamento. Bibliotecas como next-themes fazem isso por você.",
  },
  {
    id: 9,
    type: "concept",
    tag: "Design tokens",
    title: "Consistência: o tema é a fonte da verdade",
    items: [
      { icon: "🎯", text: "Não espalhe cores mágicas (#FF5500) pelo código: defina uma vez no tema e reutilize (bg-primary)." },
      { icon: "🎨", text: "No Tailwind v4, o tema vive no CSS com @theme: cores, fontes e espaçamentos viram variáveis." },
      { icon: "🔁", text: "Trocar a cor da marca inteira = mudar 1 linha. É a base de um Design System." },
      { icon: "📐", text: "Use a escala do Tailwind (spacing, cores 50–950) em vez de valores soltos — consistência automática." },
    ],
  },
  {
    id: 10,
    type: "fill-blank",
    tag: "Mão na massa",
    title: "Complete a classe responsiva",
    instruction:
      "Você quer 1 coluna no celular e 3 colunas a partir do desktop (lg). Complete a classe que falta:",
    prefix: `<div className="grid grid-cols-1 _______________ gap-4">`,
    answer: "lg:grid-cols-3",
    hint: "Prefixo do breakpoint + a propriedade de colunas do grid.",
    xp: 20,
  },
  {
    id: 11,
    type: "mini-challenge",
    tag: "🎯 Missão 09",
    title: "LANDING\nRESPONSIVA",
    subtitle: "Construa uma seção que brilha em qualquer tela",
    tasks: [
      "Num projeto Next.js com Tailwind, crie uma seção hero: título grande, subtítulo e 2 botões",
      "Aplique mobile first: botões empilhados (flex-col) no celular, lado a lado (sm:flex-row) acima",
      "Crie uma grade de 3 cards de features: grid-cols-1 md:grid-cols-3 gap-6",
      "Implemente dark mode com a variante dark: em fundos, textos e bordas",
      "Adicione um botão que faz toggle da classe dark no <html>",
      "Teste no modo responsivo do DevTools nos 3 breakpoints (base, md, lg)",
    ],
    bonus: [
      "Defina uma cor de marca no @theme e use-a como bg-primary",
      "Persista o tema escolhido no localStorage e reaplique no reload",
    ],
    xp: 50,
    nextHref: "/modulos/ui/componentes",
    nextLabel: "Aula 10: Componentização →",
  },
];
