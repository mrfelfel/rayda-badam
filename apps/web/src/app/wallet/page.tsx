'use client';
import { Wallet as WalletIcon } from 'lucide-react';
export default function WalletPage() {
  return (
    <div className="space-y-6">
      <div className="card bg-gradient-to-l from-blue-50 to-white">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-blue-100 rounded-xl"><WalletIcon className="w-8 h-8 text-blue-600" /></div>
          <div><p className="text-sm text-gray-500">موجودی کیف پول</p><p className="text-3xl font-bold text-blue-700">۰ ریال</p></div>
        </div>
      </div>
      <div className="flex gap-3">
        <button className="btn-primary">افزایش موجودی</button>
        <button className="btn-outline">انتقال اعتبار</button>
      </div>
      <div className="card"><h3 className="font-bold mb-4">تراکنش‌های اخیر</h3><div className="text-center py-8 text-gray-400 text-sm">هنوز تراکنشی ثبت نشده است.</div></div>
    </div>
  );
}
