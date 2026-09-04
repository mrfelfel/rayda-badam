'use client';
import { useState } from 'react';
import { Check, X, Plus, ChevronRight, ChevronLeft, Clock, MapPin, Info } from 'lucide-react';
import { clsx } from 'clsx';
import { useAuth } from '@/lib/auth';

interface PlanSlot { dow: number; food: {id:string;name:string}; meal: {id:string;name:string}; price: number; lock: boolean; place: string; }
const DAYS = ['شنبه','یکشنبه','دوشنبه','سه‌شنبه','چهارشنبه','پنجشنبه','جمعه'];
const MEAL_ICONS: Record<string, string> = { '1':'🍱', '2':'🌙', '3':'☀️', '4':'🌅' };

const DEMO_PLAN: PlanSlot[] = [
  // Saturday
  { dow:0, food:{id:'f1',name:'چلو کباب'}, meal:{id:'1',name:'ناهار'}, price:45000, lock:false, place:'سلف مرکزی' },
  { dow:0, food:{id:'f2',name:'زرشک پلو'}, meal:{id:'2',name:'شام'}, price:38000, lock:false, place:'سلف مرکزی' },
  // Sunday
  { dow:1, food:{id:'f3',name:'قورمه سبزی'}, meal:{id:'1',name:'ناهار'}, price:42000, lock:false, place:'سلف مرکزی' },
  { dow:1, food:{id:'f4',name:'چلو مرغ'}, meal:{id:'2',name:'شام'}, price:35000, lock:false, place:'سلف مرکزی' },
  { dow:1, food:{id:'f4b',name:'خورشت قیمه'}, meal:{id:'1',name:'ناهار'}, price:38000, lock:false, place:'خوابگاه ۱' },
  // Monday
  { dow:2, food:{id:'f5',name:'باقلو پلو'}, meal:{id:'1',name:'ناهار'}, price:48000, lock:false, place:'سلف مرکزی' },
  { dow:2, food:{id:'f6',name:'رشته پلو'}, meal:{id:'2',name:'شام'}, price:40000, lock:false, place:'سلف مرکزی' },
  // Tuesday
  { dow:3, food:{id:'f7',name:'چلو ماهی'}, meal:{id:'1',name:'ناهار'}, price:55000, lock:false, place:'سلف مرکزی' },
  { dow:3, food:{id:'f8',name:'آش رشته'}, meal:{id:'2',name:'شام'}, price:30000, lock:false, place:'سلف مرکزی' },
  // Wednesday
  { dow:4, food:{id:'f9',name:'خورشت قیمه بادمجان'}, meal:{id:'1',name:'ناهار'}, price:40000, lock:false, place:'سلف مرکزی' },
  { dow:4, food:{id:'f10',name:'چلو کتلت'}, meal:{id:'2',name:'شام'}, price:36000, lock:false, place:'سلف مرکزی' },
];

export default function FoodsPage() {
  const { uid } = useAuth();
  const [plan] = useState<PlanSlot[]>(DEMO_PLAN);
  const [reserved, setReserved] = useState<{food:string;meal:string;dow:number;place:string}[]>([]);
  const [balance, setBalance] = useState(500000);
  const [weekOffset, setWeekOffset] = useState(0);
  const now = new Date();
  const [selectedDay, setSelectedDay] = useState(now.getDay() === 0 ? 6 : now.getDay() - 1);
  const [locked, setLocked] = useState(false);
  const [showPay, setShowPay] = useState(false);
  const [showTransfer, setShowTransfer] = useState(false);
  const [payAmount, setPayAmount] = useState('');
  const [transferAmount, setTransferAmount] = useState('');
  const [transferTarget, setTransferTarget] = useState('');
  const [notification, setNotification] = useState('');

  const filtered = plan.filter(p => p.dow === selectedDay);
  const isReserved = (s: PlanSlot) => reserved.some(r => r.food === s.food.id && r.meal === s.meal.id && r.dow === s.dow);
  const notify = (msg: string) => { setNotification(msg); setTimeout(() => setNotification(''), 2500); };

  const handleReserve = (slot: PlanSlot) => {
    if (locked || slot.lock) return;
    if (!isReserved(slot) && balance < slot.price) { notify('موجودی کافی نیست'); return; }
    setLocked(true);
    setTimeout(() => {
      if (isReserved(slot)) {
        setReserved(r => r.filter(x => !(x.food === slot.food.id && x.meal === slot.meal.id && x.dow === slot.dow)));
        setBalance(b => b + slot.price);
        notify('رزرو لغو شد');
      } else {
        setReserved(r => [...r, { food: slot.food.id, meal: slot.meal.id, dow: slot.dow, place: slot.place }]);
        setBalance(b => b - slot.price);
        notify('رزرو شد ✓');
      }
      setLocked(false);
    }, 400);
  };

  const weekLabel = weekOffset === 0 ? 'این هفته' : weekOffset > 0 ? `${weekOffset} هفته بعد` : `${Math.abs(weekOffset)} هفته قبل`;

  return (
    <div className="page-container relative">
      {notification && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-gray-800 text-white px-5 py-2.5 rounded-full text-sm shadow-xl flex items-center gap-2">
          {notification}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">برنامه غذایی</h1>
          <p className="text-xs text-gray-400">هفته {now.toLocaleDateString('fa-IR')} — {weekLabel}</p>
        </div>
        <button onClick={() => setShowPay(true)} className="badge-pink cursor-pointer text-xs">
          💰 {balance.toLocaleString('fa-IR')} تومان
        </button>
      </div>

      {/* Week nav */}
      <div className="flex items-center justify-between bg-white rounded-2xl p-2 border border-gray-100">
        <button onClick={() => setWeekOffset(w => w - 1)} className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-gray-50">
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>
        <button onClick={() => setWeekOffset(0)} className="px-4 py-1.5 rounded-xl text-sm font-medium bg-pink-50 text-pink-600">
          {weekLabel}
        </button>
        <button onClick={() => setWeekOffset(w => w + 1)} className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-gray-50">
          <ChevronLeft className="w-5 h-5 text-gray-400" />
        </button>
      </div>

      {/* Day tabs */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide">
        {DAYS.map((d, i) => {
          const dayResCount = reserved.filter(r => r.dow === i).length;
          return (
            <button key={i} onClick={() => setSelectedDay(i)} className={clsx('flex flex-col items-center min-w-[52px] py-3 rounded-2xl transition-all relative', selectedDay === i ? 'bg-pink-500 text-white shadow-lg shadow-pink-200' : 'bg-white text-gray-500 border border-gray-100')}>
              <span className="text-[10px]">{d.slice(0,3)}</span>
              <span className="text-lg font-bold mt-0.5">{i + 7}</span>
              {dayResCount > 0 && selectedDay !== i && <div className="absolute -top-1 -left-1 w-4 h-4 bg-pink-500 text-white text-[8px] rounded-full flex items-center justify-center font-bold">{dayResCount}</div>}
            </button>
          );
        })}
      </div>

      {/* Info banner */}
      <div className="flex items-center gap-2 p-3 bg-amber-50 rounded-xl text-xs text-amber-700">
        <Info className="w-4 h-4 shrink-0" />
        <span>رزروهای این هفته را مدیریت کنید. قفل شده‌ها قابل تغییر نیستند.</span>
      </div>

      {/* Meals for selected day */}
      {filtered.length === 0 ? (
        <div className="card text-center py-12">
          <span className="text-4xl mb-3 block">🍽️</span>
          <p className="text-gray-400">غذایی برای این روز تعریف نشده</p>
        </div>
      ) : (
        ['1', '2'].map(mealId => {
          const mealName = mealId === '1' ? 'ناهار' : 'شام';
          const items = filtered.filter(f => f.meal.id === mealId);
          if (items.length === 0) return null;
          return (
            <div key={mealId} className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-lg">{MEAL_ICONS[mealId]}</span>
                <h3 className="font-bold text-sm">{mealName}</h3>
                <span className="text-xs text-gray-400">({items.length} غذا)</span>
              </div>
              {items.map((slot, i) => {
                const res = isReserved(slot);
                return (
                  <div key={i} className={clsx('card flex items-center gap-4', slot.lock && 'opacity-50', res && 'border-pink-200 bg-pink-50/30')}>
                    <div className={clsx('w-12 h-12 rounded-2xl flex items-center justify-center text-xl', res ? 'bg-pink-100' : 'bg-gray-50')}>
                      {res ? <Check className="w-6 h-6 text-pink-500" /> : <span>{MEAL_ICONS[mealId]}</span>}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-sm">{slot.food.name}</h4>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-gray-400 flex items-center gap-1"><MapPin className="w-3 h-3" />{slot.place}</span>
                      </div>
                    </div>
                    <div className="text-left flex flex-col items-end gap-1.5">
                      <span className="font-bold text-pink-600 text-sm">{slot.price.toLocaleString('fa-IR')}</span>
                      <button
                        onClick={() => handleReserve(slot)}
                        disabled={slot.lock || locked}
                        className={clsx(
                          res ? 'bg-red-50 text-red-600 hover:bg-red-100' : 'bg-pink-500 text-white hover:bg-pink-600 shadow-sm shadow-pink-200',
                          'px-3 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1 transition-all active:scale-95'
                        )}
                      >
                        {res ? <><X className="w-3 h-3" />لغو</> : <><Plus className="w-3 h-3" />رزرو</>}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })
      )}

      {/* Payment Bottom Sheet */}
      {showPay && (
        <div className="fixed inset-0 bg-black/50 flex items-end z-50" onClick={() => setShowPay(false)}>
          <div className="bg-white w-full rounded-t-3xl p-6 pb-8" onClick={e => e.stopPropagation()}>
            <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-4" />
            <h3 className="font-bold text-lg mb-1">افزایش موجودی</h3>
            <p className="text-xs text-gray-400 mb-4">مبلغ مورد نظر را به تومان وارد کنید</p>
            <input type="number" className="input mb-3 text-center text-xl font-bold" placeholder="۰" value={payAmount} onChange={e => setPayAmount(e.target.value)} />
            <div className="grid grid-cols-3 gap-2 mb-5">
              {[50000, 100000, 200000, 500000, 1000000].slice(0,3).map(a => (
                <button key={a} onClick={() => setPayAmount(String(a))} className="btn-outline text-xs">{(a/1000).toLocaleString('fa-IR')} هزار</button>
              ))}
            </div>
            <button onClick={() => { const a = parseInt(payAmount); if(a >= 1000) { setBalance(b => b + a); setShowPay(false); setPayAmount(''); notify('موجودی اضافه شد'); }}} className="btn-primary w-full py-3.5">پرداخت</button>
          </div>
        </div>
      )}

      {/* Transfer Bottom Sheet */}
      {showTransfer && (
        <div className="fixed inset-0 bg-black/50 flex items-end z-50" onClick={() => setShowTransfer(false)}>
          <div className="bg-white w-full rounded-t-3xl p-6 pb-8" onClick={e => e.stopPropagation()}>
            <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-4" />
            <h3 className="font-bold text-lg mb-4">انتقال اعتبار</h3>
            <input type="number" className="input mb-3" placeholder="مبلغ به تومان" value={transferAmount} onChange={e => setTransferAmount(e.target.value)} />
            <input type="text" className="input mb-4" placeholder="کد ملی مقصد" value={transferTarget} onChange={e => setTransferTarget(e.target.value)} />
            <button onClick={() => { const a = parseInt(transferAmount); if(a > 0 && transferTarget && a <= balance) { setBalance(b => b - a); setShowTransfer(false); setTransferAmount(''); setTransferTarget(''); notify('انتقال انجام شد'); }}} className="btn-primary w-full py-3.5">تکمیل انتقال</button>
          </div>
        </div>
      )}
    </div>
  );
}
