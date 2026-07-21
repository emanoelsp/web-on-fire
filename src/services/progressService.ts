import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
  type Unsubscribe,
} from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import type {
  ActivityEvent,
  AulaLockSettings,
  StudentProfile,
  UserProgressDoc,
} from "@/types/gamification";

// ─── Perfis de aluno ─────────────────────────────────────────────────────────

// Fonte única da lista de admins em @/lib/adminAuth (reexportada por compat.)
export { isAdminEmail } from "@/lib/adminAuth";
import { isAdminEmail } from "@/lib/adminAuth";

export async function getOrCreateStudentProfile(
  uid: string,
  email: string,
  displayName: string,
  photoURL: string | null
): Promise<StudentProfile> {
  const ref = doc(db, "alunos", uid);
  const snap = await getDoc(ref);
  const role: "admin" | "student" = isAdminEmail(email) ? "admin" : "student";

  if (snap.exists()) {
    const existing = snap.data() as StudentProfile;
    if (existing.role !== role) {
      await updateDoc(ref, { role });
      return { ...existing, role };
    }
    return existing;
  }

  const profile: StudentProfile = {
    uid,
    email,
    displayName: displayName || email.split("@")[0],
    photoURL,
    role,
    createdAt: serverTimestamp(),
  };
  await setDoc(ref, profile);
  await logActivity({ uid, email, type: "registro", label: "Novo aluno registrado", xp: 0 });
  return profile;
}

export async function getAllStudents(): Promise<StudentProfile[]> {
  const snap = await getDocs(collection(db, "alunos"));
  return snap.docs.map((d) => d.data() as StudentProfile);
}

// ─── Progresso ───────────────────────────────────────────────────────────────

const defaultProgress = (): UserProgressDoc => ({
  xp: 0,
  level: 1,
  levelName: "Faísca",
  badges: [],
  streakWeeks: 0,
  lastAccessDate: null,
  completedAulas: [],
  totalDecayed: 0,
  updatedAt: null,
});

export async function getUserProgress(uid: string): Promise<UserProgressDoc> {
  const snap = await getDoc(doc(db, "progresso", uid));
  return snap.exists() ? (snap.data() as UserProgressDoc) : defaultProgress();
}

export async function saveUserProgress(uid: string, progress: Partial<UserProgressDoc>) {
  await setDoc(
    doc(db, "progresso", uid),
    { ...progress, updatedAt: serverTimestamp() },
    { merge: true }
  );
}

export function watchUserProgress(uid: string, cb: (p: UserProgressDoc) => void): Unsubscribe {
  return onSnapshot(doc(db, "progresso", uid), (snap) => {
    cb(snap.exists() ? (snap.data() as UserProgressDoc) : defaultProgress());
  });
}

export async function getAllProgress(): Promise<(UserProgressDoc & { uid: string })[]> {
  const snap = await getDocs(collection(db, "progresso"));
  return snap.docs.map((d) => ({ uid: d.id, ...(d.data() as UserProgressDoc) }));
}

// ─── Registro de atividade ───────────────────────────────────────────────────

export async function logActivity(event: Omit<ActivityEvent, "at">) {
  try {
    await addDoc(collection(db, "atividade"), {
      ...event,
      at: new Date().toISOString(),
    });
  } catch {
    // registro de atividade nunca deve quebrar a experiência do aluno
  }
}

export async function getRecentActivity(max = 100): Promise<ActivityEvent[]> {
  const q = query(collection(db, "atividade"), orderBy("at", "desc"), limit(max));
  const snap = await getDocs(q);
  return snap.docs.map((d) => d.data() as ActivityEvent);
}

export async function getStudentActivity(uid: string, max = 30): Promise<ActivityEvent[]> {
  // where + orderBy exigiria índice composto; ordenamos no cliente
  const q = query(collection(db, "atividade"), where("uid", "==", uid), limit(200));
  const snap = await getDocs(q);
  return snap.docs
    .map((d) => d.data() as ActivityEvent)
    .sort((a, b) => (a.at < b.at ? 1 : -1))
    .slice(0, max);
}

// ─── Bloqueio de aulas (config/aulas) ────────────────────────────────────────

const AULAS_DOC = doc(db, "config", "aulas");

export async function getAulaLocks(): Promise<AulaLockSettings> {
  try {
    const snap = await getDoc(AULAS_DOC);
    return snap.exists() ? (snap.data() as AulaLockSettings) : { lockedAulas: [] };
  } catch {
    return { lockedAulas: [] };
  }
}

export async function setAulaLocks(settings: AulaLockSettings) {
  await setDoc(AULAS_DOC, settings);
}

export async function toggleAulaLock(slug: string, locked: boolean) {
  const current = await getAulaLocks();
  const set = new Set(current.lockedAulas);
  if (locked) set.add(slug);
  else set.delete(slug);
  await setAulaLocks({ lockedAulas: [...set] });
}
