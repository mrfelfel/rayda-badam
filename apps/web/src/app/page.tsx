'use client';
import { Wallet, Utensils, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">خوش آمدید</h2>
        <p className="text-gray-500 mt-1">اتوماسیون تغذیه بادام — نسخه ۲.۰</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/foods" className="card hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-brand-50 rounded-xl"><Utensils className="w-6 h-6 text-brand-600" /></div>
            <div><p className="text-sm text-gray-500">رزرو غذا</p><p className="text-lg font-bold">مشاهده برنامه هفتگی</p></div>
          </div>
        </Link>
        <Link href="/wallet" className="card hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-50 rounded-xl"><Wallet className="w-6 h-6 text-blue-600" /></div>
            <div><p className="text-sm text-gray-500">کیف پول</p><p className="text-lg font-bold">مدیریت موجودی</p></div>
          </div>
        </Link>
        <div className="card">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-amber-50 rounded-xl"><TrendingUp className="w-6 h-6 text-amber-600" /></div>
            <div><p className="text-sm text-gray-500">آمار این هفته</p><p className="text-lg font-bold">۰ وعده</p></div>
          </div>
        </div>
      </div>
      <div className="card">
        <h3 className="font-bold mb-3">آخرین اخبار</h3>
        <p className="text-sm text-gray-500">هنوز خبری ثبت نشده است.</p>
      </div>
    </div>
  );
}
