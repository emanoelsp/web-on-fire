"use client";

/** Peças de UI compartilhadas pelos demos interativos dos slides. */

import { cn } from "@/lib/utils";

export type BtnVariant = "primary" | "secondary" | "ghost" | "outline";
export type BtnSize = "sm" | "md" | "lg";

const btnVariants: Record<BtnVariant, string> = {
  primary: "bg-orange-500 text-white hover:bg-orange-600 shadow-lg shadow-orange-500/20",
  secondary: "bg-zinc-800 text-zinc-100 hover:bg-zinc-700",
  ghost: "bg-transparent text-zinc-300 hover:bg-white/5",
  outline: "border border-orange-500/60 text-orange-400 hover:bg-orange-500/10",
};
const btnSizes: Record<BtnSize, string> = {
  sm: "px-3 py-1.5 text-sm gap-1.5",
  md: "px-5 py-2.5 text-sm gap-2",
  lg: "px-7 py-3 text-base gap-2.5",
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: React.ComponentProps<"button"> & { variant?: BtnVariant; size?: BtnSize }) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-lg font-semibold transition active:scale-95 disabled:opacity-50 disabled:pointer-events-none cursor-pointer",
        btnVariants[variant],
        btnSizes[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export const stageRow = "flex flex-wrap items-center gap-4";
