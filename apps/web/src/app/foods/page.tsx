'use client';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Check, Copy } from 'lucide-react';
import { clsx } from 'clsx';

interface PlanSlot { dow: number; food: {id:string;name:string}; meal: {id:string;name:string}; price: number; lock: boolean; place?: string; }
const DAYS = ['شنبه','یکشنبه','دوشنبه','سه‌شنبه','چهارشنبه','پنجشنبه','جمعه'];

export default function FoodsPage() {
  const [plan] = useState<PlanSlot[]>([]);
  const [reserved] = useState<any[]>([]);
  const [balance] = useState(0);
  const [weekOffset, setWeekOffset] = useState(0);
  const [selectedDay, setSelectedDay] = useState(0);
  const [locked, setLocked] = useState(false);
  const filteredPlan = plan.filter(p => p.dow === selectedDay);
  const isReserved = (s: PlanSlot) => reserved.some(r => r.food===s.food.id && r.meal===s.meal.id);

  return (
    <div className="space-y-6">
      <div className="card bg-gradient-to-l from-brand-50 to-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">رزرو غذا</h2>
            <p className="text-sm text-gray-500 mt-1">موجودی شما: <span className="font-bold text-brand-700">{balance.toLocaleString('fa-IR')} ریال</span></p>
          </div>
          <div className="flex gap-2">
            <button className="btn-primary text-xs">افزایش موجودی</button>
            <button className="btn-outline text-xs">انتقال اعتبار</button>
          </div>
        </div>
      </div>
      <div className="flex gap-1 bg-gray-100 p-1 rounded-xl">
        {DAYS.map((day, i) => (
          <button key={i} onClick={() => setSelectedDay(i)} className={clsx('flex-1 py-2 px-2 rounded-lg text-sm font-medium transition-colors', selectedDay===i?'bg-white text-brand-700 shadow-sm':'text-gray-500 hover:text-gray-700')}>{day}</button>
        ))}
      </div>
      <div className="space-y-3">
        {filteredPlan.length===0 && <div className="card text-center py-8 text-gray-400">غذایی برای این روز برنامه‌ریزی نشده است</div>}
        {filteredPlan.map((slot, i) => {
          const res = isReserved(slot);
          return (
            <div key={i} className={clsx('card', slot.lock&&'opacity-50')}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {res && <div className="w-10 h-10 bg-brand-50 rounded-full flex items-center justify-center"><Check className="w-5 h-5 text-brand-600" /></div>}
                  <div><h3 className="font-bold">{slot.food.name}</h3><p className="text-sm text-gray-500">{slot.meal.name}</p></div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-left"><p className="font-bold text-brand-700">{slot.price.toLocaleString('fa-IR')} ریال</p>{slot.place&&<p className="text-xs text-gray-400">{slot.place}</p>}</div>
                  <button disabled={slot.lock||locked} className={clsx(res?'btn-danger':'btn-primary','text-xs whitespace-nowrap')}>
                    {res?`لغو غذا ${slot.price.toLocaleString('fa-IR')} ریال`:`رزرو غذا ${slot.price.toLocaleString('fa-IR')} ریال`}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex items-center justify-center gap-3">
        <button onClick={()=>setWeekOffset(w=>w-1)} className="btn-outline"><ChevronRight className="w-4 h-4" />قبلی</button>
        <button onClick={()=>setWeekOffset(0)} className="btn-outline">جاری</button>
        <button onClick={()=>setWeekOffset(w=>w+1)} className="btn-outline">بعدی<ChevronLeft className="w-4 h-4" /></button>
        <button className="btn-outline"><Copy className="w-3 h-3" />لینک هفته</button>
      </div>
    </div>
  );
}
