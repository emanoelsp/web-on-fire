import type { Slide } from "@/types/slides";

export const OTIMIZACOES_SLIDES: Slide[] = [
  {
    id: 1,
    type: "cover",
    tag: "Módulo 02 · Aula 07",
    title: "OTIMIZAÇÕES &\nLAZY LOADING",
    subtitle: "Enviar menos, carregar depois, otimizar sempre — sem esforço manual.",
  },
  {
    id: 2,
    type: "concept",
    tag: "O problema",
    title: "Por que sites ficam lentos",
    items: [
      { icon: "📦", text: "Bundle gigante: cada biblioteca importada viaja até o browser — mesmo as usadas em UMA tela escondida." },
      { icon: "🖼️", text: "Imagens cruas: uma foto de 4MB num card de 300px desperdiça banda e trava o carregamento." },
      { icon: "🔤", text: "Fontes externas: o texto pisca ou fica invisível esperando o Google Fonts responder (FOUT/FOIT)." },
      { icon: "📉", text: "Isso tem preço real: cada 1s a mais de carregamento derruba conversão — e o Google rebaixa seu SEO (Core Web Vitals)." },
    ],
  },
  {
    id: 3,
    type: "concept",
    tag: "Lazy loading",
    title: "A ideia central: carregue só quando precisar",
    items: [
      { icon: "🍽️", text: "Restaurante de novo: o buffet não serve TODOS os pratos na sua mesa de uma vez — você busca o que vai comer." },
      { icon: "✂️", text: "Code splitting: o Next já divide o bundle POR ROTA automaticamente — /loja não carrega o código de /admin." },
      { icon: "🎯", text: "Mas dentro de uma página, componentes pesados (gráficos, editores, mapas, modais) ainda vão todos juntos..." },
      { icon: "⏳", text: "...a menos que você peça: next/dynamic importa o componente SÓ quando ele for renderizar." },
    ],
  },
  {
    id: 4,
    type: "code",
    tag: "next/dynamic",
    title: "Importação dinâmica na prática",
    codeLabel: "src/app/dashboard/page.tsx",
    code: `import dynamic from "next/dynamic";

// ANTES: import GraficoVendas from "@/components/GraficoVendas";
// A lib de gráficos (300kb!) entraria no bundle inicial.

// DEPOIS: só baixa quando o componente aparecer
const GraficoVendas = dynamic(
  () => import("@/components/GraficoVendas"),
  {
    loading: () => <p>Carregando gráfico... 📊</p>,
    ssr: false, // opcional: só renderiza no cliente (libs que usam window)
  }
);

export default function Dashboard() {
  return (
    <main>
      <h1>Vendas</h1>
      <GraficoVendas />  {/* o download começa aqui */}
    </main>
  );
}`,
    tip: "Candidatos clássicos ao dynamic: gráficos, editores de texto, mapas, players de vídeo e modais que o usuário talvez nunca abra.",
  },
  {
    id: 5,
    type: "quiz",
    tag: "Quiz",
    title: "Quem merece dynamic?",
    question: "Qual destes componentes é o MELHOR candidato para next/dynamic?",
    options: [
      {
        text: "O Header que aparece em todas as páginas",
        correct: false,
        explanation: "O Header é visível imediatamente em toda página — adiar o carregamento dele PIORARIA a experiência.",
      },
      {
        text: "Um modal de edição de perfil que abre só ao clicar em 'Editar'",
        correct: true,
        explanation: "Perfeito: componente pesado, invisível no início, e que muitos usuários nunca abrem. Lazy loading puro.",
      },
      {
        text: "O título <h1> da página",
        correct: false,
        explanation: "Texto simples não pesa nada — não há o que dividir.",
      },
      {
        text: "O componente <Link> de navegação",
        correct: false,
        explanation: "O Link é minúsculo e essencial — e o Next já otimiza a navegação com prefetch automático.",
      },
    ],
    xp: 15,
  },
  {
    id: 6,
    type: "code",
    tag: "next/image",
    title: "Imagens que se otimizam sozinhas",
    codeLabel: "ProdutoCard.tsx",
    code: `import Image from "next/image";

// ❌ ANTES: a tag crua
// <img src="/camiseta.jpg" />  ← 4MB, sem lazy, layout pula

// ✅ DEPOIS: o componente otimizado
<Image
  src="/camiseta.jpg"
  alt="Camiseta On Fire preta com logo"
  width={400}
  height={400}
  priority={false}   // true APENAS na imagem principal do topo
/>

// O que o Next faz por você automaticamente:
// 1. Converte para WebP/AVIF (até 70% menor)
// 2. Gera vários tamanhos e serve o certo por tela
// 3. Lazy loading: só baixa quando entra na viewport
// 4. Reserva o espaço: zero layout shift (a página não "pula")`,
    tip: "width/height não são o tamanho final na tela (o CSS decide isso) — são a PROPORÇÃO para reservar o espaço e evitar o pulo do layout.",
  },
  {
    id: 7,
    type: "code",
    tag: "next/font",
    title: "Fontes sem piscada",
    codeLabel: "src/app/layout.tsx",
    code: `import { Inter, JetBrains_Mono } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={\`\${inter.variable} \${mono.variable}\`}>
      <body>{children}</body>
    </html>
  );
}

// O Next BAIXA a fonte no build e serve do SEU domínio:
// sem request ao Google em runtime, sem piscada, com privacidade.`,
    tip: "Este site usa exatamente esse padrão: Bebas Neue, Inter e JetBrains Mono via next/font — confira no src/app/layout.tsx do projeto.",
  },
  {
    id: 8,
    type: "comparison",
    tag: "Antes vs Depois",
    title: "O impacto somado",
    left: {
      label: "Página ingênua",
      items: [
        "Bundle único com tudo dentro",
        "<img> de 4MB bloqueando",
        "Fonte do Google piscando",
        "Layout pulando ao carregar",
        "Nota baixa no Lighthouse",
      ],
    },
    right: {
      label: "Página otimizada",
      items: [
        "Código dividido por rota + dynamic",
        "WebP no tamanho certo, lazy",
        "Fonte servida do próprio domínio",
        "Espaços reservados, zero pulo",
        "Core Web Vitals no verde",
      ],
    },
    tip: "Rode o Lighthouse (aba do DevTools) antes e depois de otimizar — ver a nota subir é viciante.",
  },
  {
    id: 9,
    type: "fill-blank",
    tag: "Mão na massa",
    title: "Complete a importação",
    instruction:
      "Complete o nome da função do Next que carrega um componente sob demanda (digite só o nome importado):",
    prefix: `import _______ from "next/dynamic";

const Mapa = _______(() => import("@/components/Mapa"));`,
    answer: "dynamic",
    hint: "O nome da função é o mesmo do módulo de onde ela vem.",
    xp: 20,
  },
  {
    id: 10,
    type: "concept",
    tag: "Checklist",
    title: "O ritual de otimização de todo deploy",
    items: [
      { icon: "🖼️", text: "Toda <img> virou <Image> — e só a imagem hero tem priority." },
      { icon: "🔤", text: "Toda fonte vem de next/font — nenhuma tag <link> para Google Fonts." },
      { icon: "✂️", text: "Componentes pesados e condicionais usam next/dynamic com um loading amigável." },
      { icon: "📊", text: "npm run build lido com atenção: a tabela mostra o peso de cada rota — investigue as gordas." },
    ],
  },
  {
    id: 11,
    type: "mini-challenge",
    tag: "🎯 Missão 07",
    title: "OPERAÇÃO\nDIETA",
    subtitle: "Pegue uma página pesada e faça-a voar",
    tasks: [
      "No projeto da missão anterior, adicione 3 fotos de produto com <Image> (baixe fotos grandes de propósito)",
      "Configure remotePatterns no next.config.ts e use uma imagem externa (Unsplash)",
      "Troque as fontes para next/font (uma para títulos, outra para corpo)",
      "Crie um componente GraficoFake pesado (pode ser um SVG grande) e carregue-o com next/dynamic + loading",
      "Rode npm run build e anote o tamanho das rotas antes/depois",
      "Rode o Lighthouse na página e registre a pontuação de Performance",
    ],
    bonus: [
      "Use a prop placeholder=\"blur\" numa imagem local e veja o efeito",
      "Force ssr: false no gráfico e explique (num comentário) por que isso importa para libs que usam window",
    ],
    xp: 50,
    nextHref: "/modulos/nextjs/aula-04",
    nextLabel: "Aula 08: UX Estrutural e Erros →",
  },
];
