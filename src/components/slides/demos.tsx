"use client";

/**
 * Demos interativos usados pelos slides do tipo "demo".
 * Cada demo é um componente React REAL — ícones Lucide de verdade, botões
 * componentizados com cn(), toasts do Sonner e alertas do SweetAlert2.
 * O aluno clica e vê acontecer. Registrados em DEMO_REGISTRY (fim do arquivo).
 */

import { useState } from "react";
import {
  Flame, Loader2, Trash2, Bell, Heart, Check, Star, Rocket,
  LogIn, Mail, Download, Search, Settings, ArrowRight, Sparkles, Zap, Save,
  PartyPopper, Trophy,
} from "lucide-react";
import { toast, Toaster } from "sonner";
import Swal from "sweetalert2";
import confetti from "canvas-confetti";
import { Button, stageRow } from "./demo-ui";
import { RADIX_DEMOS } from "./demos-radix";
import { CHART_DEMOS } from "./demos-charts";
import { PROJETO_DEMOS } from "./demos-projeto";

// ─── Demo: galeria de ícones Lucide ───────────────────────────────────────────
function LucideGalleryDemo() {
  const icons = [
    { C: Flame, n: "Flame" }, { C: Rocket, n: "Rocket" }, { C: Bell, n: "Bell" },
    { C: Heart, n: "Heart" }, { C: Star, n: "Star" }, { C: Search, n: "Search" },
    { C: Settings, n: "Settings" }, { C: Download, n: "Download" }, { C: Mail, n: "Mail" },
    { C: Sparkles, n: "Sparkles" }, { C: Zap, n: "Zap" }, { C: Check, n: "Check" },
  ];
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
      {icons.map(({ C, n }) => (
        <div key={n} className="flex flex-col items-center gap-2 rounded-xl border border-white/10 bg-zinc-900 p-3 text-zinc-400 transition hover:border-orange-500/40 hover:text-orange-400">
          <C size={24} />
          <span className="font-mono text-[0.65rem]">{n}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Demo: estilizando um ícone (tamanho, cor, traço) ─────────────────────────
function IconStylingDemo() {
  return (
    <div className="flex flex-col gap-5">
      <div className={stageRow}>
        <span className="w-28 font-mono text-xs text-zinc-500">size</span>
        <Flame size={16} className="text-orange-400" />
        <Flame size={24} className="text-orange-400" />
        <Flame size={32} className="text-orange-400" />
        <Flame size={48} className="text-orange-400" />
      </div>
      <div className={stageRow}>
        <span className="w-28 font-mono text-xs text-zinc-500">cor (text-*)</span>
        <Flame size={32} className="text-zinc-400" />
        <Flame size={32} className="text-amber-400" />
        <Flame size={32} className="text-orange-500" />
        <Flame size={32} className="text-red-600" />
      </div>
      <div className={stageRow}>
        <span className="w-28 font-mono text-xs text-zinc-500">strokeWidth</span>
        <Flame size={32} strokeWidth={1} className="text-orange-400" />
        <Flame size={32} strokeWidth={2} className="text-orange-400" />
        <Flame size={32} strokeWidth={3} className="text-orange-400" />
      </div>
      <div className={stageRow}>
        <span className="w-28 font-mono text-xs text-zinc-500">animate-spin</span>
        <Loader2 size={28} className="animate-spin text-orange-400" />
        <span className="text-xs text-zinc-500">qualquer ícone + animate-spin = spinner</span>
      </div>
    </div>
  );
}

// ─── Demo: ícones dentro de botões ────────────────────────────────────────────
function IconButtonDemo() {
  return (
    <div className="flex flex-col gap-4">
      <div className={stageRow}>
        <Button><LogIn size={18} /> Entrar</Button>
        <Button variant="outline">Continuar <ArrowRight size={18} /></Button>
        <Button variant="secondary"><Download size={18} /> Baixar</Button>
      </div>
      <div className={stageRow}>
        <Button size="sm" variant="ghost"><Heart size={16} /> Curtir</Button>
        {/* icon-only: precisa de aria-label para acessibilidade */}
        <Button size="sm" variant="outline" aria-label="Configurações" className="px-2.5"><Settings size={16} /></Button>
        <Button size="sm" aria-label="Salvar" className="px-2.5"><Save size={16} /></Button>
      </div>
    </div>
  );
}

// ─── Demo: variantes do componente Button (cn + variantes) ────────────────────
function ButtonVariantsDemo() {
  const [loading, setLoading] = useState(false);
  return (
    <div className="flex flex-col gap-5">
      <div className={stageRow}>
        <Button variant="primary">primary</Button>
        <Button variant="secondary">secondary</Button>
        <Button variant="outline">outline</Button>
        <Button variant="ghost">ghost</Button>
      </div>
      <div className={stageRow}>
        <Button size="sm">sm</Button>
        <Button size="md">md</Button>
        <Button size="lg">lg</Button>
      </div>
      <div className={stageRow}>
        {/* className por fora, mesclado sem conflito pelo cn() */}
        <Button className="rounded-full">className=&quot;rounded-full&quot;</Button>
        <Button
          disabled={loading}
          onClick={() => { setLoading(true); setTimeout(() => setLoading(false), 1800); }}
        >
          {loading ? <><Loader2 size={16} className="animate-spin" /> Salvando…</> : <><Save size={16} /> Salvar</>}
        </Button>
      </div>
    </div>
  );
}

// ─── Demo: Sonner (toast discreto) ────────────────────────────────────────────
function SonnerDemo() {
  return (
    <div className="flex flex-col gap-3">
      <Toaster theme="dark" richColors position="bottom-right" />
      <div className={stageRow}>
        <Button onClick={() => toast.success("Aluno cadastrado com sucesso!")}>
          <Check size={18} /> Sucesso
        </Button>
        <Button variant="outline" onClick={() => toast.error("Falha ao salvar. Tente de novo.")}>
          Erro
        </Button>
        <Button variant="secondary" onClick={() => toast("🔥 Você ganhou 50 XP!", { description: "Missão concluída." })}>
          Com descrição
        </Button>
        <Button
          variant="ghost"
          onClick={() =>
            toast("Arquivo movido para a lixeira", {
              action: { label: "Desfazer", onClick: () => toast.success("Ação desfeita!") },
            })
          }
        >
          Com ação (Desfazer)
        </Button>
      </div>
      <p className="text-xs text-zinc-500">Clique nos botões — os toasts aparecem no canto inferior direito e somem sozinhos.</p>
    </div>
  );
}

// ─── Demo: SweetAlert2 (modal bloqueante de confirmação) ──────────────────────
function SweetAlertDemo() {
  const [status, setStatus] = useState<string | null>(null);
  const confirmDelete = async () => {
    const result = await Swal.fire({
      title: "Excluir aluno?",
      text: "Essa ação não pode ser desfeita.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sim, excluir",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#3f3f46",
      background: "#18181b",
      color: "#f4f4f5",
    });
    setStatus(result.isConfirmed ? "🗑️ Excluído (confirmado)" : "✋ Cancelado pelo usuário");
  };
  return (
    <div className="flex flex-col gap-3">
      <div className={stageRow}>
        <Button variant="outline" className="border-red-500/60 text-red-400 hover:bg-red-500/10" onClick={confirmDelete}>
          <Trash2 size={18} /> Excluir aluno
        </Button>
        <Button
          variant="ghost"
          onClick={() => Swal.fire({ title: "Tudo certo!", text: "Operação concluída.", icon: "success", background: "#18181b", color: "#f4f4f5", confirmButtonColor: "#f97316" })}
        >
          Alerta de sucesso
        </Button>
      </div>
      {status && <p className="text-sm text-zinc-300">Resultado: <strong className="text-orange-400">{status}</strong></p>}
      <p className="text-xs text-zinc-500">SweetAlert BLOQUEIA a tela e espera a decisão — ideal para ações destrutivas.</p>
    </div>
  );
}

// ─── Demo: Sonner avançado (toast.promise / loading / custom) ─────────────────
function fakeSave(ok = true) {
  return new Promise<void>((resolve, reject) => setTimeout(() => (ok ? resolve() : reject()), 1600));
}

function SonnerAdvancedDemo() {
  return (
    <div className="flex flex-col gap-3">
      <Toaster theme="dark" richColors position="bottom-right" closeButton />
      <div className={stageRow}>
        <Button
          onClick={() =>
            toast.promise(fakeSave(true), {
              loading: "Salvando aluno…",
              success: "Salvo com sucesso!",
              error: "Não foi possível salvar.",
            })
          }
        >
          <Loader2 size={16} /> toast.promise (sucesso)
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            toast.promise(fakeSave(false), {
              loading: "Enviando…",
              success: "Enviado!",
              error: "Falhou — tente de novo.",
            })
          }
        >
          toast.promise (erro)
        </Button>
        <Button
          variant="secondary"
          onClick={() =>
            toast.custom((t) => (
              <div className="flex items-center gap-3 rounded-xl border border-orange-500/40 bg-zinc-900 px-4 py-3 shadow-lg">
                <Flame className="text-orange-500" size={20} />
                <div className="text-sm">
                  <p className="font-semibold text-zinc-100">Toast 100% seu</p>
                  <p className="text-zinc-400">JSX livre com toast.custom()</p>
                </div>
                <button onClick={() => toast.dismiss(t)} className="ml-2 text-xs text-orange-400 hover:underline">fechar</button>
              </div>
            ))
          }
        >
          <Sparkles size={16} /> toast.custom (JSX)
        </Button>
      </div>
      <p className="text-xs text-zinc-500">
        toast.promise cobre loading → sucesso/erro sozinho. Clique e veja o mesmo toast se transformar.
      </p>
    </div>
  );
}

// ─── Demo: canvas-confetti (celebração) ───────────────────────────────────────
const fireColors = ["#FF5500", "#FF8C00", "#FFB800", "#f97316"];

function ConfettiDemo() {
  const burst = () => {
    confetti({ particleCount: 120, spread: 70, origin: { y: 0.7 }, colors: fireColors });
  };
  const cannons = () => {
    const end = Date.now() + 800;
    (function frame() {
      confetti({ particleCount: 4, angle: 60, spread: 55, origin: { x: 0 }, colors: fireColors });
      confetti({ particleCount: 4, angle: 120, spread: 55, origin: { x: 1 }, colors: fireColors });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  };
  const celebrate = () => {
    burst();
    toast.success("🏆 Missão concluída! +50 XP");
  };
  return (
    <div className="flex flex-col gap-3">
      <Toaster theme="dark" richColors position="bottom-right" />
      <div className={stageRow}>
        <Button onClick={burst}><PartyPopper size={18} /> Explosão única</Button>
        <Button variant="outline" onClick={cannons}><Rocket size={18} /> Canhões laterais</Button>
        <Button variant="secondary" onClick={celebrate}><Trophy size={18} /> Confete + toast</Button>
      </div>
      <p className="text-xs text-zinc-500">
        canvas-confetti é imperativo: você CHAMA confetti() num clique. Uma explosão, não uma nevasca eterna.
      </p>
    </div>
  );
}

// ─── Demo: SweetAlert2 avançado (input + toast mode) ──────────────────────────
function SweetAlertAdvancedDemo() {
  const pedirMotivo = async () => {
    const { value: motivo } = await Swal.fire({
      title: "Motivo do cancelamento",
      input: "text",
      inputPlaceholder: "Digite o motivo…",
      showCancelButton: true,
      confirmButtonText: "Enviar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#f97316",
      cancelButtonColor: "#3f3f46",
      background: "#18181b",
      color: "#f4f4f5",
    });
    if (motivo) toast.success(`Motivo registrado: "${motivo}"`);
  };
  const toastMode = () => {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 2500,
      timerProgressBar: true,
      background: "#18181b",
      color: "#f4f4f5",
    });
    Toast.fire({ icon: "success", title: "Preferências salvas" });
  };
  return (
    <div className="flex flex-col gap-3">
      <Toaster theme="dark" richColors position="bottom-right" />
      <div className={stageRow}>
        <Button onClick={pedirMotivo}><Mail size={18} /> Pedir um valor (input)</Button>
        <Button variant="outline" onClick={toastMode}><Bell size={18} /> Toast mode (canto)</Button>
      </div>
      <p className="text-xs text-zinc-500">
        O SweetAlert também captura input e faz toasts discretos (mixin toast:true). Clique e compare com o modal bloqueante.
      </p>
    </div>
  );
}

export const DEMO_REGISTRY: Record<string, React.ComponentType> = {
  // Aula 02 — ícones, componentes, feedback básico
  "lucide-gallery": LucideGalleryDemo,
  "icon-styling": IconStylingDemo,
  "icon-button": IconButtonDemo,
  "button-variants": ButtonVariantsDemo,
  "sonner-toast": SonnerDemo,
  "sweetalert-confirm": SweetAlertDemo,
  // Aula 04 — micro-interações avançadas
  "sonner-advanced": SonnerAdvancedDemo,
  "sweetalert-advanced": SweetAlertAdvancedDemo,
  "confetti": ConfettiDemo,
  // Aula 03 — Radix / Headless
  ...RADIX_DEMOS,
  // Aula 05 — gráficos (recharts)
  ...CHART_DEMOS,
  // Projeto incremental do módulo (Central On Fire), estágios 1→5
  ...PROJETO_DEMOS,
};
