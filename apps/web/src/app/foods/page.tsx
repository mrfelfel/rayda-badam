'use client';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Check, Copy } from 'lucide-react';
import { clsx } from 'clsx';
import { useAuth } from '@/lib/auth';

interface PlanSlot { dow: number; food: {id:string;name:string}; meal: {id:string;name:string}; price: number; lock: boolean; place?: string; }
const DAYS = ['شنبه','یکشنبه','دوشنبه','سه‌شنبه','چهارشنبه','پنجشنبه','جمعه'];

// Demo plan data
const DEMO_PLAN: PlanSlot[] = [
  { dow: 0, food: {id:'f1',name:'چلو کباب'}, meal: {id:'1',name:'ناهار'}, price: 45000, lock: false, place: 'سلف مرکزی' },
  { dow: 0, food: {id:'f2',name:'زرشک پلو'}, meal: {id:'2',name:'شام'}, price: 38000, lock: false, place: 'سلف مرکزی' },
  { dow: 1, food: {id:'f3',name:'قورمه سبزی'}, meal: {id:'1',name:'ناهار'}, price: 42000, lock: false, place: 'سلف مرکزی' },
  { dow: 1, food: {id:'f4',name:'چلو مرغ'}, meal: {id:'2',name:'شام'}, price: 35000, lock: false, place: 'سلف مرکزی' },
  { dow: 2, food: {id:'f5',name:'باقلو پلو'}, meal: {id:'1',name:'ناهار'}, price: 48000, lock: false, place: 'سلف مرکزی' },
  { dow: 2, food: {id:'f6',name:'رشته پلو'}, meal: {id:'2',name:'شام'}, price: 40000, lock: false, place: 'سلف مرکزی' },
  { dow: 3, food: {id:'f7',name:'چلو ماهی'}, meal: {id:'1',name:'ناهار'}, price: 55000, lock: false, place: 'سلف مرکزی' },
  { dow: 3, food: {id:'f8',name:'آش رشته'}, meal: {id:'2',name:'شام'}, price: 30000, lock: false, place: 'سلف مرکزی' },
  { dow: 4, food: {id:'f9',name:'خورشت قیمه'}, meal: {id:'1',name:'ناهار'}, price: 40000, lock: false, place: 'سلف مرکزی' },
  { dow: 4, food: {id:'f10',name:'چلو کتلت'}, meal: {id:'2',name:'شام'}, price: 36000, lock: false, place: 'سلف مرکزی' },
];

export default function FoodsPage() {
  const { uid } = useAuth();
  const [plan] = useState<PlanSlot[]>(DEMO_PLAN);
  const [reserved, setReserved] = useState<{food:string;meal:string;dow:number}[]>([]);
  const [balance, setBalance] = useState(500000);
  const [weekOffset, setWeekOffset] = useState(0);
  const [selectedDay, setSelectedDay] = useState(new Date().getDay() === 6 ? 0 : new Date().getDay() === 0 ? 1 : new Date().getDay());
  const [locked, setLocked] = useState(false);
  const filteredPlan = plan.filter(p => p.dow === selectedDay);

  const isReserved = (s: PlanSlot) => reserved.some(r => r.food===s.food.id && r.meal===s.meal.id && r.dow===s.dow);

  const handleReserve = (slot: PlanSlot) => {
    if (locked || slot.lock) return;
    if (balance < slot.price) return;
    setLocked(true);
    setTimeout(() => {
      if (isReserved(slot)) {
        setReserved(r => r.filter(x => !(x.food===slot.food.id && x.meal===slot.meal.id && x.dow===slot.dow)));
        setBalance(b => b + slot.price);
      } else {
        setReserved(r => [...r, { food: slot.food.id, meal: slot.meal.id, dow: slot.dow }]);
        setBalance(b => b - slot.price);
      }
      setLocked(false);
    }, 500);
  };

  return (
    <div className="space-y-6">
      <div className="card bg-gradient-to-l from-brand-50 to-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">رزرو غذا</h2>
            <p className="text-sm text-gray-500 mt-1">
              سلام {uid} — موجودی شما: <span className="font-bold text-brand-700">{balance.toLocaleString('fa-IR')} ریال</span>
            </p>
          </div>
          <div className="flex gap-2">
            <button className="btn-primary text-xs">افزایش موجودی</button>
            <button className="btn-outline text-xs">انتقال اعتبار</button>
          </div>
        </div>
      </div>
      <div className="flex gap-1 bg-gray-100 p-1 rounded-xl">
        {DAYS.map((day, i) => (
          <button key={i} onClick={() => setSelectedDay(i)} className={clsx('flex-1 py-2 px-2 rounded-lg text-sm font-medium transition-colors', selectedDay===i?'bg-white text-brand-700 shadow-sm':'text-gray-500 hover:text-gray-700')}>
            {day}
          </button>
        ))}
      </div>
      <div className="space-y-3">
        {filteredPlan.length===0 && <div className="card text-center py-8 text-gray-400">غذایی برای این روز برنامه‌ریزی نشده است</div>}
        {filteredPlan.map((slot, i) => {
          const res = isReserved(slot);
          return (
            <div key={i} className={clsx('card transition-all', slot.lock&&'opacity-50', res&&'border-brand-200 bg-brand-50/30')}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {res && <div className="w-10 h-10 bg-brand-100 rounded-full flex items-center justify-center"><Check className="w-5 h-5 text-brand-600" /></div>}
                  <div>
                    <h3 className="font-bold">{slot.food.name}</h3>
                    <p className="text-sm text-gray-500">{slot.meal.name} — {slot.place}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <p className="font-bold text-brand-700">{slot.price.toLocaleString('fa-IR')} ریال</p>
                  <button
                    onClick={() => handleReserve(slot)}
                    disabled={slot.lock || locked}
                    className={clsx(res?'btn-danger':'btn-primary', 'text-xs whitespace-nowrap')}
                  >
                    {res ? `لغو ${slot.price.toLocaleString('fa-IR')}` : `رزرو ${slot.price.toLocaleString('fa-IR')}`}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex items-center justify-center gap-3">
        <button onClick={()=>setWeekOffset(w=>w-1)} className="btn-outline"><ChevronRight className="w-4 h-4 inline" /> قبلی</button>
        <button onClick={()=>setWeekOffset(0)} className="btn-outline">جاری</button>
        <button onClick={()=>setWeekOffset(w=>w+1)} className="btn-outline">بعدی <ChevronLeft className="w-4 h-4 inline" /></button>
      </div>
    </div>
  );
}
