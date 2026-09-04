'use client';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/lib/theme';
import { AuthProvider } from '@/lib/auth';
import { LayoutShell } from '@/components/LayoutShell';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

function ThemedLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { loading } = require('@/lib/auth').useAuth();
  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="w-10 h-10 border-3 border-pink-400 border-t-transparent rounded-full animate-spin" /></div>;
  if (pathname === '/login') return <>{children}</>;
  return <LayoutShell>{children}</LayoutShell>;
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AuthProvider>
            <ThemedLayout>{children}</ThemedLayout>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
