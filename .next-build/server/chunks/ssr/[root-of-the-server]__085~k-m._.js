module.exports=[93695,(a,b,c)=>{b.exports=a.x("next/dist/shared/lib/no-fallback-error.external.js",()=>require("next/dist/shared/lib/no-fallback-error.external.js"))},64240,(a,b,c)=>{"use strict";function d(a){if("function"!=typeof WeakMap)return null;var b=new WeakMap,c=new WeakMap;return(d=function(a){return a?c:b})(a)}c._=function(a,b){if(!b&&a&&a.__esModule)return a;if(null===a||"object"!=typeof a&&"function"!=typeof a)return{default:a};var c=d(b);if(c&&c.has(a))return c.get(a);var e={__proto__:null},f=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var g in a)if("default"!==g&&Object.prototype.hasOwnProperty.call(a,g)){var h=f?Object.getOwnPropertyDescriptor(a,g):null;h&&(h.get||h.set)?Object.defineProperty(e,g,h):e[g]=a[g]}return e.default=a,c&&c.set(a,e),e}},50640,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0}),Object.defineProperty(c,"InvariantError",{enumerable:!0,get:function(){return d}});class d extends Error{constructor(a,b){super(`Invariant: ${a.endsWith(".")?a:a+"."} This is a bug in Next.js.`,b),this.name="InvariantError"}}},59469,a=>{"use strict";a.s(["default",()=>b]);let b=(0,a.i(11857).registerClientReference)(function(){throw Error("Attempted to call the default export of [project]/src/components/slides/SlidePresentation.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"[project]/src/components/slides/SlidePresentation.tsx <module evaluation>","default")},59394,a=>{"use strict";a.s(["default",()=>b]);let b=(0,a.i(11857).registerClientReference)(function(){throw Error("Attempted to call the default export of [project]/src/components/slides/SlidePresentation.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"[project]/src/components/slides/SlidePresentation.tsx","default")},9844,a=>{"use strict";a.i(59469);var b=a.i(59394);a.n(b)},10585,a=>{a.v("/_next/static/media/favicon.0x3dzn~oxb6tn.ico"+(globalThis.NEXT_CLIENT_ASSET_SUFFIX||""))},68611,a=>{"use strict";let b={src:a.i(10585).default,width:256,height:256};a.s(["default",0,b])},69401,a=>{"use strict";var b=a.i(7997),c=a.i(9844);let d=[{id:1,type:"cover",tag:"Módulo 02 · Aula 02 · P1",title:"APP ROUTER\n& ROTEAMENTO",subtitle:"No Next.js, a estrutura de pastas é o seu GPS."},{id:2,type:"concept",tag:"Conceito",title:"Rotas = Pastas",items:[{icon:"📁",text:'app/page.tsx → rota "/" (raiz do site)'},{icon:"📁",text:'app/sobre/page.tsx → rota "/sobre"'},{icon:"📁",text:'app/produtos/page.tsx → rota "/produtos"'},{icon:"💡",text:"Regra: toda pasta com um page.tsx vira uma rota acessível pelo browser."}],tip:"Você não configura rotas em nenhum arquivo separado. A estrutura de pastas é o roteador."},{id:3,type:"files",tag:"Na prática",title:"Estrutura de rotas na prática",codeLabel:"app/ — cada pasta é uma rota",code:`📁 src/app/
  📄 page.tsx              → /
  📁 sobre/
    📄 page.tsx            → /sobre
  📁 produtos/
    📄 page.tsx            → /produtos
    📁 [id]/
      📄 page.tsx          → /produtos/123 (din\xe2mica)
  📁 blog/
    📁 [slug]/
      📄 page.tsx          → /blog/meu-post (din\xe2mica)
    📁 [...path]/
      📄 page.tsx          → /blog/a/b/c (catch-all)
  📁 (marketing)/          → N\xc3O vira rota (grupo)
    📁 landing/
      📄 page.tsx          → /landing
  📁 (auth)/               → N\xc3O vira rota (grupo)
    📁 login/
      📄 page.tsx          → /login`},{id:4,type:"concept",tag:"Tipos de segmentos",title:"Quatro tipos de rota",items:[{icon:"🔒",text:"Estático: /produtos — URL fixa, sempre a mesma página."},{icon:"🔄",text:"Dinâmico [id]: /produtos/123 — o valor muda, a lógica é a mesma."},{icon:"🌊",text:"Catch-all [...path]: /docs/a/b/c — captura múltiplos segmentos numa array."},{icon:"📂",text:"Grupo (marketing): não afeta a URL, apenas organiza pastas sem criar rota nova."}]},{id:5,type:"code",tag:"Rotas dinâmicas",title:"Acessando params da rota",codeLabel:"src/app/produtos/[id]/page.tsx",tip:"No Next.js 15+, params é uma Promise — use await antes de acessar os valores.",code:`// A pasta [id] captura qualquer valor na URL
// /produtos/42 → params.id === "42"
// /produtos/camiseta → params.id === "camiseta"

export default async function ProdutoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; // await obrigat\xf3rio no Next.js 15+

  const produto = await fetch(\`/api/produtos/\${id}\`).then(r => r.json());

  return (
    <main>
      <h1>{produto.nome}</h1>
      <p>ID: {id}</p>
    </main>
  );
}

// Gera rotas est\xe1ticas em build time (opcional, para SSG)
export async function generateStaticParams() {
  const produtos = await fetch('/api/produtos').then(r => r.json());
  return produtos.map((p: { id: string }) => ({ id: p.id }));
}`},{id:7,type:"code",tag:"Layouts",title:"Layouts compartilhados",codeLabel:"src/app/dashboard/layout.tsx",tip:"O layout.tsx persiste entre navegações dentro da mesma pasta — ele não re-renderiza quando você troca de página.",code:`// Layout global — envolve TODAS as p\xe1ginas do app
// src/app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <Header />
        <main>{children}</main>  {/* cada page.tsx aparece aqui */}
        <Footer />
      </body>
    </html>
  );
}

// Layout do dashboard — envolve s\xf3 /dashboard/*
// src/app/dashboard/layout.tsx
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flex: 1 }}>{children}</div>
    </div>
  );
}`},{id:8,type:"comparison",tag:"Navegação",title:"Link vs useRouter — quando usar cada um",left:{label:"<Link>",items:["Navegação declarativa em JSX","Prefetch automático ao hover","SEO-friendly (tag <a> real)","Recomendado na maioria dos casos",'<Link href="/sobre">Sobre</Link>']},right:{label:"useRouter",items:["Navegação programática","Disparada por eventos/lógica","Após submit de formulário","Após operações assíncronas","router.push('/dashboard')"]},tip:"Regra: prefira <Link>. Use useRouter só quando a navegação depende de lógica (ex: redirecionar após login)."},{id:10,type:"concept",tag:"searchParams",title:"Parâmetros de busca e filtros",items:[{icon:"🔍",text:"URL: /produtos?categoria=eletronicos&ordem=preco"},{icon:"🖥️",text:"Server: acesse via prop searchParams na page.tsx — vem como Promise no Next.js 15+."},{icon:"🌐",text:"Client: use o hook useSearchParams() de next/navigation."},{icon:"🔄",text:"Atualizar filtros: router.push com URLSearchParams ou o hook useSearchParams + router.replace."}],tip:"searchParams não faz parte do sistema de rotas — são apenas query strings da URL. Ideal para filtros, buscas e paginação."},{id:11,type:"mini-challenge",tag:"🎯 Missão 05",title:"ROTEAMENTO\nNA PRÁTICA",subtitle:"Monte uma estrutura de rotas real",tasks:["Crie a rota /blog com uma lista de 3 posts fictícios","Crie /blog/[slug]/page.tsx para exibir um post pelo slug","Passe o slug como título da página","Use <Link> para navegar da lista para o post","Crie um layout.tsx para /blog com um header exclusivo"],bonus:["Adicione searchParams para filtrar posts por categoria","Use notFound() quando o slug não existir","Adicione metadata dinâmica com o título do post"],nextHref:"/modulos/nextjs/aula-componentes",nextLabel:"Aula 01 · P2: Componentes Reutilizáveis →"}];a.s(["default",0,function(){return(0,b.jsx)(c.default,{slides:d,backHref:"/modulos/nextjs",backLabel:"Next.js",aulaLabel:"Aula 01 — Roteamento e Navegação",aulaSlug:"nextjs-aula-02"})},"metadata",0,{title:"Aula 01 — App Router & Roteamento · Web On Fire Academy"}],69401)},91574,a=>{a.n(a.i(69401))}];

//# sourceMappingURL=%5Broot-of-the-server%5D__085~k-m._.js.map