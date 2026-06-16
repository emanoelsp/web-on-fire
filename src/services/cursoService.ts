import {
  collection, addDoc, getDocs, getDoc,
  doc, serverTimestamp, query, orderBy,
} from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import { Curso, CursoFormData } from "@/types/escola";

const COL = "cursos";

export async function cadastrarCurso(dados: CursoFormData): Promise<string> {
  const ref = await addDoc(collection(db, COL), { ...dados, createdAt: serverTimestamp() });
  return ref.id;
}

export async function listarCursos(): Promise<Curso[]> {
  const q = query(collection(db, COL), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() } as Curso));
}

export async function buscarCurso(id: string): Promise<Curso | null> {
  const snap = await getDoc(doc(db, COL, id));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() } as Curso;
}
