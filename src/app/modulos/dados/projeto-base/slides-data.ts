import type { Slide } from "@/types/slides";

export const PROJETO_BASE_SLIDES: Slide[] = [
  {
    id: 1,
    type: "cover",
    tag: "Módulo 04 · Projeto Base",
    title: "PROJETO BASE\nFIREBASE AUTH",
    subtitle: "Pasta a pasta, arquivo a arquivo — copie o código e o app de autenticação já funciona.",
  },
  {
    id: 2,
    type: "concept",
    tag: "Visão geral",
    title: "O que você vai montar",
    items: [
      { icon: "🏠", text: "Página inicial (/): exibe links para login e cadastro, e redireciona automaticamente se o usuário já estiver logado." },
      { icon: "🔑", text: "Login (/(auth)/login): formulário e-mail + senha que chama o Firebase e entra na aplicação." },
      { icon: "📝", text: "Cadastro (/(auth)/cadastro): cria conta com nome, e-mail e senha; perfil atualizado na hora com updateProfile." },
      { icon: "🔒", text: "Aplicação (/aplicacao): rota protegida — quem não está logado é redirecionado para /auth/login automaticamente." },
      { icon: "⚙️", text: "services/autenticar.ts: todos os serviços do Firebase num só lugar (criar, entrar, sair, editar perfil e excluir conta)." },
    ],
  },
  {
    id: 3,
    type: "files",
    tag: "Arquitetura",
    title: "Estrutura de Pastas",
    codeLabel: "Estrutura de Pastas",
    code: `meu-app/
├── firebase/
│   └── config.ts           ← inicializa Firebase, exporta auth
│
├── services/
│   └── autenticar.ts       ← cadastrar, entrar, sair, editar, excluir
│
├── app/
│   ├── page.tsx            ← home: redireciona se já logado
│   │
│   ├── (auth)/             ← grupo de rotas (URL não inclui "/auth")
│   │   ├── login/
│   │   │   └── page.tsx   ← formulário de login
│   │   └── cadastro/
│   │       └── page.tsx   ← formulário de cadastro
│   │
│   └── aplicacao/
│       └── page.tsx        ← rota protegida (só logado entra)
│
└── .env.local              ← chaves do Firebase (NUNCA suba no git!)`,
    tip: "O grupo (auth) usa parênteses no nome da pasta: organiza sem adicionar /auth na URL. /login e /cadastro ficam acessíveis diretamente.",
  },
  {
    id: 4,
    type: "architecture",
    tag: "Passo a passo",
    title: "Monte o projeto em 6 passos",
    subtitle: "Faça um de cada vez antes de copiar o código",
    steps: [
      { icon: "1️⃣", text: "Crie o projeto: npx create-next-app@latest meu-app — marque TypeScript: sim e App Router: sim." },
      { icon: "2️⃣", text: "Instale o Firebase: npm install firebase (dentro da pasta meu-app)." },
      { icon: "3️⃣", text: "Crie as pastas: firebase/, services/, app/(auth)/login/, app/(auth)/cadastro/, app/aplicacao/." },
      { icon: "4️⃣", text: "Crie o arquivo .env.local na raiz com as variáveis NEXT_PUBLIC_FIREBASE_* — próximo slide mostra o formato." },
      { icon: "5️⃣", text: "Copie cada arquivo dos slides seguintes na ordem em que aparecem (config.ts primeiro)." },
      { icon: "6️⃣", text: "Rode npm run dev e acesse http://localhost:3000 — cadastre-se, faça login, acesse /aplicacao e saia." },
    ],
    tip: "Sempre copie o firebase/config.ts antes dos outros arquivos: todos dependem do auth exportado por ele.",
  },
  {
    id: 5,
    type: "code",
    tag: "Antes de começar",
    title: ".env.local — Chaves do Firebase",
    codeLabel: ".env.local",
    code: `# Cole os valores do Firebase Console →
# Configurações do projeto → Seus apps → Configuração do SDK

NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=meu-app.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=meu-app
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=meu-app.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc...`,
    tip: "NEXT_PUBLIC_ é obrigatório para o browser enxergar as variáveis. Adicione .env.local no .gitignore — o arquivo já deve estar lá se você usou create-next-app.",
  },
  {
    id: 6,
    type: "code",
    tag: "Arquivo 1 de 6",
    title: "firebase/config.ts",
    codeLabel: "firebase/config.ts",
    code: `import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey:            process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain:        process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId:         process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket:     process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId:             process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// getApps() evita reinicializar no hot-reload do Next.js
const app = getApps().length === 0
  ? initializeApp(firebaseConfig)
  : getApp();

export const auth = getAuth(app);`,
    tip: "Um único arquivo de configuração. Todos os outros serviços (Firestore, Storage) também seriam inicializados e exportados aqui.",
  },
  {
    id: 7,
    type: "code",
    tag: "Arquivo 2 de 6 — Parte 1",
    title: "services/autenticar.ts — Login e Cadastro",
    codeLabel: "services/autenticar.ts",
    code: `import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import { auth } from "@/firebase/config";

export async function cadastrar(nome: string, email: string, senha: string) {
  const cred = await createUserWithEmailAndPassword(auth, email, senha);
  await updateProfile(cred.user, { displayName: nome });
  return cred.user;
}

export async function entrar(email: string, senha: string) {
  const cred = await signInWithEmailAndPassword(auth, email, senha);
  return cred.user;
}

export async function sair() {
  await signOut(auth);
}`,
    tip: "updateProfile salva o nome logo após o cadastro — o usuário já aparece com displayName preenchido na mesma sessão.",
  },
  {
    id: 8,
    type: "code",
    tag: "Arquivo 2 de 6 — Parte 2",
    title: "services/autenticar.ts — Editar e Excluir",
    codeLabel: "services/autenticar.ts (continuação — cole abaixo das funções anteriores)",
    code: `import {
  updateProfile,
  updatePassword,
  deleteUser,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import { auth } from "@/firebase/config";

export async function editarPerfil(novoNome: string) {
  if (!auth.currentUser) throw new Error("Não autenticado");
  await updateProfile(auth.currentUser, { displayName: novoNome });
}

export async function excluirConta(senhaAtual: string) {
  const user = auth.currentUser;
  if (!user?.email) throw new Error("Não autenticado");
  const cred = EmailAuthProvider.credential(user.email, senhaAtual);
  await reauthenticateWithCredential(user, cred);
  await deleteUser(user);
}

export async function alterarSenha(senhaAtual: string, novaSenha: string) {
  const user = auth.currentUser;
  if (!user?.email) throw new Error("Não autenticado");
  const cred = EmailAuthProvider.credential(user.email, senhaAtual);
  await reauthenticateWithCredential(user, cred);
  await updatePassword(user, novaSenha);
}`,
    tip: "Operações sensíveis (excluir conta, trocar senha) exigem reautenticação recente — o Firebase rejeita se o login foi há muito tempo, por segurança.",
  },
  {
    id: 9,
    type: "code",
    tag: "Arquivo 3 de 6",
    title: "app/page.tsx — Página Inicial",
    codeLabel: "app/page.tsx",
    code: `"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/config";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Se já logado, vai direto para a aplicação
    return onAuthStateChanged(auth, (user) => {
      if (user) router.push("/aplicacao");
    });
  }, [router]);

  return (
    <main>
      <h1>Bem-vindo</h1>
      <p>Este app usa Firebase Auth para autenticação.</p>
      <a href="/auth/login">Entrar</a>
      <a href="/auth/cadastro">Criar conta</a>
    </main>
  );
}`,
    tip: "onAuthStateChanged retorna a função de limpeza (unsub) — passando direto ao return do useEffect, o listener é removido quando o componente desmonta.",
  },
  {
    id: 10,
    type: "code",
    tag: "Arquivo 4 de 6",
    title: "(auth)/login/page.tsx — Formulário de Login",
    codeLabel: "app/(auth)/login/page.tsx",
    code: `"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { entrar } from "@/services/autenticar";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro("");
    try {
      await entrar(email, senha);
      router.push("/aplicacao");
    } catch {
      setErro("E-mail ou senha incorretos.");
    }
  }

  return (
    <main>
      <h1>Entrar</h1>
      <form onSubmit={handleSubmit}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required />
        {erro && <p style={{ color: "red" }}>{erro}</p>}
        <button type="submit">Entrar</button>
      </form>
      <a href="/auth/cadastro">Não tem conta? Cadastre-se</a>
    </main>
  );
}`,
    tip: "O try/catch captura todos os erros do Firebase (senha errada, e-mail não encontrado, conta desativada) e exibe uma mensagem amigável sem expor detalhes técnicos.",
  },
  {
    id: 11,
    type: "code",
    tag: "Arquivo 5 de 6",
    title: "(auth)/cadastro/page.tsx — Criar Conta",
    codeLabel: "app/(auth)/cadastro/page.tsx",
    code: `"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { cadastrar } from "@/services/autenticar";

export default function CadastroPage() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro("");
    try {
      await cadastrar(nome, email, senha);
      router.push("/aplicacao");
    } catch {
      setErro("Erro ao criar conta. Verifique os dados e tente novamente.");
    }
  }

  return (
    <main>
      <h1>Criar Conta</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
        <input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Senha (mín. 6 caracteres)" minLength={6}
               value={senha} onChange={(e) => setSenha(e.target.value)} required />
        {erro && <p style={{ color: "red" }}>{erro}</p>}
        <button type="submit">Criar conta</button>
      </form>
      <a href="/auth/login">Já tem conta? Entrar</a>
    </main>
  );
}`,
    tip: "minLength={6} dá feedback imediato antes de chamar o Firebase — o Firebase também bloqueia senhas com menos de 6 caracteres no servidor.",
  },
  {
    id: 12,
    type: "code",
    tag: "Arquivo 6 de 6",
    title: "aplicacao/page.tsx — Rota Protegida",
    codeLabel: "app/aplicacao/page.tsx",
    code: `"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "@/firebase/config";
import { sair } from "@/services/autenticar";

export default function AplicacaoPage() {
  const [usuario, setUsuario] = useState<User | null>(null);
  const [carregando, setCarregando] = useState(true);
  const router = useRouter();

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      if (!user) { router.push("/auth/login"); return; }
      setUsuario(user);
      setCarregando(false);
    });
  }, [router]);

  if (carregando) return <p>Verificando acesso...</p>;

  return (
    <main>
      <h1>Área Privada</h1>
      <p>Olá, {usuario?.displayName ?? usuario?.email}!</p>
      <p>Só usuários logados chegam até aqui.</p>
      <button onClick={() => sair().then(() => router.push("/"))}>
        Sair
      </button>
    </main>
  );
}`,
    tip: "carregando=true evita o 'flash': sem ele, a página exibiria o conteúdo privado por um frame antes do Firebase responder e disparar o redirect.",
  },
  {
    id: 13,
    type: "concept",
    tag: "Entendendo o código",
    title: "Como as peças se conectam",
    items: [
      { icon: "🔗", text: "firebase/config.ts é o ponto único de inicialização — todos importam auth de lá, garantindo uma única instância no app inteiro." },
      { icon: "🧩", text: "services/autenticar.ts encapsula o Firebase: as páginas chamam cadastrar(), entrar() e sair() sem saber nada sobre o SDK diretamente." },
      { icon: "👁️", text: "onAuthStateChanged é o sensor: dispara imediatamente ao montar e toda vez que o estado muda (login, logout, expiração de sessão)." },
      { icon: "🚦", text: "A proteção é reativa: se a sessão expirar enquanto o usuário está em /aplicacao, o redirect para /auth/login acontece automaticamente." },
      { icon: "⏳", text: "carregando=true evita flash de conteúdo privado: exibe 'Verificando acesso...' até o Firebase confirmar o usuário — fração de segundo, mas perceptível." },
    ],
  },
  {
    id: 14,
    type: "mini-challenge",
    tag: "🎯 Missão Projeto Base",
    title: "PROJETO BASE\nNO AR",
    subtitle: "Clone a estrutura e veja o app funcionando",
    tasks: [
      "Crie um projeto Next.js com TypeScript e App Router (create-next-app)",
      "Instale o Firebase: npm install firebase",
      "Crie as pastas: firebase/, services/, app/(auth)/login/, app/(auth)/cadastro/, app/aplicacao/",
      "Configure o .env.local com as chaves do seu projeto Firebase Console",
      "Copie cada arquivo dos slides anteriores (firebase/config.ts primeiro)",
      "Rode npm run dev: cadastre-se, faça login, acesse /aplicacao e saia",
    ],
    bonus: [
      "Adicione tratamento de erro específico por código Firebase (auth/email-already-in-use, auth/weak-password)",
      "Exiba o nome e foto do usuário no header usando onAuthStateChanged em um Context global",
    ],
    xp: 40,
    nextHref: "/modulos/dados/firestore-leitura",
    nextLabel: "Aula 02: Firestore (Leitura) →",
  },
];
