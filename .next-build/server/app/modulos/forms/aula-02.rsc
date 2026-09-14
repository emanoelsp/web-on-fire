1:"$Sreact.fragment"
2:I[57951,["/_next/static/chunks/10y4wjnwnffjh.js","/_next/static/chunks/0rcpm6flhlhx8.js","/_next/static/chunks/0d3shmwh5_nmn.js"],"AuthProvider"]
3:I[40168,["/_next/static/chunks/10y4wjnwnffjh.js","/_next/static/chunks/0rcpm6flhlhx8.js","/_next/static/chunks/0d3shmwh5_nmn.js"],"ProgressSync"]
4:I[39756,["/_next/static/chunks/10y4wjnwnffjh.js","/_next/static/chunks/0rcpm6flhlhx8.js","/_next/static/chunks/0d3shmwh5_nmn.js"],"default"]
5:I[37457,["/_next/static/chunks/10y4wjnwnffjh.js","/_next/static/chunks/0rcpm6flhlhx8.js","/_next/static/chunks/0d3shmwh5_nmn.js"],"default"]
6:I[61921,["/_next/static/chunks/10y4wjnwnffjh.js","/_next/static/chunks/0rcpm6flhlhx8.js","/_next/static/chunks/0d3shmwh5_nmn.js","/_next/static/chunks/074b8wc5hknnt.js"],"default"]
d:I[68027,["/_next/static/chunks/10y4wjnwnffjh.js","/_next/static/chunks/0rcpm6flhlhx8.js","/_next/static/chunks/0d3shmwh5_nmn.js"],"default",1]
:HL["/_next/static/chunks/154mv0jpvr9bj.css","style"]
:HL["/_next/static/media/70bc3e132a0a741e-s.p.1409xf.ylxg8g.woff2","font",{"crossOrigin":"","type":"font/woff2"}]
:HL["/_next/static/media/83afe278b6a6bb3c-s.p.0q-301v4kxxnr.woff2","font",{"crossOrigin":"","type":"font/woff2"}]
:HL["/_next/static/media/fabcf92ba1ccea36-s.p.0lwj123ije5i..woff2","font",{"crossOrigin":"","type":"font/woff2"}]
7:T4e0,// Não precisa de 'use client' — é Server Component
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
          animation: `pulse 1.5s ${i * 0.15}s infinite`,
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
}8:T417,"use client"; // obrigatório — precisa de interatividade

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
}0:{"P":null,"c":["","modulos","forms","aula-02"],"q":"","i":false,"f":[[["",{"children":["modulos",{"children":["forms",{"children":["aula-02",{"children":["__PAGE__",{}]}]}]}]},"$undefined","$undefined",16],[["$","$1","c",{"children":[[["$","link","0",{"rel":"stylesheet","href":"/_next/static/chunks/154mv0jpvr9bj.css","precedence":"next","crossOrigin":"$undefined","nonce":"$undefined"}],["$","script","script-0",{"src":"/_next/static/chunks/10y4wjnwnffjh.js","async":true,"nonce":"$undefined"}],["$","script","script-1",{"src":"/_next/static/chunks/0rcpm6flhlhx8.js","async":true,"nonce":"$undefined"}],["$","script","script-2",{"src":"/_next/static/chunks/0d3shmwh5_nmn.js","async":true,"nonce":"$undefined"}]],["$","html",null,{"lang":"pt-BR","className":"bebas_neue_f4d929f7-module__iQlc8G__variable inter_786c1081-module__J60SBq__variable jetbrains_mono_8dec50e9-module__V6cRDq__variable","children":["$","body",null,{"style":{"fontFamily":"var(--font-sans), sans-serif"},"children":["$","$L2",null,{"children":[["$","$L3",null,{}],["$","$L4",null,{"parallelRouterKey":"children","error":"$undefined","errorStyles":"$undefined","errorScripts":"$undefined","template":["$","$L5",null,{}],"templateStyles":"$undefined","templateScripts":"$undefined","notFound":[[["$","title",null,{"children":"404: This page could not be found."}],["$","div",null,{"style":{"fontFamily":"system-ui,\"Segoe UI\",Roboto,Helvetica,Arial,sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\"","height":"100vh","textAlign":"center","display":"flex","flexDirection":"column","alignItems":"center","justifyContent":"center"},"children":["$","div",null,{"children":[["$","style",null,{"dangerouslySetInnerHTML":{"__html":"body{color:#000;background:#fff;margin:0}.next-error-h1{border-right:1px solid rgba(0,0,0,.3)}@media (prefers-color-scheme:dark){body{color:#fff;background:#000}.next-error-h1{border-right:1px solid rgba(255,255,255,.3)}}"}}],["$","h1",null,{"className":"next-error-h1","style":{"display":"inline-block","margin":"0 20px 0 0","padding":"0 23px 0 0","fontSize":24,"fontWeight":500,"verticalAlign":"top","lineHeight":"49px"},"children":404}],["$","div",null,{"style":{"display":"inline-block"},"children":["$","h2",null,{"style":{"fontSize":14,"fontWeight":400,"lineHeight":"49px","margin":0},"children":"This page could not be found."}]}]]}]}]],[]],"forbidden":"$undefined","unauthorized":"$undefined"}]]}]}]}]]}],{"children":[["$","$1","c",{"children":[null,["$","$L4",null,{"parallelRouterKey":"children","error":"$undefined","errorStyles":"$undefined","errorScripts":"$undefined","template":["$","$L5",null,{}],"templateStyles":"$undefined","templateScripts":"$undefined","notFound":"$undefined","forbidden":"$undefined","unauthorized":"$undefined"}]]}],{"children":[["$","$1","c",{"children":[null,["$","$L4",null,{"parallelRouterKey":"children","error":"$undefined","errorStyles":"$undefined","errorScripts":"$undefined","template":["$","$L5",null,{}],"templateStyles":"$undefined","templateScripts":"$undefined","notFound":"$undefined","forbidden":"$undefined","unauthorized":"$undefined"}]]}],{"children":[["$","$1","c",{"children":[null,["$","$L4",null,{"parallelRouterKey":"children","error":"$undefined","errorStyles":"$undefined","errorScripts":"$undefined","template":["$","$L5",null,{}],"templateStyles":"$undefined","templateScripts":"$undefined","notFound":"$undefined","forbidden":"$undefined","unauthorized":"$undefined"}]]}],{"children":[["$","$1","c",{"children":[["$","$L6",null,{"slides":[{"id":1,"type":"cover","tag":"Módulo 2.1 · Aula 02","title":"LOADING\nERROR\n& NOT FOUND","subtitle":"O usuário nunca mais vê uma tela em branco."},{"id":2,"type":"concept","tag":"O problema","title":"Três situações que todo app enfrenta","items":[{"icon":"⏳","text":"Carregando: a página buscou dados no servidor e ainda está esperando — sem feedback, o usuário acha que travou."},{"icon":"💥","text":"Erro: a API caiu, a rede falhou, ou o código lançou uma exceção — sem tratamento, a tela quebra feio."},{"icon":"🔍","text":"Não encontrado: o aluno de ID 999 não existe — sem resposta clara, o usuário fica perdido."},{"icon":"✅","text":"Next.js resolve os três com arquivos especiais: loading.tsx, error.tsx e not-found.tsx."}],"tip":"Esses arquivos funcionam automaticamente — o Next envolve sua página com Suspense e ErrorBoundary por você."},{"id":3,"type":"concept","tag":"loading.tsx","title":"Loading automático com Suspense","items":[{"icon":"📄","text":"Crie loading.tsx na mesma pasta que page.tsx — o Next exibe ele enquanto a página carrega."},{"icon":"⚡","text":"Sem useState, sem useEffect — o Next embrulha a page.tsx num <Suspense> automaticamente."},{"icon":"🏗️","text":"O layout e o Header aparecem imediatamente — só o conteúdo fica suspenso."},{"icon":"🎨","text":"Use para skeletons (retângulos cinzas que imitam o layout) ou um spinner simples."}],"tip":"O loading.tsx desaparece assim que a page.tsx termina de renderizar — transição suave, zero configuração."},{"id":4,"type":"code","tag":"loading.tsx","title":"Skeleton de alunos no FormFire","codeLabel":"src/app/alunos/loading.tsx","code":"$7","tip":"O delay que adicionamos na page.tsx (setTimeout 800ms) torna o skeleton visível — suficiente para ver o efeito em aula."},{"id":5,"type":"concept","tag":"error.tsx","title":"Error Boundary automático","items":[{"icon":"🛡️","text":"error.tsx captura qualquer exceção lançada na page.tsx — tanto em Server quanto Client Components."},{"icon":"🔁","text":"Recebe a prop reset() — permite tentar novamente sem recarregar a página inteira."},{"icon":"⚠️","text":"OBRIGATÓRIO: precisa de 'use client' no topo — o botão de retry precisa de interatividade."},{"icon":"📍","text":"Cada pasta pode ter seu error.tsx — o erro é capturado no nível mais próximo."}],"tip":"error.tsx NÃO captura erros dentro do próprio layout.tsx — para isso, crie global-error.tsx na raiz do /app."},{"id":6,"type":"code","tag":"error.tsx","title":"Error boundary no FormFire","codeLabel":"src/app/alunos/error.tsx","code":"$8"},{"id":7,"type":"concept","tag":"not-found.tsx","title":"Página 404 personalizada","items":[{"icon":"📄","text":"not-found.tsx é renderizado quando sua função chama notFound() explicitamente."},{"icon":"🎯","text":"notFound() vem de 'next/navigation' — use dentro de Server Components quando o recurso não existe."},{"icon":"🌐","text":"O arquivo na raiz do /app (app/not-found.tsx) é o 404 global de toda a aplicação."},{"icon":"📁","text":"Cada sub-rota pode ter seu próprio not-found.tsx com mensagem contextual."}],"tip":"notFound() interrompe a renderização imediatamente (igual a throw) — não precisa de return depois da chamada."},{"id":8,"type":"code","tag":"notFound()","title":"Detalhe do aluno com 404 profissional","codeLabel":"src/app/alunos/[id]/page.tsx","code":"import { notFound } from \"next/navigation\";\nimport { STUDENTS } from \"@/data/students\";\n\nexport default async function StudentPage({\n  params,\n}: {\n  params: Promise<{ id: string }>;\n}) {\n  const { id } = await params;\n  const student = STUDENTS.find((s) => s.id === id);\n\n  // antes: if (!student) return <p>Não encontrado</p>\n  // agora: renderiza o not-found.tsx mais próximo\n  if (!student) notFound();\n\n  return (\n    <main style={{ padding: \"2rem\", maxWidth: \"600px\", margin: \"0 auto\" }}>\n      <h1>{student.nome}</h1>\n      <p>Email: {student.email}</p>\n      <p>CPF: {student.cpf}</p>\n      <p>Telefone: {student.telefone}</p>\n      <p>Turma: {student.turma}</p>\n    </main>\n  );\n}","tip":"Se não existir not-found.tsx local, o Next sobe na árvore de pastas até encontrar um — incluindo o global."},{"id":9,"type":"code","tag":"not-found.tsx","title":"Página 404 customizada para /alunos","codeLabel":"src/app/alunos/not-found.tsx","code":"import Link from \"next/link\";\n\n// Não precisa de 'use client' — sem interatividade\nexport default function AlunoNotFound() {\n  return (\n    <main style={{ padding: \"4rem 2rem\", textAlign: \"center\" }}>\n      <p style={{ fontSize: \"4rem\" }}>🔍</p>\n      <h2 style={{ fontSize: \"1.75rem\", marginBottom: \"0.5rem\" }}>\n        Aluno não encontrado\n      </h2>\n      <p style={{ color: \"#888\", marginBottom: \"2rem\" }}>\n        O ID informado não corresponde a nenhum aluno cadastrado.\n      </p>\n      <Link\n        href=\"/alunos\"\n        style={{\n          padding: \"0.75rem 2rem\", borderRadius: \"8px\",\n          background: \"#FF5500\", color: \"#fff\",\n          textDecoration: \"none\", fontWeight: 700,\n        }}\n      >\n        ← Voltar para a lista\n      </Link>\n    </main>\n  );\n}","tip":"Personalize o not-found.tsx por contexto: o 404 de /alunos sugere voltar para a lista, enquanto o global é mais genérico."},{"id":10,"type":"quiz","tag":"Quiz","title":"Qual arquivo precisa de 'use client'?","question":"Dos três arquivos de UX estrutural, qual OBRIGATORIAMENTE precisa de 'use client'?","options":[{"text":"loading.tsx","correct":false,"explanation":"loading.tsx é um Server Component puro — sem interatividade, sem 'use client'."},{"text":"error.tsx","correct":true,"explanation":"Correto! error.tsx precisa de 'use client' porque recebe a prop reset() — uma função para chamar ao clicar no botão de retry."},{"text":"not-found.tsx","correct":false,"explanation":"not-found.tsx pode ser Server Component. Só use 'use client' se adicionar interatividade própria."},{"text":"Todos os três","correct":false,"explanation":"Só o error.tsx é obrigatório. Os outros dois são Server Components por padrão."}],"xp":15},{"id":11,"type":"mini-challenge","tag":"🎯 Missão F2","title":"UX\nCOMPLETA","subtitle":"O FormFire nunca mais deixa o usuário em branco","tasks":["Crie src/app/alunos/loading.tsx com skeleton de pelo menos 3 cards (retângulos animados)","Crie src/app/alunos/error.tsx com 'use client', mensagem de erro e botão 'Tentar novamente'","Crie src/app/alunos/not-found.tsx com mensagem contextual e link para voltar","Atualize /alunos/[id]/page.tsx para chamar notFound() quando o aluno não for encontrado","Teste: acesse /alunos/9999 e confirme que a página 404 aparece"],"bonus":["Adicione um await setTimeout(1500) na page.tsx de alunos e veja o skeleton animado","Crie um botão 'Forçar erro' no /alunos que lança throw new Error('teste') — veja o error.tsx em ação"],"xp":45,"nextHref":"/modulos/forms/aula-03","nextLabel":"Aula 03: Otimizações & Lazy Loading →"}],"backHref":"/modulos/forms","backLabel":"Formulários & UX","aulaLabel":"Aula 02 — Loading, Error & Not Found","aulaSlug":"forms-aula-02"}],["$L9"],"$La"]}],{},null,false,null]},null,false,"$@b"]},null,false,"$@b"]},null,false,"$@b"]},null,false,null],"$Lc",false]],"m":"$undefined","G":["$d",["$Le"]],"S":true,"h":null,"s":"$undefined","l":"$undefined","p":"$undefined","d":"$undefined","b":"YDDillTMsGCbYHmEaYwgU"}
f:I[97367,["/_next/static/chunks/10y4wjnwnffjh.js","/_next/static/chunks/0rcpm6flhlhx8.js","/_next/static/chunks/0d3shmwh5_nmn.js"],"OutletBoundary"]
10:"$Sreact.suspense"
13:I[97367,["/_next/static/chunks/10y4wjnwnffjh.js","/_next/static/chunks/0rcpm6flhlhx8.js","/_next/static/chunks/0d3shmwh5_nmn.js"],"ViewportBoundary"]
15:I[97367,["/_next/static/chunks/10y4wjnwnffjh.js","/_next/static/chunks/0rcpm6flhlhx8.js","/_next/static/chunks/0d3shmwh5_nmn.js"],"MetadataBoundary"]
9:["$","script","script-0",{"src":"/_next/static/chunks/074b8wc5hknnt.js","async":true,"nonce":"$undefined"}]
a:["$","$Lf",null,{"children":["$","$10",null,{"name":"Next.MetadataOutlet","children":"$@11"}]}]
12:[]
b:"$W12"
c:["$","$1","h",{"children":[null,["$","$L13",null,{"children":"$L14"}],["$","div",null,{"hidden":true,"children":["$","$L15",null,{"children":["$","$10",null,{"name":"Next.Metadata","children":"$L16"}]}]}],["$","meta",null,{"name":"next-size-adjust","content":""}]]}]
e:["$","link","0",{"rel":"stylesheet","href":"/_next/static/chunks/154mv0jpvr9bj.css","precedence":"next","crossOrigin":"$undefined","nonce":"$undefined"}]
14:[["$","meta","0",{"charSet":"utf-8"}],["$","meta","1",{"name":"viewport","content":"width=device-width, initial-scale=1"}]]
17:I[27201,["/_next/static/chunks/10y4wjnwnffjh.js","/_next/static/chunks/0rcpm6flhlhx8.js","/_next/static/chunks/0d3shmwh5_nmn.js"],"IconMark"]
11:null
16:[["$","title","0",{"children":"Aula 02 — Loading, Error & Not Found · Web On Fire Academy"}],["$","meta","1",{"name":"description","content":"Laboratórios 100% interativos, códigos testados e comentados, passo a passo intuitivo. React, Next.js, Firebase e TypeScript."}],["$","link","2",{"rel":"icon","href":"/favicon.ico?favicon.0x3dzn~oxb6tn.ico","sizes":"256x256","type":"image/x-icon"}],["$","$L17","3",{}]]
