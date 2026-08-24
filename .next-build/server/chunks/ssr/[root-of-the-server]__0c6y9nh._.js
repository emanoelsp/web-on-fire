module.exports=[93695,(a,b,c)=>{b.exports=a.x("next/dist/shared/lib/no-fallback-error.external.js",()=>require("next/dist/shared/lib/no-fallback-error.external.js"))},64240,(a,b,c)=>{"use strict";function d(a){if("function"!=typeof WeakMap)return null;var b=new WeakMap,c=new WeakMap;return(d=function(a){return a?c:b})(a)}c._=function(a,b){if(!b&&a&&a.__esModule)return a;if(null===a||"object"!=typeof a&&"function"!=typeof a)return{default:a};var c=d(b);if(c&&c.has(a))return c.get(a);var e={__proto__:null},f=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var g in a)if("default"!==g&&Object.prototype.hasOwnProperty.call(a,g)){var h=f?Object.getOwnPropertyDescriptor(a,g):null;h&&(h.get||h.set)?Object.defineProperty(e,g,h):e[g]=a[g]}return e.default=a,c&&c.set(a,e),e}},50640,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0}),Object.defineProperty(c,"InvariantError",{enumerable:!0,get:function(){return d}});class d extends Error{constructor(a,b){super(`Invariant: ${a.endsWith(".")?a:a+"."} This is a bug in Next.js.`,b),this.name="InvariantError"}}},59469,a=>{"use strict";a.s(["default",()=>b]);let b=(0,a.i(11857).registerClientReference)(function(){throw Error("Attempted to call the default export of [project]/src/components/slides/SlidePresentation.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"[project]/src/components/slides/SlidePresentation.tsx <module evaluation>","default")},59394,a=>{"use strict";a.s(["default",()=>b]);let b=(0,a.i(11857).registerClientReference)(function(){throw Error("Attempted to call the default export of [project]/src/components/slides/SlidePresentation.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"[project]/src/components/slides/SlidePresentation.tsx","default")},9844,a=>{"use strict";a.i(59469);var b=a.i(59394);a.n(b)},10585,a=>{a.v("/_next/static/media/favicon.0x3dzn~oxb6tn.ico"+(globalThis.NEXT_CLIENT_ASSET_SUFFIX||""))},68611,a=>{"use strict";let b={src:a.i(10585).default,width:256,height:256};a.s(["default",0,b])},27745,a=>{"use strict";var b=a.i(7997),c=a.i(9844);let d=[{id:1,type:"cover",tag:"Módulo 02 · Aula 04 · P1",title:"DATA FETCHING\n& MOCK DATA",subtitle:"Buscar dados no lugar certo, na hora certa — e com cache a seu favor."},{id:2,type:"concept",tag:"Mudança de mentalidade",title:"Onde os dados nascem no App Router",items:[{icon:"🔄",text:"No React tradicional: useEffect + useState + loading + fetch no BROWSER. Quatro peças para uma tarefa."},{icon:"🖥️",text:"No App Router: o Server Component é async e faz await do dado DIRETO no servidor — antes do HTML sair."},{icon:"🔐",text:"Bônus de segurança: chaves de API e banco ficam no servidor. O browser nunca vê."},{icon:"⚡",text:"Bônus de performance: o usuário recebe HTML já preenchido — sem spinner inicial, sem cascata de requests."}]},{id:3,type:"code",tag:"fetch nativo",title:"O padrão fundamental",codeLabel:"src/app/produtos/page.tsx",code:`// Server Component async — sem useEffect, sem useState
export default async function ProdutosPage() {
  const res = await fetch("https://fakestoreapi.com/products");

  if (!res.ok) throw new Error("Falha ao buscar produtos");

  const produtos: Produto[] = await res.json();

  return (
    <main>
      <h1>Cat\xe1logo ({produtos.length})</h1>
      <ul>
        {produtos.map((p) => (
          <li key={p.id}>{p.title} — R$ {p.price}</li>
        ))}
      </ul>
    </main>
  );
}`,tip:"O throw não é descuido: ele aciona o error.tsx mais próximo (assunto da Aula 05). Falha de fetch SEMPRE deve ser tratada."},{id:4,type:"concept",tag:"Mock Data",title:"Antes da API existir: simule",items:[{icon:"🎭",text:"Mock data = dados falsos com a MESMA forma dos reais. Você constrói a interface sem esperar o backend."},{icon:"📁",text:"Padrão do curso: um arquivo src/lib/mocks.ts com constantes tipadas exportadas."},{icon:"🔌",text:"O segredo é a camada de acesso: getProdutos() hoje lê a constante, amanhã chama o Firestore — e as PÁGINAS NÃO MUDAM."},{icon:"🧪",text:"É assim que equipes reais trabalham: front e back andam em paralelo, ligados por um contrato de tipos (olá, TypeScript!)."}]},{id:5,type:"code",tag:"Na prática",title:"Mock com contrato de tipos",codeLabel:"src/lib/mocks.ts + src/services/produtoService.ts",code:`// src/types/produto.ts — o CONTRATO
export interface Produto {
  id: number;
  nome: string;
  preco: number;
  categoria: "camisetas" | "canecas" | "adesivos";
}

// src/lib/mocks.ts — os dados falsos
export const PRODUTOS_MOCK: Produto[] = [
  { id: 1, nome: "Camiseta On Fire", preco: 79.9, categoria: "camisetas" },
  { id: 2, nome: "Caneca do Dev",    preco: 39.9, categoria: "canecas" },
  { id: 3, nome: "Adesivo Event Loop", preco: 9.9, categoria: "adesivos" },
];

// src/services/produtoService.ts — a CAMADA DE ACESSO
export async function getProdutos(): Promise<Produto[]> {
  // simula a lat\xeancia da rede (remova em produ\xe7\xe3o!)
  await new Promise((r) => setTimeout(r, 300));
  return PRODUTOS_MOCK;
  // amanh\xe3: return (await fetch(...)).json()  ← a p\xe1gina nem percebe
}`,tip:"Page importa do service, service importa do mock. Quando o dado real chegar, você troca UMA função — não dez páginas."},{id:6,type:"quiz",tag:"Quiz",title:"Arquitetura de dados",question:"Por que buscar dados numa função getProdutos() em vez de dar fetch direto dentro de cada página?",options:[{text:"Porque fetch não funciona dentro de page.tsx",correct:!1,explanation:"Funciona perfeitamente — o slide 3 fez exatamente isso. A questão é arquitetural, não técnica."},{text:"Para trocar a fonte de dados (mock → API → banco) sem tocar nas páginas",correct:!0,explanation:"Exato! A camada de serviço isola a ORIGEM do dado. Páginas dependem do contrato (tipos), não da fonte."},{text:"Porque funções async só existem em arquivos de serviço",correct:!1,explanation:"async existe em qualquer lugar — inclusive nos próprios Server Components."},{text:"Para o código ficar maior e mais profissional",correct:!1,explanation:"Mais arquivos ≠ mais profissional. A camada existe por um motivo concreto: desacoplar fonte e consumo."}],xp:15},{id:7,type:"diagram",tag:"Cache",title:"As 3 estratégias de cache do fetch",subtitle:"Você escolhe a validade de cada dado",layers:[{icon:"🧊",label:'ESTÁTICO — cache: "force-cache"',desc:"Busca 1 vez no build, serve para todos. Ideal: conteúdo que quase não muda (sobre, docs).",color:"blue",connector:"precisa atualizar de tempos em tempos?"},{icon:"⏱️",label:"ISR — next: { revalidate: 60 }",desc:"Cache válido por N segundos; depois o Next refaz em segundo plano. Ideal: catálogos, rankings.",color:"green",connector:"precisa ser sempre fresco?"},{icon:"🌊",label:'DINÂMICO — cache: "no-store"',desc:"Busca a cada requisição. Ideal: dashboard do usuário, carrinho, dados pessoais.",color:"fire"}],tip:"Pergunta-guia: 'quão desatualizado esse dado PODE ficar?' 1 hora? revalidate: 3600. Nem 1 segundo? no-store."},{id:8,type:"code",tag:"Cache na prática",title:"Os três em código",codeLabel:"estrategias.tsx",code:`// 🧊 EST\xc1TICO — padr\xe3o para dados que n\xe3o mudam
const sobre = await fetch("https://api.site.com/sobre", {
  cache: "force-cache",
});

// ⏱️ ISR — revalida a cada 60 segundos
const produtos = await fetch("https://api.site.com/produtos", {
  next: { revalidate: 60 },
});

// 🌊 DIN\xc2MICO — sempre fresco, nunca cacheia
const carrinho = await fetch("https://api.site.com/carrinho", {
  cache: "no-store",
});

// A p\xe1gina inteira tamb\xe9m pode declarar seu comportamento:
export const revalidate = 60;        // ISR na p\xe1gina toda
export const dynamic = "force-dynamic"; // tudo din\xe2mico`,tip:'Você já viu isso em ação: a página do Módulo 01 deste site usa dynamic = "force-dynamic" para os bloqueios de aula chegarem na hora.'},{id:9,type:"concept",tag:"Revalidação",title:"E quando o dado muda AGORA?",items:[{icon:"🏷️",text:'Tags de cache: fetch(url, { next: { tags: ["produtos"] } }) etiqueta a busca.'},{icon:"🔫",text:'revalidateTag("produtos"): derruba na hora todo cache com essa etiqueta — chamado após criar/editar um produto.'},{icon:"🛤️",text:'revalidatePath("/produtos"): alternativa por rota — atualiza uma página específica.'},{icon:"🔮",text:"Onde se chama isso? Em Server Actions — o assunto da Aula 04 do Módulo 04, quando os dados começarem a MUDAR de verdade."}]},{id:10,type:"fill-blank",tag:"Mão na massa",title:"Complete a estratégia",instruction:"O placar do jogo precisa atualizar no máximo a cada 30 segundos, sem rebuscar a cada acesso. Complete o valor da opção (digite só a parte que falta):",prefix:`const placar = await fetch(url, {
  next: { _______________ },
});`,answer:"revalidate: 30",hint:"É a opção de ISR: a palavra-chave e o número de segundos.",xp:20},{id:11,type:"concept",tag:"Boas práticas",title:"O checklist do data fetching",items:[{icon:"🖥️",text:"Busque no servidor por padrão. Fetch no cliente é exceção (dados que mudam com interação, tempo real)."},{icon:"🤝",text:"Requisições em paralelo: Promise.all([getProdutos(), getCategorias()]) — nunca await em fila sem necessidade."},{icon:"🚨",text:"Sempre cheque res.ok e lance erro — o error.tsx existe para isso."},{icon:"📦",text:"Tipar a resposta: const dados: Produto[] = await res.json(). Sem tipo, o TypeScript não te protege."}]},{id:12,type:"mini-challenge",tag:"🎯 Missão 04 · P1",title:"LOJA COM\nMOCK DATA",subtitle:"Monte o fluxo de dados completo — do mock ao cache",tasks:["Crie a interface Produto em src/types e o arquivo src/lib/mocks.ts com 6 produtos","Crie src/services/produtoService.ts com getProdutos() e getProdutoById(id) (com latência simulada)","Página /loja: Server Component async listando os produtos via service","Página /loja/[id]: detalhe do produto — notFound() se o id não existir","Busque um dado real: fetch https://api.github.com/users/SEU-USUARIO com revalidate: 3600 e exiba os stats","Teste: mude um mock, recarregue e veja a página refletir"],bonus:["Use Promise.all para buscar produtos e perfil do GitHub em paralelo","Adicione console.time no service e compare no-store vs force-cache"],xp:50,nextHref:"/modulos/nextjs/data-fetching-api",nextLabel:"Aula 03 · P2: De Mock Data para API Routes →"}];a.s(["default",0,function(){return(0,b.jsx)(c.default,{slides:d,backHref:"/modulos/nextjs",backLabel:"Next.js Core",aulaLabel:"Aula 03 — Data Fetching e Mock Data",aulaSlug:"nextjs-data-fetching"})},"metadata",0,{title:"Aula 03 — Data Fetching e Mock Data · Web On Fire Academy"}],27745)},21242,a=>{a.n(a.i(27745))}];

//# sourceMappingURL=%5Broot-of-the-server%5D__0c6y9nh._.js.map