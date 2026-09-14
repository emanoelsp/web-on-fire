import type { Slide } from "@/types/slides";

export const FORMS_AULA02_SLIDES: Slide[] = [
  {
    id: 1,
    type: "cover",
    tag: "Módulo 2.1 · Aula 02",
    title: "LOADING\nERROR\n& NOT FOUND",
    subtitle: "O usuário nunca mais vê uma tela em branco.",
  },
  {
    id: 2,
    type: "concept",
    tag: "O problema",
    title: "Três situações que todo app enfrenta",
    items: [
      { icon: "⏳", text: "Carregando: a página buscou dados no servidor e ainda está esperando — sem feedback, o usuário acha que travou." },
      { icon: "💥", text: "Erro: a API caiu, a rede falhou, ou o código lançou uma exceção — sem tratamento, a tela quebra feio." },
      { icon: "🔍", text: "Não encontrado: o aluno de ID 999 não existe — sem resposta clara, o usuário fica perdido." },
      { icon: "✅", text: "Next.js resolve os três com arquivos especiais: loading.tsx, error.tsx e not-found.tsx." },
    ],
    tip: "Esses arquivos funcionam automaticamente — o Next envolve sua página com Suspense e ErrorBoundary por você.",
  },
  {
    id: 3,
    type: "concept",
    tag: "loading.tsx",
    title: "Loading automático com Suspense",
    items: [
      { icon: "📄", text: "Crie loading.tsx na mesma pasta que page.tsx — o Next exibe ele enquanto a página carrega." },
      { icon: "⚡", text: "Sem useState, sem useEffect — o Next embrulha a page.tsx num <Suspense> automaticamente." },
      { icon: "🏗️", text: "O layout e o Header aparecem imediatamente — só o conteúdo fica suspenso." },
      { icon: "🎨", text: "Use para skeletons (retângulos cinzas que imitam o layout) ou um spinner simples." },
    ],
    tip: "O loading.tsx desaparece assim que a page.tsx termina de renderizar — transição suave, zero configuração.",
  },
  {
    id: 4,
    type: "code",
    tag: "loading.tsx",
    title: "Skeleton de alunos no FormFire",
    codeLabel: "src/app/alunos/loading.tsx",
    code: `// Não precisa de 'use client' — é Server Component
export default function Loading() {
  return (
    <main className="p-8 max-w-3xl mx-auto">
      <div className="h-8 w-48 bg-zinc-800 rounded-lg mb-8 animate-pulse" />

      {/* 3 skeleton cards — animationDelay é dinâmico, ok usar style só para isso */}
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="flex items-center gap-4 p-4 rounded-xl bg-zinc-950 mb-3 animate-pulse"
          style={{ animationDelay: \`\${i * 0.15}s\` }}
        >
          {/* Avatar skeleton */}
          <div className="w-12 h-12 rounded-full bg-zinc-800 shrink-0" />
          {/* Text skeletons */}
          <div className="flex-1">
            <div className="h-4 w-3/5 bg-zinc-800 rounded mb-2" />
            <div className="h-3 w-2/5 bg-zinc-900 rounded" />
          </div>
        </div>
      ))}
    </main>
  );
}`,
    tip: "O delay que adicionamos na page.tsx (setTimeout 800ms) torna o skeleton visível — suficiente para ver o efeito em aula.",
  },
  {
    id: 5,
    type: "concept",
    tag: "error.tsx",
    title: "Error Boundary automático",
    items: [
      { icon: "🛡️", text: "error.tsx captura qualquer exceção lançada na page.tsx — tanto em Server quanto Client Components." },
      { icon: "🔁", text: "Recebe a prop reset() — permite tentar novamente sem recarregar a página inteira." },
      { icon: "⚠️", text: "OBRIGATÓRIO: precisa de 'use client' no topo — o botão de retry precisa de interatividade." },
      { icon: "📍", text: "Cada pasta pode ter seu error.tsx — o erro é capturado no nível mais próximo." },
    ],
    tip: "error.tsx NÃO captura erros dentro do próprio layout.tsx — para isso, crie global-error.tsx na raiz do /app.",
  },
  {
    id: 6,
    type: "code",
    tag: "error.tsx",
    title: "Error boundary no FormFire",
    codeLabel: "src/app/alunos/error.tsx",
    code: `"use client"; // obrigatório — precisa de interatividade

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
    <main className="px-8 py-16 text-center">
      <p className="text-5xl mb-4">💥</p>
      <h2 className="text-2xl mb-2">
        Algo deu errado
      </h2>
      <p className="text-zinc-400 mb-8">
        {error.message ?? "Erro inesperado. Tente novamente."}
      </p>
      <button
        onClick={reset}
        className="py-3 px-8 rounded-lg bg-orange-600 text-white border-0 cursor-pointer font-bold"
      >
        Tentar novamente
      </button>
    </main>
  );
}`,
  },
  {
    id: 7,
    type: "concept",
    tag: "not-found.tsx",
    title: "Página 404 personalizada",
    items: [
      { icon: "📄", text: "not-found.tsx é renderizado quando sua função chama notFound() explicitamente." },
      { icon: "🎯", text: "notFound() vem de 'next/navigation' — use dentro de Server Components quando o recurso não existe." },
      { icon: "🌐", text: "O arquivo na raiz do /app (app/not-found.tsx) é o 404 global de toda a aplicação." },
      { icon: "📁", text: "Cada sub-rota pode ter seu próprio not-found.tsx com mensagem contextual." },
    ],
    tip: "notFound() interrompe a renderização imediatamente (igual a throw) — não precisa de return depois da chamada.",
  },
  {
    id: 8,
    type: "code",
    tag: "notFound()",
    title: "Detalhe do aluno com 404 profissional",
    codeLabel: "src/app/alunos/[id]/page.tsx",
    code: `import { notFound } from "next/navigation";
import { STUDENTS } from "@/data/students";

export default async function StudentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const student = STUDENTS.find((s) => s.id === id);

  // antes: if (!student) return <p>Não encontrado</p>
  // agora: renderiza o not-found.tsx mais próximo
  if (!student) notFound();

  return (
    <main className="p-8 max-w-2xl mx-auto">
      <h1>{student.nome}</h1>
      <p>Email: {student.email}</p>
      <p>CPF: {student.cpf}</p>
      <p>Telefone: {student.telefone}</p>
      <p>Turma: {student.turma}</p>
    </main>
  );
}`,
    tip: "Se não existir not-found.tsx local, o Next sobe na árvore de pastas até encontrar um — incluindo o global.",
  },
  {
    id: 9,
    type: "code",
    tag: "not-found.tsx",
    title: "Página 404 customizada para /alunos",
    codeLabel: "src/app/alunos/not-found.tsx",
    code: `import Link from "next/link";

// Não precisa de 'use client' — sem interatividade
export default function AlunoNotFound() {
  return (
    <main className="px-8 py-16 text-center">
      <p className="text-6xl">🔍</p>
      <h2 className="text-3xl mb-2">
        Aluno não encontrado
      </h2>
      <p className="text-zinc-400 mb-8">
        O ID informado não corresponde a nenhum aluno cadastrado.
      </p>
      <Link
        href="/alunos"
        className="py-3 px-8 rounded-lg bg-orange-600 text-white no-underline font-bold"
      >
        ← Voltar para a lista
      </Link>
    </main>
  );
}`,
    tip: "Personalize o not-found.tsx por contexto: o 404 de /alunos sugere voltar para a lista, enquanto o global é mais genérico.",
  },
  {
    id: 10,
    type: "quiz",
    tag: "Quiz",
    title: "Qual arquivo precisa de 'use client'?",
    question: "Dos três arquivos de UX estrutural, qual OBRIGATORIAMENTE precisa de 'use client'?",
    options: [
      {
        text: "loading.tsx",
        correct: false,
        explanation: "loading.tsx é um Server Component puro — sem interatividade, sem 'use client'.",
      },
      {
        text: "error.tsx",
        correct: true,
        explanation: "Correto! error.tsx precisa de 'use client' porque recebe a prop reset() — uma função para chamar ao clicar no botão de retry.",
      },
      {
        text: "not-found.tsx",
        correct: false,
        explanation: "not-found.tsx pode ser Server Component. Só use 'use client' se adicionar interatividade própria.",
      },
      {
        text: "Todos os três",
        correct: false,
        explanation: "Só o error.tsx é obrigatório. Os outros dois são Server Components por padrão.",
      },
    ],
    xp: 15,
  },
  {
    id: 11,
    type: "mini-challenge",
    tag: "🎯 Missão F2",
    title: "UX\nCOMPLETA",
    subtitle: "O FormFire nunca mais deixa o usuário em branco",
    tasks: [
      "Crie src/app/alunos/loading.tsx com skeleton de pelo menos 3 cards (retângulos animados)",
      "Crie src/app/alunos/error.tsx com 'use client', mensagem de erro e botão 'Tentar novamente'",
      "Crie src/app/alunos/not-found.tsx com mensagem contextual e link para voltar",
      "Atualize /alunos/[id]/page.tsx para chamar notFound() quando o aluno não for encontrado",
      "Teste: acesse /alunos/9999 e confirme que a página 404 aparece",
    ],
    bonus: [
      "Adicione um await setTimeout(1500) na page.tsx de alunos e veja o skeleton animado",
      "Crie um botão 'Forçar erro' no /alunos que lança throw new Error('teste') — veja o error.tsx em ação",
    ],
    xp: 45,
    nextHref: "/modulos/forms/aula-03",
    nextLabel: "Aula 03: Otimizações & Lazy Loading →",
  },
];
