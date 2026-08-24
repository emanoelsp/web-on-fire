module.exports=[93695,(a,b,c)=>{b.exports=a.x("next/dist/shared/lib/no-fallback-error.external.js",()=>require("next/dist/shared/lib/no-fallback-error.external.js"))},64240,(a,b,c)=>{"use strict";function d(a){if("function"!=typeof WeakMap)return null;var b=new WeakMap,c=new WeakMap;return(d=function(a){return a?c:b})(a)}c._=function(a,b){if(!b&&a&&a.__esModule)return a;if(null===a||"object"!=typeof a&&"function"!=typeof a)return{default:a};var c=d(b);if(c&&c.has(a))return c.get(a);var e={__proto__:null},f=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var g in a)if("default"!==g&&Object.prototype.hasOwnProperty.call(a,g)){var h=f?Object.getOwnPropertyDescriptor(a,g):null;h&&(h.get||h.set)?Object.defineProperty(e,g,h):e[g]=a[g]}return e.default=a,c&&c.set(a,e),e}},50640,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0}),Object.defineProperty(c,"InvariantError",{enumerable:!0,get:function(){return d}});class d extends Error{constructor(a,b){super(`Invariant: ${a.endsWith(".")?a:a+"."} This is a bug in Next.js.`,b),this.name="InvariantError"}}},59469,a=>{"use strict";a.s(["default",()=>b]);let b=(0,a.i(11857).registerClientReference)(function(){throw Error("Attempted to call the default export of [project]/src/components/slides/SlidePresentation.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"[project]/src/components/slides/SlidePresentation.tsx <module evaluation>","default")},59394,a=>{"use strict";a.s(["default",()=>b]);let b=(0,a.i(11857).registerClientReference)(function(){throw Error("Attempted to call the default export of [project]/src/components/slides/SlidePresentation.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"[project]/src/components/slides/SlidePresentation.tsx","default")},9844,a=>{"use strict";a.i(59469);var b=a.i(59394);a.n(b)},10585,a=>{a.v("/_next/static/media/favicon.0x3dzn~oxb6tn.ico"+(globalThis.NEXT_CLIENT_ASSET_SUFFIX||""))},68611,a=>{"use strict";let b={src:a.i(10585).default,width:256,height:256};a.s(["default",0,b])},21239,a=>{"use strict";var b=a.i(7997),c=a.i(9844);let d=[{id:1,type:"cover",tag:"Módulo 04 · Aula 01",title:"IDENTIDADE\n& SEGURANÇA",subtitle:"Quem é o usuário? Firebase Auth responde — e o middleware protege as portas."},{id:2,type:"concept",tag:"Contexto",title:"O que é Backend as a Service",items:[{icon:"🏗️",text:"Montar um backend do zero é caro: servidor, banco, login, e-mails de recuperação, segurança... meses de trabalho."},{icon:"☁️",text:"BaaS (como o Firebase) entrega tudo isso pronto na nuvem: autenticação, banco, storage, hospedagem."},{icon:"🎯",text:"Você foca no produto; o Google cuida da infraestrutura, escala e segurança por baixo."},{icon:"🔥",text:"Neste módulo: Firebase Auth (identidade) + Firestore (dados) + Server Actions (mutações seguras)."}]},{id:3,type:"concept",tag:"Autenticação",title:"Autenticação vs Autorização",items:[{icon:"🪪",text:"Autenticação: QUEM é você? Provar identidade — login com e-mail/senha, Google, GitHub."},{icon:"🚪",text:"Autorização: o que você PODE fazer? Um aluno vê o próprio progresso; só o professor vê o de todos."},{icon:"🎫",text:"O Firebase Auth resolve a autenticação e entrega um 'crachá' (token) que prova a identidade em cada requisição."},{icon:"🛡️",text:"A autorização é sua regra de negócio: baseada no token, você decide o que liberar (rotas, dados, ações)."}]},{id:4,type:"code",tag:"Setup",title:"Configurando o Firebase Auth",codeLabel:"lib/firebaseConfig.ts",code:`import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  // ...restante do config
};

// Evita reinicializar o app no hot-reload do Next
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);`,tip:"As chaves NEXT_PUBLIC_ do Firebase são públicas por design (o app roda no browser). A segurança real vem das Security Rules do Firestore, não do sigilo da chave."},{id:5,type:"code",tag:"Login",title:"Os métodos de autenticação",codeLabel:"auth.ts",code:`import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import { auth } from "@/lib/firebaseConfig";

// Cadastro com e-mail e senha
await createUserWithEmailAndPassword(auth, email, senha);

// Login com e-mail e senha
await signInWithEmailAndPassword(auth, email, senha);

// Login social (um popup, zero formul\xe1rio)
const google = new GoogleAuthProvider();
await signInWithPopup(auth, google);

// Sair
await signOut(auth);`,tip:"É exatamente esse código que roda por trás do /login deste curso. O Firebase gerencia sessão, tokens e persistência automaticamente."},{id:6,type:"code",tag:"Estado do usuário",title:"Observando quem está logado",codeLabel:"AuthContext.tsx",code:`"use client";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "@/lib/firebaseConfig";

// onAuthStateChanged dispara a cada login/logout — em tempo real
useEffect(() => {
  const unsub = onAuthStateChanged(auth, (user) => {
    setUser(user);        // User | null
    setLoading(false);
  });
  return unsub;           // limpa o listener ao desmontar
}, []);

// Compartilhe via Context para o app todo saber quem \xe9 o usu\xe1rio:
// const { user, loading } = useAuth();`,tip:"onAuthStateChanged é a fonte da verdade: um só listener no topo do app, e todo componente descobre o usuário logado via Context."},{id:7,type:"quiz",tag:"Quiz",title:"Auth na cabeça",question:"Um Client Component precisa saber, em tempo real, se o usuário fez login ou logout. Qual a ferramenta certa?",options:[{text:"Um fetch para /api/user a cada 5 segundos",correct:!1,explanation:"Polling é desperdício e atrasado. O Firebase te avisa na hora, sem ficar perguntando."},{text:"onAuthStateChanged — um listener que dispara a cada mudança",correct:!0,explanation:"Exato! É reativo: login ou logout dispara o callback imediatamente. Um listener no topo alimenta o app inteiro."},{text:"Ler o localStorage manualmente no render",correct:!1,explanation:"O Firebase já persiste a sessão. Mexer no localStorage na mão ignora o mecanismo oficial e quebra fácil."},{text:"Guardar o usuário numa variável global comum",correct:!1,explanation:"Variável global não é reativa — a UI não re-renderiza quando ela muda. Precisa de estado + listener."}],xp:15},{id:8,type:"concept",tag:"Proteção de rotas",title:"Duas camadas de proteção",items:[{icon:"🖥️",text:"No cliente: se !user, redirecione para /login (o que a página /progresso deste curso faz). Bom para UX."},{icon:"🛡️",text:"No Middleware: intercepta a requisição ANTES da página renderizar — proteção que roda no servidor (Edge)."},{icon:"🍪",text:"O middleware lê um cookie de sessão para decidir: deixa passar ou redireciona. Roda em toda navegação."},{icon:"⚖️",text:"Regra: cliente para UX (redirect suave), servidor/rules para SEGURANÇA real. As duas juntas."}]},{id:9,type:"code",tag:"Middleware",title:"Protegendo rotas no Edge",codeLabel:"src/middleware.ts",code:`import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const sessao = req.cookies.get("__session")?.value;
  const querEntrar = req.nextUrl.pathname.startsWith("/admin");

  // sem sess\xe3o tentando acessar \xe1rea protegida? bloqueia
  if (querEntrar && !sessao) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  return NextResponse.next();
}

// Define QUAIS rotas o middleware intercepta
export const config = {
  matcher: ["/admin/:path*", "/progresso/:path*"],
};`,tip:"O matcher é a lista de portas que o segurança vigia. Rotas fora dela nem passam pelo middleware — performance preservada."},{id:10,type:"fill-blank",tag:"Mão na massa",title:"Complete o listener",instruction:"Complete o nome da função do Firebase que observa mudanças de login/logout em tempo real:",prefix:`import { _____________________ } from "firebase/auth";

_____________________(auth, (user) => setUser(user));`,answer:"onAuthStateChanged",hint:"É um 'on' + 'Auth' + 'State' + 'Changed'.",xp:20},{id:11,type:"mini-challenge",tag:"🎯 Missão 14",title:"PORTÃO DE\nENTRADA",subtitle:"Monte o fluxo de login completo",tasks:["Crie um projeto no Firebase Console e ative Authentication (E-mail/Senha e Google)","Configure lib/firebaseConfig.ts com as variáveis de ambiente (.env.local)","Crie uma página /login com formulário de e-mail/senha e botão do Google","Crie um AuthContext com onAuthStateChanged expondo { user, loading }","Crie uma página /painel que redireciona para /login se não houver usuário","Adicione um botão de logout (signOut) no cabeçalho"],bonus:["Adicione um src/middleware.ts protegendo /painel via cookie de sessão","Trate os erros do Firebase (auth/invalid-credential, etc.) com mensagens amigáveis"],xp:50,nextHref:"/modulos/dados/projeto-base",nextLabel:"Projeto Base: clone o app de auth →"}];a.s(["default",0,function(){return(0,b.jsx)(c.default,{slides:d,backHref:"/modulos/dados",backLabel:"Persistência & BaaS",aulaLabel:"Aula 01 — Identidade e Segurança",aulaSlug:"dados-auth"})},"metadata",0,{title:"Aula 01 — Identidade e Segurança (Firebase Auth) · Web On Fire Academy"}],21239)},19877,a=>{a.n(a.i(21239))}];

//# sourceMappingURL=%5Broot-of-the-server%5D__0018189._.js.map