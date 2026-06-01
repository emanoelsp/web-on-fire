import {
  collection,
  addDoc,
  getDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import { UserFormData, User } from "@/types/user";

const COLLECTION = "usuarios";

/**
 * Salva um novo usuário na coleção "usuarios" do Firestore.
 * Retorna o ID gerado automaticamente pelo banco.
 */
export async function cadastrarUsuario(dados: UserFormData): Promise<string> {
  const docRef = await addDoc(collection(db, COLLECTION), {
    ...dados,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

/**
 * Busca um usuário pelo ID no Firestore.
 * Retorna o objeto User ou null se não encontrado.
 */
export async function buscarUsuario(id: string): Promise<User | null> {
  const snap = await getDoc(doc(db, COLLECTION, id));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() } as User;
}
