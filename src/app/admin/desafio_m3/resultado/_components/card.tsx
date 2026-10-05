import { cn } from "@/lib/utils";

/** Validação do item s6 — Card reutilizável via cn(). */
export function Card({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("rounded-xl border border-white/10 bg-zinc-900 p-4", className)} {...props} />;
}
