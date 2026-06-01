// Tipagem principal do usuário cadastrado
export interface User {
  id?: string;        // gerado pelo Firestore
  nome: string;
  email: string;
  telefone: string;
  createdAt?: Date;
}

// Formulário de cadastro (sem id e sem createdAt)
export type UserFormData = Omit<User, "id" | "createdAt">;

// ── DESAFIO EXTRA ────────────────────────────────────────────────────────────
// Campos adicionais para o desafio extra da Atividade 2
export interface UserExtra extends User {
  cidade?: string;
  dataNascimento?: string; // "YYYY-MM-DD"
  curso?: string;
}
