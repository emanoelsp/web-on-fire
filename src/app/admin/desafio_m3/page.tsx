"use client";

import { useCallback, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { adminAuthHeaders } from "@/lib/adminClient";

/**
 * Renderizador markdown-lite (headers, **bold**, `code`, listas, tabelas,
 * blocos de código) — renderiza docs/resolucao_desafio_modulo3.md direto da
 * fonte, sem duplicar o conteúdo aqui nem adicionar lib de markdown.
 */

const h1Style = { fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem, 4vw, 2.2rem)", letterSpacing: "0.03em", color: "var(--text-primary)", margin: "0 0 0.75rem" };
const h2Style = { fontFamily: "var(--font-display)", fontSize: "1.35rem", letterSpacing: "0.02em", color: "var(--text-primary)", margin: "2.25rem 0 0.75rem", paddingTop: "1.5rem", borderTop: "1px solid rgba(255,255,255,0.06)" };
const h3Style = { fontSize: "0.95rem", fontWeight: 700, color: "#FF9966", margin: "1.25rem 0 0.4rem" };
const pStyle = { color: "var(--text-muted)", fontSize: "0.88rem", lineHeight: 1.7, margin: "0.5rem 0" };
const ulStyle = { display: "flex", flexDirection: "column" as const, gap: "0.4rem", padding: "0 0 0 1.2rem", margin: "0.5rem 0" };
const liStyle = { color: "var(--text-muted)", fontSize: "0.86rem", lineHeight: 1.6 };
const hrStyle = { border: "none", borderTop: "1px solid rgba(255,255,255,0.08)", margin: "2rem 0" };
const langTagStyle = { display: "inline-block", fontFamily: "var(--font-mono)", fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: "#FF7744", marginBottom: "0.3rem" };
const preStyle = { padding: "1rem 1.1rem", borderRadius: "10px", background: "rgba(0,0,0,0.35)", border: "1px solid rgba(255,255,255,0.06)", overflowX: "auto" as const, fontFamily: "var(--font-mono)", fontSize: "0.76rem", lineHeight: 1.6, color: "rgba(255,255,255,0.85)", whiteSpace: "pre" as const };
const tableStyle = { width: "100%", borderCollapse: "collapse" as const, margin: "0.75rem 0", fontSize: "0.82rem" };
const thStyle = { textAlign: "left" as const, padding: "0.5rem 0.75rem", borderBottom: "1px solid rgba(255,255,255,0.1)", color: "var(--text-primary)", fontFamily: "var(--font-mono)", fontSize: "0.68rem", textTransform: "uppercase" as const, letterSpacing: "0.05em" };
const tdStyle = { padding: "0.5rem 0.75rem", borderBottom: "1px solid rgba(255,255,255,0.05)", color: "var(--text-muted)" };
const inlineCodeStyle = { background: "rgba(255,255,255,0.08)", padding: "0.1rem 0.35rem", borderRadius: "4px", fontFamily: "var(--font-mono)", fontSize: "0.85em", color: "#FF9966" };

function inlineMd(text: string): ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return parts.map((part, idx) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={idx} style={{ color: "var(--text-primary)" }}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return <code key={idx} style={inlineCodeStyle}>{part.slice(1, -1)}</code>;
    }
    return <span key={idx}>{part}</span>;
  });
}

function renderTable(lines: string[], key: string): ReactNode {
  const rows = lines.map((l) => l.split("|").slice(1, -1).map((c) => c.trim()));
  const header = rows[0] ?? [];
  const body = rows.slice(2);
  return (
    <table key={key} style={tableStyle}>
      <thead>
        <tr>{header.map((h, i) => <th key={i} style={thStyle}>{inlineMd(h)}</th>)}</tr>
      </thead>
      <tbody>
        {body.map((r, ri) => (
          <tr key={ri}>{r.map((c, ci) => <td key={ci} style={tdStyle}>{inlineMd(c)}</td>)}</tr>
        ))}
      </tbody>
    </table>
  );
}

function renderTextBlock(content: string, keyPrefix: string): ReactNode[] {
  const lines = content.split("\n");
  const nodes: ReactNode[] = [];
  let listBuffer: string[] = [];
  let paraBuffer: string[] = [];
  let i = 0;

  const flushPara = () => {
    const text = paraBuffer.join(" ").trim();
    if (text) nodes.push(<p key={`${keyPrefix}-p-${nodes.length}`} style={pStyle}>{inlineMd(text)}</p>);
    paraBuffer = [];
  };
  const flushList = () => {
    if (listBuffer.length) {
      nodes.push(
        <ul key={`${keyPrefix}-ul-${nodes.length}`} style={ulStyle}>
          {listBuffer.map((item, idx) => <li key={idx} style={liStyle}>{inlineMd(item)}</li>)}
        </ul>,
      );
      listBuffer = [];
    }
  };

  while (i < lines.length) {
    const trimmed = lines[i].trim();

    if (trimmed === "") { flushPara(); flushList(); i++; continue; }
    if (trimmed === "---") { flushPara(); flushList(); nodes.push(<hr key={`${keyPrefix}-hr-${nodes.length}`} style={hrStyle} />); i++; continue; }
    if (trimmed.startsWith("### ")) { flushPara(); flushList(); nodes.push(<h3 key={`${keyPrefix}-h3-${nodes.length}`} style={h3Style}>{inlineMd(trimmed.slice(4))}</h3>); i++; continue; }
    if (trimmed.startsWith("## ")) { flushPara(); flushList(); nodes.push(<h2 key={`${keyPrefix}-h2-${nodes.length}`} style={h2Style}>{inlineMd(trimmed.slice(3))}</h2>); i++; continue; }
    if (trimmed.startsWith("# ")) { flushPara(); flushList(); nodes.push(<h1 key={`${keyPrefix}-h1-${nodes.length}`} style={h1Style}>{inlineMd(trimmed.slice(2))}</h1>); i++; continue; }
    if (trimmed.startsWith("|")) {
      flushPara(); flushList();
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) { tableLines.push(lines[i].trim()); i++; }
      nodes.push(renderTable(tableLines, `${keyPrefix}-tbl-${nodes.length}`));
      continue;
    }
    if (trimmed.startsWith("- ")) { flushPara(); listBuffer.push(trimmed.slice(2)); i++; continue; }

    paraBuffer.push(trimmed);
    i++;
  }
  flushPara();
  flushList();
  return nodes;
}

function renderMarkdown(md: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const fenceRegex = /```(\w*)\n([\s\S]*?)```/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let i = 0;

  while ((match = fenceRegex.exec(md))) {
    if (match.index > lastIndex) {
      nodes.push(...renderTextBlock(md.slice(lastIndex, match.index), `t${i++}`));
    }
    const lang = match[1];
    const code = match[2].replace(/\n$/, "");
    nodes.push(
      <div key={`code-${i++}`} style={{ margin: "0.75rem 0" }}>
        {lang && <span style={langTagStyle}>{lang}</span>}
        <pre style={preStyle}>{code}</pre>
      </div>,
    );
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < md.length) {
    nodes.push(...renderTextBlock(md.slice(lastIndex), `t${i++}`));
  }
  return nodes;
}

export default function AdminDesafioM3Page() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState<string | null>(null);
  const [contentError, setContentError] = useState(false);

  const checkAuth = useCallback(async () => {
    const headers = await adminAuthHeaders(user);
    const res = await fetch("/api/admin/modules", { headers });
    if (res.status === 401) {
      router.push("/admin/login");
      return;
    }
    setAuthorized(true);
    setLoading(false);

    try {
      const contentRes = await fetch("/api/admin/desafio-m3", { headers });
      if (!contentRes.ok) throw new Error("falha ao buscar conteúdo");
      const data = await contentRes.json();
      setContent(data.content);
    } catch {
      setContentError(true);
    }
  }, [router, user]);

  useEffect(() => {
    if (authLoading) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    checkAuth();
  }, [authLoading, checkAuth]);

  if (loading || !authorized) {
    return (
      <main style={{ minHeight: "100vh", background: "var(--dark-1)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-muted)" }}>
        Verificando acesso…
      </main>
    );
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
            maxWidth: "1000px",
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
              admin · desafio m3
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
            ← Painel
          </Link>
        </div>
      </header>

      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "3rem 1.5rem" }}>
        <div style={{ marginBottom: "2rem" }}>
          <span className="badge badge-fire" style={{ marginBottom: "1rem", display: "inline-flex" }}>
            🔒 Confidencial — só o professor
          </span>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "0.04em", color: "var(--text-primary)" }}>
            GABARITO · DESAFIO M03
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", margin: "0.4rem 0" }}>
            Painel On Fire — resolução passo a passo do desafio final do módulo UI.
          </p>
          <Link href="/modulos/ui/desafio" style={{ fontSize: "0.72rem", color: "rgba(255,119,68,0.7)", textDecoration: "none" }}>
            ver desafio →
          </Link>
        </div>

        {contentError && (
          <p style={{ color: "#f87171", fontSize: "0.88rem" }}>
            Não foi possível carregar docs/resolucao_desafio_modulo3.md. Tente recarregar a página.
          </p>
        )}
        {!content && !contentError && (
          <p style={{ color: "var(--text-muted)", fontSize: "0.88rem" }}>Carregando gabarito…</p>
        )}
        {content && (
          <div className="card" style={{ borderRadius: "14px", padding: "1.75rem 2rem", border: "1px solid rgba(255,255,255,0.05)" }}>
            {renderMarkdown(content)}
          </div>
        )}
      </div>
    </main>
  );
}
