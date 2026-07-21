import type { Badge, FlameStatus, Level } from "@/types/gamification";

// ─── Valores de XP ───────────────────────────────────────────────────────────

export const XP_VALUES = {
  QUIZ: 15,
  FILL_BLANK: 20,
  MINI_CHALLENGE: 50,
  AULA_COMPLETA: 40,
  LOGIN_DIARIO: 5,
} as const;

// ─── Regra da chama (aula é semanal) ─────────────────────────────────────────
// Até 7 dias sem acesso: tudo bem — a aula é 1x por semana.
// Passou de 7 dias: perde DECAY_XP_POR_DIA por dia extra, até DECAY_MAX por retorno.

export const DECAY_GRACE_DAYS = 7;
export const DECAY_XP_POR_DIA = 10;
export const DECAY_MAX = 150;

export function daysBetween(isoDateA: string, isoDateB: string): number {
  const a = new Date(`${isoDateA}T00:00:00`);
  const b = new Date(`${isoDateB}T00:00:00`);
  return Math.round((b.getTime() - a.getTime()) / 86400000);
}

export function todayISO(): string {
  return new Date().toISOString().split("T")[0];
}

export function computeDecay(lastAccessDate: string | null, today = todayISO()): number {
  if (!lastAccessDate) return 0;
  const days = daysBetween(lastAccessDate, today);
  if (days <= DECAY_GRACE_DAYS) return 0;
  return Math.min((days - DECAY_GRACE_DAYS) * DECAY_XP_POR_DIA, DECAY_MAX);
}

export function getFlameStatus(lastAccessDate: string | null, today = todayISO()): FlameStatus {
  if (!lastAccessDate) return "acesa";
  const days = daysBetween(lastAccessDate, today);
  if (days <= 3) return "acesa";
  if (days <= DECAY_GRACE_DAYS) return "enfraquecendo";
  return "apagando";
}

export const FLAME_INFO: Record<FlameStatus, { icon: string; label: string; desc: string; color: string }> = {
  acesa: {
    icon: "🔥",
    label: "Chama acesa",
    desc: "Você está em dia. Continue assim!",
    color: "#FF7744",
  },
  enfraquecendo: {
    icon: "🕯️",
    label: "Chama enfraquecendo",
    desc: "Mais de 3 dias sem estudar. Volte antes de completar 7 dias para não perder pontos.",
    color: "#fbbf24",
  },
  apagando: {
    icon: "💨",
    label: "Chama apagando",
    desc: "Mais de 7 dias sem acesso — você está perdendo 10 XP por dia. Acenda a chama de novo!",
    color: "#94a3b8",
  },
};

// ─── Níveis ──────────────────────────────────────────────────────────────────

export const LEVELS: Level[] = [
  { level: 1, name: "Faísca",       xpRequired: 0,    icon: "✨" },
  { level: 2, name: "Chama",        xpRequired: 250,  icon: "🕯️" },
  { level: 3, name: "Fogueira",     xpRequired: 600,  icon: "🔥" },
  { level: 4, name: "Labareda",     xpRequired: 1200, icon: "🎆" },
  { level: 5, name: "Incêndio",     xpRequired: 2200, icon: "🌋" },
  { level: 6, name: "Lenda On Fire", xpRequired: 3500, icon: "🐉" },
];

export function getLevelFromXP(xp: number): Level {
  return [...LEVELS].reverse().find((l) => xp >= l.xpRequired) ?? LEVELS[0];
}

export function getNextLevel(currentLevel: number): Level | null {
  return LEVELS.find((l) => l.level === currentLevel + 1) ?? null;
}

export function getXPProgressPercent(xp: number): number {
  const current = getLevelFromXP(xp);
  const next = getNextLevel(current.level);
  if (!next) return 100;
  const range = next.xpRequired - current.xpRequired;
  const earned = xp - current.xpRequired;
  return Math.min(Math.round((earned / range) * 100), 100);
}

// ─── Badges ──────────────────────────────────────────────────────────────────

export const BADGES: Badge[] = [
  {
    id: "primeira_faisca",
    name: "Primeira Faísca",
    description: "Completou a primeira parte de Node.js — o fogo começou.",
    icon: "✨",
    xpBonus: 30,
    condition: "aula:infra-node-1",
  },
  {
    id: "senhor_do_loop",
    name: "Senhor do Loop",
    description: "Dominou o event loop e o I/O não bloqueante.",
    icon: "⚡",
    xpBonus: 50,
    condition: "aula:infra-node-2",
  },
  {
    id: "arquiteto_runtime",
    name: "Arquiteto de Runtime",
    description: "Concluiu a Aula 01 — fundamentos de Node.js completos.",
    icon: "🟢",
    xpBonus: 50,
    condition: "aula:infra-node-3",
  },
  {
    id: "guardiao_dos_tipos",
    name: "Guardião dos Tipos",
    description: "Concluiu a Aula 02 — tipagem estática com TypeScript.",
    icon: "🛡️",
    xpBonus: 75,
    condition: "aula:infra-typescript",
  },
  {
    id: "viajante_do_tempo",
    name: "Viajante do Tempo",
    description: "Concluiu a Aula 03 — versionamento com Git e GitHub.",
    icon: "⏳",
    xpBonus: 75,
    condition: "aula:infra-git",
  },
  {
    id: "fundacao_de_aco",
    name: "Fundação de Aço",
    description: "Completou o Módulo 01 — Infraestrutura e Nivelamento.",
    icon: "🏗️",
    xpBonus: 100,
    condition: "modulo:infra",
  },
  {
    id: "next_iniciado",
    name: "Iniciado no Next",
    description: "Completou as fundações do Next.js (App Router).",
    icon: "⚡",
    xpBonus: 50,
    condition: "aula:nextjs-intro",
  },
  {
    id: "arquiteto_next",
    name: "Arquiteto do Next",
    description: "Venceu o Desafio TechBlog — arquitetura core do Next.js.",
    icon: "🏛️",
    xpBonus: 120,
    condition: "aula:nextjs-desafio",
  },
  {
    id: "designer_de_fogo",
    name: "Designer de Fogo",
    description: "Concluiu o Painel On Fire — estilização, UI e dashboards.",
    icon: "🎨",
    xpBonus: 120,
    condition: "aula:ui-desafio",
  },
  {
    id: "engenheiro_fullstack",
    name: "Engenheiro Full-stack",
    description: "Entregou o software no ar — auth, Firestore, Server Actions e deploy.",
    icon: "🚀",
    xpBonus: 150,
    condition: "aula:dados-desafio",
  },
  {
    id: "domador_do_fogo",
    name: "Domador do Fogo",
    description: "Completou o Laboratório do Sistema Acadêmico com Firestore.",
    icon: "🔥",
    xpBonus: 150,
    condition: "aula:backend-aula-83",
  },
  {
    id: "semana_perfeita",
    name: "Constância de Ferro",
    description: "Manteve a chama acesa por 4 semanas seguidas.",
    icon: "🗓️",
    xpBonus: 100,
    condition: "especial:streak-4",
  },
];

export function getBadge(id: string): Badge | undefined {
  return BADGES.find((b) => b.id === id);
}
