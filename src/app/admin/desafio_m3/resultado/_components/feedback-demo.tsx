"use client";

import Swal from "sweetalert2";
import confetti from "canvas-confetti";
import { toast } from "sonner";
import { Trash2, Trophy } from "lucide-react";
import { Button } from "./button";
import { Card } from "./card";

const fireColors = ["#FF5500", "#FF8C00", "#FFB800", "#f97316"];

function salvarAluno() {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => (Math.random() > 0.2 ? resolve() : reject()), 1600);
  });
}

/** Validação dos itens s12–s14 (e bônus b4: confete + toast juntos). */
export function FeedbackDemo() {
  const excluir = async () => {
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
    if (result.isConfirmed) toast.success("Aluno excluído.");
  };

  const concluir = () => {
    confetti({ particleCount: 120, spread: 70, origin: { y: 0.7 }, colors: fireColors });
    toast.success("🏆 Missão concluída! +50 XP");
  };

  return (
    <Card className="flex flex-wrap items-center gap-3">
      <Button
        onClick={() =>
          toast.promise(salvarAluno(), {
            loading: "Salvando aluno…",
            success: "Salvo com sucesso!",
            error: "Não foi possível salvar.",
          })
        }
      >
        Salvar (toast.promise)
      </Button>
      <Button variant="outline" className="border-red-500/60 text-red-400 hover:bg-red-500/10" onClick={excluir}>
        <Trash2 size={18} /> Excluir aluno (SweetAlert)
      </Button>
      <Button variant="secondary" onClick={concluir}>
        <Trophy size={18} /> Concluir missão (confete + toast)
      </Button>
    </Card>
  );
}
