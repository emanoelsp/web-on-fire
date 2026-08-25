"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { criarPersonagem } from "@/services/personagens";
import { CLASSES, type Classe } from "@/types";
import BugBanner from "@/components/BugBanner";

const CLASSES_LISTA = Object.entries(CLASSES) as [Classe, typeof CLASSES[Classe]][];

export default function CriarPersonagemPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [classeSelecionada, setClasseSelecionada] = useState<Classe | null>(null);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!classeSelecionada) { setErro("Escolha uma classe antes de continuar."); return; }
    if (!user) { router.push("/login"); return; }

    setCarregando(true);
    setErro("");
    try {
      await criarPersonagem(user.uid, nome, classeSelecionada);
      setSucesso(true);
      setTimeout(() => router.push("/dashboard"), 1800);
    } catch {
      setErro("Erro ao criar personagem. Tente novamente.");
    } finally {
      setCarregando(false);
    }
  }

  const info = classeSelecionada ? CLASSES[classeSelecionada] : null;

  return (
    <div style={{ minHeight: "100vh" }}>
      <nav className="nav">
        <Link href="/dashboard" className="nav-logo gold-text">⚔️ NEXUS</Link>
        <Link href="/dashboard" className="btn btn-ghost" style={{ fontSize: "0.82rem" }}>← Dashboard</Link>
      </nav>

      <main className="container" style={{ paddingTop: "2.5rem", paddingBottom: "4rem" }}>
        <BugBanner
          numero={5}
          titulo="Personagem Criado mas Sumiu!"
          oQueAcontece="Você preenche o formulário, clica em 'Forjar Herói', aparece a mensagem de sucesso — mas quando você volta ao dashboard, seu personagem não está lá! Ele simplesmente desapareceu."
          porQue="A função criarPersonagem em services/personagens.ts salva o personagem na coleção errada: ela escreve em 'personagem' (singular) mas o dashboard lê de 'personagens' (plural). São duas coleções diferentes no Firestore — o dado vai para o lugar errado."
          dica="Em services/personagens.ts, encontre a linha com addDoc(collection(db, 'personagem'), ...) e corrija para addDoc(collection(db, 'personagens'), ...). Atenção ao 's' no final!"
        />

        <h1 style={{ fontSize: "clamp(1.5rem, 4vw, 2rem)", fontWeight: 800, marginBottom: "0.4rem" }}>
          Forjar Novo Herói
        </h1>
        <p style={{ color: "var(--muted)", fontSize: "0.9rem", marginBottom: "2rem" }}>
          Escolha bem — a classe define os atributos e equipamentos disponíveis.
        </p>

        {sucesso ? (
          <div className="msg-success" style={{ textAlign: "center", padding: "2rem", fontSize: "1rem" }}>
            <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>✦</div>
            <strong>Herói forjado com sucesso!</strong>
            <br />
            <span style={{ fontSize: "0.85rem" }}>Redirecionando para o dashboard...</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {/* Nome */}
            <div style={{ marginBottom: "2rem" }}>
              <label htmlFor="nome" style={{ fontSize: "0.9rem", marginBottom: "0.6rem" }}>
                Nome do Personagem
              </label>
              <input
                id="nome"
                type="text"
                className="input-field"
                placeholder="Ex: Aryn, o Imortal"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                maxLength={30}
                required
                style={{ fontSize: "1.1rem", padding: "0.9rem 1rem" }}
              />
            </div>

            {/* Classes */}
            <div style={{ marginBottom: "2rem" }}>
              <p style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "1rem" }}>
                Escolha sua Classe
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "0.75rem" }}>
                {CLASSES_LISTA.map(([key, c]) => {
                  const selecionada = classeSelecionada === key;
                  return (
                    <div
                      key={key}
                      className="card-3d-wrapper"
                      onClick={() => setClasseSelecionada(key)}
                    >
                      <div
                        className="card card-3d"
                        style={{
                          padding: "1.25rem 1rem",
                          textAlign: "center",
                          cursor: "pointer",
                          borderColor: selecionada ? c.cor : `${c.cor}20`,
                          background: selecionada ? c.corFundo : "var(--bg2)",
                          boxShadow: selecionada ? `0 0 25px ${c.cor}40` : "none",
                          outline: selecionada ? `2px solid ${c.cor}` : "none",
                          outlineOffset: "2px",
                        }}
                      >
                        <div style={{ fontSize: "2rem", marginBottom: "0.4rem", filter: `drop-shadow(0 0 8px ${c.cor})` }}>
                          {c.emoji}
                        </div>
                        <div style={{ fontWeight: 800, fontSize: "0.85rem", color: selecionada ? c.cor : "var(--text)", marginBottom: "0.25rem" }}>
                          {c.nome}
                        </div>
                        <div style={{ fontSize: "0.7rem", color: "var(--muted)", lineHeight: 1.4 }}>
                          {c.desc.substring(0, 55)}...
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Preview da classe selecionada */}
            {info && (
              <div
                className="animate-slide-in"
                style={{
                  marginBottom: "2rem",
                  padding: "1.25rem",
                  borderRadius: "12px",
                  background: info.corFundo,
                  border: `1px solid ${info.corBorda}`,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
                  <span style={{ fontSize: "1.5rem", filter: `drop-shadow(0 0 8px ${info.cor})` }}>{info.emoji}</span>
                  <div>
                    <div style={{ fontWeight: 800, color: info.cor }}>{info.nome}</div>
                    <div style={{ fontSize: "0.8rem", color: "var(--muted)" }}>{info.desc}</div>
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.4rem" }}>
                  {(["atk", "def", "mgc", "spd"] as const).map((stat) => (
                    <div key={stat} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <span style={{ fontFamily: "monospace", fontSize: "0.65rem", textTransform: "uppercase", color: "var(--muted)", width: "2rem" }}>
                        {stat}
                      </span>
                      <div className="stat-bar-track">
                        <div className="stat-bar-fill" style={{ width: `${info[stat] * 10}%`, background: info.cor }} />
                      </div>
                      <span style={{ fontFamily: "monospace", fontSize: "0.7rem", color: info.cor }}>{info[stat]}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {erro && <p className="msg-error" style={{ marginBottom: "1rem" }}>{erro}</p>}

            <button
              type="submit"
              className="btn btn-gold"
              disabled={carregando || !classeSelecionada}
              style={{ width: "100%", fontSize: "1rem", padding: "0.9rem" }}
            >
              {carregando ? "Forjando..." : "✦ Forjar Herói"}
            </button>
          </form>
        )}
      </main>
    </div>
  );
}
