"use client";

import { toast } from "sonner";
import { LogIn, Settings, Save } from "lucide-react";
import { Button } from "./button";
import { Card } from "./card";
import { Badge } from "./badge";

/** Validação dos itens s5–s8 — Button/Card/Badge reais, ícones e CTA com toast. */
export function ButtonGallery() {
  return (
    <Card className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center gap-3">
        <Button variant="primary">primary</Button>
        <Button variant="secondary">secondary</Button>
        <Button variant="outline">outline</Button>
        <Button variant="ghost">ghost</Button>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Button size="sm">sm</Button>
        <Button size="md">md</Button>
        <Button size="lg">lg</Button>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Button><LogIn size={18} /> Entrar</Button>
        {/* icon-only: precisa de aria-label para acessibilidade (item s7) */}
        <Button size="sm" variant="outline" aria-label="Configurações" className="px-2.5"><Settings size={16} /></Button>
        <Badge>🏆 128 alunos</Badge>
      </div>
      <div>
        {/* item s8 — CTA dispara toast.success */}
        <Button size="lg" onClick={() => toast.success("Bem-vindo à Central On Fire! 🔥")}>
          <Save size={18} /> Começar agora
        </Button>
      </div>
    </Card>
  );
}
