"use client";

import { useState, useEffect, useMemo } from "react";
import ActivityGate from "@/components/ActivityGate";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { realizarMatricula, listarMatriculas, atualizarStatus, excluirMatricula } from "@/services/matriculaService";
import { listarAlunos } from "@/services/alunoService";
import { listarTurmas } from "@/services/turmaService";
import { Matricula, StatusMatricula, Aluno, Turma } from "@/types/escola";

const STATUS_CORES: Record<StatusMatricula, { bg: string; border: string; color: string }> = {
  matriculado: { bg: "rgba(74,222,128,0.1)", border: "rgba(74,222,128,0.3)", color: "#4ade80" },
  pendente:    { bg: "rgba(251,191,36,0.1)", border: "rgba(251,191,36,0.3)", color: "#fbbf24" },
  evadido:     { bg: "rgba(239,68,68,0.1)",  border: "rgba(239,68,68,0.3)",  color: "#f87171" },
  transferido: { bg: "rgba(96,165,250,0.1)", border: "rgba(96,165,250,0.3)", color: "#60a5fa" },
};

const labelStyle: React.CSSProperties = {
  display: "block", fontSize: "0.78rem", color: "rgba(255,255,255,0.45)",
  marginBottom: "0.45rem", fontFamily: "var(--font-mono)",
  letterSpacing: "0.05em", textTransform: "uppercase",
};

const selectStyle: React.CSSProperties = {
  width: "100%", background: "var(--dark-3)",
  border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px",
  padding: "0.75rem 1rem", color: "var(--text-primary)",
  fontSize: "0.9rem", fontFamily: "inherit", outline: "none", cursor: "pointer",
};

function Parte2MatriculasPageInner() {
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [turmas, setTurmas] = useState<Turma[]>([]);
  const [matriculas, setMatriculas] = useState<Matricula[]>([]);
  const [busca, setBusca] = useState("");

  const [form, setForm] = useState({ alunoId: "", turmaId: "", status: "matriculado" as StatusMatricula });
  const [salvando, setSalvando] = useState(false);
  const [carregando, setCarregando] = useState(true);
  const [sucesso, setSucesso] = useState(false);
  const [erro, setErro] = useState("");
  const [atualizando, setAtualizando] = useState<string | null>(null);
  const [excluindo, setExcluindo] = useState<string | null>(null);

  useEffect(() => {
    carregar();
    listarAlunos().then(setAlunos).catch(() => {});
    listarTurmas().then(setTurmas).catch(() => {});
  }, []);

  async function carregar() {
    setCarregando(true);
    try { setMatriculas(await listarMatriculas()); } catch { /* offline */ }
    finally { setCarregando(false); }
  }

  const matriculasFiltradas = useMemo(() => {
    if (!busca.trim()) return matriculas;
    const lower = busca.toLowerCase();
    return matriculas.filter(m =>
      m.alunoNome.toLowerCase().includes(lower) ||
      m.turmaNome.toLowerCase().includes(lower) ||
      m.cursoNome.toLowerCase().includes(lower)
    );
  }, [matriculas, busca]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const aluno = alunos.find(a => a.id === form.alunoId);
    const turma = turmas.find(t => t.id === form.turmaId);
    if (!aluno || !turma) { setErro("Selecione um aluno e uma turma."); return; }

    setSalvando(true);
    setErro("");
    try {
      await realizarMatricula({
        alunoId: form.alunoId,
        alunoNome: aluno.nome,
        turmaId: form.turmaId,
        turmaNome: turma.nome,
        cursoNome: turma.cursoNome,
        status: form.status,
      });
      setForm({ alunoId: "", turmaId: "", status: "matriculado" });
      setSucesso(true);
      setTimeout(() => setSucesso(false), 4000);
      carregar();
    } catch {
      setErro("Erro ao realizar matrícula.");
    } finally {
      setSalvando(false);
    }
  }

  async function handleStatus(id: string, novoStatus: StatusMatricula) {
    setAtualizando(id);
    try {
      await atualizarStatus(id, novoStatus);
      setMatriculas(prev => prev.map(m => m.id === id ? { ...m, status: novoStatus } : m));
    } catch {
      setErro("Erro ao atualizar status.");
    } finally {
      setAtualizando(null);
    }
  }

  async function handleExcluir(m: Matricula) {
    if (!m.id) return;
    if (!confirm(`Cancelar a matrícula de "${m.alunoNome}" na turma "${m.turmaNome}"?`)) return;
    setExcluindo(m.id);
    try {
      await excluirMatricula(m.id);
      carregar();
    } catch {
      setErro("Erro ao excluir matrícula.");
    } finally {
      setExcluindo(null);
    }
  }

  const statusOptions: StatusMatricula[] = ["matriculado", "pendente", "evadido", "transferido"];

  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", background: "var(--dark-1)", padding: "2rem 1.5rem" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>

          <Link href="/modulos/backend/parte2" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", color: "var(--text-muted)", textDecoration: "none", fontSize: "0.85rem", marginBottom: "2rem" }}>
            ← Sistema Acadêmico
          </Link>

          <div style={{ marginBottom: "2rem" }}>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1rem" }}>
              <span className="badge badge-fire">🔥 Atividade Final</span>
              <span className="badge badge-fire">Matrículas · CRUD</span>
            </div>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 5vw, 3rem)", letterSpacing: "0.04em", lineHeight: 1.05, marginBottom: "0.75rem" }}>
              <span className="fire-text">GESTÃO DE</span>
              <br />MATRÍCULAS
            </h1>
            <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: 1.7 }}>
              Realize matrículas, altere status e cancele. Dados na coleção{" "}
              <code style={{ fontFamily: "var(--font-mono)", color: "#FF7744" }}>matriculas</code> do Firestore.
            </p>
          </div>

          {/* NOVA MATRÍCULA */}
          <div className="card" style={{ borderRadius: "16px", padding: "2rem", marginBottom: "2.5rem" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", letterSpacing: "0.04em", marginBottom: "1.5rem" }}>NOVA MATRÍCULA</h2>

            {sucesso && (
              <div className="success-box" style={{ borderRadius: "0 10px 10px 0", marginBottom: "1.25rem" }}>
                <p style={{ color: "#4ade80", fontWeight: 700, fontSize: "0.9rem" }}>✅ Matrícula realizada com sucesso!</p>
              </div>
            )}
            {erro && (
              <div style={{ background: "rgba(239,68,68,0.08)", borderLeft: "3px solid rgba(239,68,68,0.5)", borderRadius: "0 8px 8px 0", padding: "0.9rem 1rem", color: "#f87171", fontSize: "0.85rem", marginBottom: "1.25rem" }}>❌ {erro}</div>
            )}

            <form onSubmit={handleSubmit}>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
                <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                  <div style={{ flex: "1 1 200px" }}>
                    <label style={labelStyle}>Aluno *</label>
                    <select value={form.alunoId} onChange={e => setForm(p => ({ ...p, alunoId: e.target.value }))} required disabled={salvando} style={selectStyle}>
                      <option value="">Selecione um aluno...</option>
                      {alunos.map(a => <option key={a.id} value={a.id}>{a.nome}</option>)}
                    </select>
                  </div>
                  <div style={{ flex: "1 1 200px" }}>
                    <label style={labelStyle}>Turma *</label>
                    <select value={form.turmaId} onChange={e => setForm(p => ({ ...p, turmaId: e.target.value }))} required disabled={salvando} style={selectStyle}>
                      <option value="">Selecione uma turma...</option>
                      {turmas.map(t => <option key={t.id} value={t.id}>{t.nome} — {t.cursoNome}</option>)}
                    </select>
                  </div>
                  <div style={{ flex: "0 1 160px" }}>
                    <label style={labelStyle}>Status inicial</label>
                    <select value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value as StatusMatricula }))} disabled={salvando} style={selectStyle}>
                      {statusOptions.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>
                <button type="submit" disabled={salvando} className="fire-btn" style={{ padding: "0.85rem 2rem", borderRadius: "10px", color: "#fff", fontWeight: 700, fontSize: "0.9rem", fontFamily: "inherit", alignSelf: "flex-start", cursor: salvando ? "not-allowed" : "pointer", opacity: salvando ? 0.7 : 1 }}>
                  {salvando ? "⏳ Matriculando..." : "📋 Realizar Matrícula"}
                </button>
              </div>
            </form>
          </div>

          {/* LISTA */}
          <section>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.25rem" }}>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", letterSpacing: "0.04em" }}>MATRÍCULAS</h2>
              {!carregando && (
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", fontWeight: 700, padding: "0.2rem 0.6rem", borderRadius: "99px", background: "rgba(255,119,68,0.1)", border: "1px solid rgba(255,119,68,0.25)", color: "#FF7744" }}>
                  {matriculasFiltradas.length}
                </span>
              )}
            </div>

            <div style={{ marginBottom: "1.25rem" }}>
              <input className="input-field" type="text" placeholder="🔍  Buscar por aluno, turma ou curso..." value={busca} onChange={e => setBusca(e.target.value)} style={{ width: "100%", maxWidth: "460px" }} />
            </div>

            {carregando ? (
              <div style={{ padding: "2rem", textAlign: "center", color: "var(--text-muted)", fontFamily: "var(--font-mono)", fontSize: "0.85rem" }}>Carregando...</div>
            ) : matriculasFiltradas.length === 0 ? (
              <div style={{ padding: "2.5rem", textAlign: "center", background: "var(--dark-2)", borderRadius: "14px", border: "1px solid rgba(255,255,255,0.05)" }}>
                <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>📋</div>
                <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>{busca ? `Nenhuma matrícula encontrada para "${busca}"` : "Nenhuma matrícula realizada ainda."}</p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {matriculasFiltradas.map(mat => {
                  const cores = STATUS_CORES[mat.status];
                  return (
                    <div key={mat.id} className="card" style={{ borderRadius: "12px", padding: "1.25rem" }}>
                      <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem", flexWrap: "wrap" }}>
                        <div style={{ flex: 1, minWidth: "200px" }}>
                          <div style={{ fontWeight: 700, marginBottom: "0.25rem", color: "var(--text-primary)" }}>{mat.alunoNome}</div>
                          <div style={{ color: "var(--text-muted)", fontSize: "0.83rem" }}>
                            <span style={{ color: "#fbbf24" }}>🏫</span> {mat.turmaNome}
                            <span style={{ margin: "0 0.4rem", opacity: 0.4 }}>·</span>
                            <span style={{ color: "#60a5fa" }}>📚</span> {mat.cursoNome}
                          </div>
                          <div style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.72rem", marginTop: "0.2rem", fontFamily: "var(--font-mono)" }}>
                            {new Date(mat.dataHora).toLocaleString("pt-BR")}
                          </div>
                        </div>

                        {/* Troca de status */}
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
                          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "rgba(255,255,255,0.3)", letterSpacing: "0.06em" }}>STATUS:</span>
                          {statusOptions.map(s => {
                            const c = STATUS_CORES[s];
                            const isActive = mat.status === s;
                            return (
                              <button
                                key={s}
                                onClick={() => !isActive && handleStatus(mat.id!, s)}
                                disabled={atualizando === mat.id}
                                style={{
                                  padding: "0.3rem 0.7rem", borderRadius: "6px",
                                  fontSize: "0.72rem", fontFamily: "var(--font-mono)", fontWeight: 700,
                                  cursor: isActive || atualizando === mat.id ? "default" : "pointer",
                                  background: isActive ? c.bg : "rgba(255,255,255,0.03)",
                                  border: `1px solid ${isActive ? c.border : "rgba(255,255,255,0.06)"}`,
                                  color: isActive ? c.color : "rgba(255,255,255,0.2)",
                                  opacity: atualizando === mat.id ? 0.5 : 1,
                                  transition: "all 0.2s",
                                }}
                              >
                                {s}
                              </button>
                            );
                          })}

                          <button
                            onClick={() => handleExcluir(mat)}
                            disabled={excluindo === mat.id}
                            title="Cancelar matrícula"
                            style={{ padding: "0.3rem 0.7rem", borderRadius: "6px", background: "rgba(239,68,68,0.07)", border: "1px solid rgba(239,68,68,0.2)", color: "#f87171", fontSize: "0.72rem", cursor: excluindo === mat.id ? "not-allowed" : "pointer", fontFamily: "inherit", opacity: excluindo === mat.id ? 0.5 : 1 }}
                          >
                            {excluindo === mat.id ? "..." : "🗑️"}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>

          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginTop: "2.5rem" }}>
            <Link href="/modulos/backend/parte2" style={{ flex: 1, minWidth: "200px", padding: "0.9rem", textAlign: "center", borderRadius: "12px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", color: "var(--text-muted)", textDecoration: "none", fontSize: "0.87rem", fontWeight: 600 }}>
              ← Sistema
            </Link>
            <Link href="/modulos/backend" className="fire-btn" style={{ flex: 1, minWidth: "200px", padding: "0.9rem", textAlign: "center", borderRadius: "12px", color: "#fff", textDecoration: "none", fontSize: "0.87rem", fontWeight: 700 }}>
              🔥 Módulo 05
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

export default function Parte2MatriculasPage() {
  return (
    <ActivityGate label="O cadastro de Matrículas">
      <Parte2MatriculasPageInner />
    </ActivityGate>
  );
}
