import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import { ModulesVisibility, DEFAULT_VISIBILITY } from "@/types/modules";

const CONFIG_DOC = doc(db, "config", "modules");

export async function getModulesVisibility(): Promise<ModulesVisibility> {
  try {
    const snap = await getDoc(CONFIG_DOC);
    if (!snap.exists()) return DEFAULT_VISIBILITY;
    return { ...DEFAULT_VISIBILITY, ...(snap.data() as Partial<ModulesVisibility>) };
  } catch {
    return DEFAULT_VISIBILITY;
  }
}

export async function setModulesVisibility(visibility: ModulesVisibility): Promise<void> {
  await setDoc(CONFIG_DOC, visibility);
}

export async function toggleModule(id: keyof ModulesVisibility, visible: boolean): Promise<void> {
  const current = await getModulesVisibility();
  await setDoc(CONFIG_DOC, { ...current, [id]: visible });
}
