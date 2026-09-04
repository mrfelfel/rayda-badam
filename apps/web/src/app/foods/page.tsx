'use client';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Check, X, ShoppingCart, Plus, Minus } from 'lucide-react';
import { clsx } from 'clsx';
import { useAuth } from '@/lib/auth';

interface PlanSlot { dow: number; food: {id:string;name:string}; meal: {id:string;name:string}; price: number; lock: boolean; place?: string; img?: string; }
const DAYS = ['شنبه','یکشنبه','دوشنبه','سه‌شنبه','چهارشنبه','پنجشنبه','جمعه'];

const DEMO_PLAN: PlanSlot[] = [
  { dow:0, food:{id:'f1',name:'چلو کباب سلطانی'}, meal:{id:'1',name:'ناهار'}, price:45000, lock:false, place:'سلف مرکزی', img:'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200&h=200&fit=crop' },
  { dow:0, food:{id:'f2',name:'زرشک پلو با مرغ'}, meal:{id:'2',name:'شام'}, price:38000, lock:false, place:'سلف مرکزی', img:'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=200&h=200&fit=crop' },
  { dow:1, food:{id:'f3',name:'قورمه سبزی'}, meal:{id:'1',name:'ناهار'}, price:42000, lock:false, place:'سلف مرکزی', img:'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=200&h=200&fit=crop' },
  { dow:1, food:{id:'f4',name:'چلو مرغ بریان'}, meal:{id:'2',name:'شام'}, price:35000, lock:false, place:'سلف مرکزی', img:'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=200&h=200&fit=crop' },
  { dow:2, food:{id:'f5',name:'باقلو پلو با گوشت'}, meal:{id:'1',name:'ناهار'}, price:48000, lock:false, place:'سلف مرکزی', img:'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=200&h=200&fit=crop' },
  { dow:2, food:{id:'f6',name:'رشته پلو'}, meal:{id:'2',name:'شام'}, price:40000, lock:false, place:'سلف مرکزی', img:'https://images.unsplash.com/photo-1574484284002-952d92456975?w=200&h=200&fit=crop' },
  { dow:3, food:{id:'f7',name:'چلو ماهی'}, meal:{id:'1',name:'ناهار'}, price:55000, lock:false, place:'سلف مرکزی', img:'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a0?w=200&h=200&fit=crop' },
  { dow:3, food:{id:'f8',name:'آش رشته'}, meal:{id:'2',name:'شام'}, price:30000, lock:false, place:'سلف مرکزی', img:'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=200&h=200&fit=crop' },
  { dow:4, food:{id:'f9',name:'خورشت قیمه'}, meal:{id:'1',name:'ناهار'}, price:40000, lock:false, place:'سلف مرکزی', img:'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=200&h=200&fit=crop' },
  { dow:4, food:{id:'f10',name:'چلو کتلت'}, meal:{id:'2',name:'شام'}, price:36000, lock:false, place:'سلف مرکزی', img:'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=200&h=200&fit=crop' },
  { dow:5, food:{id:'f11',name:'حلیم بادمجان'}, meal:{id:'1',name:'ناهار'}, price:35000, lock:false, place:'سلف مرکزی', img:'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=200&h=200&fit=crop' },
];

export default function FoodsPage() {
  const { uid } = useAuth();
  const [plan] = useState<PlanSlot[]>(DEMO_PLAN);
  const [reserved, setReserved] = useState<{food:string;meal:string;dow:number}[]>([]);
  const [balance, setBalance] = useState(500000);
  const [selectedDay, setSelectedDay] = useState(new Date().getDay() === 0 ? 6 : new Date().getDay() - 1);
  const [locked, setLocked] = useState(false);
  const [showPay, setShowPay] = useState(false);
  const [showTransfer, setShowTransfer] = useState(false);
  const [payAmount, setPayAmount] = useState('');
  const [transferAmount, setTransferAmount] = useState('');
  const [transferTarget, setTransferTarget] = useState('');
  const [notification, setNotification] = useState('');

  const filtered = plan.filter(p => p.dow === selectedDay);
  const isReserved = (s: PlanSlot) => reserved.some(r => r.food === s.food.id && r.meal === s.meal.id);
  const notify = (msg: string) => { setNotification(msg); setTimeout(() => setNotification(''), 2500); };

  const handleReserve = (slot: PlanSlot) => {
    if (locked || slot.lock) return;
    if (!isReserved(slot) && balance < slot.price) { notify('موجودی کافی نیست'); return; }
    setLocked(true);
    setTimeout(() => {
      if (isReserved(slot)) {
        setReserved(r => r.filter(x => !(x.food === slot.food.id && x.meal === slot.meal.id)));
        setBalance(b => b + slot.price);
        notify('رزرو لغو شد');
      } else {
        setReserved(r => [...r, { food: slot.food.id, meal: slot.meal.id, dow: slot.dow }]);
        setBalance(b => b - slot.price);
        notify('رزرو شد ✓');
      }
      setLocked(false);
    }, 400);
  };

  return (
    <div className="page-container relative">
      {notification && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-gray-800 text-white px-5 py-2.5 rounded-full text-sm shadow-xl">{notification}</div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">رزرو غذا</h1>
        <div className="flex items-center gap-2">
          <button onClick={() => setShowPay(true)} className="badge-pink cursor-pointer">{balance.toLocaleString('fa-IR')} تومان</button>
        </div>
      </div>

      {/* Day selector */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide">
        {DAYS.map((d, i) => (
          <button key={i} onClick={() => setSelectedDay(i)} className={clsx('flex flex-col items-center min-w-[52px] py-3 rounded-2xl transition-all', selectedDay === i ? 'bg-pink-500 text-white shadow-lg shadow-pink-200' : 'bg-white text-gray-500 border border-gray-100')}>
            <span className="text-[10px]">{d.slice(0, 3)}</span>
            <span className="text-lg font-bold mt-1">{i + 7}</span>
          </button>
        ))}
      </div>

      {/* Meal groups */}
      {['1', '2'].map(mealId => {
        const mealName = mealId === '1' ? 'ناهار' : 'شام';
        const mealItems = filtered.filter(f => f.meal.id === mealId);
        if (mealItems.length === 0) return null;
        return (
          <div key={mealId} className="space-y-3">
            <h3 className="section-title text-sm text-gray-500">{mealName}</h3>
            {mealItems.map((slot, i) => {
              const res = isReserved(slot);
              return (
                <div key={i} className={clsx('food-card flex', slot.lock && 'opacity-50')}>
                  <div className="w-24 h-24 flex-shrink-0 bg-gray-100 rounded-r-2xl overflow-hidden">
                    {slot.img ? <img src={slot.img} alt={slot.food.name} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-2xl">🍱</div>}
                  </div>
                  <div className="flex-1 p-3 flex flex-col justify-between">
                    <div>
                      <h4 className="font-bold text-sm">{slot.food.name}</h4>
                      <p className="text-xs text-gray-400">{slot.place}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-pink-600 text-sm">{slot.price.toLocaleString('fa-IR')} تومان</span>
                      {res ? (
                        <button onClick={() => handleReserve(slot)} className="btn-danger text-xs px-3 py-1.5 flex items-center gap-1">
                          <X className="w-3 h-3" />لغو
                        </button>
                      ) : (
                        <button onClick={() => handleReserve(slot)} className="btn-primary text-xs px-3 py-1.5 flex items-center gap-1">
                          <Plus className="w-3 h-3" />رزرو
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}

      {filtered.length === 0 && <div className="card text-center py-12 text-gray-400">غذایی برنامه‌ریزی نشده</div>}

      {/* Payment Modal */}
      {showPay && (
        <div className="fixed inset-0 bg-black/50 flex items-end z-50" onClick={() => setShowPay(false)}>
          <div className="bg-white w-full rounded-t-3xl p-6 pb-8" onClick={e => e.stopPropagation()}>
            <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-4" />
            <h3 className="font-bold text-lg mb-4">افزایش موجودی</h3>
            <input type="number" className="input mb-4" placeholder="مبلغ به تومان" value={payAmount} onChange={e => setPayAmount(e.target.value)} />
            <div className="grid grid-cols-3 gap-2 mb-4">
              {[100000, 200000, 500000].map(a => (
                <button key={a} onClick={() => setPayAmount(String(a))} className="btn-outline text-xs">{(a/1000).toLocaleString('fa-IR')} هزار</button>
              ))}
            </div>
            <button onClick={() => { if(parseInt(payAmount)>=1000) { setBalance(b=>b+parseInt(payAmount)); setShowPay(false); notify('موجودی اضافه شد'); }}} className="btn-primary w-full">پرداخت</button>
          </div>
        </div>
      )}

      {/* Transfer Modal */}
      {showTransfer && (
        <div className="fixed inset-0 bg-black/50 flex items-end z-50" onClick={() => setShowTransfer(false)}>
          <div className="bg-white w-full rounded-t-3xl p-6 pb-8" onClick={e => e.stopPropagation()}>
            <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-4" />
            <h3 className="font-bold text-lg mb-4">انتقال اعتبار</h3>
            <input type="number" className="input mb-3" placeholder="مبلغ به تومان" value={transferAmount} onChange={e => setTransferAmount(e.target.value)} />
            <input type="text" className="input mb-4" placeholder="کد ملی مقصد" value={transferTarget} onChange={e => setTransferTarget(e.target.value)} />
            <button onClick={() => { if(parseInt(transferAmount)>0 && transferTarget && parseInt(transferAmount)<=balance) { setBalance(b=>b-parseInt(transferAmount)); setShowTransfer(false); notify('انتقال انجام شد'); }}} className="btn-primary w-full">تکمیل انتقال</button>
          </div>
        </div>
      )}
    </div>
  );
}
