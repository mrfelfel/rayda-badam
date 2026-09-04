'use client';
import { useState } from 'react';
import { useAuth } from '@/lib/auth';
import { Lock, User, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) { setError('کد ملی و رمز را وارد کنید'); return; }
    setLoading(true); setError('');
    try {
      const res = await fetch('/api/login', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({username, password}) });
      const data = await res.json();
      if (data.status) { login(data.token, username); } else { setError(data.message || 'نام کاربری یا رمز اشتباه است'); setPassword(''); }
    } catch { setError('خطا در اتصال به سرور'); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Top pink section */}
      <div className="bg-gradient-to-b from-pink-500 to-pink-400 px-6 pt-16 pb-20 text-center">
        <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-pink-300">
          <span className="text-4xl">🍽️</span>
        </div>
        <h1 className="text-2xl font-bold text-white">اتوماسیون تغذیه صورتی</h1>
        <p className="text-sm text-white/80 mt-2">موسسه غیرتجاری شبکه صورتی</p>
      </div>

      {/* Form card */}
      <div className="px-6 -mt-10 flex-1">
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl p-6 space-y-4">
          {error && <p className="text-sm text-red-500 bg-red-50 p-3 rounded-xl text-center">{error}</p>}

          <div className="relative">
            <User className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} className="input pr-12 text-center text-lg tracking-widest" placeholder="کد ملی" autoComplete="username" />
          </div>

          <div className="relative">
            <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
            <input type={showPass?'text':'password'} value={password} onChange={e => setPassword(e.target.value)} className="input pr-12 pl-12" placeholder="رمز عبور" autoComplete="current-password" />
            <button type="button" onClick={() => setShowPass(!showPass)} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300">
              {showPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          <button type="submit" disabled={loading} className="btn-primary w-full py-4 text-base rounded-2xl">
            {loading ? <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto" /> : 'ورود'}
          </button>

          <button type="button" className="btn-ghost w-full text-sm">رمز عبور را فراموش کرده‌ام</button>
        </form>

        <p className="text-center text-[10px] text-gray-300 mt-8 pb-8">
          تمامی حقوق متعلق به موسسه غیرتجاری شبکه صورتی است
        </p>
      </div>
    </div>
  );
}
