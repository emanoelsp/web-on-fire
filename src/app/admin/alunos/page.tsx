"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  deleteStudentData,
  getAllProgress,
  getAllStudents,
  getStudentActivity,
  updateStudentName,
} from "@/services/progressService";
import {
  listarTurmas,
  moverAlunoParaTurma,
  type Turma,
} from "@/services/turmasService";
import { FLAME_INFO, getFlameStatus, getLevelFromXP } from "@/lib/gamification";
import { ALL_AULAS } from "@/content/aulas";
import { useAuth } from "@/contexts/AuthContext";
import { adminAuthHeaders } from "@/lib/adminClient";
import type {
  ActivityEvent,
  StudentProfile,
  UserProgressDoc,
} from "@/types/gamification";

type StudentRow = StudentProfile & {
  progress?: UserProgressDoc & { uid: string };
};

function formatarData(iso: string | null | undefined): string {
  if (!iso) return "nunca";
  const d = new Date(iso.length === 10 ? `${iso}T12:00:00` : iso);
  return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "short" });
}

function formatarHora(iso: string): string {
  return new Date(iso).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function AdminAlunosPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [rows, setRows] = useState<StudentRow[]>([]);
  const [turmas, setTurmas] = useState<Turma[]>([]);
  // "" = nenhuma turma escolhida ainda (professor escolhe primeiro)
  const [filtroTurma, setFiltroTurma] = useState<string>("");
  const [movendo, setMovendo] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [activity, setActivity] = useState<Record<string, ActivityEvent[]>>({});
  const [loadingActivity, setLoadingActivity] = useState<string | null>(null);
  const [editingUid, setEditingUid] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [savingEdit, setSavingEdit] = useState(false);
  const [confirmingDelete, setConfirmingDelete] = useState<string | null>(null);
  const [deletingUid, setDeletingUid] = useState<string | null>(null);

  const load = useCallback(async () => {
    // valida a sessão de admin: cookie de senha OU token do Firebase admin
    const headers = await adminAuthHeaders(user);
    const authRes = await fetch("/api/admin/modules", { headers });
    if (authRes.status === 401) {
      router.push("/admin/login");
      return;
    }
    const [students, progress, ts] = await Promise.all([
      getAllStudents(),
      getAllProgress(),
      listarTurmas(),
    ]);
    const merged: StudentRow[] = students.map((s) => ({
      ...s,
      progress: progress.find((p) => p.uid === s.uid),
    }));
    merged.sort((a, b) => (b.progress?.xp ?? 0) - (a.progress?.xp ?? 0));
    setRows(merged);
    setTurmas(ts);
    setLoading(false);
  }, [router, user]);

  useEffect(() => {
    if (authLoading) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, [authLoading, load]);

  // Filtro inicial via deep-link ?turma=<id> (vindo da página de Turmas)
  useEffect(() => {
    const t = new URLSearchParams(window.location.search).get("turma");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (t) setFiltroTurma(t);
  }, []);

  async function handleMoverTurma(uid: string, turmaId: string) {
    setMovendo(uid);
    const turma = turmaId ? turmas.find((t) => t.id === turmaId) ?? null : null;
    // atualização otimista
    setRows((prev) =>
      prev.map((r) =>
        r.uid === uid ? { ...r, turmaId: turma?.id ?? null, turmaNome: turma?.nome ?? null } : r
      )
    );
    try {
      await moverAlunoParaTurma(uid, turma ? { id: turma.id, nome: turma.nome } : null);
    } catch {
      await load();
    } finally {
      setMovendo(null);
    }
  }

  const visibleRows = rows.filter((s) =>
    filtroTurma === "todas"
      ? true
      : filtroTurma === "sem"
      ? !s.turmaId
      : s.turmaId === filtroTurma
  );

  async function toggleActivity(uid: string) {
    if (expanded === uid) {
      setExpanded(null);
      return;
    }
    setExpanded(uid);
    if (!activity[uid]) {
      setLoadingActivity(uid);
      const events = await getStudentActivity(uid, 25);
      setActivity((prev) => ({ ...prev, [uid]: events }));
      setLoadingActivity(null);
    }
  }

  function startEdit(uid: string, nome: string) {
    setEditingUid(uid);
    setEditName(nome);
    setConfirmingDelete(null);
  }

  async function handleSaveEdit(uid: string) {
    const nome = editName.trim();
    if (!nome) return;
    setSavingEdit(true);
    try {
      await updateStudentName(uid, nome);
      setRows((prev) => prev.map((r) => r.uid === uid ? { ...r, displayName: nome } : r));
      setEditingUid(null);
    } finally {
      setSavingEdit(false);
    }
  }

  async function handleDeleteStudent(uid: string) {
    setDeletingUid(uid);
    try {
      await deleteStudentData(uid);
      setRows((prev) => prev.filter((r) => r.uid !== uid));
      setConfirmingDelete(null);
      if (expanded === uid) setExpanded(null);
    } finally {
      setDeletingUid(null);
    }
  }

  return (
    <main style={{ minHeight: "100vh", background: "var(--dark-1)" }}>
      {/* Header */}
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
              admin · alunos
            </span>
          </div>
          <div style={{ display: "flex", gap: "0.6rem" }}>
            <Link
              href="/admin/turmas"
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
              🏫 Turmas
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
        <div style={{ marginBottom: "2rem", display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <span className="badge badge-fire" style={{ marginBottom: "1rem", display: "inline-flex" }}>
              Backoffice do Professor
            </span>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "0.04em", color: "var(--text-primary)" }}>
              ALUNOS
            </h1>
            <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
              {filtroTurma === ""
                ? "Escolha uma turma para ver os alunos e o progresso"
                : `${visibleRows.length} aluno${visibleRows.length !== 1 ? "s" : ""} — ranking por XP`}
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", flexWrap: "wrap" }}>
            <select
              value={filtroTurma}
              onChange={(e) => setFiltroTurma(e.target.value)}
              className="input-field"
              style={{ padding: "0.5rem 0.75rem", fontSize: "0.78rem", width: "auto" }}
            >
              <option value="">Selecione uma turma…</option>
              <option value="todas">Todas as turmas</option>
              <option value="sem">Sem turma</option>
              {turmas.map((t) => (
                <option key={t.id} value={t.id}>{t.nome}</option>
              ))}
            </select>
            <button
              onClick={() => { setLoading(true); load(); }}
              disabled={loading}
              style={{
                padding: "0.55rem 1.25rem",
                borderRadius: "8px",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "rgba(255,255,255,0.6)",
                fontSize: "0.78rem",
                cursor: loading ? "wait" : "pointer",
                fontFamily: "inherit",
              }}
            >
              {loading ? "Carregando..." : "↻ Atualizar"}
            </button>
          </div>
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: "4rem", color: "var(--text-muted)" }}>Carregando alunos...</div>
        ) : filtroTurma === "" ? (
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
            Escolha uma turma no menu acima para ver a lista de alunos e o progresso.
            {turmas.length === 0 && (
              <div style={{ marginTop: "0.75rem", fontSize: "0.82rem" }}>
                Você ainda não criou turmas —{" "}
                <Link href="/admin/turmas" style={{ color: "#FF7744" }}>criar turma</Link>
                {" "}ou use <strong style={{ color: "#FF7744" }}>Todas as turmas</strong>.
              </div>
            )}
          </div>
        ) : rows.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "4rem 2rem",
              borderRadius: "16px",
              border: "1px dashed rgba(255,255,255,0.1)",
              color: "var(--text-muted)",
            }}
          >
            <span style={{ fontSize: "2rem", display: "block", marginBottom: "0.75rem" }}>👥</span>
            Nenhum aluno registrado ainda. Compartilhe o link <strong style={{ color: "#FF7744" }}>/login</strong> com a turma!
          </div>
        ) : visibleRows.length === 0 ? (
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
            Nenhum aluno nesta turma ainda. Selecione uma turma no menu de cada aluno para movê-lo.
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {visibleRows.map((s, idx) => {
              const p = s.progress;
              const xp = p?.xp ?? 0;
              const level = getLevelFromXP(xp);
              const done = p?.completedAulas?.length ?? 0;
              const pct = Math.round((done / ALL_AULAS.length) * 100);
              const flame = getFlameStatus(p?.lastAccessDate ?? null);
              const flameInfo = FLAME_INFO[flame];
              const isOpen = expanded === s.uid;
              const events = activity[s.uid] ?? [];

              return (
                <div
                  key={s.uid}
                  className="card"
                  style={{ borderRadius: "14px", padding: "1.25rem 1.5rem", border: "1px solid rgba(255,255,255,0.05)" }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", flexWrap: "wrap" }}>
                    {/* Rank + avatar */}
                    <div style={{ position: "relative", flexShrink: 0 }}>
                      <div
                        style={{
                          width: "2.75rem",
                          height: "2.75rem",
                          borderRadius: "50%",
                          background: "rgba(255,85,0,0.1)",
                          border: "1px solid rgba(255,85,0,0.25)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: 800,
                          color: "#FF7744",
                          fontSize: "1rem",
                        }}
                      >
                        {(s.displayName || s.email || "?")[0].toUpperCase()}
                      </div>
                      {idx < 3 && (
                        <span style={{ position: "absolute", top: "-6px", right: "-6px", fontSize: "0.85rem" }}>
                          {idx === 0 ? "🥇" : idx === 1 ? "🥈" : "🥉"}
                        </span>
                      )}
                    </div>

                    {/* Nome + progresso */}
                    <div style={{ flex: 1, minWidth: "200px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
                        {editingUid === s.uid ? (
                          <>
                            <input
                              value={editName}
                              onChange={(e) => setEditName(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") handleSaveEdit(s.uid);
                                if (e.key === "Escape") setEditingUid(null);
                              }}
                              autoFocus
                              className="input-field"
                              style={{ padding: "0.25rem 0.55rem", fontSize: "0.85rem", width: "160px", fontWeight: 700 }}
                            />
                            <button
                              onClick={() => handleSaveEdit(s.uid)}
                              disabled={savingEdit || !editName.trim()}
                              style={{
                                padding: "0.25rem 0.55rem",
                                borderRadius: "6px",
                                background: "rgba(34,197,94,0.1)",
                                border: "1px solid rgba(34,197,94,0.3)",
                                color: "#4ade80",
                                fontSize: "0.72rem",
                                fontWeight: 700,
                                cursor: savingEdit ? "wait" : "pointer",
                                fontFamily: "inherit",
                              }}
                            >
                              {savingEdit ? "…" : "✓"}
                            </button>
                            <button
                              onClick={() => setEditingUid(null)}
                              style={{
                                padding: "0.25rem 0.55rem",
                                borderRadius: "6px",
                                background: "rgba(255,255,255,0.04)",
                                border: "1px solid rgba(255,255,255,0.1)",
                                color: "rgba(255,255,255,0.4)",
                                fontSize: "0.72rem",
                                cursor: "pointer",
                                fontFamily: "inherit",
                              }}
                            >
                              ✗
                            </button>
                          </>
                        ) : (
                          <>
                            <span style={{ fontWeight: 700, fontSize: "0.9rem", color: "var(--text-primary)" }}>
                              {s.displayName || "—"}
                            </span>
                            {s.role === "admin" && (
                              <span className="badge badge-fire" style={{ fontSize: "0.55rem" }}>professor</span>
                            )}
                          </>
                        )}
                      </div>
                      <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>{s.email}</div>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginTop: "0.45rem" }}>
                        <div style={{ flex: 1, maxWidth: "260px", height: "6px", background: "rgba(255,255,255,0.06)", borderRadius: "9999px", overflow: "hidden" }}>
                          <div
                            style={{
                              height: "100%",
                              width: `${pct}%`,
                              background: pct === 100 ? "linear-gradient(90deg,#22c55e,#16a34a)" : "linear-gradient(90deg,#FF5500,#FF8C00)",
                              borderRadius: "9999px",
                            }}
                          />
                        </div>
                        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--text-muted)" }}>
                          {done}/{ALL_AULAS.length} aulas
                        </span>
                      </div>
                    </div>

                    {/* Stats */}
                    <div style={{ display: "flex", alignItems: "center", gap: "1.1rem", flexShrink: 0, flexWrap: "wrap" }}>
                      <StatChip icon="⚡" label={`${xp} XP`} />
                      <StatChip icon={level.icon} label={level.name} />
                      <StatChip icon="🗓️" label={`${p?.streakWeeks ?? 0} sem`} />
                      <StatChip
                        icon={flameInfo.icon}
                        label={formatarData(p?.lastAccessDate)}
                        title={`${flameInfo.label} — último acesso`}
                        color={flameInfo.color}
                      />
                      {(p?.totalDecayed ?? 0) > 0 && (
                        <StatChip icon="📉" label={`-${p!.totalDecayed} XP`} title="XP perdido por inatividade" color="#f87171" />
                      )}
                    </div>

                    <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                      <label style={{ fontSize: "0.55rem", fontFamily: "var(--font-mono)", color: "rgba(255,255,255,0.35)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                        Turma
                      </label>
                      <select
                        value={s.turmaId ?? ""}
                        disabled={movendo === s.uid}
                        onChange={(e) => handleMoverTurma(s.uid, e.target.value)}
                        className="input-field"
                        style={{
                          padding: "0.4rem 0.6rem",
                          fontSize: "0.72rem",
                          width: "auto",
                          minWidth: "130px",
                          opacity: movendo === s.uid ? 0.5 : 1,
                          cursor: movendo === s.uid ? "wait" : "pointer",
                        }}
                      >
                        <option value="">— sem turma —</option>
                        {turmas.map((t) => (
                          <option key={t.id} value={t.id}>{t.nome}</option>
                        ))}
                      </select>
                    </div>

                    {/* Ações: editar nome + excluir + atividade */}
                    <div style={{ flexShrink: 0, display: "flex", gap: "0.4rem", alignItems: "center" }}>
                      {/* Editar nome */}
                      {editingUid !== s.uid && (
                        <button
                          onClick={() => startEdit(s.uid, s.displayName || "")}
                          title="Editar nome"
                          style={{
                            padding: "0.5rem 0.65rem",
                            borderRadius: "8px",
                            background: "rgba(255,255,255,0.04)",
                            border: "1px solid rgba(255,255,255,0.08)",
                            color: "rgba(255,255,255,0.5)",
                            fontSize: "0.8rem",
                            cursor: "pointer",
                            lineHeight: 1,
                          }}
                        >
                          ✏️
                        </button>
                      )}

                      {/* Excluir com confirmação inline */}
                      {confirmingDelete === s.uid ? (
                        <div style={{ display: "flex", gap: "0.35rem", alignItems: "center" }}>
                          <span style={{ fontSize: "0.7rem", color: "#f87171", fontFamily: "var(--font-mono)", whiteSpace: "nowrap" }}>
                            Excluir?
                          </span>
                          <button
                            onClick={() => handleDeleteStudent(s.uid)}
                            disabled={deletingUid === s.uid}
                            style={{
                              padding: "0.35rem 0.65rem",
                              borderRadius: "7px",
                              background: "rgba(239,68,68,0.12)",
                              border: "1px solid rgba(239,68,68,0.35)",
                              color: "#f87171",
                              fontSize: "0.72rem",
                              fontWeight: 700,
                              cursor: deletingUid === s.uid ? "wait" : "pointer",
                              fontFamily: "inherit",
                            }}
                          >
                            {deletingUid === s.uid ? "…" : "Sim"}
                          </button>
                          <button
                            onClick={() => setConfirmingDelete(null)}
                            style={{
                              padding: "0.35rem 0.65rem",
                              borderRadius: "7px",
                              background: "rgba(255,255,255,0.04)",
                              border: "1px solid rgba(255,255,255,0.08)",
                              color: "rgba(255,255,255,0.4)",
                              fontSize: "0.72rem",
                              cursor: "pointer",
                              fontFamily: "inherit",
                            }}
                          >
                            Não
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => { setConfirmingDelete(s.uid); setEditingUid(null); }}
                          title="Excluir aluno do sistema"
                          style={{
                            padding: "0.5rem 0.65rem",
                            borderRadius: "8px",
                            background: "rgba(255,255,255,0.04)",
                            border: "1px solid rgba(255,255,255,0.08)",
                            color: "rgba(239,68,68,0.5)",
                            fontSize: "0.8rem",
                            cursor: "pointer",
                            lineHeight: 1,
                          }}
                        >
                          🗑️
                        </button>
                      )}

                      {/* Atividade */}
                      <button
                        onClick={() => toggleActivity(s.uid)}
                        style={{
                          padding: "0.5rem 1rem",
                          borderRadius: "8px",
                          background: isOpen ? "rgba(255,85,0,0.1)" : "rgba(255,255,255,0.04)",
                          border: isOpen ? "1px solid rgba(255,85,0,0.25)" : "1px solid rgba(255,255,255,0.08)",
                          color: isOpen ? "#FF7744" : "rgba(255,255,255,0.6)",
                          fontSize: "0.75rem",
                          cursor: "pointer",
                          fontFamily: "inherit",
                          fontWeight: 600,
                        }}
                      >
                        {isOpen ? "▲ Atividade" : "▼ Atividade"}
                      </button>
                    </div>
                  </div>

                  {/* Registro de atividade */}
                  {isOpen && (
                    <div style={{ marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                      {loadingActivity === s.uid ? (
                        <p style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>Carregando registro...</p>
                      ) : events.length === 0 ? (
                        <p style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>Nenhuma atividade registrada.</p>
                      ) : (
                        <div style={{ display: "flex", flexDirection: "column" }}>
                          {events.map((ev, i) => (
                            <div
                              key={i}
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                gap: "1rem",
                                padding: "0.4rem 0",
                                borderBottom: i < events.length - 1 ? "1px solid rgba(255,255,255,0.03)" : "none",
                              }}
                            >
                              <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.55)" }}>{ev.label}</span>
                              <span style={{ display: "flex", gap: "0.9rem", flexShrink: 0 }}>
                                {ev.xp !== 0 && (
                                  <span
                                    style={{
                                      fontFamily: "var(--font-mono)",
                                      fontSize: "0.68rem",
                                      fontWeight: 700,
                                      color: ev.xp > 0 ? "#4ade80" : "#f87171",
                                    }}
                                  >
                                    {ev.xp > 0 ? `+${ev.xp}` : ev.xp}
                                  </span>
                                )}
                                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "rgba(255,255,255,0.25)" }}>
                                  {formatarHora(ev.at)}
                                </span>
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}

function StatChip({
  icon,
  label,
  title,
  color,
}: {
  icon: string;
  label: string;
  title?: string;
  color?: string;
}) {
  return (
    <span
      title={title}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.35rem",
        fontSize: "0.72rem",
        fontFamily: "var(--font-mono)",
        color: color ?? "rgba(255,255,255,0.55)",
      }}
    >
      <span style={{ fontSize: "0.85rem" }}>{icon}</span>
      {label}
    </span>
  );
}
