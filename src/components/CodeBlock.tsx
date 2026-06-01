"use client";

import { useState } from "react";

interface Props {
  filename?: string;
  code: string;
  style?: React.CSSProperties;
}

export default function CodeBlock({ filename, code, style }: Props) {
  const [state, setState] = useState<"idle" | "copied" | "error">("idle");

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code);
      setState("copied");
    } catch {
      setState("error");
    } finally {
      setTimeout(() => setState("idle"), 2000);
    }
  }

  return (
    <div
      style={{
        border: "1px solid rgba(255,85,0,0.18)",
        borderRadius: "10px",
        overflow: "hidden",
        ...style,
      }}
    >
      {/* HEADER */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0.45rem 0.9rem",
          background: "rgba(255,85,0,0.07)",
          borderBottom: "1px solid rgba(255,85,0,0.12)",
          gap: "0.75rem",
        }}
      >
        {/* filename */}
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.72rem",
            color: "#FF7744",
            letterSpacing: "0.03em",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {filename ?? "código"}
        </span>

        {/* copy button */}
        <button
          onClick={handleCopy}
          title="Copiar código"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.3rem",
            background: "none",
            border: `1px solid ${
              state === "copied"
                ? "rgba(74,222,128,0.5)"
                : state === "error"
                ? "rgba(248,113,113,0.5)"
                : "rgba(255,255,255,0.1)"
            }`,
            borderRadius: "6px",
            padding: "0.18rem 0.55rem",
            cursor: "pointer",
            fontFamily: "var(--font-mono)",
            fontSize: "0.68rem",
            fontWeight: 600,
            color:
              state === "copied"
                ? "#4ade80"
                : state === "error"
                ? "#f87171"
                : "rgba(255,255,255,0.45)",
            whiteSpace: "nowrap",
            flexShrink: 0,
            transition: "all 0.2s",
          }}
        >
          {state === "copied" ? (
            <>✓ Copiado!</>
          ) : state === "error" ? (
            <>✗ Erro</>
          ) : (
            <>
              <svg
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              Copiar
            </>
          )}
        </button>
      </div>

      {/* CODE */}
      <pre
        style={{
          background: "#0d1117",
          margin: 0,
          padding: "1.1rem 1.25rem",
          fontFamily: "var(--font-mono)",
          fontSize: "0.8rem",
          lineHeight: 1.8,
          overflowX: "auto",
          color: "#e6edf3",
        }}
      >
        <code>{code}</code>
      </pre>
    </div>
  );
}
