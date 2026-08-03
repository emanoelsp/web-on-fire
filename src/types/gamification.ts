export interface Level {
  level: number;
  name: string;
  xpRequired: number;
  icon: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  xpBonus: number;
  /** slug da aula ou módulo que desbloqueia: "aula:<slug>" | "modulo:<id>" | "especial:<id>" */
  condition: string;
}

export type XPEventType =
  | "quiz"
  | "fill_blank"
  | "mini_challenge"
  | "aula_completa"
  | "badge"
  | "login_diario"
  | "decay"
  | "migracao";

export interface XPEvent {
  type: XPEventType;
  xp: number;
  label: string;
  at: string; // ISO date
}

/** Estado da chama do aluno conforme dias sem acesso (aula é semanal) */
export type FlameStatus = "acesa" | "enfraquecendo" | "apagando";

export interface UserProgressDoc {
  xp: number;
  level: number;
  levelName: string;
  badges: string[];
  streakWeeks: number;
  lastAccessDate: string | null; // ISO yyyy-mm-dd
  completedAulas: string[];
  totalDecayed: number;
  updatedAt: unknown;
}

export interface StudentProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string | null;
  role: "admin" | "student";
  createdAt: unknown;
  // Turma à qual o aluno pertence (organização do professor no backoffice).
  // Ausente = aluno sem turma.
  turmaId?: string | null;
  turmaNome?: string | null;
}

export interface ActivityEvent {
  uid: string;
  email: string;
  type: XPEventType | "login" | "registro";
  label: string;
  xp: number;
  at: string; // ISO datetime
}

export interface AulaLockSettings {
  lockedAulas: string[];
}
