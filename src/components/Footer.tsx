"use client";

import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  const links = [
    { label: "Início", href: "/" },
    { label: "Next.js Fundamentos", href: "/modulos/nextjs" },
    { label: "Backend com Firebase", href: "/modulos/backend" },
  ];

  return (
    <footer
      style={{
        borderTop: "1px solid rgba(255,255,255,0.04)",
        background: "var(--dark-1)",
        padding: "3.5rem 1.5rem 2rem",
        marginTop: "auto",
      }}
    >
      <style>{`
        .footer-nav-link { color: var(--text-muted); transition: color 0.2s; }
        .footer-nav-link:hover { color: #fff; }
        .footer-admin-link { color: rgba(255,255,255,0.12); transition: color 0.2s; }
        .footer-admin-link:hover { color: rgba(255,119,68,0.4); }
      `}</style>

      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Top row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: "2rem",
            marginBottom: "2.5rem",
          }}
        >
          {/* Brand */}
          <div>
            <Link
              href="/"
              style={{
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                marginBottom: "0.75rem",
              }}
            >
              <span style={{ fontSize: "1.3rem" }}>🔥</span>
              <span
                className="fire-text"
                style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", letterSpacing: "0.08em" }}
              >
                WEB ON FIRE ACADEMY
              </span>
            </Link>
            <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", lineHeight: 1.7, maxWidth: "320px" }}>
              Laboratórios 100% interativos. Aprenda na prática o que está pegando fogo na Web.
            </p>
          </div>

          {/* Nav links */}
          <nav style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.65rem",
                color: "rgba(255,119,68,0.6)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: "0.25rem",
              }}
            >
              Navegação
            </span>
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="footer-nav-link"
                style={{ fontSize: "0.82rem", textDecoration: "none" }}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Tech stack */}
          <div>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.65rem",
                color: "rgba(255,119,68,0.6)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                display: "block",
                marginBottom: "0.75rem",
              }}
            >
              Stack
            </span>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
              {["Next.js 16", "React 19", "TypeScript", "Tailwind v4", "Firebase"].map((t) => (
                <span
                  key={t}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.68rem",
                    padding: "0.2rem 0.6rem",
                    borderRadius: "9999px",
                    background: "rgba(255,85,0,0.06)",
                    border: "1px solid rgba(255,85,0,0.15)",
                    color: "rgba(255,119,68,0.7)",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="divider" style={{ margin: "0 0 1.5rem" }} />

        {/* Bottom row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.2)" }}>
            © {year} Web On Fire Academy · Laboratórios interativos para devs que querem pegar fogo
          </p>
          <Link
            href="/admin/login"
            className="footer-admin-link"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.65rem",
              textDecoration: "none",
              letterSpacing: "0.06em",
            }}
          >
            admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
