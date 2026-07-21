"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useGamificationStore } from "@/stores/gamificationStore";
import { FLAME_INFO, getFlameStatus } from "@/lib/gamification";

const MODULOS_NAV = [
  {
    group: "Fundamentos",
    items: [
      { href: "/modulos/infra", label: "Infraestrutura & Nivelamento", icon: "🏗️", tag: "01" },
      { href: "/modulos/nextjs", label: "Arquitetura Core do Next.js", icon: "⚡", tag: "02" },
    ],
  },
  {
    group: "Interface & Dados",
    items: [
      { href: "/modulos/ui", label: "Estilização, Design System & UI", icon: "🎨", tag: "03" },
      { href: "/modulos/dados", label: "Persistência & Backend (BaaS)", icon: "🔥", tag: "04" },
    ],
  },
  {
    group: "Laboratório",
    items: [
      { href: "/modulos/backend", label: "Sistema Acadêmico (Firestore)", icon: "🧪", tag: "05" },
    ],
  },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { user, isAdmin, loading, logout } = useAuth();
  const xp = useGamificationStore((s) => s.xp);
  const streakWeeks = useGamificationStore((s) => s.streakWeeks);
  const lastAccessDate = useGamificationStore((s) => s.lastAccessDate);
  const flameIcon = FLAME_INFO[getFlameStatus(lastAccessDate)].icon;

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setOpen(false); }, [pathname]);

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
        position: "sticky",
        top: 0,
        zIndex: 50,
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        background: "rgba(8,8,8,0.92)",
        backdropFilter: "blur(20px)",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 1.5rem",
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* LOGO */}
        <Link
          href="/"
          style={{ display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none" }}
        >
          <span style={{ fontSize: "1.3rem" }}>🔥</span>
          <span
            className="fire-text"
            style={{ fontFamily: "var(--font-display)", fontSize: "1.35rem", letterSpacing: "0.06em" }}
          >
            WEB ON FIRE
          </span>
        </Link>

        {/* RIGHT: links + dropdown */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Link
            href="/"
            style={{
              fontSize: "0.82rem",
              fontWeight: 600,
              color: pathname === "/" ? "#fff" : "rgba(255,255,255,0.5)",
              textDecoration: "none",
              padding: "0.45rem 0.85rem",
              borderRadius: "8px",
              transition: "color 0.2s",
              letterSpacing: "0.04em",
            }}
          >
            Início
          </Link>

          {/* MÓDULOS dropdown */}
          <div ref={ref} style={{ position: "relative" }}>
            <button
              onClick={() => setOpen((v) => !v)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.35rem",
                padding: "0.45rem 1rem",
                borderRadius: "8px",
                background: open ? "rgba(255,85,0,0.1)" : "none",
                border: open ? "1px solid rgba(255,85,0,0.2)" : "1px solid transparent",
                fontSize: "0.82rem",
                fontWeight: 600,
                color: open ? "#fff" : "rgba(255,255,255,0.7)",
                cursor: "pointer",
                fontFamily: "inherit",
                letterSpacing: "0.04em",
                transition: "all 0.2s",
              }}
            >
              Módulos
              <span
                style={{
                  fontSize: "0.6rem",
                  opacity: 0.6,
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
                  position: "absolute",
                  top: "calc(100% + 6px)",
                  right: 0,
                  width: "280px",
                  background: "#111",
                  border: "1px solid rgba(255,85,0,0.2)",
                  borderRadius: "12px",
                  padding: "0.5rem",
                  boxShadow: "0 16px 50px rgba(0,0,0,0.7), 0 0 30px rgba(255,85,0,0.06)",
                  zIndex: 100,
                }}
              >
                {MODULOS_NAV.map((group, gi) => (
                  <div key={group.group}>
                    {gi > 0 && (
                      <div
                        style={{
                          height: "1px",
                          background: "rgba(255,255,255,0.05)",
                          margin: "0.35rem 0.5rem",
                        }}
                      />
                    )}
                    <div
                      style={{
                        padding: "0.35rem 0.9rem 0.2rem",
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.62rem",
                        color: "rgba(255,119,68,0.5)",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                      }}
                    >
                      {group.group}
                    </div>
                    {group.items.map((item) => (
                      <NavItem
                        key={item.href + item.label}
                        href={item.href}
                        label={item.label}
                        icon={item.icon}
                        tag={item.tag}
                      />
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ALUNO: progresso ou login */}
          {!loading && user ? (
            <>
              {isAdmin && (
                <Link
                  href="/admin/alunos"
                  title="Painel do professor"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.35rem",
                    padding: "0.35rem 0.75rem",
                    borderRadius: "9999px",
                    background: "rgba(96,165,250,0.1)",
                    border: "1px solid rgba(96,165,250,0.3)",
                    textDecoration: "none",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.68rem",
                    color: "#60a5fa",
                    fontWeight: 700,
                  }}
                >
                  🛡️ Painel
                </Link>
              )}
              <Link
                href="/progresso"
                title="Meu progresso"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.35rem 0.75rem",
                  borderRadius: "9999px",
                  background: "rgba(255,85,0,0.07)",
                  border: "1px solid rgba(255,85,0,0.2)",
                  textDecoration: "none",
                }}
              >
                <span style={{ fontSize: "0.85rem" }}>{flameIcon}</span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", color: "#FF7744", fontWeight: 700 }}>
                  {streakWeeks}sem
                </span>
                <span style={{ width: "1px", height: "12px", background: "rgba(255,255,255,0.12)" }} />
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", color: "rgba(255,255,255,0.7)", fontWeight: 700 }}>
                  ⚡{xp}
                </span>
              </Link>
              <button
                onClick={() => logout()}
                title="Sair"
                style={{
                  background: "none",
                  border: "none",
                  color: "rgba(255,255,255,0.3)",
                  fontSize: "0.72rem",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  padding: "0.4rem",
                }}
              >
                Sair
              </button>
            </>
          ) : !loading ? (
            <Link
              href="/login"
              className="fire-btn"
              style={{
                padding: "0.45rem 1.1rem",
                borderRadius: "9999px",
                color: "#fff",
                textDecoration: "none",
                fontSize: "0.78rem",
                fontWeight: 700,
                letterSpacing: "0.03em",
              }}
            >
              Entrar
            </Link>
          ) : null}
        </div>
      </div>
    </nav>
  );
}

function NavItem({
  href,
  label,
  icon,
  tag,
  locked,
}: {
  href: string;
  label: string;
  icon: string;
  tag?: string;
  locked?: boolean;
}) {
  const isLocked = locked || href === "#";

  return (
    <Link
      href={href}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.6rem",
        padding: "0.55rem 0.9rem",
        borderRadius: "8px",
        fontSize: "0.82rem",
        color: isLocked ? "rgba(255,255,255,0.28)" : "rgba(255,255,255,0.65)",
        textDecoration: "none",
        fontWeight: 500,
        transition: "all 0.15s",
        cursor: isLocked ? "default" : "pointer",
        pointerEvents: isLocked ? "none" : "auto",
      }}
      onMouseEnter={(e) => {
        if (!isLocked) {
          (e.currentTarget as HTMLElement).style.background = "rgba(255,85,0,0.1)";
          (e.currentTarget as HTMLElement).style.color = "#fff";
        }
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.background = "transparent";
        (e.currentTarget as HTMLElement).style.color = isLocked
          ? "rgba(255,255,255,0.28)"
          : "rgba(255,255,255,0.65)";
      }}
    >
      <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: isLocked ? "rgba(255,119,68,0.3)" : "#FF7744", minWidth: "1.2rem" }}>
        {tag}
      </span>
      <span style={{ flex: 1 }}>{label}</span>
      {isLocked && (
        <span style={{ fontSize: "0.65rem", opacity: 0.4 }}>🔒</span>
      )}
      {!isLocked && (
        <span style={{ fontSize: "0.65rem", opacity: 0.5 }}>{icon}</span>
      )}
    </Link>
  );
}
