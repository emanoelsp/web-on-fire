"use client";

import { useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Switch from "@radix-ui/react-switch";
import { Flame, User, Settings, LogOut } from "lucide-react";

/** Validação do item s9 — header com DropdownMenu + Switch acessíveis (Radix). */
export function Header() {
  const [notif, setNotif] = useState(true);
  const item = "flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-zinc-300 outline-none data-[highlighted]:bg-orange-500/15 data-[highlighted]:text-orange-300 cursor-pointer";

  return (
    <header className="flex items-center justify-between rounded-xl border border-white/10 bg-zinc-900/60 px-6 py-4">
      <div className="flex items-center gap-2 font-bold text-zinc-100">
        <Flame className="text-orange-500" size={22} /> Central On Fire
      </div>
      <div className="flex items-center gap-4">
        <Switch.Root
          checked={notif}
          onCheckedChange={setNotif}
          aria-label="Notificações"
          className="relative h-6 w-11 rounded-full bg-zinc-700 outline-none transition-colors data-[state=checked]:bg-orange-500"
        >
          <Switch.Thumb className="block h-5 w-5 translate-x-0.5 rounded-full bg-white transition-transform data-[state=checked]:translate-x-[22px]" />
        </Switch.Root>

        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button aria-label="Menu do usuário" className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-500/20 text-orange-400 hover:bg-orange-500/30">
              <User size={18} />
            </button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content sideOffset={8} align="end" className="z-[101] min-w-44 rounded-xl border border-white/10 bg-zinc-900 p-1.5 shadow-2xl">
              <DropdownMenu.Item className={item}><Settings size={16} /> Preferências</DropdownMenu.Item>
              <DropdownMenu.Separator className="my-1.5 h-px bg-white/10" />
              <DropdownMenu.Item className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-400 outline-none data-[highlighted]:bg-red-500/15 cursor-pointer">
                <LogOut size={16} /> Sair
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>
    </header>
  );
}
