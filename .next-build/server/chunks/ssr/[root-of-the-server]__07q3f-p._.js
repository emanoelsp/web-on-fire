module.exports=[93695,(a,b,c)=>{b.exports=a.x("next/dist/shared/lib/no-fallback-error.external.js",()=>require("next/dist/shared/lib/no-fallback-error.external.js"))},64240,(a,b,c)=>{"use strict";function d(a){if("function"!=typeof WeakMap)return null;var b=new WeakMap,c=new WeakMap;return(d=function(a){return a?c:b})(a)}c._=function(a,b){if(!b&&a&&a.__esModule)return a;if(null===a||"object"!=typeof a&&"function"!=typeof a)return{default:a};var c=d(b);if(c&&c.has(a))return c.get(a);var e={__proto__:null},f=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var g in a)if("default"!==g&&Object.prototype.hasOwnProperty.call(a,g)){var h=f?Object.getOwnPropertyDescriptor(a,g):null;h&&(h.get||h.set)?Object.defineProperty(e,g,h):e[g]=a[g]}return e.default=a,c&&c.set(a,e),e}},50640,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0}),Object.defineProperty(c,"InvariantError",{enumerable:!0,get:function(){return d}});class d extends Error{constructor(a,b){super(`Invariant: ${a.endsWith(".")?a:a+"."} This is a bug in Next.js.`,b),this.name="InvariantError"}}},59469,a=>{"use strict";a.s(["default",()=>b]);let b=(0,a.i(11857).registerClientReference)(function(){throw Error("Attempted to call the default export of [project]/src/components/slides/SlidePresentation.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"[project]/src/components/slides/SlidePresentation.tsx <module evaluation>","default")},59394,a=>{"use strict";a.s(["default",()=>b]);let b=(0,a.i(11857).registerClientReference)(function(){throw Error("Attempted to call the default export of [project]/src/components/slides/SlidePresentation.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"[project]/src/components/slides/SlidePresentation.tsx","default")},9844,a=>{"use strict";a.i(59469);var b=a.i(59394);a.n(b)},10585,a=>{a.v("/_next/static/media/favicon.0x3dzn~oxb6tn.ico"+(globalThis.NEXT_CLIENT_ASSET_SUFFIX||""))},68611,a=>{"use strict";let b={src:a.i(10585).default,width:256,height:256};a.s(["default",0,b])},28634,a=>{"use strict";var b=a.i(7997),c=a.i(9844);let d=[{id:1,type:"cover",tag:"🔥 Módulo 05 · Aula 01",title:"FIREBASE\nFIRESTORE",subtitle:"Configure o banco de dados NoSQL do Google e conecte seu Next.js ao Firestore em minutos."},{id:2,type:"concept",tag:"O QUE É FIREBASE",title:"Plataforma backend\npronta para usar",items:[{icon:"🔥",text:"Firebase é um conjunto de ferramentas backend prontas: banco de dados, autenticação, hospedagem, storage e notificações — tudo do Google."},{icon:"⚡",text:"Você não cria servidor do zero — o Firebase cuida da infraestrutura. Você foca só no código do seu app."},{icon:"🔄",text:"Firestore é o banco NoSQL do Firebase: documentos em tempo real, SDK JavaScript/TypeScript nativo, sem SQL."},{icon:"🆓",text:"O plano gratuito Spark é mais que suficiente para aprender e construir projetos reais de pequeno e médio porte."}],tip:"Firebase ≠ Firestore. Firebase é a plataforma inteira. Firestore é só o banco de dados dentro dela."},{id:3,type:"definition",tag:"CONCEITO CHAVE",title:"O que é Firestore?",quote:"Firestore é um banco de dados NoSQL orientado a documentos. Em vez de tabelas e linhas como no MySQL, você trabalha com Coleções e Documentos — estruturas flexíveis no formato JSON que escalam automaticamente.",highlights:["Coleções","Documentos","NoSQL","JSON"],tip:"Pense em Coleção como uma pasta e Documento como um arquivo JSON dentro dela. Simples assim."},{id:4,type:"comparison",tag:"SQL vs NOSQL",title:"MySQL vs Firestore —\nQual a diferença?",left:{label:"MySQL / Postgres (SQL)",items:["Tabelas com colunas fixas","Todas as linhas têm o mesmo formato","JOINs entre tabelas","Schema rígido — ALTER TABLE","Servidor próprio necessário","Escalabilidade manual"]},right:{label:"Firestore (NoSQL)",items:["Coleções de Documentos JSON","Cada doc pode ter campos diferentes","Sub-coleções e referências","Schema flexível — só adiciona campos","Serverless — zero configuração","Escala automática e global"]},tip:"Não existe 'melhor'. SQL é ótimo para dados relacionais complexos. NoSQL brilha em dados dinâmicos e escala horizontal."},{id:5,type:"architecture",tag:"ESTRUTURA DO FIRESTORE",title:"Coleções e\nDocumentos",subtitle:"Como os dados são organizados no Firestore",steps:[{icon:"🗂️",text:"Coleção: agrupa documentos do mesmo tipo. Ex: /alunos contém todos os alunos do sistema."},{icon:"📄",text:"Documento: objeto JSON com ID único. Ex: { nome: 'João', email: 'joao@email.com', telefone: '(11) 9999-9999' }."},{icon:"🔑",text:"addDoc() gera o ID automaticamente. setDoc() deixa você escolher. Na maioria dos casos, addDoc() é o mais prático."},{icon:"🌿",text:"Sub-coleções: um documento pode conter coleções internas. Útil para dados hierárquicos como turmas → aulas."}]},{id:6,type:"files",tag:"PASSO 1 — CREDENCIAIS",title:".env.local —\nGuardando as chaves",codeLabel:".env.local (raiz do projeto)",code:`# Credenciais do Firebase — N\xc3O vai para o GitHub (.gitignore j\xe1 ignora)
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=meu-projeto.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=meu-projeto
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=meu-projeto.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=1234567890
NEXT_PUBLIC_FIREBASE_APP_ID=1:1234567890:web:abc123`,tip:"NEXT_PUBLIC_ torna a variável acessível no navegador. Sem esse prefixo, ela fica só no servidor Next.js."},{id:7,type:"code",tag:"PASSO 2 — CONFIGURAÇÃO",title:"src/lib/\nfirebaseConfig.ts",codeLabel:"src/lib/firebaseConfig.ts",code:`import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey:            process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain:        process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId:         process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket:     process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId:             process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Evita inicializar mais de uma vez (Next.js hot reload reinicializa m\xf3dulos)
const app = getApps().length === 0
  ? initializeApp(firebaseConfig)
  : getApp();

export const db = getFirestore(app);`,tip:"getApps().length === 0 evita o erro 'Firebase app already exists' no ambiente de desenvolvimento com hot reload."},{id:8,type:"code",tag:"PASSO 3 — TESTE",title:"Primeiro documento\nno Firestore",codeLabel:"src/app/modulos/backend/hello-firebase/page.tsx",code:`"use client";

import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";

export default function HelloFirebasePage() {
  const [status, setStatus] = useState("idle");
  const [docId, setDocId] = useState("");

  async function testar() {
    setStatus("loading");
    try {
      const ref = await addDoc(collection(db, "testes"), {
        mensagem: "Hello Firebase! 🔥",
        timestamp: serverTimestamp(),  // hora do servidor, n\xe3o do navegador
      });
      setDocId(ref.id);
      setStatus("success");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Hello Firebase 🔥</h1>
      <button onClick={testar}>Testar Conex\xe3o</button>
      {status === "success" && <p>✅ Documento criado! ID: {docId}</p>}
      {status === "error"   && <p>❌ Erro — verifique o .env.local</p>}
    </main>
  );
}`,tip:"serverTimestamp() grava a hora exata do servidor Firebase — muito mais confiável que new Date() do navegador para ordenações."},{id:9,type:"best-practices",tag:"BOAS PRÁTICAS",title:"O que fazer e\no que evitar",items:[{icon:"✅",text:"Sempre use variáveis de ambiente para as credenciais — nunca cole a apiKey diretamente no código TypeScript."},{icon:"✅",text:"Ative o modo de teste (allow read, write: if true) só em desenvolvimento. Em produção, use regras com autenticação."},{icon:"✅",text:"Escolha a região southamerica-east1 (São Paulo) para menor latência nos seus projetos brasileiros."},{icon:"⚠️",text:"O modo de teste expira em 30 dias. O Firebase vai te avisar antes — aproveite para aprender as regras de segurança."}],tip:"O Firestore no modo de teste é ideal para aprender. Mas antes de publicar qualquer app real, configure as regras de segurança."},{id:10,type:"quiz",tag:"QUIZ 🔥",title:"Qual função cria\num documento?",question:"Você quer salvar um novo aluno no Firestore com ID gerado automaticamente. Qual função do Firebase SDK você deve usar?",options:[{text:"addDoc(collection(db, 'alunos'), dados)",correct:!0,explanation:"Correto! addDoc() cria o documento na coleção especificada e retorna a referência com o ID gerado pelo Firebase."},{text:"setDoc(doc(db, 'alunos', id), dados)",correct:!1,explanation:"setDoc() também salva documentos, mas você precisa fornecer o ID manualmente. Use quando quiser controlar o ID."},{text:"insertDoc(collection(db, 'alunos'), dados)",correct:!1,explanation:"insertDoc() não existe no SDK do Firestore. Esse padrão lembra SQL — no Firestore use addDoc()."},{text:"createDoc(db, 'alunos', dados)",correct:!1,explanation:"createDoc() não existe. No Firestore as funções de escrita são addDoc(), setDoc() e updateDoc()."}],xp:15},{id:11,type:"fill-blank",tag:"CÓDIGO NA PRÁTICA",title:"Complete o import\ndo Firestore",instruction:"Para criar a instância do banco e exportar como 'db', qual função você importa de 'firebase/firestore'?",prefix:`import { initializeApp } from "firebase/app";
import { `,suffix:` } from "firebase/firestore";

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);`,answer:"getFirestore",hint:"Começa com 'get' e recebe o app inicializado como argumento. É o ponto de entrada para o banco.",xp:20},{id:12,type:"mini-challenge",tag:"MISSÃO 5.1",title:"CONFIGURE\nO FIREBASE",subtitle:"Faça o Firebase Firestore funcionar no seu projeto Next.js do zero",tasks:["Criou o projeto no Firebase Console (console.firebase.google.com)","Ativou o Cloud Firestore em modo teste (southamerica-east1)","Criou o .env.local com as 6 variáveis NEXT_PUBLIC_FIREBASE_*","Criou src/lib/firebaseConfig.ts com initializeApp e getFirestore","Acessou /hello-firebase e gravou o primeiro documento no Firestore"],bonus:["Verificou o documento criado no painel do Firestore (aba Dados)","Consegue explicar a diferença entre addDoc() e setDoc()","Entende por que usar serverTimestamp() em vez de new Date()"],xp:50,nextHref:"/modulos/backend/atividade-1",nextLabel:"Roteiro completo →"}];a.s(["default",0,function(){return(0,b.jsx)(c.default,{slides:d,backHref:"/modulos/backend",backLabel:"Módulo 05",aulaLabel:"Aula 01 — Firebase Firestore",aulaSlug:"backend-aula-81",completionHref:"/modulos/backend/atividade-1",completionLabel:"Roteiro da Atividade →"})},"metadata",0,{title:"5.1 — Firebase Firestore · Web On Fire Academy"}],28634)},44050,a=>{a.n(a.i(28634))}];

//# sourceMappingURL=%5Broot-of-the-server%5D__07q3f-p._.js.map