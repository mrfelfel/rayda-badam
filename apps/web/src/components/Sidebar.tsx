'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { Home, Utensils, ShoppingCart, Wallet, User, Truck, Settings, BarChart3, PieChart, Users, MapPin, LogOut, Shield } from 'lucide-react';
import { clsx } from 'clsx';

const studentMenu = [
  { href:'/', label:'صفحه اصلی', icon:Home },
  { href:'/foods', label:'رزرو غذا', icon:Utensils },
  { href:'/foods/market', label:'بازار غذا', icon:ShoppingCart },
  { href:'/wallet', label:'کیف پول', icon:Wallet },
  { href:'/profile', label:'پروفایل من', icon:User },
];
const adminMenu = [
  { href:'/deliver', label:'تحویل غذا', icon:Truck },
  { href:'/panel/food-manage', label:'مدیریت تغذیه', icon:Settings },
  { href:'/panel/user', label:'مدیریت کاربران', icon:Users },
  { href:'/financial', label:'مدیریت مالی', icon:Wallet },
  { href:'/panel/reports', label:'گزارشات', icon:BarChart3 },
  { href:'/panel/charts', label:'آمار', icon:PieChart },
];

export function Sidebar() {
  const pathname = usePathname();
  const { logout, uid } = useAuth();
  return (
    <aside className="fixed right-0 top-0 h-full w-64 bg-white border-l border-gray-100 shadow-sm flex flex-col">
      <div className="p-5 border-b border-gray-100">
        <h1 className="text-lg font-bold text-brand-700">اتوماسیون تغذیه صورتی</h1>
        <p className="text-xs text-gray-400 mt-1">نسخه ۲.۰ — موسسه غیرتجاری شبکه صورتی</p>
        {uid && <p className="text-xs text-gray-500 mt-1 font-mono">{uid}</p>}
      </div>
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {studentMenu.map(item => (
          <Link key={item.href} href={item.href} className={clsx('flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors', pathname===item.href?'bg-brand-50 text-brand-700 font-medium':'text-gray-600 hover:bg-gray-50')}>
            <item.icon className="w-4 h-4" />{item.label}
          </Link>
        ))}
        <div className="pt-4 pb-2 px-3 text-xs font-medium text-gray-400 flex items-center gap-1"><Shield className="w-3 h-3" />مدیریت</div>
        {adminMenu.map(item => (
          <Link key={item.href} href={item.href} className={clsx('flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors', pathname===item.href?'bg-brand-50 text-brand-700 font-medium':'text-gray-600 hover:bg-gray-50')}>
            <item.icon className="w-4 h-4" />{item.label}
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t border-gray-100 space-y-2">
        <button onClick={logout} className="flex items-center gap-2 text-sm text-red-500 hover:text-red-600 w-full">
          <LogOut className="w-4 h-4" />خروج
        </button>
        <div className="text-xs text-gray-400 text-center">صورتی v2.0 — Pink Network</div>
      </div>
    </aside>
  );
}
