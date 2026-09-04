'use client';
import { Check, X } from 'lucide-react';
const DEMO = [
  { id:1, food:'چلو کباب سلطانی', date:'۱۴۰۳/۰۶/۱۳', status:'delivered', price:45000 },
  { id:2, food:'زرشک پلو با مرغ', date:'۱۴۰۳/۰۶/۱۲', status:'delivered', price:38000 },
  { id:3, food:'قورمه سبزی', date:'۱۴۰۳/۰۶/۱۱', status:'cancelled', price:42000 },
];
export default function OrdersPage() {
  return (
    <div className="page-container">
      <h1 className="text-xl font-bold">سفارش‌ها</h1>
      <div className="space-y-3">
        {DEMO.map(o => (
          <div key={o.id} className="card flex items-center gap-4">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${o.status==='delivered'?'bg-emerald-50':'bg-red-50'}`}>
              {o.status==='delivered' ? <Check className="w-6 h-6 text-emerald-500" /> : <X className="w-6 h-6 text-red-400" />}
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-sm">{o.food}</h3>
              <p className="text-xs text-gray-400">{o.date}</p>
            </div>
            <div className="text-left">
              <p className="font-bold text-sm">{o.price.toLocaleString('fa-IR')} تومان</p>
              <span className={`text-xs ${o.status==='delivered'?'text-emerald-500':'text-red-400'}`}>{o.status==='delivered'?'تحویل شده':'لغو شده'}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
