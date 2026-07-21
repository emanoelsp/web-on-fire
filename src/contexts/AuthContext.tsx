"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  type User,
} from "firebase/auth";
import { auth } from "@/lib/firebaseConfig";
import {
  getOrCreateStudentProfile,
  isAdminEmail,
  logActivity,
} from "@/services/progressService";
import type { StudentProfile } from "@/types/gamification";

interface AuthContextType {
  user: User | null;
  profile: StudentProfile | null;
  loading: boolean;
  isAdmin: boolean;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  registerWithEmail: (email: string, password: string, name: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

const googleProvider = new GoogleAuthProvider();

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        try {
          const p = await getOrCreateStudentProfile(
            firebaseUser.uid,
            firebaseUser.email ?? "",
            firebaseUser.displayName ?? "",
            firebaseUser.photoURL
          );
          setProfile(p);
        } catch {
          setProfile(null);
        }
      } else {
        setProfile(null);
      }
      setLoading(false);
    });
    return unsub;
  }, []);

  const loginWithEmail = async (email: string, password: string) => {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    const p = await getOrCreateStudentProfile(
      cred.user.uid,
      cred.user.email ?? "",
      cred.user.displayName ?? "",
      cred.user.photoURL
    );
    setProfile(p);
    logActivity({ uid: cred.user.uid, email: email, type: "login", label: "Login", xp: 0 });
  };

  const registerWithEmail = async (email: string, password: string, name: string) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(cred.user, { displayName: name });
    const p = await getOrCreateStudentProfile(cred.user.uid, email, name, null);
    setProfile(p);
  };

  const loginWithGoogle = async () => {
    const cred = await signInWithPopup(auth, googleProvider);
    const p = await getOrCreateStudentProfile(
      cred.user.uid,
      cred.user.email ?? "",
      cred.user.displayName ?? "",
      cred.user.photoURL
    );
    setProfile(p);
    logActivity({ uid: cred.user.uid, email: cred.user.email ?? "", type: "login", label: "Login com Google", xp: 0 });
  };

  const logout = async () => {
    await signOut(auth);
    setProfile(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        isAdmin: !!user && isAdminEmail(user.email ?? ""),
        loginWithEmail,
        registerWithEmail,
        loginWithGoogle,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth deve ser usado dentro de AuthProvider");
  return ctx;
}
