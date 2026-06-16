"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { realizarMatricula, listarMatriculas } from "@/services/matriculaService";
import { listarAlunos } from "@/services/alunoService";
import { listarTurmas } from "@/services/turmaService";
import { Aluno, Turma, Matricula, StatusMatricula } from "@/types/escola";

const STATUS_CFG: Record<StatusMatricula, { label: string; color: string; bg: string; border: string }> = {
  matriculado: { label: "Matriculado", color: "#4ade80", bg: "rgba(74,222,128,0.1)", border: "rgba(74,222,128,0.3)" },
  pendente:    { label: "Pendente",    color: "#fbbf24", bg: "rgba(251,191,36,0.1)", border: "rgba(251,191,36,0.3)" },
  evadido:     { label: "Evadido",     color: "#f87171", bg: "rgba(248,113,113,0.1)", border: "rgba(248,113,113,0.3)" },
  transferido: { label: "Transferido", color: "#60a5fa", bg: "rgba(96,165,250,0.1)", border: "rgba(96,165,250,0.3)" },
};

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

export default function MatriculasPage() {
  const [alunoId, setAlunoId] = useState("");
  const [turmaId, setTurmaId] = useState("");
  const [status, setStatus] = useState<StatusMatricula>("matriculado");

  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [turmas, setTurmas] = useState<Turma[]>([]);
  const [matriculas, setMatriculas] = useState<Matricula[]>([]);

  const [salvando, setSalvando] = useState(false);
  const [carregando, setCarregando] = useState(true);
  const [ultimaMatricula, setUltimaMatricula] = useState<{ id: string; dataHora: string } | null>(null);
  const [erro, setErro] = useState("");

  useEffect(() => { init(); }, []);

  async function init() {
    setCarregando(true);
    try {
      const [la, lt, lm] = await Promise.all([listarAlunos(), listarTurmas(), listarMatriculas()]);
      setAlunos(la);
      setTurmas(lt);
      setMatriculas(lm);
    } catch { /* sem conexão */ }
    finally { setCarregando(false); }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!alunoId) { setErro("Selecione um aluno."); return; }
    if (!turmaId) { setErro("Selecione uma turma."); return; }

    const aluno = alunos.find(a => a.id === alunoId);
    const turma = turmas.find(t => t.id === turmaId);
    if (!aluno || !turma) return;

    setSalvando(true);
    setErro("");
    try {
      const id = await realizarMatricula({
        alunoId,
        alunoNome: aluno.nome,
        turmaId,
        turmaNome: turma.nome,
        cursoNome: turma.cursoNome,
        status,
      });
      const dataHora = new Date().toISOString();
      setUltimaMatricula({ id, dataHora });
      setAlunoId("");
      setTurmaId("");
      setStatus("matriculado");
      const novas = await listarMatriculas();
      setMatriculas(novas);
    } catch {
      setErro("Erro ao realizar matrícula. Verifique a conexão com o Firebase.");
    } finally {
      setSalvando(false);
    }
  }

  const podeSubmit = !salvando && alunos.length > 0 && turmas.length > 0;

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
              <span className="badge badge-fire">Matrículas</span>
            </div>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 5vw, 3rem)", letterSpacing: "0.04em", lineHeight: 1.05, marginBottom: "0.75rem" }}>
              <span className="fire-text">REALIZAR</span>
              <br />MATRÍCULA
            </h1>
            <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: 1.7 }}>
              Escolha um aluno e uma turma para gerar a matrícula. A data/hora é
              registrada automaticamente na coleção{" "}
              <code style={{ fontFamily: "var(--font-mono)", color: "#FF7744" }}>matriculas</code>.
            </p>
          </div>

          {/* AVISOS DE PRÉ-REQUISITO */}
          {!carregando && alunos.length === 0 && (
            <div className="tip-box" style={{ marginBottom: "1rem" }}>
              <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.85rem" }}>
                ⚠️ Nenhum aluno cadastrado.{" "}
                <Link href="/modulos/backend/parte1/alunos" style={{ color: "#FF7744", textDecoration: "underline" }}>Cadastre um aluno primeiro.</Link>
              </p>
            </div>
          )}
          {!carregando && turmas.length === 0 && (
            <div className="tip-box" style={{ marginBottom: "1rem" }}>
              <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.85rem" }}>
                ⚠️ Nenhuma turma cadastrada.{" "}
                <Link href="/modulos/backend/parte1/turmas" style={{ color: "#FF7744", textDecoration: "underline" }}>Cadastre uma turma primeiro.</Link>
              </p>
            </div>
          )}

          {/* FORMULÁRIO */}
          <div className="card" style={{ borderRadius: "16px", padding: "2rem", marginBottom: "2.5rem" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", letterSpacing: "0.04em", marginBottom: "1.5rem" }}>
              NOVA MATRÍCULA
            </h2>

            {/* SUCESSO — mostra cartão da matrícula gerada */}
            {ultimaMatricula && (
              <div
                className="celebrate-banner"
                style={{
                  marginBottom: "1.5rem", borderRadius: "12px", padding: "1.25rem 1.5rem",
                  background: "linear-gradient(135deg, rgba(74,222,128,0.08), rgba(34,197,94,0.04))",
                  border: "1px solid rgba(74,222,128,0.25)",
                }}
              >
                <p style={{ color: "#4ade80", fontWeight: 700, marginBottom: "0.5rem", fontSize: "0.9rem" }}>
                  ✅ Matrícula realizada com sucesso!
                </p>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.78rem", color: "var(--text-muted)" }}>
                  <div>🔑 ID: <span style={{ color: "#FF7744" }}>{ultimaMatricula.id}</span></div>
                  <div style={{ marginTop: "0.3rem" }}>
                    🕐 Data/hora: <span style={{ color: "var(--text-primary)" }}>
                      {new Date(ultimaMatricula.dataHora).toLocaleString("pt-BR")}
                    </span>
                  </div>
                </div>
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
                    <label style={labelStyle}>Aluno *</label>
                    <select value={alunoId} onChange={e => setAlunoId(e.target.value)} required disabled={salvando || alunos.length === 0} style={selectStyle}>
                      <option value="">— Selecione um aluno —</option>
                      {alunos.map(a => (
                        <option key={a.id} value={a.id}>{a.nome}</option>
                      ))}
                    </select>
                  </div>
                  <div style={{ flex: "1 1 220px" }}>
                    <label style={labelStyle}>Turma *</label>
                    <select value={turmaId} onChange={e => setTurmaId(e.target.value)} required disabled={salvando || turmas.length === 0} style={selectStyle}>
                      <option value="">— Selecione uma turma —</option>
                      {turmas.map(t => (
                        <option key={t.id} value={t.id}>{t.nome} — {t.cursoNome}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>Status *</label>
                  <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
                    {(Object.keys(STATUS_CFG) as StatusMatricula[]).map(s => {
                      const cfg = STATUS_CFG[s];
                      const ativo = status === s;
                      return (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setStatus(s)}
                          style={{
                            padding: "0.5rem 1rem", borderRadius: "8px", cursor: "pointer",
                            fontFamily: "var(--font-mono)", fontSize: "0.78rem", fontWeight: 700,
                            border: `1px solid ${ativo ? cfg.border : "rgba(255,255,255,0.07)"}`,
                            background: ativo ? cfg.bg : "transparent",
                            color: ativo ? cfg.color : "var(--text-muted)",
                            transition: "all 0.15s",
                          }}
                        >
                          {cfg.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div style={{ background: "var(--dark-3)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "8px", padding: "0.8rem 1rem" }}>
                  <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--text-muted)", margin: 0 }}>
                    🕐 Data/hora — gerada automaticamente no momento do envio
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={!podeSubmit}
                  className="fire-btn"
                  style={{
                    padding: "0.85rem 2rem", borderRadius: "10px", color: "#fff",
                    fontWeight: 700, fontSize: "0.9rem", fontFamily: "inherit",
                    alignSelf: "flex-start",
                    cursor: !podeSubmit ? "not-allowed" : "pointer",
                    opacity: !podeSubmit ? 0.5 : 1,
                  }}
                >
                  {salvando ? "⏳ Processando..." : "📋 Realizar Matrícula"}
                </button>
              </div>
            </form>
          </div>

          {/* LISTA */}
          <section>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", letterSpacing: "0.04em" }}>
                MATRÍCULAS REALIZADAS
              </h2>
              {!carregando && (
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", fontWeight: 700, padding: "0.2rem 0.6rem", borderRadius: "99px", background: "rgba(255,85,0,0.1)", border: "1px solid rgba(255,85,0,0.25)", color: "#FF7744" }}>
                  {matriculas.length}
                </span>
              )}
            </div>

            {carregando ? (
              <div style={{ padding: "2rem", textAlign: "center", color: "var(--text-muted)", fontFamily: "var(--font-mono)", fontSize: "0.85rem" }}>Carregando...</div>
            ) : matriculas.length === 0 ? (
              <div style={{ padding: "2.5rem", textAlign: "center", background: "var(--dark-2)", borderRadius: "14px", border: "1px solid rgba(255,255,255,0.05)" }}>
                <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>📋</div>
                <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Nenhuma matrícula realizada ainda.</p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {matriculas.map(m => {
                  const cfg = STATUS_CFG[m.status];
                  return (
                    <div key={m.id} className="card" style={{ borderRadius: "12px", padding: "1.25rem" }}>
                      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.45rem", flexWrap: "wrap" }}>
                            <span style={{ fontWeight: 700, color: "var(--text-primary)" }}>
                              👤 {m.alunoNome}
                            </span>
                            <span
                              style={{
                                fontFamily: "var(--font-mono)", fontSize: "0.7rem",
                                padding: "0.15rem 0.55rem", borderRadius: "4px",
                                background: cfg.bg, border: `1px solid ${cfg.border}`, color: cfg.color,
                                fontWeight: 700,
                              }}
                            >
                              {cfg.label}
                            </span>
                          </div>
                          <div style={{ color: "var(--text-muted)", fontSize: "0.82rem", marginBottom: "0.25rem" }}>
                            🏫 {m.turmaNome}
                            <span style={{ margin: "0 0.4rem", opacity: 0.4 }}>·</span>
                            📚 {m.cursoNome}
                          </div>
                          <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "rgba(255,255,255,0.3)" }}>
                            🕐 {new Date(m.dataHora).toLocaleString("pt-BR")}
                          </div>
                        </div>
                        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "rgba(255,119,68,0.4)", flexShrink: 0 }}>
                          {m.id?.slice(0, 8)}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>

          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginTop: "2.5rem" }}>
            <Link href="/modulos/backend/parte1" className="fire-btn" style={{ flex: 1, minWidth: "200px", padding: "0.9rem", textAlign: "center", borderRadius: "12px", color: "#fff", textDecoration: "none", fontSize: "0.87rem", fontWeight: 700 }}>
              ← Sistema Acadêmico
            </Link>
            <Link href="/modulos/backend/parte1/turmas" style={{ flex: 1, minWidth: "180px", padding: "0.9rem", textAlign: "center", borderRadius: "12px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", color: "var(--text-muted)", textDecoration: "none", fontSize: "0.87rem", fontWeight: 600 }}>
              ← Turmas
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
