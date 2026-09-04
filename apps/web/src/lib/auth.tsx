'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface AuthContextType {
  token: string | null;
  uid: string | null;
  login: (token: string, uid: string) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  token: null, uid: null, login: () => {}, logout: () => {}, loading: true,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [uid, setUid] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const t = localStorage.getItem('token');
    const u = localStorage.getItem('uid');
    setToken(t);
    setUid(u);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (loading) return;
    if (!token && pathname !== '/login') {
      router.push('/login');
    }
    if (token && pathname === '/login') {
      router.push('/');
    }
  }, [token, loading, pathname, router]);

  const login = (t: string, u: string) => {
    localStorage.setItem('token', t);
    localStorage.setItem('uid', u);
    setToken(t);
    setUid(u);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('uid');
    setToken(null);
    setUid(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ token, uid, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
