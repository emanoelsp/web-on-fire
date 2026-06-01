import Link from "next/link";

export default function Navbar() {
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
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.35rem",
              letterSpacing: "0.06em",
            }}
          >
            WEB ON FIRE
          </span>
        </Link>

        {/* DROPDOWN */}
        <div className="nav-dropdown">
          <button className="nav-dropdown-trigger">
            🔥 BACKEND
            <span className="nav-dropdown-arrow">▼</span>
          </button>
          <div className="nav-dropdown-menu">
            <Link href="/modulos/backend" className="nav-dropdown-item">
              <span>📦</span>
              <span>Visão Geral</span>
            </Link>
            <div className="nav-dropdown-divider" />
            <Link href="/modulos/backend/atividade-1" className="nav-dropdown-item">
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "#FF7744" }}>01</span>
              <span>Configurar Firestore</span>
              <span className="nav-dropdown-item-label">lab</span>
            </Link>
            <Link href="/modulos/backend/atividade-2" className="nav-dropdown-item">
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "#FF7744" }}>02</span>
              <span>Cadastro em Camadas</span>
              <span className="nav-dropdown-item-label">lab</span>
            </Link>
            <div className="nav-dropdown-divider" />
            <Link href="/modulos/backend/hello-firebase" className="nav-dropdown-item">
              <span>⚗️</span>
              <span>Testar Firebase</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
