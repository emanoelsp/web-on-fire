"use client";

/**
 * Demos da Aula 03 — Headless UI (Radix). Componentes SEM estilo próprio,
 * estilizados por nós com Tailwind no padrão zinc/orange. Acessibilidade
 * (foco preso, Esc, teclado, ARIA) vem de fábrica — é o que o Shadcn embrulha.
 */

import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Tooltip from "@radix-ui/react-tooltip";
import * as Switch from "@radix-ui/react-switch";
import * as Accordion from "@radix-ui/react-accordion";
import { Trash2, ChevronDown, User, Settings, LogOut, Info, MoreHorizontal } from "lucide-react";
import { Button, stageRow } from "./demo-ui";

// ─── Dialog acessível (modal) ─────────────────────────────────────────────────
function RadixDialogDemo() {
  return (
    <div className="flex flex-col gap-3">
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <Button variant="outline" className="border-red-500/60 text-red-400 hover:bg-red-500/10">
            <Trash2 size={18} /> Excluir conta
          </Button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm" />
          <Dialog.Content className="fixed left-1/2 top-1/2 z-[101] w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/10 bg-zinc-900 p-6 shadow-2xl focus:outline-none">
            <Dialog.Title className="text-lg font-bold text-zinc-100">Tem certeza absoluta?</Dialog.Title>
            <Dialog.Description className="mt-2 text-sm text-zinc-400">
              Esta ação não pode ser desfeita. A conta e todos os dados serão removidos permanentemente.
            </Dialog.Description>
            <div className="mt-6 flex justify-end gap-3">
              <Dialog.Close asChild>
                <Button variant="ghost">Cancelar</Button>
              </Dialog.Close>
              <Dialog.Close asChild>
                <Button className="bg-red-600 hover:bg-red-700 shadow-red-600/20">Sim, excluir</Button>
              </Dialog.Close>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
      <p className="text-xs text-zinc-500">
        Abra e teste: <kbd className="rounded bg-zinc-800 px-1.5 py-0.5 font-mono text-[0.7rem]">Esc</kbd> fecha,
        clicar fora fecha, o foco fica preso no modal, e o &lt;body&gt; trava o scroll. Zero código nosso pra isso.
      </p>
    </div>
  );
}

// ─── Dropdown Menu (navegável por teclado) ────────────────────────────────────
function RadixDropdownDemo() {
  const item = "flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-zinc-300 outline-none data-[highlighted]:bg-orange-500/15 data-[highlighted]:text-orange-300 cursor-pointer";
  return (
    <div className="flex flex-col gap-3">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <Button variant="secondary"><MoreHorizontal size={18} /> Opções</Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            sideOffset={8}
            className="z-[101] min-w-48 rounded-xl border border-white/10 bg-zinc-900 p-1.5 shadow-2xl"
          >
            <DropdownMenu.Item className={item}><User size={16} /> Meu perfil</DropdownMenu.Item>
            <DropdownMenu.Item className={item}><Settings size={16} /> Configurações</DropdownMenu.Item>
            <DropdownMenu.Separator className="my-1.5 h-px bg-white/10" />
            <DropdownMenu.Item className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-400 outline-none data-[highlighted]:bg-red-500/15 cursor-pointer">
              <LogOut size={16} /> Sair
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
      <p className="text-xs text-zinc-500">
        Abra e use as <strong>setas ↑ ↓</strong> do teclado + <kbd className="rounded bg-zinc-800 px-1.5 py-0.5 font-mono text-[0.7rem]">Enter</kbd>.
        O <code>data-[highlighted]</code> é o Radix marcando o item focado — você só pinta.
      </p>
    </div>
  );
}

// ─── Tooltip + Switch ─────────────────────────────────────────────────────────
function RadixTooltipSwitchDemo() {
  const [on, setOn] = useState(true);
  return (
    <div className="flex flex-col gap-5">
      <div className={stageRow}>
        <span className="w-28 font-mono text-xs text-zinc-500">Tooltip</span>
        <Tooltip.Provider delayDuration={200}>
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <button className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-1.5 text-sm text-zinc-300 hover:border-orange-500/40">
                <Info size={16} /> Passe o mouse
              </button>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content
                sideOffset={6}
                className="z-[101] rounded-lg bg-zinc-100 px-2.5 py-1.5 text-xs font-medium text-zinc-900 shadow-lg"
              >
                Dica acessível (aparece no foco também)
                <Tooltip.Arrow className="fill-zinc-100" />
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>
      </div>
      <div className={stageRow}>
        <span className="w-28 font-mono text-xs text-zinc-500">Switch</span>
        <Switch.Root
          checked={on}
          onCheckedChange={setOn}
          className="relative h-6 w-11 rounded-full bg-zinc-700 transition-colors data-[state=checked]:bg-orange-500 outline-none"
        >
          <Switch.Thumb className="block h-5 w-5 translate-x-0.5 rounded-full bg-white transition-transform data-[state=checked]:translate-x-[22px]" />
        </Switch.Root>
        <span className="text-sm text-zinc-400">{on ? "Notificações ligadas" : "Notificações desligadas"}</span>
      </div>
    </div>
  );
}

// ─── Accordion ────────────────────────────────────────────────────────────────
function RadixAccordionDemo() {
  const items = [
    { q: "O que é headless UI?", a: "Componentes que entregam comportamento e acessibilidade, sem visual — você estiliza." },
    { q: "Preciso instalar o Radix separado?", a: "Com Shadcn, o Radix vem como dependência dos componentes que você copia. Aqui usamos direto pra mostrar a base." },
    { q: "Funciona com teclado?", a: "Sim: Tab, setas e Enter navegam e abrem/fecham. É o padrão WAI-ARIA de accordion." },
  ];
  return (
    <Accordion.Root type="single" collapsible className="w-full max-w-lg divide-y divide-white/10 rounded-xl border border-white/10 bg-zinc-900">
      {items.map((it, i) => (
        <Accordion.Item key={i} value={`item-${i}`}>
          <Accordion.Header>
            <Accordion.Trigger className="group flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium text-zinc-200 outline-none hover:text-orange-300">
              {it.q}
              <ChevronDown size={16} className="text-zinc-500 transition-transform group-data-[state=open]:rotate-180" />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="overflow-hidden px-4 pb-3 text-sm text-zinc-400">
            {it.a}
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}

export const RADIX_DEMOS: Record<string, React.ComponentType> = {
  "radix-dialog": RadixDialogDemo,
  "radix-dropdown": RadixDropdownDemo,
  "radix-tooltip-switch": RadixTooltipSwitchDemo,
  "radix-accordion": RadixAccordionDemo,
};
