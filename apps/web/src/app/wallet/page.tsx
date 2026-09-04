'use client';
import { useState } from 'react';
import { Wallet as WalletIcon, ArrowUpRight, ArrowDownLeft, Plus, X } from 'lucide-react';

const DEMO_TXNS = [
  { date:'۱۴۰۳/۰۶/۰۱ ۱۲:۳۰', desc:'رزرو غذا — چلو کparable', amount:-45000, type:'DOWN', balance:455000 },
  { date:'۱۴۰۳/۰۶/۰۱ ۱۰:۱۵', desc:'خرید وجه از بانک', amount:500000, type:'UP', balance:500000 },
  { date:'۱۴۰۳/۰۵/۳۰ ۱۳:۰۰', desc:'لغو غذا — قورمه سبزی', amount:42000, type:'UP', balance:0 },
  { date:'۱۴۰۳/۰۵/۳۰ ۱۱:۰۰', desc:'رزرو غذا — قورمه سبزی', amount:-42000, type:'DOWN', balance:-42000 },
];

export default function WalletPage() {
  const [showPay, setShowPay] = useState(false);
  const [amount, setAmount] = useState('');
  return (
    <div className="space-y-6">
      <div className="card bg-gradient-to-l from-blue-50 to-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-blue-100 rounded-xl"><WalletIcon className="w-8 h-8 text-blue-600" /></div>
            <div><p className="text-sm text-gray-500">موجودی کیف پول</p><p className="text-3xl font-bold text-blue-700">۵۰۰,۰۰۰ ریال</p></div>
          </div>
          <button onClick={() => setShowPay(true)} className="btn-primary flex items-center gap-1"><Plus className="w-4 h-4" />افزودن</button>
        </div>
      </div>
      <div className="card">
        <h3 className="font-bold mb-4">تراکنش‌های اخیر</h3>
        <div className="space-y-3">
          {DEMO_TXNS.map((t, i) => (
            <div key={i} className="flex items-center justify-between py-2 border-b last:border-0">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${t.type==='UP'?'bg-green-100':'bg-red-100'}`}>
                  {t.type === 'UP' ? <ArrowUpRight className="w-4 h-4 text-green-600" /> : <ArrowDownLeft className="w-4 h-4 text-red-600" />}
                </div>
                <div><p className="text-sm font-medium">{t.desc}</p><p className="text-xs text-gray-400">{t.date}</p></div>
              </div>
              <span className={`font-bold text-sm ${t.type==='UP'?'text-green-600':'text-red-600'}`}>{t.type==='UP'?'+':''}{t.amount.toLocaleString('fa-IR')} ریال</span>
            </div>
          ))}
        </div>
      </div>
      {showPay && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={() => setShowPay(false)}>
          <div className="bg-white rounded-xl p-6 w-96 shadow-xl" onClick={e => e.stopPropagation()}>
            <h3 className="font-bold text-lg mb-4">افزایش موجودی</h3>
            <input type="number" className="input mb-4" placeholder="مبلغ به ریال" value={amount} onChange={e => setAmount(e.target.value)} />
            <div className="flex gap-2 justify-end">
              <button onClick={() => setShowPay(false)} className="btn-outline">بستن</button>
              <button className="btn-primary">پرداخت</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
