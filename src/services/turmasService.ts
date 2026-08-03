import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";

// Feature real do backoffice: organizar os alunos (StudentProfile, coleção
// "alunos") em turmas. NÃO confundir com src/services/turmaService.ts (singular),
// que é material didático dos módulos (domínio escola: curso/vagas/matrícula).
// Aqui a turma é leve: só nome/descrição. A associação aluno→turma fica gravada
// no próprio documento do aluno (campos turmaId/turmaNome).

export interface Turma {
  id: string;
  nome: string;
  descricao?: string;
  createdAt?: unknown;
}

const COL = "turmas";

export async function listarTurmas(): Promise<Turma[]> {
  const q = query(collection(db, COL), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Turma));
}

export async function criarTurma(nome: string, descricao?: string): Promise<string> {
  const ref = await addDoc(collection(db, COL), {
    nome: nome.trim(),
    descricao: descricao?.trim() ?? "",
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

export async function renomearTurma(id: string, nome: string, descricao?: string): Promise<void> {
  await updateDoc(doc(db, COL, id), {
    nome: nome.trim(),
    descricao: descricao?.trim() ?? "",
  });
}

export async function excluirTurma(id: string): Promise<void> {
  await deleteDoc(doc(db, COL, id));
}

/**
 * Move um aluno para uma turma (ou remove da turma quando `turma` é null).
 * Atualiza o documento do aluno na coleção "alunos".
 */
export async function moverAlunoParaTurma(
  uid: string,
  turma: { id: string; nome: string } | null
): Promise<void> {
  await updateDoc(doc(db, "alunos", uid), {
    turmaId: turma?.id ?? null,
    turmaNome: turma?.nome ?? null,
  });
}
