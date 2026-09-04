'use client';
import { useAuth } from '@/lib/auth';
import { BottomNav } from './BottomNav';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

export function LayoutShell({ children }: { children: ReactNode }) {
  const { token, loading } = useAuth();
  const pathname = usePathname();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-3 border-pink-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (pathname === '/login' || !token) return <>{children}</>;

  return (
    <div className="min-h-screen bg-gray-50">
      {children}
      <BottomNav />
    </div>
  );
}
