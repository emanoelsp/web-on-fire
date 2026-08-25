"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { useGamificationStore } from "@/stores/gamificationStore";
import { logActivity } from "@/services/progressService";
import ActivityGate from "@/components/ActivityGate";

export interface ChallengeSection {
  section: string;
  icon: string;
  tasks: { id: string; text: string }[];
}

interface Props {
  /** slug do registro central (aulas.ts) — marca o módulo como concluído */
  aulaSlug: string;
  moduleLabel: string; // ex: "Módulo 03"
  moduleHref: string; // volta para a landing do módulo
  moduleName: string; // ex: "Estilização & UI"
  title: string; // título grande do desafio
  subtitle: string;
  intro: string;
  sections: ChallengeSection[];
  bonus: { id: string; text: string }[];
  criteria: string[];
  xp?: number;
  repoUrl?: string;
  quickstart?: { label: string; code: string; note?: string }[];
}

export default function ModuleChallenge({
  aulaSlug,
  moduleLabel,
  moduleHref,
  moduleName,
  title,
  subtitle,
  intro,
  sections,
  bonus,
  criteria,
  xp = 120,
  repoUrl,
  quickstart,
}: Props) {
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [bonusChecked, setBonusChecked] = useState<Set<string>>(new Set());
  const [celebrated, setCelebrated] = useState(false);

  const { user } = useAuth();
  const completeAula = useGamificationStore((s) => s.completeAula);
  const isCompleted = useGamificationStore((s) => s.completedAulas.includes(aulaSlug));

  const allTasks = useMemo(() => sections.flatMap((s) => s.tasks), [sections]);
  const totalReqs = allTasks.length;
  const doneReqs = [...checked].length;
  const pct = Math.round((doneReqs / totalReqs) * 100);
  const allDone = doneReqs === totalReqs;

  useEffect(() => {
    if (allDone && !celebrated) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCelebrated(true);
      if (!isCompleted) {
        completeAula(aulaSlug, `${moduleName} — Desafio Final`);
        if (user) {
          logActivity({
            uid: user.uid,
            email: user.email ?? "",
            type: "aula_completa",
            label: `Concluiu o Desafio Final: ${moduleName}`,
            xp,
          });
        }
      }
    }
    if (!allDone && celebrated) setCelebrated(false);
  }, [allDone, celebrated, isCompleted, completeAula, aulaSlug, moduleName, user, xp]);

  function toggle(id: string) {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleBonus(id: string) {
    setBonusChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const firePositions = [6, 16, 27, 38, 50, 61, 72, 83, 92];

  return (
    <ActivityGate label={`O desafio final de ${moduleName}`}>
    <div style={{ minHeight: "100vh", background: "var(--dark-1)", display: "flex", flexDirection: "column" }}>
      <Navbar />

      {celebrated && (
        <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 100 }}>
          {firePositions.map((left, i) => (
            <span
              key={i}
              style={{
                position: "absolute",
                bottom: "-1rem",
                left: `${left}%`,
                fontSize: `${1 + (i % 3) * 0.4}rem`,
                animation: `wofFireFloat ${1.6 + (i % 4) * 0.2}s ease-out ${(i % 5) * 0.12}s both`,
              }}
            >
              🔥
            </span>
          ))}
        </div>
      )}

      <main style={{ flex: 1, maxWidth: "1000px", margin: "0 auto", width: "100%", padding: "3rem 1.5rem" }}>
        {/* Breadcrumb */}
        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", marginBottom: "2rem", fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--text-muted)" }}>
          <Link href="/" style={{ color: "var(--text-muted)", textDecoration: "none" }}>início</Link>
          <span>/</span>
          <Link href={moduleHref} style={{ color: "var(--text-muted)", textDecoration: "none" }}>{moduleName.toLowerCase()}</Link>
          <span>/</span>
          <span style={{ color: "rgba(255,119,68,0.8)" }}>desafio final</span>
        </div>

        {/* Header */}
        <div style={{ marginBottom: "2.5rem" }}>
          <span className="badge badge-amber" style={{ marginBottom: "1.25rem", display: "inline-flex" }}>
            🏆 {moduleLabel} — Desafio Final
          </span>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.2rem, 6vw, 4rem)",
              lineHeight: 0.95,
              letterSpacing: "0.02em",
              marginBottom: "1rem",
              whiteSpace: "pre-line",
            }}
          >
            <span className="fire-text">{title}</span>
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.7, maxWidth: "640px" }}>
            {subtitle}
          </p>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.85rem", lineHeight: 1.7, maxWidth: "640px", marginTop: "0.75rem" }}>
            {intro}
          </p>

          {repoUrl && (
            <div
              style={{
                marginTop: "1.5rem",
                padding: "1.1rem 1.4rem",
                borderRadius: "14px",
                background: "rgba(124,58,237,0.07)",
                border: "1px solid rgba(124,58,237,0.25)",
                display: "flex",
                alignItems: "center",
                gap: "1.25rem",
                flexWrap: "wrap",
                maxWidth: "640px",
              }}
            >
              <div style={{ flex: 1, minWidth: "180px" }}>
                <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "rgba(167,139,250,0.7)", marginBottom: "0.25rem" }}>
                  Passo 1 — Repositório do Projeto Base
                </p>
                <p style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.5 }}>
                  Faça o fork e clone o projeto antes de começar.
                </p>
              </div>
              <a
                href={repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.6rem 1.2rem",
                  borderRadius: "10px",
                  background: "linear-gradient(135deg, rgba(124,58,237,0.5), rgba(109,40,217,0.5))",
                  border: "1px solid rgba(124,58,237,0.4)",
                  color: "#c4b5fd",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  textDecoration: "none",
                  flexShrink: 0,
                  transition: "all 0.2s",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                </svg>
                Ver no GitHub
              </a>
            </div>
          )}
        </div>

        {/* Quickstart */}
        {quickstart && quickstart.length > 0 && (
          <div
            style={{
              marginBottom: "2rem",
              borderRadius: "16px",
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.06)",
              background: "rgba(255,255,255,0.02)",
            }}
          >
            <div
              style={{
                padding: "0.75rem 1.25rem",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                background: "rgba(255,255,255,0.03)",
              }}
            >
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-muted)" }}>
                🚀 Como começar — execute na ordem
              </span>
            </div>
            <div style={{ padding: "1.25rem", display: "flex", flexDirection: "column", gap: "1.1rem" }}>
              {quickstart.map((step, i) => (
                <div key={i} style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                  <div
                    style={{
                      flexShrink: 0,
                      width: "1.6rem",
                      height: "1.6rem",
                      borderRadius: "50%",
                      background: "rgba(255,85,0,0.12)",
                      border: "1px solid rgba(255,85,0,0.3)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.7rem",
                      fontWeight: 800,
                      color: "var(--fire-orange)",
                      marginTop: "0.1rem",
                    }}
                  >
                    {i + 1}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: "0.82rem", fontWeight: 600, color: "rgba(255,255,255,0.7)", marginBottom: "0.4rem" }}>
                      {step.label}
                    </p>
                    <pre
                      style={{
                        margin: 0,
                        padding: "0.7rem 1rem",
                        borderRadius: "8px",
                        background: "rgba(0,0,0,0.4)",
                        border: "1px solid rgba(255,255,255,0.07)",
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.78rem",
                        color: "#86efac",
                        lineHeight: 1.7,
                        overflowX: "auto",
                        whiteSpace: "pre-wrap",
                        wordBreak: "break-all",
                      }}
                    >
                      {step.code}
                    </pre>
                    {step.note && (
                      <p style={{ marginTop: "0.35rem", fontSize: "0.75rem", color: "rgba(255,255,255,0.35)", lineHeight: 1.5 }}>
                        {step.note}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Progress */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}>
          <div style={{ flex: 1, height: "8px", background: "rgba(255,255,255,0.06)", borderRadius: "9999px", overflow: "hidden" }}>
            <div
              style={{
                height: "100%",
                width: `${pct}%`,
                background: allDone ? "linear-gradient(90deg,#22c55e,#16a34a)" : "linear-gradient(90deg,#FF5500,#FF8C00)",
                borderRadius: "9999px",
                transition: "width 0.4s ease",
              }}
            />
          </div>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.78rem", color: allDone ? "#4ade80" : "var(--text-muted)", flexShrink: 0 }}>
            {doneReqs}/{totalReqs} {allDone ? "✓ Completo!" : ""}
          </span>
        </div>

        {celebrated && (
          <div
            style={{
              marginBottom: "2rem",
              padding: "1.25rem 1.5rem",
              borderRadius: "14px",
              background: "rgba(34,197,94,0.08)",
              border: "1px solid rgba(34,197,94,0.25)",
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <span style={{ fontSize: "2rem" }}>🎉</span>
            <div>
              <p style={{ fontSize: "1rem", color: "#4ade80", fontWeight: 700 }}>Módulo concluído!</p>
              <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.5 }}>
                +{xp} XP e badge do módulo garantidos. Você dominou {moduleName}. 🔥
              </p>
            </div>
          </div>
        )}

        {/* Sections */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {sections.map((sec) => (
            <div key={sec.section} className="card" style={{ borderRadius: "16px", padding: "1.5rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1rem" }}>
                <span style={{ fontSize: "1.3rem" }}>{sec.icon}</span>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.15rem", letterSpacing: "0.03em", color: "var(--text-primary)" }}>
                  {sec.section}
                </h3>
              </div>
              <ul style={{ listStyle: "none" }}>
                {sec.tasks.map((task) => {
                  const done = checked.has(task.id);
                  return (
                    <li
                      key={task.id}
                      onClick={() => toggle(task.id)}
                      style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start", padding: "0.55rem 0", cursor: "pointer", userSelect: "none" }}
                    >
                      <span
                        style={{
                          width: "1.3rem",
                          height: "1.3rem",
                          borderRadius: "5px",
                          flexShrink: 0,
                          marginTop: "0.1rem",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "0.75rem",
                          fontWeight: 900,
                          transition: "all 0.2s",
                          ...(done
                            ? { background: "linear-gradient(135deg,#22c55e,#16a34a)", color: "#fff", boxShadow: "0 0 8px rgba(34,197,94,0.3)" }
                            : { background: "rgba(255,85,0,0.05)", border: "2px solid rgba(255,85,0,0.3)", color: "transparent" }),
                        }}
                      >
                        ✓
                      </span>
                      <span
                        style={{
                          fontSize: "0.85rem",
                          color: done ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.72)",
                          lineHeight: 1.55,
                          textDecoration: done ? "line-through" : "none",
                        }}
                      >
                        {task.text}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}

          {/* Bonus */}
          {bonus.length > 0 && (
            <div className="card" style={{ borderRadius: "16px", padding: "1.5rem", border: "1px solid rgba(251,191,36,0.15)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1rem" }}>
                <span style={{ fontSize: "1.3rem" }}>⭐</span>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.15rem", letterSpacing: "0.03em", color: "#fbbf24" }}>
                  Bônus (opcional)
                </h3>
              </div>
              <ul style={{ listStyle: "none" }}>
                {bonus.map((b) => {
                  const done = bonusChecked.has(b.id);
                  return (
                    <li
                      key={b.id}
                      onClick={() => toggleBonus(b.id)}
                      style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start", padding: "0.5rem 0", cursor: "pointer", userSelect: "none" }}
                    >
                      <span style={{ color: done ? "#fbbf24" : "rgba(251,191,36,0.4)", flexShrink: 0, marginTop: "0.15rem" }}>
                        {done ? "★" : "☆"}
                      </span>
                      <span style={{ fontSize: "0.83rem", color: done ? "rgba(251,191,36,0.7)" : "rgba(255,255,255,0.55)", lineHeight: 1.5, textDecoration: done ? "line-through" : "none" }}>
                        {b.text}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {/* Criteria */}
          <div
            style={{
              borderRadius: "16px",
              padding: "1.5rem",
              background: "rgba(255,85,0,0.04)",
              border: "1px solid rgba(255,85,0,0.12)",
            }}
          >
            <h3 style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,119,68,0.7)", marginBottom: "1rem" }}>
              ✅ Critérios de avaliação
            </h3>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {criteria.map((c, i) => (
                <li key={i} style={{ display: "flex", gap: "0.6rem", alignItems: "flex-start", fontSize: "0.83rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.5 }}>
                  <span style={{ color: "rgba(255,119,68,0.6)", flexShrink: 0 }}>›</span>
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Back */}
        <div style={{ marginTop: "2.5rem", textAlign: "center" }}>
          <Link
            href={moduleHref}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              padding: "0.7rem 1.5rem",
              borderRadius: "10px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "rgba(255,255,255,0.6)",
              fontSize: "0.85rem",
              textDecoration: "none",
            }}
          >
            ← Voltar para {moduleName}
          </Link>
        </div>
      </main>

      <Footer />

      <style>{`
        @keyframes wofFireFloat {
          0%   { opacity: 1; transform: translateY(0) scale(1) rotate(0deg); }
          100% { opacity: 0; transform: translateY(-65vh) scale(1.8) rotate(20deg); }
        }
      `}</style>
    </div>
    </ActivityGate>
  );
}
