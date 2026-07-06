import type { Slide } from "@/types/slides";

export const AULA73_SLIDES: Slide[] = [
  {
    id: 1,
    type: "cover",
    tag: "🔥 Módulo 07 · Aula 7.3",
    title: "CRUD\nCOMPLETO",
    subtitle: "Adicione busca, atualização e exclusão ao sistema — evoluindo o mesmo projeto da Aula 7.2.",
  },
  {
    id: 2,
    type: "concept",
    tag: "O QUE É CRUD",
    title: "As 4 operações\nde qualquer sistema",
    items: [
      { icon: "✅", text: "Create — Criar: addDoc() salva um novo documento na coleção. Você já domina isso desde a Aula 7.2." },
      { icon: "📖", text: "Read — Ler: getDoc() busca um documento por ID. getDocs() com query() lista vários com filtros e ordenação." },
      { icon: "✏️", text: "Update — Atualizar: updateDoc() modifica campos específicos de um documento existente sem reescrever tudo." },
      { icon: "🗑️", text: "Delete — Excluir: deleteDoc() remove o documento permanentemente. Sem lixeira automática — confirme antes de usar." },
    ],
    tip: "Create + Read você já fez. Hoje fecha o CRUD: Update e Delete. Com isso você pode construir qualquer sistema CRUD completo.",
  },
  {
    id: 3,
    type: "architecture",
    tag: "FLUXO DE ATUALIZAÇÃO",
    title: "Como funciona\no Update",
    subtitle: "Do clique do usuário até o Firestore",
    steps: [
      { icon: "👆", text: "Usuário clica em 'Editar' → formulário pré-preenchido com os dados atuais aparece na tela." },
      { icon: "✏️", text: "Usuário modifica os campos e clica em 'Salvar' → handleSubmit dispara." },
      { icon: "⚙️", text: "Service atualizarUsuario(id, dados) é chamado → executa updateDoc(doc(db, 'usuarios', id), dados)." },
      { icon: "🔥", text: "Firestore atualiza apenas os campos especificados — os outros permanecem intocados. Sem reescrever o documento inteiro." },
    ],
  },
  {
    id: 4,
    type: "code",
    tag: "UPDATE — CÓDIGO",
    title: "updateDoc —\nAtualizando dados",
    codeLabel: "src/services/userService.ts (atualizado)",
    code: `import {
  collection, addDoc, getDoc, getDocs,
  doc, updateDoc, deleteDoc,         // ← novos imports
  serverTimestamp, query, orderBy,
} from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import { UserFormData, User } from "@/types/user";

const COLLECTION = "usuarios";

// Atualiza campos específicos — sem reescrever o documento inteiro
export async function atualizarUsuario(
  id: string,
  dados: Partial<UserFormData>  // Partial = todos os campos opcionais
): Promise<void> {
  await updateDoc(doc(db, COLLECTION, id), dados);
}

// Lista todos os usuários ordenados por data de criação
export async function listarUsuarios(): Promise<User[]> {
  const q = query(collection(db, COLLECTION), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() } as User));
}`,
    tip: "Partial<UserFormData> torna todos os campos opcionais. Você pode atualizar só o telefone sem precisar enviar nome e email.",
  },
  {
    id: 5,
    type: "code",
    tag: "DELETE — CÓDIGO",
    title: "deleteDoc —\nExcluindo documentos",
    codeLabel: "src/services/userService.ts (continua)",
    code: `// Exclui o documento permanentemente
export async function excluirUsuario(id: string): Promise<void> {
  await deleteDoc(doc(db, COLLECTION, id));
}

// Busca usuários por nome (case-sensitive no Firestore)
export async function buscarPorNome(nome: string): Promise<User[]> {
  // Técnica: busca documentos onde nome começa com o texto digitado
  const q = query(
    collection(db, COLLECTION),
    orderBy("nome"),
    // startAt e endAt criam um range de busca no Firestore
  );
  const snap = await getDocs(q);
  // Filtra no cliente — para busca simples sem índice composto
  return snap.docs
    .map(d => ({ id: d.id, ...d.data() } as User))
    .filter(u => u.nome.toLowerCase().includes(nome.toLowerCase()));
}`,
    tip: "O Firestore não tem LIKE do SQL. Para busca por texto, filtre no cliente após getDocs() ou use Algolia/Typesense para busca avançada.",
  },
  {
    id: 6,
    type: "code",
    tag: "TELA DE LISTAGEM",
    title: "Listagem com\nEditar e Excluir",
    codeLabel: "Padrão de lista com ações (essencial)",
    code: `"use client";

import { useState, useEffect } from "react";
import { listarUsuarios, excluirUsuario } from "@/services/userService";
import { User } from "@/types/user";

export default function ListaPage() {
  const [usuarios, setUsuarios] = useState<User[]>([]);
  const [editando, setEditando] = useState<User | null>(null);

  useEffect(() => { carregar(); }, []);

  async function carregar() {
    setUsuarios(await listarUsuarios());
  }

  async function handleExcluir(id: string) {
    if (!confirm("Excluir este usuário?")) return; // confirmação obrigatória!
    await excluirUsuario(id);
    carregar(); // recarrega a lista
  }

  return (
    <div>
      {usuarios.map(u => (
        <div key={u.id}>
          <span>{u.nome}</span>
          <button onClick={() => setEditando(u)}>✏️ Editar</button>
          <button onClick={() => handleExcluir(u.id!)}>🗑️ Excluir</button>
        </div>
      ))}
      {editando && <FormularioEdicao usuario={editando} onSalvar={carregar} />}
    </div>
  );
}`,
    tip: "confirm() é o jeito mais simples de confirmar exclusão. Em produção, use um modal personalizado para melhor UX.",
  },
  {
    id: 7,
    type: "code",
    tag: "FORMULÁRIO DE EDIÇÃO",
    title: "Editando os dados\nexistentes",
    codeLabel: "FormularioEdicao — pré-preenchido",
    code: `function FormularioEdicao({
  usuario,
  onSalvar,
}: {
  usuario: User;
  onSalvar: () => void;
}) {
  const [form, setForm] = useState({
    nome: usuario.nome,
    email: usuario.email,
    telefone: usuario.telefone,
  });
  const [salvando, setSalvando] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSalvando(true);
    await atualizarUsuario(usuario.id!, form); // ← chama o service
    onSalvar(); // recarrega a lista no componente pai
    setSalvando(false);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="nome"     value={form.nome}     onChange={handleChange} />
      <input name="email"    value={form.email}    onChange={handleChange} />
      <input name="telefone" value={form.telefone} onChange={handleChange} />
      <button type="submit" disabled={salvando}>
        {salvando ? "Salvando..." : "Salvar"}
      </button>
    </form>
  );
}`,
    tip: "O formulário começa pré-preenchido com os dados atuais (useState com o objeto usuario). Só os campos modificados chegam ao updateDoc.",
  },
  {
    id: 8,
    type: "best-practices",
    tag: "BOAS PRÁTICAS",
    title: "Update e Delete\ncom segurança",
    items: [
      { icon: "🛡️", text: "Sempre confirme antes de excluir — confirm() para protótipos, modal customizado para produção. Nunca delete sem aviso." },
      { icon: "⚡", text: "updateDoc() atualiza só os campos que você passa. setDoc() com { merge: true } faz o mesmo mas reescreve o documento inteiro se não tiver merge." },
      { icon: "🔄", text: "Após qualquer operação de escrita, recarregue a lista — o Firestore tem cache e pode não refletir mudanças imediatamente no getDocs()." },
      { icon: "🔒", text: "Em produção, adicione regras de segurança no Firestore para que só o dono do documento possa atualizar ou excluir." },
    ],
    tip: "Soft delete: em sistemas reais, adicione um campo 'excluido: true' em vez de deletar — facilita auditoria e recuperação de dados.",
  },
  {
    id: 9,
    type: "quiz",
    tag: "QUIZ 🔥",
    title: "Qual função\natualiza um doc?",
    question: "Você quer atualizar apenas o telefone de um usuário sem sobrescrever os outros campos (nome, email). Qual função usar?",
    options: [
      {
        text: "updateDoc(doc(db, 'usuarios', id), { telefone: novoTel })",
        correct: true,
        explanation: "updateDoc() faz merge automático — só atualiza os campos que você passa. Perfeito para edições parciais.",
      },
      {
        text: "setDoc(doc(db, 'usuarios', id), { telefone: novoTel })",
        correct: false,
        explanation: "setDoc() sem { merge: true } SUBSTITUI todo o documento. O nome e email seriam apagados!",
      },
      {
        text: "addDoc(collection(db, 'usuarios'), { telefone: novoTel })",
        correct: false,
        explanation: "addDoc() CRIA um novo documento — não atualiza o existente. Seria um duplicado com ID diferente.",
      },
      {
        text: "patchDoc(doc(db, 'usuarios', id), { telefone: novoTel })",
        correct: false,
        explanation: "patchDoc() não existe no SDK do Firestore. A função de atualização parcial é updateDoc().",
      },
    ],
    xp: 15,
  },
  {
    id: 10,
    type: "fill-blank",
    tag: "CÓDIGO NA PRÁTICA",
    title: "Complete a exclusão\nno service",
    instruction: "Para excluir um documento do Firestore, qual função você usa? (ela recebe a referência do documento como argumento)",
    prefix: `import { doc, `,
    suffix: ` } from "firebase/firestore";

export async function excluirUsuario(id: string): Promise<void> {
  await deleteDoc(doc(db, "usuarios", id));
}`,
    answer: "deleteDoc",
    hint: "É uma função do SDK firebase/firestore. O nome é auto-explicativo: delete + doc.",
    xp: 20,
  },
  {
    id: 11,
    type: "mini-challenge",
    tag: "MISSÃO 7.3",
    title: "CRUD\nCOMPLETO",
    subtitle: "Evolua o projeto da Aula 7.2 com busca, edição e exclusão",
    tasks: [
      "Adicionou atualizarUsuario(id, dados) no userService usando updateDoc()",
      "Adicionou excluirUsuario(id) no userService usando deleteDoc()",
      "Adicionou listarUsuarios() para buscar todos os documentos com orderBy",
      "Criou formulário de edição pré-preenchido com os dados atuais",
      "Implementou exclusão com confirmação antes de deletar",
    ],
    bonus: [
      "Campo de busca que filtra a lista pelo nome do usuário",
      "Feedback visual (loading) durante operações de escrita",
      "Estado 'editando' que controla qual formulário de edição está aberto",
    ],
    xp: 50,
    nextHref: "/modulos/backend/parte2",
    nextLabel: "Atividade Final →",
  },
];
