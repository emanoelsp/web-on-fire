"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { cadastrarCurso, listarCursos } from "@/services/cursoService";
import { Curso, CursoFormData } from "@/types/escola";

const VAZIO: CursoFormData = { nome: "", descricao: "", cargaHoraria: 0 };

const labelStyle: React.CSSProperties = {
  display: "block", fontSize: "0.78rem", color: "rgba(255,255,255,0.45)",
  marginBottom: "0.45rem", fontFamily: "var(--font-mono)",
  letterSpacing: "0.05em", textTransform: "uppercase",
};

export default function CursosPage() {
  const [form, setForm] = useState<CursoFormData>(VAZIO);
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [salvando, setSalvando] = useState(false);
  const [carregando, setCarregando] = useState(true);
  const [sucesso, setSucesso] = useState(false);
  const [erro, setErro] = useState("");

  useEffect(() => { carregar(); }, []);

  async function carregar() {
    setCarregando(true);
    try { setCursos(await listarCursos()); } catch { /* sem conexão */ }
    finally { setCarregando(false); }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: name === "cargaHoraria" ? Number(value) : value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (form.cargaHoraria <= 0) {
      setErro("Carga horária deve ser maior que zero.");
      return;
    }
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
              <span className="badge badge-green">Cursos</span>
            </div>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 5vw, 3rem)", letterSpacing: "0.04em", lineHeight: 1.05, marginBottom: "0.75rem" }}>
              <span className="fire-text">CADASTRO DE</span>
              <br />CURSOS
            </h1>
            <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: 1.7 }}>
              Registre os cursos da instituição. Cada curso pode ter várias turmas
              vinculadas a ele. Coleção{" "}
              <code style={{ fontFamily: "var(--font-mono)", color: "#FF7744" }}>cursos</code> no Firestore.
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
                    <label style={labelStyle}>Nome do curso *</label>
                    <input className="input-field" name="nome" placeholder="Ex: Desenvolvimento Web" value={form.nome} onChange={handleChange} required disabled={salvando} />
                  </div>
                  <div style={{ flex: "0 1 160px" }}>
                    <label style={labelStyle}>Carga horária (h) *</label>
                    <input className="input-field" name="cargaHoraria" type="number" min={1} placeholder="Ex: 120" value={form.cargaHoraria || ""} onChange={handleChange} required disabled={salvando} />
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Descrição *</label>
                  <textarea
                    name="descricao"
                    placeholder="Descreva os objetivos e conteúdo do curso..."
                    value={form.descricao}
                    onChange={handleChange}
                    required
                    disabled={salvando}
                    rows={3}
                    style={{
                      background: "var(--dark-3)", border: "1px solid rgba(255,255,255,0.07)",
                      color: "var(--text-primary)", borderRadius: "8px",
                      padding: "0.75rem 1rem", fontSize: "0.9rem", width: "100%",
                      outline: "none", fontFamily: "inherit", resize: "vertical",
                      transition: "all 0.2s ease",
                    }}
                  />
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
                  {salvando ? "⏳ Cadastrando..." : "📚 Cadastrar Curso"}
                </button>
              </div>
            </form>
          </div>

          {/* LISTA */}
          <section>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", letterSpacing: "0.04em" }}>
                CURSOS CADASTRADOS
              </h2>
              {!carregando && (
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", fontWeight: 700, padding: "0.2rem 0.6rem", borderRadius: "99px", background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.25)", color: "#4ade80" }}>
                  {cursos.length}
                </span>
              )}
            </div>

            {carregando ? (
              <div style={{ padding: "2rem", textAlign: "center", color: "var(--text-muted)", fontFamily: "var(--font-mono)", fontSize: "0.85rem" }}>Carregando...</div>
            ) : cursos.length === 0 ? (
              <div style={{ padding: "2.5rem", textAlign: "center", background: "var(--dark-2)", borderRadius: "14px", border: "1px solid rgba(255,255,255,0.05)" }}>
                <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>📚</div>
                <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Nenhum curso cadastrado ainda.</p>
                <p style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.8rem", marginTop: "0.35rem" }}>Cadastre o primeiro curso para criar turmas.</p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {cursos.map(curso => (
                  <div key={curso.id} className="card" style={{ borderRadius: "12px", padding: "1.25rem" }}>
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem" }}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.65rem", marginBottom: "0.4rem", flexWrap: "wrap" }}>
                          <span style={{ fontWeight: 700, color: "var(--text-primary)" }}>{curso.nome}</span>
                          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", padding: "0.15rem 0.5rem", borderRadius: "4px", background: "rgba(74,222,128,0.08)", border: "1px solid rgba(74,222,128,0.2)", color: "#4ade80" }}>
                            {curso.cargaHoraria}h
                          </span>
                        </div>
                        <p style={{ color: "var(--text-muted)", fontSize: "0.83rem", lineHeight: 1.6, margin: 0 }}>
                          {curso.descricao}
                        </p>
                      </div>
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "rgba(255,119,68,0.4)", flexShrink: 0 }}>
                        {curso.id?.slice(0, 8)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginTop: "2.5rem" }}>
            <Link href="/modulos/backend/parte1/turmas" className="fire-btn" style={{ flex: 1, minWidth: "200px", padding: "0.9rem", textAlign: "center", borderRadius: "12px", color: "#fff", textDecoration: "none", fontSize: "0.87rem", fontWeight: 700 }}>
              Próximo: Turmas →
            </Link>
            <Link href="/modulos/backend/parte1/alunos" style={{ flex: 1, minWidth: "180px", padding: "0.9rem", textAlign: "center", borderRadius: "12px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", color: "var(--text-muted)", textDecoration: "none", fontSize: "0.87rem", fontWeight: 600 }}>
              ← Alunos
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
