import {
  collection, addDoc, getDocs,
  serverTimestamp, query, orderBy,
} from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import { Matricula, StatusMatricula } from "@/types/escola";

const COL = "matriculas";

interface MatriculaInput {
  alunoId: string;
  alunoNome: string;
  turmaId: string;
  turmaNome: string;
  cursoNome: string;
  status: StatusMatricula;
}

export async function realizarMatricula(dados: MatriculaInput): Promise<string> {
  const ref = await addDoc(collection(db, COL), {
    ...dados,
    dataHora: new Date().toISOString(),
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

export async function listarMatriculas(): Promise<Matricula[]> {
  const q = query(collection(db, COL), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() } as Matricula));
}
