import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/lib/auth';
import { LayoutShell } from '@/components/LayoutShell';

export const metadata: Metadata = {
  title: 'اتوماسیون تغذیه صورتی',
  description: 'سفارش و رزرو غذا — موسسه غیرتجاری شبکه صورتی',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
  themeColor: '#ec4899',
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
