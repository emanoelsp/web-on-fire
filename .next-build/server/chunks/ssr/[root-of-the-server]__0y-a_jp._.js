module.exports=[93695,(a,b,c)=>{b.exports=a.x("next/dist/shared/lib/no-fallback-error.external.js",()=>require("next/dist/shared/lib/no-fallback-error.external.js"))},64240,(a,b,c)=>{"use strict";function d(a){if("function"!=typeof WeakMap)return null;var b=new WeakMap,c=new WeakMap;return(d=function(a){return a?c:b})(a)}c._=function(a,b){if(!b&&a&&a.__esModule)return a;if(null===a||"object"!=typeof a&&"function"!=typeof a)return{default:a};var c=d(b);if(c&&c.has(a))return c.get(a);var e={__proto__:null},f=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var g in a)if("default"!==g&&Object.prototype.hasOwnProperty.call(a,g)){var h=f?Object.getOwnPropertyDescriptor(a,g):null;h&&(h.get||h.set)?Object.defineProperty(e,g,h):e[g]=a[g]}return e.default=a,c&&c.set(a,e),e}},50640,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0}),Object.defineProperty(c,"InvariantError",{enumerable:!0,get:function(){return d}});class d extends Error{constructor(a,b){super(`Invariant: ${a.endsWith(".")?a:a+"."} This is a bug in Next.js.`,b),this.name="InvariantError"}}},59469,a=>{"use strict";a.s(["default",()=>b]);let b=(0,a.i(11857).registerClientReference)(function(){throw Error("Attempted to call the default export of [project]/src/components/slides/SlidePresentation.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"[project]/src/components/slides/SlidePresentation.tsx <module evaluation>","default")},59394,a=>{"use strict";a.s(["default",()=>b]);let b=(0,a.i(11857).registerClientReference)(function(){throw Error("Attempted to call the default export of [project]/src/components/slides/SlidePresentation.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"[project]/src/components/slides/SlidePresentation.tsx","default")},9844,a=>{"use strict";a.i(59469);var b=a.i(59394);a.n(b)},10585,a=>{a.v("/_next/static/media/favicon.0x3dzn~oxb6tn.ico"+(globalThis.NEXT_CLIENT_ASSET_SUFFIX||""))},68611,a=>{"use strict";let b={src:a.i(10585).default,width:256,height:256};a.s(["default",0,b])},61289,a=>{"use strict";var b=a.i(7997),c=a.i(9844);let d=[{id:1,type:"cover",tag:"Módulo 02 · Aula 04",title:"OTIMIZAÇÕES &\nLAZY LOADING",subtitle:"Enviar menos, carregar depois, otimizar sempre — sem esforço manual."},{id:2,type:"concept",tag:"O problema",title:"Por que sites ficam lentos",items:[{icon:"📦",text:"Bundle gigante: cada biblioteca importada viaja até o browser — mesmo as usadas em UMA tela escondida."},{icon:"🖼️",text:"Imagens cruas: uma foto de 4MB num card de 300px desperdiça banda e trava o carregamento."},{icon:"🔤",text:"Fontes externas: o texto pisca ou fica invisível esperando o Google Fonts responder (FOUT/FOIT)."},{icon:"📉",text:"Isso tem preço real: cada 1s a mais de carregamento derruba conversão — e o Google rebaixa seu SEO (Core Web Vitals)."}]},{id:3,type:"concept",tag:"Lazy loading",title:"A ideia central: carregue só quando precisar",items:[{icon:"🍽️",text:"Restaurante de novo: o buffet não serve TODOS os pratos na sua mesa de uma vez — você busca o que vai comer."},{icon:"✂️",text:"Code splitting: o Next já divide o bundle POR ROTA automaticamente — /loja não carrega o código de /admin."},{icon:"🎯",text:"Mas dentro de uma página, componentes pesados (gráficos, editores, mapas, modais) ainda vão todos juntos..."},{icon:"⏳",text:"...a menos que você peça: next/dynamic importa o componente SÓ quando ele for renderizar."}]},{id:4,type:"code",tag:"next/dynamic",title:"Importação dinâmica na prática",codeLabel:"src/app/dashboard/page.tsx",code:`import dynamic from "next/dynamic";

// ANTES: import GraficoVendas from "@/components/GraficoVendas";
// A lib de gr\xe1ficos (300kb!) entraria no bundle inicial.

// DEPOIS: s\xf3 baixa quando o componente aparecer
const GraficoVendas = dynamic(
  () => import("@/components/GraficoVendas"),
  {
    loading: () => <p>Carregando gr\xe1fico... 📊</p>,
    ssr: false, // opcional: s\xf3 renderiza no cliente (libs que usam window)
  }
);

export default function Dashboard() {
  return (
    <main>
      <h1>Vendas</h1>
      <GraficoVendas />  {/* o download come\xe7a aqui */}
    </main>
  );
}`,tip:"Candidatos clássicos ao dynamic: gráficos, editores de texto, mapas, players de vídeo e modais que o usuário talvez nunca abra."},{id:5,type:"quiz",tag:"Quiz",title:"Quem merece dynamic?",question:"Qual destes componentes é o MELHOR candidato para next/dynamic?",options:[{text:"O Header que aparece em todas as páginas",correct:!1,explanation:"O Header é visível imediatamente em toda página — adiar o carregamento dele PIORARIA a experiência."},{text:"Um modal de edição de perfil que abre só ao clicar em 'Editar'",correct:!0,explanation:"Perfeito: componente pesado, invisível no início, e que muitos usuários nunca abrem. Lazy loading puro."},{text:"O título <h1> da página",correct:!1,explanation:"Texto simples não pesa nada — não há o que dividir."},{text:"O componente <Link> de navegação",correct:!1,explanation:"O Link é minúsculo e essencial — e o Next já otimiza a navegação com prefetch automático."}],xp:15},{id:6,type:"code",tag:"next/image",title:"Imagens que se otimizam sozinhas",codeLabel:"ProdutoCard.tsx",code:`import Image from "next/image";

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

// O que o Next faz por voc\xea automaticamente:
// 1. Converte para WebP/AVIF (at\xe9 70% menor)
// 2. Gera v\xe1rios tamanhos e serve o certo por tela
// 3. Lazy loading: s\xf3 baixa quando entra na viewport
// 4. Reserva o espa\xe7o: zero layout shift (a p\xe1gina n\xe3o "pula")`,tip:"width/height não são o tamanho final na tela (o CSS decide isso) — são a PROPORÇÃO para reservar o espaço e evitar o pulo do layout."},{id:7,type:"code",tag:"next/font",title:"Fontes sem piscada",codeLabel:"src/app/layout.tsx",code:`import { Inter, JetBrains_Mono } from "next/font/google";

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

// O Next BAIXA a fonte no build e serve do SEU dom\xednio:
// sem request ao Google em runtime, sem piscada, com privacidade.`,tip:"Este site usa exatamente esse padrão: Bebas Neue, Inter e JetBrains Mono via next/font — confira no src/app/layout.tsx do projeto."},{id:8,type:"comparison",tag:"Antes vs Depois",title:"O impacto somado",left:{label:"Página ingênua",items:["Bundle único com tudo dentro","<img> de 4MB bloqueando","Fonte do Google piscando","Layout pulando ao carregar","Nota baixa no Lighthouse"]},right:{label:"Página otimizada",items:["Código dividido por rota + dynamic","WebP no tamanho certo, lazy","Fonte servida do próprio domínio","Espaços reservados, zero pulo","Core Web Vitals no verde"]},tip:"Rode o Lighthouse (aba do DevTools) antes e depois de otimizar — ver a nota subir é viciante."},{id:9,type:"fill-blank",tag:"Mão na massa",title:"Complete a importação",instruction:"Complete o nome da função do Next que carrega um componente sob demanda (digite só o nome importado):",prefix:`import _______ from "next/dynamic";

const Mapa = _______(() => import("@/components/Mapa"));`,answer:"dynamic",hint:"O nome da função é o mesmo do módulo de onde ela vem.",xp:20},{id:10,type:"concept",tag:"Checklist",title:"O ritual de otimização de todo deploy",items:[{icon:"🖼️",text:"Toda <img> virou <Image> — e só a imagem hero tem priority."},{icon:"🔤",text:"Toda fonte vem de next/font — nenhuma tag <link> para Google Fonts."},{icon:"✂️",text:"Componentes pesados e condicionais usam next/dynamic com um loading amigável."},{icon:"📊",text:"npm run build lido com atenção: a tabela mostra o peso de cada rota — investigue as gordas."}]},{id:11,type:"mini-challenge",tag:"🎯 Missão 07",title:"OPERAÇÃO\nDIETA",subtitle:"Pegue uma página pesada e faça-a voar",tasks:["No projeto da missão anterior, adicione 3 fotos de produto com <Image> (baixe fotos grandes de propósito)","Configure remotePatterns no next.config.ts e use uma imagem externa (Unsplash)","Troque as fontes para next/font (uma para títulos, outra para corpo)","Crie um componente GraficoFake pesado (pode ser um SVG grande) e carregue-o com next/dynamic + loading","Rode npm run build e anote o tamanho das rotas antes/depois","Rode o Lighthouse na página e registre a pontuação de Performance"],bonus:['Use a prop placeholder="blur" numa imagem local e veja o efeito',"Force ssr: false no gráfico e explique (num comentário) por que isso importa para libs que usam window"],xp:50,nextHref:"/modulos/nextjs/aula-04",nextLabel:"Aula 05: UX Estrutural e Erros →"}];a.s(["default",0,function(){return(0,b.jsx)(c.default,{slides:d,backHref:"/modulos/nextjs",backLabel:"Next.js Core",aulaLabel:"Aula 04 — Otimizações e Lazy Loading",aulaSlug:"nextjs-otimizacoes"})},"metadata",0,{title:"Aula 04 — Otimizações e Lazy Loading · Web On Fire Academy"}],61289)},83212,a=>{a.n(a.i(61289))}];

//# sourceMappingURL=%5Broot-of-the-server%5D__0y-a_jp._.js.map