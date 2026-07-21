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
        </div>

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
