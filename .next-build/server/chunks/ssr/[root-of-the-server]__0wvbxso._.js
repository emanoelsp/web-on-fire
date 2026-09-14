module.exports=[93695,(a,b,c)=>{b.exports=a.x("next/dist/shared/lib/no-fallback-error.external.js",()=>require("next/dist/shared/lib/no-fallback-error.external.js"))},64240,(a,b,c)=>{"use strict";function d(a){if("function"!=typeof WeakMap)return null;var b=new WeakMap,c=new WeakMap;return(d=function(a){return a?c:b})(a)}c._=function(a,b){if(!b&&a&&a.__esModule)return a;if(null===a||"object"!=typeof a&&"function"!=typeof a)return{default:a};var c=d(b);if(c&&c.has(a))return c.get(a);var e={__proto__:null},f=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var g in a)if("default"!==g&&Object.prototype.hasOwnProperty.call(a,g)){var h=f?Object.getOwnPropertyDescriptor(a,g):null;h&&(h.get||h.set)?Object.defineProperty(e,g,h):e[g]=a[g]}return e.default=a,c&&c.set(a,e),e}},50640,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0}),Object.defineProperty(c,"InvariantError",{enumerable:!0,get:function(){return d}});class d extends Error{constructor(a,b){super(`Invariant: ${a.endsWith(".")?a:a+"."} This is a bug in Next.js.`,b),this.name="InvariantError"}}},59469,a=>{"use strict";a.s(["default",()=>b]);let b=(0,a.i(11857).registerClientReference)(function(){throw Error("Attempted to call the default export of [project]/src/components/slides/SlidePresentation.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"[project]/src/components/slides/SlidePresentation.tsx <module evaluation>","default")},59394,a=>{"use strict";a.s(["default",()=>b]);let b=(0,a.i(11857).registerClientReference)(function(){throw Error("Attempted to call the default export of [project]/src/components/slides/SlidePresentation.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"[project]/src/components/slides/SlidePresentation.tsx","default")},9844,a=>{"use strict";a.i(59469);var b=a.i(59394);a.n(b)},10585,a=>{a.v("/_next/static/media/favicon.0x3dzn~oxb6tn.ico"+(globalThis.NEXT_CLIENT_ASSET_SUFFIX||""))},68611,a=>{"use strict";let b={src:a.i(10585).default,width:256,height:256};a.s(["default",0,b])},95045,a=>{"use strict";var b=a.i(7997),c=a.i(9844);let d=[{id:1,type:"cover",tag:"Módulo 2.1 · Aula 01",title:"FORMFIRE\nPROJETO BASE\n& ESTRUTURA",subtitle:"O projeto que cresce aula a aula — começa agora."},{id:2,type:"concept",tag:"O que vamos construir",title:"FormFire — sistema de cadastro de alunos",items:[{icon:"📋",text:"/alunos — lista de alunos cadastrados com foto, nome e email."},{icon:"➕",text:"/alunos/cadastro — formulário de registro (nome, email, CPF, telefone)."},{icon:"👤",text:"/alunos/[id] — página de detalhe de cada aluno pelo ID."},{icon:"🔨",text:"Cada aula adiciona uma camada: UX, otimizações, validação e máscaras."}],tip:"Projeto simples de propósito — o foco é aprender as técnicas, não a complexidade do domínio."},{id:3,type:"code",tag:"Setup",title:"Criando o projeto do zero",codeLabel:"terminal",code:`# 1. Criar o projeto
npx create-next-app@latest formfire \\
  --typescript --tailwind --eslint --app \\
  --src-dir --import-alias "@/*" --no-turbopack

cd formfire

# 2. Instalar depend\xeancias que usaremos nas pr\xf3ximas aulas
#    (j\xe1 instalamos tudo de uma vez para n\xe3o interromper o fluxo)
npm install react-hook-form zod @hookform/resolvers react-imask

# 3. Rodar o servidor de desenvolvimento
npm run dev`,tip:"O flag --src-dir coloca todo o código dentro de src/ — boa prática para separar código-fonte de config."},{id:4,type:"files",tag:"Estrutura",title:"Organização de pastas do FormFire",code:`src/
├── app/
│   ├── layout.tsx          ← RootLayout (Navbar + fontes)
│   ├── page.tsx            ← redirect para /alunos
│   └── alunos/
│       ├── page.tsx        ← lista de alunos
│       ├── loading.tsx     ← (aula 02)
│       ├── error.tsx       ← (aula 02)
│       ├── not-found.tsx   ← (aula 02)
│       ├── cadastro/
│       │   └── page.tsx    ← formul\xe1rio de cadastro
│       └── [id]/
│           └── page.tsx    ← detalhe do aluno
├── types/
│   └── student.ts          ← interface Student
└── data/
    └── students.ts         ← mock data (array est\xe1tico)`},{id:5,type:"code",tag:"Tipagem",title:"Interface Student com TypeScript",codeLabel:"src/types/student.ts",code:`export interface Student {
  id: string;
  nome: string;
  email: string;
  cpf: string;       // formato: 000.000.000-00
  telefone: string;  // formato: (00) 00000-0000
  avatarUrl?: string;
  turma?: string;
  createdAt?: string;
}

// Os campos CPF e telefone s\xe3o strings porque guardam o valor
// formatado com m\xe1scara — validaremos o formato com Zod na aula 04.`,tip:"Definir a interface primeiro é o hábito certo: o TypeScript vai te proteger em todas as outras camadas."},{id:6,type:"code",tag:"Lista de alunos",title:"Mock data e página /alunos",codeLabel:"src/data/students.ts  +  src/app/alunos/page.tsx",code:`// src/data/students.ts
import type { Student } from "@/types/student";

export const STUDENTS: Student[] = [
  { id: "1", nome: "Ana Lima",    email: "ana@email.com",
    cpf: "123.456.789-00", telefone: "(11) 91234-5678",
    avatarUrl: "https://i.pravatar.cc/150?img=1", turma: "A" },
  { id: "2", nome: "Bruno Costa", email: "bruno@email.com",
    cpf: "987.654.321-00", telefone: "(21) 98765-4321",
    avatarUrl: "https://i.pravatar.cc/150?img=2", turma: "B" },
];

// src/app/alunos/page.tsx
import { STUDENTS } from "@/data/students";

export default async function AlunosPage() {
  // simular delay de rede (para ver o loading.tsx depois)
  await new Promise((r) => setTimeout(r, 800));

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Alunos</h1>
      {STUDENTS.map((s) => (
        <div key={s.id}>
          <strong>{s.nome}</strong> — {s.email}
        </div>
      ))}
    </main>
  );
}`,tip:"O await setTimeout(800) não vai para produção — é só para enxergarmos o loading.tsx funcionando na aula 02."},{id:7,type:"code",tag:"Detalhe do aluno",title:"Rota dinâmica /alunos/[id]",codeLabel:"src/app/alunos/[id]/page.tsx",code:`import { STUDENTS } from "@/data/students";

// params \xe9 uma Promise no Next.js 15+ — use await
export default async function StudentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // busca no mock pelo ID
  const student = STUDENTS.find((s) => s.id === id);

  // se n\xe3o encontrar: por enquanto mostramos uma mensagem simples
  // na aula 02 vamos usar notFound() para a p\xe1gina 404 profissional
  if (!student) {
    return <p>Aluno n\xe3o encontrado.</p>;
  }

  return (
    <main style={{ padding: "2rem" }}>
      <h1>{student.nome}</h1>
      <p>Email: {student.email}</p>
      <p>Turma: {student.turma}</p>
    </main>
  );
}`,tip:"Pastas entre colchetes [id] criam rotas dinâmicas — qualquer valor depois de /alunos/ cai nessa página."},{id:8,type:"code",tag:"Formulário base",title:"Formulário /alunos/cadastro (sem validação)",codeLabel:"src/app/alunos/cadastro/page.tsx",code:`"use client"; // precisamos de interatividade

import { useState } from "react";

export default function CadastroPage() {
  const [form, setForm] = useState({
    nome: "", email: "", cpf: "", telefone: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // por enquanto s\xf3 logamos — valida\xe7\xe3o vem na aula 04
    console.log("Dados enviados:", form);
    alert(\`Cadastrado: \${form.nome}\`);
  }

  return (
    <main style={{ padding: "2rem", maxWidth: "500px" }}>
      <h1>Cadastrar Aluno</h1>
      <form onSubmit={handleSubmit}>
        <input name="nome"     placeholder="Nome completo" onChange={handleChange} />
        <input name="email"    placeholder="Email"         onChange={handleChange} />
        <input name="cpf"      placeholder="CPF"           onChange={handleChange} />
        <input name="telefone" placeholder="Telefone"      onChange={handleChange} />
        <button type="submit">Cadastrar</button>
      </form>
    </main>
  );
}`,tip:"Este formulário vai crescer nas próximas aulas: aula 02 adiciona loading, aula 04 a validação, aula 05 as máscaras."},{id:9,type:"quiz",tag:"Quiz",title:"Qual arquivo trata a URL /alunos/42?",question:"O usuário acessa /alunos/42. Qual arquivo do Next.js processa essa requisição?",options:[{text:"src/app/alunos/42/page.tsx",correct:!1,explanation:"Esse arquivo não existe — criar uma pasta pra cada ID seria impossível."},{text:"src/app/alunos/[id]/page.tsx",correct:!0,explanation:"Correto! A pasta [id] é uma rota dinâmica — '42' vira o valor de params.id dentro do componente."},{text:"src/app/alunos/page.tsx",correct:!1,explanation:"Esse arquivo trata /alunos (sem ID). Com um segmento a mais, o Next busca a sub-rota dinâmica."},{text:"src/app/alunos/[...id]/page.tsx",correct:!1,explanation:"[...id] é um catch-all que captura múltiplos segmentos (/alunos/a/b/c). Para um único ID, use [id]."}],xp:15},{id:10,type:"mini-challenge",tag:"🎯 Missão F1",title:"FORMFIRE\nONLINE",subtitle:"Coloque o projeto no ar em modo dev",tasks:["Crie o projeto com npx create-next-app@latest formfire (flags: --typescript --app --src-dir)","Instale as dependências: react-hook-form zod @hookform/resolvers react-imask","Crie src/types/student.ts com a interface Student (id, nome, email, cpf, telefone, avatarUrl?)","Crie src/data/students.ts com pelo menos 3 alunos mockados (use dados fictícios)","Implemente /alunos/page.tsx listando todos os alunos","Implemente /alunos/[id]/page.tsx mostrando nome e email do aluno pelo ID","Implemente /alunos/cadastro/page.tsx com um formulário simples (sem validação ainda)"],bonus:["Adicione um <Link> na lista de alunos que leva para o detalhe de cada um","Adicione um <Link> na landing (/) que redireciona para /alunos"],xp:40,nextHref:"/modulos/forms/aula-02",nextLabel:"Aula 02: Loading, Error & Not Found →"}];a.s(["default",0,function(){return(0,b.jsx)(c.default,{slides:d,backHref:"/modulos/forms",backLabel:"Formulários & UX",aulaLabel:"Aula 01 — Projeto Base & Estrutura",aulaSlug:"forms-aula-01"})},"metadata",0,{title:"Aula 01 — Projeto Base & Estrutura · Web On Fire Academy"}],95045)},98926,a=>{a.n(a.i(95045))}];

//# sourceMappingURL=%5Broot-of-the-server%5D__0wvbxso._.js.map