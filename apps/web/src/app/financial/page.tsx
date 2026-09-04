'use client';
import { ArrowUpRight, ArrowDownLeft } from 'lucide-react';

const DEMO = [
  { date:'۱۴۰۳/۰۶/۰۱ ۱۲:۳۰', desc:'رزرو غذا', amount:45000, type:'DOWN', issuer:'سیستم رزرو' },
  { date:'۱۴۰۳/۰۶/۰۱ ۱۰:۱۵', desc:'خرید وجه از بانک', amount:500000, type:'UP', issuer:'درگاه پرداخت' },
  { date:'۱۴۰۳/۰۵/۳۰ ۱۳:۰۰', desc:'لغو غذا', amount:42000, type:'UP', issuer:'سیستم رزرو' },
  { date:'۱۴۰۳/۰۵/۲۹ ۱۱:۰۰', desc:'رزرو غذا', amount:38000, type:'DOWN', issuer:'سیستم رزرو' },
  { date:'۱۴۰۳/۰۵/۲۸ ۱۴:۰۰', desc:'انتقال اعتبار از ۱۲۳۴۵۶۷۸۹۰', amount:25000, type:'UP', issuer:'انتقال' },
];

export default function FinancialPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">مدیریت مالی</h2>
      <div className="card overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="border-b"><th className="py-2 text-right">تاریخ</th><th className="py-2 text-right">شرح</th><th className="py-2 text-right">مبلغ</th><th className="py-2 text-right">نوع</th><th className="py-2 text-right">صادرکننده</th></tr></thead>
          <tbody>{DEMO.map((t,i) => (
            <tr key={i} className="border-b hover:bg-gray-50">
              <td className="py-2">{t.date}</td><td>{t.desc}</td>
              <td className={`font-bold ${t.type==='UP'?'text-green-600':'text-red-600'}`}>{t.type==='UP'?'+':'-'}{t.amount.toLocaleString('fa-IR')}</td>
              <td><span className={`text-xs px-2 py-0.5 rounded ${t.type==='UP'?'bg-green-100 text-green-700':'bg-red-100 text-red-700'}`}>{t.type==='UP'?'واریز':'برداشت'}</span></td>
              <td className="text-gray-500">{t.issuer}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  );
}
