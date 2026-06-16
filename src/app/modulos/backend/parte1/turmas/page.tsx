"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { cadastrarTurma, listarTurmas } from "@/services/turmaService";
import { listarCursos } from "@/services/cursoService";
import { Turma, TurmaFormData, Curso } from "@/types/escola";

const VAZIO: TurmaFormData = { nome: "", cursoId: "", cursoNome: "", periodo: "", vagas: 0 };

const labelStyle: React.CSSProperties = {
  display: "block", fontSize: "0.78rem", color: "rgba(255,255,255,0.45)",
  marginBottom: "0.45rem", fontFamily: "var(--font-mono)",
  letterSpacing: "0.05em", textTransform: "uppercase",
};

const selectStyle: React.CSSProperties = {
  background: "var(--dark-3)", border: "1px solid rgba(255,255,255,0.07)",
  color: "var(--text-primary)", borderRadius: "8px",
  padding: "0.75rem 1rem", fontSize: "0.9rem", width: "100%",
  outline: "none", fontFamily: "inherit", cursor: "pointer",
};

export default function TurmasPage() {
  const [form, setForm] = useState<TurmaFormData>(VAZIO);
  const [turmas, setTurmas] = useState<Turma[]>([]);
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [salvando, setSalvando] = useState(false);
  const [carregando, setCarregando] = useState(true);
  const [sucesso, setSucesso] = useState(false);
  const [erro, setErro] = useState("");

  useEffect(() => { init(); }, []);

  async function init() {
    setCarregando(true);
    try {
      const [listaTurmas, listaCursos] = await Promise.all([listarTurmas(), listarCursos()]);
      setTurmas(listaTurmas);
      setCursos(listaCursos);
    } catch { /* sem conexão */ }
    finally { setCarregando(false); }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: name === "vagas" ? Number(value) : value }));
  }

  function handleCursoChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const cursoId = e.target.value;
    const cursoSelecionado = cursos.find(c => c.id === cursoId);
    setForm(prev => ({ ...prev, cursoId, cursoNome: cursoSelecionado?.nome ?? "" }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.cursoId) { setErro("Selecione um curso."); return; }
    if (form.vagas <= 0) { setErro("Número de vagas deve ser maior que zero."); return; }
    setSalvando(true);
    setErro("");
    try {
      await cadastrarTurma(form);
      setForm(VAZIO);
      setSucesso(true);
      setTimeout(() => setSucesso(false), 4000);
      const novasTurmas = await listarTurmas();
      setTurmas(novasTurmas);
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
              <span className="badge badge-amber">Turmas</span>
            </div>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 5vw, 3rem)", letterSpacing: "0.04em", lineHeight: 1.05, marginBottom: "0.75rem" }}>
              <span className="fire-text">CADASTRO DE</span>
              <br />TURMAS
            </h1>
            <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: 1.7 }}>
              Crie turmas vinculando-as a cursos já cadastrados. O curso selecionado
              é salvo por referência (ID) e por nome na coleção{" "}
              <code style={{ fontFamily: "var(--font-mono)", color: "#FF7744" }}>turmas</code>.
            </p>
          </div>

          {cursos.length === 0 && !carregando && (
            <div className="tip-box" style={{ marginBottom: "1.5rem" }}>
              <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.85rem", lineHeight: 1.6 }}>
                ⚠️ Nenhum curso cadastrado ainda.{" "}
                <Link href="/modulos/backend/parte1/cursos" style={{ color: "#FF7744", textDecoration: "underline" }}>
                  Cadastre um curso primeiro
                </Link>{" "}
                para poder criar turmas.
              </p>
            </div>
          )}

          {/* FORMULÁRIO */}
          <div className="card" style={{ borderRadius: "16px", padding: "2rem", marginBottom: "2.5rem" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", letterSpacing: "0.04em", marginBottom: "1.5rem" }}>
              NOVA TURMA
            </h2>

            {sucesso && (
              <div className="success-box" style={{ borderRadius: "0 10px 10px 0", marginBottom: "1.25rem" }}>
                <p style={{ color: "#4ade80", fontWeight: 700, fontSize: "0.9rem" }}>✅ Turma cadastrada com sucesso!</p>
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
                    <label style={labelStyle}>Nome da turma *</label>
                    <input className="input-field" name="nome" placeholder="Ex: Turma A — Manhã" value={form.nome} onChange={handleChange} required disabled={salvando} />
                  </div>
                  <div style={{ flex: "1 1 220px" }}>
                    <label style={labelStyle}>Curso *</label>
                    <select
                      name="cursoId"
                      value={form.cursoId}
                      onChange={handleCursoChange}
                      required
                      disabled={salvando || cursos.length === 0}
                      style={selectStyle}
                    >
                      <option value="">— Selecione um curso —</option>
                      {cursos.map(c => (
                        <option key={c.id} value={c.id}>{c.nome} ({c.cargaHoraria}h)</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                  <div style={{ flex: "1 1 180px" }}>
                    <label style={labelStyle}>Período *</label>
                    <input className="input-field" name="periodo" placeholder="Ex: 2025.1 ou Manhã" value={form.periodo} onChange={handleChange} required disabled={salvando} />
                  </div>
                  <div style={{ flex: "0 1 140px" }}>
                    <label style={labelStyle}>Vagas *</label>
                    <input className="input-field" name="vagas" type="number" min={1} placeholder="Ex: 30" value={form.vagas || ""} onChange={handleChange} required disabled={salvando} />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={salvando || cursos.length === 0}
                  className="fire-btn"
                  style={{
                    padding: "0.85rem 2rem", borderRadius: "10px", color: "#fff",
                    fontWeight: 700, fontSize: "0.9rem", fontFamily: "inherit",
                    alignSelf: "flex-start",
                    cursor: (salvando || cursos.length === 0) ? "not-allowed" : "pointer",
                    opacity: (salvando || cursos.length === 0) ? 0.5 : 1,
                  }}
                >
                  {salvando ? "⏳ Cadastrando..." : "🏫 Cadastrar Turma"}
                </button>
              </div>
            </form>
          </div>

          {/* LISTA */}
          <section>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", letterSpacing: "0.04em" }}>
                TURMAS CADASTRADAS
              </h2>
              {!carregando && (
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", fontWeight: 700, padding: "0.2rem 0.6rem", borderRadius: "99px", background: "rgba(251,191,36,0.1)", border: "1px solid rgba(251,191,36,0.25)", color: "#fbbf24" }}>
                  {turmas.length}
                </span>
              )}
            </div>

            {carregando ? (
              <div style={{ padding: "2rem", textAlign: "center", color: "var(--text-muted)", fontFamily: "var(--font-mono)", fontSize: "0.85rem" }}>Carregando...</div>
            ) : turmas.length === 0 ? (
              <div style={{ padding: "2.5rem", textAlign: "center", background: "var(--dark-2)", borderRadius: "14px", border: "1px solid rgba(255,255,255,0.05)" }}>
                <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>🏫</div>
                <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Nenhuma turma cadastrada ainda.</p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {turmas.map(turma => (
                  <div key={turma.id} className="card" style={{ borderRadius: "12px", padding: "1.25rem" }}>
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem" }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.45rem", flexWrap: "wrap" }}>
                          <span style={{ fontWeight: 700, color: "var(--text-primary)" }}>{turma.nome}</span>
                          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", padding: "0.15rem 0.5rem", borderRadius: "4px", background: "rgba(251,191,36,0.08)", border: "1px solid rgba(251,191,36,0.2)", color: "#fbbf24" }}>
                            {turma.periodo}
                          </span>
                        </div>
                        <div style={{ color: "var(--text-muted)", fontSize: "0.82rem" }}>
                          📚 {turma.cursoNome}
                          <span style={{ margin: "0 0.4rem", opacity: 0.4 }}>·</span>
                          {turma.vagas} vagas
                        </div>
                      </div>
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "rgba(255,119,68,0.4)", flexShrink: 0 }}>
                        {turma.id?.slice(0, 8)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginTop: "2.5rem" }}>
            <Link href="/modulos/backend/parte1/matriculas" className="fire-btn" style={{ flex: 1, minWidth: "200px", padding: "0.9rem", textAlign: "center", borderRadius: "12px", color: "#fff", textDecoration: "none", fontSize: "0.87rem", fontWeight: 700 }}>
              Próximo: Matrículas →
            </Link>
            <Link href="/modulos/backend/parte1/cursos" style={{ flex: 1, minWidth: "180px", padding: "0.9rem", textAlign: "center", borderRadius: "12px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", color: "var(--text-muted)", textDecoration: "none", fontSize: "0.87rem", fontWeight: 600 }}>
              ← Cursos
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
