"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  getAllProgress,
  getAllStudents,
  getStudentActivity,
} from "@/services/progressService";
import { FLAME_INFO, getFlameStatus, getLevelFromXP } from "@/lib/gamification";
import { ALL_AULAS } from "@/content/aulas";
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
  const [rows, setRows] = useState<StudentRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [activity, setActivity] = useState<Record<string, ActivityEvent[]>>({});
  const [loadingActivity, setLoadingActivity] = useState<string | null>(null);

  const load = useCallback(async () => {
    // valida a sessão de admin pelo mesmo padrão do dashboard
    const authRes = await fetch("/api/admin/modules");
    if (authRes.status === 401) {
      router.push("/admin/login");
      return;
    }
    const [students, progress] = await Promise.all([getAllStudents(), getAllProgress()]);
    const merged: StudentRow[] = students.map((s) => ({
      ...s,
      progress: progress.find((p) => p.uid === s.uid),
    }));
    merged.sort((a, b) => (b.progress?.xp ?? 0) - (a.progress?.xp ?? 0));
    setRows(merged);
    setLoading(false);
  }, [router]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, [load]);

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
              {rows.length} aluno{rows.length !== 1 ? "s" : ""} registrado{rows.length !== 1 ? "s" : ""} — ranking por XP
            </p>
          </div>
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

        {loading ? (
          <div style={{ textAlign: "center", padding: "4rem", color: "var(--text-muted)" }}>Carregando alunos...</div>
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
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {rows.map((s, idx) => {
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
                        <span style={{ fontWeight: 700, fontSize: "0.9rem", color: "var(--text-primary)" }}>
                          {s.displayName || "—"}
                        </span>
                        {s.role === "admin" && (
                          <span className="badge badge-fire" style={{ fontSize: "0.55rem" }}>professor</span>
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

                    <button
                      onClick={() => toggleActivity(s.uid)}
                      style={{
                        flexShrink: 0,
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
