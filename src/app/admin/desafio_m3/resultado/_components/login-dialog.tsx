"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { LogIn } from "lucide-react";
import { toast } from "sonner";
import { Button } from "./button";

/** Validação do item s10 — modal de login com Dialog + Input + Button. */
export function LoginDialog() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button variant="outline"><LogIn size={18} /> Entrar</Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-[101] w-[90vw] max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/10 bg-zinc-900 p-6 shadow-2xl focus:outline-none">
          <Dialog.Title className="text-lg font-bold text-zinc-100">Entrar</Dialog.Title>
          <Dialog.Description className="mt-1 text-sm text-zinc-400">Acesse sua Central On Fire.</Dialog.Description>
          <form className="mt-4 flex flex-col gap-3">
            <input className="rounded-lg border border-white/10 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-orange-500/60" placeholder="seu@email.com" />
            <input type="password" className="rounded-lg border border-white/10 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-orange-500/60" placeholder="senha" />
            <Dialog.Close asChild>
              <Button onClick={() => toast.success("Login demo — bem-vindo! 🔥")}>Entrar</Button>
            </Dialog.Close>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
