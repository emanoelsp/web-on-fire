"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? "Erro ao fazer login.");
      } else {
        router.push("/admin/dashboard");
      }
    } catch {
      setError("Erro de conexão. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "var(--dark-1)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          background: "var(--dark-2)",
          border: "1px solid rgba(255,85,0,0.2)",
          borderRadius: "20px",
          padding: "3rem 2.5rem",
          boxShadow: "0 0 60px rgba(255,85,0,0.06)",
        }}
      >
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <span style={{ fontSize: "2.5rem", display: "block", marginBottom: "0.75rem" }}>🔥</span>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.8rem",
              letterSpacing: "0.1em",
              color: "var(--text-primary)",
              marginBottom: "0.25rem",
            }}
          >
            PAINEL ADMIN
          </h1>
          <p style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Web On Fire Academy
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "1.25rem" }}>
            <label
              htmlFor="password"
              style={{
                display: "block",
                fontSize: "0.75rem",
                fontFamily: "var(--font-mono)",
                color: "rgba(255,119,68,0.8)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: "0.5rem",
              }}
            >
              Senha de acesso
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="input-field"
              style={{ fontSize: "1rem", letterSpacing: "0.1em" }}
            />
          </div>

          {error && (
            <div
              style={{
                background: "rgba(204,34,0,0.08)",
                border: "1px solid rgba(204,34,0,0.3)",
                borderRadius: "8px",
                padding: "0.75rem 1rem",
                fontSize: "0.82rem",
                color: "#FF6644",
                marginBottom: "1.25rem",
              }}
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className="fire-btn"
            style={{
              width: "100%",
              padding: "0.9rem",
              borderRadius: "10px",
              fontSize: "0.9rem",
              fontWeight: 700,
              letterSpacing: "0.06em",
              color: "#fff",
              fontFamily: "inherit",
              opacity: loading || !password ? 0.6 : 1,
              cursor: loading || !password ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Entrando..." : "🔥 ENTRAR"}
          </button>
        </form>

        <p
          style={{
            textAlign: "center",
            marginTop: "2rem",
            fontSize: "0.75rem",
            color: "rgba(255,255,255,0.15)",
            fontFamily: "var(--font-mono)",
          }}
        >
          Acesso restrito ao administrador
        </p>
      </div>
    </main>
  );
}
