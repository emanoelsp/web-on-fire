"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import CodeBlock from "@/components/CodeBlock";

const steps = [
  {
    n: "01",
    title: "Criar projeto no Firebase Console",
    desc: `Acesse console.firebase.google.com com sua conta Google. Clique em "Adicionar projeto", escolha um nome (ex: nextlab-academy) e siga os passos. Você pode desativar o Google Analytics se quiser.`,
    filename: undefined,
    code: null,
    tip: "💡 Use o mesmo e-mail que usa no GitHub para organizar seus projetos.",
  },
  {
    n: "02",
    title: "Criar uma aplicação Web",
    desc: `Dentro do projeto, clique no ícone </> (Web). Dê um apelido para o app (ex: "web") e clique em "Registrar app". NÃO marque o Firebase Hosting por enquanto.`,
    filename: undefined,
    code: null,
    tip: "💡 Após registrar, o Firebase vai mostrar as credenciais — não feche essa tela.",
  },
  {
    n: "03",
    title: "Criar o banco Cloud Firestore",
    desc: `No menu lateral, clique em "Firestore Database" → "Criar banco de dados". Escolha o modo de teste (para aula) e selecione uma região próxima (southamerica-east1 = São Paulo).`,
    filename: undefined,
    code: null,
    tip: "⚠️ Modo de teste permite leitura/escrita sem autenticação por 30 dias. Bom para aprender!",
  },
  {
    n: "04",
    title: "Configurar regras básicas",
    desc: `Na aba "Regras" do Firestore, certifique-se de que as regras permitem leitura e escrita para as aulas:`,
    filename: "Firebase Console → Firestore → Regras",
    code: `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true; // modo de teste
    }
  }
}`,
    tip: "⚠️ Essas regras são só para estudo! Em produção, nunca use allow read, write: if true.",
  },
  {
    n: "05",
    title: "Copiar as credenciais do Firebase",
    desc: `Volte em Configurações do Projeto (ícone de engrenagem ⚙️) → Seus apps → escolha o app web. Copie o objeto firebaseConfig que aparece. Você vai precisar de todos esses valores.`,
    filename: "Firebase Console → Configurações → firebaseConfig",
    code: `// Exemplo do que você vai copiar:
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "meu-projeto.firebaseapp.com",
  projectId: "meu-projeto",
  storageBucket: "meu-projeto.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abc123"
};`,
    tip: null,
  },
  {
    n: "06",
    title: "Criar o arquivo .env.local",
    desc: `Na raiz do projeto (mesma pasta do package.json), crie o arquivo .env.local e cole as credenciais — cada uma em uma linha com o prefixo NEXT_PUBLIC_FIREBASE_:`,
    filename: ".env.local",
    code: `# .env.local — NA RAIZ DO PROJETO
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=meu-projeto.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=meu-projeto
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=meu-projeto.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=1234567890
NEXT_PUBLIC_FIREBASE_APP_ID=1:1234567890:web:abc123`,
    tip: "💡 O .env.local nunca vai para o GitHub (já está no .gitignore). Suas credenciais ficam seguras.",
  },
  {
    n: "07",
    title: "Instalar a biblioteca Firebase",
    desc: "No terminal, dentro da pasta do projeto, execute:",
    filename: "Terminal",
    code: `npm install firebase`,
    tip: null,
  },
  {
    n: "08",
    title: "Criar o arquivo de configuração",
    desc: "Crie a pasta src/lib/ e dentro dela o arquivo firebaseConfig.ts:",
    filename: "src/lib/firebaseConfig.ts",
    code: `import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey:            process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain:        process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId:         process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket:     process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId:             process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Evita inicializar o app mais de uma vez no Next.js
const app = getApps().length === 0
  ? initializeApp(firebaseConfig)
  : getApp();

export const db = getFirestore(app);`,
    tip: "💡 O getApps().length === 0 evita o erro 'Firebase app already exists' no Next.js.",
  },
  {
    n: "09",
    title: "Criar a página de teste",
    desc: "Crie a pasta src/app/modulos/backend/hello-firebase/ com o arquivo page.tsx. Atenção: precisa ter o export default e o useState para funcionar:",
    filename: "src/app/modulos/backend/hello-firebase/page.tsx",
    code: `"use client";

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
        timestamp: serverTimestamp(),
      });
      setDocId(ref.id);
      setStatus("success");
      console.log("ID do documento:", ref.id);
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Hello Firebase 🔥</h1>
      <button onClick={testar} disabled={status === "loading"}>
        {status === "loading" ? "Gravando..." : "Testar Conexão"}
      </button>
      {status === "success" && (
        <p style={{ color: "green" }}>✅ Gravado! ID: {docId}</p>
      )}
      {status === "error" && (
        <p style={{ color: "red" }}>❌ Erro — verifique o .env.local</p>
      )}
    </main>
  );
}`,
    tip: `💡 O "export default" é obrigatório — sem ele o Next.js não consegue renderizar a página.`,
  },
  {
    n: "10",
    title: "Rodar e testar",
    desc: "Inicie o servidor de desenvolvimento e acesse a página de teste:",
    filename: "Terminal",
    code: `npm run dev

# Acesse no navegador:
# http://localhost:3000/modulos/backend/hello-firebase

# Clique em "Testar Conexão"
# Verifique no console do Firebase se o documento foi criado`,
    tip: "✅ Se aparecer o ID do documento, parabéns! O Firebase está configurado corretamente.",
  },
];

const conceitos = [
  {
    id: "firebase",
    termo: "Firebase",
    def: "Plataforma do Google que oferece vários serviços prontos: banco de dados em tempo real, autenticação, hospedagem, armazenamento de arquivos e muito mais. É como ter um servidor pronto — você não precisa criar do zero.",
  },
  {
    id: "firestore",
    termo: "Firestore",
    def: "O banco de dados do Firebase. É NoSQL — em vez de tabelas e linhas (como MySQL), usa Coleções e Documentos. É muito rápido, escalável e sincroniza em tempo real.",
  },
  {
    id: "colecao",
    termo: "Coleção",
    def: "É como uma pasta ou uma tabela no banco. Por exemplo: /usuarios é uma coleção que contém todos os usuários. /produtos seria outra coleção. Você pode ter quantas coleções quiser.",
  },
  {
    id: "documento",
    termo: "Documento",
    def: `É como um registro ou uma linha de tabela, mas em formato JSON. Cada documento tem um ID único e campos que você define. Ex: { nome: "João", email: "joao@email.com" }.`,
  },
  {
    id: "envlocal",
    termo: ".env.local",
    def: "Arquivo especial do Next.js para guardar variáveis de ambiente sensíveis (como senhas e chaves de API). Esse arquivo NÃO vai para o GitHub — fica só na sua máquina. O prefixo NEXT_PUBLIC_ torna a variável acessível no navegador.",
  },
  {
    id: "services",
    termo: "Services",
    def: "Arquivos que contêm as funções de banco de dados (ex: cadastrarUsuario, buscarUsuario). Separamos em services para não misturar lógica de banco com lógica de tela — isso facilita manutenção e reutilização.",
  },
  {
    id: "types",
    termo: "Types",
    def: "Arquivos TypeScript que definem a forma dos dados — como um contrato. Ex: interface User diz que um usuário DEVE ter nome, email e telefone. Isso evita erros antes de rodar o código.",
  },
  {
    id: "useclient",
    termo: '"use client"',
    def: `Diretiva do Next.js App Router. Por padrão, toda página é um Server Component (roda no servidor). Quando você usa useState, useEffect ou eventos de clique, precisa adicionar "use client" no topo do arquivo para indicar que esse componente roda no navegador.`,
  },
  {
    id: "asyncawait",
    termo: "async/await",
    def: `Forma moderna de lidar com operações que levam tempo (como acessar o banco). async marca a função como assíncrona. await faz o código "esperar" a resposta antes de continuar — sem travar o navegador.`,
  },
  {
    id: "trycatch",
    termo: "try/catch",
    def: `Mecanismo de tratamento de erros. O bloco try tenta executar o código. Se der erro, o bloco catch "pega" o erro e permite tratá-lo — ex: mostrar uma mensagem para o usuário em vez de travar o app.`,
  },
];

const STORAGE_KEY = "atividade1-conceitos";

export default function Atividade1Page() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [celebrated, setCelebrated] = useState(false);
  const [lockShake, setLockShake] = useState(false);
  const stepsRef = useRef<HTMLDivElement>(null);

  const total = conceitos.length;
  const done = Object.values(checked).filter(Boolean).length;
  const progress = Math.round((done / total) * 100);
  const unlocked = progress === 100;

  // Carrega do localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setChecked(JSON.parse(saved));
    } catch {}
  }, []);

  // Salva no localStorage e dispara celebração
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(checked));
    } catch {}
    if (progress === 100 && !celebrated) {
      setCelebrated(true);
      setTimeout(() => {
        stepsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 800);
    }
  }, [checked, progress]);

  function toggle(id: string) {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function handleLockedClick() {
    setLockShake(true);
    setTimeout(() => setLockShake(false), 500);
  }

  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", background: "var(--dark-1)", padding: "2rem 1.5rem" }}>
        <div style={{ maxWidth: "820px", margin: "0 auto" }}>

          {/* BACK */}
          <Link
            href="/modulos/backend"
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.4rem",
              color: "var(--text-muted)", textDecoration: "none",
              fontSize: "0.85rem", marginBottom: "2rem",
            }}
          >
            ← Módulo Backend
          </Link>

          {/* HEADER */}
          <div style={{ marginBottom: "2.5rem" }}>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1rem" }}>
              <span className="badge badge-fire">🔥 Módulo Backend</span>
              <span className="badge badge-amber">Atividade 1</span>
            </div>
            <h1
              style={{
                fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 5vw, 3rem)",
                letterSpacing: "0.04em", lineHeight: 1.05, marginBottom: "1rem",
              }}
            >
              <span className="fire-text">CONFIGURAÇÃO DO</span>
              <br />FIREBASE FIRESTORE
            </h1>
            <p style={{ color: "var(--text-muted)", lineHeight: 1.7, fontSize: "0.95rem" }}>
              Nesta atividade você vai criar e configurar o Firebase Firestore
              no seu projeto Next.js, do zero ao teste de conexão funcionando.
            </p>
          </div>

          {/* ── CONCEITOS IMPORTANTES ─────────────────────── */}
          <section
            style={{
              background: "var(--dark-2)", borderRadius: "16px", padding: "2rem",
              marginBottom: "2.5rem", border: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            {/* título + progresso */}
            <div style={{ marginBottom: "1.5rem" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.9rem" }}>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", letterSpacing: "0.04em" }}>
                  📚 CONCEITOS IMPORTANTES
                </h2>
                <span
                  style={{
                    fontFamily: "var(--font-mono)", fontSize: "0.8rem",
                    color: unlocked ? "#4ade80" : "var(--fire-orange)", fontWeight: 700,
                  }}
                >
                  {done}/{total}
                </span>
              </div>

              {/* barra de progresso */}
              <div
                style={{
                  height: "6px", borderRadius: "99px",
                  background: "rgba(255,255,255,0.06)", overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%", borderRadius: "99px",
                    width: `${progress}%`,
                    background: unlocked
                      ? "linear-gradient(90deg, #4ade80, #22c55e)"
                      : "linear-gradient(90deg, #FF5500, #FFB800)",
                    transition: "width 0.4s ease, background 0.4s ease",
                    boxShadow: unlocked
                      ? "0 0 12px rgba(74,222,128,0.5)"
                      : "0 0 12px rgba(255,85,0,0.4)",
                  }}
                />
              </div>

              <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.5rem", fontFamily: "var(--font-mono)" }}>
                {unlocked
                  ? "✅ Todos os conceitos lidos — passo a passo desbloqueado!"
                  : `Marque todos como lido para desbloquear o passo a passo (${progress}%)`}
              </p>
            </div>

            {/* lista de conceitos com checkbox */}
            <div style={{ display: "grid", gap: "0.75rem" }}>
              {conceitos.map((c) => (
                <label
                  key={c.id}
                  htmlFor={`conceito-${c.id}`}
                  style={{
                    display: "flex", gap: "0.9rem", alignItems: "flex-start",
                    padding: "1rem 1.1rem", borderRadius: "10px",
                    background: checked[c.id] ? "rgba(255,85,0,0.06)" : "var(--dark-3)",
                    border: `1px solid ${checked[c.id] ? "rgba(255,85,0,0.25)" : "rgba(255,255,255,0.04)"}`,
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                >
                  <input
                    id={`conceito-${c.id}`}
                    type="checkbox"
                    className="concept-checkbox"
                    checked={!!checked[c.id]}
                    onChange={() => toggle(c.id)}
                    style={{ marginTop: "0.15rem" }}
                  />
                  <div style={{ flex: 1 }}>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)", color: checked[c.id] ? "#FF9966" : "#FF7744",
                        fontSize: "0.85rem", fontWeight: 700, display: "block", marginBottom: "0.35rem",
                        textDecoration: checked[c.id] ? "line-through" : "none",
                        opacity: checked[c.id] ? 0.7 : 1,
                      }}
                    >
                      {c.termo}
                    </span>
                    <p style={{ color: "var(--text-muted)", fontSize: "0.83rem", lineHeight: 1.7, margin: 0 }}>
                      {c.def}
                    </p>
                  </div>
                </label>
              ))}
            </div>

            {/* ── CELEBRAÇÃO 100% ─────────────────────────── */}
            {unlocked && (
              <div
                className="celebrate-banner"
                style={{
                  marginTop: "1.5rem", borderRadius: "14px", padding: "1.75rem 2rem",
                  background: "linear-gradient(135deg, rgba(255,85,0,0.12), rgba(255,184,0,0.08))",
                  border: "1px solid rgba(255,85,0,0.35)",
                  textAlign: "center",
                  boxShadow: "0 0 40px rgba(255,85,0,0.15)",
                }}
              >
                <div style={{ fontSize: "3rem", marginBottom: "0.75rem", lineHeight: 1 }}>
                  <span className="flame-icon">🔥</span>
                  <span className="flame-icon" style={{ animationDelay: "0.15s" }}>🔥</span>
                  <span className="flame-icon" style={{ animationDelay: "0.3s" }}>🔥</span>
                </div>
                <h3
                  className="fire-text"
                  style={{
                    fontFamily: "var(--font-display)", fontSize: "1.6rem",
                    letterSpacing: "0.04em", marginBottom: "0.5rem",
                  }}
                >
                  AGORA VOCÊ DOMINA OS CONCEITOS!
                </h3>
                <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.9rem" }}>
                  Pronto para pegar fogo na prática 🚀 — o passo a passo está desbloqueado abaixo.
                </p>
              </div>
            )}
          </section>

          {/* ── PASSO A PASSO ─────────────────────────────── */}
          <div ref={stepsRef}>
            <section style={{ marginBottom: "2.5rem", position: "relative" }}>
              {/* HEADER do passo a passo */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.75rem", flexWrap: "wrap", gap: "0.75rem" }}>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", letterSpacing: "0.04em" }}>
                  PASSO A PASSO
                </h2>
                {!unlocked && (
                  <span
                    style={{
                      display: "flex", alignItems: "center", gap: "0.4rem",
                      padding: "0.35rem 0.85rem", borderRadius: "8px",
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      fontSize: "0.78rem", color: "var(--text-muted)",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    🔒 Leia os conceitos para desbloquear
                  </span>
                )}
              </div>

              {/* OVERLAY de bloqueio */}
              {!unlocked && (
                <div
                  onClick={handleLockedClick}
                  style={{
                    position: "absolute", inset: "3rem 0 0 0", zIndex: 10,
                    borderRadius: "14px", cursor: "pointer",
                    background: "linear-gradient(to bottom, rgba(8,8,8,0) 0%, rgba(8,8,8,0.97) 30%)",
                    display: "flex", flexDirection: "column",
                    alignItems: "center", justifyContent: "center", gap: "1rem",
                    paddingTop: "6rem",
                  }}
                >
                  <div
                    className={lockShake ? "lock-shake" : ""}
                    style={{
                      width: "60px", height: "60px", borderRadius: "50%",
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "1.6rem",
                    }}
                  >
                    🔒
                  </div>
                  <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.85rem", textAlign: "center" }}>
                    Complete {total - done} conceito{total - done !== 1 ? "s" : ""} restante{total - done !== 1 ? "s" : ""} para desbloquear
                  </p>
                  <div
                    style={{
                      display: "flex", gap: "0.4rem", flexWrap: "wrap", justifyContent: "center",
                    }}
                  >
                    {conceitos.filter((c) => !checked[c.id]).map((c) => (
                      <span
                        key={c.id}
                        style={{
                          fontFamily: "var(--font-mono)", fontSize: "0.68rem",
                          padding: "0.2rem 0.5rem", borderRadius: "4px",
                          background: "rgba(255,85,0,0.08)",
                          border: "1px solid rgba(255,85,0,0.2)",
                          color: "rgba(255,119,68,0.6)",
                        }}
                      >
                        {c.termo}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* STEPS */}
              <div
                className={unlocked ? "steps-unlock" : ""}
                style={{
                  display: "flex", flexDirection: "column", gap: "1.25rem",
                  filter: unlocked ? "none" : "blur(2px)",
                  pointerEvents: unlocked ? "auto" : "none",
                  userSelect: unlocked ? "auto" : "none",
                  transition: "filter 0.4s ease",
                }}
              >
                {steps.map((step) => (
                  <div key={step.n} className="card" style={{ borderRadius: "14px", padding: "1.5rem" }}>
                    <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                      <div className="step-dot">
                        <span style={{ fontFamily: "var(--font-mono)" }}>{step.n}</span>
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <h3
                          style={{
                            fontFamily: "var(--font-display)", fontSize: "1.15rem",
                            letterSpacing: "0.04em", marginBottom: "0.6rem", color: "var(--text-primary)",
                          }}
                        >
                          {step.title}
                        </h3>
                        <p
                          style={{
                            color: "var(--text-muted)", fontSize: "0.87rem", lineHeight: 1.7,
                            marginBottom: step.code || step.tip ? "1rem" : 0,
                          }}
                        >
                          {step.desc}
                        </p>
                        {step.code && (
                          <CodeBlock
                            filename={step.filename}
                            code={step.code}
                            style={{ marginBottom: step.tip ? "1rem" : 0 }}
                          />
                        )}
                        {step.tip && (
                          <div className="tip-box">
                            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.83rem", lineHeight: 1.6 }}>
                              {step.tip}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* ESTRUTURA DE ARQUIVOS */}
          {unlocked && (
            <section
              style={{
                background: "var(--dark-2)", borderRadius: "16px", padding: "2rem",
                marginBottom: "2.5rem", border: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", letterSpacing: "0.04em", marginBottom: "1.25rem" }}>
                📁 ESTRUTURA DE ARQUIVOS
              </h2>
              <pre className="code-block" style={{ fontFamily: "var(--font-mono)" }}>
{`on-fire-academy/
├── src/
│   ├── app/
│   │   └── modulos/backend/
│   │       ├── hello-firebase/
│   │       │   └── page.tsx    ← teste de conexão
│   │       └── atividade-1/
│   │           └── page.tsx    ← este arquivo
│   └── lib/
│       └── firebaseConfig.ts   ← configuração do Firebase
├── .env.local                  ← credenciais (não vai pro GitHub)
└── package.json`}
              </pre>
            </section>
          )}

          {/* ROTEIRO DE AULA */}
          {unlocked && (
            <section
              style={{
                background: "linear-gradient(135deg, rgba(255,85,0,0.06), rgba(204,34,0,0.03))",
                border: "1px solid rgba(255,85,0,0.2)", borderRadius: "16px",
                padding: "2rem", marginBottom: "2.5rem",
              }}
            >
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", letterSpacing: "0.04em", marginBottom: "1.5rem" }}>
                🎯 ROTEIRO DE AULA
              </h2>

              {[
                {
                  titulo: "Objetivo", icone: "🎯",
                  items: [
                    "Configurar o Firebase Firestore em um projeto Next.js",
                    "Entender como funciona a conexão entre o app e o banco",
                    "Criar e visualizar o primeiro documento no Firestore",
                  ],
                },
                {
                  titulo: "Pré-requisitos", icone: "📋",
                  items: [
                    "Conta Google ativa",
                    "Node.js 18+ instalado",
                    "Projeto Next.js criado (create-next-app)",
                    "Conhecimento básico de TypeScript",
                  ],
                },
                {
                  titulo: "Critérios de Avaliação", icone: "✅",
                  items: [
                    "Projeto roda sem erros (npm run dev)",
                    "Firebase configurado corretamente",
                    ".env.local criado com todas as variáveis",
                    "Página /modulos/backend/hello-firebase grava no Firestore",
                    "Aluno consegue explicar o que é uma coleção e um documento",
                  ],
                },
              ].map((sec) => (
                <div key={sec.titulo} style={{ marginBottom: "1.5rem" }}>
                  <h3
                    style={{
                      fontFamily: "var(--font-display)", fontSize: "1.05rem", letterSpacing: "0.04em",
                      color: "var(--text-primary)", marginBottom: "0.6rem",
                      display: "flex", alignItems: "center", gap: "0.5rem",
                    }}
                  >
                    {sec.icone} {sec.titulo}
                  </h3>
                  <ul style={{ listStyle: "none" }}>
                    {sec.items.map((item) => (
                      <li
                        key={item}
                        style={{
                          color: "var(--text-muted)", fontSize: "0.85rem", padding: "0.3rem 0",
                          display: "flex", alignItems: "flex-start", gap: "0.5rem",
                        }}
                      >
                        <span style={{ color: "var(--fire-orange)", marginTop: "0.15rem" }}>▸</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>
          )}

          {/* NAV */}
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Link
              href="/modulos/backend/hello-firebase"
              style={{
                flex: 1, minWidth: "200px", padding: "1rem", textAlign: "center",
                borderRadius: "12px", background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.07)", color: "var(--text-muted)",
                textDecoration: "none", fontSize: "0.87rem", fontWeight: 600,
              }}
            >
              ⚗️ Testar Conexão
            </Link>
            <Link
              href="/modulos/backend/atividade-2"
              className="fire-btn"
              style={{
                flex: 1, minWidth: "200px", padding: "1rem", textAlign: "center",
                borderRadius: "12px", color: "#fff", textDecoration: "none",
                fontSize: "0.87rem", fontWeight: 700,
              }}
            >
              Atividade 2 → Cadastro
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
