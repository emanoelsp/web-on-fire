1:"$Sreact.fragment"
2:I[57951,["/_next/static/chunks/10y4wjnwnffjh.js","/_next/static/chunks/0rcpm6flhlhx8.js","/_next/static/chunks/0d3shmwh5_nmn.js"],"AuthProvider"]
3:I[40168,["/_next/static/chunks/10y4wjnwnffjh.js","/_next/static/chunks/0rcpm6flhlhx8.js","/_next/static/chunks/0d3shmwh5_nmn.js"],"ProgressSync"]
4:I[39756,["/_next/static/chunks/10y4wjnwnffjh.js","/_next/static/chunks/0rcpm6flhlhx8.js","/_next/static/chunks/0d3shmwh5_nmn.js"],"default"]
5:I[37457,["/_next/static/chunks/10y4wjnwnffjh.js","/_next/static/chunks/0rcpm6flhlhx8.js","/_next/static/chunks/0d3shmwh5_nmn.js"],"default"]
6:I[61921,["/_next/static/chunks/10y4wjnwnffjh.js","/_next/static/chunks/0rcpm6flhlhx8.js","/_next/static/chunks/0d3shmwh5_nmn.js","/_next/static/chunks/01wgq63w~ml9e.js"],"default"]
f:I[68027,["/_next/static/chunks/10y4wjnwnffjh.js","/_next/static/chunks/0rcpm6flhlhx8.js","/_next/static/chunks/0d3shmwh5_nmn.js"],"default",1]
:HL["/_next/static/chunks/154mv0jpvr9bj.css","style"]
:HL["/_next/static/media/70bc3e132a0a741e-s.p.1409xf.ylxg8g.woff2","font",{"crossOrigin":"","type":"font/woff2"}]
:HL["/_next/static/media/83afe278b6a6bb3c-s.p.0q-301v4kxxnr.woff2","font",{"crossOrigin":"","type":"font/woff2"}]
:HL["/_next/static/media/fabcf92ba1ccea36-s.p.0lwj123ije5i..woff2","font",{"crossOrigin":"","type":"font/woff2"}]
7:T4ba,"use client";
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
        <p className="text-gray-400">Faça login ou crie uma conta para continuar.</p>
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
}8:T825,"use client";
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
          Não tem conta?{" "}
          <a href="/cadastro" className="text-orange-400 hover:underline">Cadastre-se</a>
        </p>
      </div>
    </main>
  );
}9:T9cd,"use client";
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
          <input type="password" placeholder="Senha (mín. 6 caracteres)" minLength={6}
            value={senha} onChange={(e) => setSenha(e.target.value)} required
            className="px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors" />
          {erro && <p className="text-red-400 text-sm">{erro}</p>}
          <button type="submit"
            className="py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors mt-1">
            Criar conta
          </button>
        </form>
        <p className="text-center text-gray-500 text-sm mt-5">
          Já tem conta?{" "}
          <a href="/login" className="text-orange-400 hover:underline">Entrar</a>
        </p>
      </div>
    </main>
  );
}a:T692,"use client";
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
        <h1 className="text-2xl font-bold text-white mb-1">Área Privada</h1>
        <p className="text-orange-400 font-medium mb-3">
          Olá, {usuario?.displayName ?? usuario?.email}!
        </p>
        <p className="text-gray-400 text-sm mb-6">
          Só usuários logados chegam até aqui.
        </p>
        <button
          onClick={() => sair().then(() => router.push("/"))}
          className="w-full py-2.5 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg border border-gray-700 transition-colors">
          Sair
        </button>
      </div>
    </main>
  );
}0:{"P":null,"c":["","modulos","dados","projeto-base"],"q":"","i":false,"f":[[["",{"children":["modulos",{"children":["dados",{"children":["projeto-base",{"children":["__PAGE__",{}]}]}]}]},"$undefined","$undefined",16],[["$","$1","c",{"children":[[["$","link","0",{"rel":"stylesheet","href":"/_next/static/chunks/154mv0jpvr9bj.css","precedence":"next","crossOrigin":"$undefined","nonce":"$undefined"}],["$","script","script-0",{"src":"/_next/static/chunks/10y4wjnwnffjh.js","async":true,"nonce":"$undefined"}],["$","script","script-1",{"src":"/_next/static/chunks/0rcpm6flhlhx8.js","async":true,"nonce":"$undefined"}],["$","script","script-2",{"src":"/_next/static/chunks/0d3shmwh5_nmn.js","async":true,"nonce":"$undefined"}]],["$","html",null,{"lang":"pt-BR","className":"bebas_neue_f4d929f7-module__iQlc8G__variable inter_786c1081-module__J60SBq__variable jetbrains_mono_8dec50e9-module__V6cRDq__variable","children":["$","body",null,{"style":{"fontFamily":"var(--font-sans), sans-serif"},"children":["$","$L2",null,{"children":[["$","$L3",null,{}],["$","$L4",null,{"parallelRouterKey":"children","error":"$undefined","errorStyles":"$undefined","errorScripts":"$undefined","template":["$","$L5",null,{}],"templateStyles":"$undefined","templateScripts":"$undefined","notFound":[[["$","title",null,{"children":"404: This page could not be found."}],["$","div",null,{"style":{"fontFamily":"system-ui,\"Segoe UI\",Roboto,Helvetica,Arial,sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\"","height":"100vh","textAlign":"center","display":"flex","flexDirection":"column","alignItems":"center","justifyContent":"center"},"children":["$","div",null,{"children":[["$","style",null,{"dangerouslySetInnerHTML":{"__html":"body{color:#000;background:#fff;margin:0}.next-error-h1{border-right:1px solid rgba(0,0,0,.3)}@media (prefers-color-scheme:dark){body{color:#fff;background:#000}.next-error-h1{border-right:1px solid rgba(255,255,255,.3)}}"}}],["$","h1",null,{"className":"next-error-h1","style":{"display":"inline-block","margin":"0 20px 0 0","padding":"0 23px 0 0","fontSize":24,"fontWeight":500,"verticalAlign":"top","lineHeight":"49px"},"children":404}],["$","div",null,{"style":{"display":"inline-block"},"children":["$","h2",null,{"style":{"fontSize":14,"fontWeight":400,"lineHeight":"49px","margin":0},"children":"This page could not be found."}]}]]}]}]],[]],"forbidden":"$undefined","unauthorized":"$undefined"}]]}]}]}]]}],{"children":[["$","$1","c",{"children":[null,["$","$L4",null,{"parallelRouterKey":"children","error":"$undefined","errorStyles":"$undefined","errorScripts":"$undefined","template":["$","$L5",null,{}],"templateStyles":"$undefined","templateScripts":"$undefined","notFound":"$undefined","forbidden":"$undefined","unauthorized":"$undefined"}]]}],{"children":[["$","$1","c",{"children":[null,["$","$L4",null,{"parallelRouterKey":"children","error":"$undefined","errorStyles":"$undefined","errorScripts":"$undefined","template":["$","$L5",null,{}],"templateStyles":"$undefined","templateScripts":"$undefined","notFound":"$undefined","forbidden":"$undefined","unauthorized":"$undefined"}]]}],{"children":[["$","$1","c",{"children":[null,["$","$L4",null,{"parallelRouterKey":"children","error":"$undefined","errorStyles":"$undefined","errorScripts":"$undefined","template":["$","$L5",null,{}],"templateStyles":"$undefined","templateScripts":"$undefined","notFound":"$undefined","forbidden":"$undefined","unauthorized":"$undefined"}]]}],{"children":[["$","$1","c",{"children":[["$","$L6",null,{"slides":[{"id":1,"type":"cover","tag":"Módulo 04 · Projeto Base","title":"PROJETO BASE\nFIREBASE AUTH","subtitle":"Pasta a pasta, arquivo a arquivo — copie o código e o app de autenticação já funciona."},{"id":2,"type":"concept","tag":"Visão geral","title":"O que você vai montar","items":[{"icon":"🏠","text":"Página inicial (/): exibe links para login e cadastro, e redireciona automaticamente se o usuário já estiver logado."},{"icon":"🔑","text":"Login (/login): formulário e-mail + senha que chama o Firebase e entra na aplicação."},{"icon":"📝","text":"Cadastro (/cadastro): cria conta com nome, e-mail e senha; perfil atualizado na hora com updateProfile."},{"icon":"🔒","text":"Aplicação (/aplicacao): rota protegida — quem não está logado é redirecionado para /login automaticamente."},{"icon":"⚙️","text":"services/autenticar.ts: todos os serviços do Firebase num só lugar (criar, entrar, sair, editar perfil e excluir conta)."}]},{"id":3,"type":"files","tag":"Arquitetura","title":"Estrutura de Pastas","codeLabel":"Estrutura de Pastas","code":"meu-app/\n├── firebase/\n│   └── config.ts           ← inicializa Firebase, exporta auth\n│\n├── services/\n│   └── autenticar.ts       ← cadastrar, entrar, sair, editar, excluir\n│\n├── app/\n│   ├── page.tsx            ← home: redireciona se já logado\n│   │\n│   ├── (auth)/             ← grupo de rotas (URL não inclui \"/auth\")\n│   │   ├── login/          ← acessível em /login\n│   │   │   └── page.tsx\n│   │   └── cadastro/       ← acessível em /cadastro\n│   │       └── page.tsx\n│   │\n│   └── aplicacao/\n│       └── page.tsx        ← rota protegida (só logado entra)\n│\n└── .env.local              ← chaves do Firebase (NUNCA suba no git!)","tip":"O grupo (auth) usa parênteses no nome da pasta: organiza sem adicionar /auth na URL. O link correto é /login, não /auth/login."},{"id":4,"type":"architecture","tag":"Passo a passo","title":"Monte o projeto em 6 passos","subtitle":"Faça um de cada vez antes de copiar o código","steps":[{"icon":"1️⃣","text":"Crie o projeto: npx create-next-app@latest meu-app — TypeScript: sim, App Router: sim, Tailwind CSS: sim."},{"icon":"2️⃣","text":"Instale o Firebase: npm install firebase (dentro da pasta meu-app)."},{"icon":"3️⃣","text":"Crie as pastas: firebase/, services/, app/(auth)/login/, app/(auth)/cadastro/, app/aplicacao/."},{"icon":"4️⃣","text":"Crie o arquivo .env.local na raiz com as variáveis NEXT_PUBLIC_FIREBASE_* — próximo slide mostra o formato."},{"icon":"5️⃣","text":"Copie cada arquivo dos slides seguintes na ordem em que aparecem (config.ts primeiro)."},{"icon":"6️⃣","text":"Rode npm run dev e acesse http://localhost:3000 — cadastre-se, faça login, acesse /aplicacao e saia."}],"tip":"Sempre copie o firebase/config.ts antes dos outros arquivos: todos dependem do auth exportado por ele."},{"id":5,"type":"code","tag":"Antes de começar","title":".env.local — Chaves do Firebase","codeLabel":".env.local","code":"# Cole os valores do Firebase Console →\n# Configurações do projeto → Seus apps → Configuração do SDK\n\nNEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...\nNEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=meu-app.firebaseapp.com\nNEXT_PUBLIC_FIREBASE_PROJECT_ID=meu-app\nNEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=meu-app.appspot.com\nNEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789\nNEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc...","tip":"NEXT_PUBLIC_ é obrigatório para o browser enxergar as variáveis. Adicione .env.local no .gitignore — o arquivo já deve estar lá se você usou create-next-app."},{"id":6,"type":"code","tag":"Arquivo 1 de 6","title":"firebase/config.ts","codeLabel":"firebase/config.ts","code":"import { initializeApp, getApps, getApp } from \"firebase/app\";\nimport { getAuth } from \"firebase/auth\";\n\nconst firebaseConfig = {\n  apiKey:            process.env.NEXT_PUBLIC_FIREBASE_API_KEY,\n  authDomain:        process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,\n  projectId:         process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,\n  storageBucket:     process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,\n  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,\n  appId:             process.env.NEXT_PUBLIC_FIREBASE_APP_ID,\n};\n\n// getApps() evita reinicializar no hot-reload do Next.js\nconst app = getApps().length === 0\n  ? initializeApp(firebaseConfig)\n  : getApp();\n\nexport const auth = getAuth(app);","tip":"Um único arquivo de configuração. Todos os outros serviços (Firestore, Storage) também seriam inicializados e exportados aqui."},{"id":7,"type":"code","tag":"Arquivo 2 de 6 — Parte 1","title":"services/autenticar.ts — Login e Cadastro","codeLabel":"services/autenticar.ts","code":"import {\n  createUserWithEmailAndPassword,\n  signInWithEmailAndPassword,\n  updateProfile,\n  signOut,\n} from \"firebase/auth\";\nimport { auth } from \"@/firebase/config\";\n\nexport async function cadastrar(nome: string, email: string, senha: string) {\n  const cred = await createUserWithEmailAndPassword(auth, email, senha);\n  await updateProfile(cred.user, { displayName: nome });\n  return cred.user;\n}\n\nexport async function entrar(email: string, senha: string) {\n  const cred = await signInWithEmailAndPassword(auth, email, senha);\n  return cred.user;\n}\n\nexport async function sair() {\n  await signOut(auth);\n}","tip":"updateProfile salva o nome logo após o cadastro — o usuário já aparece com displayName preenchido na mesma sessão."},{"id":8,"type":"code","tag":"Arquivo 2 de 6 — Parte 2","title":"services/autenticar.ts — Editar e Excluir","codeLabel":"services/autenticar.ts (continuação — cole abaixo das funções anteriores)","code":"import {\n  updateProfile,\n  updatePassword,\n  deleteUser,\n  EmailAuthProvider,\n  reauthenticateWithCredential,\n} from \"firebase/auth\";\nimport { auth } from \"@/firebase/config\";\n\nexport async function editarPerfil(novoNome: string) {\n  if (!auth.currentUser) throw new Error(\"Não autenticado\");\n  await updateProfile(auth.currentUser, { displayName: novoNome });\n}\n\nexport async function excluirConta(senhaAtual: string) {\n  const user = auth.currentUser;\n  if (!user?.email) throw new Error(\"Não autenticado\");\n  const cred = EmailAuthProvider.credential(user.email, senhaAtual);\n  await reauthenticateWithCredential(user, cred);\n  await deleteUser(user);\n}\n\nexport async function alterarSenha(senhaAtual: string, novaSenha: string) {\n  const user = auth.currentUser;\n  if (!user?.email) throw new Error(\"Não autenticado\");\n  const cred = EmailAuthProvider.credential(user.email, senhaAtual);\n  await reauthenticateWithCredential(user, cred);\n  await updatePassword(user, novaSenha);\n}","tip":"Operações sensíveis (excluir conta, trocar senha) exigem reautenticação recente — o Firebase rejeita se o login foi há muito tempo, por segurança."},{"id":9,"type":"code","tag":"Arquivo 3 de 6","title":"app/page.tsx — Página Inicial","codeLabel":"app/page.tsx","code":"$7","tip":"Os links são /login e /cadastro — sem /auth/ no caminho! O grupo (auth) organiza os arquivos, mas não aparece na URL."},{"id":10,"type":"code","tag":"Arquivo 4 de 6","title":"(auth)/login/page.tsx — Formulário de Login","codeLabel":"app/(auth)/login/page.tsx","code":"$8","tip":"O try/catch captura todos os erros do Firebase e exibe uma mensagem amigável. O link para cadastro usa /cadastro — não /auth/cadastro."},{"id":11,"type":"code","tag":"Arquivo 5 de 6","title":"(auth)/cadastro/page.tsx — Criar Conta","codeLabel":"app/(auth)/cadastro/page.tsx","code":"$9","tip":"minLength={6} dá feedback imediato antes de chamar o Firebase. O link para login usa /login — não /auth/login."},{"id":12,"type":"code","tag":"Arquivo 6 de 6","title":"aplicacao/page.tsx — Rota Protegida","codeLabel":"app/aplicacao/page.tsx","code":"$a","tip":"carregando=true evita o flash de conteúdo privado. O redirect usa /login — não /auth/login."},{"id":13,"type":"concept","tag":"Entendendo o código","title":"Como as peças se conectam","items":[{"icon":"🔗","text":"firebase/config.ts é o ponto único de inicialização — todos importam auth de lá, garantindo uma única instância no app inteiro."},{"icon":"🧩","text":"services/autenticar.ts encapsula o Firebase: as páginas chamam cadastrar(), entrar() e sair() sem saber nada sobre o SDK diretamente."},{"icon":"👁️","text":"onAuthStateChanged é o sensor: dispara imediatamente ao montar e toda vez que o estado muda (login, logout, expiração de sessão)."},{"icon":"🚦","text":"A proteção é reativa: se a sessão expirar enquanto o usuário está em /aplicacao, o redirect para /login acontece automaticamente."},{"icon":"📁","text":"O grupo (auth) é só organização de arquivos — as URLs são /login e /cadastro, nunca /auth/login ou /auth/cadastro."}]},{"id":14,"type":"mini-challenge","tag":"🎯 Missão Projeto Base","title":"PROJETO BASE\nNO AR","subtitle":"Clone a estrutura e veja o app funcionando","tasks":["Crie um projeto Next.js com TypeScript, App Router e Tailwind CSS (create-next-app)","Instale o Firebase: npm install firebase","Crie as pastas: firebase/, services/, app/(auth)/login/, app/(auth)/cadastro/, app/aplicacao/","Configure o .env.local com as chaves do seu projeto Firebase Console","Copie cada arquivo dos slides anteriores (firebase/config.ts primeiro)","Rode npm run dev: cadastre-se em /cadastro, faça login em /login, acesse /aplicacao e saia"],"bonus":["Adicione tratamento de erro específico por código Firebase (auth/email-already-in-use, auth/weak-password)","Exiba o nome e foto do usuário no header usando onAuthStateChanged em um Context global"],"xp":40,"nextHref":"/modulos/dados/firestore-leitura","nextLabel":"Aula 02: Firestore (Leitura) →"}],"backHref":"/modulos/dados","backLabel":"Persistência & BaaS","aulaLabel":"Projeto Base — Firebase Auth Completo","aulaSlug":"dados-projeto-base"}],["$Lb"],"$Lc"]}],{},null,false,null]},null,false,"$@d"]},null,false,"$@d"]},null,false,"$@d"]},null,false,null],"$Le",false]],"m":"$undefined","G":["$f",["$L10"]],"S":true,"h":null,"s":"$undefined","l":"$undefined","p":"$undefined","d":"$undefined","b":"g-pGVvcGEV9O4jPvRGyfJ"}
11:I[97367,["/_next/static/chunks/10y4wjnwnffjh.js","/_next/static/chunks/0rcpm6flhlhx8.js","/_next/static/chunks/0d3shmwh5_nmn.js"],"OutletBoundary"]
12:"$Sreact.suspense"
15:I[97367,["/_next/static/chunks/10y4wjnwnffjh.js","/_next/static/chunks/0rcpm6flhlhx8.js","/_next/static/chunks/0d3shmwh5_nmn.js"],"ViewportBoundary"]
17:I[97367,["/_next/static/chunks/10y4wjnwnffjh.js","/_next/static/chunks/0rcpm6flhlhx8.js","/_next/static/chunks/0d3shmwh5_nmn.js"],"MetadataBoundary"]
b:["$","script","script-0",{"src":"/_next/static/chunks/01wgq63w~ml9e.js","async":true,"nonce":"$undefined"}]
c:["$","$L11",null,{"children":["$","$12",null,{"name":"Next.MetadataOutlet","children":"$@13"}]}]
14:[]
d:"$W14"
e:["$","$1","h",{"children":[null,["$","$L15",null,{"children":"$L16"}],["$","div",null,{"hidden":true,"children":["$","$L17",null,{"children":["$","$12",null,{"name":"Next.Metadata","children":"$L18"}]}]}],["$","meta",null,{"name":"next-size-adjust","content":""}]]}]
10:["$","link","0",{"rel":"stylesheet","href":"/_next/static/chunks/154mv0jpvr9bj.css","precedence":"next","crossOrigin":"$undefined","nonce":"$undefined"}]
16:[["$","meta","0",{"charSet":"utf-8"}],["$","meta","1",{"name":"viewport","content":"width=device-width, initial-scale=1"}]]
19:I[27201,["/_next/static/chunks/10y4wjnwnffjh.js","/_next/static/chunks/0rcpm6flhlhx8.js","/_next/static/chunks/0d3shmwh5_nmn.js"],"IconMark"]
13:null
18:[["$","title","0",{"children":"Projeto Base — Firebase Auth Completo · Web On Fire Academy"}],["$","meta","1",{"name":"description","content":"Laboratórios 100% interativos, códigos testados e comentados, passo a passo intuitivo. React, Next.js, Firebase e TypeScript."}],["$","link","2",{"rel":"icon","href":"/favicon.ico?favicon.0x3dzn~oxb6tn.ico","sizes":"256x256","type":"image/x-icon"}],["$","$L19","3",{}]]
