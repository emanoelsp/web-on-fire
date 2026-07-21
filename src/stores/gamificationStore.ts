"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  BADGES,
  XP_VALUES,
  computeDecay,
  daysBetween,
  getBadge,
  getLevelFromXP,
  getNextLevel,
  getXPProgressPercent,
  todayISO,
} from "@/lib/gamification";
import type { UserProgressDoc, XPEvent, XPEventType } from "@/types/gamification";

interface GamificationStore {
  xp: number;
  level: number;
  levelName: string;
  badges: string[];
  streakWeeks: number;
  lastAccessDate: string | null;
  completedAulas: string[];
  totalDecayed: number;
  lastDecayAmount: number;
  recentEvents: XPEvent[];

  addXP: (type: XPEventType, xp: number, label: string) => void;
  earnBadge: (badgeId: string) => void;
  completeAula: (slug: string, label: string) => void;
  isAulaCompleted: (slug: string) => boolean;
  /** Registra o acesso do dia: atualiza streak semanal e aplica decay se passou de 7 dias. */
  checkAccess: () => { decayed: number; isNewDay: boolean };
  hydrateFromFirestore: (data: Partial<UserProgressDoc>) => void;
  getProgressPercent: () => number;
  getNextLevelXP: () => number | null;
}

function pushEvent(events: XPEvent[], event: XPEvent): XPEvent[] {
  return [event, ...events].slice(0, 30);
}

export const useGamificationStore = create<GamificationStore>()(
  persist(
    (set, get) => ({
      xp: 0,
      level: 1,
      levelName: "Faísca",
      badges: [],
      streakWeeks: 0,
      lastAccessDate: null,
      completedAulas: [],
      totalDecayed: 0,
      lastDecayAmount: 0,
      recentEvents: [],

      addXP: (type, xp, label) => {
        set((state) => {
          const newXP = Math.max(0, state.xp + xp);
          const newLevel = getLevelFromXP(newXP);
          return {
            xp: newXP,
            level: newLevel.level,
            levelName: newLevel.name,
            recentEvents: pushEvent(state.recentEvents, {
              type,
              xp,
              label,
              at: new Date().toISOString(),
            }),
          };
        });
      },

      earnBadge: (badgeId) => {
        const { badges, addXP } = get();
        if (badges.includes(badgeId)) return;
        const badge = getBadge(badgeId);
        if (!badge) return;
        set((state) => ({ badges: [...state.badges, badgeId] }));
        addXP("badge", badge.xpBonus, `Badge: ${badge.icon} ${badge.name}`);
      },

      completeAula: (slug, label) => {
        const { completedAulas, addXP, earnBadge } = get();
        if (completedAulas.includes(slug)) return;
        set((state) => ({ completedAulas: [...state.completedAulas, slug] }));
        addXP("aula_completa", XP_VALUES.AULA_COMPLETA, `Aula concluída: ${label}`);
        const badge = BADGES.find((b) => b.condition === `aula:${slug}`);
        if (badge) earnBadge(badge.id);
      },

      isAulaCompleted: (slug) => get().completedAulas.includes(slug),

      checkAccess: () => {
        const today = todayISO();
        const { lastAccessDate, streakWeeks, xp, addXP, earnBadge } = get();

        if (lastAccessDate === today) return { decayed: 0, isNewDay: false };

        const decayed = Math.min(computeDecay(lastAccessDate, today), xp);
        let newStreak = 1;
        if (lastAccessDate) {
          const days = daysBetween(lastAccessDate, today);
          // aula é semanal: até 7 dias mantém a sequência
          if (days <= 7) {
            const weekA = Math.floor(new Date(`${lastAccessDate}T00:00:00`).getTime() / (7 * 86400000));
            const weekB = Math.floor(new Date(`${today}T00:00:00`).getTime() / (7 * 86400000));
            newStreak = weekB > weekA ? streakWeeks + 1 : Math.max(streakWeeks, 1);
          }
        }

        set((state) => ({
          lastAccessDate: today,
          streakWeeks: newStreak,
          totalDecayed: state.totalDecayed + decayed,
          lastDecayAmount: decayed,
        }));

        if (decayed > 0) {
          addXP("decay", -decayed, `Chama apagando: -${decayed} XP por inatividade`);
        }
        addXP("login_diario", XP_VALUES.LOGIN_DIARIO, "Acesso do dia");
        if (newStreak >= 4) earnBadge("semana_perfeita");

        return { decayed, isNewDay: true };
      },

      hydrateFromFirestore: (data) => {
        const state = get();
        const xp = Math.max(state.xp, data.xp ?? 0);
        const level = getLevelFromXP(xp);
        // lastAccessDate: usa a mais recente das duas
        const remote = data.lastAccessDate ?? null;
        const local = state.lastAccessDate;
        const lastAccessDate = !remote ? local : !local ? remote : remote > local ? remote : local;
        set({
          xp,
          level: level.level,
          levelName: level.name,
          badges: Array.from(new Set([...state.badges, ...(data.badges ?? [])])),
          streakWeeks: Math.max(state.streakWeeks, data.streakWeeks ?? 0),
          lastAccessDate,
          completedAulas: Array.from(new Set([...state.completedAulas, ...(data.completedAulas ?? [])])),
          totalDecayed: Math.max(state.totalDecayed, data.totalDecayed ?? 0),
        });
      },

      getProgressPercent: () => getXPProgressPercent(get().xp),
      getNextLevelXP: () => getNextLevel(getLevelFromXP(get().xp).level)?.xpRequired ?? null,
    }),
    { name: "wof-gamification" }
  )
);
