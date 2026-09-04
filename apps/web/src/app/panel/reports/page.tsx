'use client';
import { useState } from 'react';

const DEMO_REPORTS = [
  { date:'۱۴۰۳/۰۶/۰۱', user:'علی احمدی', food:'چلو کAssignable', meal:'ناهار', place:'سلف مرکزی', status:'تحویل شده' },
  { date:'۱۴۰۳/۰۶/۰۱', user:'سارا رضایی', food:'زرشک پلو', meal:'شام', place:'سلف مرکزی', status:'تحویل شده' },
  { date:'۱۴۰۳/۰۶/۰۱', user:'رضا کریمی', food:'قورمه سبزی', meal:'ناهار', place:'خوابگاه ۱', status:'رزرو شده' },
  { date:'۱۴۰۳/۰۵/۳۱', user:'علی احمدی', food:'باقلو پلو', meal:'ناهار', place:'سلف مرکزی', status:'تحویل شده' },
  { date:'۱۴۰۳/۰۵/۳۱', user:'محمد فلفلی', food:'چلو ماهی', meal:'ناهار', place:'سلف فنی', status:'لغو شده' },
];

export default function ReportsPage() {
  const [week, setWeek] = useState('');
  const [year, setYear] = useState('');
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">گزارشات</h2>
      <div className="card flex gap-3 items-end">
        <div><label className="text-xs text-gray-500">هفته</label><input className="input" type="number" value={week} onChange={e => setWeek(e.target.value)} placeholder="شماره هفته" /></div>
        <div><label className="text-xs text-gray-500">سال</label><input className="input" type="number" value={year} onChange={e => setYear(e.target.value)} placeholder="سال" /></div>
        <button className="btn-primary">جستجو</button>
      </div>
      <div className="card overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="border-b"><th className="py-2 text-right">تاریخ</th><th className="py-2 text-right">کاربر</th><th className="py-2 text-right">غذا</th><th className="py-2 text-right">وعده</th><th className="py-2 text-right">محل</th><th className="py-2 text-right">وضعیت</th></tr></thead>
          <tbody>{DEMO_REPORTS.map((r,i) => (
            <tr key={i} className="border-b hover:bg-gray-50"><td className="py-2">{r.date}</td><td>{r.user}</td><td>{r.food}</td><td>{r.meal}</td><td>{r.place}</td><td><span className={`text-xs px-2 py-0.5 rounded ${r.status==='تحویل شده'?'bg-green-100 text-green-700':r.status==='رزرو شده'?'bg-blue-100 text-blue-700':'bg-red-100 text-red-700'}`}>{r.status}</span></td></tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  );
}
