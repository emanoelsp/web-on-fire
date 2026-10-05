"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Toaster } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { adminAuthHeaders } from "@/lib/adminClient";
import { HeroRaw } from "./_components/hero-raw";
import { ButtonGallery } from "./_components/button-gallery";
import { Header } from "./_components/header";
import { LoginDialog } from "./_components/login-dialog";
import { ConfirmDialog } from "./_components/confirm-dialog";
import { FeedbackDemo } from "./_components/feedback-demo";
import { DashboardCharts } from "./_components/dashboard-charts";
import { getDashboardData, type DashboardData } from "./_data/dashboard-data";

/**
 * Resultado ao vivo do gabarito (docs/resolucao_desafio_modulo3.md) — cada
 * seção abaixo roda o código exatamente como está no gabarito, para o
 * professor confirmar que todo passo funciona antes da aula.
 *
 * Bônus b2, b4 e b5 já aparecem embutidos nas seções (reduce nos dados,
 * confete+toast juntos, degradê na área). Bônus b1 (tema no localStorage) e
 * b3 (React Hook Form + Zod) não foram exercitados aqui: b1 exigiria um
 * toggle de tema só para esta página (o admin já é dark-only) e b3 exigiria
 * duas dependências novas fora do checklist principal.
 */

const sectionTitle = "mb-3 flex items-baseline gap-2 text-sm font-bold uppercase tracking-wide text-orange-400";
const sectionTag = "rounded-full border border-orange-500/30 bg-orange-500/10 px-2 py-0.5 font-mono text-[0.65rem] text-orange-300";

export default function AdminDesafioM3ResultadoPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);

  const checkAuth = useCallback(async () => {
    const headers = await adminAuthHeaders(user);
    const res = await fetch("/api/admin/modules", { headers });
    if (res.status === 401) {
      router.push("/admin/login");
      return;
    }
    setAuthorized(true);
    setLoading(false);
    setDashboard(await getDashboardData());
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
      <Toaster theme="dark" richColors position="bottom-right" />

      <header
        style={{
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          background: "rgba(8,8,8,0.95)",
          position: "sticky",
          top: 0,
          zIndex: 50,
        }}
      >
        <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "0 1.5rem", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <span style={{ fontSize: "1.2rem" }}>🔥</span>
              <span className="fire-text" style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", letterSpacing: "0.06em" }}>
                WEB ON FIRE
              </span>
            </Link>
            <span style={{ color: "rgba(255,255,255,0.15)", fontSize: "0.8rem" }}>/</span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "rgba(255,119,68,0.8)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              admin · desafio m3 · resultado
            </span>
          </div>
          <Link
            href="/admin/desafio_m3"
            style={{ padding: "0.4rem 1rem", borderRadius: "8px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.6)", fontSize: "0.78rem", textDecoration: "none" }}
          >
            ← Gabarito
          </Link>
        </div>
      </header>

      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "3rem 1.5rem", display: "flex", flexDirection: "column", gap: "3rem" }}>
        <div>
          <span className="badge badge-fire" style={{ marginBottom: "1rem", display: "inline-flex" }}>
            🧪 Smoke test — cada seção roda o código do gabarito ao vivo
          </span>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "0.04em", color: "var(--text-primary)" }}>
            RESULTADO · DESAFIO M03
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
            Clique, abra os modais, confirme com Tab/Esc — se algo aqui quebrar, o mesmo passo vai quebrar na aula.
          </p>
        </div>

        <section>
          <div className={sectionTitle}><span className={sectionTag}>s1–s4</span> Estágio 1 · Fundação (Tailwind)</div>
          <HeroRaw />
        </section>

        <section>
          <div className={sectionTitle}><span className={sectionTag}>s5–s8</span> Estágio 2 · Design System</div>
          <ButtonGallery />
        </section>

        <section>
          <div className={sectionTitle}><span className={sectionTag}>s9–s11</span> Estágio 3 · Acessível (Headless/Shadcn)</div>
          <div className="flex flex-col gap-3">
            <Header />
            <div className="flex flex-wrap items-center gap-3 rounded-xl border border-white/10 bg-zinc-900/60 p-4">
              <LoginDialog />
              <ConfirmDialog />
              <span className="text-xs text-zinc-500">Teste: abra um modal, aperte Tab em loop (foco não escapa) e Esc (fecha).</span>
            </div>
          </div>
        </section>

        <section>
          <div className={sectionTitle}><span className={sectionTag}>s12–s14</span> Estágio 4 · Micro-interações</div>
          <FeedbackDemo />
        </section>

        <section>
          <div className={sectionTitle}><span className={sectionTag}>s15–s18</span> Estágio 5 · Painel de Dados</div>
          {dashboard ? (
            <DashboardCharts {...dashboard} />
          ) : (
            <p style={{ color: "var(--text-muted)", fontSize: "0.88rem" }}>Carregando dados do dashboard…</p>
          )}
        </section>
      </div>
    </main>
  );
}
