"use client";

import { useState, useEffect, useMemo } from "react";
import ActivityGate from "@/components/ActivityGate";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import {
  cadastrarAluno,
  listarAlunos,
  atualizarAluno,
  excluirAluno,
} from "@/services/alunoService";
import { Aluno, AlunoFormData } from "@/types/escola";

const VAZIO: AlunoFormData = { nome: "", email: "", telefone: "", cpf: "" };

const labelStyle: React.CSSProperties = {
  display: "block", fontSize: "0.78rem", color: "rgba(255,255,255,0.45)",
  marginBottom: "0.45rem", fontFamily: "var(--font-mono)",
  letterSpacing: "0.05em", textTransform: "uppercase",
};

function Parte2AlunosPageInner() {
  const [form, setForm] = useState<AlunoFormData>(VAZIO);
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [editando, setEditando] = useState<Aluno | null>(null);
  const [editForm, setEditForm] = useState<AlunoFormData>(VAZIO);
  const [busca, setBusca] = useState("");
  const [salvando, setSalvando] = useState(false);
  const [salvandoEdit, setSalvandoEdit] = useState(false);
  const [carregando, setCarregando] = useState(true);
  const [sucesso, setSucesso] = useState(false);
  const [erro, setErro] = useState("");
  const [excluindo, setExcluindo] = useState<string | null>(null);

  useEffect(() => { carregar(); }, []);

  async function carregar() {
    setCarregando(true);
    try { setAlunos(await listarAlunos()); } catch { /* offline */ }
    finally { setCarregando(false); }
  }

  const alunosFiltrados = useMemo(() => {
    if (!busca.trim()) return alunos;
    const lower = busca.toLowerCase();
    return alunos.filter(
      a => a.nome.toLowerCase().includes(lower) || a.email.toLowerCase().includes(lower)
    );
  }, [alunos, busca]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleEditChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEditForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
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

  function iniciarEdicao(aluno: Aluno) {
    setEditando(aluno);
    setEditForm({ nome: aluno.nome, email: aluno.email, telefone: aluno.telefone, cpf: aluno.cpf ?? "" });
  }

  async function salvarEdicao(e: React.FormEvent) {
    e.preventDefault();
    if (!editando?.id) return;
    setSalvandoEdit(true);
    try {
      await atualizarAluno(editando.id, editForm);
      setEditando(null);
      carregar();
    } catch {
      setErro("Erro ao atualizar.");
    } finally {
      setSalvandoEdit(false);
    }
  }

  async function handleExcluir(aluno: Aluno) {
    if (!aluno.id) return;
    if (!confirm(`Excluir "${aluno.nome}"? Esta ação não pode ser desfeita.`)) return;
    setExcluindo(aluno.id);
    try {
      await excluirAluno(aluno.id);
      carregar();
    } catch {
      setErro("Erro ao excluir.");
    } finally {
      setExcluindo(null);
    }
  }

  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", background: "var(--dark-1)", padding: "2rem 1.5rem" }}>
        <div style={{ maxWidth: "820px", margin: "0 auto" }}>

          <Link href="/modulos/backend/parte2" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", color: "var(--text-muted)", textDecoration: "none", fontSize: "0.85rem", marginBottom: "2rem" }}>
            ← Sistema Acadêmico
          </Link>

          <div style={{ marginBottom: "2rem" }}>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1rem" }}>
              <span className="badge badge-fire">🔥 Atividade Final</span>
              <span className="badge badge-blue">Alunos · CRUD</span>
            </div>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 5vw, 3rem)", letterSpacing: "0.04em", lineHeight: 1.05, marginBottom: "0.75rem" }}>
              <span className="fire-text">GESTÃO DE</span>
              <br />ALUNOS
            </h1>
            <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: 1.7 }}>
              CRUD completo: cadastre, busque, edite e exclua alunos.
              Todos os dados salvos na coleção{" "}
              <code style={{ fontFamily: "var(--font-mono)", color: "#FF7744" }}>alunos</code> do Firestore.
            </p>
          </div>

          {/* FORMULÁRIO NOVO ALUNO */}
          <div className="card" style={{ borderRadius: "16px", padding: "2rem", marginBottom: "2.5rem" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", letterSpacing: "0.04em", marginBottom: "1.5rem" }}>
              NOVO ALUNO
            </h2>

            {sucesso && (
              <div className="success-box" style={{ borderRadius: "0 10px 10px 0", marginBottom: "1.25rem" }}>
                <p style={{ color: "#4ade80", fontWeight: 700, fontSize: "0.9rem" }}>✅ Aluno cadastrado com sucesso!</p>
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
                  style={{ padding: "0.85rem 2rem", borderRadius: "10px", color: "#fff", fontWeight: 700, fontSize: "0.9rem", fontFamily: "inherit", alignSelf: "flex-start", cursor: salvando ? "not-allowed" : "pointer", opacity: salvando ? 0.7 : 1 }}
                >
                  {salvando ? "⏳ Cadastrando..." : "👤 Cadastrar Aluno"}
                </button>
              </div>
            </form>
          </div>

          {/* BUSCA + LISTA */}
          <section>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.25rem", flexWrap: "wrap" }}>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", letterSpacing: "0.04em" }}>
                ALUNOS CADASTRADOS
              </h2>
              {!carregando && (
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", fontWeight: 700, padding: "0.2rem 0.6rem", borderRadius: "99px", background: "rgba(96,165,250,0.1)", border: "1px solid rgba(96,165,250,0.25)", color: "#60a5fa" }}>
                  {alunosFiltrados.length}{busca ? " filtrado(s)" : ""}
                </span>
              )}
            </div>

            {/* Busca */}
            <div style={{ marginBottom: "1.25rem" }}>
              <input
                className="input-field"
                type="text"
                placeholder="🔍  Buscar por nome ou e-mail..."
                value={busca}
                onChange={e => setBusca(e.target.value)}
                style={{ width: "100%", maxWidth: "420px" }}
              />
            </div>

            {carregando ? (
              <div style={{ padding: "2rem", textAlign: "center", color: "var(--text-muted)", fontFamily: "var(--font-mono)", fontSize: "0.85rem" }}>Carregando...</div>
            ) : alunosFiltrados.length === 0 ? (
              <div style={{ padding: "2.5rem", textAlign: "center", background: "var(--dark-2)", borderRadius: "14px", border: "1px solid rgba(255,255,255,0.05)" }}>
                <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>👤</div>
                <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
                  {busca ? `Nenhum aluno encontrado para "${busca}"` : "Nenhum aluno cadastrado ainda."}
                </p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {alunosFiltrados.map(aluno => (
                  <div key={aluno.id}>
                    {editando?.id === aluno.id ? (
                      /* MODO EDIÇÃO */
                      <div className="card" style={{ borderRadius: "12px", padding: "1.5rem", border: "1px solid rgba(255,85,0,0.25)" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.25rem" }}>
                          <span style={{ fontFamily: "var(--font-display)", fontSize: "0.9rem", letterSpacing: "0.04em", color: "#FF7744" }}>
                            ✏️ EDITANDO: {aluno.nome}
                          </span>
                        </div>
                        <form onSubmit={salvarEdicao}>
                          <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
                            <div style={{ display: "flex", gap: "0.9rem", flexWrap: "wrap" }}>
                              <div style={{ flex: "1 1 180px" }}>
                                <label style={labelStyle}>Nome *</label>
                                <input className="input-field" name="nome" value={editForm.nome} onChange={handleEditChange} required disabled={salvandoEdit} />
                              </div>
                              <div style={{ flex: "1 1 180px" }}>
                                <label style={labelStyle}>E-mail *</label>
                                <input className="input-field" name="email" type="email" value={editForm.email} onChange={handleEditChange} required disabled={salvandoEdit} />
                              </div>
                            </div>
                            <div style={{ display: "flex", gap: "0.9rem", flexWrap: "wrap" }}>
                              <div style={{ flex: "1 1 140px" }}>
                                <label style={labelStyle}>Telefone *</label>
                                <input className="input-field" name="telefone" value={editForm.telefone} onChange={handleEditChange} required disabled={salvandoEdit} />
                              </div>
                              <div style={{ flex: "1 1 140px" }}>
                                <label style={labelStyle}>CPF</label>
                                <input className="input-field" name="cpf" value={editForm.cpf || ""} onChange={handleEditChange} disabled={salvandoEdit} />
                              </div>
                            </div>
                            <div style={{ display: "flex", gap: "0.75rem" }}>
                              <button
                                type="submit"
                                disabled={salvandoEdit}
                                className="fire-btn"
                                style={{ padding: "0.65rem 1.4rem", borderRadius: "8px", color: "#fff", fontWeight: 700, fontSize: "0.85rem", fontFamily: "inherit", cursor: salvandoEdit ? "not-allowed" : "pointer", opacity: salvandoEdit ? 0.7 : 1 }}
                              >
                                {salvandoEdit ? "⏳ Salvando..." : "✅ Salvar"}
                              </button>
                              <button
                                type="button"
                                onClick={() => setEditando(null)}
                                style={{ padding: "0.65rem 1.1rem", borderRadius: "8px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "var(--text-muted)", fontSize: "0.85rem", fontFamily: "inherit", cursor: "pointer" }}
                              >
                                Cancelar
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    ) : (
                      /* MODO VISUALIZAÇÃO */
                      <div className="card" style={{ borderRadius: "12px", padding: "1.25rem" }}>
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
                          <div style={{ display: "flex", gap: "0.5rem", flexShrink: 0 }}>
                            <button
                              onClick={() => iniciarEdicao(aluno)}
                              title="Editar"
                              style={{
                                padding: "0.4rem 0.75rem", borderRadius: "7px",
                                background: "rgba(255,85,0,0.08)", border: "1px solid rgba(255,85,0,0.2)",
                                color: "#FF7744", fontSize: "0.8rem", cursor: "pointer", fontFamily: "inherit",
                              }}
                            >
                              ✏️ Editar
                            </button>
                            <button
                              onClick={() => handleExcluir(aluno)}
                              disabled={excluindo === aluno.id}
                              title="Excluir"
                              style={{
                                padding: "0.4rem 0.75rem", borderRadius: "7px",
                                background: "rgba(239,68,68,0.07)", border: "1px solid rgba(239,68,68,0.2)",
                                color: "#f87171", fontSize: "0.8rem", cursor: excluindo === aluno.id ? "not-allowed" : "pointer",
                                fontFamily: "inherit", opacity: excluindo === aluno.id ? 0.5 : 1,
                              }}
                            >
                              {excluindo === aluno.id ? "..." : "🗑️ Excluir"}
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>

          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginTop: "2.5rem" }}>
            <Link href="/modulos/backend/parte2/cursos" className="fire-btn" style={{ flex: 1, minWidth: "200px", padding: "0.9rem", textAlign: "center", borderRadius: "12px", color: "#fff", textDecoration: "none", fontSize: "0.87rem", fontWeight: 700 }}>
              Próximo: Cursos →
            </Link>
            <Link href="/modulos/backend/parte2" style={{ flex: 1, minWidth: "180px", padding: "0.9rem", textAlign: "center", borderRadius: "12px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", color: "var(--text-muted)", textDecoration: "none", fontSize: "0.87rem", fontWeight: 600 }}>
              ← Sistema
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

export default function Parte2AlunosPage() {
  return (
    <ActivityGate label="O cadastro de Alunos">
      <Parte2AlunosPageInner />
    </ActivityGate>
  );
}
