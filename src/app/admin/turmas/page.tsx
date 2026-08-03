"use client";

import { useCallback, useEffect, useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getAllStudents } from "@/services/progressService";
import {
  listarTurmas,
  criarTurma,
  excluirTurma,
  type Turma,
} from "@/services/turmasService";
import { useAuth } from "@/contexts/AuthContext";
import { adminAuthHeaders } from "@/lib/adminClient";

export default function AdminTurmasPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [turmas, setTurmas] = useState<Turma[]>([]);
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [semTurma, setSemTurma] = useState(0);
  const [loading, setLoading] = useState(true);
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    const headers = await adminAuthHeaders(user);
    const authRes = await fetch("/api/admin/modules", { headers });
    if (authRes.status === 401) {
      router.push("/admin/login");
      return;
    }
    const [ts, students] = await Promise.all([listarTurmas(), getAllStudents()]);
    const c: Record<string, number> = {};
    let sem = 0;
    for (const s of students) {
      if (s.turmaId) c[s.turmaId] = (c[s.turmaId] ?? 0) + 1;
      else sem += 1;
    }
    setTurmas(ts);
    setCounts(c);
    setSemTurma(sem);
    setLoading(false);
  }, [router, user]);

  useEffect(() => {
    if (authLoading) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, [authLoading, load]);

  async function handleCreate(e: FormEvent) {
    e.preventDefault();
    if (!nome.trim()) return;
    setSaving(true);
    setError("");
    try {
      await criarTurma(nome, descricao);
      setNome("");
      setDescricao("");
      await load();
    } catch {
      setError("Não foi possível criar a turma.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(t: Turma) {
    const n = counts[t.id] ?? 0;
    const msg =
      n > 0
        ? `Excluir a turma "${t.nome}"? ${n} aluno(s) ficarão sem turma.`
        : `Excluir a turma "${t.nome}"?`;
    if (!confirm(msg)) return;
    try {
      await excluirTurma(t.id);
      await load();
    } catch {
      setError("Não foi possível excluir a turma.");
    }
  }

  return (
    <main style={{ minHeight: "100vh", background: "var(--dark-1)" }}>
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
            maxWidth: "1100px",
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
              admin · turmas
            </span>
          </div>
          <div style={{ display: "flex", gap: "0.6rem" }}>
            <Link
              href="/admin/alunos"
              style={{
                padding: "0.4rem 1rem",
                borderRadius: "8px",
                background: "rgba(255,85,0,0.08)",
                border: "1px solid rgba(255,85,0,0.2)",
                color: "#FF7744",
                fontSize: "0.78rem",
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              👥 Alunos
            </Link>
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
              ← Módulos & Aulas
            </Link>
          </div>
        </div>
      </header>

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "3rem 1.5rem" }}>
        <div style={{ marginBottom: "2rem" }}>
          <span className="badge badge-fire" style={{ marginBottom: "1rem", display: "inline-flex" }}>
            Backoffice do Professor
          </span>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "0.04em", color: "var(--text-primary)" }}>
            TURMAS
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
            {turmas.length} turma{turmas.length !== 1 ? "s" : ""} · {semTurma} aluno{semTurma !== 1 ? "s" : ""} sem turma
          </p>
        </div>

        {/* Criar turma */}
        <form
          onSubmit={handleCreate}
          className="card"
          style={{
            borderRadius: "14px",
            padding: "1.5rem",
            border: "1px solid rgba(255,255,255,0.05)",
            marginBottom: "2rem",
            display: "flex",
            gap: "0.75rem",
            flexWrap: "wrap",
            alignItems: "flex-end",
          }}
        >
          <div style={{ flex: 1, minWidth: "180px" }}>
            <label style={labelStyle}>Nome da turma</label>
            <input
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Ex.: Turma 2026.1 — Manhã"
              required
              className="input-field"
            />
          </div>
          <div style={{ flex: 2, minWidth: "180px" }}>
            <label style={labelStyle}>Descrição (opcional)</label>
            <input
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Ex.: Curso técnico, período matutino"
              className="input-field"
            />
          </div>
          <button
            type="submit"
            disabled={saving || !nome.trim()}
            className="fire-btn"
            style={{
              padding: "0.85rem 1.5rem",
              borderRadius: "10px",
              fontSize: "0.85rem",
              fontWeight: 700,
              color: "#fff",
              fontFamily: "inherit",
              opacity: saving || !nome.trim() ? 0.6 : 1,
              cursor: saving || !nome.trim() ? "not-allowed" : "pointer",
            }}
          >
            {saving ? "Criando..." : "🔥 Criar turma"}
          </button>
        </form>

        {error && (
          <div
            style={{
              background: "rgba(204,34,0,0.08)",
              border: "1px solid rgba(204,34,0,0.3)",
              borderRadius: "8px",
              padding: "0.75rem 1rem",
              fontSize: "0.82rem",
              color: "#FF6644",
              marginBottom: "1.5rem",
            }}
          >
            {error}
          </div>
        )}

        {loading ? (
          <div style={{ textAlign: "center", padding: "4rem", color: "var(--text-muted)" }}>Carregando turmas...</div>
        ) : turmas.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "4rem 2rem",
              borderRadius: "16px",
              border: "1px dashed rgba(255,255,255,0.1)",
              color: "var(--text-muted)",
            }}
          >
            <span style={{ fontSize: "2rem", display: "block", marginBottom: "0.75rem" }}>🏫</span>
            Nenhuma turma criada ainda. Crie a primeira acima e depois organize os alunos em{" "}
            <Link href="/admin/alunos" style={{ color: "#FF7744" }}>Alunos</Link>.
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {turmas.map((t) => (
              <div
                key={t.id}
                className="card"
                style={{
                  borderRadius: "14px",
                  padding: "1.25rem 1.5rem",
                  border: "1px solid rgba(255,255,255,0.05)",
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  flexWrap: "wrap",
                }}
              >
                <div style={{ flex: 1, minWidth: "200px" }}>
                  <div style={{ fontWeight: 700, fontSize: "0.95rem", color: "var(--text-primary)" }}>
                    🏫 {t.nome}
                  </div>
                  {t.descricao ? (
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.2rem" }}>{t.descricao}</div>
                  ) : null}
                </div>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.72rem",
                    color: "rgba(255,255,255,0.55)",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "9999px",
                    padding: "0.3rem 0.8rem",
                  }}
                >
                  👥 {counts[t.id] ?? 0} aluno{(counts[t.id] ?? 0) !== 1 ? "s" : ""}
                </span>
                <Link
                  href={`/admin/alunos?turma=${t.id}`}
                  style={{
                    padding: "0.45rem 0.9rem",
                    borderRadius: "8px",
                    background: "rgba(255,85,0,0.08)",
                    border: "1px solid rgba(255,85,0,0.2)",
                    color: "#FF7744",
                    fontSize: "0.75rem",
                    textDecoration: "none",
                    fontWeight: 600,
                  }}
                >
                  Ver alunos →
                </Link>
                <button
                  onClick={() => handleDelete(t)}
                  style={{
                    padding: "0.45rem 0.9rem",
                    borderRadius: "8px",
                    background: "rgba(204,34,0,0.06)",
                    border: "1px solid rgba(204,34,0,0.25)",
                    color: "#FF6644",
                    fontSize: "0.75rem",
                    cursor: "pointer",
                    fontFamily: "inherit",
                    fontWeight: 600,
                  }}
                >
                  Excluir
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "0.7rem",
  fontFamily: "var(--font-mono)",
  color: "rgba(255,119,68,0.8)",
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  marginBottom: "0.4rem",
};
