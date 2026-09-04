'use client';
import { useState } from 'react';
import { Search, Check, X, CreditCard } from 'lucide-react';

const DEMO_DELIVERIES = [
  { uid:'1234567890', name:'علی احمدی', card:'CARD-001', food:'چلو کparable', meal:'ناهار', delivered:false },
  { uid:'9876543210', name:'سارا رضایی', card:'CARD-002', food:'زرشک پلو', meal:'شام', delivered:true },
  { uid:'5555555555', name:'رضا کریمی', card:'', food:'قورمه سبزی', meal:'ناهار', delivered:false },
];

export default function DeliverPage() {
  const [scanInput, setScanInput] = useState('');
  const [result, setResult] = useState<{ok:boolean;msg:string} | null>(null);

  const handleScan = () => {
    if (!scanInput) return;
    const found = DEMO_DELIVERIES.find(d => d.card === scanInput || d.uid === scanInput);
    if (!found) { setResult({ok:false, msg:'کاربر غذایی ندارد'}); return; }
    if (found.delivered) { setResult({ok:false, msg:`${found.uid} غذا را قبلا تحویل گرفته`}); return; }
    setResult({ok:true, msg:`غذا تحویل شد — ${found.name}`});
    setScanInput('');
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">تحویل غذا — پنل مدیریت</h2>
      <div className="card">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input className="input pr-10" placeholder="اسکن کارت یا وارد کردن کد ملی" value={scanInput} onChange={e => setScanInput(e.target.value)} onKeyDown={e => e.key==='Enter' && handleScan()} />
          </div>
          <button onClick={handleScan} className="btn-primary">تحویل</button>
        </div>
        {result && (
          <div className={`mt-3 p-3 rounded-lg text-sm flex items-center gap-2 ${result.ok?'bg-green-50 text-green-700':'bg-red-50 text-red-700'}`}>
            {result.ok ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
            {result.msg}
          </div>
        )}
      </div>
      <div className="card">
        <h3 className="font-bold mb-3">لیست رزروهای امروز</h3>
        <div className="space-y-2">
          {DEMO_DELIVERIES.map((d,i) => (
            <div key={i} className="flex items-center justify-between py-2 border-b last:border-0">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${d.delivered?'bg-green-100':'bg-gray-100'}`}>
                  {d.delivered ? <Check className="w-4 h-4 text-green-600" /> : <span className="text-xs text-gray-400">۰</span>}
                </div>
                <div><p className="font-medium text-sm">{d.name}</p><p className="text-xs text-gray-400">{d.uid} — {d.food} ({d.meal})</p></div>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded ${d.delivered?'bg-green-100 text-green-700':'bg-yellow-100 text-yellow-700'}`}>{d.delivered?'تحویل شده':'در انتظار'}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
