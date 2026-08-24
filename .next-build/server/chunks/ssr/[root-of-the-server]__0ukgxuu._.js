module.exports=[93695,(a,b,c)=>{b.exports=a.x("next/dist/shared/lib/no-fallback-error.external.js",()=>require("next/dist/shared/lib/no-fallback-error.external.js"))},64240,(a,b,c)=>{"use strict";function d(a){if("function"!=typeof WeakMap)return null;var b=new WeakMap,c=new WeakMap;return(d=function(a){return a?c:b})(a)}c._=function(a,b){if(!b&&a&&a.__esModule)return a;if(null===a||"object"!=typeof a&&"function"!=typeof a)return{default:a};var c=d(b);if(c&&c.has(a))return c.get(a);var e={__proto__:null},f=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var g in a)if("default"!==g&&Object.prototype.hasOwnProperty.call(a,g)){var h=f?Object.getOwnPropertyDescriptor(a,g):null;h&&(h.get||h.set)?Object.defineProperty(e,g,h):e[g]=a[g]}return e.default=a,c&&c.set(a,e),e}},50640,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0}),Object.defineProperty(c,"InvariantError",{enumerable:!0,get:function(){return d}});class d extends Error{constructor(a,b){super(`Invariant: ${a.endsWith(".")?a:a+"."} This is a bug in Next.js.`,b),this.name="InvariantError"}}},59469,a=>{"use strict";a.s(["default",()=>b]);let b=(0,a.i(11857).registerClientReference)(function(){throw Error("Attempted to call the default export of [project]/src/components/slides/SlidePresentation.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"[project]/src/components/slides/SlidePresentation.tsx <module evaluation>","default")},59394,a=>{"use strict";a.s(["default",()=>b]);let b=(0,a.i(11857).registerClientReference)(function(){throw Error("Attempted to call the default export of [project]/src/components/slides/SlidePresentation.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"[project]/src/components/slides/SlidePresentation.tsx","default")},9844,a=>{"use strict";a.i(59469);var b=a.i(59394);a.n(b)},10585,a=>{a.v("/_next/static/media/favicon.0x3dzn~oxb6tn.ico"+(globalThis.NEXT_CLIENT_ASSET_SUFFIX||""))},68611,a=>{"use strict";let b={src:a.i(10585).default,width:256,height:256};a.s(["default",0,b])},59864,a=>{"use strict";var b=a.i(7997),c=a.i(9844);let d=[{id:1,type:"cover",tag:"Módulo 02 · Aula 02 · P3",title:"PÁGINAS DE\nCONTEÚDO\n& URLs",subtitle:"Você tem rotas e componentes. Agora: como estruturar páginas e controlar as URLs."},{id:3,type:"files",tag:"Na prática",title:"Estrutura de páginas de conteúdo",codeLabel:"app/ — páginas típicas de um site institucional",code:`📁 src/app/
  📄 page.tsx              → /         (home)
  📄 layout.tsx            → layout global (Header + Footer)
  📁 sobre/
    📄 page.tsx            → /sobre
  📁 contato/
    📄 page.tsx            → /contato
  📁 blog/
    📄 page.tsx            → /blog     (lista de posts)
    📁 [slug]/
      📄 page.tsx          → /blog/meu-post
  📁 privacidade/
    📄 page.tsx            → /privacidade
  📁 termos/
    📄 page.tsx            → /termos`,tip:"Cada pasta é uma decisão de URL pública. Pense primeiro no que o usuário vai digitar no browser."},{id:4,type:"code",tag:"Página /sobre",title:"Criando uma página de conteúdo",codeLabel:"src/app/sobre/page.tsx",tip:"export const metadata define o título da aba e a description para SEO — sem bibliotecas extras, nativo do Next.js.",code:`import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre n\xf3s \xb7 MeuSite",
  description: "Conhe\xe7a a hist\xf3ria e a miss\xe3o da nossa empresa.",
};

export default function SobrePage() {
  return (
    <main style={{ maxWidth: "760px", margin: "0 auto", padding: "4rem 1.5rem" }}>
      <h1>Sobre n\xf3s</h1>
      <p>
        Somos uma empresa apaixonada por tecnologia. Fundada em 2020,
        nossa miss\xe3o \xe9 simplificar o desenvolvimento web para todos.
      </p>

      <h2>Nossa equipe</h2>
      <p>
        Times distribu\xeddos em 5 pa\xedses, todos remotos e com foco em
        entregar valor real para os nossos clientes.
      </p>
    </main>
  );
}`},{id:5,type:"files",tag:"O problema",title:"Quando a organização interna não combina com a URL",codeLabel:"Cenário: você quer agrupar páginas por tipo",code:`// Voc\xea quer organizar internamente assim:
📁 src/app/
  📁 paginas/             ← agrupa conte\xfado institucional
    📁 sobre/
      📄 page.tsx         → URL gerada: /paginas/sobre ❌
    📁 contato/
      📄 page.tsx         → URL gerada: /paginas/contato ❌

// Mas a URL p\xfablica que voc\xea quer \xe9:
//   /sobre     (n\xe3o /paginas/sobre)
//   /contato   (n\xe3o /paginas/contato)

// Duas solu\xe7\xf5es:
// ──────────────────────────────────────
// Op\xe7\xe3o A: Rewrites no next.config.ts
//   → mapeia /sobre para /paginas/sobre no servidor
//   → mais configura\xe7\xe3o, mais manuten\xe7\xe3o
//
// Op\xe7\xe3o B: Route Groups com par\xeanteses  ← recomendado
//   → app/(institucional)/sobre/page.tsx → URL: /sobre ✅
//   → zero configura\xe7\xe3o, zero restart`},{id:6,type:"code",tag:"Opção A — Rewrites",title:"Rewrites no next.config.ts",codeLabel:"next.config.ts",tip:"Rewrites são invisíveis ao browser — /sobre no endereço, mas Next.js serve /paginas/sobre internamente.",code:`import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      // /sobre → serve o conte\xfado de /paginas/sobre (invis\xedvel ao browser)
      { source: "/sobre",   destination: "/paginas/sobre" },
      { source: "/contato", destination: "/paginas/contato" },

      // Com padr\xe3o: /p/:slug → /paginas/:slug
      // Cobre /p/sobre, /p/contato, /p/qualquer em uma regra s\xf3
      { source: "/p/:slug", destination: "/paginas/:slug" },
    ];
  },
};

export default nextConfig;
// ⚠️ Rewrites exigem restart do servidor de dev (npm run dev)`},{id:7,type:"comparison",tag:"Rewrite vs Redirect",title:"Rewrite não é Redirect — a diferença importa",left:{label:"rewrite (invisível)",items:["URL do browser: /sobre","Next.js serve: /paginas/sobre","Usuário não percebe a troca","Browser não navega de novo","Ideal para organização interna"]},right:{label:"redirect (visível)",items:["URL do browser: /sobre","Browser recebe 301/302","Browser navega para /paginas/sobre","URL pública muda visivelmente","Ideal para migrar URLs antigas"]},tip:"Use rewrite para esconder estrutura interna. Use redirect para redirecionar URLs legadas (ex: /blog-antigo → /blog)."},{id:8,type:"code",tag:"Opção B — Route Groups",title:"Route Groups: a solução nativa (recomendada)",codeLabel:"app/ com Route Group — parênteses = sem URL",tip:"Parênteses na pasta = Next.js ignora na URL. Organização interna sem afetar URL pública — zero config, zero restart.",code:`// Estrutura com Route Group:
📁 src/app/
  📁 (institucional)/     ← par\xeanteses: N\xc3O vira segmento de URL
    📁 sobre/
      📄 page.tsx         → URL: /sobre ✅
    📁 contato/
      📄 page.tsx         → URL: /contato ✅
    📁 privacidade/
      📄 page.tsx         → URL: /privacidade ✅
  📁 (produto)/           ← outro grupo
    📁 blog/
      📄 page.tsx         → URL: /blog ✅
    📁 precos/
      📄 page.tsx         → URL: /precos ✅

// A pasta (institucional) existe no seu editor
// mas N\xc3O existe na URL. Zero next.config.ts, zero restart.
// B\xf4nus: cada grupo pode ter seu pr\xf3prio layout.tsx.`},{id:9,type:"code",tag:"Decisão",title:"Qual solução usar? Árvore de decisão",codeLabel:"guia rápido",code:`// Quero uma URL simples e j\xe1 sei a estrutura?
//   └── Crie a pasta direto: app/sobre/page.tsx → /sobre
//       ✅ Mais simples. Comece aqui.

// Quero organizar pastas internamente sem mudar a URL p\xfablica?
//   └── Route Group: app/(institucional)/sobre/page.tsx → /sobre
//       ✅ Solu\xe7\xe3o nativa. Zero config. Recomendada.

// Quero redirecionar uma URL antiga para uma nova (SEO, migra\xe7\xe3o)?
//   └── next.config.ts → redirects()
//       { source: "/blog-antigo", destination: "/blog", permanent: true }
//       ⚠️ Browser v\xea a URL nova (vis\xedvel).

// Quero que /publica sirva conte\xfado de /outra (proxy invis\xedvel)?
//   └── next.config.ts → rewrites()
//       { source: "/sobre", destination: "/paginas/sobre" }
//       ⚠️ Browser v\xea /sobre, Next.js serve /paginas/sobre.

// Preciso rotear para uma API ou servidor externo?
//   └── next.config.ts → rewrites() com destination externo
//       { source: "/api/:path*", destination: "https://api.meuservidor.com/:path*" }`},{id:10,type:"code",tag:"Bônus",title:"Layout exclusivo por Route Group",codeLabel:"app/(institucional)/layout.tsx",tip:"Cada Route Group pode ter layout.tsx próprio — sem afetar o RootLayout global nem outras rotas.",code:`// app/(institucional)/layout.tsx
// S\xf3 as p\xe1ginas dentro de (institucional) recebem este layout
export default function InstitucionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {/* Barra extra s\xf3 nas p\xe1ginas institucionais */}
      <div style={{ background: "#f5f5f5", padding: "0.5rem 2rem", fontSize: "0.875rem" }}>
        📌 Conte\xfado institucional
      </div>
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "2rem 1.5rem" }}>
        {children}
      </div>
    </div>
  );
}

// Resultado:
// /sobre    → RootLayout (Header/Footer) + InstitucionalLayout + page.tsx
// /blog     → RootLayout (Header/Footer) + page.tsx  (sem InstitucionalLayout)`},{id:11,type:"mini-challenge",tag:"🎯 Missão 05 · P3",title:"PÁGINAS E\nARQUITETURA\nDE URLs",subtitle:"Monte a estrutura de páginas de um site real",tasks:["Crie /sobre/page.tsx com metadata (title e description)","Crie /contato/page.tsx com um formulário simples (só HTML, sem lógica de envio)","Organize /sobre e /contato em um Route Group (institucional) — confirme que as URLs /sobre e /contato continuam funcionando"],bonus:["Adicione um layout.tsx exclusivo para o grupo (institucional) com uma barra extra no topo","Crie um rewrite em next.config.ts: /info → /sobre (e teste no browser)","Crie /blog/page.tsx com lista estática de 3 posts e /blog/[slug]/page.tsx com generateMetadata dinâmica"],nextHref:"/modulos/nextjs/aula-03",nextLabel:"Aula 03: Server vs Client →"}];a.s(["default",0,function(){return(0,b.jsx)(c.default,{slides:d,backHref:"/modulos/nextjs",backLabel:"Next.js",aulaLabel:"Aula 01 P3 — Páginas e URLs",aulaSlug:"nextjs-aula-paginas"})},"metadata",0,{title:"Aula 01 P3 — Páginas e URLs · Web On Fire Academy"}],59864)},87422,a=>{a.n(a.i(59864))}];

//# sourceMappingURL=%5Broot-of-the-server%5D__0ukgxuu._.js.map