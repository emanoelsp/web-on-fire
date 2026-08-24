module.exports=[93695,(a,b,c)=>{b.exports=a.x("next/dist/shared/lib/no-fallback-error.external.js",()=>require("next/dist/shared/lib/no-fallback-error.external.js"))},64240,(a,b,c)=>{"use strict";function d(a){if("function"!=typeof WeakMap)return null;var b=new WeakMap,c=new WeakMap;return(d=function(a){return a?c:b})(a)}c._=function(a,b){if(!b&&a&&a.__esModule)return a;if(null===a||"object"!=typeof a&&"function"!=typeof a)return{default:a};var c=d(b);if(c&&c.has(a))return c.get(a);var e={__proto__:null},f=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var g in a)if("default"!==g&&Object.prototype.hasOwnProperty.call(a,g)){var h=f?Object.getOwnPropertyDescriptor(a,g):null;h&&(h.get||h.set)?Object.defineProperty(e,g,h):e[g]=a[g]}return e.default=a,c&&c.set(a,e),e}},50640,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0}),Object.defineProperty(c,"InvariantError",{enumerable:!0,get:function(){return d}});class d extends Error{constructor(a,b){super(`Invariant: ${a.endsWith(".")?a:a+"."} This is a bug in Next.js.`,b),this.name="InvariantError"}}},59469,a=>{"use strict";a.s(["default",()=>b]);let b=(0,a.i(11857).registerClientReference)(function(){throw Error("Attempted to call the default export of [project]/src/components/slides/SlidePresentation.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"[project]/src/components/slides/SlidePresentation.tsx <module evaluation>","default")},59394,a=>{"use strict";a.s(["default",()=>b]);let b=(0,a.i(11857).registerClientReference)(function(){throw Error("Attempted to call the default export of [project]/src/components/slides/SlidePresentation.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"[project]/src/components/slides/SlidePresentation.tsx","default")},9844,a=>{"use strict";a.i(59469);var b=a.i(59394);a.n(b)},10585,a=>{a.v("/_next/static/media/favicon.0x3dzn~oxb6tn.ico"+(globalThis.NEXT_CLIENT_ASSET_SUFFIX||""))},68611,a=>{"use strict";let b={src:a.i(10585).default,width:256,height:256};a.s(["default",0,b])},88608,a=>{"use strict";var b=a.i(7997),c=a.i(9844);let d=[{id:1,type:"cover",tag:"Módulo 02 · Aula 01",title:"O QUE É\nNEXT.JS?",subtitle:"Antes de codar, entender. Antes de entender, sentir."},{id:2,type:"concept",tag:"Contexto",title:"O problema que o Next.js resolve",items:[{icon:"😩",text:"React puro exige configurar tudo: bundler, roteamento, SSR, SEO, deploy — você começa do zero sempre."},{icon:"📦",text:"Cada projeto reinventa a roda: Webpack, Babel, React Router, Helmet... horas de config antes de codar."},{icon:"🐌",text:"SPAs têm problema de performance e SEO — o HTML chega vazio ao browser, o Google não vê o conteúdo."},{icon:"🔥",text:"Next.js chega como o framework que já vem configurado e pronto para produção desde o primeiro npx."}]},{id:3,type:"definition",tag:"Definição",title:"Next.js em uma frase",quote:"Next.js é um framework React de produção que adiciona roteamento baseado em arquivos, renderização no servidor, otimização automática e convenções prontas para escalar.",highlights:["roteamento baseado em arquivos","renderização no servidor","otimização automática","convenções prontas para escalar"]},{id:4,type:"comparison",tag:"React vs Next.js",title:"A diferença que importa",left:{label:"React puro",items:["Apenas biblioteca de UI","Você configura tudo","SPA por padrão (SEO ruim)","Nenhum roteamento incluído","Deploy manual e complexo"]},right:{label:"Next.js",items:["Framework completo","Configuração zero","SSR + SSG + ISR nativos","App Router por arquivo","Deploy com 1 clique na Vercel"]}},{id:5,type:"architecture",tag:"Arquitetura",title:"Como o Next.js funciona",subtitle:"O fluxo de uma requisição no App Router",steps:[{icon:"1️⃣",text:"Browser faz requisição para /produtos"},{icon:"2️⃣",text:"Next.js encontra src/app/produtos/page.tsx"},{icon:"3️⃣",text:"Executa o componente no servidor (Node.js)"},{icon:"4️⃣",text:"Retorna HTML completo para o browser"},{icon:"5️⃣",text:"React hidrata a página — JS assume o controle"}],tip:"SSR = Server Side Rendering. O HTML já vem preenchido, então o SEO e a performance são muito melhores que um SPA tradicional."},{id:6,type:"files",tag:"Estrutura",title:"Os arquivos que você precisa dominar",codeLabel:"Estrutura de pastas recomendada",code:`📁 src/
  📁 app/
    📄 layout.tsx        ← HTML base + fontes + providers (global)
    📄 page.tsx          ← P\xe1gina raiz — rota "/"
    📄 globals.css       ← CSS global
    📁 sobre/
      📄 page.tsx        ← Rota "/sobre"
    📁 blog/
      📁 [slug]/
        📄 page.tsx      ← Rota din\xe2mica "/blog/qualquer-slug"
      📄 loading.tsx     ← Exibido enquanto a p\xe1gina carrega
      📄 error.tsx       ← Exibido em caso de erro
  📁 components/         ← Componentes reutiliz\xe1veis
  📁 lib/                ← Firebase, utils, configura\xe7\xf5es
  📁 services/           ← Acesso a dados (Firestore, APIs)
  📁 types/              ← Tipos TypeScript

📄 next.config.ts        ← Configura\xe7\xe3o do Next.js
📄 tailwind.config.ts    ← Configura\xe7\xe3o do Tailwind`},{id:11,type:"code",tag:"Configuração",title:"next.config.ts: o painel de controle",codeLabel:"next.config.ts",code:`import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Dom\xednios externos permitidos para <Image>
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },

  // Redirecionamentos permanentes
  async redirects() {
    return [
      { source: "/blog-antigo", destination: "/posts", permanent: true },
    ];
  },

  reactStrictMode: true, // avisos extras do React em dev
};

export default nextConfig;`,tip:"Na maioria dos projetos esse arquivo fica quase vazio — e está tudo bem. Você mexe nele quando precisa: liberar domínio de imagem, redirect, headers."},{id:9,type:"best-practices",tag:"Boas Práticas",title:"O que todo dev Next.js faz",items:[{icon:"📁",text:"Organiza código por feature (/features/produtos), não por tipo (/components, /hooks)."},{icon:"🖥️",text:"Prefere Server Components — menos JS enviado = mais velocidade e melhor SEO."},{icon:"🔒",text:"Nunca expõe segredos no cliente. NEXT_PUBLIC_ só para o que realmente precisa ser público."},{icon:"🖼️",text:"Usa <Image> do Next.js — lazy loading, WebP automático, sem layout shift."},{icon:"🔗",text:"Usa <Link> do Next.js — prefetch automático, navegação sem reload de página."},{icon:"📊",text:"Usa Metadata API para SEO em vez de tags meta manuais (mais simples e correto)."}]},{id:10,type:"mini-challenge",tag:"🎯 Missão 01",title:"AQUECIMENTO",subtitle:"Crie seu primeiro projeto Next.js do zero",tasks:["Crie um projeto: npx create-next-app@latest meu-app","Explore a estrutura de pastas gerada automaticamente","Identifique layout.tsx e page.tsx na pasta /app","Altere o título via Metadata API (export const metadata)","Crie a rota /sobre com uma página simples","Use <Link> para navegar entre / e /sobre"],bonus:["Adicione uma imagem usando o componente <Image>","Troque o conteúdo do rodapé pelo seu nome e stack"],nextHref:"/modulos/nextjs/aula-02",nextLabel:"Aula 02 · P1: App Router & Roteamento →"}];a.s(["default",0,function(){return(0,b.jsx)(c.default,{slides:d,backHref:"/modulos/nextjs",backLabel:"Next.js",aulaLabel:"Aula 02 · P1 — Fundações do Next.js",aulaSlug:"nextjs-intro"})},"metadata",0,{title:"Aula 02 — Introdução ao Next.js · Web On Fire Academy"}],88608)},43697,a=>{a.n(a.i(88608))}];

//# sourceMappingURL=%5Broot-of-the-server%5D__0~bnbc4._.js.map