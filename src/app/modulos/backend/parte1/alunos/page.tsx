"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { cadastrarAluno, listarAlunos } from "@/services/alunoService";
import { Aluno, AlunoFormData } from "@/types/escola";

const VAZIO: AlunoFormData = { nome: "", email: "", telefone: "", cpf: "" };

const labelStyle: React.CSSProperties = {
  display: "block", fontSize: "0.78rem", color: "rgba(255,255,255,0.45)",
  marginBottom: "0.45rem", fontFamily: "var(--font-mono)",
  letterSpacing: "0.05em", textTransform: "uppercase",
};

export default function AlunosPage() {
  const [form, setForm] = useState<AlunoFormData>(VAZIO);
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [salvando, setSalvando] = useState(false);
  const [carregando, setCarregando] = useState(true);
  const [sucesso, setSucesso] = useState(false);
  const [erro, setErro] = useState("");

  useEffect(() => { carregar(); }, []);

  async function carregar() {
    setCarregando(true);
    try { setAlunos(await listarAlunos()); } catch { /* sem conexão */ }
    finally { setCarregando(false); }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSalvando(true);
    setErro("");
    try {
      await cadastrarAluno(form);
      setForm(VAZIO);
      setSucesso(true);
      setTimeout(() => setSucesso(false), 4000);
      carregar();
    } catch {
      setErro("Erro ao cadastrar. Verifique a conexão com o Firebase.");
    } finally {
      setSalvando(false);
    }
  }

  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", background: "var(--dark-1)", padding: "2rem 1.5rem" }}>
        <div style={{ maxWidth: "780px", margin: "0 auto" }}>

          <Link href="/modulos/backend/parte1" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", color: "var(--text-muted)", textDecoration: "none", fontSize: "0.85rem", marginBottom: "2rem" }}>
            ← Sistema Acadêmico
          </Link>

          <div style={{ marginBottom: "2rem" }}>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1rem" }}>
              <span className="badge badge-fire">🔥 Parte 1</span>
              <span className="badge badge-blue">Alunos</span>
            </div>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 5vw, 3rem)", letterSpacing: "0.04em", lineHeight: 1.05, marginBottom: "0.75rem" }}>
              <span className="fire-text">CADASTRO DE</span>
              <br />ALUNOS
            </h1>
            <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: 1.7 }}>
              Registre novos alunos com suas informações básicas. Os dados são salvos
              na coleção <code style={{ fontFamily: "var(--font-mono)", color: "#FF7744" }}>alunos</code> do Firestore.
            </p>
          </div>

          {/* FORMULÁRIO */}
          <div className="card" style={{ borderRadius: "16px", padding: "2rem", marginBottom: "2.5rem" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", letterSpacing: "0.04em", marginBottom: "1.5rem" }}>
              NOVO ALUNO
            </h2>

            {sucesso && (
              <div className="success-box" style={{ borderRadius: "0 10px 10px 0", marginBottom: "1.25rem" }}>
                <p style={{ color: "#4ade80", fontWeight: 700, fontSize: "0.9rem" }}>
                  ✅ Aluno cadastrado com sucesso!
                </p>
              </div>
            )}
            {erro && (
              <div style={{ background: "rgba(239,68,68,0.08)", borderLeft: "3px solid rgba(239,68,68,0.5)", borderRadius: "0 8px 8px 0", padding: "0.9rem 1rem", color: "#f87171", fontSize: "0.85rem", marginBottom: "1.25rem" }}>
                ❌ {erro}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
                <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                  <div style={{ flex: "1 1 220px" }}>
                    <label style={labelStyle}>Nome completo *</label>
                    <input className="input-field" name="nome" placeholder="Ex: João Silva" value={form.nome} onChange={handleChange} required disabled={salvando} />
                  </div>
                  <div style={{ flex: "1 1 220px" }}>
                    <label style={labelStyle}>E-mail *</label>
                    <input className="input-field" name="email" type="email" placeholder="joao@email.com" value={form.email} onChange={handleChange} required disabled={salvando} />
                  </div>
                </div>
                <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                  <div style={{ flex: "1 1 180px" }}>
                    <label style={labelStyle}>Telefone *</label>
                    <input className="input-field" name="telefone" type="tel" placeholder="(11) 99999-9999" value={form.telefone} onChange={handleChange} required disabled={salvando} />
                  </div>
                  <div style={{ flex: "1 1 180px" }}>
                    <label style={labelStyle}>CPF</label>
                    <input className="input-field" name="cpf" placeholder="000.000.000-00" value={form.cpf || ""} onChange={handleChange} disabled={salvando} />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={salvando}
                  className="fire-btn"
                  style={{
                    padding: "0.85rem 2rem", borderRadius: "10px", color: "#fff",
                    fontWeight: 700, fontSize: "0.9rem", fontFamily: "inherit",
                    alignSelf: "flex-start", cursor: salvando ? "not-allowed" : "pointer",
                    opacity: salvando ? 0.7 : 1,
                  }}
                >
                  {salvando ? "⏳ Cadastrando..." : "👤 Cadastrar Aluno"}
                </button>
              </div>
            </form>
          </div>

          {/* LISTA */}
          <section>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", letterSpacing: "0.04em" }}>
                ALUNOS CADASTRADOS
              </h2>
              {!carregando && (
                <span
                  style={{
                    fontFamily: "var(--font-mono)", fontSize: "0.75rem", fontWeight: 700,
                    padding: "0.2rem 0.6rem", borderRadius: "99px",
                    background: "rgba(96,165,250,0.1)", border: "1px solid rgba(96,165,250,0.25)",
                    color: "#60a5fa",
                  }}
                >
                  {alunos.length}
                </span>
              )}
            </div>

            {carregando ? (
              <div style={{ padding: "2rem", textAlign: "center", color: "var(--text-muted)", fontFamily: "var(--font-mono)", fontSize: "0.85rem" }}>
                Carregando...
              </div>
            ) : alunos.length === 0 ? (
              <div style={{ padding: "2.5rem", textAlign: "center", background: "var(--dark-2)", borderRadius: "14px", border: "1px solid rgba(255,255,255,0.05)" }}>
                <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>👤</div>
                <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Nenhum aluno cadastrado ainda.</p>
                <p style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.8rem", marginTop: "0.35rem" }}>Use o formulário acima para adicionar o primeiro.</p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {alunos.map(aluno => (
                  <div key={aluno.id} className="card" style={{ borderRadius: "12px", padding: "1.25rem" }}>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
                      <div
                        style={{
                          width: "2.5rem", height: "2.5rem", borderRadius: "50%", flexShrink: 0,
                          background: "linear-gradient(135deg, #60a5fa22, #3b82f611)",
                          border: "1px solid rgba(96,165,250,0.2)",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontFamily: "var(--font-display)", fontSize: "1.1rem", color: "#60a5fa",
                        }}
                      >
                        {aluno.nome.charAt(0).toUpperCase()}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontWeight: 700, marginBottom: "0.25rem", color: "var(--text-primary)" }}>{aluno.nome}</div>
                        <div style={{ color: "var(--text-muted)", fontSize: "0.83rem" }}>
                          {aluno.email}
                          <span style={{ margin: "0 0.4rem", opacity: 0.4 }}>·</span>
                          {aluno.telefone}
                        </div>
                        {aluno.cpf && (
                          <div style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.78rem", marginTop: "0.2rem", fontFamily: "var(--font-mono)" }}>
                            CPF: {aluno.cpf}
                          </div>
                        )}
                      </div>
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "rgba(255,119,68,0.4)", flexShrink: 0 }}>
                        {aluno.id?.slice(0, 8)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginTop: "2.5rem" }}>
            <Link href="/modulos/backend/parte1/cursos" className="fire-btn" style={{ flex: 1, minWidth: "200px", padding: "0.9rem", textAlign: "center", borderRadius: "12px", color: "#fff", textDecoration: "none", fontSize: "0.87rem", fontWeight: 700 }}>
              Próximo: Cursos →
            </Link>
            <Link href="/modulos/backend/parte1" style={{ flex: 1, minWidth: "180px", padding: "0.9rem", textAlign: "center", borderRadius: "12px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", color: "var(--text-muted)", textDecoration: "none", fontSize: "0.87rem", fontWeight: 600 }}>
              ← Sistema
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
