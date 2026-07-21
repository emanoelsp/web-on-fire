"use client";

import { useState, useEffect, useMemo } from "react";
import ActivityGate from "@/components/ActivityGate";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import {
  cadastrarCurso,
  listarCursos,
  atualizarCurso,
  excluirCurso,
} from "@/services/cursoService";
import { Curso, CursoFormData } from "@/types/escola";

const VAZIO: CursoFormData = { nome: "", descricao: "", cargaHoraria: 0 };

const labelStyle: React.CSSProperties = {
  display: "block", fontSize: "0.78rem", color: "rgba(255,255,255,0.45)",
  marginBottom: "0.45rem", fontFamily: "var(--font-mono)",
  letterSpacing: "0.05em", textTransform: "uppercase",
};

function Parte2CursosPageInner() {
  const [form, setForm] = useState<CursoFormData>(VAZIO);
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [editando, setEditando] = useState<Curso | null>(null);
  const [editForm, setEditForm] = useState<CursoFormData>(VAZIO);
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
    try { setCursos(await listarCursos()); } catch { /* offline */ }
    finally { setCarregando(false); }
  }

  const cursosFiltrados = useMemo(() => {
    if (!busca.trim()) return cursos;
    const lower = busca.toLowerCase();
    return cursos.filter(c => c.nome.toLowerCase().includes(lower) || c.descricao.toLowerCase().includes(lower));
  }, [cursos, busca]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: name === "cargaHoraria" ? Number(value) : value }));
  }

  function handleEditChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: name === "cargaHoraria" ? Number(value) : value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSalvando(true);
    setErro("");
    try {
      await cadastrarCurso(form);
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

  function iniciarEdicao(curso: Curso) {
    setEditando(curso);
    setEditForm({ nome: curso.nome, descricao: curso.descricao, cargaHoraria: curso.cargaHoraria });
  }

  async function salvarEdicao(e: React.FormEvent) {
    e.preventDefault();
    if (!editando?.id) return;
    setSalvandoEdit(true);
    try {
      await atualizarCurso(editando.id, editForm);
      setEditando(null);
      carregar();
    } catch {
      setErro("Erro ao atualizar.");
    } finally {
      setSalvandoEdit(false);
    }
  }

  async function handleExcluir(curso: Curso) {
    if (!curso.id) return;
    if (!confirm(`Excluir o curso "${curso.nome}"? As turmas vinculadas podem ficar sem referência.`)) return;
    setExcluindo(curso.id);
    try {
      await excluirCurso(curso.id);
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
              <span className="badge badge-green">Cursos · CRUD</span>
            </div>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 5vw, 3rem)", letterSpacing: "0.04em", lineHeight: 1.05, marginBottom: "0.75rem" }}>
              <span className="fire-text">GESTÃO DE</span>
              <br />CURSOS
            </h1>
            <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: 1.7 }}>
              Cadastre, busque, edite e exclua cursos da instituição.
              Dados na coleção <code style={{ fontFamily: "var(--font-mono)", color: "#FF7744" }}>cursos</code> do Firestore.
            </p>
          </div>

          {/* FORMULÁRIO */}
          <div className="card" style={{ borderRadius: "16px", padding: "2rem", marginBottom: "2.5rem" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", letterSpacing: "0.04em", marginBottom: "1.5rem" }}>
              NOVO CURSO
            </h2>

            {sucesso && (
              <div className="success-box" style={{ borderRadius: "0 10px 10px 0", marginBottom: "1.25rem" }}>
                <p style={{ color: "#4ade80", fontWeight: 700, fontSize: "0.9rem" }}>✅ Curso cadastrado com sucesso!</p>
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
                  <div style={{ flex: "1 1 240px" }}>
                    <label style={labelStyle}>Nome do Curso *</label>
                    <input className="input-field" name="nome" placeholder="Ex: Desenvolvimento Web" value={form.nome} onChange={handleChange} required disabled={salvando} />
                  </div>
                  <div style={{ flex: "0 1 160px" }}>
                    <label style={labelStyle}>Carga Horária (h) *</label>
                    <input className="input-field" name="cargaHoraria" type="number" min="1" placeholder="80" value={form.cargaHoraria || ""} onChange={handleChange} required disabled={salvando} />
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Descrição *</label>
                  <input className="input-field" name="descricao" placeholder="Breve descrição do conteúdo do curso" value={form.descricao} onChange={handleChange} required disabled={salvando} />
                </div>
                <button
                  type="submit"
                  disabled={salvando}
                  className="fire-btn"
                  style={{ padding: "0.85rem 2rem", borderRadius: "10px", color: "#fff", fontWeight: 700, fontSize: "0.9rem", fontFamily: "inherit", alignSelf: "flex-start", cursor: salvando ? "not-allowed" : "pointer", opacity: salvando ? 0.7 : 1 }}
                >
                  {salvando ? "⏳ Cadastrando..." : "📚 Cadastrar Curso"}
                </button>
              </div>
            </form>
          </div>

          {/* LISTA */}
          <section>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.25rem" }}>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", letterSpacing: "0.04em" }}>
                CURSOS CADASTRADOS
              </h2>
              {!carregando && (
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", fontWeight: 700, padding: "0.2rem 0.6rem", borderRadius: "99px", background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.25)", color: "#4ade80" }}>
                  {cursosFiltrados.length}
                </span>
              )}
            </div>

            <div style={{ marginBottom: "1.25rem" }}>
              <input
                className="input-field"
                type="text"
                placeholder="🔍  Buscar por nome ou descrição..."
                value={busca}
                onChange={e => setBusca(e.target.value)}
                style={{ width: "100%", maxWidth: "420px" }}
              />
            </div>

            {carregando ? (
              <div style={{ padding: "2rem", textAlign: "center", color: "var(--text-muted)", fontFamily: "var(--font-mono)", fontSize: "0.85rem" }}>Carregando...</div>
            ) : cursosFiltrados.length === 0 ? (
              <div style={{ padding: "2.5rem", textAlign: "center", background: "var(--dark-2)", borderRadius: "14px", border: "1px solid rgba(255,255,255,0.05)" }}>
                <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>📚</div>
                <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
                  {busca ? `Nenhum curso encontrado para "${busca}"` : "Nenhum curso cadastrado ainda."}
                </p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {cursosFiltrados.map(curso => (
                  <div key={curso.id}>
                    {editando?.id === curso.id ? (
                      <div className="card" style={{ borderRadius: "12px", padding: "1.5rem", border: "1px solid rgba(255,85,0,0.25)" }}>
                        <div style={{ marginBottom: "1.25rem", color: "#FF7744", fontFamily: "var(--font-display)", fontSize: "0.9rem" }}>
                          ✏️ EDITANDO: {curso.nome}
                        </div>
                        <form onSubmit={salvarEdicao}>
                          <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
                            <div style={{ display: "flex", gap: "0.9rem", flexWrap: "wrap" }}>
                              <div style={{ flex: "1 1 200px" }}>
                                <label style={labelStyle}>Nome *</label>
                                <input className="input-field" name="nome" value={editForm.nome} onChange={handleEditChange} required disabled={salvandoEdit} />
                              </div>
                              <div style={{ flex: "0 1 140px" }}>
                                <label style={labelStyle}>Carga Horária *</label>
                                <input className="input-field" name="cargaHoraria" type="number" min="1" value={editForm.cargaHoraria} onChange={handleEditChange} required disabled={salvandoEdit} />
                              </div>
                            </div>
                            <div>
                              <label style={labelStyle}>Descrição *</label>
                              <input className="input-field" name="descricao" value={editForm.descricao} onChange={handleEditChange} required disabled={salvandoEdit} />
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
                          <div
                            style={{
                              width: "2.5rem", height: "2.5rem", borderRadius: "10px", flexShrink: 0,
                              background: "rgba(74,222,128,0.08)", border: "1px solid rgba(74,222,128,0.2)",
                              display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem",
                            }}
                          >
                            📚
                          </div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontWeight: 700, marginBottom: "0.25rem", color: "var(--text-primary)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                              {curso.nome}
                              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", padding: "0.1rem 0.45rem", borderRadius: "4px", background: "rgba(74,222,128,0.1)", color: "#4ade80" }}>
                                {curso.cargaHoraria}h
                              </span>
                            </div>
                            <div style={{ color: "var(--text-muted)", fontSize: "0.83rem" }}>{curso.descricao}</div>
                          </div>
                          <div style={{ display: "flex", gap: "0.5rem", flexShrink: 0 }}>
                            <button
                              onClick={() => iniciarEdicao(curso)}
                              style={{ padding: "0.4rem 0.75rem", borderRadius: "7px", background: "rgba(255,85,0,0.08)", border: "1px solid rgba(255,85,0,0.2)", color: "#FF7744", fontSize: "0.8rem", cursor: "pointer", fontFamily: "inherit" }}
                            >
                              ✏️ Editar
                            </button>
                            <button
                              onClick={() => handleExcluir(curso)}
                              disabled={excluindo === curso.id}
                              style={{ padding: "0.4rem 0.75rem", borderRadius: "7px", background: "rgba(239,68,68,0.07)", border: "1px solid rgba(239,68,68,0.2)", color: "#f87171", fontSize: "0.8rem", cursor: excluindo === curso.id ? "not-allowed" : "pointer", fontFamily: "inherit", opacity: excluindo === curso.id ? 0.5 : 1 }}
                            >
                              {excluindo === curso.id ? "..." : "🗑️ Excluir"}
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
            <Link href="/modulos/backend/parte2/turmas" className="fire-btn" style={{ flex: 1, minWidth: "200px", padding: "0.9rem", textAlign: "center", borderRadius: "12px", color: "#fff", textDecoration: "none", fontSize: "0.87rem", fontWeight: 700 }}>
              Próximo: Turmas →
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

export default function Parte2CursosPage() {
  return (
    <ActivityGate label="O cadastro de Cursos">
      <Parte2CursosPageInner />
    </ActivityGate>
  );
}
