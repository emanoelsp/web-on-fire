import type { Slide } from "@/types/slides";

export const SERVER_ACTIONS_SLIDES: Slide[] = [
  {
    id: 1,
    type: "cover",
    tag: "Módulo 04 · Aula 04",
    title: "SERVER\nACTIONS",
    subtitle: "Mutações seguras no servidor — sem criar uma única rota de API.",
  },
  {
    id: 2,
    type: "concept",
    tag: "O jeito antigo",
    title: "O caminho tradicional de uma mutação",
    items: [
      { icon: "😮‍💨", text: "Formulário no cliente → fetch('/api/produtos', POST) → route handler → valida → grava → responde JSON." },
      { icon: "🔁", text: "Muita cerimônia: você cria a rota, serializa o body, trata a resposta, atualiza o estado na mão." },
      { icon: "🐛", text: "E fácil de errar: esquecer o Content-Type, tratar erro pela metade, estados de loading manuais." },
      { icon: "💡", text: "Server Actions cortam o intermediário: uma função no servidor que o formulário chama DIRETO." },
    ],
  },
  {
    id: 3,
    type: "definition",
    tag: "Definição",
    title: "Server Action em uma frase",
    quote:
      'Uma Server Action é uma função assíncrona marcada com "use server" que roda exclusivamente no servidor e pode ser chamada direto de um componente — sem você criar uma rota de API.',
    highlights: ['"use server"', "roda exclusivamente no servidor", "sem criar uma rota de API"],
    tip: "O Next cria o endpoint e a comunicação por baixo dos panos. Você escreve uma função; ele cuida do transporte.",
  },
  {
    id: 4,
    type: "code",
    tag: "A diretiva",
    title: '"use server": a mágica',
    codeLabel: "app/actions/produtos.ts",
    code: `"use server"; // ← tudo neste arquivo roda SÓ no servidor

import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import { revalidatePath } from "next/cache";

export async function criarProduto(formData: FormData) {
  const nome = formData.get("nome") as string;
  const preco = Number(formData.get("preco"));

  // validação no SERVIDOR — o cliente não pode burlar
  if (!nome || preco <= 0) {
    return { erro: "Dados inválidos" };
  }

  await addDoc(collection(db, "produtos"), { nome, preco });

  revalidatePath("/produtos"); // atualiza o cache da lista!
  return { ok: true };
}`,
    tip: "Chaves secretas, lógica sensível e validação ficam no servidor — nunca chegam ao browser. Segurança por construção.",
  },
  {
    id: 5,
    type: "code",
    tag: "Ligando ao form",
    title: "O formulário chama a action direto",
    codeLabel: "app/produtos/novo/page.tsx",
    code: `import { criarProduto } from "@/app/actions/produtos";

export default function NovoProduto() {
  return (
    // a prop 'action' recebe a Server Action diretamente!
    <form action={criarProduto}>
      <input name="nome" placeholder="Nome do produto" />
      <input name="preco" type="number" placeholder="Preço" />
      <button type="submit">Salvar</button>
    </form>
  );
}
// Sem onSubmit, sem fetch, sem preventDefault, sem estado manual.
// O Next serializa o FormData e executa criarProduto no servidor.`,
    tip: "Repare: nenhum useState, nenhum fetch. O <form action={...}> aponta para a função do servidor. Funciona até com JavaScript desabilitado (progressive enhancement).",
  },
  {
    id: 6,
    type: "quiz",
    tag: "Quiz",
    title: "Onde a validação mora",
    question: "Por que validar os dados DENTRO da Server Action, e não só no formulário do cliente?",
    options: [
      {
        text: "Validação no cliente é suficiente — a action pode confiar",
        correct: false,
        explanation: "Nunca confie no cliente! Ele pode ser burlado (DevTools, requisição direta). O servidor é a última linha de defesa.",
      },
      {
        text: "Porque o cliente pode ser burlado; o servidor é a fronteira confiável",
        correct: true,
        explanation: "Exato! Validação no cliente é UX (feedback rápido). Validação no servidor é SEGURANÇA — a que realmente protege o banco.",
      },
      {
        text: "Porque o cliente não consegue validar formulários",
        correct: false,
        explanation: "O cliente valida sim (e deve, por UX). Mas essa validação é só a primeira camada, facilmente contornável.",
      },
      {
        text: "Para o código ficar mais longo",
        correct: false,
        explanation: "Não é sobre tamanho. É sobre confiança: só o servidor não pode ser adulterado pelo usuário.",
      },
    ],
    xp: 15,
  },
  {
    id: 7,
    type: "concept",
    tag: "revalidate",
    title: "Fechando o ciclo: dados frescos na hora",
    items: [
      { icon: "🔄", text: "Depois de gravar, o cache da lista fica desatualizado. Server Action resolve na mesma função." },
      { icon: "🛤️", text: "revalidatePath('/produtos'): diz ao Next para refazer aquela rota — a lista já aparece com o novo item." },
      { icon: "🏷️", text: "revalidateTag('produtos'): alternativa por etiqueta (lembra do Módulo 02, Data Fetching?)." },
      { icon: "✨", text: "Resultado: o usuário salva e vê o resultado instantâneo, sem você gerenciar estado de lista na mão." },
    ],
  },
  {
    id: 8,
    type: "comparison",
    tag: "Antes vs Depois",
    title: "Route Handler vs Server Action",
    left: {
      label: "API Route tradicional",
      items: [
        "Cria arquivo route.ts",
        "fetch manual no cliente",
        "Serializa body e headers",
        "Trata resposta e erro na mão",
        "Atualiza a lista manualmente",
      ],
    },
    right: {
      label: "Server Action",
      items: [
        'Função com "use server"',
        "form action={fn} — direto",
        "FormData automático",
        "return { erro } simples",
        "revalidatePath atualiza só",
      ],
    },
    tip: "Server Actions não matam as API Routes (úteis para webhooks e APIs públicas). Mas para mutações do seu próprio app, são o novo padrão.",
  },
  {
    id: 9,
    type: "fill-blank",
    tag: "Mão na massa",
    title: "Complete a diretiva",
    instruction:
      "Qual diretiva no topo do arquivo marca suas funções como Server Actions? (digite com as aspas)",
    prefix: `_______________;

export async function criarProduto(formData) { /* ... */ }`,
    answer: '"use server"',
    hint: 'É o par da "use client", mas para o servidor.',
    xp: 20,
  },
  {
    id: 10,
    type: "mini-challenge",
    tag: "🎯 Missão 17",
    title: "MUTAÇÕES\nMODERNAS",
    subtitle: "Refatore o CRUD para Server Actions",
    tasks: [
      "Crie app/actions/produtos.ts com \"use server\" no topo",
      "Escreva criarProduto(formData) que valida e grava no Firestore",
      "Ligue um <form action={criarProduto}> — sem fetch, sem onSubmit",
      "Adicione revalidatePath('/produtos') para a lista atualizar sozinha",
      "Crie atualizarProduto e excluirProduto como Server Actions",
      "Retorne { erro } em caso de validação falha e exiba no formulário",
    ],
    bonus: [
      "Valide os dados com Zod dentro da action antes de gravar",
      "Use useFormStatus para um botão que mostra 'Salvando...' durante o envio",
    ],
    xp: 50,
    nextHref: "/modulos/dados/deploy",
    nextLabel: "Aula 05: Deploy e Entrega →",
  },
];
