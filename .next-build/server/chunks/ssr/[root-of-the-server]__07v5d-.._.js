module.exports=[93695,(a,b,c)=>{b.exports=a.x("next/dist/shared/lib/no-fallback-error.external.js",()=>require("next/dist/shared/lib/no-fallback-error.external.js"))},64240,(a,b,c)=>{"use strict";function d(a){if("function"!=typeof WeakMap)return null;var b=new WeakMap,c=new WeakMap;return(d=function(a){return a?c:b})(a)}c._=function(a,b){if(!b&&a&&a.__esModule)return a;if(null===a||"object"!=typeof a&&"function"!=typeof a)return{default:a};var c=d(b);if(c&&c.has(a))return c.get(a);var e={__proto__:null},f=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var g in a)if("default"!==g&&Object.prototype.hasOwnProperty.call(a,g)){var h=f?Object.getOwnPropertyDescriptor(a,g):null;h&&(h.get||h.set)?Object.defineProperty(e,g,h):e[g]=a[g]}return e.default=a,c&&c.set(a,e),e}},50640,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0}),Object.defineProperty(c,"InvariantError",{enumerable:!0,get:function(){return d}});class d extends Error{constructor(a,b){super(`Invariant: ${a.endsWith(".")?a:a+"."} This is a bug in Next.js.`,b),this.name="InvariantError"}}},59469,a=>{"use strict";a.s(["default",()=>b]);let b=(0,a.i(11857).registerClientReference)(function(){throw Error("Attempted to call the default export of [project]/src/components/slides/SlidePresentation.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"[project]/src/components/slides/SlidePresentation.tsx <module evaluation>","default")},59394,a=>{"use strict";a.s(["default",()=>b]);let b=(0,a.i(11857).registerClientReference)(function(){throw Error("Attempted to call the default export of [project]/src/components/slides/SlidePresentation.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"[project]/src/components/slides/SlidePresentation.tsx","default")},9844,a=>{"use strict";a.i(59469);var b=a.i(59394);a.n(b)},10585,a=>{a.v("/_next/static/media/favicon.0x3dzn~oxb6tn.ico"+(globalThis.NEXT_CLIENT_ASSET_SUFFIX||""))},68611,a=>{"use strict";let b={src:a.i(10585).default,width:256,height:256};a.s(["default",0,b])},31068,a=>{"use strict";var b=a.i(7997),c=a.i(9844);let d=[{id:1,type:"cover",tag:"Módulo 2.1 · Aula 02",title:"LOADING\nERROR\n& NOT FOUND",subtitle:"O usuário nunca mais vê uma tela em branco."},{id:2,type:"concept",tag:"O problema",title:"Três situações que todo app enfrenta",items:[{icon:"⏳",text:"Carregando: a página buscou dados no servidor e ainda está esperando — sem feedback, o usuário acha que travou."},{icon:"💥",text:"Erro: a API caiu, a rede falhou, ou o código lançou uma exceção — sem tratamento, a tela quebra feio."},{icon:"🔍",text:"Não encontrado: o aluno de ID 999 não existe — sem resposta clara, o usuário fica perdido."},{icon:"✅",text:"Next.js resolve os três com arquivos especiais: loading.tsx, error.tsx e not-found.tsx."}],tip:"Esses arquivos funcionam automaticamente — o Next envolve sua página com Suspense e ErrorBoundary por você."},{id:3,type:"concept",tag:"loading.tsx",title:"Loading automático com Suspense",items:[{icon:"📄",text:"Crie loading.tsx na mesma pasta que page.tsx — o Next exibe ele enquanto a página carrega."},{icon:"⚡",text:"Sem useState, sem useEffect — o Next embrulha a page.tsx num <Suspense> automaticamente."},{icon:"🏗️",text:"O layout e o Header aparecem imediatamente — só o conteúdo fica suspenso."},{icon:"🎨",text:"Use para skeletons (retângulos cinzas que imitam o layout) ou um spinner simples."}],tip:"O loading.tsx desaparece assim que a page.tsx termina de renderizar — transição suave, zero configuração."},{id:4,type:"code",tag:"loading.tsx",title:"Skeleton de alunos no FormFire",codeLabel:"src/app/alunos/loading.tsx",code:`// N\xe3o precisa de 'use client' — \xe9 Server Component
export default function Loading() {
  return (
    <main style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <div style={{
        height: "2rem", width: "200px",
        background: "#1e1e1e", borderRadius: "8px",
        marginBottom: "2rem", animation: "pulse 1.5s infinite",
      }} />

      {/* 3 skeleton cards */}
      {[1, 2, 3].map((i) => (
        <div key={i} style={{
          display: "flex", alignItems: "center", gap: "1rem",
          padding: "1rem", borderRadius: "12px",
          background: "#111", marginBottom: "0.75rem",
          animation: \`pulse 1.5s \${i * 0.15}s infinite\`,
        }}>
          {/* Avatar skeleton */}
          <div style={{
            width: "48px", height: "48px", borderRadius: "50%",
            background: "#1e1e1e", flexShrink: 0,
          }} />
          {/* Text skeletons */}
          <div style={{ flex: 1 }}>
            <div style={{ height: "1rem", width: "60%", background: "#1e1e1e", borderRadius: "4px", marginBottom: "0.5rem" }} />
            <div style={{ height: "0.75rem", width: "40%", background: "#181818", borderRadius: "4px" }} />
          </div>
        </div>
      ))}
    </main>
  );
}`,tip:"O delay que adicionamos na page.tsx (setTimeout 800ms) torna o skeleton visível — suficiente para ver o efeito em aula."},{id:5,type:"concept",tag:"error.tsx",title:"Error Boundary automático",items:[{icon:"🛡️",text:"error.tsx captura qualquer exceção lançada na page.tsx — tanto em Server quanto Client Components."},{icon:"🔁",text:"Recebe a prop reset() — permite tentar novamente sem recarregar a página inteira."},{icon:"⚠️",text:"OBRIGATÓRIO: precisa de 'use client' no topo — o botão de retry precisa de interatividade."},{icon:"📍",text:"Cada pasta pode ter seu error.tsx — o erro é capturado no nível mais próximo."}],tip:"error.tsx NÃO captura erros dentro do próprio layout.tsx — para isso, crie global-error.tsx na raiz do /app."},{id:6,type:"code",tag:"error.tsx",title:"Error boundary no FormFire",codeLabel:"src/app/alunos/error.tsx",code:`"use client"; // obrigat\xf3rio — precisa de interatividade

import { useEffect } from "react";

export default function AlunosError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // log para monitoramento (Sentry, Datadog, etc.)
    console.error("[FormFire] Erro em /alunos:", error);
  }, [error]);

  return (
    <main style={{ padding: "4rem 2rem", textAlign: "center" }}>
      <p style={{ fontSize: "3rem", marginBottom: "1rem" }}>💥</p>
      <h2 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>
        Algo deu errado
      </h2>
      <p style={{ color: "#888", marginBottom: "2rem" }}>
        {error.message ?? "Erro inesperado. Tente novamente."}
      </p>
      <button
        onClick={reset}
        style={{
          padding: "0.75rem 2rem", borderRadius: "8px",
          background: "#FF5500", color: "#fff",
          border: "none", cursor: "pointer", fontWeight: 700,
        }}
      >
        Tentar novamente
      </button>
    </main>
  );
}`},{id:7,type:"concept",tag:"not-found.tsx",title:"Página 404 personalizada",items:[{icon:"📄",text:"not-found.tsx é renderizado quando sua função chama notFound() explicitamente."},{icon:"🎯",text:"notFound() vem de 'next/navigation' — use dentro de Server Components quando o recurso não existe."},{icon:"🌐",text:"O arquivo na raiz do /app (app/not-found.tsx) é o 404 global de toda a aplicação."},{icon:"📁",text:"Cada sub-rota pode ter seu próprio not-found.tsx com mensagem contextual."}],tip:"notFound() interrompe a renderização imediatamente (igual a throw) — não precisa de return depois da chamada."},{id:8,type:"code",tag:"notFound()",title:"Detalhe do aluno com 404 profissional",codeLabel:"src/app/alunos/[id]/page.tsx",code:`import { notFound } from "next/navigation";
import { STUDENTS } from "@/data/students";

export default async function StudentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const student = STUDENTS.find((s) => s.id === id);

  // antes: if (!student) return <p>N\xe3o encontrado</p>
  // agora: renderiza o not-found.tsx mais pr\xf3ximo
  if (!student) notFound();

  return (
    <main style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
      <h1>{student.nome}</h1>
      <p>Email: {student.email}</p>
      <p>CPF: {student.cpf}</p>
      <p>Telefone: {student.telefone}</p>
      <p>Turma: {student.turma}</p>
    </main>
  );
}`,tip:"Se não existir not-found.tsx local, o Next sobe na árvore de pastas até encontrar um — incluindo o global."},{id:9,type:"code",tag:"not-found.tsx",title:"Página 404 customizada para /alunos",codeLabel:"src/app/alunos/not-found.tsx",code:`import Link from "next/link";

// N\xe3o precisa de 'use client' — sem interatividade
export default function AlunoNotFound() {
  return (
    <main style={{ padding: "4rem 2rem", textAlign: "center" }}>
      <p style={{ fontSize: "4rem" }}>🔍</p>
      <h2 style={{ fontSize: "1.75rem", marginBottom: "0.5rem" }}>
        Aluno n\xe3o encontrado
      </h2>
      <p style={{ color: "#888", marginBottom: "2rem" }}>
        O ID informado n\xe3o corresponde a nenhum aluno cadastrado.
      </p>
      <Link
        href="/alunos"
        style={{
          padding: "0.75rem 2rem", borderRadius: "8px",
          background: "#FF5500", color: "#fff",
          textDecoration: "none", fontWeight: 700,
        }}
      >
        ← Voltar para a lista
      </Link>
    </main>
  );
}`,tip:"Personalize o not-found.tsx por contexto: o 404 de /alunos sugere voltar para a lista, enquanto o global é mais genérico."},{id:10,type:"quiz",tag:"Quiz",title:"Qual arquivo precisa de 'use client'?",question:"Dos três arquivos de UX estrutural, qual OBRIGATORIAMENTE precisa de 'use client'?",options:[{text:"loading.tsx",correct:!1,explanation:"loading.tsx é um Server Component puro — sem interatividade, sem 'use client'."},{text:"error.tsx",correct:!0,explanation:"Correto! error.tsx precisa de 'use client' porque recebe a prop reset() — uma função para chamar ao clicar no botão de retry."},{text:"not-found.tsx",correct:!1,explanation:"not-found.tsx pode ser Server Component. Só use 'use client' se adicionar interatividade própria."},{text:"Todos os três",correct:!1,explanation:"Só o error.tsx é obrigatório. Os outros dois são Server Components por padrão."}],xp:15},{id:11,type:"mini-challenge",tag:"🎯 Missão F2",title:"UX\nCOMPLETA",subtitle:"O FormFire nunca mais deixa o usuário em branco",tasks:["Crie src/app/alunos/loading.tsx com skeleton de pelo menos 3 cards (retângulos animados)","Crie src/app/alunos/error.tsx com 'use client', mensagem de erro e botão 'Tentar novamente'","Crie src/app/alunos/not-found.tsx com mensagem contextual e link para voltar","Atualize /alunos/[id]/page.tsx para chamar notFound() quando o aluno não for encontrado","Teste: acesse /alunos/9999 e confirme que a página 404 aparece"],bonus:["Adicione um await setTimeout(1500) na page.tsx de alunos e veja o skeleton animado","Crie um botão 'Forçar erro' no /alunos que lança throw new Error('teste') — veja o error.tsx em ação"],xp:45,nextHref:"/modulos/forms/aula-03",nextLabel:"Aula 03: Otimizações & Lazy Loading →"}];a.s(["default",0,function(){return(0,b.jsx)(c.default,{slides:d,backHref:"/modulos/forms",backLabel:"Formulários & UX",aulaLabel:"Aula 02 — Loading, Error & Not Found",aulaSlug:"forms-aula-02"})},"metadata",0,{title:"Aula 02 — Loading, Error & Not Found · Web On Fire Academy"}],31068)},18619,a=>{a.n(a.i(31068))}];

//# sourceMappingURL=%5Broot-of-the-server%5D__07v5d-.._.js.map