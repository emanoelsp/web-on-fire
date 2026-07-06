"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import type {
  Slide,
  CoverSlide,
  ConceptSlide,
  DefinitionSlide,
  ComparisonSlide,
  ArchitectureSlide,
  CodeSlide,
  MiniChallengeSlide,
  QuizSlide,
  FillBlankSlide,
} from "@/types/slides";

interface Props {
  slides: Slide[];
  backHref: string;
  backLabel: string;
  aulaLabel?: string;
  completionHref?: string;
  completionLabel?: string;
}

function getStorageKey(label: string | undefined) {
  return (label ?? "aula").toLowerCase().replace(/[^a-z0-9]/g, "-");
}

function requiresInteraction(slide: Slide) {
  return slide.type === "quiz" || slide.type === "fill-blank";
}

export default function SlidePresentation({
  slides,
  backHref,
  backLabel,
  aulaLabel,
  completionHref,
  completionLabel,
}: Props) {
  const [current, setCurrent] = useState(0);
  const [visited, setVisited] = useState<Set<number>>(new Set([0]));
  const [animKey, setAnimKey] = useState(0);
  const [xp, setXp] = useState(0);
  const [xpToast, setXpToast] = useState<{ amount: number; id: number } | null>(null);
  const [answeredSlides, setAnsweredSlides] = useState<Set<number>>(new Set());
  const [canAdvance, setCanAdvance] = useState(true);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const storageKey = getStorageKey(aulaLabel);

  useEffect(() => {
    try {
      const stored = parseInt(localStorage.getItem("wof_xp") ?? "0", 10);
      setXp(isNaN(stored) ? 0 : stored);
      const raw = localStorage.getItem(`wof_answered_${storageKey}`);
      if (raw) setAnsweredSlides(new Set(JSON.parse(raw) as number[]));
    } catch {}
  }, [storageKey]);

  useEffect(() => {
    const slide = slides[current];
    setCanAdvance(!requiresInteraction(slide) || answeredSlides.has(slide.id));
  }, [current, slides, answeredSlides]);

  const earnXP = useCallback(
    (amount: number, slideId: number) => {
      setAnsweredSlides((prev) => {
        if (prev.has(slideId)) return prev;
        const next = new Set([...prev, slideId]);
        try {
          localStorage.setItem(`wof_answered_${storageKey}`, JSON.stringify([...next]));
        } catch {}
        return next;
      });

      setXp((prev) => {
        const next = prev + amount;
        try { localStorage.setItem("wof_xp", String(next)); } catch {}
        return next;
      });

      if (toastTimer.current) clearTimeout(toastTimer.current);
      setXpToast({ amount, id: Date.now() });
      toastTimer.current = setTimeout(() => setXpToast(null), 2200);

      setCanAdvance(true);
    },
    [storageKey]
  );

  const markAnswered = useCallback(
    (slideId: number) => {
      setAnsweredSlides((prev) => {
        if (prev.has(slideId)) return prev;
        const next = new Set([...prev, slideId]);
        try {
          localStorage.setItem(`wof_answered_${storageKey}`, JSON.stringify([...next]));
        } catch {}
        return next;
      });
      setCanAdvance(true);
    },
    [storageKey]
  );

  const slide = slides[current];
  const isLast = current === slides.length - 1;
  const isFirst = current === 0;
  const progress = ((current + 1) / slides.length) * 100;

  const goTo = useCallback(
    (index: number) => {
      if (index < 0 || index >= slides.length) return;
      setVisited((prev) => new Set([...prev, index]));
      setAnimKey((k) => k + 1);
      setCurrent(index);
    },
    [slides.length]
  );

  const goForward = useCallback(() => {
    if (!canAdvance) return;
    goTo(current + 1);
  }, [canAdvance, current, goTo]);

  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === "ArrowRight" || e.key === " ") goForward();
      if (e.key === "ArrowLeft") goTo(current - 1);
    }
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [current, goTo, goForward]);

  const lastSlide = slides[slides.length - 1];
  const endHref =
    lastSlide.type === "mini-challenge"
      ? (lastSlide.nextHref ?? completionHref ?? "#")
      : (completionHref ?? "#");
  const endLabel =
    lastSlide.type === "mini-challenge"
      ? (lastSlide.nextLabel ?? completionLabel ?? "Próximo →")
      : (completionLabel ?? "Concluído ✓");

  return (
    <div style={{ minHeight: "100vh", background: "var(--dark-1)", display: "flex", flexDirection: "column" }}>
      <Navbar />

      {/* Top progress bar */}
      <div style={{ height: "3px", background: "rgba(255,255,255,0.05)", position: "sticky", top: "64px", zIndex: 40 }}>
        <div
          style={{
            height: "100%",
            width: `${progress}%`,
            background: "linear-gradient(90deg, #FF5500, #FF8C00)",
            transition: "width 0.5s cubic-bezier(0.4,0,0.2,1)",
            boxShadow: "0 0 10px rgba(255,85,0,0.6)",
          }}
        />
      </div>

      {/* XP toast */}
      {xpToast && (
        <div
          key={xpToast.id}
          style={{
            position: "fixed",
            top: "5.5rem",
            right: "1.5rem",
            zIndex: 300,
            padding: "0.55rem 1.2rem",
            borderRadius: "12px",
            background: "linear-gradient(135deg, rgba(255,85,0,0.92), rgba(180,35,0,0.92))",
            border: "1px solid rgba(255,120,0,0.4)",
            boxShadow: "0 4px 24px rgba(255,85,0,0.35)",
            fontFamily: "var(--font-display)",
            fontSize: "1.05rem",
            color: "#fff",
            letterSpacing: "0.04em",
            pointerEvents: "none",
            animation: "wofXpToast 2.2s ease-out both",
          }}
        >
          +{xpToast.amount} XP 🔥
        </div>
      )}

      <main
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          maxWidth: "900px",
          margin: "0 auto",
          width: "100%",
          padding: "3rem 1.5rem 2rem",
        }}
      >
        {/* Top bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <Link
              href={backHref}
              style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--text-muted)", textDecoration: "none" }}
            >
              ← {backLabel}
            </Link>
            {aulaLabel && (
              <>
                <span style={{ color: "rgba(255,255,255,0.1)" }}>/</span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "rgba(255,119,68,0.7)" }}>
                  {aulaLabel}
                </span>
              </>
            )}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            {/* XP chip */}
            {xp > 0 && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.3rem",
                  padding: "0.2rem 0.55rem",
                  borderRadius: "20px",
                  background: "rgba(255,85,0,0.08)",
                  border: "1px solid rgba(255,85,0,0.2)",
                }}
              >
                <span style={{ fontSize: "0.65rem" }}>🔥</span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "#FF7744", fontWeight: 700 }}>
                  {xp} XP
                </span>
              </div>
            )}

            {/* Dot indicators */}
            <div style={{ display: "flex", gap: "0.3rem" }}>
              {slides.map((s, i) => {
                const isInteractive = requiresInteraction(s);
                const answered = answeredSlides.has(s.id);
                return (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    title={`Slide ${i + 1}`}
                    style={{
                      width: i === current ? "1.5rem" : "0.4rem",
                      height: "0.4rem",
                      borderRadius: "9999px",
                      border: "none",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      padding: 0,
                      background:
                        i === current
                          ? "var(--fire-orange)"
                          : isInteractive && !answered
                          ? "rgba(251,191,36,0.35)"
                          : visited.has(i)
                          ? "rgba(255,85,0,0.4)"
                          : "rgba(255,255,255,0.1)",
                    }}
                  />
                );
              })}
            </div>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--text-muted)" }}>
              {current + 1}/{slides.length}
            </span>
          </div>
        </div>

        {/* Slide content */}
        <div
          key={animKey}
          style={{ flex: 1, animation: "wofSlideIn 0.4s cubic-bezier(0.4,0,0.2,1) both" }}
        >
          <SlideContent
            slide={slide}
            completionHref={endHref}
            completionLabel={endLabel}
            isLast={isLast}
            answeredSlides={answeredSlides}
            onEarnXP={earnXP}
            onMarkAnswered={markAnswered}
          />
        </div>

        {/* Nav buttons */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "2.5rem",
            paddingTop: "1.5rem",
            borderTop: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <button
            onClick={() => goTo(current - 1)}
            disabled={isFirst}
            style={{
              padding: "0.65rem 1.5rem",
              borderRadius: "10px",
              border: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(255,255,255,0.03)",
              color: isFirst ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.6)",
              fontSize: "0.85rem",
              fontWeight: 600,
              cursor: isFirst ? "not-allowed" : "pointer",
              fontFamily: "inherit",
              transition: "all 0.2s",
            }}
          >
            ← Anterior
          </button>

          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "rgba(255,255,255,0.12)", letterSpacing: "0.06em" }}>
            {canAdvance ? "Use ← → ou espaço" : ""}
          </span>

          {isLast ? (
            <Link
              href={endHref}
              className="fire-btn"
              style={{ padding: "0.65rem 1.5rem", borderRadius: "10px", color: "#fff", textDecoration: "none", fontSize: "0.85rem", fontWeight: 700 }}
            >
              {endLabel}
            </Link>
          ) : (
            <button
              onClick={goForward}
              className={canAdvance ? "fire-btn" : ""}
              disabled={!canAdvance}
              style={{
                padding: "0.65rem 1.5rem",
                borderRadius: "10px",
                fontSize: "0.85rem",
                fontWeight: 700,
                fontFamily: "inherit",
                cursor: canAdvance ? "pointer" : "not-allowed",
                transition: "all 0.2s",
                ...(!canAdvance
                  ? {
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.07)",
                      color: "rgba(255,255,255,0.2)",
                    }
                  : { color: "#fff" }),
              }}
            >
              {canAdvance ? "Próximo →" : "🔒 Responda primeiro"}
            </button>
          )}
        </div>
      </main>

      <style>{`
        @keyframes wofSlideIn {
          from { opacity: 0; transform: translateX(24px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes wofXpToast {
          0%   { opacity: 0; transform: translateY(-12px) scale(0.88); }
          12%  { opacity: 1; transform: translateY(0) scale(1.04); }
          20%  { transform: translateY(0) scale(1); }
          75%  { opacity: 1; }
          100% { opacity: 0; transform: translateY(-6px); }
        }
        @keyframes wofShake {
          0%,100% { transform: translateX(0); }
          20%     { transform: translateX(-6px); }
          40%     { transform: translateX(6px); }
          60%     { transform: translateX(-4px); }
          80%     { transform: translateX(4px); }
        }
        @keyframes wofFireFloat {
          0%   { opacity: 1; transform: translateY(0) scale(1) rotate(0deg); }
          100% { opacity: 0; transform: translateY(-65vh) scale(1.8) rotate(20deg); }
        }
        @keyframes wofPulseGreen {
          0%,100% { box-shadow: 0 0 0 0 rgba(34,197,94,0); }
          50%     { box-shadow: 0 0 20px 4px rgba(34,197,94,0.25); }
        }
      `}</style>
    </div>
  );
}

// ─── DISPATCHER ─────────────────────────────────────────────────────────────

function SlideContent({
  slide,
  completionHref,
  completionLabel,
  isLast,
  answeredSlides,
  onEarnXP,
  onMarkAnswered,
}: {
  slide: Slide;
  completionHref: string;
  completionLabel: string;
  isLast: boolean;
  answeredSlides: Set<number>;
  onEarnXP: (amount: number, slideId: number) => void;
  onMarkAnswered: (slideId: number) => void;
}) {
  switch (slide.type) {
    case "cover":
      return <SlideCover slide={slide} />;
    case "concept":
    case "best-practices":
      return <SlideConcept slide={slide} />;
    case "definition":
      return <SlideDefinition slide={slide} />;
    case "comparison":
      return <SlideComparison slide={slide} />;
    case "architecture":
      return <SlideArchitecture slide={slide} />;
    case "code":
    case "files":
      return <SlideCode slide={slide} />;
    case "quiz":
      return (
        <SlideQuiz
          slide={slide}
          onEarnXP={onEarnXP}
          onMarkAnswered={onMarkAnswered}
          alreadyAnswered={answeredSlides.has(slide.id)}
        />
      );
    case "fill-blank":
      return (
        <SlideFillBlank
          slide={slide}
          onEarnXP={onEarnXP}
          onMarkAnswered={onMarkAnswered}
          alreadyAnswered={answeredSlides.has(slide.id)}
        />
      );
    case "mini-challenge":
      return (
        <SlideMiniChallenge
          slide={slide}
          completionHref={completionHref}
          completionLabel={completionLabel}
          isLast={isLast}
          onEarnXP={onEarnXP}
        />
      );
  }
}

// ─── HELPERS ────────────────────────────────────────────────────────────────

function Tag({ text }: { text: string }) {
  return (
    <span className="badge badge-fire" style={{ marginBottom: "1.5rem", display: "inline-flex" }}>
      {text}
    </span>
  );
}

function Title({ children, size = "large" }: { children: React.ReactNode; size?: "large" | "medium" }) {
  return (
    <h2
      style={{
        fontFamily: "var(--font-display)",
        fontSize: size === "large" ? "clamp(2rem, 5vw, 3.5rem)" : "clamp(1.6rem, 4vw, 2.5rem)",
        lineHeight: 1,
        letterSpacing: "0.02em",
        color: "var(--text-primary)",
        marginBottom: "1.5rem",
        whiteSpace: "pre-line",
      }}
    >
      {children}
    </h2>
  );
}

function TipBox({ text }: { text: string }) {
  return (
    <div className="tip-box" style={{ marginTop: "1.5rem", maxWidth: "700px" }}>
      <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.6 }}>
        💡 <strong style={{ color: "#FF7744" }}>Dica:</strong> {text}
      </p>
    </div>
  );
}

// ─── RENDERERS ──────────────────────────────────────────────────────────────

function SlideCover({ slide }: { slide: CoverSlide }) {
  return (
    <div style={{ textAlign: "center", paddingTop: "3rem" }}>
      <div style={{ position: "relative", display: "inline-block", marginBottom: "2rem" }}>
        <div
          style={{
            position: "absolute",
            inset: "-40px",
            background: "radial-gradient(ellipse, rgba(255,85,0,0.15) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <span style={{ fontSize: "5rem", display: "block" }}>⚡</span>
      </div>
      <Tag text={slide.tag} />
      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(3.5rem, 10vw, 7rem)",
          lineHeight: 0.9,
          letterSpacing: "0.02em",
          whiteSpace: "pre-line",
        }}
      >
        <span className="fire-text">{slide.title}</span>
      </h1>
      {slide.subtitle && (
        <p style={{ marginTop: "2rem", fontSize: "1.1rem", color: "var(--text-muted)", lineHeight: 1.7, maxWidth: "480px", margin: "2rem auto 0" }}>
          {slide.subtitle}
        </p>
      )}
    </div>
  );
}

function SlideConcept({ slide }: { slide: ConceptSlide }) {
  return (
    <div>
      <Tag text={slide.tag} />
      <Title>{slide.title}</Title>
      {slide.subtitle && (
        <p style={{ color: "var(--text-muted)", marginBottom: "1.25rem", fontSize: "0.9rem" }}>
          {slide.subtitle}
        </p>
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", maxWidth: "700px" }}>
        {slide.items.map((item, i) => (
          <div key={i} className="card" style={{ borderRadius: "12px", padding: "1rem 1.25rem", display: "flex", alignItems: "flex-start", gap: "1rem" }}>
            <span style={{ fontSize: "1.4rem", flexShrink: 0, marginTop: "0.1rem" }}>{item.icon}</span>
            <p style={{ fontSize: "0.92rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.65 }}>{item.text}</p>
          </div>
        ))}
      </div>
      {slide.tip && <TipBox text={slide.tip} />}
    </div>
  );
}

function SlideDefinition({ slide }: { slide: DefinitionSlide }) {
  const highlights = slide.highlights ?? [];
  const highlighted = highlights.reduce(
    (acc, h) =>
      acc.replace(
        h,
        `<mark style="background:rgba(255,85,0,0.15);color:#FF7744;border-radius:4px;padding:0 3px">${h}</mark>`
      ),
    slide.quote
  );

  return (
    <div>
      <Tag text={slide.tag} />
      <Title>{slide.title}</Title>
      <div
        style={{
          maxWidth: "700px",
          padding: "2.5rem",
          borderRadius: "16px",
          background: "var(--dark-2)",
          border: "1px solid rgba(255,85,0,0.2)",
          boxShadow: "0 0 40px rgba(255,85,0,0.06)",
          position: "relative",
        }}
      >
        <span style={{ position: "absolute", top: "1rem", left: "1.5rem", fontFamily: "var(--font-display)", fontSize: "4rem", lineHeight: 1, color: "rgba(255,85,0,0.15)" }}>
          &ldquo;
        </span>
        <p
          style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.8)", lineHeight: 1.8, paddingTop: "1rem" }}
          dangerouslySetInnerHTML={{ __html: highlighted }}
        />
      </div>
      {slide.tip && <TipBox text={slide.tip} />}
    </div>
  );
}

function SlideComparison({ slide }: { slide: ComparisonSlide }) {
  return (
    <div>
      <Tag text={slide.tag} />
      <Title>{slide.title}</Title>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem", maxWidth: "720px" }}>
        {[{ col: slide.left, idx: 0 }, { col: slide.right, idx: 1 }].map(({ col, idx }) => (
          <div key={col.label} className="card" style={{ borderRadius: "14px", padding: "1.5rem", border: idx === 1 ? "1px solid rgba(255,85,0,0.25)" : undefined }}>
            <div style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", letterSpacing: "0.04em", marginBottom: "1rem", color: idx === 1 ? "#FF7744" : "var(--text-muted)" }}>
              {col.label}
            </div>
            <ul style={{ listStyle: "none" }}>
              {col.items.map((item, ii) => (
                <li key={ii} style={{ fontSize: "0.83rem", color: idx === 1 ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0.35)", padding: "0.35rem 0", borderBottom: "1px solid rgba(255,255,255,0.04)", display: "flex", gap: "0.5rem", alignItems: "flex-start", lineHeight: 1.5 }}>
                  <span style={{ color: idx === 1 ? "var(--fire-orange)" : "rgba(255,255,255,0.15)", fontSize: "0.65rem", marginTop: "0.25rem", flexShrink: 0 }}>
                    {idx === 1 ? "✓" : "·"}
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      {slide.tip && <TipBox text={slide.tip} />}
    </div>
  );
}

function SlideArchitecture({ slide }: { slide: ArchitectureSlide }) {
  return (
    <div>
      <Tag text={slide.tag} />
      <Title>{slide.title}</Title>
      {slide.subtitle && (
        <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem", fontSize: "0.9rem" }}>{slide.subtitle}</p>
      )}
      <div style={{ maxWidth: "600px" }}>
        {slide.steps.map((step, i) => (
          <div key={i} style={{ display: "flex", gap: "1rem", alignItems: "flex-start", paddingBottom: i < slide.steps.length - 1 ? "1rem" : 0, position: "relative" }}>
            {i < slide.steps.length - 1 && (
              <div style={{ position: "absolute", left: "1.35rem", top: "2.8rem", width: "2px", height: "calc(100% - 0.75rem)", background: "linear-gradient(to bottom, rgba(255,85,0,0.4), rgba(255,85,0,0.05))" }} />
            )}
            <div style={{ width: "2.7rem", height: "2.7rem", borderRadius: "50%", background: "linear-gradient(135deg, #FF5500, #CC2200)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem", flexShrink: 0, boxShadow: "0 0 15px rgba(255,85,0,0.3)", zIndex: 1 }}>
              {step.icon}
            </div>
            <div style={{ paddingTop: "0.5rem" }}>
              <p style={{ fontSize: "0.92rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.6 }}>{step.text}</p>
            </div>
          </div>
        ))}
      </div>
      {slide.tip && <TipBox text={slide.tip} />}
    </div>
  );
}

function SlideCode({ slide }: { slide: CodeSlide }) {
  return (
    <div>
      <Tag text={slide.tag} />
      <Title size="medium">{slide.title}</Title>
      <div style={{ maxWidth: "780px" }}>
        {slide.codeLabel && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.5rem 1rem",
              background: "#0a0a0a",
              borderRadius: "10px 10px 0 0",
              border: "1px solid rgba(255,85,0,0.15)",
              borderBottom: "none",
              fontFamily: "var(--font-mono)",
              fontSize: "0.72rem",
              color: "rgba(255,119,68,0.7)",
            }}
          >
            {slide.type === "files" ? (
              <span>📁 {slide.codeLabel}</span>
            ) : (
              <>
                <span style={{ opacity: 0.5 }}>●</span>
                <span style={{ opacity: 0.5 }}>●</span>
                <span style={{ opacity: 0.5 }}>●</span>
                <span style={{ marginLeft: "0.5rem" }}>{slide.codeLabel}</span>
              </>
            )}
          </div>
        )}
        <pre
          className="code-block"
          style={{
            margin: 0,
            fontFamily: "var(--font-mono)",
            fontSize: "0.78rem",
            lineHeight: 1.85,
            borderRadius: slide.codeLabel ? "0 0 10px 10px" : undefined,
            whiteSpace: "pre",
            overflowX: "auto",
          }}
        >
          {slide.code}
        </pre>
      </div>
      {slide.tip && <TipBox text={slide.tip} />}
    </div>
  );
}

function SlideQuiz({
  slide,
  onEarnXP,
  onMarkAnswered,
  alreadyAnswered,
}: {
  slide: QuizSlide;
  onEarnXP: (amount: number, slideId: number) => void;
  onMarkAnswered: (slideId: number) => void;
  alreadyAnswered: boolean;
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const [shaking, setShaking] = useState(false);

  const correctIdx = slide.options.findIndex((o) => o.correct);
  const answered = selected !== null || alreadyAnswered;

  function handleSelect(idx: number) {
    if (answered) return;
    setSelected(idx);
    if (slide.options[idx].correct) {
      onEarnXP(slide.xp ?? 15, slide.id);
    } else {
      setShaking(true);
      setTimeout(() => setShaking(false), 500);
      onMarkAnswered(slide.id);
    }
  }

  return (
    <div>
      <Tag text={slide.tag} />
      <Title size="medium">{slide.title}</Title>

      {/* Question */}
      <div
        style={{
          maxWidth: "680px",
          padding: "1.25rem 1.5rem",
          borderRadius: "12px",
          background: "var(--dark-2)",
          border: "1px solid rgba(255,85,0,0.12)",
          marginBottom: "1.5rem",
        }}
      >
        <p style={{ fontSize: "0.98rem", color: "rgba(255,255,255,0.82)", lineHeight: 1.65, fontStyle: "italic" }}>
          {slide.question}
        </p>
      </div>

      {/* Options */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.55rem", maxWidth: "680px" }}>
        {slide.options.map((opt, i) => {
          const isSelected = selected === i;
          const isCorrect = opt.correct;
          const showCorrect = answered && isCorrect;
          const showWrong = answered && isSelected && !isCorrect;

          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={answered}
              style={{
                padding: "0.9rem 1.25rem",
                borderRadius: "10px",
                textAlign: "left",
                cursor: answered ? "default" : "pointer",
                fontFamily: "inherit",
                fontSize: "0.88rem",
                lineHeight: 1.4,
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                transition: "all 0.2s",
                animation: showWrong && shaking ? "wofShake 0.4s ease" : "none",
                ...(showCorrect
                  ? { background: "rgba(34,197,94,0.09)", border: "1.5px solid rgba(34,197,94,0.38)", color: "#4ade80" }
                  : showWrong
                  ? { background: "rgba(239,68,68,0.07)", border: "1.5px solid rgba(239,68,68,0.32)", color: "#f87171" }
                  : answered
                  ? { background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.22)" }
                  : { background: "var(--dark-2)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.75)" }),
              }}
            >
              <span
                style={{
                  width: "1.75rem",
                  height: "1.75rem",
                  borderRadius: "6px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  flexShrink: 0,
                  fontFamily: "var(--font-mono)",
                  transition: "all 0.2s",
                  background: showCorrect
                    ? "rgba(34,197,94,0.2)"
                    : showWrong
                    ? "rgba(239,68,68,0.15)"
                    : answered
                    ? "rgba(255,255,255,0.04)"
                    : "rgba(255,85,0,0.1)",
                }}
              >
                {showCorrect ? "✓" : showWrong ? "✗" : String.fromCharCode(65 + i)}
              </span>
              <span style={{ flex: 1 }}>{opt.text}</span>
            </button>
          );
        })}
      </div>

      {/* Explanation panel */}
      {selected !== null && (
        <div
          style={{
            marginTop: "1.25rem",
            maxWidth: "680px",
            padding: "1rem 1.25rem",
            borderRadius: "10px",
            ...(slide.options[selected].correct
              ? { background: "rgba(34,197,94,0.05)", border: "1px solid rgba(34,197,94,0.18)" }
              : { background: "rgba(239,68,68,0.05)", border: "1px solid rgba(239,68,68,0.18)" }),
          }}
        >
          <p style={{ fontSize: "0.82rem", fontWeight: 700, marginBottom: "0.3rem", color: slide.options[selected].correct ? "#4ade80" : "#f87171" }}>
            {slide.options[selected].correct ? "✓ Correto!" : "✗ Não é essa"}
          </p>
          <p style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.62)", lineHeight: 1.6 }}>
            {slide.options[selected].explanation}
          </p>
          {!slide.options[selected].correct && (
            <p style={{ fontSize: "0.78rem", color: "rgba(34,197,94,0.6)", marginTop: "0.4rem" }}>
              ✓ Resposta correta: {slide.options[correctIdx].text}
            </p>
          )}
        </div>
      )}

      {alreadyAnswered && selected === null && (
        <div style={{ marginTop: "1rem", display: "inline-flex", alignItems: "center", gap: "0.4rem", padding: "0.4rem 0.8rem", borderRadius: "7px", background: "rgba(34,197,94,0.05)", border: "1px solid rgba(34,197,94,0.14)" }}>
          <span style={{ fontSize: "0.72rem", color: "rgba(34,197,94,0.65)" }}>✓ Já respondido</span>
        </div>
      )}

      {!answered && (
        <p style={{ marginTop: "1rem", fontSize: "0.68rem", color: "rgba(255,255,255,0.16)", fontFamily: "var(--font-mono)" }}>
          Selecione uma opção para desbloquear o próximo slide
        </p>
      )}
    </div>
  );
}

function SlideFillBlank({
  slide,
  onEarnXP,
  onMarkAnswered,
  alreadyAnswered,
}: {
  slide: FillBlankSlide;
  onEarnXP: (amount: number, slideId: number) => void;
  onMarkAnswered: (slideId: number) => void;
  alreadyAnswered: boolean;
}) {
  const [value, setValue] = useState("");
  const [status, setStatus] = useState<"idle" | "correct" | "wrong">("idle");
  const inputRef = useRef<HTMLInputElement>(null);

  function normalize(s: string) {
    return s.trim().replace(/['"]/g, '"').replace(/;$/, "").toLowerCase();
  }

  function handleVerify() {
    if (!value.trim()) return;
    const isCorrect = normalize(value) === normalize(slide.answer);
    if (isCorrect) {
      setStatus("correct");
      onEarnXP(slide.xp ?? 20, slide.id);
    } else {
      setStatus("wrong");
      onMarkAnswered(slide.id);
    }
  }

  const locked = status === "correct" || alreadyAnswered;

  return (
    <div>
      <Tag text={slide.tag} />
      <Title size="medium">{slide.title}</Title>

      <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", marginBottom: "1.5rem", lineHeight: 1.65 }}>
        {slide.instruction}
      </p>

      {/* Code block with inline input */}
      <div style={{ maxWidth: "680px", marginBottom: "1.25rem" }}>
        <div
          className="code-block"
          style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", lineHeight: 1.9, borderRadius: "10px", padding: "1.25rem 1.5rem" }}
        >
          {slide.prefix && (
            <div style={{ color: "rgba(255,255,255,0.28)", marginBottom: "0.4rem", whiteSpace: "pre" }}>
              {slide.prefix}
            </div>
          )}
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <span style={{ color: "rgba(255,119,68,0.5)", fontSize: "0.72rem" }}>▶</span>
            <input
              ref={inputRef}
              type="text"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                if (status === "wrong") setStatus("idle");
              }}
              onKeyDown={(e) => { if (e.key === "Enter") handleVerify(); }}
              placeholder={`"resposta aqui"`}
              disabled={locked}
              autoFocus
              style={{
                background:
                  status === "correct"
                    ? "rgba(34,197,94,0.08)"
                    : status === "wrong"
                    ? "rgba(239,68,68,0.08)"
                    : "rgba(255,85,0,0.06)",
                border:
                  status === "correct"
                    ? "1px solid rgba(34,197,94,0.32)"
                    : status === "wrong"
                    ? "1px solid rgba(239,68,68,0.28)"
                    : "1px solid rgba(255,85,0,0.22)",
                borderRadius: "6px",
                color: status === "correct" ? "#4ade80" : status === "wrong" ? "#f87171" : "#FF9966",
                fontFamily: "var(--font-mono)",
                fontSize: "0.8rem",
                padding: "0.22rem 0.7rem",
                outline: "none",
                minWidth: "220px",
                transition: "all 0.2s",
              }}
            />
          </div>
          {slide.suffix && (
            <div style={{ color: "rgba(255,255,255,0.28)", marginTop: "0.4rem", whiteSpace: "pre" }}>
              {slide.suffix}
            </div>
          )}
        </div>
      </div>

      {/* Feedback */}
      {status === "correct" && (
        <div style={{ maxWidth: "680px", padding: "0.85rem 1.1rem", borderRadius: "9px", background: "rgba(34,197,94,0.06)", border: "1px solid rgba(34,197,94,0.18)", marginBottom: "0.75rem" }}>
          <p style={{ fontSize: "0.83rem", color: "#4ade80", fontWeight: 700 }}>✓ Perfeito!</p>
          {slide.tip && <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.55)", marginTop: "0.25rem", lineHeight: 1.5 }}>{slide.tip}</p>}
        </div>
      )}

      {status === "wrong" && (
        <div style={{ maxWidth: "680px", padding: "0.85rem 1.1rem", borderRadius: "9px", background: "rgba(239,68,68,0.05)", border: "1px solid rgba(239,68,68,0.18)", marginBottom: "0.75rem" }}>
          <p style={{ fontSize: "0.83rem", color: "#f87171", fontWeight: 700, marginBottom: "0.25rem" }}>✗ Quase lá</p>
          {slide.hint && <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.5 }}>💡 {slide.hint}</p>}
        </div>
      )}

      {alreadyAnswered && status === "idle" && (
        <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", padding: "0.4rem 0.8rem", borderRadius: "7px", background: "rgba(34,197,94,0.05)", border: "1px solid rgba(34,197,94,0.14)", marginBottom: "0.75rem" }}>
          <span style={{ fontSize: "0.72rem", color: "rgba(34,197,94,0.65)" }}>✓ Já respondido</span>
        </div>
      )}

      {/* Actions */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginTop: "0.25rem" }}>
        {status === "idle" && !alreadyAnswered && (
          <>
            <button
              onClick={handleVerify}
              disabled={!value.trim()}
              className={value.trim() ? "fire-btn" : ""}
              style={{
                padding: "0.6rem 1.5rem",
                borderRadius: "8px",
                fontSize: "0.83rem",
                fontWeight: 700,
                fontFamily: "inherit",
                cursor: value.trim() ? "pointer" : "not-allowed",
                opacity: value.trim() ? 1 : 0.35,
                ...(!value.trim() ? { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.3)" } : {}),
              }}
            >
              Verificar →
            </button>
            <p style={{ fontSize: "0.67rem", color: "rgba(255,255,255,0.14)", fontFamily: "var(--font-mono)" }}>
              Enter para verificar
            </p>
          </>
        )}

        {status === "wrong" && (
          <button
            onClick={() => {
              setStatus("idle");
              setValue("");
              setTimeout(() => inputRef.current?.focus(), 60);
            }}
            style={{
              padding: "0.6rem 1.25rem",
              borderRadius: "8px",
              fontSize: "0.83rem",
              fontWeight: 600,
              fontFamily: "inherit",
              cursor: "pointer",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.07)",
              color: "rgba(255,255,255,0.5)",
            }}
          >
            Tentar novamente
          </button>
        )}
      </div>

      {status === "idle" && !alreadyAnswered && !value.trim() && (
        <p style={{ marginTop: "0.75rem", fontSize: "0.68rem", color: "rgba(255,255,255,0.14)", fontFamily: "var(--font-mono)" }}>
          Digite e pressione Verificar para desbloquear o próximo slide
        </p>
      )}
    </div>
  );
}

function SlideMiniChallenge({
  slide,
  completionHref,
  completionLabel,
  isLast,
  onEarnXP,
}: {
  slide: MiniChallengeSlide;
  completionHref: string;
  completionLabel: string;
  isLast: boolean;
  onEarnXP: (amount: number, slideId: number) => void;
}) {
  const [checked, setChecked] = useState<Set<number>>(new Set());
  const [celebrating, setCelebrating] = useState(false);
  const [xpAwarded, setXpAwarded] = useState(false);

  const totalRequired = slide.tasks.length;
  const doneCount = checked.size;
  const allDone = doneCount >= totalRequired;
  const href = slide.nextHref ?? completionHref;
  const label = slide.nextLabel ?? completionLabel;

  useEffect(() => {
    if (allDone && !celebrating) {
      setCelebrating(true);
      if (!xpAwarded) {
        setXpAwarded(true);
        onEarnXP(slide.xp ?? 50, slide.id);
      }
    }
    if (!allDone && celebrating) {
      setCelebrating(false);
    }
  }, [allDone, celebrating, xpAwarded, onEarnXP, slide.xp, slide.id]);

  function toggle(i: number) {
    setChecked((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  }

  const firePositions = [4, 12, 20, 29, 37, 46, 55, 63, 72, 80, 88, 95];
  const fireSizes = [1.1, 1.4, 1.0, 1.6, 1.2, 1.8, 1.0, 1.5, 1.3, 1.1, 1.7, 1.2];
  const fireDelays = [0, 0.18, 0.34, 0.08, 0.45, 0.22, 0.55, 0.12, 0.4, 0.28, 0.05, 0.38];
  const fireDurations = [1.6, 2.0, 1.4, 1.8, 2.2, 1.5, 1.9, 1.7, 2.1, 1.6, 1.8, 2.0];

  return (
    <div>
      {/* Fire celebration */}
      {celebrating && (
        <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 100 }}>
          {firePositions.map((left, i) => (
            <span
              key={i}
              style={{
                position: "absolute",
                bottom: "-1rem",
                left: `${left}%`,
                fontSize: `${fireSizes[i]}rem`,
                animation: `wofFireFloat ${fireDurations[i]}s ease-out ${fireDelays[i]}s both`,
                display: "block",
              }}
            >
              🔥
            </span>
          ))}
        </div>
      )}

      <Tag text={slide.tag} />
      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
          lineHeight: 0.95,
          letterSpacing: "0.02em",
          marginBottom: "0.5rem",
        }}
      >
        <span className="fire-text">{slide.title}</span>
      </h2>
      {slide.subtitle && (
        <p style={{ color: "var(--text-muted)", marginBottom: "2rem" }}>{slide.subtitle}</p>
      )}

      {/* Progress bar */}
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem", maxWidth: "680px" }}>
        <div style={{ flex: 1, height: "6px", background: "rgba(255,255,255,0.06)", borderRadius: "9999px", overflow: "hidden" }}>
          <div
            style={{
              height: "100%",
              width: `${(doneCount / totalRequired) * 100}%`,
              background: allDone ? "linear-gradient(90deg, #22c55e, #16a34a)" : "linear-gradient(90deg, #FF5500, #FF8C00)",
              transition: "width 0.4s ease",
              borderRadius: "9999px",
              ...(allDone ? { animation: "wofPulseGreen 2s ease infinite" } : {}),
            }}
          />
        </div>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: allDone ? "#4ade80" : "var(--text-muted)", flexShrink: 0, transition: "color 0.3s" }}>
          {doneCount}/{totalRequired}
          {allDone ? " ✓ Completo!" : ""}
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1rem", maxWidth: "780px" }}>
        {/* Tasks */}
        <div
          className="card fire-border"
          style={{
            borderRadius: "14px",
            padding: "1.5rem",
            ...(allDone ? { border: "1px solid rgba(34,197,94,0.25)", animation: "wofPulseGreen 2.5s ease infinite" } : {}),
          }}
        >
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: allDone ? "rgba(34,197,94,0.6)" : "rgba(255,119,68,0.6)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "1rem", transition: "color 0.3s" }}>
            {allDone ? "✓ Tarefas concluídas" : "Tarefas"}
          </div>
          <ul style={{ listStyle: "none" }}>
            {slide.tasks.map((task, i) => (
              <li
                key={i}
                onClick={() => toggle(i)}
                style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start", padding: "0.55rem 0", borderBottom: i < slide.tasks.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none", cursor: "pointer", userSelect: "none" }}
              >
                <span
                  style={{
                    width: "1.3rem",
                    height: "1.3rem",
                    borderRadius: "5px",
                    flexShrink: 0,
                    marginTop: "0.1rem",
                    transition: "all 0.2s",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.75rem",
                    fontWeight: 900,
                    ...(checked.has(i)
                      ? { background: "linear-gradient(135deg, #22c55e, #16a34a)", border: "none", color: "#fff", boxShadow: "0 0 8px rgba(34,197,94,0.3)" }
                      : { background: "rgba(255,85,0,0.05)", border: "2px solid rgba(255,85,0,0.3)", color: "transparent" }),
                  }}
                >
                  ✓
                </span>
                <span
                  style={{
                    fontSize: "0.82rem",
                    color: checked.has(i) ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.7)",
                    lineHeight: 1.5,
                    textDecoration: checked.has(i) ? "line-through" : "none",
                    transition: "all 0.2s",
                  }}
                >
                  {task}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Bonus */}
        {slide.bonus && slide.bonus.length > 0 && (
          <div className="card" style={{ borderRadius: "14px", padding: "1.5rem" }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "rgba(251,191,36,0.6)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "1rem" }}>
              🏆 Bônus
            </div>
            <ul style={{ listStyle: "none" }}>
              {slide.bonus.map((b, i) => (
                <li key={i} style={{ display: "flex", gap: "0.6rem", alignItems: "flex-start", padding: "0.5rem 0", borderBottom: i < slide.bonus!.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none", fontSize: "0.82rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.5 }}>
                  <span style={{ color: "rgba(251,191,36,0.5)", flexShrink: 0 }}>⭐</span>
                  {b}
                </li>
              ))}
            </ul>

            {isLast && (
              <Link
                href={href}
                className="fire-btn"
                style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", marginTop: "1.25rem", padding: "0.6rem 1.25rem", borderRadius: "8px", color: "#fff", textDecoration: "none", fontSize: "0.82rem", fontWeight: 700 }}
              >
                {label}
              </Link>
            )}
          </div>
        )}
      </div>

      {/* Celebration message */}
      {celebrating && (
        <div
          style={{
            marginTop: "1.5rem",
            maxWidth: "680px",
            padding: "1rem 1.25rem",
            borderRadius: "12px",
            background: "rgba(34,197,94,0.07)",
            border: "1px solid rgba(34,197,94,0.22)",
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
          }}
        >
          <span style={{ fontSize: "1.5rem" }}>🎉</span>
          <div>
            <p style={{ fontSize: "0.9rem", color: "#4ade80", fontWeight: 700, marginBottom: "0.15rem" }}>
              Missão cumprida!
            </p>
            <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.5 }}>
              {slide.xp ?? 50} XP ganhos. Continue para a próxima aula!
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
