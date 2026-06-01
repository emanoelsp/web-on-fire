"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import CodeBlock from "@/components/CodeBlock";
import { cadastrarUsuario } from "@/services/userService";
import { UserFormData } from "@/types/user";

const conceitos = [
  {
    id: "camadas",
    termo: "Arquitetura em Camadas",
    def: "Organizar o código em camadas separadas: types (contratos de dados), services (funções de banco), lib (configuração) e app (telas). Cada camada tem uma única responsabilidade — fica fácil de entender, manter e reutilizar.",
  },
  {
    id: "interface",
    termo: "Interface TypeScript",
    def: "Define a 'forma' dos dados como um contrato. Se você tentar salvar um usuário sem e-mail, o TypeScript avisa antes de rodar. Com type UserFormData = Omit<User, 'id' | 'createdAt'> você reusa a interface removendo os campos automáticos.",
  },
  {
    id: "service",
    termo: "Service",
    def: "Arquivo que concentra as funções de banco de dados. O formulário nunca acessa o Firestore diretamente — chama cadastrarUsuario() do service. Isso evita duplicação de código e facilita testes e manutenção.",
  },
  {
    id: "userouter",
    termo: "useRouter",
    def: "Hook do Next.js para navegar entre páginas de forma programática. Após salvar no banco com sucesso, router.push('/perfil/' + id) redireciona o usuário sem recarregar a página inteira.",
  },
  {
    id: "spread",
    termo: "Spread Operator (...)",
    def: "O ...dados espalha todos os campos do objeto dentro de outro. Em addDoc(collection(db, 'usuarios'), { ...dados, createdAt: serverTimestamp() }) você copia nome, email e telefone sem precisar listar cada campo manualmente.",
  },
  {
    id: "rotadinamica",
    termo: "Rota Dinâmica [id]",
    def: "No Next.js, uma pasta com nome entre colchetes (ex: perfil/[id]) cria uma rota dinâmica. As URLs /perfil/abc e /perfil/xyz usam o mesmo page.tsx, mas com params.id diferente — cada usuário tem sua própria página.",
  },
  {
    id: "servercomponent",
    termo: "Server Component",
    def: "Componente que roda no servidor — sem 'use client'. A página de perfil busca dados do Firestore no servidor e envia o HTML pronto. Mais rápido e seguro do que buscar no navegador do usuário.",
  },
  {
    id: "adddoc",
    termo: "addDoc / getDoc",
    def: "Funções do Firestore SDK. addDoc cria um documento com ID gerado automaticamente e retorna a referência (com o ID). getDoc busca um documento pelo ID. Os dois são assíncronos — precisam de await.",
  },
];

const arquitetura = [
  { camada: "types/", arquivo: "user.ts", cor: "#fbbf24", desc: "Define a estrutura dos dados (contrato TypeScript)" },
  { camada: "services/", arquivo: "userService.ts", cor: "#60a5fa", desc: "Funções que falam com o Firestore (regras de banco)" },
  { camada: "lib/", arquivo: "firebaseConfig.ts", cor: "#a78bfa", desc: "Configuração e conexão com o Firebase" },
  { camada: "app/atividade-2/", arquivo: "page.tsx", cor: "#4ade80", desc: "Tela: formulário + chamada ao service" },
];

const STORAGE_KEY = "atividade2-progress";

export default function Atividade2Page() {
  const [concepts, setConcepts] = useState<Record<string, boolean>>({});
  const [archRead, setArchRead] = useState(false);
  const [formTested, setFormTested] = useState(false);
  const [celebrated, setCelebrated] = useState(false);
  const [lockShake, setLockShake] = useState(false);

  const [form, setForm] = useState<UserFormData>({ nome: "", email: "", telefone: "" });
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [docId, setDocId] = useState("");

  const stepsRef = useRef<HTMLDivElement>(null);

  const totalConcepts = conceitos.length;
  const conceptsDone = Object.values(concepts).filter(Boolean).length;
  const gate1 = conceptsDone === totalConcepts;
  const gate2 = archRead;
  const gate3 = formTested;
  const allDone = gate1 && gate2 && gate3;
  const gatesDone = [gate1, gate2, gate3].filter(Boolean).length;

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const data = JSON.parse(saved);
        if (data.concepts) setConcepts(data.concepts);
        if (data.archRead) setArchRead(true);
        if (data.formTested) setFormTested(true);
      }
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ concepts, archRead, formTested }));
    } catch {}
    if (allDone && !celebrated) {
      setCelebrated(true);
      setTimeout(() => {
        stepsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 900);
    }
  }, [concepts, archRead, formTested, allDone]);

  function toggleConcept(id: string) {
    setConcepts((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function handleLockedClick() {
    setLockShake(true);
    setTimeout(() => setLockShake(false), 500);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.nome || !form.email || !form.telefone) {
      setErrorMsg("Preencha todos os campos.");
      setFormStatus("error");
      return;
    }
    setFormStatus("loading");
    setErrorMsg("");
    try {
      const id = await cadastrarUsuario(form);
      setDocId(id);
      setFormStatus("success");
      setFormTested(true);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Erro ao cadastrar.");
      setFormStatus("error");
    }
  }

  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", background: "var(--dark-1)", padding: "2rem 1.5rem" }}>
        <div style={{ maxWidth: "820px", margin: "0 auto" }}>

          {/* BACK */}
          <Link
            href="/modulos/backend/atividade-1"
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.4rem",
              color: "var(--text-muted)", textDecoration: "none",
              fontSize: "0.85rem", marginBottom: "2rem",
            }}
          >
            ← Atividade 1
          </Link>

          {/* HEADER */}
          <div style={{ marginBottom: "2.5rem" }}>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1rem" }}>
              <span className="badge badge-fire">🔥 Módulo Backend</span>
              <span className="badge badge-green">Atividade 2</span>
            </div>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 5vw, 3rem)",
                letterSpacing: "0.04em",
                lineHeight: 1.05,
                marginBottom: "1rem",
              }}
            >
              <span className="fire-text">CADASTRO COM</span>
              <br />
              ARQUITETURA EM CAMADAS
            </h1>
            <p style={{ color: "var(--text-muted)", lineHeight: 1.7, fontSize: "0.95rem" }}>
              Formulário de cadastro organizado em camadas profissionais:
              <strong style={{ color: "var(--text-primary)" }}> types → services → lib → app</strong>.
              Complete as 3 etapas abaixo para desbloquear o passo a passo da atividade.
            </p>
          </div>

          {/* GATE OVERVIEW */}
          <div
            style={{
              background: "var(--dark-2)",
              borderRadius: "14px",
              padding: "1.25rem 1.5rem",
              marginBottom: "2.5rem",
              border: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-mono)", fontSize: "0.72rem",
                color: "var(--text-muted)", letterSpacing: "0.08em",
                textTransform: "uppercase", marginBottom: "0.85rem",
              }}
            >
              Para desbloquear o passo a passo — {gatesDone}/3 etapas concluídas
            </p>
            <div style={{ height: "4px", borderRadius: "99px", background: "rgba(255,255,255,0.06)", overflow: "hidden", marginBottom: "1rem" }}>
              <div
                style={{
                  height: "100%",
                  width: `${(gatesDone / 3) * 100}%`,
                  borderRadius: "99px",
                  background: allDone ? "linear-gradient(90deg, #4ade80, #22c55e)" : "linear-gradient(90deg, #FF5500, #FFB800)",
                  transition: "width 0.4s ease, background 0.4s ease",
                  boxShadow: allDone ? "0 0 10px rgba(74,222,128,0.4)" : "0 0 10px rgba(255,85,0,0.35)",
                }}
              />
            </div>
            <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
              {[
                { label: `Conceitos (${conceptsDone}/${totalConcepts})`, done: gate1 },
                { label: "Arquitetura", done: gate2 },
                { label: "Formulário testado", done: gate3 },
              ].map((g) => (
                <span
                  key={g.label}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "0.35rem",
                    padding: "0.3rem 0.75rem", borderRadius: "99px",
                    fontSize: "0.75rem", fontFamily: "var(--font-mono)", fontWeight: 600,
                    background: g.done ? "rgba(74,222,128,0.1)" : "rgba(255,255,255,0.04)",
                    border: `1px solid ${g.done ? "rgba(74,222,128,0.3)" : "rgba(255,255,255,0.08)"}`,
                    color: g.done ? "#4ade80" : "var(--text-muted)",
                    transition: "all 0.3s",
                  }}
                >
                  {g.done ? "✓" : "○"} {g.label}
                </span>
              ))}
            </div>
          </div>

          {/* ── ETAPA 1: CONCEITOS ESSENCIAIS ─────────────────── */}
          <section
            style={{
              background: "var(--dark-2)",
              borderRadius: "16px",
              padding: "2rem",
              marginBottom: "2rem",
              border: gate1 ? "1px solid rgba(74,222,128,0.15)" : "1px solid rgba(255,255,255,0.05)",
              transition: "border-color 0.3s",
            }}
          >
            <div style={{ marginBottom: "1.5rem" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.9rem" }}>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", letterSpacing: "0.04em" }}>
                  📚 ETAPA 1 — CONCEITOS ESSENCIAIS
                </h2>
                <span
                  style={{
                    fontFamily: "var(--font-mono)", fontSize: "0.8rem",
                    color: gate1 ? "#4ade80" : "var(--fire-orange)", fontWeight: 700,
                  }}
                >
                  {conceptsDone}/{totalConcepts}
                </span>
              </div>
              <div style={{ height: "6px", borderRadius: "99px", background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
                <div
                  style={{
                    height: "100%", borderRadius: "99px",
                    width: `${(conceptsDone / totalConcepts) * 100}%`,
                    background: gate1 ? "linear-gradient(90deg, #4ade80, #22c55e)" : "linear-gradient(90deg, #FF5500, #FFB800)",
                    transition: "width 0.4s ease, background 0.4s ease",
                    boxShadow: gate1 ? "0 0 12px rgba(74,222,128,0.5)" : "0 0 12px rgba(255,85,0,0.4)",
                  }}
                />
              </div>
              <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.5rem", fontFamily: "var(--font-mono)" }}>
                {gate1 ? "✅ Todos os conceitos lidos!" : `Marque todos como lido (${Math.round((conceptsDone / totalConcepts) * 100)}%)`}
              </p>
            </div>

            <div style={{ display: "grid", gap: "0.75rem" }}>
              {conceitos.map((c) => (
                <label
                  key={c.id}
                  htmlFor={`c2-${c.id}`}
                  style={{
                    display: "flex", gap: "0.9rem", alignItems: "flex-start",
                    padding: "1rem 1.1rem", borderRadius: "10px",
                    background: concepts[c.id] ? "rgba(255,85,0,0.06)" : "var(--dark-3)",
                    border: `1px solid ${concepts[c.id] ? "rgba(255,85,0,0.25)" : "rgba(255,255,255,0.04)"}`,
                    cursor: "pointer", transition: "all 0.2s",
                  }}
                >
                  <input
                    id={`c2-${c.id}`}
                    type="checkbox"
                    className="concept-checkbox"
                    checked={!!concepts[c.id]}
                    onChange={() => toggleConcept(c.id)}
                    style={{ marginTop: "0.15rem" }}
                  />
                  <div style={{ flex: 1 }}>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)", fontSize: "0.85rem", fontWeight: 700,
                        display: "block", marginBottom: "0.35rem",
                        color: concepts[c.id] ? "#FF9966" : "#FF7744",
                        textDecoration: concepts[c.id] ? "line-through" : "none",
                        opacity: concepts[c.id] ? 0.7 : 1,
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
          </section>

          {/* ── ETAPA 2: ARQUITETURA ──────────────────────────── */}
          <section
            style={{
              background: "var(--dark-2)",
              borderRadius: "16px",
              padding: "1.75rem",
              marginBottom: "2rem",
              border: gate2 ? "1px solid rgba(74,222,128,0.15)" : "1px solid rgba(255,255,255,0.05)",
              transition: "border-color 0.3s",
            }}
          >
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", letterSpacing: "0.04em", marginBottom: "1.25rem" }}>
              🏗️ ETAPA 2 — ARQUITETURA DO PROJETO
            </h2>

            <div
              style={{
                display: "flex", alignItems: "center", gap: "0.5rem",
                marginBottom: "1.25rem", flexWrap: "wrap",
                fontFamily: "var(--font-mono)", fontSize: "0.78rem",
              }}
            >
              {["Formulário", "handleSubmit", "cadastrarUsuario()", "Firestore", "/perfil/[id]"].map((item, i, arr) => (
                <span key={item} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span
                    style={{
                      padding: "0.3rem 0.7rem", borderRadius: "6px",
                      background: "rgba(255,85,0,0.1)", border: "1px solid rgba(255,85,0,0.2)",
                      color: "#FF7744",
                    }}
                  >
                    {item}
                  </span>
                  {i < arr.length - 1 && <span style={{ color: "var(--text-muted)" }}>→</span>}
                </span>
              ))}
            </div>

            <div style={{ display: "grid", gap: "0.65rem", marginBottom: "1.5rem" }}>
              {arquitetura.map((a) => (
                <div
                  key={a.arquivo}
                  style={{
                    display: "flex", alignItems: "center", gap: "1rem",
                    padding: "0.75rem 1rem", borderRadius: "8px",
                    background: "var(--dark-3)", border: "1px solid rgba(255,255,255,0.04)",
                    flexWrap: "wrap",
                  }}
                >
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: a.cor, minWidth: "140px" }}>
                    {a.camada}
                  </span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "var(--text-primary)", minWidth: "160px" }}>
                    {a.arquivo}
                  </span>
                  <span style={{ color: "var(--text-muted)", fontSize: "0.82rem" }}>{a.desc}</span>
                </div>
              ))}
            </div>

            {/* GATE 2 CHECKBOX */}
            <label
              htmlFor="arch-read"
              style={{
                display: "flex", alignItems: "center", gap: "0.9rem",
                padding: "0.9rem 1rem", borderRadius: "10px",
                background: gate2 ? "rgba(74,222,128,0.06)" : "rgba(255,85,0,0.04)",
                border: `1px solid ${gate2 ? "rgba(74,222,128,0.25)" : "rgba(255,85,0,0.15)"}`,
                cursor: "pointer", transition: "all 0.2s",
              }}
            >
              <input
                id="arch-read"
                type="checkbox"
                className="concept-checkbox"
                checked={archRead}
                onChange={() => setArchRead((v) => !v)}
              />
              <span
                style={{
                  fontFamily: "var(--font-mono)", fontSize: "0.85rem", fontWeight: 700,
                  color: gate2 ? "#4ade80" : "var(--fire-orange)",
                  textDecoration: gate2 ? "line-through" : "none",
                  opacity: gate2 ? 0.8 : 1,
                }}
              >
                Li e entendi a arquitetura em camadas ✓
              </span>
            </label>
          </section>

          {/* ── ETAPA 3: TESTAR O FORMULÁRIO ─────────────────── */}
          <section
            style={{
              background: "var(--dark-2)",
              borderRadius: "16px",
              padding: "2rem",
              marginBottom: "2rem",
              border: gate3 ? "1px solid rgba(74,222,128,0.15)" : "1px solid rgba(255,255,255,0.06)",
              transition: "border-color 0.3s",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem", flexWrap: "wrap" }}>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", letterSpacing: "0.04em" }}>
                📝 ETAPA 3 — TESTAR O FORMULÁRIO
              </h2>
              {gate3 && (
                <span
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "0.3rem",
                    padding: "0.25rem 0.65rem", borderRadius: "99px",
                    background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.3)",
                    fontSize: "0.72rem", fontFamily: "var(--font-mono)", fontWeight: 700, color: "#4ade80",
                  }}
                >
                  ✓ Testado!
                </span>
              )}
            </div>
            <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", lineHeight: 1.7, marginBottom: "1.5rem" }}>
              Preencha os campos abaixo e clique em Testar Cadastro — o formulário vai gravar no Firestore e liberar o passo a passo.
            </p>

            {formStatus === "success" ? (
              <div>
                <div className="success-box" style={{ borderRadius: "0 10px 10px 0", marginBottom: "1.25rem" }}>
                  <p style={{ color: "#4ade80", fontWeight: 700, marginBottom: "0.4rem" }}>✅ Cadastro realizado com sucesso!</p>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.83rem", marginBottom: "0.6rem" }}>
                    Documento salvo no Firestore → coleção{" "}
                    <code style={{ fontFamily: "var(--font-mono)", color: "#aaa" }}>usuarios</code>
                  </p>
                  <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.78rem", color: "#FF7744", wordBreak: "break-all" }}>
                    🔑 ID: {docId}
                  </p>
                </div>
                <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                  <Link
                    href={`/perfil/${docId}`}
                    style={{
                      padding: "0.65rem 1.25rem", borderRadius: "8px",
                      background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.25)",
                      color: "#4ade80", textDecoration: "none",
                      fontSize: "0.85rem", fontWeight: 700,
                    }}
                  >
                    👤 Ver perfil →
                  </Link>
                  <button
                    onClick={() => { setFormStatus("idle"); setForm({ nome: "", email: "", telefone: "" }); }}
                    style={{
                      padding: "0.65rem 1.25rem", borderRadius: "8px",
                      background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                      color: "var(--text-muted)", cursor: "pointer",
                      fontSize: "0.85rem", fontWeight: 600, fontFamily: "inherit",
                    }}
                  >
                    Testar novamente
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                {[
                  { id: "nome", label: "Nome completo *", type: "text", placeholder: "Ex: João Silva" },
                  { id: "email", label: "E-mail *", type: "email", placeholder: "joao@email.com" },
                  { id: "telefone", label: "Telefone *", type: "tel", placeholder: "(11) 99999-9999" },
                ].map((field) => (
                  <div key={field.id}>
                    <label
                      htmlFor={field.id}
                      style={{
                        display: "block", fontSize: "0.82rem",
                        color: "rgba(255,255,255,0.5)", marginBottom: "0.5rem",
                        fontFamily: "var(--font-mono)", letterSpacing: "0.05em", textTransform: "uppercase",
                      }}
                    >
                      {field.label}
                    </label>
                    <input
                      id={field.id} name={field.id} type={field.type}
                      placeholder={field.placeholder}
                      value={form[field.id as keyof UserFormData]}
                      onChange={handleChange}
                      className="input-field" required
                      disabled={formStatus === "loading"}
                    />
                  </div>
                ))}

                {formStatus === "error" && (
                  <div
                    style={{
                      background: "rgba(239,68,68,0.08)",
                      borderLeft: "3px solid rgba(239,68,68,0.5)",
                      borderRadius: "0 8px 8px 0",
                      padding: "0.9rem 1rem", color: "#f87171", fontSize: "0.85rem",
                    }}
                  >
                    ❌ {errorMsg}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={formStatus === "loading"}
                  className="fire-btn"
                  style={{
                    padding: "0.9rem 2rem", borderRadius: "10px",
                    color: "#fff", fontWeight: 700, fontSize: "0.95rem",
                    fontFamily: "inherit",
                    opacity: formStatus === "loading" ? 0.7 : 1,
                    cursor: formStatus === "loading" ? "not-allowed" : "pointer",
                    alignSelf: "flex-start",
                  }}
                >
                  {formStatus === "loading" ? "⏳ Cadastrando…" : "🚀 Testar Cadastro"}
                </button>
              </form>
            )}
          </section>

          {/* ── CELEBRAÇÃO ALL GATES ──────────────────────────── */}
          {allDone && (
            <div
              className="celebrate-banner"
              style={{
                marginBottom: "2.5rem",
                borderRadius: "16px",
                padding: "2rem 2rem 2.25rem",
                background: "linear-gradient(135deg, rgba(255,85,0,0.12), rgba(255,184,0,0.07), rgba(204,34,0,0.08))",
                border: "1px solid rgba(255,85,0,0.4)",
                textAlign: "center",
                boxShadow: "0 0 60px rgba(255,85,0,0.18), 0 0 120px rgba(255,85,0,0.06)",
              }}
            >
              <div style={{ fontSize: "3.5rem", marginBottom: "0.9rem", lineHeight: 1, letterSpacing: "-0.05em" }}>
                <span className="flame-icon">🔥</span>
                <span className="flame-icon" style={{ animationDelay: "0.1s" }}>🔥</span>
                <span className="flame-icon" style={{ animationDelay: "0.2s" }}>🔥</span>
                <span className="flame-icon" style={{ animationDelay: "0.3s" }}>🔥</span>
                <span className="flame-icon" style={{ animationDelay: "0.4s" }}>🔥</span>
              </div>
              <h3
                className="fire-text"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.4rem, 4vw, 2.2rem)",
                  letterSpacing: "0.04em",
                  marginBottom: "0.6rem",
                  lineHeight: 1.1,
                }}
              >
                AGORA VOCÊ PODE REALIZAR
                <br />
                SUA ATIVIDADE PRÁTICA!
              </h3>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.9rem", marginTop: "0.25rem" }}>
                Conceitos dominados, arquitetura entendida, Firebase testado 🚀
                <br />
                O passo a passo está desbloqueado abaixo.
              </p>
            </div>
          )}

          {/* ── PASSO A PASSO ─────────────────────────────────── */}
          <div ref={stepsRef}>
            <section style={{ marginBottom: "2.5rem", position: "relative" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.75rem", flexWrap: "wrap", gap: "0.75rem" }}>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", letterSpacing: "0.04em" }}>
                  PASSO A PASSO
                </h2>
                {!allDone && (
                  <span
                    style={{
                      display: "flex", alignItems: "center", gap: "0.4rem",
                      padding: "0.35rem 0.85rem", borderRadius: "8px",
                      background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                      fontSize: "0.78rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)",
                    }}
                  >
                    🔒 Complete as {3 - gatesDone} etapa{3 - gatesDone !== 1 ? "s" : ""} restante{3 - gatesDone !== 1 ? "s" : ""} para desbloquear
                  </span>
                )}
              </div>

              {/* OVERLAY */}
              {!allDone && (
                <div
                  onClick={handleLockedClick}
                  style={{
                    position: "absolute", inset: "3rem 0 0 0", zIndex: 10,
                    borderRadius: "14px", cursor: "pointer",
                    background: "linear-gradient(to bottom, rgba(8,8,8,0) 0%, rgba(8,8,8,0.97) 30%)",
                    display: "flex", flexDirection: "column",
                    alignItems: "center", justifyContent: "center",
                    gap: "0.75rem", paddingTop: "6rem",
                  }}
                >
                  <div
                    className={lockShake ? "lock-shake" : ""}
                    style={{
                      width: "60px", height: "60px", borderRadius: "50%",
                      background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
                      display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.6rem",
                    }}
                  >
                    🔒
                  </div>
                  <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.85rem", textAlign: "center" }}>
                    Complete as etapas acima para desbloquear
                  </p>
                  <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", justifyContent: "center" }}>
                    {!gate1 && (
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", padding: "0.2rem 0.5rem", borderRadius: "4px", background: "rgba(255,85,0,0.08)", border: "1px solid rgba(255,85,0,0.2)", color: "rgba(255,119,68,0.6)" }}>
                        conceitos ({conceptsDone}/{totalConcepts})
                      </span>
                    )}
                    {!gate2 && (
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", padding: "0.2rem 0.5rem", borderRadius: "4px", background: "rgba(255,85,0,0.08)", border: "1px solid rgba(255,85,0,0.2)", color: "rgba(255,119,68,0.6)" }}>
                        arquitetura
                      </span>
                    )}
                    {!gate3 && (
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", padding: "0.2rem 0.5rem", borderRadius: "4px", background: "rgba(255,85,0,0.08)", border: "1px solid rgba(255,85,0,0.2)", color: "rgba(255,119,68,0.6)" }}>
                        formulário testado
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* STEPS CONTENT */}
              <div
                className={allDone ? "steps-unlock" : ""}
                style={{
                  display: "flex", flexDirection: "column", gap: "1.25rem",
                  filter: allDone ? "none" : "blur(3px)",
                  pointerEvents: allDone ? "auto" : "none",
                  userSelect: allDone ? "auto" : "none",
                  transition: "filter 0.4s ease",
                }}
              >
                {/* Step 01 */}
                <div className="card" style={{ borderRadius: "14px", padding: "1.5rem" }}>
                  <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                    <div className="step-dot"><span style={{ fontFamily: "var(--font-mono)" }}>01</span></div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.15rem", letterSpacing: "0.04em", marginBottom: "0.6rem" }}>
                        Criar src/types/user.ts
                      </h3>
                      <p style={{ color: "var(--text-muted)", fontSize: "0.87rem", lineHeight: 1.7, marginBottom: "1rem" }}>
                        Define o contrato TypeScript. O TypeScript vai alertar se algum campo obrigatório estiver faltando.
                      </p>
                      <CodeBlock
                        filename="src/types/user.ts"
                        code={`export interface User {
  id?: string;        // gerado automaticamente pelo Firestore
  nome: string;
  email: string;
  telefone: string;
  createdAt?: Date;
}

// Tipo para o formulário: sem id e sem createdAt
export type UserFormData = Omit<User, "id" | "createdAt">;`}
                      />
                    </div>
                  </div>
                </div>

                {/* Step 02 */}
                <div className="card" style={{ borderRadius: "14px", padding: "1.5rem" }}>
                  <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                    <div className="step-dot"><span style={{ fontFamily: "var(--font-mono)" }}>02</span></div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.15rem", letterSpacing: "0.04em", marginBottom: "0.6rem" }}>
                        Criar src/services/userService.ts
                      </h3>
                      <p style={{ color: "var(--text-muted)", fontSize: "0.87rem", lineHeight: 1.7, marginBottom: "1rem" }}>
                        Funções de banco isoladas. A tela nunca acessa o Firestore diretamente — sempre passa pelo service.
                      </p>
                      <CodeBlock
                        filename="src/services/userService.ts"
                        code={`import { collection, addDoc, getDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import { UserFormData, User } from "@/types/user";

const COLLECTION = "usuarios";

export async function cadastrarUsuario(dados: UserFormData): Promise<string> {
  const docRef = await addDoc(collection(db, COLLECTION), {
    ...dados,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function buscarUsuario(id: string): Promise<User | null> {
  const snap = await getDoc(doc(db, COLLECTION, id));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() } as User;
}`}
                      />
                    </div>
                  </div>
                </div>

                {/* Step 03 */}
                <div className="card" style={{ borderRadius: "14px", padding: "1.5rem" }}>
                  <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                    <div className="step-dot"><span style={{ fontFamily: "var(--font-mono)" }}>03</span></div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.15rem", letterSpacing: "0.04em", marginBottom: "0.6rem" }}>
                        Criar a página do formulário
                      </h3>
                      <p style={{ color: "var(--text-muted)", fontSize: "0.87rem", lineHeight: 1.7, marginBottom: "1rem" }}>
                        A tela com o formulário de cadastro. Precisa de{" "}
                        <code style={{ fontFamily: "var(--font-mono)", color: "#FF7744" }}>"use client"</code>{" "}
                        porque usa <code style={{ fontFamily: "var(--font-mono)", color: "#FF7744" }}>useState</code> e eventos de clique.
                      </p>
                      <CodeBlock
                        filename="src/app/atividade-2/page.tsx"
                        code={`"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { cadastrarUsuario } from "@/services/userService";
import { UserFormData } from "@/types/user";

export default function Atividade2Page() {
  const router = useRouter();
  const [form, setForm] = useState<UserFormData>({ nome: "", email: "", telefone: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [erro, setErro] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.nome || !form.email || !form.telefone) {
      setErro("Preencha todos os campos.");
      setStatus("error");
      return;
    }
    setStatus("loading");
    try {
      const id = await cadastrarUsuario(form);
      router.push(\`/perfil/\${id}\`);
    } catch (err) {
      setErro(err instanceof Error ? err.message : "Erro ao cadastrar.");
      setStatus("error");
    }
  }

  return (
    <main style={{ padding: "2rem", maxWidth: "480px", margin: "0 auto" }}>
      <h1>Cadastro de Usuário</h1>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <input name="nome" placeholder="Nome completo" value={form.nome} onChange={handleChange} required />
        <input name="email" type="email" placeholder="E-mail" value={form.email} onChange={handleChange} required />
        <input name="telefone" type="tel" placeholder="Telefone" value={form.telefone} onChange={handleChange} required />
        {status === "error" && <p style={{ color: "red" }}>{erro}</p>}
        <button type="submit" disabled={status === "loading"}>
          {status === "loading" ? "Cadastrando..." : "Cadastrar"}
        </button>
      </form>
    </main>
  );
}`}
                      />
                      <div className="tip-box" style={{ marginTop: "1rem" }}>
                        <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.83rem", lineHeight: 1.6 }}>
                          💡 Código essencial sem estilos — use como base e personalize com Tailwind ou CSS inline.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 04 */}
                <div className="card" style={{ borderRadius: "14px", padding: "1.5rem" }}>
                  <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                    <div className="step-dot"><span style={{ fontFamily: "var(--font-mono)" }}>04</span></div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.15rem", letterSpacing: "0.04em", marginBottom: "0.6rem" }}>
                        Criar a página de perfil
                      </h3>
                      <p style={{ color: "var(--text-muted)", fontSize: "0.87rem", lineHeight: 1.7, marginBottom: "1rem" }}>
                        Rota dinâmica <code style={{ fontFamily: "var(--font-mono)", color: "#FF7744" }}>perfil/[id]</code> que busca e exibe os dados do usuário cadastrado.
                      </p>
                      <CodeBlock
                        filename="src/app/perfil/[id]/page.tsx"
                        code={`import { buscarUsuario } from "@/services/userService";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function PerfilPage({ params }: Props) {
  const { id } = await params;
  const usuario = await buscarUsuario(id);

  if (!usuario) notFound();

  return (
    <main style={{ padding: "2rem" }}>
      <h1>✅ Cadastro realizado!</h1>
      <p><strong>ID Firestore:</strong> {id}</p>
      <p><strong>Nome:</strong> {usuario.nome}</p>
      <p><strong>E-mail:</strong> {usuario.email}</p>
      <p><strong>Telefone:</strong> {usuario.telefone}</p>
    </main>
  );
}`}
                      />
                      <div className="tip-box" style={{ marginTop: "1rem" }}>
                        <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.83rem", lineHeight: 1.6 }}>
                          💡 Server Component — sem <code style={{ fontFamily: "var(--font-mono)" }}>"use client"</code>. O Next.js busca os dados no servidor antes de renderizar a página.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* ROTEIRO DE AULA */}
          {allDone && (
            <section
              style={{
                background: "linear-gradient(135deg, rgba(255,85,0,0.06), rgba(204,34,0,0.03))",
                border: "1px solid rgba(255,85,0,0.2)",
                borderRadius: "16px",
                padding: "2rem",
                marginBottom: "2rem",
              }}
            >
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", letterSpacing: "0.04em", marginBottom: "1.5rem" }}>
                🎯 ROTEIRO DE AULA — ATIVIDADE 2
              </h2>

              {[
                {
                  titulo: "Objetivo", icone: "🎯",
                  items: [
                    "Criar um formulário de cadastro com Next.js e TypeScript",
                    "Organizar o código em camadas: types, services, lib e app",
                    "Salvar dados no Firestore usando a camada de services",
                    "Redirecionar para a página de perfil após o cadastro",
                  ],
                },
                {
                  titulo: "Pré-requisitos", icone: "📋",
                  items: [
                    "Atividade 1 concluída (Firebase configurado e .env.local criado)",
                    "Página /hello-firebase testada e funcionando",
                    "Entendimento básico de React (useState, formulários)",
                  ],
                },
                {
                  titulo: "Critérios de Avaliação", icone: "✅",
                  items: [
                    "Projeto executa sem erro (npm run dev)",
                    "Cadastro salva corretamente no Firestore",
                    "Redirecionamento para /perfil/[id] funciona",
                    "Código organizado em app, services, lib e types",
                    "Aluno consegue explicar o fluxo: formulário → service → Firestore",
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
                        <span style={{ color: "var(--fire-orange)", marginTop: "0.15rem", flexShrink: 0 }}>▸</span>
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
              href="/modulos/backend/atividade-1"
              style={{
                flex: 1, minWidth: "200px", padding: "0.9rem", textAlign: "center",
                borderRadius: "12px", background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.07)", color: "var(--text-muted)",
                textDecoration: "none", fontSize: "0.87rem", fontWeight: 600,
              }}
            >
              ← Atividade 1
            </Link>
            <Link
              href="/modulos/backend/hello-firebase"
              style={{
                flex: 1, minWidth: "200px", padding: "0.9rem", textAlign: "center",
                borderRadius: "12px", background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.07)", color: "var(--text-muted)",
                textDecoration: "none", fontSize: "0.87rem", fontWeight: 600,
              }}
            >
              ⚗️ Testar Firebase
            </Link>
          </div>

        </div>
      </main>
    </>
  );
}
