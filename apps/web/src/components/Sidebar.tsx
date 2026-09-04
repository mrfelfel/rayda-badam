'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Utensils, Wallet, User, BarChart3, Truck, Settings } from 'lucide-react';
import { clsx } from 'clsx';

const menuItems = [
  { href: '/', label: 'صفحه اصلی', icon: Utensils },
  { href: '/foods', label: 'رزرو غذا', icon: Utensils },
  { href: '/foods/market', label: 'بازار غذا', icon: Utensils },
  { href: '/wallet', label: 'کیف پول', icon: Wallet },
  { href: '/profile', label: 'پروفایل من', icon: User },
];
const adminItems = [
  { href: '/deliver', label: 'تحویل غذا', icon: Truck },
  { href: '/panel/foods', label: 'مدیریت تغذیه', icon: Settings },
  { href: '/panel/reports', label: 'گزارشات', icon: BarChart3 },
];

export function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="fixed right-0 top-0 h-full w-64 bg-white border-l border-gray-100 shadow-sm flex flex-col">
      <div className="p-5 border-b border-gray-100">
        <h1 className="text-lg font-bold text-brand-700">اتوماسیون تغذیه بادام</h1>
        <p className="text-xs text-gray-400 mt-1">نسخه ۲.۰ — با همکاری mimo code</p>
      </div>
      <nav className="flex-1 p-3 space-y-1">
        {menuItems.map((item) => (
          <Link key={item.href} href={item.href} className={clsx('flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors', pathname===item.href?'bg-brand-50 text-brand-700 font-medium':'text-gray-600 hover:bg-gray-50')}>
            <item.icon className="w-4 h-4" />{item.label}
          </Link>
        ))}
        <div className="pt-4 pb-2 px-3 text-xs font-medium text-gray-400">مدیریت</div>
        {adminItems.map((item) => (
          <Link key={item.href} href={item.href} className={clsx('flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors', pathname===item.href?'bg-brand-50 text-brand-700 font-medium':'text-gray-600 hover:bg-gray-50')}>
            <item.icon className="w-4 h-4" />{item.label}
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t border-gray-100">
        <div className="text-xs text-gray-400 text-center">badoom v2.0 — AED</div>
      </div>
    </aside>
  );
}
