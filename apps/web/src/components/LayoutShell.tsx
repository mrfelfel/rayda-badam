'use client';
import { useAuth } from '@/lib/auth';
import { Sidebar } from './Sidebar';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

export function LayoutShell({ children }: { children: ReactNode }) {
  const { token, loading } = useAuth();
  const pathname = usePathname();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-3 border-brand-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Login page has its own layout (no sidebar)
  if (pathname === '/login' || !token) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6 mr-64">{children}</main>
    </div>
  );
}
