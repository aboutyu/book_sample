"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { api } from "./api";
import type { User } from "./types";

const STORAGE_KEY = "auth";

interface StoredAuth {
  accessToken: string;
  user: User;
}

interface AuthContextValue {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function readStoredAuth(): { token: string | null; user: User | null } {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return { token: null, user: null };
  }
  try {
    const stored = JSON.parse(raw) as StoredAuth;
    return { token: stored.accessToken, user: stored.user };
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return { token: null, user: null };
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<{ token: string | null; user: User | null }>(
    { token: null, user: null },
  );
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // localStorage는 브라우저에만 존재해 서버 렌더링 중에는 읽을 수 없으므로,
    // 마운트 이후 이 effect에서 한 번만 읽어와 동기화한다.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAuth(readStoredAuth());
    setLoading(false);
  }, []);

  function persist(stored: StoredAuth) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
    setAuth({ token: stored.accessToken, user: stored.user });
  }

  async function login(email: string, password: string) {
    const res = await api.post<StoredAuth>("/auth/login", { email, password });
    persist(res);
  }

  async function register(email: string, password: string) {
    const res = await api.post<StoredAuth>("/auth/register", {
      email,
      password,
    });
    persist(res);
  }

  function logout() {
    localStorage.removeItem(STORAGE_KEY);
    setAuth({ token: null, user: null });
    router.push("/login");
  }

  return (
    <AuthContext.Provider
      value={{
        user: auth.user,
        token: auth.token,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth는 AuthProvider 안에서만 사용할 수 있습니다.");
  }
  return ctx;
}
