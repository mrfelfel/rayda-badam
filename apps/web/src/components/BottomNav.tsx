'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ShoppingBag, Clock, User } from 'lucide-react';
import { clsx } from 'clsx';

const items = [
  { href:'/', label:'خانه', icon:Home },
  { href:'/foods', label:'سفارش غذا', icon:ShoppingBag },
  { href:'/orders', label:'سفارش‌ها', icon:Clock },
  { href:'/profile', label:'حساب من', icon:User },
];

export function BottomNav() {
  const pathname = usePathname();
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-50 safe-area-bottom">
      <div className="flex items-center justify-around h-16">
        {items.map(item => {
          const active = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
          return (
            <Link key={item.href} href={item.href} className={clsx('flex flex-col items-center gap-1 px-3 py-2', active ? 'text-pink-600' : 'text-gray-400')}>
              <item.icon className={clsx('w-6 h-6', active && 'fill-pink-100')} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
