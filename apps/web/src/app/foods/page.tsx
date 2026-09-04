'use client';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Check, Copy, X, AlertCircle } from 'lucide-react';
import { clsx } from 'clsx';
import { useAuth } from '@/lib/auth';

interface PlanSlot { dow: number; food: {id:string;name:string}; meal: {id:string;name:string}; price: number; lock: boolean; place?: string; }
const DAYS = ['شنبه','یکشنبه','دوشنبه','سه‌شنبه','چهارشنبه','پنجشنبه','جمعه'];

// Demo plan - complete weekly menu
const DEMO_PLAN: PlanSlot[] = [
  { dow:0, food:{id:'f1',name:'چلو کباب'}, meal:{id:'1',name:'ناهار'}, price:45000, lock:false, place:'سلف مرکزی' },
  { dow:0, food:{id:'f2',name:'زرشک پلو با مرغ'}, meal:{id:'2',name:'شام'}, price:38000, lock:false, place:'سلف مرکزی' },
  { dow:1, food:{id:'f3',name:'قورمه سبزی'}, meal:{id:'1',name:'ناهار'}, price:42000, lock:false, place:'سلف مرکزی' },
  { dow:1, food:{id:'f4',name:'چلو مرغ بریان'}, meal:{id:'2',name:'شام'}, price:35000, lock:false, place:'سلف مرکزی' },
  { dow:1, food:{id:'f4b',name:'خورشت قیمه'}, meal:{id:'1',name:'ناهار'}, price:38000, lock:false, place:'خوابگاه ۱' },
  { dow:2, food:{id:'f5',name:'باقلو پلو با گوشت'}, meal:{id:'1',name:'ناهار'}, price:48000, lock:false, place:'سلف مرکزی' },
  { dow:2, food:{id:'f6',name:'رشته پلو با گوشت کوبیده'}, meal:{id:'2',name:'شام'}, price:40000, lock:false, place:'سلف مرکزی' },
  { dow:3, food:{id:'f7',name:'چلو ماهی'}, meal:{id:'1',name:'ناهار'}, price:55000, lock:false, place:'سلف مرکزی' },
  { dow:3, food:{id:'f8',name:'آش رشته'}, meal:{id:'2',name:'شام'}, price:30000, lock:false, place:'سلف مرکزی' },
  { dow:4, food:{id:'f9',name:'خورشت قیمه بادمجان'}, meal:{id:'1',name:'ناهار'}, price:40000, lock:false, place:'سلف مرکزی' },
  { dow:4, food:{id:'f10',name:'چلو کتلت'}, meal:{id:'2',name:'شام'}, price:36000, lock:false, place:'سلف مرکزی' },
  { dow:5, food:{id:'f11',name:'حلیم بادمجان'}, meal:{id:'1',name:'ناهار'}, price:35000, lock:false, place:'سلف مرکزی' },
];

// All cafeterias and places
const PLACES = ['سلف مرکزی','سلف خوابگاه ۱','سلف خوابگاه ۲','سلف فنی','سلف علوم'];

export default function FoodsPage() {
  const { uid } = useAuth();
  const [plan] = useState<PlanSlot[]>(DEMO_PLAN);
  const [reserved, setReserved] = useState<{food:string;meal:string;dow:number;place:string}[]>([]);
  const [balance, setBalance] = useState(500000);
  const [weekOffset, setWeekOffset] = useState(0);
  const now = new Date();
  const jsDay = now.getDay();
  const [selectedDay, setSelectedDay] = useState(jsDay === 0 ? 6 : jsDay - 1);
  const [locked, setLocked] = useState(false);
  const [showPayDialog, setShowPayDialog] = useState(false);
  const [showTransferDialog, setShowTransferDialog] = useState(false);
  const [payAmount, setPayAmount] = useState('');
  const [transferAmount, setTransferAmount] = useState('');
  const [transferTarget, setTransferTarget] = useState('');
  const [notification, setNotification] = useState('');

  const filteredPlan = plan.filter(p => p.dow === selectedDay);
  const isReserved = (s: PlanSlot) => reserved.some(r => r.food===s.food.id && r.meal===s.meal.id && r.dow===s.dow);

  const notify = (msg: string) => { setNotification(msg); setTimeout(() => setNotification(''), 3000); };

  const handleReserve = (slot: PlanSlot) => {
    if (locked || slot.lock) return;
    if (!isReserved(slot) && balance < slot.price) { notify('موجودی کافی نیست'); return; }
    setLocked(true);
    setTimeout(() => {
      if (isReserved(slot)) {
        setReserved(r => r.filter(x => !(x.food===slot.food.id && x.meal===slot.meal.id && x.dow===slot.dow)));
        setBalance(b => b + slot.price);
        notify('رزرو لغو شد');
      } else {
        setReserved(r => [...r, { food:slot.food.id, meal:slot.meal.id, dow:slot.dow, place:slot.place||'سلف مرکزی' }]);
        setBalance(b => b - slot.price);
        notify('رزرو شد');
      }
      setLocked(false);
    }, 500);
  };

  const handlePay = () => {
    const amt = parseInt(payAmount);
    if (!amt || amt < 1000 || amt > 10000000) { notify('مبلغ نامعتبر'); return; }
    setBalance(b => b + amt);
    setShowPayDialog(false);
    setPayAmount('');
    notify(`مبلغ ${amt.toLocaleString('fa-IR')} ریال به موجودی اضافه شد`);
  };

  const handleTransfer = () => {
    const amt = parseInt(transferAmount);
    if (!amt || amt < 1) { notify('مبلغ نامعتبر'); return; }
    if (!transferTarget) { notify('کد ملی مقصد را وارد کنید'); return; }
    if (amt > balance) { notify('موجودی کافی نیست'); return; }
    setBalance(b => b - amt);
    setShowTransferDialog(false);
    setTransferAmount(''); setTransferTarget('');
    notify(`${amt.toLocaleString('fa-IR')} ریال به ${transferTarget} منتقل شد`);
  };

  return (
    <div className="space-y-6 relative">
      {notification && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-gray-800 text-white px-4 py-2 rounded-lg text-sm shadow-lg flex items-center gap-2">
          {notification}
          <button onClick={() => setNotification('')}><X className="w-4 h-4" /></button>
        </div>
      )}

      {/* Header */}
      <div className="card bg-gradient-to-l from-brand-50 to-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">رزرو غذا</h2>
            <p className="text-sm text-gray-500 mt-1">
              سلام {uid} — موجودی: <span className="font-bold text-brand-700">{balance.toLocaleString('fa-IR')} ریال</span>
            </p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setShowPayDialog(true)} className="btn-primary text-xs">افزایش موجودی</button>
            <button onClick={() => setShowTransferDialog(true)} className="btn-outline text-xs">انتقال اعتبار</button>
          </div>
        </div>
      </div>

      {/* Day Tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-xl">
        {DAYS.map((day, i) => (
          <button key={i} onClick={() => setSelectedDay(i)} className={clsx('flex-1 py-2 px-1 rounded-lg text-sm font-medium transition-colors', selectedDay===i?'bg-white text-brand-700 shadow-sm':'text-gray-500 hover:text-gray-700')}>
            {day}
          </button>
        ))}
      </div>

      {/* Food Cards */}
      <div className="space-y-3">
        {filteredPlan.length === 0 && (
          <div className="card text-center py-8 text-gray-400">
            <p>غذایی برای این روز برنامه‌ریزی نشده است</p>
            <p className="text-xs mt-1">یا این موسسه در این روز تعطیل است</p>
          </div>
        )}
        {filteredPlan.map((slot, i) => {
          const res = isReserved(slot);
          return (
            <div key={i} className={clsx('card transition-all', slot.lock && 'opacity-50', res && 'border-brand-200 bg-brand-50/30')}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {res && <div className="w-10 h-10 bg-brand-100 rounded-full flex items-center justify-center"><Check className="w-5 h-5 text-brand-600" /></div>}
                  <div>
                    <h3 className="font-bold">{slot.food.name}</h3>
                    <p className="text-sm text-gray-500">{slot.meal.name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-left">
                    <p className="font-bold text-brand-700">{slot.price.toLocaleString('fa-IR')} ریال</p>
                    {slot.place && <p className="text-xs text-gray-400">{slot.place}</p>}
                  </div>
                  <button
                    onClick={() => handleReserve(slot)}
                    disabled={slot.lock || locked}
                    className={clsx(res ? 'btn-danger' : 'btn-primary', 'text-xs whitespace-nowrap')}
                  >
                    {res ? `لغو غذا به مبلغ ${slot.price.toLocaleString('fa-IR')} ریال` : `رزرو غذا به مبلغ ${slot.price.toLocaleString('fa-IR')} ریال`}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Week Nav */}
      <div className="flex items-center justify-center gap-3">
        <button onClick={() => setWeekOffset(w => w - 1)} className="btn-outline"><ChevronRight className="w-4 h-4 inline" /> قبلی</button>
        <button onClick={() => setWeekOffset(0)} className="btn-outline">جاری</button>
        <button onClick={() => setWeekOffset(w => w + 1)} className="btn-outline">بعدی <ChevronLeft className="w-4 h-4 inline" /></button>
        <button className="btn-outline" onClick={() => { navigator.clipboard?.writeText(window.location.href); notify('لینک کپی شد'); }}><Copy className="w-3 h-3 inline" /> لینک هفته</button>
      </div>

      {/* Payment Dialog */}
      {showPayDialog && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={() => setShowPayDialog(false)}>
          <div className="bg-white rounded-xl p-6 w-96 shadow-xl" onClick={e => e.stopPropagation()}>
            <h3 className="font-bold text-lg mb-4">افزایش موجودی</h3>
            <p className="text-sm text-gray-500 mb-3">مبلغ را جهت افزایش موجودی وارد کنید</p>
            <input type="number" value={payAmount} onChange={e => setPayAmount(e.target.value)} className="input mb-4" placeholder="مبلغ به ریال (حداقل ۱,۰۰۰)" />
            <div className="flex gap-2 justify-end">
              <button onClick={() => setShowPayDialog(false)} className="btn-outline">بستن</button>
              <button onClick={handlePay} className="btn-primary">پرداخت</button>
            </div>
          </div>
        </div>
      )}

      {/* Transfer Dialog */}
      {showTransferDialog && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={() => setShowTransferDialog(false)}>
          <div className="bg-white rounded-xl p-6 w-96 shadow-xl" onClick={e => e.stopPropagation()}>
            <h3 className="font-bold text-lg mb-4">انتقال اعتبار</h3>
            <input type="number" value={transferAmount} onChange={e => setTransferAmount(e.target.value)} className="input mb-3" placeholder="مبلغ به ریال" />
            <input type="text" value={transferTarget} onChange={e => setTransferTarget(e.target.value)} className="input mb-4" placeholder="کد ملی مقصد" />
            <div className="flex gap-2 justify-end">
              <button onClick={() => setShowTransferDialog(false)} className="btn-outline">بستن</button>
              <button onClick={handleTransfer} className="btn-primary">تکمیل فرایند</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
