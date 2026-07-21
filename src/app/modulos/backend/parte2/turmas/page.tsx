"use client";

import { useState, useEffect, useMemo } from "react";
import ActivityGate from "@/components/ActivityGate";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { cadastrarTurma, listarTurmas, atualizarTurma, excluirTurma } from "@/services/turmaService";
import { listarCursos } from "@/services/cursoService";
import { Turma, TurmaFormData, Curso } from "@/types/escola";

const VAZIO: TurmaFormData = { nome: "", cursoId: "", cursoNome: "", periodo: "", vagas: 0 };

const labelStyle: React.CSSProperties = {
  display: "block", fontSize: "0.78rem", color: "rgba(255,255,255,0.45)",
  marginBottom: "0.45rem", fontFamily: "var(--font-mono)",
  letterSpacing: "0.05em", textTransform: "uppercase",
};

const selectStyle: React.CSSProperties = {
  width: "100%",
  background: "var(--dark-3)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "8px",
  padding: "0.75rem 1rem",
  color: "var(--text-primary)",
  fontSize: "0.9rem",
  fontFamily: "inherit",
  outline: "none",
  cursor: "pointer",
};

function Parte2TurmasPageInner() {
  const [form, setForm] = useState<TurmaFormData>(VAZIO);
  const [turmas, setTurmas] = useState<Turma[]>([]);
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [editando, setEditando] = useState<Turma | null>(null);
  const [editForm, setEditForm] = useState<TurmaFormData>(VAZIO);
  const [busca, setBusca] = useState("");
  const [salvando, setSalvando] = useState(false);
  const [salvandoEdit, setSalvandoEdit] = useState(false);
  const [carregando, setCarregando] = useState(true);
  const [sucesso, setSucesso] = useState(false);
  const [erro, setErro] = useState("");
  const [excluindo, setExcluindo] = useState<string | null>(null);

  useEffect(() => {
    carregar();
    listarCursos().then(setCursos).catch(() => {});
  }, []);

  async function carregar() {
    setCarregando(true);
    try { setTurmas(await listarTurmas()); } catch { /* offline */ }
    finally { setCarregando(false); }
  }

  const turmasFiltradas = useMemo(() => {
    if (!busca.trim()) return turmas;
    const lower = busca.toLowerCase();
    return turmas.filter(t => t.nome.toLowerCase().includes(lower) || t.cursoNome.toLowerCase().includes(lower));
  }, [turmas, busca]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    if (name === "cursoId") {
      const curso = cursos.find(c => c.id === value);
      setForm(prev => ({ ...prev, cursoId: value, cursoNome: curso?.nome ?? "" }));
    } else {
      setForm(prev => ({ ...prev, [name]: name === "vagas" ? Number(value) : value }));
    }
  }

  function handleEditChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    if (name === "cursoId") {
      const curso = cursos.find(c => c.id === value);
      setEditForm(prev => ({ ...prev, cursoId: value, cursoNome: curso?.nome ?? "" }));
    } else {
      setEditForm(prev => ({ ...prev, [name]: name === "vagas" ? Number(value) : value }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSalvando(true);
    setErro("");
    try {
      await cadastrarTurma(form);
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

  function iniciarEdicao(turma: Turma) {
    setEditando(turma);
    setEditForm({ nome: turma.nome, cursoId: turma.cursoId, cursoNome: turma.cursoNome, periodo: turma.periodo, vagas: turma.vagas });
  }

  async function salvarEdicao(e: React.FormEvent) {
    e.preventDefault();
    if (!editando?.id) return;
    setSalvandoEdit(true);
    try {
      await atualizarTurma(editando.id, editForm);
      setEditando(null);
      carregar();
    } catch {
      setErro("Erro ao atualizar.");
    } finally {
      setSalvandoEdit(false);
    }
  }

  async function handleExcluir(turma: Turma) {
    if (!turma.id) return;
    if (!confirm(`Excluir a turma "${turma.nome}"? As matrículas vinculadas podem ficar inconsistentes.`)) return;
    setExcluindo(turma.id);
    try {
      await excluirTurma(turma.id);
      carregar();
    } catch {
      setErro("Erro ao excluir.");
    } finally {
      setExcluindo(null);
    }
  }

  const periodos = ["Manhã", "Tarde", "Noite", "EAD", "Sábado"];

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
              <span className="badge badge-amber">Turmas · CRUD</span>
            </div>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 5vw, 3rem)", letterSpacing: "0.04em", lineHeight: 1.05, marginBottom: "0.75rem" }}>
              <span className="fire-text">GESTÃO DE</span>
              <br />TURMAS
            </h1>
            <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: 1.7 }}>
              Cadastre, edite período/vagas e exclua turmas. Dados na coleção{" "}
              <code style={{ fontFamily: "var(--font-mono)", color: "#FF7744" }}>turmas</code> do Firestore.
            </p>
          </div>

          {/* FORMULÁRIO */}
          <div className="card" style={{ borderRadius: "16px", padding: "2rem", marginBottom: "2.5rem" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", letterSpacing: "0.04em", marginBottom: "1.5rem" }}>NOVA TURMA</h2>

            {sucesso && (
              <div className="success-box" style={{ borderRadius: "0 10px 10px 0", marginBottom: "1.25rem" }}>
                <p style={{ color: "#4ade80", fontWeight: 700, fontSize: "0.9rem" }}>✅ Turma cadastrada com sucesso!</p>
              </div>
            )}
            {erro && (
              <div style={{ background: "rgba(239,68,68,0.08)", borderLeft: "3px solid rgba(239,68,68,0.5)", borderRadius: "0 8px 8px 0", padding: "0.9rem 1rem", color: "#f87171", fontSize: "0.85rem", marginBottom: "1.25rem" }}>❌ {erro}</div>
            )}

            <form onSubmit={handleSubmit}>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
                <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                  <div style={{ flex: "1 1 220px" }}>
                    <label style={labelStyle}>Nome da Turma *</label>
                    <input className="input-field" name="nome" placeholder="Ex: Turma A — 2025.1" value={form.nome} onChange={handleChange} required disabled={salvando} />
                  </div>
                  <div style={{ flex: "1 1 180px" }}>
                    <label style={labelStyle}>Curso *</label>
                    <select name="cursoId" value={form.cursoId} onChange={handleChange} required disabled={salvando} style={selectStyle}>
                      <option value="">Selecione um curso...</option>
                      {cursos.map(c => <option key={c.id} value={c.id}>{c.nome}</option>)}
                    </select>
                  </div>
                </div>
                <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                  <div style={{ flex: "1 1 160px" }}>
                    <label style={labelStyle}>Período *</label>
                    <select name="periodo" value={form.periodo} onChange={handleChange} required disabled={salvando} style={selectStyle}>
                      <option value="">Selecione...</option>
                      {periodos.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                  </div>
                  <div style={{ flex: "0 1 130px" }}>
                    <label style={labelStyle}>Vagas *</label>
                    <input className="input-field" name="vagas" type="number" min="1" placeholder="30" value={form.vagas || ""} onChange={handleChange} required disabled={salvando} />
                  </div>
                </div>
                <button type="submit" disabled={salvando} className="fire-btn" style={{ padding: "0.85rem 2rem", borderRadius: "10px", color: "#fff", fontWeight: 700, fontSize: "0.9rem", fontFamily: "inherit", alignSelf: "flex-start", cursor: salvando ? "not-allowed" : "pointer", opacity: salvando ? 0.7 : 1 }}>
                  {salvando ? "⏳ Cadastrando..." : "🏫 Cadastrar Turma"}
                </button>
              </div>
            </form>
          </div>

          {/* LISTA */}
          <section>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.25rem" }}>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", letterSpacing: "0.04em" }}>TURMAS CADASTRADAS</h2>
              {!carregando && (
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", fontWeight: 700, padding: "0.2rem 0.6rem", borderRadius: "99px", background: "rgba(251,191,36,0.1)", border: "1px solid rgba(251,191,36,0.25)", color: "#fbbf24" }}>
                  {turmasFiltradas.length}
                </span>
              )}
            </div>

            <div style={{ marginBottom: "1.25rem" }}>
              <input className="input-field" type="text" placeholder="🔍  Buscar por nome ou curso..." value={busca} onChange={e => setBusca(e.target.value)} style={{ width: "100%", maxWidth: "420px" }} />
            </div>

            {carregando ? (
              <div style={{ padding: "2rem", textAlign: "center", color: "var(--text-muted)", fontFamily: "var(--font-mono)", fontSize: "0.85rem" }}>Carregando...</div>
            ) : turmasFiltradas.length === 0 ? (
              <div style={{ padding: "2.5rem", textAlign: "center", background: "var(--dark-2)", borderRadius: "14px", border: "1px solid rgba(255,255,255,0.05)" }}>
                <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>🏫</div>
                <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>{busca ? `Nenhuma turma encontrada para "${busca}"` : "Nenhuma turma cadastrada ainda."}</p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {turmasFiltradas.map(turma => (
                  <div key={turma.id}>
                    {editando?.id === turma.id ? (
                      <div className="card" style={{ borderRadius: "12px", padding: "1.5rem", border: "1px solid rgba(255,85,0,0.25)" }}>
                        <div style={{ marginBottom: "1.25rem", color: "#FF7744", fontFamily: "var(--font-display)", fontSize: "0.9rem" }}>✏️ EDITANDO: {turma.nome}</div>
                        <form onSubmit={salvarEdicao}>
                          <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
                            <div style={{ display: "flex", gap: "0.9rem", flexWrap: "wrap" }}>
                              <div style={{ flex: "1 1 180px" }}>
                                <label style={labelStyle}>Nome *</label>
                                <input className="input-field" name="nome" value={editForm.nome} onChange={handleEditChange} required disabled={salvandoEdit} />
                              </div>
                              <div style={{ flex: "1 1 180px" }}>
                                <label style={labelStyle}>Curso *</label>
                                <select name="cursoId" value={editForm.cursoId} onChange={handleEditChange} required disabled={salvandoEdit} style={selectStyle}>
                                  <option value="">Selecione...</option>
                                  {cursos.map(c => <option key={c.id} value={c.id}>{c.nome}</option>)}
                                </select>
                              </div>
                            </div>
                            <div style={{ display: "flex", gap: "0.9rem", flexWrap: "wrap" }}>
                              <div style={{ flex: "1 1 140px" }}>
                                <label style={labelStyle}>Período *</label>
                                <select name="periodo" value={editForm.periodo} onChange={handleEditChange} required disabled={salvandoEdit} style={selectStyle}>
                                  {periodos.map(p => <option key={p} value={p}>{p}</option>)}
                                </select>
                              </div>
                              <div style={{ flex: "0 1 120px" }}>
                                <label style={labelStyle}>Vagas *</label>
                                <input className="input-field" name="vagas" type="number" min="1" value={editForm.vagas} onChange={handleEditChange} required disabled={salvandoEdit} />
                              </div>
                            </div>
                            <div style={{ display: "flex", gap: "0.75rem" }}>
                              <button type="submit" disabled={salvandoEdit} className="fire-btn" style={{ padding: "0.65rem 1.4rem", borderRadius: "8px", color: "#fff", fontWeight: 700, fontSize: "0.85rem", fontFamily: "inherit" }}>
                                {salvandoEdit ? "⏳ Salvando..." : "✅ Salvar"}
                              </button>
                              <button type="button" onClick={() => setEditando(null)} style={{ padding: "0.65rem 1.1rem", borderRadius: "8px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "var(--text-muted)", fontSize: "0.85rem", fontFamily: "inherit", cursor: "pointer" }}>
                                Cancelar
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    ) : (
                      <div className="card" style={{ borderRadius: "12px", padding: "1.25rem" }}>
                        <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
                          <div style={{ width: "2.5rem", height: "2.5rem", borderRadius: "10px", flexShrink: 0, background: "rgba(251,191,36,0.08)", border: "1px solid rgba(251,191,36,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem" }}>
                            🏫
                          </div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontWeight: 700, marginBottom: "0.25rem", color: "var(--text-primary)", display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
                              {turma.nome}
                              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", padding: "0.1rem 0.45rem", borderRadius: "4px", background: "rgba(251,191,36,0.1)", color: "#fbbf24" }}>{turma.periodo}</span>
                              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", padding: "0.1rem 0.45rem", borderRadius: "4px", background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.4)" }}>{turma.vagas} vagas</span>
                            </div>
                            <div style={{ color: "var(--text-muted)", fontSize: "0.83rem" }}>
                              <span style={{ color: "#60a5fa" }}>📚</span> {turma.cursoNome}
                            </div>
                          </div>
                          <div style={{ display: "flex", gap: "0.5rem", flexShrink: 0 }}>
                            <button onClick={() => iniciarEdicao(turma)} style={{ padding: "0.4rem 0.75rem", borderRadius: "7px", background: "rgba(255,85,0,0.08)", border: "1px solid rgba(255,85,0,0.2)", color: "#FF7744", fontSize: "0.8rem", cursor: "pointer", fontFamily: "inherit" }}>✏️ Editar</button>
                            <button onClick={() => handleExcluir(turma)} disabled={excluindo === turma.id} style={{ padding: "0.4rem 0.75rem", borderRadius: "7px", background: "rgba(239,68,68,0.07)", border: "1px solid rgba(239,68,68,0.2)", color: "#f87171", fontSize: "0.8rem", cursor: excluindo === turma.id ? "not-allowed" : "pointer", fontFamily: "inherit", opacity: excluindo === turma.id ? 0.5 : 1 }}>
                              {excluindo === turma.id ? "..." : "🗑️ Excluir"}
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
            <Link href="/modulos/backend/parte2/matriculas" className="fire-btn" style={{ flex: 1, minWidth: "200px", padding: "0.9rem", textAlign: "center", borderRadius: "12px", color: "#fff", textDecoration: "none", fontSize: "0.87rem", fontWeight: 700 }}>
              Próximo: Matrículas →
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

export default function Parte2TurmasPage() {
  return (
    <ActivityGate label="O cadastro de Turmas">
      <Parte2TurmasPageInner />
    </ActivityGate>
  );
}
