import {
  collection, addDoc, getDocs, getDoc,
  doc, serverTimestamp, query, orderBy,
} from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import { Aluno, AlunoFormData } from "@/types/escola";

const COL = "alunos";

export async function cadastrarAluno(dados: AlunoFormData): Promise<string> {
  const ref = await addDoc(collection(db, COL), { ...dados, createdAt: serverTimestamp() });
  return ref.id;
}

export async function listarAlunos(): Promise<Aluno[]> {
  const q = query(collection(db, COL), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() } as Aluno));
}

export async function buscarAluno(id: string): Promise<Aluno | null> {
  const snap = await getDoc(doc(db, COL, id));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() } as Aluno;
}
