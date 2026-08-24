module.exports=[93695,(a,b,c)=>{b.exports=a.x("next/dist/shared/lib/no-fallback-error.external.js",()=>require("next/dist/shared/lib/no-fallback-error.external.js"))},64240,(a,b,c)=>{"use strict";function d(a){if("function"!=typeof WeakMap)return null;var b=new WeakMap,c=new WeakMap;return(d=function(a){return a?c:b})(a)}c._=function(a,b){if(!b&&a&&a.__esModule)return a;if(null===a||"object"!=typeof a&&"function"!=typeof a)return{default:a};var c=d(b);if(c&&c.has(a))return c.get(a);var e={__proto__:null},f=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var g in a)if("default"!==g&&Object.prototype.hasOwnProperty.call(a,g)){var h=f?Object.getOwnPropertyDescriptor(a,g):null;h&&(h.get||h.set)?Object.defineProperty(e,g,h):e[g]=a[g]}return e.default=a,c&&c.set(a,e),e}},50640,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0}),Object.defineProperty(c,"InvariantError",{enumerable:!0,get:function(){return d}});class d extends Error{constructor(a,b){super(`Invariant: ${a.endsWith(".")?a:a+"."} This is a bug in Next.js.`,b),this.name="InvariantError"}}},59469,a=>{"use strict";a.s(["default",()=>b]);let b=(0,a.i(11857).registerClientReference)(function(){throw Error("Attempted to call the default export of [project]/src/components/slides/SlidePresentation.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"[project]/src/components/slides/SlidePresentation.tsx <module evaluation>","default")},59394,a=>{"use strict";a.s(["default",()=>b]);let b=(0,a.i(11857).registerClientReference)(function(){throw Error("Attempted to call the default export of [project]/src/components/slides/SlidePresentation.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"[project]/src/components/slides/SlidePresentation.tsx","default")},9844,a=>{"use strict";a.i(59469);var b=a.i(59394);a.n(b)},10585,a=>{a.v("/_next/static/media/favicon.0x3dzn~oxb6tn.ico"+(globalThis.NEXT_CLIENT_ASSET_SUFFIX||""))},68611,a=>{"use strict";let b={src:a.i(10585).default,width:256,height:256};a.s(["default",0,b])},95498,a=>{"use strict";var b=a.i(7997),c=a.i(9844);let d=[{id:1,type:"cover",tag:"Módulo 04 · Projeto Base",title:"PROJETO BASE\nFIREBASE AUTH",subtitle:"Pasta a pasta, arquivo a arquivo — copie o código e o app de autenticação já funciona."},{id:2,type:"concept",tag:"Visão geral",title:"O que você vai montar",items:[{icon:"🏠",text:"Página inicial (/): exibe links para login e cadastro, e redireciona automaticamente se o usuário já estiver logado."},{icon:"🔑",text:"Login (/login): formulário e-mail + senha que chama o Firebase e entra na aplicação."},{icon:"📝",text:"Cadastro (/cadastro): cria conta com nome, e-mail e senha; perfil atualizado na hora com updateProfile."},{icon:"🔒",text:"Aplicação (/aplicacao): rota protegida — quem não está logado é redirecionado para /login automaticamente."},{icon:"⚙️",text:"services/autenticar.ts: todos os serviços do Firebase num só lugar (criar, entrar, sair, editar perfil e excluir conta)."}]},{id:3,type:"files",tag:"Arquitetura",title:"Estrutura de Pastas",codeLabel:"Estrutura de Pastas",code:`meu-app/
├── firebase/
│   └── config.ts           ← inicializa Firebase, exporta auth
│
├── services/
│   └── autenticar.ts       ← cadastrar, entrar, sair, editar, excluir
│
├── app/
│   ├── page.tsx            ← home: redireciona se j\xe1 logado
│   │
│   ├── (auth)/             ← grupo de rotas (URL n\xe3o inclui "/auth")
│   │   ├── login/          ← acess\xedvel em /login
│   │   │   └── page.tsx
│   │   └── cadastro/       ← acess\xedvel em /cadastro
│   │       └── page.tsx
│   │
│   └── aplicacao/
│       └── page.tsx        ← rota protegida (s\xf3 logado entra)
│
└── .env.local              ← chaves do Firebase (NUNCA suba no git!)`,tip:"O grupo (auth) usa parênteses no nome da pasta: organiza sem adicionar /auth na URL. O link correto é /login, não /auth/login."},{id:4,type:"architecture",tag:"Passo a passo",title:"Monte o projeto em 6 passos",subtitle:"Faça um de cada vez antes de copiar o código",steps:[{icon:"1️⃣",text:"Crie o projeto: npx create-next-app@latest meu-app — TypeScript: sim, App Router: sim, Tailwind CSS: sim."},{icon:"2️⃣",text:"Instale o Firebase: npm install firebase (dentro da pasta meu-app)."},{icon:"3️⃣",text:"Crie as pastas: firebase/, services/, app/(auth)/login/, app/(auth)/cadastro/, app/aplicacao/."},{icon:"4️⃣",text:"Crie o arquivo .env.local na raiz com as variáveis NEXT_PUBLIC_FIREBASE_* — próximo slide mostra o formato."},{icon:"5️⃣",text:"Copie cada arquivo dos slides seguintes na ordem em que aparecem (config.ts primeiro)."},{icon:"6️⃣",text:"Rode npm run dev e acesse http://localhost:3000 — cadastre-se, faça login, acesse /aplicacao e saia."}],tip:"Sempre copie o firebase/config.ts antes dos outros arquivos: todos dependem do auth exportado por ele."},{id:5,type:"code",tag:"Antes de começar",title:".env.local — Chaves do Firebase",codeLabel:".env.local",code:`# Cole os valores do Firebase Console →
# Configura\xe7\xf5es do projeto → Seus apps → Configura\xe7\xe3o do SDK

NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=meu-app.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=meu-app
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=meu-app.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc...`,tip:"NEXT_PUBLIC_ é obrigatório para o browser enxergar as variáveis. Adicione .env.local no .gitignore — o arquivo já deve estar lá se você usou create-next-app."},{id:6,type:"code",tag:"Arquivo 1 de 6",title:"firebase/config.ts",codeLabel:"firebase/config.ts",code:`import { initializeApp, getApps, getApp } from "firebase/app";
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

export const auth = getAuth(app);`,tip:"Um único arquivo de configuração. Todos os outros serviços (Firestore, Storage) também seriam inicializados e exportados aqui."},{id:7,type:"code",tag:"Arquivo 2 de 6 — Parte 1",title:"services/autenticar.ts — Login e Cadastro",codeLabel:"services/autenticar.ts",code:`import {
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
}`,tip:"updateProfile salva o nome logo após o cadastro — o usuário já aparece com displayName preenchido na mesma sessão."},{id:8,type:"code",tag:"Arquivo 2 de 6 — Parte 2",title:"services/autenticar.ts — Editar e Excluir",codeLabel:"services/autenticar.ts (continuação — cole abaixo das funções anteriores)",code:`import {
  updateProfile,
  updatePassword,
  deleteUser,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import { auth } from "@/firebase/config";

export async function editarPerfil(novoNome: string) {
  if (!auth.currentUser) throw new Error("N\xe3o autenticado");
  await updateProfile(auth.currentUser, { displayName: novoNome });
}

export async function excluirConta(senhaAtual: string) {
  const user = auth.currentUser;
  if (!user?.email) throw new Error("N\xe3o autenticado");
  const cred = EmailAuthProvider.credential(user.email, senhaAtual);
  await reauthenticateWithCredential(user, cred);
  await deleteUser(user);
}

export async function alterarSenha(senhaAtual: string, novaSenha: string) {
  const user = auth.currentUser;
  if (!user?.email) throw new Error("N\xe3o autenticado");
  const cred = EmailAuthProvider.credential(user.email, senhaAtual);
  await reauthenticateWithCredential(user, cred);
  await updatePassword(user, novaSenha);
}`,tip:"Operações sensíveis (excluir conta, trocar senha) exigem reautenticação recente — o Firebase rejeita se o login foi há muito tempo, por segurança."},{id:9,type:"code",tag:"Arquivo 3 de 6",title:"app/page.tsx — Página Inicial",codeLabel:"app/page.tsx",code:`"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/config";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      if (user) router.push("/aplicacao");
    });
  }, [router]);

  return (
    <main className="min-h-screen bg-gray-950 flex flex-col items-center justify-center gap-8 px-4">
      <div className="text-center">
        <div className="text-5xl mb-4">🔥</div>
        <h1 className="text-4xl font-bold text-white mb-2">Bem-vindo</h1>
        <p className="text-gray-400">Fa\xe7a login ou crie uma conta para continuar.</p>
      </div>
      <div className="flex gap-3">
        <a href="/login"
          className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors">
          Entrar
        </a>
        <a href="/cadastro"
          className="px-6 py-2.5 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg border border-gray-700 transition-colors">
          Criar conta
        </a>
      </div>
    </main>
  );
}`,tip:"Os links são /login e /cadastro — sem /auth/ no caminho! O grupo (auth) organiza os arquivos, mas não aparece na URL."},{id:10,type:"code",tag:"Arquivo 4 de 6",title:"(auth)/login/page.tsx — Formulário de Login",codeLabel:"app/(auth)/login/page.tsx",code:`"use client";
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
    <main className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="text-4xl mb-3">🔑</div>
          <h1 className="text-2xl font-bold text-white">Entrar</h1>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input type="email" placeholder="E-mail" value={email}
            onChange={(e) => setEmail(e.target.value)} required
            className="px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors" />
          <input type="password" placeholder="Senha" value={senha}
            onChange={(e) => setSenha(e.target.value)} required
            className="px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors" />
          {erro && <p className="text-red-400 text-sm">{erro}</p>}
          <button type="submit"
            className="py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors mt-1">
            Entrar
          </button>
        </form>
        <p className="text-center text-gray-500 text-sm mt-5">
          N\xe3o tem conta?{" "}
          <a href="/cadastro" className="text-orange-400 hover:underline">Cadastre-se</a>
        </p>
      </div>
    </main>
  );
}`,tip:"O try/catch captura todos os erros do Firebase e exibe uma mensagem amigável. O link para cadastro usa /cadastro — não /auth/cadastro."},{id:11,type:"code",tag:"Arquivo 5 de 6",title:"(auth)/cadastro/page.tsx — Criar Conta",codeLabel:"app/(auth)/cadastro/page.tsx",code:`"use client";
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
    <main className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="text-4xl mb-3">📝</div>
          <h1 className="text-2xl font-bold text-white">Criar Conta</h1>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input type="text" placeholder="Nome" value={nome}
            onChange={(e) => setNome(e.target.value)} required
            className="px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors" />
          <input type="email" placeholder="E-mail" value={email}
            onChange={(e) => setEmail(e.target.value)} required
            className="px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors" />
          <input type="password" placeholder="Senha (m\xedn. 6 caracteres)" minLength={6}
            value={senha} onChange={(e) => setSenha(e.target.value)} required
            className="px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors" />
          {erro && <p className="text-red-400 text-sm">{erro}</p>}
          <button type="submit"
            className="py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors mt-1">
            Criar conta
          </button>
        </form>
        <p className="text-center text-gray-500 text-sm mt-5">
          J\xe1 tem conta?{" "}
          <a href="/login" className="text-orange-400 hover:underline">Entrar</a>
        </p>
      </div>
    </main>
  );
}`,tip:"minLength={6} dá feedback imediato antes de chamar o Firebase. O link para login usa /login — não /auth/login."},{id:12,type:"code",tag:"Arquivo 6 de 6",title:"aplicacao/page.tsx — Rota Protegida",codeLabel:"app/aplicacao/page.tsx",code:`"use client";
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
      if (!user) { router.push("/login"); return; }
      setUsuario(user);
      setCarregando(false);
    });
  }, [router]);

  if (carregando) return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <p className="text-gray-400">Verificando acesso...</p>
    </div>
  );

  return (
    <main className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-gray-900 rounded-2xl p-8 border border-gray-800 text-center">
        <div className="text-5xl mb-4">🔒</div>
        <h1 className="text-2xl font-bold text-white mb-1">\xc1rea Privada</h1>
        <p className="text-orange-400 font-medium mb-3">
          Ol\xe1, {usuario?.displayName ?? usuario?.email}!
        </p>
        <p className="text-gray-400 text-sm mb-6">
          S\xf3 usu\xe1rios logados chegam at\xe9 aqui.
        </p>
        <button
          onClick={() => sair().then(() => router.push("/"))}
          className="w-full py-2.5 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg border border-gray-700 transition-colors">
          Sair
        </button>
      </div>
    </main>
  );
}`,tip:"carregando=true evita o flash de conteúdo privado. O redirect usa /login — não /auth/login."},{id:13,type:"concept",tag:"Entendendo o código",title:"Como as peças se conectam",items:[{icon:"🔗",text:"firebase/config.ts é o ponto único de inicialização — todos importam auth de lá, garantindo uma única instância no app inteiro."},{icon:"🧩",text:"services/autenticar.ts encapsula o Firebase: as páginas chamam cadastrar(), entrar() e sair() sem saber nada sobre o SDK diretamente."},{icon:"👁️",text:"onAuthStateChanged é o sensor: dispara imediatamente ao montar e toda vez que o estado muda (login, logout, expiração de sessão)."},{icon:"🚦",text:"A proteção é reativa: se a sessão expirar enquanto o usuário está em /aplicacao, o redirect para /login acontece automaticamente."},{icon:"📁",text:"O grupo (auth) é só organização de arquivos — as URLs são /login e /cadastro, nunca /auth/login ou /auth/cadastro."}]},{id:14,type:"mini-challenge",tag:"🎯 Missão Projeto Base",title:"PROJETO BASE\nNO AR",subtitle:"Clone a estrutura e veja o app funcionando",tasks:["Crie um projeto Next.js com TypeScript, App Router e Tailwind CSS (create-next-app)","Instale o Firebase: npm install firebase","Crie as pastas: firebase/, services/, app/(auth)/login/, app/(auth)/cadastro/, app/aplicacao/","Configure o .env.local com as chaves do seu projeto Firebase Console","Copie cada arquivo dos slides anteriores (firebase/config.ts primeiro)","Rode npm run dev: cadastre-se em /cadastro, faça login em /login, acesse /aplicacao e saia"],bonus:["Adicione tratamento de erro específico por código Firebase (auth/email-already-in-use, auth/weak-password)","Exiba o nome e foto do usuário no header usando onAuthStateChanged em um Context global"],xp:40,nextHref:"/modulos/dados/firestore-leitura",nextLabel:"Aula 02: Firestore (Leitura) →"}];a.s(["default",0,function(){return(0,b.jsx)(c.default,{slides:d,backHref:"/modulos/dados",backLabel:"Persistência & BaaS",aulaLabel:"Projeto Base — Firebase Auth Completo",aulaSlug:"dados-projeto-base"})},"metadata",0,{title:"Projeto Base — Firebase Auth Completo · Web On Fire Academy"}],95498)},73271,a=>{a.n(a.i(95498))}];

//# sourceMappingURL=%5Broot-of-the-server%5D__01vnzbk._.js.map