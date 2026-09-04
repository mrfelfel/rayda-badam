import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/lib/auth';
import { LayoutShell } from '@/components/LayoutShell';

export const metadata: Metadata = {
  title: 'اتوماسیون تغذیه صورتی',
  description: 'سیستم رزرو غذا - دانشگاه صنعتی امیرکبیر',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <AuthProvider>
          <LayoutShell>{children}</LayoutShell>
        </AuthProvider>
      </body>
    </html>
  );
}
