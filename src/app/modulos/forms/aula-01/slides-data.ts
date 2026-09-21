import type { Slide } from "@/types/slides";

export const FORMS_AULA01_SLIDES: Slide[] = [
  {
    id: 1,
    type: "cover",
    tag: "Módulo 2.1 · Aula 01",
    title: "FORMFIRE\nPROJETO BASE\n& ESTRUTURA",
    subtitle: "O projeto que cresce aula a aula — começa agora.",
  },
  {
    id: 2,
    type: "concept",
    tag: "O que vamos construir",
    title: "FormFire — sistema de cadastro de alunos",
    items: [
      { icon: "📋", text: "/alunos — lista de alunos cadastrados com foto, nome e email." },
      { icon: "➕", text: "/alunos/cadastro — formulário de registro (nome, email, CPF, telefone)." },
      { icon: "👤", text: "/alunos/[id] — página de detalhe de cada aluno pelo ID." },
      { icon: "🔨", text: "Cada aula adiciona uma camada: UX, otimizações, validação e máscaras." },
    ],
    tip: "Projeto simples de propósito — o foco é aprender as técnicas, não a complexidade do domínio.",
  },
  {
    id: 3,
    type: "code",
    tag: "Setup",
    title: "Criando o projeto do zero",
    codeLabel: "terminal",
    code: `# 1. Criar o projeto
npx create-next-app@latest formfire \\
  --typescript --tailwind --eslint --app \\
  --src-dir --import-alias "@/*" --no-turbopack

cd formfire

# 2. Instalar dependências que usaremos nas próximas aulas
#    (já instalamos tudo de uma vez para não interromper o fluxo)
npm install react-hook-form zod @hookform/resolvers react-imask

# 3. Rodar o servidor de desenvolvimento
npm run dev`,
    tip: "O flag --src-dir coloca todo o código dentro de src/ — boa prática para separar código-fonte de config.",
  },
  {
    id: 4,
    type: "files",
    tag: "Estrutura",
    title: "Organização de pastas do FormFire",
    code: `src/
├── app/
│   ├── layout.tsx          ← RootLayout (Navbar + fontes)
│   ├── page.tsx            ← landing page com CTA
│   └── alunos/
│       ├── page.tsx        ← lista de alunos
│       ├── loading.tsx     ← (aula 02)
│       ├── error.tsx       ← (aula 02)
│       ├── not-found.tsx   ← (aula 02)
│       ├── cadastro/
│       │   └── page.tsx    ← formulário de cadastro
│       └── [id]/
│           └── page.tsx    ← detalhe do aluno
├── types/
│   └── student.ts          ← interface Student
└── data/
    └── students.ts         ← mock data (array estático)`,
  },
  {
    id: 5,
    type: "code",
    tag: "Landing page",
    title: "page.tsx — CTA de entrada do FormFire",
    codeLabel: "src/app/page.tsx",
    code: `import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-8 px-4 bg-zinc-950 text-center">

      {/* badge */}
      <span className="text-xs font-semibold uppercase tracking-widest text-orange-500 border border-orange-500/30 rounded-full px-3 py-1">
        Módulo 2.1
      </span>

      <span className="text-7xl">🔥</span>

      <div className="flex flex-col gap-3">
        <h1 className="text-5xl font-bold tracking-tight text-white">
          FormFire
        </h1>
        <p className="text-zinc-400 text-lg max-w-sm mx-auto">
          Sistema de cadastro de alunos — do zero ao completo, aula a aula.
        </p>
      </div>

      <Link
        href="/alunos"
        className="bg-orange-600 hover:bg-orange-500 text-white font-bold py-3 px-8 rounded-lg transition-colors"
      >
        Acessar alunos →
      </Link>

      <p className="text-zinc-600 text-sm">
        Criado no On Fire Academy · Next.js + Tailwind
      </p>

    </main>
  );
}`,
    tip: "Sem redirect — a landing é uma página real que o usuário vê. O Link leva para /alunos sem recarregar o navegador.",
  },
  {
    id: 6,
    type: "code",
    tag: "Tipagem",
    title: "Interface Student com TypeScript",
    codeLabel: "src/types/student.ts",
    code: `export interface Student {
  id: string;
  nome: string;
  email: string;
  cpf: string;       // formato: 000.000.000-00
  telefone: string;  // formato: (00) 00000-0000
  avatarUrl?: string;
  turma?: string;
  createdAt?: string;
}

// Os campos CPF e telefone são strings porque guardam o valor
// formatado com máscara — validaremos o formato com Zod na aula 04.`,
    tip: "Definir a interface primeiro é o hábito certo: o TypeScript vai te proteger em todas as outras camadas.",
  },
  {
    id: 7,
    type: "code",
    tag: "Lista de alunos",
    title: "Mock data e página /alunos",
    codeLabel: "src/data/students.ts  +  src/app/alunos/page.tsx",
    code: `// src/data/students.ts
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
import Link from "next/link";
import { STUDENTS } from "@/data/students";

export default async function AlunosPage() {
  await new Promise((r) => setTimeout(r, 800));

  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-10">
      <div className="max-w-3xl mx-auto">

        <h1 className="text-2xl font-bold text-white mb-6">Alunos</h1>

        <ul className="flex flex-col gap-3">
          {STUDENTS.map((s) => (
            <li key={s.id}>
              <Link
                href={\`/alunos/\${s.id}\`}
                className="flex items-center gap-4 p-4 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-colors"
              >
                <div>
                  <p className="text-white font-semibold">{s.nome}</p>
                  <p className="text-zinc-400 text-sm">{s.email}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>

      </div>
    </main>
  );
}`,
    tip: "O await setTimeout(800) não vai para produção — é só para enxergarmos o loading.tsx funcionando na aula 02.",
  },
  {
    id: 8,
    type: "code",
    tag: "Detalhe do aluno",
    title: "Rota dinâmica /alunos/[id]",
    codeLabel: "src/app/alunos/[id]/page.tsx",
    code: `import Link from "next/link";
import { STUDENTS } from "@/data/students";

export default async function StudentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const student = STUDENTS.find((s) => s.id === id);

  if (!student) {
    return (
      <main className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <p className="text-zinc-400">Aluno não encontrado.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-10">
      <div className="max-w-xl mx-auto">
        <Link
          href="/alunos"
          className="text-zinc-400 hover:text-white text-sm mb-8 inline-block transition-colors"
        >
          ← Voltar
        </Link>
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
          <h1 className="text-xl font-bold text-white mb-1">{student.nome}</h1>
          <p className="text-zinc-400 text-sm">{student.email}</p>
          {student.turma && (
            <p className="text-zinc-500 text-sm mt-1">Turma {student.turma}</p>
          )}
        </div>
      </div>
    </main>
  );
}`,
    tip: "Pastas entre colchetes [id] criam rotas dinâmicas — qualquer valor depois de /alunos/ cai nessa página.",
  },
  {
    id: 9,
    type: "code",
    tag: "Formulário base",
    title: "Formulário /alunos/cadastro (sem validação)",
    codeLabel: "src/app/alunos/cadastro/page.tsx",
    code: `"use client"; // precisamos de interatividade

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
    // por enquanto só logamos — validação vem na aula 04
    console.log("Dados enviados:", form);
    alert(\`Cadastrado: \${form.nome}\`);
  }

  return (
    <main className="p-8 max-w-lg">
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
}`,
    tip: "Este formulário vai crescer nas próximas aulas: aula 02 adiciona loading, aula 04 a validação, aula 05 as máscaras.",
  },
  {
    id: 10,
    type: "quiz",
    tag: "Quiz",
    title: "Qual arquivo trata a URL /alunos/42?",
    question: "O usuário acessa /alunos/42. Qual arquivo do Next.js processa essa requisição?",
    options: [
      {
        text: "src/app/alunos/42/page.tsx",
        correct: false,
        explanation: "Esse arquivo não existe — criar uma pasta pra cada ID seria impossível.",
      },
      {
        text: "src/app/alunos/[id]/page.tsx",
        correct: true,
        explanation: "Correto! A pasta [id] é uma rota dinâmica — '42' vira o valor de params.id dentro do componente.",
      },
      {
        text: "src/app/alunos/page.tsx",
        correct: false,
        explanation: "Esse arquivo trata /alunos (sem ID). Com um segmento a mais, o Next busca a sub-rota dinâmica.",
      },
      {
        text: "src/app/alunos/[...id]/page.tsx",
        correct: false,
        explanation: "[...id] é um catch-all que captura múltiplos segmentos (/alunos/a/b/c). Para um único ID, use [id].",
      },
    ],
    xp: 15,
  },
  {
    id: 11,
    type: "mini-challenge",
    tag: "🎯 Missão F1",
    title: "FORMFIRE\nONLINE",
    subtitle: "Coloque o projeto no ar em modo dev",
    tasks: [
      "Crie o projeto com npx create-next-app@latest formfire (flags: --typescript --app --src-dir --tailwind)",
      "Instale as dependências: react-hook-form zod @hookform/resolvers react-imask",
      "Crie src/app/page.tsx como landing page com CTA em Tailwind e um <Link href='/alunos'>",
      "Crie src/types/student.ts com a interface Student (id, nome, email, cpf, telefone, avatarUrl?)",
      "Crie src/data/students.ts com pelo menos 3 alunos mockados (use dados fictícios)",
      "Implemente /alunos/page.tsx listando todos os alunos",
      "Implemente /alunos/[id]/page.tsx mostrando nome e email do aluno pelo ID",
      "Implemente /alunos/cadastro/page.tsx com um formulário simples (sem validação ainda)",
    ],
    bonus: [
      "Adicione um <Link> na lista de alunos que leva para o detalhe de cada um",
      "Personalize a landing com as cores do tema da sua turma usando classes Tailwind",
    ],
    xp: 40,
    nextHref: "/modulos/forms/aula-02",
    nextLabel: "Aula 02: Loading, Error & Not Found →",
  },
];
