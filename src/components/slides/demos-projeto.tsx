"use client";

/**
 * PROJETO INCREMENTAL DO MÓDULO — "Central On Fire".
 * A mesma página nasce na Aula 01 (só Tailwind) e ganha uma camada por aula,
 * até virar um painel completo na Aula 05. Cada aula fecha com o demo
 * "O projeto até aqui" mostrando o estágio correspondente. Antecipa o
 * Desafio Final (Painel On Fire).
 *
 * Estágio 1 — Tailwind: hero, gradiente, bordas, sombra, hover
 * Estágio 2 — Ícones + Componentes: <Button> + Lucide + toast no CTA
 * Estágio 3 — Radix/Shadcn: header com dropdown, switch e modal de login
 * Estágio 4 — Feedback: confetti + toast.promise + SweetAlert
 * Estágio 5 — Dashboard: KPIs + gráfico (recharts)
 */

import { useState } from "react";
import {
  Flame, Rocket, ArrowRight, LogIn, User, Settings, LogOut, Trash2,
  Trophy, TrendingUp, Users,
} from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as SwitchP from "@radix-ui/react-switch";
import { toast, Toaster } from "sonner";
import Swal from "sweetalert2";
import confetti from "canvas-confetti";
import {
  ResponsiveContainer, BarChart, Bar, XAxis, Tooltip as RTooltip, CartesianGrid,
} from "recharts";
import { Button } from "./demo-ui";

const fireColors = ["#FF5500", "#FF8C00", "#FFB800", "#f97316"];
const acessos = [
  { s: "Seg", v: 32 }, { s: "Ter", v: 51 }, { s: "Qua", v: 44 },
  { s: "Qui", v: 68 }, { s: "Sex", v: 90 }, { s: "Sáb", v: 40 },
];

function fakeSave() {
  return new Promise<void>((resolve) => setTimeout(resolve, 1500));
}

function UserMenu() {
  const item = "flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-zinc-300 outline-none data-[highlighted]:bg-orange-500/15 data-[highlighted]:text-orange-300 cursor-pointer";
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-500/20 text-orange-400 outline-none hover:bg-orange-500/30" aria-label="Menu do usuário">
          <User size={18} />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content sideOffset={8} align="end" className="z-[101] min-w-44 rounded-xl border border-white/10 bg-zinc-900 p-1.5 shadow-2xl">
          <DropdownMenu.Item className={item}><User size={16} /> Perfil</DropdownMenu.Item>
          <DropdownMenu.Item className={item}><Settings size={16} /> Preferências</DropdownMenu.Item>
          <DropdownMenu.Separator className="my-1.5 h-px bg-white/10" />
          <DropdownMenu.Item className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-400 outline-none data-[highlighted]:bg-red-500/15 cursor-pointer"><LogOut size={16} /> Sair</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

function LoginDialog() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button variant="outline"><LogIn size={18} /> Entrar</Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-[101] w-[90vw] max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/10 bg-zinc-900 p-6 shadow-2xl focus:outline-none">
          <Dialog.Title className="text-lg font-bold text-zinc-100">Entrar na Academy</Dialog.Title>
          <Dialog.Description className="mt-1 text-sm text-zinc-400">Acesse sua trilha de fogo.</Dialog.Description>
          <div className="mt-4 flex flex-col gap-3">
            <input className="rounded-lg border border-white/10 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-orange-500/60" placeholder="seu@email.com" />
            <input type="password" className="rounded-lg border border-white/10 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-orange-500/60" placeholder="senha" />
            <Dialog.Close asChild>
              <Button onClick={() => toast.success("Login demo — bem-vindo! 🔥")}>Entrar</Button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function ProjetoOnFire({ stage }: { stage: 1 | 2 | 3 | 4 | 5 }) {
  const [notif, setNotif] = useState(true);

  const concluir = () => {
    confetti({ particleCount: 120, spread: 70, origin: { y: 0.7 }, colors: fireColors });
    toast.success("🏆 Missão concluída! +50 XP");
  };
  const excluir = async () => {
    const r = await Swal.fire({
      title: "Sair da turma?", text: "Você perderá o progresso desta trilha.",
      icon: "warning", showCancelButton: true, confirmButtonText: "Sim, sair",
      cancelButtonText: "Cancelar", confirmButtonColor: "#dc2626", cancelButtonColor: "#3f3f46",
      background: "#18181b", color: "#f4f4f5",
    });
    if (r.isConfirmed) toast.success("Você saiu da turma.");
  };
  const comecar = () => {
    if (stage >= 4) toast.promise(fakeSave(), { loading: "Preparando sua trilha…", success: "Trilha pronta! 🔥", error: "Ops." });
    else toast.success("Bem-vindo à sua trilha! 🔥");
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-zinc-900/80 p-6 shadow-2xl">
      {stage >= 3 && <Toaster theme="dark" richColors position="bottom-right" />}

      {/* HEADER — surge no estágio 2 */}
      {stage >= 2 && (
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame className="text-orange-500" size={22} />
            <span className="font-bold text-zinc-100">On Fire Academy</span>
          </div>
          {stage >= 3 && (
            <div className="flex items-center gap-3">
              <SwitchP.Root checked={notif} onCheckedChange={setNotif} className="relative h-5 w-9 rounded-full bg-zinc-700 outline-none transition-colors data-[state=checked]:bg-orange-500" aria-label="Notificações">
                <SwitchP.Thumb className="block h-4 w-4 translate-x-0.5 rounded-full bg-white transition-transform data-[state=checked]:translate-x-[18px]" />
              </SwitchP.Root>
              <UserMenu />
            </div>
          )}
        </div>
      )}

      {/* HERO — sempre presente (nasce no estágio 1) */}
      <span className="inline-block rounded-full border border-orange-500/40 bg-orange-500/10 px-3 py-1 text-xs font-semibold text-orange-400">
        🔥 Trilha Front-End
      </span>
      <h3 className="mt-3 bg-gradient-to-r from-amber-300 via-orange-400 to-red-500 bg-clip-text text-2xl font-extrabold leading-tight text-transparent md:text-3xl">
        Domine o Front-End no fogo
      </h3>
      <p className="mt-2 max-w-md text-sm text-zinc-400">
        Do primeiro botão ao painel completo — estilização, componentes e dados numa trilha só.
      </p>

      {/* AÇÕES — evoluem por estágio */}
      <div className="mt-5 flex flex-wrap items-center gap-3">
        {stage === 1 ? (
          <>
            <button className="rounded-lg bg-gradient-to-br from-amber-400 via-orange-500 to-red-600 px-6 py-3 font-semibold text-white shadow-lg shadow-orange-500/30 transition hover:-translate-y-0.5 hover:brightness-110 active:scale-95">
              Começar agora
            </button>
            <button className="rounded-lg border-2 border-orange-500/60 px-6 py-3 font-semibold text-orange-400 transition hover:bg-orange-500/10">
              Ver trilha
            </button>
          </>
        ) : (
          <>
            <Button size="lg" onClick={comecar}><Rocket size={18} /> Começar agora</Button>
            <Button size="lg" variant="outline"><ArrowRight size={18} /> Ver trilha</Button>
            {stage >= 3 && <LoginDialog />}
            {stage >= 4 && (
              <>
                <Button size="lg" variant="secondary" onClick={concluir}><Trophy size={18} /> Concluir missão</Button>
                <Button size="lg" variant="ghost" className="text-red-400 hover:bg-red-500/10" onClick={excluir}><Trash2 size={18} /></Button>
              </>
            )}
          </>
        )}
      </div>

      {/* DASHBOARD — surge no estágio 5 */}
      {stage >= 5 && (
        <div className="mt-6 border-t border-white/10 pt-6">
          <div className="mb-4 grid grid-cols-3 gap-3">
            {[
              { l: "Alunos", v: "128", Icon: Users },
              { l: "XP médio", v: "1.840", Icon: Flame },
              { l: "Conclusão", v: "63%", Icon: Trophy },
            ].map(({ l, v, Icon }) => (
              <div key={l} className="rounded-xl border border-white/10 bg-zinc-950/60 p-3">
                <div className="flex items-center justify-between text-zinc-400">
                  <span className="text-[0.7rem]">{l}</span>
                  <Icon size={14} className="text-orange-500" />
                </div>
                <div className="mt-1 flex items-center gap-1">
                  <span className="text-xl font-bold text-zinc-50">{v}</span>
                  <TrendingUp size={12} className="text-emerald-400" />
                </div>
              </div>
            ))}
          </div>
          <div style={{ width: "100%", height: 150 }}>
            <ResponsiveContainer>
              <BarChart data={acessos} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
                <XAxis dataKey="s" stroke="#71717a" fontSize={11} tickLine={false} axisLine={false} />
                <RTooltip contentStyle={{ background: "#18181b", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px", fontSize: "0.75rem" }} cursor={{ fill: "rgba(255,85,0,0.08)" }} />
                <Bar dataKey="v" fill="#FF5500" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}

export const PROJETO_DEMOS: Record<string, React.ComponentType> = {
  "projeto-1": () => <ProjetoOnFire stage={1} />,
  "projeto-2": () => <ProjetoOnFire stage={2} />,
  "projeto-3": () => <ProjetoOnFire stage={3} />,
  "projeto-4": () => <ProjetoOnFire stage={4} />,
  "projeto-5": () => <ProjetoOnFire stage={5} />,
};
