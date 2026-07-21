"use client";

import { useEffect, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useGamificationStore } from "@/stores/gamificationStore";
import {
  getUserProgress,
  logActivity,
  saveUserProgress,
  watchUserProgress,
} from "@/services/progressService";

/**
 * Sincroniza o store de gamificação ↔ Firestore quando o aluno está logado.
 * Ordem: hidrata do Firestore → aplica checkAccess (streak + decay) → salva com debounce.
 */
export function ProgressSync() {
  const { user } = useAuth();
  const store = useGamificationStore();
  const syncTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const accessChecked = useRef(false);

  // No login: carrega o Firestore, hidrata o store e registra o acesso do dia
  useEffect(() => {
    if (!user) {
      accessChecked.current = false;
      return;
    }
    getUserProgress(user.uid).then((data) => {
      store.hydrateFromFirestore(data);

      // migração única do XP antigo em localStorage (wof_xp)
      try {
        const legado = parseInt(localStorage.getItem("wof_xp") ?? "0", 10);
        if (legado > 0 && useGamificationStore.getState().xp === 0) {
          store.addXP("migracao", legado, "XP migrado das aulas anteriores");
        }
        localStorage.removeItem("wof_xp");
      } catch {}

      if (!accessChecked.current) {
        accessChecked.current = true;
        const { decayed, isNewDay } = useGamificationStore.getState().checkAccess();
        if (isNewDay) {
          logActivity({
            uid: user.uid,
            email: user.email ?? "",
            type: "login_diario",
            label: decayed > 0 ? `Voltou após inatividade (-${decayed} XP)` : "Acesso do dia",
            xp: decayed > 0 ? -decayed : 0,
          });
        }
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.uid]);

  // Observa mudanças externas (ex: ajuste do professor)
  useEffect(() => {
    if (!user) return;
    const unsub = watchUserProgress(user.uid, (data) => {
      store.hydrateFromFirestore(data);
    });
    return unsub;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.uid]);

  // Salvamento com debounce de 2s a cada mudança relevante
  useEffect(() => {
    if (!user) return;
    if (syncTimer.current) clearTimeout(syncTimer.current);
    syncTimer.current = setTimeout(() => {
      saveUserProgress(user.uid, {
        xp: store.xp,
        level: store.level,
        levelName: store.levelName,
        badges: store.badges,
        streakWeeks: store.streakWeeks,
        lastAccessDate: store.lastAccessDate,
        completedAulas: store.completedAulas,
        totalDecayed: store.totalDecayed,
      });
    }, 2000);
    return () => {
      if (syncTimer.current) clearTimeout(syncTimer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    user?.uid,
    store.xp,
    store.badges.length,
    store.completedAulas.length,
    store.streakWeeks,
    store.lastAccessDate,
  ]);

  return null;
}
