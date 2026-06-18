"use client";

import { useState, useEffect, useCallback } from "react";
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
} from "@/types/slides";

interface Props {
  slides: Slide[];
  backHref: string;
  backLabel: string;
  aulaLabel?: string;
  completionHref?: string;
  completionLabel?: string;
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

  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if (e.key === "ArrowRight" || e.key === " ") goTo(current + 1);
      if (e.key === "ArrowLeft") goTo(current - 1);
    }
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [current, goTo]);

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
    <div
      style={{
        minHeight: "100vh",
        background: "var(--dark-1)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Navbar />

      {/* Progress bar */}
      <div
        style={{
          height: "3px",
          background: "rgba(255,255,255,0.05)",
          position: "sticky",
          top: "64px",
          zIndex: 40,
        }}
      >
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
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "2.5rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <Link
              href={backHref}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.72rem",
                color: "var(--text-muted)",
                textDecoration: "none",
              }}
            >
              ← {backLabel}
            </Link>
            {aulaLabel && (
              <>
                <span style={{ color: "rgba(255,255,255,0.1)" }}>/</span>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.72rem",
                    color: "rgba(255,119,68,0.7)",
                  }}
                >
                  {aulaLabel}
                </span>
              </>
            )}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div style={{ display: "flex", gap: "0.3rem" }}>
              {slides.map((_, i) => (
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
                    background:
                      i === current
                        ? "var(--fire-orange)"
                        : visited.has(i)
                        ? "rgba(255,85,0,0.4)"
                        : "rgba(255,255,255,0.1)",
                    padding: 0,
                  }}
                />
              ))}
            </div>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.72rem",
                color: "var(--text-muted)",
              }}
            >
              {current + 1}/{slides.length}
            </span>
          </div>
        </div>

        {/* Slide */}
        <div
          key={animKey}
          style={{ flex: 1, animation: "wofSlideIn 0.4s cubic-bezier(0.4,0,0.2,1) both" }}
        >
          <SlideContent
            slide={slide}
            completionHref={endHref}
            completionLabel={endLabel}
            isLast={isLast}
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
              color: isFirst ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.6)",
              fontSize: "0.85rem",
              fontWeight: 600,
              cursor: isFirst ? "not-allowed" : "pointer",
              fontFamily: "inherit",
              transition: "all 0.2s",
            }}
          >
            ← Anterior
          </button>

          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.65rem",
              color: "rgba(255,255,255,0.15)",
              letterSpacing: "0.06em",
            }}
          >
            Use ← → ou espaço
          </span>

          {isLast ? (
            <Link
              href={endHref}
              className="fire-btn"
              style={{
                padding: "0.65rem 1.5rem",
                borderRadius: "10px",
                color: "#fff",
                textDecoration: "none",
                fontSize: "0.85rem",
                fontWeight: 700,
              }}
            >
              {endLabel}
            </Link>
          ) : (
            <button
              onClick={() => goTo(current + 1)}
              className="fire-btn"
              style={{
                padding: "0.65rem 1.5rem",
                borderRadius: "10px",
                color: "#fff",
                fontSize: "0.85rem",
                fontWeight: 700,
                fontFamily: "inherit",
                cursor: "pointer",
              }}
            >
              Próximo →
            </button>
          )}
        </div>
      </main>

      <style>{`
        @keyframes wofSlideIn {
          from { opacity: 0; transform: translateX(24px); }
          to   { opacity: 1; transform: translateX(0); }
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
}: {
  slide: Slide;
  completionHref: string;
  completionLabel: string;
  isLast: boolean;
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
    case "mini-challenge":
      return (
        <SlideMiniChallenge
          slide={slide}
          completionHref={completionHref}
          completionLabel={completionLabel}
          isLast={isLast}
        />
      );
  }
}

// ─── HELPERS ────────────────────────────────────────────────────────────────

function Tag({ text }: { text: string }) {
  return (
    <span
      className="badge badge-fire"
      style={{ marginBottom: "1.5rem", display: "inline-flex" }}
    >
      {text}
    </span>
  );
}

function Title({
  children,
  size = "large",
}: {
  children: React.ReactNode;
  size?: "large" | "medium";
}) {
  return (
    <h2
      style={{
        fontFamily: "var(--font-display)",
        fontSize:
          size === "large"
            ? "clamp(2rem, 5vw, 3.5rem)"
            : "clamp(1.6rem, 4vw, 2.5rem)",
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

// ─── RENDERERS ──────────────────────────────────────────────────────────────

function SlideCover({ slide }: { slide: CoverSlide }) {
  return (
    <div style={{ textAlign: "center", paddingTop: "3rem" }}>
      <div
        style={{
          position: "relative",
          display: "inline-block",
          marginBottom: "2rem",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: "-40px",
            background:
              "radial-gradient(ellipse, rgba(255,85,0,0.15) 0%, transparent 70%)",
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
        <p
          style={{
            marginTop: "2rem",
            fontSize: "1.1rem",
            color: "var(--text-muted)",
            lineHeight: 1.7,
            maxWidth: "480px",
            margin: "2rem auto 0",
          }}
        >
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
        <p
          style={{
            color: "var(--text-muted)",
            marginBottom: "1.25rem",
            fontSize: "0.9rem",
          }}
        >
          {slide.subtitle}
        </p>
      )}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.75rem",
          maxWidth: "700px",
        }}
      >
        {slide.items.map((item, i) => (
          <div
            key={i}
            className="card"
            style={{
              borderRadius: "12px",
              padding: "1rem 1.25rem",
              display: "flex",
              alignItems: "flex-start",
              gap: "1rem",
            }}
          >
            <span
              style={{
                fontSize: "1.4rem",
                flexShrink: 0,
                marginTop: "0.1rem",
              }}
            >
              {item.icon}
            </span>
            <p
              style={{
                fontSize: "0.92rem",
                color: "rgba(255,255,255,0.75)",
                lineHeight: 1.65,
              }}
            >
              {item.text}
            </p>
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
        <span
          style={{
            position: "absolute",
            top: "1rem",
            left: "1.5rem",
            fontFamily: "var(--font-display)",
            fontSize: "4rem",
            lineHeight: 1,
            color: "rgba(255,85,0,0.15)",
          }}
        >
          &ldquo;
        </span>
        <p
          style={{
            fontSize: "1.05rem",
            color: "rgba(255,255,255,0.8)",
            lineHeight: 1.8,
            paddingTop: "1rem",
          }}
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

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1.25rem",
          maxWidth: "720px",
        }}
      >
        {[
          { col: slide.left, idx: 0 },
          { col: slide.right, idx: 1 },
        ].map(({ col, idx }) => (
          <div
            key={col.label}
            className="card"
            style={{
              borderRadius: "14px",
              padding: "1.5rem",
              border:
                idx === 1 ? "1px solid rgba(255,85,0,0.25)" : undefined,
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.1rem",
                letterSpacing: "0.04em",
                marginBottom: "1rem",
                color: idx === 1 ? "#FF7744" : "var(--text-muted)",
              }}
            >
              {col.label}
            </div>
            <ul style={{ listStyle: "none" }}>
              {col.items.map((item, ii) => (
                <li
                  key={ii}
                  style={{
                    fontSize: "0.83rem",
                    color:
                      idx === 1
                        ? "rgba(255,255,255,0.75)"
                        : "rgba(255,255,255,0.35)",
                    padding: "0.35rem 0",
                    borderBottom: "1px solid rgba(255,255,255,0.04)",
                    display: "flex",
                    gap: "0.5rem",
                    alignItems: "flex-start",
                    lineHeight: 1.5,
                  }}
                >
                  <span
                    style={{
                      color:
                        idx === 1
                          ? "var(--fire-orange)"
                          : "rgba(255,255,255,0.15)",
                      fontSize: "0.65rem",
                      marginTop: "0.25rem",
                      flexShrink: 0,
                    }}
                  >
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
        <p
          style={{
            color: "var(--text-muted)",
            marginBottom: "1.5rem",
            fontSize: "0.9rem",
          }}
        >
          {slide.subtitle}
        </p>
      )}

      <div style={{ maxWidth: "600px" }}>
        {slide.steps.map((step, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              gap: "1rem",
              alignItems: "flex-start",
              paddingBottom: i < slide.steps.length - 1 ? "1rem" : 0,
              position: "relative",
            }}
          >
            {i < slide.steps.length - 1 && (
              <div
                style={{
                  position: "absolute",
                  left: "1.35rem",
                  top: "2.8rem",
                  width: "2px",
                  height: "calc(100% - 0.75rem)",
                  background:
                    "linear-gradient(to bottom, rgba(255,85,0,0.4), rgba(255,85,0,0.05))",
                }}
              />
            )}
            <div
              style={{
                width: "2.7rem",
                height: "2.7rem",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #FF5500, #CC2200)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1rem",
                flexShrink: 0,
                boxShadow: "0 0 15px rgba(255,85,0,0.3)",
                zIndex: 1,
              }}
            >
              {step.icon}
            </div>
            <div style={{ paddingTop: "0.5rem" }}>
              <p
                style={{
                  fontSize: "0.92rem",
                  color: "rgba(255,255,255,0.75)",
                  lineHeight: 1.6,
                }}
              >
                {step.text}
              </p>
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

function SlideMiniChallenge({
  slide,
  completionHref,
  completionLabel,
  isLast,
}: {
  slide: MiniChallengeSlide;
  completionHref: string;
  completionLabel: string;
  isLast: boolean;
}) {
  const [checked, setChecked] = useState<Set<number>>(new Set());
  const totalRequired = slide.tasks.length;
  const doneCount = checked.size;
  const allDone = doneCount >= totalRequired;
  const href = slide.nextHref ?? completionHref;
  const label = slide.nextLabel ?? completionLabel;

  function toggle(i: number) {
    setChecked((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  }

  return (
    <div>
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
        <p style={{ color: "var(--text-muted)", marginBottom: "2rem" }}>
          {slide.subtitle}
        </p>
      )}

      {/* Progress */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          marginBottom: "1.5rem",
          maxWidth: "680px",
        }}
      >
        <div
          style={{
            flex: 1,
            height: "6px",
            background: "rgba(255,255,255,0.06)",
            borderRadius: "9999px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${(doneCount / totalRequired) * 100}%`,
              background: allDone
                ? "linear-gradient(90deg, #22c55e, #16a34a)"
                : "linear-gradient(90deg, #FF5500, #FF8C00)",
              transition: "width 0.4s ease",
              borderRadius: "9999px",
            }}
          />
        </div>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.72rem",
            color: allDone ? "#4ade80" : "var(--text-muted)",
            flexShrink: 0,
          }}
        >
          {doneCount}/{totalRequired}
          {allDone ? " ✓ Completo!" : ""}
        </span>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "1rem",
          maxWidth: "780px",
        }}
      >
        {/* Tasks */}
        <div
          className="card fire-border"
          style={{ borderRadius: "14px", padding: "1.5rem" }}
        >
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.65rem",
              color: "rgba(255,119,68,0.6)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              marginBottom: "1rem",
            }}
          >
            Tarefas
          </div>
          <ul style={{ listStyle: "none" }}>
            {slide.tasks.map((task, i) => (
              <li
                key={i}
                onClick={() => toggle(i)}
                style={{
                  display: "flex",
                  gap: "0.75rem",
                  alignItems: "flex-start",
                  padding: "0.55rem 0",
                  borderBottom:
                    i < slide.tasks.length - 1
                      ? "1px solid rgba(255,255,255,0.04)"
                      : "none",
                  cursor: "pointer",
                  userSelect: "none",
                }}
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
                      ? {
                          background:
                            "linear-gradient(135deg, #FF5500, #CC2200)",
                          border: "none",
                          color: "#fff",
                          boxShadow: "0 0 8px rgba(255,85,0,0.4)",
                        }
                      : {
                          background: "rgba(255,85,0,0.05)",
                          border: "2px solid rgba(255,85,0,0.3)",
                          color: "transparent",
                        }),
                  }}
                >
                  ✓
                </span>
                <span
                  style={{
                    fontSize: "0.82rem",
                    color: checked.has(i)
                      ? "rgba(255,255,255,0.45)"
                      : "rgba(255,255,255,0.7)",
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
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.65rem",
                color: "rgba(251,191,36,0.6)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: "1rem",
              }}
            >
              🏆 Bônus
            </div>
            <ul style={{ listStyle: "none" }}>
              {slide.bonus.map((b, i) => (
                <li
                  key={i}
                  style={{
                    display: "flex",
                    gap: "0.6rem",
                    alignItems: "flex-start",
                    padding: "0.5rem 0",
                    borderBottom:
                      i < slide.bonus!.length - 1
                        ? "1px solid rgba(255,255,255,0.04)"
                        : "none",
                    fontSize: "0.82rem",
                    color: "rgba(255,255,255,0.5)",
                    lineHeight: 1.5,
                  }}
                >
                  <span style={{ color: "rgba(251,191,36,0.5)", flexShrink: 0 }}>
                    ⭐
                  </span>
                  {b}
                </li>
              ))}
            </ul>

            {isLast && (
              <Link
                href={href}
                className="fire-btn"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  marginTop: "1.25rem",
                  padding: "0.6rem 1.25rem",
                  borderRadius: "8px",
                  color: "#fff",
                  textDecoration: "none",
                  fontSize: "0.82rem",
                  fontWeight: 700,
                }}
              >
                {label}
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function TipBox({ text }: { text: string }) {
  return (
    <div className="tip-box" style={{ marginTop: "1.5rem", maxWidth: "700px" }}>
      <p
        style={{
          fontSize: "0.85rem",
          color: "rgba(255,255,255,0.65)",
          lineHeight: 1.6,
        }}
      >
        💡 <strong style={{ color: "#FF7744" }}>Dica:</strong> {text}
      </p>
    </div>
  );
}
