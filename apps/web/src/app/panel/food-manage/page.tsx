'use client';
import { useState } from 'react';
import { Plus, Trash2, Edit, Save, ChevronDown, ChevronUp } from 'lucide-react';
import { clsx } from 'clsx';

const DEMO_FOODS = [
  { id:'f1', name:'چلو کباب', price:45000, category:'گوشتی' },
  { id:'f2', name:'زرشک پلو با مرغ', price:38000, category:'مرغ' },
  { id:'f3', name:'قورمه سبزی', price:42000, category:'سبزیجات' },
  { id:'f4', name:'چلو مرغ بریان', price:35000, category:'مرغ' },
  { id:'f5', name:'باقلو پلو با گوشت', price:48000, category:'گوشتی' },
  { id:'f6', name:'رشته پلو', price:40000, category:'گوشتی' },
  { id:'f7', name:'چلو ماهی', price:55000, category:'دریایی' },
  { id:'f8', name:'آش رشته', price:30000, category:'آش' },
];
const DEMO_MEALS = [
  { id:'1', name:'ناهار', start:'11:00', end:'14:00' },
  { id:'2', name:'شام', start:'17:00', end:'22:00' },
  { id:'3', name:'سحری', start:'02:00', end:'05:00' },
];
const DEMO_PLACES = [
  { id:'p1', name:'سلف مرکزی', desc:'محل تحویل' },
  { id:'p2', name:'سلف خوابگاه ۱', desc:'محل تحویل' },
  { id:'p3', name:'سلف خوابگاه ۲', desc:'محل تحویل' },
  { id:'p4', name:'سلف فنی', desc:'محل تحویل' },
];

const tabs = ['برنامه هفتگی','غذاها','وعده‌ها','محل‌ها','گروه‌ها'];

export default function FoodManagePage() {
  const [activeTab, setActiveTab] = useState(0);
  const [foods, setFoods] = useState(DEMO_FOODS);
  const [meals, setMeals] = useState(DEMO_MEALS);
  const [places, setPlaces] = useState(DEMO_PLACES);
  const [newFood, setNewFood] = useState({ name:'', price:0, category:'' });
  const [showAdd, setShowAdd] = useState(false);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">مدیریت تغذیه</h2>
      <div className="flex gap-2 overflow-x-auto pb-2">
        {tabs.map((t, i) => (
          <button key={i} onClick={() => setActiveTab(i)} className={clsx('px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap', activeTab===i ? 'bg-brand-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200')}>
            {t}
          </button>
        ))}
      </div>

      {activeTab === 1 && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold">لیست غذاها ({foods.length})</h3>
            <button onClick={() => setShowAdd(!showAdd)} className="btn-primary text-xs flex items-center gap-1"><Plus className="w-4 h-4" />افزودن غذا</button>
          </div>
          {showAdd && (
            <div className="card flex gap-3 items-end">
              <input className="input flex-1" placeholder="نام غذا" value={newFood.name} onChange={e => setNewFood({...newFood, name: e.target.value})} />
              <input className="input w-32" type="number" placeholder="قیمت" value={newFood.price || ''} onChange={e => setNewFood({...newFood, price: parseInt(e.target.value)})} />
              <input className="input w-32" placeholder="دسته" value={newFood.category} onChange={e => setNewFood({...newFood, category: e.target.value})} />
              <button onClick={() => { if(newFood.name) { setFoods([...foods, {...newFood, id:'f'+Date.now()}]); setNewFood({name:'',price:0,category:''}); setShowAdd(false); }}} className="btn-primary">ذخیره</button>
            </div>
          )}
          <div className="space-y-2">
            {foods.map(f => (
              <div key={f.id} className="card flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-400 w-8">{f.id}</span>
                  <span className="font-medium">{f.name}</span>
                  <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">{f.category}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-brand-700">{f.price.toLocaleString('fa-IR')} ریال</span>
                  <button className="text-gray-400 hover:text-red-500" onClick={() => setFoods(foods.filter(x => x.id !== f.id))}><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 2 && (
        <div className="space-y-3">
          <h3 className="font-bold">وعده‌های غذایی</h3>
          {meals.map(m => (
            <div key={m.id} className="card flex items-center justify-between">
              <div><span className="font-medium">{m.name}</span><span className="text-sm text-gray-400 mr-3">{m.start} - {m.end}</span></div>
              <button className="text-gray-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
            </div>
          ))}
        </div>
      )}

      {activeTab === 3 && (
        <div className="space-y-3">
          <h3 className="font-bold">محل‌های تحویل</h3>
          {places.map(p => (
            <div key={p.id} className="card flex items-center justify-between">
              <div><span className="font-medium">{p.name}</span><span className="text-xs text-gray-400 mr-3">{p.desc}</span></div>
              <button className="text-gray-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
            </div>
          ))}
        </div>
      )}

      {activeTab === 0 && (
        <div className="card text-center py-12 text-gray-400">
          <p>برنامه‌ریزی هفتگی غذا</p>
          <p className="text-xs mt-2">این بخش برای تنظیم برنامه غذایی هر هفته استفاده می‌شود</p>
        </div>
      )}

      {activeTab === 4 && (
        <div className="card text-center py-12 text-gray-400">
          <p>گروه‌های غذایی</p>
          <p className="text-xs mt-2">مدیریت گروه‌های قیمت‌گذاری</p>
        </div>
      )}
    </div>
  );
}
