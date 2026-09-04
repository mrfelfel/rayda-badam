'use client';
import { User, Lock } from 'lucide-react';
export default function ProfilePage() {
  return (
    <div className="space-y-6 max-w-lg">
      <h2 className="text-xl font-bold">پروفایل من</h2>
      <div className="card">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center"><User className="w-8 h-8 text-brand-600" /></div>
          <div><p className="font-bold text-lg">کاربر بادام</p><p className="text-sm text-gray-500">دانشگاه صنعتی امیرکبیر</p></div>
        </div>
      </div>
      <div className="card">
        <h3 className="font-bold mb-4 flex items-center gap-2"><Lock className="w-4 h-4" />تغییر رمز عبور</h3>
        <div className="space-y-3">
          <input type="password" placeholder="رمز عبور فعلی" className="input" />
          <input type="password" placeholder="رمز عبور جدید" className="input" />
          <input type="password" placeholder="تکرار رمز عبور جدید" className="input" />
          <button className="btn-primary">ذخیره</button>
        </div>
      </div>
    </div>
  );
}
