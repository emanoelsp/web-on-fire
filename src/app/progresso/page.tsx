"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { useGamificationStore } from "@/stores/gamificationStore";
import {
  BADGES,
  DECAY_GRACE_DAYS,
  DECAY_XP_POR_DIA,
  FLAME_INFO,
  LEVELS,
  daysBetween,
  getFlameStatus,
  getLevelFromXP,
  getNextLevel,
  getXPProgressPercent,
  todayISO,
} from "@/lib/gamification";
import { ALL_AULAS } from "@/content/aulas";
import { ALL_MODULES } from "@/types/modules";

export default function ProgressoPage() {
  const router = useRouter();
  const { user, profile, loading } = useAuth();
  const {
    xp,
    badges,
    streakWeeks,
    lastAccessDate,
    completedAulas,
    lastDecayAmount,
    totalDecayed,
    recentEvents,
  } = useGamificationStore();

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div style={{ minHeight: "100vh", background: "var(--dark-1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontSize: "2rem", animation: "wofPulse 1s ease infinite" }}>🔥</span>
        <style>{`@keyframes wofPulse { 0%,100% { opacity: 0.4 } 50% { opacity: 1 } }`}</style>
      </div>
    );
  }

  const level = getLevelFromXP(xp);
  const next = getNextLevel(level.level);
  const pct = getXPProgressPercent(xp);
  const flame = getFlameStatus(lastAccessDate);
  const flameInfo = FLAME_INFO[flame];
  const diasSemAcesso = lastAccessDate ? daysBetween(lastAccessDate, todayISO()) : 0;
  const diasRestantes = Math.max(DECAY_GRACE_DAYS - diasSemAcesso, 0);

  const proximaAula = ALL_AULAS.find((a) => !completedAulas.includes(a.slug));

  return (
    <div style={{ minHeight: "100vh", background: "var(--dark-1)", display: "flex", flexDirection: "column" }}>
      <Navbar />
      <main style={{ flex: 1, maxWidth: "900px", margin: "0 auto", width: "100%", padding: "3rem 1.5rem" }}>
        {/* Header */}
        <div style={{ marginBottom: "2rem" }}>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "0.03em", color: "var(--text-primary)" }}>
            MEU <span className="fire-text">PROGRESSO</span>
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginTop: "0.3rem" }}>
            {profile?.displayName ?? user.email} — acompanhe sua evolução no curso.
          </p>
        </div>

        {/* Chama / streak hero */}
        <div
          className="card"
          style={{
            borderRadius: "18px",
            padding: "1.75rem",
            marginBottom: "1.5rem",
            border: `1px solid ${flame === "acesa" ? "rgba(255,85,0,0.3)" : flame === "enfraquecendo" ? "rgba(251,191,36,0.3)" : "rgba(148,163,184,0.25)"}`,
            display: "flex",
            alignItems: "center",
            gap: "1.5rem",
            flexWrap: "wrap",
          }}
        >
          <span style={{ fontSize: "3.5rem" }}>{flameInfo.icon}</span>
          <div style={{ flex: 1, minWidth: "220px" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", letterSpacing: "0.04em", color: flameInfo.color }}>
              {flameInfo.label.toUpperCase()}
            </h2>
            <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.6, marginTop: "0.25rem" }}>
              {flameInfo.desc}
            </p>
            {flame === "enfraquecendo" && (
              <p style={{ fontSize: "0.78rem", color: "#fbbf24", marginTop: "0.4rem" }}>
                ⏳ Você tem {diasRestantes} dia{diasRestantes !== 1 ? "s" : ""} antes de começar a perder {DECAY_XP_POR_DIA} XP por dia.
              </p>
            )}
            {lastDecayAmount > 0 && (
              <p style={{ fontSize: "0.78rem", color: "#f87171", marginTop: "0.4rem" }}>
                📉 Última volta: você perdeu {lastDecayAmount} XP por ficar mais de {DECAY_GRACE_DAYS} dias fora.
              </p>
            )}
          </div>
          <div style={{ textAlign: "center", flexShrink: 0 }}>
            <div style={{ fontFamily: "var(--font-display)", fontSize: "2.6rem", color: "#FF7744", lineHeight: 1 }}>
              {streakWeeks}
            </div>
            <div style={{ fontSize: "0.68rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
              semana{streakWeeks !== 1 ? "s" : ""} em sequência
            </div>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "0.9rem", marginBottom: "1.5rem" }}>
          {[
            { icon: "⚡", value: xp, label: "XP total" },
            { icon: level.icon, value: level.name, label: `Nível ${level.level}` },
            { icon: "📚", value: `${completedAulas.length}/${ALL_AULAS.length}`, label: "aulas concluídas" },
            { icon: "🏅", value: `${badges.length}/${BADGES.length}`, label: "badges" },
          ].map((s) => (
            <div key={s.label} className="card" style={{ borderRadius: "14px", padding: "1.2rem", textAlign: "center" }}>
              <div style={{ fontSize: "1.3rem", marginBottom: "0.3rem" }}>{s.icon}</div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", color: "var(--text-primary)" }}>{s.value}</div>
              <div style={{ fontSize: "0.68rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Barra de nível */}
        <div className="card fire-border" style={{ borderRadius: "16px", padding: "1.5rem", marginBottom: "1.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
            <span style={{ fontFamily: "var(--font-display)", fontSize: "1rem", letterSpacing: "0.05em", color: "var(--text-primary)" }}>
              {level.icon} {level.name.toUpperCase()}
            </span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--text-muted)" }}>
              {next ? `${xp} / ${next.xpRequired} XP para ${next.name}` : `${xp} XP — nível máximo!`}
            </span>
          </div>
          <div style={{ height: "10px", background: "rgba(255,255,255,0.06)", borderRadius: "9999px", overflow: "hidden" }}>
            <div
              style={{
                height: "100%",
                width: `${pct}%`,
                background: "linear-gradient(90deg, #FF5500, #FF8C00)",
                borderRadius: "9999px",
                boxShadow: "0 0 12px rgba(255,85,0,0.5)",
                transition: "width 0.6s ease",
              }}
            />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: `repeat(${LEVELS.length}, 1fr)`, gap: "0.4rem", marginTop: "1rem" }}>
            {LEVELS.map((l) => (
              <div
                key={l.level}
                style={{
                  borderRadius: "8px",
                  padding: "0.5rem 0.25rem",
                  textAlign: "center",
                  border: l.level <= level.level ? "1px solid rgba(255,85,0,0.3)" : "1px dashed rgba(255,255,255,0.08)",
                  background: l.level <= level.level ? "rgba(255,85,0,0.06)" : "transparent",
                  opacity: l.level <= level.level ? 1 : 0.45,
                }}
              >
                <div style={{ fontSize: "0.95rem" }}>{l.icon}</div>
                <div style={{ fontSize: "0.6rem", color: "var(--text-muted)", lineHeight: 1.3 }}>{l.name}</div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", color: "rgba(255,255,255,0.25)" }}>{l.xpRequired}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Próxima aula */}
        {proximaAula && (
          <Link
            href={proximaAula.href}
            className="card fire-border"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              borderRadius: "16px",
              padding: "1.25rem 1.5rem",
              marginBottom: "1.5rem",
              textDecoration: "none",
            }}
          >
            <span style={{ fontSize: "1.6rem" }}>{proximaAula.icon}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", color: "rgba(255,119,68,0.7)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                Continue de onde parou
              </div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", color: "var(--text-primary)", letterSpacing: "0.03em" }}>
                {proximaAula.title}
              </div>
            </div>
            <span className="fire-btn" style={{ padding: "0.55rem 1.2rem", borderRadius: "9px", color: "#fff", fontSize: "0.8rem", fontWeight: 700 }}>
              Estudar →
            </span>
          </Link>
        )}

        {/* Progresso por módulo */}
        <div className="card" style={{ borderRadius: "16px", padding: "1.5rem", marginBottom: "1.5rem" }}>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.05rem", letterSpacing: "0.05em", color: "var(--text-primary)", marginBottom: "1rem" }}>
            TRILHA DO CURSO
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
            {ALL_MODULES.filter((m) => ALL_AULAS.some((a) => a.moduleId === m.id)).map((mod) => {
              const aulas = ALL_AULAS.filter((a) => a.moduleId === mod.id);
              const done = aulas.filter((a) => completedAulas.includes(a.slug)).length;
              const p = Math.round((done / aulas.length) * 100);
              return (
                <div key={mod.id}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.3rem" }}>
                    <span style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.75)" }}>
                      {mod.icon} {mod.label} — {mod.title}
                    </span>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", color: p === 100 ? "#4ade80" : "var(--text-muted)" }}>
                      {done}/{aulas.length} {p === 100 ? "✓" : ""}
                    </span>
                  </div>
                  <div style={{ height: "6px", background: "rgba(255,255,255,0.05)", borderRadius: "9999px", overflow: "hidden" }}>
                    <div
                      style={{
                        height: "100%",
                        width: `${p}%`,
                        background: p === 100 ? "linear-gradient(90deg, #22c55e, #16a34a)" : "linear-gradient(90deg, #FF5500, #FF8C00)",
                        borderRadius: "9999px",
                        transition: "width 0.5s ease",
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Badges */}
        <div className="card" style={{ borderRadius: "16px", padding: "1.5rem", marginBottom: "1.5rem" }}>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.05rem", letterSpacing: "0.05em", color: "var(--text-primary)", marginBottom: "1rem" }}>
            BADGES
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: "0.75rem" }}>
            {BADGES.map((b) => {
              const earned = badges.includes(b.id);
              return (
                <div
                  key={b.id}
                  title={b.description}
                  style={{
                    borderRadius: "12px",
                    padding: "0.9rem",
                    textAlign: "center",
                    border: earned ? "1px solid rgba(255,85,0,0.3)" : "1px dashed rgba(255,255,255,0.08)",
                    background: earned ? "rgba(255,85,0,0.06)" : "transparent",
                    opacity: earned ? 1 : 0.35,
                  }}
                >
                  <div style={{ fontSize: "1.6rem", filter: earned ? "none" : "grayscale(1)" }}>{b.icon}</div>
                  <div style={{ fontSize: "0.72rem", fontWeight: 700, color: earned ? "#FF9966" : "var(--text-muted)", marginTop: "0.3rem" }}>
                    {b.name}
                  </div>
                  <div style={{ fontSize: "0.62rem", color: "rgba(255,255,255,0.35)", lineHeight: 1.4, marginTop: "0.2rem" }}>
                    {b.description}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Atividade recente */}
        <div className="card" style={{ borderRadius: "16px", padding: "1.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "1rem" }}>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.05rem", letterSpacing: "0.05em", color: "var(--text-primary)" }}>
              ATIVIDADE RECENTE
            </h3>
            {totalDecayed > 0 && (
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "rgba(248,113,113,0.6)" }}>
                {totalDecayed} XP perdidos por inatividade no total
              </span>
            )}
          </div>
          {recentEvents.length === 0 ? (
            <p style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
              Nada ainda — comece uma aula para ganhar XP! 🔥
            </p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column" }}>
              {recentEvents.slice(0, 12).map((ev, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "1rem",
                    padding: "0.5rem 0",
                    borderBottom: i < Math.min(recentEvents.length, 12) - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                  }}
                >
                  <span style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.5 }}>
                    {ev.label}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      color: ev.xp >= 0 ? "#4ade80" : "#f87171",
                      flexShrink: 0,
                    }}
                  >
                    {ev.xp >= 0 ? `+${ev.xp}` : ev.xp} XP
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
