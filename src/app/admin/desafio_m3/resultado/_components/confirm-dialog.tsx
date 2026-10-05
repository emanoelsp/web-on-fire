"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Trash2 } from "lucide-react";
import { Button } from "./button";

/** Validação do item s11 — modal de confirmação acessível (foco preso, Esc, Tab). */
export function ConfirmDialog() {
  return (
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
            Esta ação não pode ser desfeita.
          </Dialog.Description>
          <div className="mt-6 flex justify-end gap-3">
            <Dialog.Close asChild><Button variant="ghost">Cancelar</Button></Dialog.Close>
            <Dialog.Close asChild><Button className="bg-red-600 hover:bg-red-700 shadow-red-600/20">Sim, excluir</Button></Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
