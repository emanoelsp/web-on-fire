import {
  collection, addDoc, getDocs, getDoc,
  doc, serverTimestamp, query, orderBy,
} from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import { Turma, TurmaFormData } from "@/types/escola";

const COL = "turmas";

export async function cadastrarTurma(dados: TurmaFormData): Promise<string> {
  const ref = await addDoc(collection(db, COL), { ...dados, createdAt: serverTimestamp() });
  return ref.id;
}

export async function listarTurmas(): Promise<Turma[]> {
  const q = query(collection(db, COL), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() } as Turma));
}

export async function buscarTurma(id: string): Promise<Turma | null> {
  const snap = await getDoc(doc(db, COL, id));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() } as Turma;
}
