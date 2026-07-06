import type { Slide } from "@/types/slides";

export const AULA72_SLIDES: Slide[] = [
  {
    id: 1,
    type: "cover",
    tag: "🔥 Módulo 07 · Aula 7.2",
    title: "CADASTRO\nEM CAMADAS",
    subtitle: "Construa um formulário de cadastro profissional com a arquitetura types → services → lib → app.",
  },
  {
    id: 2,
    type: "concept",
    tag: "POR QUE CAMADAS?",
    title: "O problema do código\nespaguete",
    items: [
      { icon: "🍝", text: "Sem arquitetura: toda a lógica fica misturada — SQL no meio do JSX, fetch direto no clique do botão, copiar código entre páginas." },
      { icon: "🏗️", text: "Com camadas: cada arquivo tem uma responsabilidade única. A tela não sabe como o banco funciona — só chama a função do service." },
      { icon: "♻️", text: "Reutilização: a função cadastrarUsuario() pode ser chamada de qualquer formulário do sistema — sem duplicar código." },
      { icon: "🧪", text: "Testabilidade: services puros são fáceis de testar. Telas com banco direto são um pesadelo para testar." },
    ],
    tip: "Esta é a mesma arquitetura usada em empresas reais. Aprender agora te coloca na frente de 80% dos devs júnior.",
  },
  {
    id: 3,
    type: "architecture",
    tag: "O PADRÃO",
    title: "types → services\n→ lib → app",
    subtitle: "Cada camada tem uma responsabilidade única e bem definida",
    steps: [
      { icon: "📝", text: "types/user.ts — Define o contrato dos dados. Interface User diz exatamente quais campos existem e seus tipos." },
      { icon: "⚙️", text: "services/userService.ts — Funções de banco de dados. Aqui fica o addDoc, getDoc, query. A tela nunca toca o Firestore diretamente." },
      { icon: "🔌", text: "lib/firebaseConfig.ts — Conexão com o Firebase. Exporta a instância 'db' que os services usam." },
      { icon: "🖥️", text: "app/atividade-2/page.tsx — A tela. Só cuida do formulário, estado e UX. Chama o service para qualquer operação de banco." },
    ],
    tip: "A regra de ouro: a tela não sabe o que é addDoc(). O service não sabe o que é useState(). Cada um no seu lugar.",
  },
  {
    id: 4,
    type: "code",
    tag: "CAMADA 1 — TYPES",
    title: "src/types/user.ts\nO contrato dos dados",
    codeLabel: "src/types/user.ts",
    code: `export interface User {
  id?: string;       // gerado automaticamente pelo Firestore
  nome: string;
  email: string;
  telefone: string;
  createdAt?: Date;  // preenchido pelo serverTimestamp()
}

// Omit remove os campos que não vêm do formulário
// O aluno não digita o id nem o createdAt — eles são automáticos
export type UserFormData = Omit<User, "id" | "createdAt">;`,
    tip: "Omit<User, 'id' | 'createdAt'> cria um novo tipo com todos os campos de User, exceto id e createdAt. Elegante e seguro.",
  },
  {
    id: 5,
    type: "code",
    tag: "CAMADA 2 — SERVICE",
    title: "src/services/\nuserService.ts",
    codeLabel: "src/services/userService.ts",
    code: `import { collection, addDoc, getDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import { UserFormData, User } from "@/types/user";

const COLLECTION = "usuarios";

// Cria um novo usuário e retorna o ID gerado pelo Firestore
export async function cadastrarUsuario(dados: UserFormData): Promise<string> {
  const docRef = await addDoc(collection(db, COLLECTION), {
    ...dados,                    // espalha nome, email, telefone
    createdAt: serverTimestamp() // timestamp do servidor
  });
  return docRef.id;
}

// Busca um usuário pelo ID
export async function buscarUsuario(id: string): Promise<User | null> {
  const snap = await getDoc(doc(db, COLLECTION, id));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() } as User;
}`,
    tip: "...dados usa o spread operator para copiar todos os campos do formulário sem listar cada um. Prático quando o objeto cresce.",
  },
  {
    id: 6,
    type: "code",
    tag: "CAMADA 4 — TELA",
    title: "Formulário de\ncadastro",
    codeLabel: "src/app/atividade-2/page.tsx (essencial)",
    code: `"use client"; // precisa de useState e eventos

import { useState } from "react";
import { useRouter } from "next/navigation";
import { cadastrarUsuario } from "@/services/userService";
import { UserFormData } from "@/types/user";

export default function Atividade2Page() {
  const router = useRouter();
  const [form, setForm] = useState<UserFormData>({
    nome: "", email: "", telefone: ""
  });
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const id = await cadastrarUsuario(form);  // ← chama o service
      router.push(\`/perfil/\${id}\`);            // ← redireciona
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="nome"     onChange={handleChange} required />
      <input name="email"    onChange={handleChange} required />
      <input name="telefone" onChange={handleChange} required />
      <button type="submit">Cadastrar</button>
    </form>
  );
}`,
    tip: "handleChange usa e.target.name para saber qual campo atualizar. Um único handler para todos os inputs — sem repetir código.",
  },
  {
    id: 7,
    type: "code",
    tag: "ROTA DINÂMICA",
    title: "Página de perfil —\n/perfil/[id]",
    codeLabel: "src/app/perfil/[id]/page.tsx",
    code: `// Sem "use client" — este é um Server Component
// O Next.js busca os dados no servidor antes de enviar o HTML
import { buscarUsuario } from "@/services/userService";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>; // Next.js 15+ — params é Promise
}

export default async function PerfilPage({ params }: Props) {
  const { id } = await params;
  const usuario = await buscarUsuario(id);

  if (!usuario) notFound(); // retorna 404 se não encontrar

  return (
    <main>
      <h1>✅ Cadastro realizado!</h1>
      <p>ID Firestore: {id}</p>
      <p>Nome: {usuario.nome}</p>
      <p>E-mail: {usuario.email}</p>
      <p>Telefone: {usuario.telefone}</p>
    </main>
  );
}`,
    tip: "Server Component é mais seguro e rápido: o Firestore é acessado no servidor, não no navegador do usuário.",
  },
  {
    id: 8,
    type: "comparison",
    tag: "CLIENT vs SERVER",
    title: "use client vs\nServer Component",
    left: {
      label: '"use client" (Client Component)',
      items: [
        "Roda no navegador do usuário",
        "Pode usar useState, useEffect",
        "Acessa eventos: onClick, onChange",
        "Necessário para formulários reativos",
        "Firebase SDK funciona aqui",
      ],
    },
    right: {
      label: "Server Component (padrão)",
      items: [
        "Roda no servidor Next.js",
        "Sem hooks de estado",
        "Sem eventos de clique",
        "Ideal para buscar e exibir dados",
        "Mais seguro: credenciais ficam no servidor",
      ],
    },
    tip: "Regra prática: se precisa de interatividade → use client. Se só mostra dados → Server Component.",
  },
  {
    id: 9,
    type: "quiz",
    tag: "QUIZ 🔥",
    title: "O que é um\nService?",
    question: "Por que criamos um arquivo services/userService.ts separado em vez de chamar addDoc() diretamente no componente de formulário?",
    options: [
      {
        text: "Para isolar a lógica de banco: o componente não sabe o que é Firestore",
        correct: true,
        explanation: "Exato! O service é a camada que conhece o Firestore. O componente só chama cadastrarUsuario(dados) — se o banco mudar amanhã, só o service é atualizado.",
      },
      {
        text: "Porque o Next.js exige essa estrutura de arquivos para funcionar",
        correct: false,
        explanation: "O Next.js não exige a pasta services/. É uma convenção arquitetural, não um requisito do framework.",
      },
      {
        text: "Para que o código compile mais rápido com TypeScript",
        correct: false,
        explanation: "Services não afetam o tempo de compilação. O benefício é organizacional e de manutenção.",
      },
      {
        text: "Para evitar que o Firebase SDK seja instalado duas vezes",
        correct: false,
        explanation: "A instalação do SDK é única (package.json). O service existe para separação de responsabilidades.",
      },
    ],
    xp: 15,
  },
  {
    id: 10,
    type: "fill-blank",
    tag: "CÓDIGO NA PRÁTICA",
    title: "Complete a chamada\ndo service",
    instruction: "No handleSubmit do formulário, qual função do userService você chama para salvar o usuário e obter o ID gerado?",
    prefix: `async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();
  setStatus("loading");
  try {
    const id = await `,
    suffix: `(form);
    router.push(\`/perfil/\${id}\`);
  } catch {
    setStatus("error");
  }
}`,
    answer: "cadastrarUsuario",
    hint: "É a função exportada do userService.ts que chama addDoc internamente. Nome descreve a ação.",
    xp: 20,
  },
  {
    id: 11,
    type: "mini-challenge",
    tag: "MISSÃO 7.2",
    title: "IMPLEMENTE\nO CADASTRO",
    subtitle: "Formulário profissional com arquitetura em camadas funcionando",
    tasks: [
      "Criou src/types/user.ts com interface User e type UserFormData",
      "Criou src/services/userService.ts com cadastrarUsuario() e buscarUsuario()",
      "Formulário em atividade-2/page.tsx com 'use client' e useRouter",
      "Cadastro redireciona para /perfil/[id] após salvar no Firestore",
      "Página /perfil/[id] busca e exibe os dados do usuário (Server Component)",
    ],
    bonus: [
      "Adicionou tratamento de erro no formulário (mensagem de erro visível)",
      "Impediu duplo submit com estado 'loading' no botão",
      "Testou o fluxo completo: cadastrar → ver o ID no Firestore → acessar o perfil",
    ],
    xp: 50,
    nextHref: "/modulos/backend/parte1",
    nextLabel: "Atividade Intermediária →",
  },
];
