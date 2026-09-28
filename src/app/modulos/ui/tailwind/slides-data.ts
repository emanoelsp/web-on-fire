import type { Slide } from "@/types/slides";

export const TAILWIND_SLIDES: Slide[] = [
  {
    id: 1,
    type: "cover",
    tag: "Módulo 03 · Aula 01",
    title: "TAILWIND CSS\n& RESPONSIVO",
    subtitle: "Um botão sem estilo vira um botão de fogo — uma classe de cada vez.",
  },
  {
    id: 2,
    type: "concept",
    tag: "Utility-first",
    title: "A virada de chave do Tailwind",
    items: [
      { icon: "🎨", text: "CSS tradicional: você inventa nomes de classe (.btn-primary) e pula entre 2 arquivos o tempo todo." },
      { icon: "🧩", text: "Utility-first: você compõe o visual com classes pequenas e prontas — bg-orange-500, p-4, rounded-xl — direto no JSX." },
      { icon: "👀", text: "Nesta aula você NÃO vai só ler código: cada slide mostra o elemento renderizado de verdade, evoluindo classe por classe." },
      { icon: "🚀", text: "Estilizar → ver → incrementar → ver. É assim que se aprende UI: com o resultado na frente dos olhos." },
    ],
  },
  {
    id: 3,
    type: "concept",
    tag: "Anatomia das classes",
    title: "O vocabulário essencial",
    subtitle: "Antes de estilizar, decore este mini-dicionário. Cada classe faz UMA coisa.",
    items: [
      { icon: "📏", text: "Espaçamento: p-4 (padding), px-5 (horizontal), py-2 (vertical), m-2 (margin), gap-3. Escala ×4px → p-4 = 16px." },
      { icon: "🎨", text: "Cores: bg-orange-500 (fundo), text-white (texto), border-orange-500 (borda). Escala 50 (claro) → 950 (escuro)." },
      { icon: "📐", text: "Forma: rounded-lg (cantos), border-2 (espessura), shadow-lg (sombra), w-full / w-56 (largura)." },
      { icon: "✨", text: "Estado: hover:bg-orange-600 (mouse em cima), active:scale-95 (clique), transition (anima a mudança)." },
    ],
  },
  {
    id: 4,
    type: "live-preview",
    tag: "Passo 1 · Botões",
    title: "Um botão nasce do zero",
    subtitle: "O mesmo <button>, ganhando vida a cada classe. Repare no de baixo: já parece um botão de produto.",
    element: "button",
    content: "Enviar",
    stageLabel: "Todos abaixo são <button> reais — o de cima é o padrão feio do navegador",
    steps: [
      { label: "1. Sem estilo", className: "", note: "Só um <button>. Cinza, apertado, sem personalidade." },
      { label: "+ respiro", className: "px-5 py-2.5", added: "px-5 py-2.5", note: "px = padding horizontal, py = vertical. Dá área de clique." },
      { label: "+ cor e texto", className: "px-5 py-2.5 bg-orange-500 text-white", added: "bg-orange-500 text-white", note: "Fundo laranja da marca e texto branco para contraste." },
      { label: "+ peso e cantos", className: "px-5 py-2.5 bg-orange-500 text-white font-semibold rounded-lg", added: "font-semibold rounded-lg", note: "font-semibold engrossa o texto; rounded-lg arredonda os cantos." },
    ],
    tip: "A escala de cor vai de 50 (quase branco) a 950 (quase preto). bg-orange-500 é o tom cheio; 600 é um pouco mais escuro — perfeito pra hover.",
  },
  {
    id: 5,
    type: "live-preview",
    tag: "Passo 2 · Bordas & raios",
    title: "Bordas e cantos arredondados",
    subtitle: "Nem todo botão é preenchido. O 'outline' (só borda) é o clássico botão secundário.",
    element: "button",
    content: "Ver mais",
    steps: [
      { label: "Borda fina", className: "px-5 py-2.5 font-semibold text-orange-400 border border-orange-500 rounded-lg", added: "border border-orange-500", note: "border liga a borda; border-orange-500 dá a cor." },
      { label: "Borda grossa", className: "px-5 py-2.5 font-semibold text-orange-400 border-2 border-orange-500 rounded-lg", added: "border-2", note: "border-2 = 2px de espessura (border = 1px)." },
      { label: "Cantos maiores", className: "px-5 py-2.5 font-semibold text-orange-400 border-2 border-orange-500 rounded-xl", added: "rounded-xl", note: "rounded-sm/md/lg/xl/2xl — quanto maior, mais arredondado." },
      { label: "Formato pílula", className: "px-6 py-2.5 font-semibold text-orange-400 border-2 border-orange-500 rounded-full", added: "rounded-full", note: "rounded-full deixa totalmente redondo nas pontas." },
    ],
    tip: "border-orange-500/40 usa opacidade: /40 = 40%. Ótimo para bordas discretas que aparecem só no hover.",
  },
  {
    id: 6,
    type: "live-preview",
    tag: "Passo 3 · Efeitos & hover",
    title: "Vida: hover, transição e clique",
    subtitle: "Um bom botão RESPONDE. Passe o mouse e clique nos exemplos — eles reagem de verdade.",
    element: "button",
    content: "Enviar",
    stageLabel: "Passe o mouse e clique — hover, active e transition estão ligados",
    steps: [
      { label: "Base (sem reação)", className: "px-5 py-2.5 bg-orange-500 text-white font-semibold rounded-lg", note: "Bonito, mas 'morto' — não reage ao mouse." },
      { label: "+ transição + hover", className: "px-5 py-2.5 bg-orange-500 text-white font-semibold rounded-lg transition-colors hover:bg-orange-600", added: "transition-colors hover:bg-orange-600", note: "hover: muda a cor ao passar o mouse; transition-colors suaviza a troca." },
      { label: "+ sobe no hover", className: "px-5 py-2.5 bg-orange-500 text-white font-semibold rounded-lg transition hover:bg-orange-600 hover:-translate-y-0.5", added: "transition hover:-translate-y-0.5", note: "transition anima tudo; -translate-y sobe o botão 2px — sensação de 'flutuar'." },
      { label: "+ sombra + clique", className: "px-5 py-2.5 bg-orange-500 text-white font-semibold rounded-lg transition hover:bg-orange-600 hover:-translate-y-0.5 shadow-lg shadow-orange-500/30 active:scale-95", added: "shadow-lg shadow-orange-500/30 active:scale-95", note: "sombra laranja dá profundidade; active:scale-95 'afunda' ao clicar." },
    ],
    tip: "transition (sozinho) anima TODAS as propriedades. Se quiser animar só a cor, use transition-colors — é mais leve.",
  },
  {
    id: 7,
    type: "live-preview",
    tag: "Passo 4 · Gradientes",
    title: "Cores em gradiente: o botão de fogo",
    subtitle: "Gradiente = transição entre cores. É o que dá a cara 'On Fire' à marca.",
    element: "button",
    content: "🔥 On Fire",
    stageLabel: "Passe o mouse no último — ele 'acende'",
    steps: [
      { label: "Gradiente base", className: "px-6 py-3 text-white font-semibold rounded-lg bg-gradient-to-r from-orange-500 to-red-600", added: "bg-gradient-to-r from-orange-500 to-red-600", note: "bg-gradient-to-r = da esquerda p/ direita; from = cor inicial, to = final." },
      { label: "+ parada no meio", className: "px-6 py-3 text-white font-semibold rounded-lg bg-gradient-to-r from-amber-400 via-orange-500 to-red-600", added: "via-orange-500", note: "via adiciona uma cor no meio do caminho: amarelo → laranja → vermelho." },
      { label: "Diagonal + acende", className: "px-6 py-3 text-white font-semibold rounded-lg bg-gradient-to-br from-amber-400 via-orange-500 to-red-600 transition hover:brightness-110 hover:-translate-y-0.5 shadow-lg shadow-orange-500/40", added: "bg-gradient-to-br ... hover:brightness-110", note: "-br = diagonal (canto inf. direito); brightness-110 clareia 10% no hover." },
    ],
    tip: "No Tailwind v4 o nome moderno é bg-linear-to-r (linear). O clássico bg-gradient-to-r continua funcionando — use o que preferir.",
  },
  {
    id: 8,
    type: "code",
    tag: "Recap",
    title: "O botão de fogo, pronto pra copiar",
    codeLabel: "FireButton.tsx",
    code: `// O resultado do passo a passo: um botão de produto completo.
// Note como a leitura das classes já conta a história do visual.
<button
  className="px-6 py-3 rounded-lg font-semibold text-white
             bg-gradient-to-br from-amber-400 via-orange-500 to-red-600
             shadow-lg shadow-orange-500/40
             transition hover:brightness-110 hover:-translate-y-0.5
             active:scale-95">
  🔥 On Fire
</button>

// 👀 Repetir essas 6 linhas em 20 botões é ruim.
// Na PRÓXIMA aula transformamos isso em <FireButton /> reutilizável.`,
    tip: "Você pode quebrar o className em várias linhas — o Tailwind não se importa com espaços/quebras. Ajuda muito a leitura.",
  },
  {
    id: 9,
    type: "live-preview",
    tag: "Passo 5 · Links",
    title: "Links que não parecem dos anos 2000",
    subtitle: "Link cru é azul e sublinhado. Com 3 classes ele entra no design system.",
    element: "link",
    content: "Ver documentação →",
    stageLabel: "Passe o mouse no último link",
    steps: [
      { label: "Link cru", className: "", note: "Padrão do navegador: azul, sublinhado grudado no texto." },
      { label: "Cor da marca", className: "text-orange-400", added: "text-orange-400", note: "Assume a cor da marca. (400 é um laranja mais claro, ótimo em fundo escuro.)" },
      { label: "Sublinhado elegante", className: "text-orange-400 underline underline-offset-4 decoration-orange-500/40", added: "underline-offset-4 decoration-orange-500/40", note: "offset afasta o traço do texto; decoration dá cor/opacidade ao traço." },
      { label: "Revela no hover", className: "text-orange-400 no-underline hover:underline underline-offset-4 hover:text-orange-300 transition-colors", added: "no-underline hover:underline hover:text-orange-300", note: "Sem sublinhado em repouso; aparece só ao passar o mouse. Clássico moderno." },
    ],
    tip: "Em links de verdade no Next.js você usa <Link>, mas as classes de estilo são exatamente estas.",
  },
  {
    id: 10,
    type: "quiz",
    tag: "Quiz",
    title: "Você leu o visual?",
    question: 'O que a classe "hover:-translate-y-0.5" faz num botão?',
    options: [
      { text: "Muda a cor de fundo ao passar o mouse", correct: false, explanation: "Isso seria hover:bg-*. translate mexe na POSIÇÃO, não na cor." },
      { text: "Sobe o botão 2px quando o mouse passa por cima", correct: true, explanation: "Isso! -translate-y move no eixo Y; o negativo sobe. Combinado com transition, dá o efeito de flutuar." },
      { text: "Aumenta o tamanho do texto no hover", correct: false, explanation: "Tamanho de texto é text-lg etc. translate move o elemento." },
      { text: "Arredonda os cantos ao passar o mouse", correct: false, explanation: "Cantos são rounded-*. translate é deslocamento de posição." },
    ],
    xp: 15,
  },
  {
    id: 11,
    type: "diagram",
    tag: "Mobile First",
    title: "O paradigma Mobile First",
    subtitle: "Estilo base = celular. Breakpoints ADICIONAM em telas maiores.",
    layers: [
      { icon: "📱", label: "BASE (sem prefixo)", desc: "flex-col — o layout do celular é o padrão, para TODAS as telas", color: "fire", connector: "a partir de 768px (tablet)..." },
      { icon: "💻", label: "md: (≥768px)", desc: "md:flex-row — sobrescreve só do tablet para cima", color: "amber", connector: "a partir de 1024px (desktop)..." },
      { icon: "🖥️", label: "lg: (≥1024px)", desc: "lg:gap-8 — refinamentos para telas grandes", color: "green" },
    ],
    tip: "Regra de ouro: escreva primeiro para o celular SEM prefixo, depois adicione md: e lg: para crescer. Nunca o contrário.",
  },
  {
    id: 12,
    type: "live-preview",
    tag: "Passo 6 · Juntando tudo",
    title: "Um card com tudo que você aprendeu",
    subtitle: "Superfície + borda + sombra + hover, no padrão zinc/orange do projeto. Passe o mouse.",
    element: "card",
    content: "Card On Fire 🔥",
    stageLabel: "Passe o mouse no último card — ele sobe e a borda acende",
    steps: [
      { label: "Superfície", className: "w-56 p-5 rounded-xl bg-zinc-900 text-zinc-100 font-semibold", added: "bg-zinc-900 rounded-xl", note: "zinc-900 é o cinza-escuro base; rounded-xl arredonda a caixa toda." },
      { label: "+ borda sutil", className: "w-56 p-5 rounded-xl bg-zinc-900 text-zinc-100 font-semibold border border-white/10", added: "border border-white/10", note: "Borda branca a 10% de opacidade: separa o card do fundo sem gritar." },
      { label: "+ profundidade e vida", className: "w-56 p-5 rounded-xl bg-zinc-900 text-zinc-100 font-semibold border border-white/10 shadow-lg transition hover:-translate-y-1 hover:border-orange-500/40 hover:shadow-orange-500/10", added: "shadow-lg transition hover:-translate-y-1 hover:border-orange-500/40", note: "Sobe no hover e a borda ganha um toque laranja — o mesmo DNA dos botões." },
    ],
    tip: "Repare: card e botão compartilham o MESMO vocabulário (rounded, border, shadow, hover, transition). Aprendeu um, aprendeu todos.",
  },
  {
    id: 13,
    type: "code",
    tag: "Dark Mode",
    title: "Dark mode com uma variante",
    codeLabel: "dark-mode.tsx",
    code: `// A variante dark: aplica o estilo só quando o tema escuro está ativo
<div className="bg-white text-zinc-900
                dark:bg-zinc-900 dark:text-zinc-100">
  <h1 className="text-orange-600 dark:text-orange-400">
    Web On Fire
  </h1>
</div>

// Como LIGAR o dark mode? Alternância manual (padrão de um botão de tema):
function toggleTheme() {
  document.documentElement.classList.toggle("dark");
}`,
    tip: "Para o tema sobreviver ao reload, salve a escolha no localStorage e reaplique no carregamento. next-themes faz isso por você.",
  },
  {
    id: 14,
    type: "fill-blank",
    tag: "Mão na massa",
    title: "Complete a classe responsiva",
    instruction: "Você quer 1 coluna no celular e 3 colunas a partir do desktop (lg). Complete a classe que falta:",
    prefix: `<div className="grid grid-cols-1 _______________ gap-4">`,
    answer: "lg:grid-cols-3",
    hint: "Prefixo do breakpoint + a propriedade de colunas do grid.",
    xp: 20,
  },
  {
    id: 15,
    type: "demo",
    tag: "🔥 Projeto do módulo",
    title: "A Central On Fire nasce aqui",
    subtitle: "Este é o projeto que vamos evoluir a cada aula. Hoje, só com Tailwind: hero, título em gradiente, bordas, sombra e hover. Passe o mouse nos botões.",
    demo: "projeto-1",
    tip: "A cada aula esta MESMA página ganha uma camada: ícones, componentes, modais, feedback e um dashboard. No fim, é o embrião do Desafio Final (Painel On Fire).",
  },
  {
    id: 16,
    type: "mini-challenge",
    tag: "🎯 Missão 09",
    title: "DO ZERO\nAO FOGO",
    subtitle: "Construa, passo a passo, os 3 elementos que você viu nascer",
    tasks: [
      "Num projeto Next.js com Tailwind, crie um <button> SEM nenhuma classe e veja o padrão feio",
      "Adicione, uma de cada vez: px-5 py-2.5 → bg-orange-500 text-white → font-semibold rounded-lg (teste no navegador a cada adição)",
      "Dê vida: transition hover:bg-orange-600 hover:-translate-y-0.5 shadow-lg active:scale-95 — passe o mouse e clique",
      "Transforme-o em botão de fogo trocando o fundo por bg-gradient-to-br from-amber-400 via-orange-500 to-red-600",
      "Crie um link com text-orange-400 no-underline hover:underline hover:text-orange-300 transition-colors",
      "Monte um card no padrão zinc/orange: bg-zinc-900 border border-white/10 rounded-xl shadow-lg com hover:-translate-y-1",
    ],
    bonus: [
      "Faça o card virar uma grade responsiva: grid grid-cols-1 md:grid-cols-3 gap-6",
      "Adicione dark mode com a variante dark: e um botão que faz toggle da classe no <html>",
    ],
    xp: 50,
    nextHref: "/modulos/ui/componentes",
    nextLabel: "Aula 02: Componentização →",
  },
];
