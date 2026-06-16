export interface Aluno {
  id?: string;
  nome: string;
  email: string;
  telefone: string;
  cpf?: string;
  createdAt?: unknown;
}
export type AlunoFormData = Omit<Aluno, "id" | "createdAt">;

export interface Curso {
  id?: string;
  nome: string;
  descricao: string;
  cargaHoraria: number;
  createdAt?: unknown;
}
export type CursoFormData = Omit<Curso, "id" | "createdAt">;

export interface Turma {
  id?: string;
  nome: string;
  cursoId: string;
  cursoNome: string;
  periodo: string;
  vagas: number;
  createdAt?: unknown;
}
export type TurmaFormData = Omit<Turma, "id" | "createdAt">;

export type StatusMatricula = "matriculado" | "pendente" | "evadido" | "transferido";

export interface Matricula {
  id?: string;
  alunoId: string;
  alunoNome: string;
  turmaId: string;
  turmaNome: string;
  cursoNome: string;
  status: StatusMatricula;
  dataHora: string;
  createdAt?: unknown;
}
