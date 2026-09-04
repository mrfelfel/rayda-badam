'use client';
import { useState } from 'react';
import { useAuth } from '@/lib/auth';
import { Lock, User, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) { setError('نام کاربری و رمز عبور را وارد کنید'); return; }
    setLoading(true); setError('');
    try {
      const API = process.env.NEXT_PUBLIC_API_URL || 'https://users.rayda.ir';
      const res = await fetch(`${API}/login`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (data.status) { login(data.token, username); }
      else { setError('نام کاربری یا کلمه عبور صحیح نیست'); setPassword(''); }
    } catch { setError('خطا در برقراری ارتباط با سرور'); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-50 to-white">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-brand-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-brand-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">ورود به سامانه</h1>
          <p className="text-sm text-gray-500 mt-2">اتوماسیون تغذیه بادام</p>
        </div>
        <form onSubmit={handleSubmit} className="card space-y-4">
          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
              <AlertCircle className="w-4 h-4 shrink-0" />{error}
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">نام کاربری</label>
            <div className="relative">
              <User className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" value={username} onChange={e => setUsername(e.target.value)} className="input pr-10" placeholder="کد ملی" autoComplete="username" />
            </div>
            <p className="text-xs text-gray-400 mt-1">نام کاربری معمولا برابر کد ملی است</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">گذرواژه</label>
            <div className="relative">
              <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="input pr-10" placeholder="گذرواژه" autoComplete="current-password" />
            </div>
            <p className="text-xs text-gray-400 mt-1">هنگام ثبت نام توسط خودتان انتخاب شده است</p>
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2">
            {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : 'ورود'}
          </button>
        </form>
        <p className="text-center text-xs text-gray-400 mt-6">کلیه حقوق برای عصر ارتباطات دهکده محفوظ است</p>
      </div>
    </div>
  );
}
