import type { Slide } from "@/types/slides";

export const FIRESTORE_ESCRITA_SLIDES: Slide[] = [
  {
    id: 1,
    type: "cover",
    tag: "Módulo 04 · Aula 16",
    title: "FIRESTORE:\nESCRITA & CRUD",
    subtitle: "Criar, atualizar e excluir — o banco deixa de ser só leitura.",
  },
  {
    id: 2,
    type: "concept",
    tag: "CRUD",
    title: "As quatro operações de todo sistema",
    items: [
      { icon: "🟢", text: "Create: adicionar um novo documento — addDoc (id automático) ou setDoc (id definido por você)." },
      { icon: "🔵", text: "Read: ler documentos — getDoc/getDocs, que você já domina da aula anterior." },
      { icon: "🟡", text: "Update: alterar campos de um documento existente — updateDoc." },
      { icon: "🔴", text: "Delete: remover um documento — deleteDoc." },
    ],
  },
  {
    id: 3,
    type: "code",
    tag: "Create",
    title: "Criando documentos",
    codeLabel: "criar.ts",
    code: `import { collection, addDoc, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";

// addDoc — o Firestore gera um ID aleatório
const ref = await addDoc(collection(db, "alunos"), {
  nome: "Ana",
  xp: 0,
  criadoEm: serverTimestamp(), // hora do servidor, confiável
});
console.log("Novo id:", ref.id);

// setDoc — VOCÊ define o ID (ex: usar o uid do Auth)
await setDoc(doc(db, "alunos", user.uid), {
  nome: user.displayName,
  email: user.email,
});`,
    tip: "Use addDoc quando o ID não importa (um post, um comentário). Use setDoc quando o ID É significativo — como o uid do usuário logado.",
  },
  {
    id: 4,
    type: "code",
    tag: "Update & Delete",
    title: "Atualizando e removendo",
    codeLabel: "mutacoes.ts",
    code: `import { doc, updateDoc, deleteDoc, increment } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";

// Update — muda SÓ os campos informados (o resto fica intacto)
await updateDoc(doc(db, "alunos", id), {
  xp: 500,
  ultimoAcesso: new Date().toISOString(),
});

// increment — soma sem precisar ler antes (atômico!)
await updateDoc(doc(db, "alunos", id), {
  xp: increment(50),   // +50 no valor atual, seguro contra concorrência
});

// Delete — remove o documento inteiro
await deleteDoc(doc(db, "alunos", id));`,
    tip: "increment() é ouro: soma direto no servidor sem 'ler-somar-gravar'. Evita bugs quando duas ações mexem no mesmo campo ao mesmo tempo.",
  },
  {
    id: 5,
    type: "concept",
    tag: "setDoc merge",
    title: "setDoc vs updateDoc: a pegadinha",
    items: [
      { icon: "💥", text: "setDoc SUBSTITUI o documento inteiro: campos não incluídos são APAGADOS. Cuidado!" },
      { icon: "🩹", text: "updateDoc altera só os campos passados — mas FALHA se o documento não existir." },
      { icon: "✅", text: "setDoc(ref, dados, { merge: true }): o melhor dos dois — cria se não existe, mescla se existe." },
      { icon: "🎯", text: "Padrão seguro para 'salvar progresso': setDoc com merge. É o que o saveUserProgress deste curso usa." },
    ],
  },
  {
    id: 6,
    type: "quiz",
    tag: "Quiz",
    title: "A operação certa",
    question: "Você quer aumentar o XP de um aluno em 50, sem risco de sobrescrever se dois eventos acontecerem juntos. O que usar?",
    options: [
      {
        text: "Ler o xp, somar 50 no código e gravar com updateDoc",
        correct: false,
        explanation: "Perigoso: entre ler e gravar, outro evento pode alterar o valor — e você sobrescreve o dele. É a 'race condition'.",
      },
      {
        text: "updateDoc com increment(50)",
        correct: true,
        explanation: "Exato! increment soma no servidor de forma atômica. Dois +50 simultâneos resultam em +100 corretamente.",
      },
      {
        text: "deleteDoc e depois addDoc com o novo valor",
        correct: false,
        explanation: "Isso destrói o histórico, muda o ID e perde os outros campos. Nunca faça isso para um simples incremento.",
      },
      {
        text: "setDoc sem merge com { xp: 50 }",
        correct: false,
        explanation: "setDoc sem merge apagaria nome, email e todo o resto do documento. E 50 não é 'somar 50', é 'virar 50'.",
      },
    ],
    xp: 15,
  },
  {
    id: 7,
    type: "concept",
    tag: "Segurança",
    title: "Security Rules: a muralha do banco",
    items: [
      { icon: "🚨", text: "As chaves do Firebase são públicas. Sem regras, QUALQUER um poderia ler/escrever seu banco pelo console do browser." },
      { icon: "📜", text: "Security Rules ficam no Firebase e decidem quem pode o quê — rodam no servidor do Google, invioláveis." },
      { icon: "🔐", text: "Ex: 'só o dono edita o próprio progresso' → allow write: if request.auth.uid == userId." },
      { icon: "⚠️", text: "Modo de teste expira e libera tudo. Antes de publicar de verdade, ESCREVA suas regras. Inegociável." },
    ],
  },
  {
    id: 8,
    type: "code",
    tag: "Regras",
    title: "Um exemplo de Security Rules",
    codeLabel: "firestore.rules",
    code: `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Progresso: só o próprio dono lê e escreve
    match /progresso/{userId} {
      allow read, write: if request.auth != null
                         && request.auth.uid == userId;
    }

    // Produtos: qualquer um lê, ninguém escreve pelo cliente
    match /produtos/{id} {
      allow read: if true;
      allow write: if false;  // só via backend/Server Action
    }
  }
}`,
    tip: "Regra de ouro: comece negando tudo e libere o mínimo necessário. 'allow write: if false' + escrita só pelo servidor é o padrão mais seguro.",
  },
  {
    id: 9,
    type: "fill-blank",
    tag: "Mão na massa",
    title: "Complete a exclusão",
    instruction:
      "Complete a função do Firestore que remove um documento inteiro (digite só o nome da função):",
    prefix: `import { doc, _________ } from "firebase/firestore";

await _________(doc(db, "alunos", id));`,
    answer: "deleteDoc",
    hint: "É 'delete' + 'Doc'.",
    xp: 20,
  },
  {
    id: 10,
    type: "mini-challenge",
    tag: "🎯 Missão 16",
    title: "CRUD\nCOMPLETO",
    subtitle: "Um cadastro que cria, edita e apaga de verdade",
    tasks: [
      "Na coleção 'produtos', crie um formulário (/produtos/novo) que grava com addDoc",
      "Use serverTimestamp() para registrar criadoEm em cada produto",
      "Crie um botão 'Editar' que abre um formulário e salva com updateDoc",
      "Crie um botão 'Excluir' que remove com deleteDoc (confirme antes com SweetAlert2!)",
      "Adicione um campo 'estoque' e um botão +1/-1 usando increment()",
      "Escreva Security Rules básicas: leitura pública, escrita só autenticada",
    ],
    bonus: [
      "Use setDoc com { merge: true } para um formulário que cria OU atualiza",
      "Após cada mutação, dispare um toast (Sonner) de confirmação",
    ],
    xp: 50,
    nextHref: "/modulos/dados/server-actions",
    nextLabel: "Aula 17: Server Actions →",
  },
];
