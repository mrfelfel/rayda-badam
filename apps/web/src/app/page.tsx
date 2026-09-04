'use client';
import { useState } from 'react';
import { Search, MapPin, ChevronDown, ShoppingCart, Zap, Clock, Star, TrendingUp, Wallet } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth';

const CATEGORIES = [
  { icon:'🍱', label:'غذای ایرانی', color:'bg-orange-50' },
  { icon:'🥘', label:'خورشت', color:'bg-green-50' },
  { icon:'🥩', label:'کباب', color:'bg-red-50' },
  { icon:'🍕', label:'فست‌فود', color:'bg-yellow-50' },
  { icon:'🥗', label:'سالاد', color:'bg-emerald-50' },
  { icon:'🍰', label:'شیرینی', color:'bg-pink-50' },
  { icon:'☕', label:'نوشیدنی', color:'bg-amber-50' },
  { icon:'🍞', label:'نانوایی', color:'bg-orange-50' },
];

const POPULAR_FOODS = [
  { id:1, name:'چلو کباب سلطانی', restaurant:'سلف مرکزی', price:45000, discount:10, time:'25 دقیقه', rating:4.5, img:'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop' },
  { id:2, name:'زرشک پلو با مرغ', restaurant:'سلف مرکزی', price:38000, discount:0, time:'20 دقیقه', rating:4.2, img:'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=300&fit=crop' },
  { id:3, name:'قورمه سبزی با برنج', restaurant:'سلف خوابگاه', price:42000, discount:5, time:'30 دقیقه', rating:4.0, img:'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop' },
  { id:4, name:'باقلو پلو با گوشت', restaurant:'سلف فنی', price:48000, discount:0, time:'35 دقیقه', rating:4.7, img:'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=300&fit=crop' },
];

export default function HomePage() {
  const { uid } = useAuth();
  const [search, setSearch] = useState('');

  return (
    <div className="page-container">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-400 flex items-center gap-1"><MapPin className="w-3 h-3" /> محل تحویل</p>
          <button className="flex items-center gap-1 font-bold text-sm">
            دانشکده امیرکبیر <ChevronDown className="w-4 h-4 text-pink-500" />
          </button>
        </div>
        <Link href="/wallet" className="relative">
          <div className="w-10 h-10 bg-pink-50 rounded-full flex items-center justify-center">
            <ShoppingCart className="w-5 h-5 text-pink-600" />
          </div>
        </Link>
      </div>

      {/* Search */}
      <div className="search-bar">
        <Search className="w-5 h-5" />
        <input type="text" placeholder="جستجو در اتوماسیون تغذیه صورتی!" className="bg-transparent flex-1 outline-none text-gray-700" value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      {/* Categories */}
      <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
        {CATEGORIES.map((cat, i) => (
          <div key={i} className="category-chip">
            <span className="text-3xl">{cat.icon}</span>
            <span className="text-[11px] font-medium text-gray-600 whitespace-nowrap">{cat.label}</span>
          </div>
        ))}
      </div>

      {/* Wallet Banner */}
      <Link href="/wallet" className="card bg-gradient-to-l from-pink-500 to-pink-400 text-white flex items-center justify-between">
        <div>
          <p className="text-sm opacity-90">کیف پول صورتی</p>
          <p className="text-2xl font-bold mt-1">۵۰۰,۰۰۰ <span className="text-sm font-normal">تومان</span></p>
        </div>
        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
          <Wallet className="w-6 h-6" />
        </div>
      </Link>

      {/* Flash Sale / Food Party */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-500" />
            <h2 className="section-title">فودپارتی</h2>
          </div>
          <span className="badge-amber flex items-center gap-1"><Clock className="w-3 h-3" /> تا پایان ۰۲:۳۵</span>
        </div>
        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
          {POPULAR_FOODS.filter(f => f.discount > 0).map(food => (
            <Link key={food.id} href="/foods" className="food-card min-w-[260px] flex-shrink-0">
              <div className="relative h-36 bg-gray-100">
                <img src={food.img} alt={food.name} className="w-full h-full object-cover" />
                <span className="absolute top-3 right-3 badge-red">{food.discount}%</span>
              </div>
              <div className="p-3">
                <h3 className="font-bold text-sm">{food.name}</h3>
                <p className="text-xs text-gray-400 mt-1">{food.restaurant}</p>
                <div className="flex items-center justify-between mt-2">
                  <div>
                    {food.discount > 0 && <span className="text-xs text-gray-400 line-through ml-1">{food.price.toLocaleString('fa-IR')}</span>}
                    <span className="font-bold text-pink-600">{((food.price * (100 - food.discount)) / 100).toLocaleString('fa-IR')} تومان</span>
                  </div>
                  <span className="badge-green">{food.time}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Popular foods */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="section-title">محبوب‌ترین‌ها</h2>
          <button className="text-pink-600 text-sm font-medium">مشاهده همه</button>
        </div>
        <div className="space-y-3">
          {POPULAR_FOODS.map(food => (
            <Link key={food.id} href="/foods" className="food-card flex">
              <div className="w-28 h-28 bg-gray-100 flex-shrink-0">
                <img src={food.img} alt={food.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 p-3 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-sm">{food.name}</h3>
                  <p className="text-xs text-gray-400">{food.restaurant}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                    <span className="text-xs text-gray-500">{food.rating}</span>
                    <span className="text-xs text-gray-300">•</span>
                    <span className="text-xs text-gray-400">{food.time}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  {food.discount > 0 ? (
                    <div>
                      <span className="text-xs text-gray-400 line-through">{food.price.toLocaleString('fa-IR')}</span>
                      <span className="font-bold text-pink-600 mr-2">{((food.price * (100 - food.discount)) / 100).toLocaleString('fa-IR')} تومان</span>
                      <span className="badge-red mr-1">{food.discount}%</span>
                    </div>
                  ) : (
                    <span className="font-bold text-pink-600">{food.price.toLocaleString('fa-IR')} تومان</span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
