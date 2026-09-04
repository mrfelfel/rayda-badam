'use client';
import { Wallet, Utensils, TrendingUp, Truck, Clock } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth';

export default function HomePage() {
  const { uid } = useAuth();
  const now = new Date();
  const hour = now.getHours();
  const mealName = hour >= 11 && hour <= 14 ? 'ناهار' : hour >= 17 && hour <= 22 ? 'شام' : hour >= 2 && hour <= 5 ? 'سحری' : '—';

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">خوش آمدید {uid}</h2>
        <p className="text-gray-500 mt-1">اتوماسیون تغذیه بادام — نسخه ۲.۰</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link href="/foods" className="card hover:shadow-md transition-shadow cursor-pointer group">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-brand-50 rounded-xl group-hover:bg-brand-100 transition-colors"><Utensils className="w-6 h-6 text-brand-600" /></div>
            <div><p className="text-sm text-gray-500">رزرو غذا</p><p className="text-lg font-bold">مشاهده برنامه</p></div>
          </div>
        </Link>
        <Link href="/wallet" className="card hover:shadow-md transition-shadow cursor-pointer group">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-50 rounded-xl group-hover:bg-blue-100 transition-colors"><Wallet className="w-6 h-6 text-blue-600" /></div>
            <div><p className="text-sm text-gray-500">کیف پول</p><p className="text-lg font-bold">۵۰۰,۰۰۰ ریال</p></div>
          </div>
        </Link>
        <Link href="/deliver" className="card hover:shadow-md transition-shadow cursor-pointer group">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-amber-50 rounded-xl group-hover:bg-amber-100 transition-colors"><Truck className="w-6 h-6 text-amber-600" /></div>
            <div><p className="text-sm text-gray-500">تحویل غذا</p><p className="text-lg font-bold">پنل مدیریت</p></div>
          </div>
        </Link>
        <div className="card">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-50 rounded-xl"><Clock className="w-6 h-6 text-purple-600" /></div>
            <div><p className="text-sm text-gray-500">وعده فعلی</p><p className="text-lg font-bold">{mealName}</p></div>
          </div>
        </div>
      </div>
      <div className="card">
        <h3 className="font-bold mb-3">آخرین اخبار</h3>
        <div className="space-y-2 text-sm text-gray-500">
          <p>• برنامه غذایی هفته جاری منتشر شد</p>
          <p>• ساعت سرویس دهی: ناهار ۱۱-۱۴ ، شام ۱۷-۲۲</p>
          <p>• برای افزایش موجودی از بخش کیف پول اقدام کنید</p>
        </div>
      </div>
    </div>
  );
}
