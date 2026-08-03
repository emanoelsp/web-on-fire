"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { adminAuthHeaders } from "@/lib/adminClient";

type Exercicio = {
  tipo: "Quiz" | "Lacuna" | "Missão";
  enunciado: string;
  resposta: string;
  porque?: string;
  codigo?: string;
};

type AulaGabarito = {
  aula: string;
  titulo: string;
  href: string;
  exercicios: Exercicio[];
};

const GABARITO: AulaGabarito[] = [
  {
    aula: "Aula 01 · P1",
    titulo: "O que é Node.js",
    href: "/modulos/infra/node-1",
    exercicios: [
      {
        tipo: "Quiz",
        enunciado: "Node.js é uma linguagem mais moderna que o JavaScript?",
        resposta: "Não — Node.js é um runtime que executa JavaScript fora do navegador.",
        porque: "Node = ambiente de execução (V8 + libuv + APIs de sistema). A linguagem continua sendo JavaScript.",
      },
      {
        tipo: "Lacuna",
        enunciado: "Comando que executa ola.js com o Node.",
        resposta: "node ola.js",
      },
      {
        tipo: "Missão",
        enunciado: "Missão 01 — Primeiro contato (referência).",
        resposta: "Verificar instalação, criar e rodar o arquivo, iniciar projeto e instalar pacote.",
        codigo: `node -v && npm -v          # verifica a instalação
# ola.js:  console.log("Web On Fire! 🔥");
node ola.js                # imprime a mensagem
npm init -y                # gera o package.json
# scripts: { "ola": "node ola.js" }
npm run ola                # roda o script
npm install cowsay         # cria node_modules/`,
      },
    ],
  },
  {
    aula: "Aula 01 · P2",
    titulo: "Como o Node funciona",
    href: "/modulos/infra/node-2",
    exercicios: [
      {
        tipo: "Quiz",
        enunciado: "O que aparece ao rodar node garcom.js?",
        resposta: "1, 2, 3",
        porque: "O setTimeout delega para a fila; o código síncrono segue (imprime 2) e o event loop entrega o 3 depois. 0ms não é 'agora'.",
      },
      {
        tipo: "Lacuna",
        enunciado: "Palavra que pausa a função async sem travar.",
        resposta: "await",
      },
      {
        tipo: "Quiz",
        enunciado: "Qual tarefa TRAVA o event loop?",
        resposta: "Um for que calcula números primos por 30 segundos (CPU-bound).",
        porque: "Ocupa a única thread; não há I/O para delegar. Ler arquivo / esperar banco / receber conexões são I/O e não travam.",
      },
      {
        tipo: "Missão",
        enunciado: "Missão 02 — Laboratório do loop (referência).",
        resposta: "Provar a ordem 1,2,3; comparar readFileSync x await readFile; travar com while.",
        codigo: `// garcom.js
console.log(1);
setTimeout(() => console.log(3), 0);
console.log(2);            // saída: 1, 2, 3

// readFileSync BLOQUEIA a thread; await readFile (fs/promises) não.
// Um while de ~3s antes de um setTimeout atrasa o callback (prova o bloqueio).
// Bônus: process.nextTick fura a fila (antes de timers e setImmediate).`,
      },
    ],
  },
  {
    aula: "Aula 01 · P3",
    titulo: "Node no mundo real",
    href: "/modulos/infra/node-3",
    exercicios: [
      {
        tipo: "Quiz",
        enunciado: "Em qual produto o Node seria a escolha mais questionável?",
        resposta: "Serviço que converte vídeos 4K (CPU-bound).",
        porque: "Conversão de vídeo ocuparia a thread por minutos. Melhor Go/Rust ou fila com workers. API/chat/agregador são I/O — pontos fortes do Node.",
      },
      {
        tipo: "Lacuna",
        enunciado: "Comando que sobe o servidor de desenvolvimento (Next.js).",
        resposta: "npm run dev",
      },
      {
        tipo: "Missão",
        enunciado: "Missão 03 — Servidor na unha (referência).",
        resposta: "Servidor HTTP com node:http respondendo JSON e uma rota /alunos.",
        codigo: `// servidor.js
import http from "node:http";

const server = http.createServer((req, res) => {
  if (req.url === "/alunos") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(["Ana", "Bruno", "Carla"]));
    return;
  }
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ status: "on fire" }));
});

server.listen(3000, () => console.log("http://localhost:3000"));`,
      },
    ],
  },
  {
    aula: "Aula 02",
    titulo: "Tipagem Estática (TypeScript)",
    href: "/modulos/infra/typescript",
    exercicios: [
      {
        tipo: "Quiz",
        enunciado: 'type Status = "ativo" | "inativo"; const s: Status = "Ativo"; (A maiúsculo)',
        resposta: "Erro de compilação, antes mesmo de rodar.",
        porque: 'Tipos literais são exatos: "Ativo" ≠ "ativo". O compilador barra: Type \'"Ativo"\' is not assignable to type \'Status\'.',
      },
      {
        tipo: "Lacuna",
        enunciado: "Palavra-chave que declara o contrato de forma de um objeto.",
        resposta: "interface",
      },
      {
        tipo: "Missão",
        enunciado: "Missão TS — Contratos de aço (referência).",
        resposta: "Modelar Aluno, Dificuldade, Atividade e a função ganharXP (retorna novo objeto).",
        codigo: `interface Aluno {
  nome: string;
  email: string;
  xp: number;
  badges: string[];
}

type Dificuldade = "facil" | "medio" | "dificil";

interface Atividade {
  id: string | number;
  titulo: string;
  dificuldade: Dificuldade;
  prazo?: string;          // opcional
}

function ganharXP(aluno: Aluno, pontos: number): Aluno {
  return { ...aluno, xp: aluno.xp + pontos };
}
// Erros de propósito: xp: "dez" e dificuldade: "media" não compilam.
// Bônus: Partial<Aluno> em atualizarAluno; genérico primeiro<T>(lista: T[]).`,
      },
    ],
  },
  {
    aula: "Aula 03",
    titulo: "Git & GitHub",
    href: "/modulos/infra/git",
    exercicios: [
      {
        tipo: "Quiz",
        enunciado: "Registrar só 1 de 3 arquivos editados no próximo commit.",
        resposta: "git add arquivo.ts e depois git commit -m \"...\"",
        porque: "O add seleciona o que entra na foto (staging area); o commit fotografa só o que foi preparado.",
      },
      {
        tipo: "Lacuna",
        enunciado: "Comando que registra a foto das mudanças preparadas, com mensagem.",
        resposta: 'git commit -m',
      },
      {
        tipo: "Missão",
        enunciado: "Missão Git — Máquina do tempo (referência).",
        resposta: "Do git init ao PR e conflito resolvido.",
        codigo: `git config --global user.name "Seu Nome"
git config --global user.email "voce@email.com"

mkdir lab-git && cd lab-git
git init
echo "# Lab Git" > README.md
git add README.md
git commit -m "chore: primeiro commit"

git remote add origin https://github.com/usuario/lab-git.git
git push -u origin main

git checkout -b feature/sobre
git add sobre.md && git commit -m "feat: pagina sobre"
git push origin feature/sobre
# Abrir o Pull Request no GitHub e fazer o merge pela interface.
# Conflito: editar a mesma linha em duas branches, git merge e resolver
# (remover <<<<<<, ======, >>>>>>, depois git add + git commit).`,
      },
    ],
  },
  {
    aula: "Aula 04",
    titulo: "Terminal: CMD & Bash",
    href: "/modulos/infra/terminal",
    exercicios: [
      {
        tipo: "Quiz",
        enunciado: "No Git Bash (Windows), como listar os arquivos da pasta atual?",
        resposta: "ls",
        porque: "O Git Bash é um shell Unix, então usa ls mesmo no Windows (dir é do CMD).",
      },
      {
        tipo: "Lacuna",
        enunciado: "Voltar para a pasta anterior (um nível acima).",
        resposta: "cd ..",
      },
      {
        tipo: "Missão",
        enunciado: "Missão 04 — Dominando o terminal (CMD × Bash).",
        resposta: "Navegar, criar e remover pastas nos dois shells.",
        codigo: `Ação                     CMD (Windows)      Bash (Unix)
Pasta atual              cd                 pwd
Listar                   dir                ls
Criar pasta e entrar     mkdir laboratorio  mkdir laboratorio
                         cd laboratorio     cd laboratorio
Subpastas src e docs     mkdir src          mkdir src docs
                         mkdir docs
Voltar um nível          cd ..              cd ..
Remover a pasta inteira  rmdir /s laboratorio  rm -r laboratorio
Criar arquivo vazio      type nul > nota.txt   touch nota.txt`,
      },
    ],
  },
];

const CORES: Record<Exercicio["tipo"], { bg: string; border: string; color: string }> = {
  Quiz: { bg: "rgba(96,165,250,0.08)", border: "rgba(96,165,250,0.3)", color: "#60a5fa" },
  Lacuna: { bg: "rgba(34,197,94,0.08)", border: "rgba(34,197,94,0.3)", color: "#4ade80" },
  Missão: { bg: "rgba(255,85,0,0.08)", border: "rgba(255,85,0,0.3)", color: "#FF7744" },
};

export default function AdminGabaritoPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkAuth = useCallback(async () => {
    const headers = await adminAuthHeaders(user);
    const res = await fetch("/api/admin/modules", { headers });
    if (res.status === 401) {
      router.push("/admin/login");
      return;
    }
    setAuthorized(true);
    setLoading(false);
  }, [router, user]);

  useEffect(() => {
    if (authLoading) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    checkAuth();
  }, [authLoading, checkAuth]);

  if (loading || !authorized) {
    return (
      <main style={{ minHeight: "100vh", background: "var(--dark-1)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-muted)" }}>
        Verificando acesso…
      </main>
    );
  }

  return (
    <main style={{ minHeight: "100vh", background: "var(--dark-1)" }}>
      {/* Header */}
      <header
        style={{
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          background: "rgba(8,8,8,0.95)",
          position: "sticky",
          top: 0,
          zIndex: 50,
        }}
      >
        <div
          style={{
            maxWidth: "1000px",
            margin: "0 auto",
            padding: "0 1.5rem",
            height: "64px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <span style={{ fontSize: "1.2rem" }}>🔥</span>
              <span className="fire-text" style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", letterSpacing: "0.06em" }}>
                WEB ON FIRE
              </span>
            </Link>
            <span style={{ color: "rgba(255,255,255,0.15)", fontSize: "0.8rem" }}>/</span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "rgba(255,119,68,0.8)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              admin · gabarito
            </span>
          </div>
          <Link
            href="/admin/dashboard"
            style={{
              padding: "0.4rem 1rem",
              borderRadius: "8px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.07)",
              color: "rgba(255,255,255,0.6)",
              fontSize: "0.78rem",
              textDecoration: "none",
            }}
          >
            ← Painel
          </Link>
        </div>
      </header>

      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "3rem 1.5rem" }}>
        <div style={{ marginBottom: "2.5rem" }}>
          <span className="badge badge-fire" style={{ marginBottom: "1rem", display: "inline-flex" }}>
            🔒 Confidencial — só o professor
          </span>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "0.04em", color: "var(--text-primary)" }}>
            GABARITO · MÓDULO 01
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
            Respostas dos exercícios das Aulas 01 (P1–P3), 02, 03 e 04.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          {GABARITO.map((aula) => (
            <section key={aula.aula}>
              <div style={{ display: "flex", alignItems: "baseline", gap: "0.6rem", marginBottom: "0.9rem", flexWrap: "wrap" }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", color: "#FF7744", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 700 }}>
                  {aula.aula}
                </span>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", letterSpacing: "0.03em", color: "var(--text-primary)" }}>
                  {aula.titulo}
                </h2>
                <Link href={aula.href} style={{ fontSize: "0.72rem", color: "rgba(255,119,68,0.7)", textDecoration: "none" }}>
                  ver aula →
                </Link>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {aula.exercicios.map((ex, i) => {
                  const c = CORES[ex.tipo];
                  return (
                    <div
                      key={i}
                      className="card"
                      style={{ borderRadius: "14px", padding: "1.1rem 1.35rem", border: "1px solid rgba(255,255,255,0.05)" }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.5rem", flexWrap: "wrap" }}>
                        <span
                          style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "0.6rem",
                            fontWeight: 700,
                            letterSpacing: "0.06em",
                            textTransform: "uppercase",
                            padding: "0.2rem 0.55rem",
                            borderRadius: "9999px",
                            background: c.bg,
                            border: `1px solid ${c.border}`,
                            color: c.color,
                          }}
                        >
                          {ex.tipo}
                        </span>
                        <span style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.7)" }}>{ex.enunciado}</span>
                      </div>

                      <div style={{ display: "flex", gap: "0.5rem", alignItems: "flex-start" }}>
                        <span style={{ color: "#4ade80", fontWeight: 700, flexShrink: 0 }}>✓</span>
                        <span style={{ fontSize: "0.9rem", color: "var(--text-primary)", fontWeight: 600 }}>{ex.resposta}</span>
                      </div>

                      {ex.porque && (
                        <p style={{ fontSize: "0.76rem", color: "var(--text-muted)", marginTop: "0.45rem", lineHeight: 1.5 }}>
                          {ex.porque}
                        </p>
                      )}

                      {ex.codigo && (
                        <pre
                          style={{
                            marginTop: "0.75rem",
                            padding: "0.9rem 1rem",
                            borderRadius: "10px",
                            background: "rgba(0,0,0,0.35)",
                            border: "1px solid rgba(255,255,255,0.06)",
                            overflowX: "auto",
                            fontFamily: "var(--font-mono)",
                            fontSize: "0.72rem",
                            lineHeight: 1.6,
                            color: "rgba(255,255,255,0.8)",
                            whiteSpace: "pre",
                          }}
                        >
                          {ex.codigo}
                        </pre>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
