'use client';

const DAYS = ['شنبه','یکشنبه','دوشنبه','سه‌شنبه','چهارشنبه','پنجشنبه','جمعه'];
const DATA = [
  { day:'شنبه', nahar:45, sham:30 }, { day:'یکشنبه', nahar:52, sham:28 },
  { day:'دوشنبه', nahar:38, sham:35 }, { day:'سه‌شنبه', nahar:60, sham:42 },
  { day:'چهارشنبه', nahar:48, sham:25 }, { day:'پنجشنبه', nahar:30, sham:15 },
  { day:'جمعه', nahar:0, sham:0 },
];
const max = Math.max(...DATA.map(d => Math.max(d.nahar, d.sham)));

export default function ChartsPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">آمار و نمودار</h2>
      <div className="card">
        <h3 className="font-bold mb-4">تعداد رزرو در هفته جاری</h3>
        <div className="space-y-3">
          {DATA.map((d, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="w-20 text-sm text-gray-600">{d.day}</span>
              <div className="flex-1 flex gap-1">
                <div className="h-6 bg-brand-500 rounded-r" style={{width: `${(d.nahar/max)*100}%`}}><span className="text-xs text-white pr-1">{d.nahar}</span></div>
                <div className="h-6 bg-blue-400 rounded-r" style={{width: `${(d.sham/max)*100}%`}}><span className="text-xs text-white pr-1">{d.sham}</span></div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-4 mt-4 text-xs text-gray-500">
          <div className="flex items-center gap-1"><div className="w-3 h-3 bg-brand-500 rounded" />ناهار</div>
          <div className="flex items-center gap-1"><div className="w-3 h-3 bg-blue-400 rounded" />شام</div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="card text-center"><p className="text-3xl font-bold text-brand-600">۳۲۴</p><p className="text-sm text-gray-500">کل رزروها</p></div>
        <div className="card text-center"><p className="text-3xl font-bold text-blue-600">۲۸۹</p><p className="text-sm text-gray-500">تحویل شده</p></div>
      </div>
    </div>
  );
}
