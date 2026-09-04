'use client';
import { useState } from 'react';
import { Plus, Trash2, Save, ChevronDown, ChevronUp, Copy, Lock, Unlock, Building2 } from 'lucide-react';
import { clsx } from 'clsx';

// === University Hierarchy ===
const UNIVERSITIES = {
  'melimaharat': {
    name: 'دانشگاه ملی مهارت',
    units: {
      'markazi': {
        name: 'واحد استان مرکزی',
        faculties: [
          { id:'amirkabir', name:'دانشکده پسران امیرکبیر' },
          { id:'ataher', name:'دانشکده دختران اطهر' },
          { id:'saveh', name:'دانشکده پسران ساوه' },
          { id:'khomein', name:'دانشکده پسران خمین' },
          { id:'ashtian', name:'دانشکده دختران آشتیان' },
        ]
      }
    }
  }
};

// === User Groups with pricing ===
const USER_GROUPS = [
  { id:'student', name:'دانشجو', color:'blue' },
  { id:'professor', name:'استاد', color:'amber' },
  { id:'staff', name:'کارمند', color:'green' },
  { id:'guest', name:'مهمان', color:'gray' },
];

// === Demo Data ===
const DEMO_MEALS = [
  { id:'1', name:'ناهار', start:'11:00', end:'14:00' },
  { id:'2', name:'شام', start:'17:00', end:'22:00' },
  { id:'3', name:'سحری', start:'02:00', end:'05:00' },
];

const DEMO_FOODS = [
  { id:'f1', name:'چلو کباب', category:'گوشتی' },
  { id:'f2', name:'زرشک پلو با مرغ', category:'مرغ' },
  { id:'f3', name:'قورمه سبزی', category:'سبزیجات' },
  { id:'f4', name:'چلو مرغ بریان', category:'مرغ' },
  { id:'f5', name:'باقلو پلو با گوشت', category:'گوشتی' },
  { id:'f6', name:'رشته پلو', category:'گوشتی' },
  { id:'f7', name:'چلو ماهی', category:'دریایی' },
  { id:'f8', name:'آش رشته', category:'آش' },
  { id:'f9', name:'خورشت قیمه بادمجان', category:'خورشت' },
  { id:'f10', name:'چلو کتلت', category:'گوشتی' },
];

const DEMO_PLACES = [
  { id:'p1', name:'سلف مرکزی', faculty:'amirkabir' },
  { id:'p2', name:'سلف خوابگاه ۱', faculty:'amirkabir' },
  { id:'p3', name:'سلف خوابگاه ۲', faculty:'amirkabir' },
  { id:'p4', name:'سلف دختران', faculty:'ataher' },
  { id:'p5', name:'سلف مرکزی ساوه', faculty:'saveh' },
];

// Prices per group per food (Rials)
const PRICE_MATRIX: Record<string, Record<string, number>> = {
  student: { f1:45000, f2:38000, f3:42000, f4:35000, f5:48000, f6:40000, f7:55000, f8:30000, f9:40000, f10:36000 },
  professor: { f1:55000, f2:48000, f3:52000, f4:45000, f5:58000, f6:50000, f7:65000, f8:40000, f9:50000, f10:46000 },
  staff: { f1:50000, f2:43000, f3:47000, f4:40000, f5:53000, f6:45000, f7:60000, f8:35000, f9:45000, f10:41000 },
  guest: { f1:60000, f2:53000, f3:57000, f4:50000, f5:63000, f6:55000, f7:70000, f8:45000, f9:55000, f10:51000 },
};

const DAYS = ['شنبه','یکشنبه','دوشنبه','سه‌شنبه','چهارشنبه','پنجشنبه','جمعه'];

const tabs = [
  { id:'schedule', label:'برنامه هفتگی' },
  { id:'foods', label:'غذاها' },
  { id:'meals', label:'وعده‌ها' },
  { id:'places', label:'محل‌ها' },
  { id:'prices', label:'قیمت‌گذاری' },
  { id:'groups', label:'گروه‌های کاربری' },
];

// Schedule slot type
interface ScheduleSlot {
  dow: number; mealId: string; foodId: string; placeId: string; locked: boolean;
  prices: Record<string, number>; // groupId -> price
}

export default function FoodManagePage() {
  const [activeTab, setActiveTab] = useState('schedule');
  const [selectedUni, setSelectedUni] = useState('melimaharat');
  const [selectedUnit, setSelectedUnit] = useState('markazi');
  const [selectedFaculty, setSelectedFaculty] = useState('amirkabir');
  const [schedule, setSchedule] = useState<ScheduleSlot[]>([
    { dow:0, mealId:'1', foodId:'f1', placeId:'p1', locked:false, prices:{ student:45000, professor:55000, staff:50000, guest:60000 }},
    { dow:0, mealId:'2', foodId:'f2', placeId:'p1', locked:false, prices:{ student:38000, professor:48000, staff:43000, guest:53000 }},
    { dow:1, mealId:'1', foodId:'f3', placeId:'p1', locked:false, prices:{ student:42000, professor:52000, staff:47000, guest:57000 }},
    { dow:1, mealId:'2', foodId:'f4', placeId:'p1', locked:false, prices:{ student:35000, professor:45000, staff:40000, guest:50000 }},
    { dow:2, mealId:'1', foodId:'f5', placeId:'p1', locked:false, prices:{ student:48000, professor:58000, staff:53000, guest:63000 }},
    { dow:3, mealId:'1', foodId:'f7', placeId:'p1', locked:false, prices:{ student:55000, professor:65000, staff:60000, guest:70000 }},
    { dow:4, mealId:'1', foodId:'f9', placeId:'p1', locked:false, prices:{ student:40000, professor:50000, staff:45000, guest:55000 }},
  ]);
  const [selectedDay, setSelectedDay] = useState(0);
  const [editingPrice, setEditingPrice] = useState<{slotIdx:number; group:string} | null>(null);
  const [newFood, setNewFood] = useState({name:'',category:''});
  const [newPlace, setNewPlace] = useState('');
  const [showAddFood, setShowAddFood] = useState(false);
  const [showAddPlace, setShowAddPlace] = useState(false);
  const [foods, setFoods] = useState(DEMO_FOODS);
  const [places, setPlaces] = useState(DEMO_PLACES);

  const currentFaculty = UNIVERSITIES[selectedUni]?.units[selectedUnit]?.faculties.find(f => f.id === selectedFaculty);
  const daySchedule = schedule.filter(s => s.dow === selectedDay);
  const facultyPlaces = places.filter(p => p.faculty === selectedFaculty);

  const addSlot = () => {
    setSchedule([...schedule, {
      dow: selectedDay, mealId:'1', foodId:'f1', placeId: facultyPlaces[0]?.id || 'p1',
      locked: false, prices: { student:45000, professor:55000, staff:50000, guest:60000 }
    }]);
  };

  const updateSlot = (idx: number, field: string, value: any) => {
    const globalIdx = schedule.indexOf(daySchedule[idx]);
    const updated = [...schedule];
    (updated[globalIdx] as any)[field] = value;
    setSchedule(updated);
  };

  const removeSlot = (idx: number) => {
    const globalIdx = schedule.indexOf(daySchedule[idx]);
    setSchedule(schedule.filter((_, i) => i !== globalIdx));
  };

  const toggleLock = (idx: number) => {
    const globalIdx = schedule.indexOf(daySchedule[idx]);
    const updated = [...schedule];
    updated[globalIdx].locked = !updated[globalIdx].locked;
    setSchedule(updated);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">مدیریت تغذیه</h2>

      {/* University Selector */}
      <div className="card bg-gradient-to-l from-amber-50 to-white">
        <div className="flex items-center gap-2 mb-3">
          <Building2 className="w-5 h-5 text-amber-600" />
          <span className="font-bold text-sm">انتخاب دانشگاه / واحد / دانشکده</span>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="text-xs text-gray-500">دانشگاه</label>
            <select className="input" value={selectedUni} onChange={e => setSelectedUni(e.target.value)}>
              {Object.entries(UNIVERSITIES).map(([k,v]) => <option key={k} value={k}>{v.name}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-500">واحد</label>
            <select className="input" value={selectedUnit} onChange={e => setSelectedUnit(e.target.value)}>
              {Object.entries(UNIVERSITIES[selectedUni]?.units || {}).map(([k,v]: any) => <option key={k} value={k}>{v.name}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-500">دانشکده</label>
            <select className="input" value={selectedFaculty} onChange={e => setSelectedFaculty(e.target.value)}>
              {UNIVERSITIES[selectedUni]?.units[selectedUnit]?.faculties.map((f: any) => <option key={f.id} value={f.id}>{f.name}</option>)}
            </select>
          </div>
        </div>
        <p className="text-xs text-amber-600 mt-2">در حال مدیریت: {currentFaculty?.name}</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {tabs.map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)} className={clsx('px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap', activeTab===t.id ? 'bg-brand-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200')}>
            {t.label}
          </button>
        ))}
      </div>

      {/* === TAB: Schedule === */}
      {activeTab === 'schedule' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex gap-1 bg-gray-100 p-1 rounded-lg">
              {DAYS.map((d,i) => (
                <button key={i} onClick={() => setSelectedDay(i)} className={clsx('px-3 py-1.5 rounded text-sm', selectedDay===i?'bg-white shadow text-brand-700':'text-gray-500')}>{d}</button>
              ))}
            </div>
            <button onClick={addSlot} className="btn-primary text-xs flex items-center gap-1"><Plus className="w-4 h-4" />افزودن وعده</button>
          </div>

          {daySchedule.length === 0 && (
            <div className="card text-center py-8 text-gray-400">برنامه‌ای برای این روز تعریف نشده</div>
          )}

          <div className="space-y-3">
            {daySchedule.map((slot, idx) => {
              const food = DEMO_FOODS.find(f => f.id === slot.foodId);
              const meal = DEMO_MEALS.find(m => m.id === slot.mealId);
              const place = places.find(p => p.id === slot.placeId);
              return (
                <div key={idx} className={clsx('card', slot.locked && 'opacity-60')}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-xs bg-brand-100 text-brand-700 px-2 py-1 rounded">{meal?.name}</span>
                      <span className="font-bold">{food?.name}</span>
                      <span className="text-xs text-gray-400">— {place?.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => toggleLock(idx)} className={clsx('text-gray-400', slot.locked?'text-red-400':'text-green-400')}>
                        {slot.locked ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                      </button>
                      <button onClick={() => removeSlot(idx)} className="text-gray-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>

                  {/* Edit row */}
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    <div>
                      <label className="text-xs text-gray-500">وعده</label>
                      <select className="input text-sm" value={slot.mealId} onChange={e => updateSlot(idx, 'mealId', e.target.value)}>
                        {DEMO_MEALS.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500">غذا</label>
                      <select className="input text-sm" value={slot.foodId} onChange={e => updateSlot(idx, 'foodId', e.target.value)}>
                        {foods.map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500">محل تحویل</label>
                      <select className="input text-sm" value={slot.placeId} onChange={e => updateSlot(idx, 'placeId', e.target.value)}>
                        {facultyPlaces.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                      </select>
                    </div>
                  </div>

                  {/* Price matrix */}
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500 mb-2">قیمت به ازای هر گروه (ریال)</p>
                    <div className="grid grid-cols-4 gap-2">
                      {USER_GROUPS.map(g => (
                        <div key={g.id} className="text-center">
                          <p className="text-xs text-gray-500">{g.name}</p>
                          {editingPrice?.slotIdx === idx && editingPrice?.group === g.id ? (
                            <input type="number" className="input text-center text-sm py-1" autoFocus
                              value={slot.prices[g.id] || ''}
                              onChange={e => {
                                const globalIdx = schedule.indexOf(slot);
                                const updated = [...schedule];
                                updated[globalIdx].prices = { ...updated[globalIdx].prices, [g.id]: parseInt(e.target.value) || 0 };
                                setSchedule(updated);
                              }}
                              onBlur={() => setEditingPrice(null)}
                              onKeyDown={e => e.key==='Enter' && setEditingPrice(null)}
                            />
                          ) : (
                            <button onClick={() => setEditingPrice({slotIdx: idx, group: g.id})}
                              className="text-sm font-bold hover:bg-white px-2 py-1 rounded cursor-pointer">
                              {(slot.prices[g.id] || 0).toLocaleString('fa-IR')}
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* === TAB: Foods === */}
      {activeTab === 'foods' && (
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="font-bold">لیست غذاها ({foods.length})</h3>
            <button onClick={() => setShowAddFood(!showAddFood)} className="btn-primary text-xs flex items-center gap-1"><Plus className="w-4 h-4" />افزودن</button>
          </div>
          {showAddFood && (
            <div className="card flex gap-3 items-end">
              <input className="input flex-1" placeholder="نام غذا" value={newFood.name} onChange={e => setNewFood({...newFood, name:e.target.value})} />
              <input className="input w-32" placeholder="دسته" value={newFood.category} onChange={e => setNewFood({...newFood, category:e.target.value})} />
              <button onClick={() => { if(newFood.name) { setFoods([...foods, {...newFood, id:'f'+Date.now()}]); setNewFood({name:'',category:''}); setShowAddFood(false); }}} className="btn-primary">ذخیره</button>
            </div>
          )}
          {foods.map(f => (
            <div key={f.id} className="card flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-400 w-8">{f.id}</span>
                <span className="font-medium">{f.name}</span>
                <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">{f.category}</span>
              </div>
              <button className="text-gray-400 hover:text-red-500" onClick={() => setFoods(foods.filter(x => x.id !== f.id))}><Trash2 className="w-4 h-4" /></button>
            </div>
          ))}
        </div>
      )}

      {/* === TAB: Meals === */}
      {activeTab === 'meals' && (
        <div className="space-y-3">
          <h3 className="font-bold">وعده‌های غذایی</h3>
          {DEMO_MEALS.map(m => (
            <div key={m.id} className="card flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="font-medium">{m.name}</span>
                <span className="text-sm text-gray-400">{m.start} — {m.end}</span>
              </div>
              <button className="text-gray-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
            </div>
          ))}
        </div>
      )}

      {/* === TAB: Places === */}
      {activeTab === 'places' && (
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="font-bold">محل‌های تحویل — {currentFaculty?.name}</h3>
            <button onClick={() => setShowAddPlace(!showAddPlace)} className="btn-primary text-xs flex items-center gap-1"><Plus className="w-4 h-4" />افزودن</button>
          </div>
          {showAddPlace && (
            <div className="card flex gap-3 items-end">
              <input className="input flex-1" placeholder="نام محل تحویل" value={newPlace} onChange={e => setNewPlace(e.target.value)} />
              <button onClick={() => { if(newPlace) { setPlaces([...places, {id:'p'+Date.now(), name:newPlace, faculty:selectedFaculty}]); setNewPlace(''); setShowAddPlace(false); }}} className="btn-primary">ذخیره</button>
            </div>
          )}
          {facultyPlaces.map(p => (
            <div key={p.id} className="card flex items-center justify-between">
              <span className="font-medium">{p.name}</span>
              <button className="text-gray-400 hover:text-red-500" onClick={() => setPlaces(places.filter(x => x.id !== p.id))}><Trash2 className="w-4 h-4" /></button>
            </div>
          ))}
        </div>
      )}

      {/* === TAB: Prices === */}
      {activeTab === 'prices' && (
        <div className="space-y-4">
          <h3 className="font-bold">جدول قیمت‌گذاری — همه غذاها</h3>
          <div className="card overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="py-2 text-right">غذا</th>
                  {USER_GROUPS.map(g => <th key={g.id} className="py-2 text-center">{g.name}</th>)}
                </tr>
              </thead>
              <tbody>
                {foods.map(f => (
                  <tr key={f.id} className="border-b hover:bg-gray-50">
                    <td className="py-2 font-medium">{f.name}</td>
                    {USER_GROUPS.map(g => (
                      <td key={g.id} className="text-center">
                        <input type="number" className="w-20 text-center text-sm border rounded px-1 py-0.5"
                          value={PRICE_MATRIX[g.id]?.[f.id] || 0}
                          onChange={e => {
                            PRICE_MATRIX[g.id] = { ...PRICE_MATRIX[g.id], [f.id]: parseInt(e.target.value) || 0 };
                          }}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* === TAB: Groups === */}
      {activeTab === 'groups' && (
        <div className="space-y-3">
          <h3 className="font-bold">گروه‌های کاربری</h3>
          {USER_GROUPS.map(g => (
            <div key={g.id} className="card flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full bg-${g.color}-500`} />
                <span className="font-medium">{g.name}</span>
                <span className="text-xs text-gray-400">({g.id})</span>
              </div>
              <span className="text-xs text-gray-400">قیمت‌گذاری متفاوت</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
