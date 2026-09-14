module.exports=[93695,(a,b,c)=>{b.exports=a.x("next/dist/shared/lib/no-fallback-error.external.js",()=>require("next/dist/shared/lib/no-fallback-error.external.js"))},64240,(a,b,c)=>{"use strict";function d(a){if("function"!=typeof WeakMap)return null;var b=new WeakMap,c=new WeakMap;return(d=function(a){return a?c:b})(a)}c._=function(a,b){if(!b&&a&&a.__esModule)return a;if(null===a||"object"!=typeof a&&"function"!=typeof a)return{default:a};var c=d(b);if(c&&c.has(a))return c.get(a);var e={__proto__:null},f=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var g in a)if("default"!==g&&Object.prototype.hasOwnProperty.call(a,g)){var h=f?Object.getOwnPropertyDescriptor(a,g):null;h&&(h.get||h.set)?Object.defineProperty(e,g,h):e[g]=a[g]}return e.default=a,c&&c.set(a,e),e}},50640,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0}),Object.defineProperty(c,"InvariantError",{enumerable:!0,get:function(){return d}});class d extends Error{constructor(a,b){super(`Invariant: ${a.endsWith(".")?a:a+"."} This is a bug in Next.js.`,b),this.name="InvariantError"}}},59469,a=>{"use strict";a.s(["default",()=>b]);let b=(0,a.i(11857).registerClientReference)(function(){throw Error("Attempted to call the default export of [project]/src/components/slides/SlidePresentation.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"[project]/src/components/slides/SlidePresentation.tsx <module evaluation>","default")},59394,a=>{"use strict";a.s(["default",()=>b]);let b=(0,a.i(11857).registerClientReference)(function(){throw Error("Attempted to call the default export of [project]/src/components/slides/SlidePresentation.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"[project]/src/components/slides/SlidePresentation.tsx","default")},9844,a=>{"use strict";a.i(59469);var b=a.i(59394);a.n(b)},10585,a=>{a.v("/_next/static/media/favicon.0x3dzn~oxb6tn.ico"+(globalThis.NEXT_CLIENT_ASSET_SUFFIX||""))},68611,a=>{"use strict";let b={src:a.i(10585).default,width:256,height:256};a.s(["default",0,b])},83910,a=>{"use strict";var b=a.i(7997),c=a.i(9844);let d=[{id:1,type:"cover",tag:"Módulo 2.1 · Aula 03",title:"OTIMIZAÇÕES\n& LAZY\nLOADING",subtitle:"Menos peso, carregamento inteligente, Core Web Vitals no verde."},{id:2,type:"concept",tag:"O problema",title:"Por que o FormFire pode ficar lento",items:[{icon:"🖼️",text:"Avatares crus: uma foto de 2MB num card de 48px desperdiça banda e trava o carregamento."},{icon:"🔤",text:"Fontes externas: o texto pisca esperando o Google Fonts responder (FOUT — Flash of Unstyled Text)."},{icon:"📦",text:"Modal de edição pesado: a lib de formulário do modal vai no bundle inicial, mesmo que o usuário nunca abra."},{icon:"📉",text:"Isso tem preço: cada 1s a mais de carregamento afeta a experiência — e o Lighthouse te cobra."}],tip:"Otimizar não é pré-maturidade — é colocar a ferramenta certa no lugar certo. Três arquivos resolvem os três problemas."},{id:3,type:"code",tag:"next/image",title:"Avatar otimizado na lista de alunos",codeLabel:"src/app/alunos/page.tsx",code:`import Image from "next/image";
import { STUDENTS } from "@/data/students";

export default async function AlunosPage() {
  await new Promise((r) => setTimeout(r, 800));

  return (
    <main style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <h1>Alunos</h1>
      {STUDENTS.map((s) => (
        <div key={s.id} style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "1rem" }}>

          {/* ❌ ANTES: <img src={s.avatarUrl} width={48} height={48} /> */}
          {/* ✅ DEPOIS: WebP autom\xe1tico + lazy loading + zero layout shift */}
          {s.avatarUrl && (
            <Image
              src={s.avatarUrl}
              alt={\`Avatar de \${s.nome}\`}
              width={48}
              height={48}
              style={{ borderRadius: "50%" }}
            />
          )}

          <div>
            <strong>{s.nome}</strong>
            <p style={{ color: "#888", fontSize: "0.85rem" }}>{s.email}</p>
          </div>
        </div>
      ))}
    </main>
  );
}`,tip:"Para imagens externas (i.pravatar.cc), adicione o domínio em next.config.ts: images.remotePatterns. O Next avisa no console se você esquecer."},{id:4,type:"code",tag:"next.config + next/font",title:"Permitindo imagens externas + fontes otimizadas",codeLabel:"next.config.ts  +  src/app/layout.tsx",code:`// next.config.ts — permite imagens de dom\xednios externos
import type { NextConfig } from "next";
const config: NextConfig = {
  images: {
    remotePatterns: [{ hostname: "i.pravatar.cc" }],
  },
};
export default config;

// -------------------------------------------------
// src/app/layout.tsx — fontes sem Google Fonts em runtime
import { Inter, JetBrains_Mono } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // O Next baixa a fonte no BUILD e serve do SEU dom\xednio
    // → sem request ao Google em runtime, sem piscada, com privacidade
    <html lang="pt-BR" className={\`\${inter.variable} \${mono.variable}\`}>
      <body style={{ fontFamily: "var(--font-sans)" }}>{children}</body>
    </html>
  );
}`,tip:"next/font é uma das otimizações mais simples e com maior impacto visual — zero piscada de texto garantida."},{id:5,type:"concept",tag:"next/dynamic",title:"Importação dinâmica — carregue só quando precisar",items:[{icon:"✂️",text:"O Next já divide o bundle por rota automaticamente — /alunos não carrega o código de /cadastro."},{icon:"🎯",text:"Mas dentro de uma página, componentes pesados vão todos juntos no mesmo chunk..."},{icon:"⏳",text:"...a menos que você use next/dynamic: importa o componente SÓ quando ele for renderizar."},{icon:"🏆",text:"Candidatos ideais: modais, drawers, editores de texto, gráficos, mapas — pesados e não visíveis de imediato."}],tip:"Se o usuário precisa clicar para ver o componente, ele provavelmente é um bom candidato ao dynamic."},{id:6,type:"code",tag:"next/dynamic",title:"Modal de edição carregado sob demanda",codeLabel:"src/app/alunos/page.tsx",code:`"use client"; // precisamos do useState para controlar o modal
import dynamic from "next/dynamic";
import { useState } from "react";
import Image from "next/image";
import { STUDENTS } from "@/data/students";

// ModalEdicao fica em src/components/ModalEdicao.tsx
// Pode ser pesado (usa react-hook-form + Zod + l\xf3gica de API)
const ModalEdicao = dynamic(
  () => import("@/components/ModalEdicao"),
  {
    loading: () => <p style={{ textAlign: "center" }}>Carregando editor...</p>,
    ssr: false, // modal n\xe3o precisa ser renderizado no servidor
  }
);

export default function AlunosPage() {
  const [editando, setEditando] = useState<string | null>(null);

  return (
    <main style={{ padding: "2rem" }}>
      {STUDENTS.map((s) => (
        <div key={s.id}>
          {s.avatarUrl && <Image src={s.avatarUrl} alt={s.nome} width={48} height={48} />}
          <strong>{s.nome}</strong>
          {/* Download do ModalEdicao S\xd3 acontece ao clicar */}
          <button onClick={() => setEditando(s.id)}>Editar</button>
        </div>
      ))}

      {/* Modal s\xf3 renderiza (e baixa) quando editando !== null */}
      {editando && (
        <ModalEdicao alunoId={editando} onClose={() => setEditando(null)} />
      )}
    </main>
  );
}`,tip:"ssr: false é indicado para componentes que usam window, document ou libs de UI que não suportam SSR."},{id:7,type:"comparison",tag:"Antes vs Depois",title:"O impacto das três otimizações",left:{label:"FormFire sem otimizar",items:["<img> de 2MB por aluno, sem lazy","Google Fonts carregado em runtime","Modal pesado no bundle inicial","Layout pula ao carregar imagem","Lighthouse: vermelho/amarelo"]},right:{label:"FormFire otimizado",items:["WebP no tamanho certo, lazy por padrão","Fonte servida do próprio domínio","Modal baixa só ao clicar em Editar","Espaço reservado: zero layout shift","Lighthouse: Core Web Vitals no verde"]},tip:"Rode o Lighthouse (DevTools → aba Lighthouse → Performance) antes e depois — ver a nota subir é o melhor feedback."},{id:8,type:"quiz",tag:"Quiz",title:"Qual componente é o melhor candidato ao dynamic?",question:"No FormFire, qual destes deveria ser carregado com next/dynamic?",options:[{text:"O <header> com logo e navegação, visível em todas as páginas",correct:!1,explanation:"Header é imediatamente visível — adiar o download pioraria a experiência."},{text:"O modal de edição de aluno, que abre só ao clicar em 'Editar'",correct:!0,explanation:"Perfeito: componente pesado, invisível inicialmente, que muitos usuários nunca abrem. Lazy loading ideal."},{text:"A lista de alunos, que aparece assim que a página abre",correct:!1,explanation:"A lista é o conteúdo principal da página — adiar ela resulta em tela em branco."},{text:"O botão 'Cadastrar Aluno'",correct:!1,explanation:"Botões são elementos triviais — não pesam nada e são essenciais para a UX imediata."}],xp:15},{id:9,type:"fill-blank",tag:"Mão na massa",title:"Complete a importação dinâmica",instruction:"Complete o nome da função e a opção que impede renderização no servidor:",prefix:`import _______ from "next/dynamic";

const ModalEdicao = _______(() => import("@/components/ModalEdicao"), {
  loading: () => <p>Carregando...</p>,
  _______: false,
});`,answer:"dynamic",hint:"O nome da função é idêntico ao nome do módulo de onde ela vem.",xp:20},{id:10,type:"concept",tag:"npm run build",title:"Lendo as métricas de bundle",items:[{icon:"🔨",text:"npm run build exibe uma tabela com o tamanho de cada rota após a compilação."},{icon:"🟢",text:"Rotas em verde: bundle pequeno — ótimo."},{icon:"🟡",text:"Rotas em amarelo: bundle médio — avalie se há imports desnecessários."},{icon:"🔴",text:"Rotas em vermelho: bundle grande — use next/dynamic para os componentes mais pesados."}],tip:"Use 'ANALYZE=true npm run build' com o pacote @next/bundle-analyzer para ver graficamente o que pesa mais."},{id:11,type:"mini-challenge",tag:"🎯 Missão F3",title:"FORMFIRE\nNO VERDE",subtitle:"Otimize as três camadas do projeto",tasks:["Substitua todas as <img> por <Image> do next/image nos cards de aluno","Configure remotePatterns em next.config.ts para i.pravatar.cc (ou seu CDN de imagens)","Configure duas fontes com next/font/google no layout.tsx (ex: Inter + JetBrains Mono)","Crie src/components/ModalEdicao.tsx (pode ser simples: título + formulário básico)","Importe ModalEdicao com next/dynamic na página de alunos (com loading e ssr: false)","Rode npm run build e anote o tamanho da rota /alunos antes e depois do dynamic"],bonus:["Use placeholder='blur' e blurDataURL numa imagem local de aluno","Adicione priority={true} apenas no avatar do primeiro aluno da lista (acima da dobra)"],xp:50,nextHref:"/modulos/forms/aula-04",nextLabel:"Aula 04: Validação com Zod →"}];a.s(["default",0,function(){return(0,b.jsx)(c.default,{slides:d,backHref:"/modulos/forms",backLabel:"Formulários & UX",aulaLabel:"Aula 03 — Otimizações & Lazy Loading",aulaSlug:"forms-aula-03"})},"metadata",0,{title:"Aula 03 — Otimizações & Lazy Loading · Web On Fire Academy"}],83910)},5078,a=>{a.n(a.i(83910))}];

//# sourceMappingURL=%5Broot-of-the-server%5D__07h6cok._.js.map