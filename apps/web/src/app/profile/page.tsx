'use client';
import { useAuth } from '@/lib/auth';
import { User, Lock, Wallet, ChevronLeft, LogOut, Bell, HelpCircle, FileText } from 'lucide-react';
import Link from 'next/link';

const MENU = [
  { icon: Wallet, label:'کیف پول', href:'/wallet', desc:'مدیریت موجودی' },
  { icon: Bell, label:'اعلانات', href:'/', desc:'تنظیمات اعلان' },
  { icon: Lock, label:'تغییر رمز', href:'/', desc:'رمز عبور جدید' },
  { icon: FileText, label:'قوانین و مقررات', href:'/', desc:'شرایط استفاده' },
  { icon: HelpCircle, label:'پشتیبانی', href:'/', desc:'سوالات متداول' },
];

export default function ProfilePage() {
  const { uid, logout } = useAuth();
  return (
    <div className="page-container">
      {/* Avatar */}
      <div className="flex flex-col items-center py-4">
        <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center mb-3">
          <User className="w-10 h-10 text-pink-500" />
        </div>
        <h2 className="font-bold text-lg">{uid}</h2>
        <p className="text-sm text-gray-400">دانشکده امیرکبیر</p>
      </div>

      {/* Menu */}
      <div className="space-y-2">
        {MENU.map((item, i) => (
          <Link key={i} href={item.href} className="card flex items-center justify-between active:bg-gray-50 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center">
                <item.icon className="w-5 h-5 text-gray-500" />
              </div>
              <div>
                <p className="font-medium text-sm">{item.label}</p>
                <p className="text-xs text-gray-400">{item.desc}</p>
              </div>
            </div>
            <ChevronLeft className="w-4 h-4 text-gray-300" />
          </Link>
        ))}
      </div>

      {/* Logout */}
      <button onClick={logout} className="card w-full flex items-center justify-center gap-2 text-red-500 mt-4 active:bg-red-50">
        <LogOut className="w-5 h-5" />
        <span className="font-medium text-sm">خروج از حساب</span>
      </button>

      <p className="text-center text-[10px] text-gray-300 mt-6">حقوق مادی و معنوی متعلق به موسسه غیرتجاری شبکه صورتی است</p>
    </div>
  );
}
