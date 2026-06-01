"use client";

import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function HelloFirebasePage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [docId, setDocId] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");

  async function testarConexao() {
    setStatus("loading");
    setErrorMsg("");
    try {
      const docRef = await addDoc(collection(db, "testes"), {
        mensagem: "Hello Firebase! 🔥",
        origem: "modulos/backend/hello-firebase",
        timestamp: serverTimestamp(),
      });
      setDocId(docRef.id);
      setStatus("success");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Erro desconhecido");
      setStatus("error");
    }
  }

  return (
    <>
    <Navbar />
    <main style={{ minHeight: "100vh", background: "var(--dark-1)", padding: "2rem 1.5rem" }}>
      <div style={{ maxWidth: "680px", margin: "0 auto" }}>
        {/* back */}
        <Link
          href="/modulos/backend"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            color: "var(--text-muted)",
            textDecoration: "none",
            fontSize: "0.85rem",
            marginBottom: "2rem",
          }}
        >
          ← Módulo Backend
        </Link>

        {/* header */}
        <div style={{ marginBottom: "2.5rem" }}>
          <span className="badge badge-fire" style={{ marginBottom: "1rem", display: "inline-flex" }}>
            Atividade 1 · Teste de Conexão
          </span>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "2.5rem",
              letterSpacing: "0.04em",
              marginBottom: "0.75rem",
            }}
          >
            <span className="fire-text">HELLO FIREBASE</span>
          </h1>
          <p style={{ color: "var(--text-muted)", lineHeight: 1.7 }}>
            Esta página testa se a conexão com o Firestore está funcionando corretamente.
            Clique no botão para gravar um documento na coleção{" "}
            <code
              style={{
                fontFamily: "var(--font-mono)",
                background: "rgba(255,85,0,0.1)",
                color: "#FF7744",
                padding: "0.1rem 0.4rem",
                borderRadius: "4px",
                fontSize: "0.85em",
              }}
            >
              testes
            </code>.
          </p>
        </div>

        {/* card de teste */}
        <div
          className="fire-border"
          style={{
            borderRadius: "16px",
            background: "var(--dark-2)",
            padding: "2rem",
            marginBottom: "2rem",
          }}
        >
          <div
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, rgba(255,85,0,0.2), rgba(204,34,0,0.1))",
              border: "1px solid rgba(255,85,0,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.8rem",
              marginBottom: "1.5rem",
            }}
          >
            🔥
          </div>

          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.3rem",
              letterSpacing: "0.04em",
              marginBottom: "0.5rem",
            }}
          >
            Gravar em{" "}
            <span style={{ fontFamily: "var(--font-mono)", color: "#FF7744", fontSize: "1rem" }}>
              /testes
            </span>
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: "1.5rem", lineHeight: 1.6 }}>
            O documento gravado terá os campos{" "}
            <span style={{ fontFamily: "var(--font-mono)", color: "#aaa" }}>mensagem</span>,{" "}
            <span style={{ fontFamily: "var(--font-mono)", color: "#aaa" }}>origem</span> e{" "}
            <span style={{ fontFamily: "var(--font-mono)", color: "#aaa" }}>timestamp</span>.
          </p>

          <button
            onClick={testarConexao}
            disabled={status === "loading"}
            className="fire-btn"
            style={{
              padding: "0.75rem 1.75rem",
              borderRadius: "10px",
              color: "#fff",
              fontWeight: 700,
              fontSize: "0.9rem",
              fontFamily: "inherit",
              opacity: status === "loading" ? 0.7 : 1,
              cursor: status === "loading" ? "not-allowed" : "pointer",
            }}
          >
            {status === "loading" ? "⏳ Gravando…" : "⚡ Testar Conexão"}
          </button>
        </div>

        {/* RESULTADO */}
        {status === "success" && (
          <div className="success-box" style={{ borderRadius: "0 10px 10px 0", marginBottom: "1.5rem" }}>
            <p style={{ color: "#4ade80", fontWeight: 700, marginBottom: "0.5rem" }}>
              ✅ Conexão funcionando!
            </p>
            <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: "0.75rem" }}>
              Documento gravado na coleção <code style={{ fontFamily: "var(--font-mono)" }}>testes</code>:
            </p>
            <div className="code-block" style={{ fontFamily: "var(--font-mono)" }}>
              <span style={{ color: "#8b949e" }}>// Firestore → testes/</span>
              {"\n"}
              <span style={{ color: "#ff7b72" }}>id</span>
              <span style={{ color: "#c9d1d9" }}>: </span>
              <span style={{ color: "#a5d6ff" }}>&quot;{docId}&quot;</span>
              {"\n"}
              <span style={{ color: "#ff7b72" }}>mensagem</span>
              <span style={{ color: "#c9d1d9" }}>: </span>
              <span style={{ color: "#a5d6ff" }}>&quot;Hello Firebase! 🔥&quot;</span>
            </div>
          </div>
        )}

        {status === "error" && (
          <div
            style={{
              background: "rgba(239,68,68,0.08)",
              borderLeft: "3px solid rgba(239,68,68,0.5)",
              borderRadius: "0 10px 10px 0",
              padding: "1rem 1.25rem",
              marginBottom: "1.5rem",
            }}
          >
            <p style={{ color: "#f87171", fontWeight: 700, marginBottom: "0.5rem" }}>
              ❌ Erro na conexão
            </p>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "#f87171" }}>
              {errorMsg}
            </p>
            <p style={{ color: "var(--text-muted)", fontSize: "0.82rem", marginTop: "0.75rem" }}>
              Verifique se o arquivo <code style={{ fontFamily: "var(--font-mono)" }}>.env.local</code> existe
              e se as credenciais do Firebase estão corretas.
            </p>
          </div>
        )}

        {/* CÓDIGO */}
        <div className="card" style={{ borderRadius: "12px", padding: "1.5rem" }}>
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.1rem",
              letterSpacing: "0.04em",
              marginBottom: "1rem",
            }}
          >
            CÓDIGO DESTA PÁGINA
          </h3>
          <div className="code-block" style={{ fontFamily: "var(--font-mono)" }}>
            <span style={{ color: "#8b949e" }}>// O documento gravado no Firestore:</span>
            {"\n"}
            <span style={{ color: "#d2a8ff" }}>await</span>{" "}
            <span style={{ color: "#79c0ff" }}>addDoc</span>
            <span style={{ color: "#c9d1d9" }}>(</span>
            <span style={{ color: "#79c0ff" }}>collection</span>
            <span style={{ color: "#c9d1d9" }}>(db, </span>
            <span style={{ color: "#a5d6ff" }}>&quot;testes&quot;</span>
            <span style={{ color: "#c9d1d9" }}>), {"{"}</span>
            {"\n"}
            <span style={{ color: "#c9d1d9" }}>{"  "}mensagem: </span>
            <span style={{ color: "#a5d6ff" }}>&quot;Hello Firebase! 🔥&quot;</span>
            <span style={{ color: "#c9d1d9" }}>,</span>
            {"\n"}
            <span style={{ color: "#c9d1d9" }}>{"  "}timestamp: </span>
            <span style={{ color: "#79c0ff" }}>serverTimestamp</span>
            <span style={{ color: "#c9d1d9" }}>()</span>
            {"\n"}
            <span style={{ color: "#c9d1d9" }}>{"}"});</span>
          </div>
        </div>

        <div style={{ marginTop: "2rem", display: "flex", gap: "1rem" }}>
          <Link
            href="/modulos/backend/atividade-1"
            style={{
              flex: 1,
              padding: "0.75rem",
              textAlign: "center",
              borderRadius: "10px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.07)",
              color: "var(--text-muted)",
              textDecoration: "none",
              fontSize: "0.85rem",
              fontWeight: 600,
            }}
          >
            ← Atividade 1
          </Link>
          <Link
            href="/modulos/backend/atividade-2"
            className="fire-btn"
            style={{
              flex: 1,
              padding: "0.75rem",
              textAlign: "center",
              borderRadius: "10px",
              color: "#fff",
              textDecoration: "none",
              fontSize: "0.85rem",
              fontWeight: 700,
            }}
          >
            Atividade 2 →
          </Link>
        </div>
      </div>
    </main>
    </>
  );
}
