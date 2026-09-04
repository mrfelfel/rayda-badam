import type { Metadata } from 'next';
import './globals.css';
import { Sidebar } from '@/components/Sidebar';
export const metadata: Metadata = { title: 'اتوماسیون تغذیه بادام', description: 'سیستم رزرو غذا' };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <body><div className="flex min-h-screen"><Sidebar /><main className="flex-1 p-6 mr-64">{children}</main></div></body>
    </html>
  );
}
