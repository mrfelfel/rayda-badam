'use client';
import { useState } from 'react';
import { Plus, Trash2, UserCheck, UserX, Search } from 'lucide-react';

const DEMO_USERS = [
  { uid:'4311370891', name:'محمد', family:'فلفلی', admin:true, ns:'fani.markazi.amirkabir' },
  { uid:'1234567890', name:'علی', family:'احمدی', admin:false, ns:'fani.markazi.amirkabir' },
  { uid:'9876543210', name:'سارا', family:'رضایی', admin:false, ns:'fani.markazi.amirkabir' },
  { uid:'5555555555', name:'رضا', family:'کریمی', admin:false, ns:'fani.markazi.amirkabir' },
];

export default function UserManagePage() {
  const [users] = useState(DEMO_USERS);
  const [search, setSearch] = useState('');
  const [showNew, setShowNew] = useState(false);
  const [newUser, setNewUser] = useState({uid:'',password:'',repeat:''});
  const filtered = users.filter(u => u.uid.includes(search) || u.name.includes(search) || u.family.includes(search));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">مدیریت کاربران</h2>
        <button onClick={() => setShowNew(!showNew)} className="btn-primary text-xs flex items-center gap-1"><Plus className="w-4 h-4" />کاربر جدید</button>
      </div>
      {showNew && (
        <div className="card space-y-3">
          <h3 className="font-bold text-sm">کاربر جدید</h3>
          <input className="input" placeholder="کد ملی (نام کاربری)" value={newUser.uid} onChange={e => setNewUser({...newUser, uid:e.target.value})} />
          <input type="password" className="input" placeholder="رمز عبور" value={newUser.password} onChange={e => setNewUser({...newUser, password:e.target.value})} />
          <input type="password" className="input" placeholder="تکرار رمز عبور" value={newUser.repeat} onChange={e => setNewUser({...newUser, repeat:e.target.value})} />
          <div className="flex gap-2">
            <button onClick={() => setShowNew(false)} className="btn-outline">انصراف</button>
            <button className="btn-primary">ثبت نام</button>
          </div>
        </div>
      )}
      <div className="relative">
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input className="input pr-10" placeholder="جستجو..." value={search} onChange={e => setSearch(e.target.value)} />
      </div>
      <div className="space-y-2">
        {filtered.map(u => (
          <div key={u.uid} className="card flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${u.admin?'bg-amber-100':'bg-gray-100'}`}>
                {u.admin ? <UserCheck className="w-5 h-5 text-amber-600" /> : <UserX className="w-5 h-5 text-gray-400" />}
              </div>
              <div>
                <p className="font-medium">{u.name} {u.family}</p>
                <p className="text-xs text-gray-400">{u.uid} — {u.ns}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {u.admin && <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded">مدیر</span>}
              <button className="text-gray-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
