"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Fecha ao navegar
  useEffect(() => { setOpen(false); }, [pathname]);

  // Fecha ao clicar fora
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <nav
      style={{
        position: "sticky", top: 0, zIndex: 50,
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        background: "rgba(8,8,8,0.92)",
        backdropFilter: "blur(20px)",
      }}
    >
      <div
        style={{
          maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem",
          height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between",
        }}
      >
        {/* LOGO */}
        <Link
          href="/"
          style={{ display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none" }}
        >
          <span style={{ fontSize: "1.3rem" }}>🔥</span>
          <span className="fire-text" style={{ fontFamily: "var(--font-display)", fontSize: "1.35rem", letterSpacing: "0.06em" }}>
            WEB ON FIRE
          </span>
        </Link>

        {/* DROPDOWN — controlado por clique */}
        <div ref={ref} style={{ position: "relative" }}>
          <button
            onClick={() => setOpen(v => !v)}
            style={{
              display: "flex", alignItems: "center", gap: "0.35rem",
              padding: "0.45rem 1rem", borderRadius: "8px",
              background: "none", border: "none",
              fontSize: "0.82rem", fontWeight: 600, color: open ? "#fff" : "rgba(255,255,255,0.7)",
              cursor: "pointer", fontFamily: "inherit", letterSpacing: "0.04em",
              transition: "color 0.2s",
            }}
          >
            🔥 BACKEND
            <span
              style={{
                fontSize: "0.6rem", opacity: 0.6,
                transition: "transform 0.2s",
                transform: open ? "rotate(180deg)" : "rotate(0deg)",
                display: "inline-block",
              }}
            >
              ▼
            </span>
          </button>

          {open && (
            <div
              style={{
                position: "absolute", top: "calc(100% + 4px)", right: 0,
                minWidth: "220px", background: "#111",
                border: "1px solid rgba(255,85,0,0.2)", borderRadius: "10px",
                padding: "0.4rem",
                boxShadow: "0 12px 40px rgba(0,0,0,0.6), 0 0 30px rgba(255,85,0,0.06)",
                zIndex: 100,
              }}
            >
              <NavItem href="/modulos/backend" label="Visão Geral" icon="📦" />
              <div style={{ height: "1px", background: "rgba(255,255,255,0.05)", margin: "0.3rem 0.5rem" }} />
              <NavItem href="/modulos/backend/atividade-1" label="Configurar Firestore" icon="01" mono />
              <NavItem href="/modulos/backend/atividade-2" label="Cadastro em Camadas" icon="02" mono />
              <div style={{ height: "1px", background: "rgba(255,255,255,0.05)", margin: "0.3rem 0.5rem" }} />
              <div style={{ padding: "0.35rem 0.9rem 0.2rem", fontFamily: "var(--font-mono)", fontSize: "0.62rem", color: "rgba(255,119,68,0.5)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                Sistema Acadêmico
              </div>
              <NavItem href="/modulos/backend/parte1/alunos" label="Alunos" icon="👤" tag="parte1" />
              <NavItem href="/modulos/backend/parte1/cursos" label="Cursos" icon="📚" tag="parte1" />
              <NavItem href="/modulos/backend/parte1/turmas" label="Turmas" icon="🏫" tag="parte1" />
              <NavItem href="/modulos/backend/parte1/matriculas" label="Matrículas" icon="📋" tag="parte1" />
              <div style={{ height: "1px", background: "rgba(255,255,255,0.05)", margin: "0.3rem 0.5rem" }} />
              <NavItem href="/modulos/backend/hello-firebase" label="Testar Firebase" icon="⚗️" />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

function NavItem({
  href, label, icon, mono, tag,
}: {
  href: string;
  label: string;
  icon: string;
  mono?: boolean;
  tag?: string;
}) {
  return (
    <Link
      href={href}
      style={{
        display: "flex", alignItems: "center", gap: "0.6rem",
        padding: "0.6rem 0.9rem", borderRadius: "7px",
        fontSize: "0.83rem", color: "rgba(255,255,255,0.6)",
        textDecoration: "none", fontWeight: 500, transition: "all 0.15s",
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.background = "rgba(255,85,0,0.1)";
        (e.currentTarget as HTMLElement).style.color = "#fff";
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.background = "transparent";
        (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.6)";
      }}
    >
      <span style={mono ? { fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "#FF7744" } : undefined}>
        {icon}
      </span>
      <span style={{ flex: 1 }}>{label}</span>
      {tag && (
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", color: "#FF7744", opacity: 0.7 }}>
          {tag}
        </span>
      )}
    </Link>
  );
}
