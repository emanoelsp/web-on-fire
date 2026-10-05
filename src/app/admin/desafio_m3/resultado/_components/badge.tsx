import { cn } from "@/lib/utils";

/** Validação do item s6 — Badge reutilizável via cn(). */
export function Badge({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "inline-block rounded-full border border-orange-500/40 bg-orange-500/10 px-3 py-1 text-xs font-semibold text-orange-400",
        className,
      )}
      {...props}
    />
  );
}
