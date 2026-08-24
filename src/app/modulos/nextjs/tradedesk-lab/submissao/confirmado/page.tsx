import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ConfirmadoPage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--dark-1)", display: "flex", flexDirection: "column" }}>
      <Navbar />
      <main style={{ flex: 1, maxWidth: "700px", margin: "0 auto", width: "100%", padding: "6rem 1.5rem", textAlign: "center" }}>
        <div style={{ fontSize: "4rem", marginBottom: "1.5rem" }}>🎉</div>
        <span className="badge badge-green" style={{ marginBottom: "1.5rem", display: "inline-flex" }}>
          Submissão recebida!
        </span>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.5rem, 6vw, 4rem)",
            letterSpacing: "0.04em",
            marginBottom: "1rem",
          }}
        >
          <span className="fire-text">TRABALHO</span>
          <br />
          <span style={{ color: "var(--text-primary)" }}>ENVIADO!</span>
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.7, marginBottom: "2.5rem", maxWidth: "480px", margin: "0 auto 2.5rem" }}>
          Suas respostas foram salvas com sucesso. Prepare-se para a defesa oral na próxima aula —
          você vai explicar alguns dos bugs que encontrou.
        </p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link
            href="/modulos/nextjs"
            style={{
              padding: "0.75rem 1.75rem",
              borderRadius: "10px",
              border: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(255,255,255,0.03)",
              color: "rgba(255,255,255,0.6)",
              textDecoration: "none",
              fontSize: "0.85rem",
              fontWeight: 600,
            }}
          >
            ← Módulo Next.js
          </Link>
          <Link
            href="/"
            style={{
              padding: "0.75rem 1.75rem",
              borderRadius: "10px",
              background: "linear-gradient(135deg, #FF5500, #CC2200)",
              color: "#fff",
              textDecoration: "none",
              fontSize: "0.85rem",
              fontWeight: 700,
            }}
          >
            Ir para o início
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
