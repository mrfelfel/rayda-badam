'use client';
import { useState, useEffect } from 'react';
import { MapPin, ChevronDown, Zap, Clock, Star, Wallet, ChevronLeft, Calendar, Shield, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth';

const DAYS = ['شنبه','یکشنبه','دوشنبه','سه‌شنبه','چهارشنبه','پنجشنبه','جمعه'];

// Today's meals (what's available RIGHT NOW for today)
const TODAY_FOODS = [
  { name:'چلو کباب', meal:'ناهار', price:45000, place:'سلف مرکزی', remain:3 },
  { name:'زرشک پلو با مرغ', meal:'شام', price:38000, place:'سلف مرکزی', remain:8 },
  { name:'قورمه سبزی', meal:'ناهار', price:42000, place:'خوابگاه ۱', remain:1 },
];

export default function HomePage() {
  const { uid } = useAuth();
  const now = new Date();
  const hour = now.getHours();
  const currentMeal = hour >= 11 && hour <= 14 ? 'ناهار' : hour >= 17 && hour <= 22 ? 'شام' : hour >= 2 && hour <= 5 ? 'سحری' : null;

  return (
    <div className="page-container">
      {/* Location */}
      <div className="flex items-center gap-2 text-gray-500">
        <MapPin className="w-4 h-4 text-pink-500" />
        <span className="text-sm">دانشکده پسران امیرکبیر</span>
        <ChevronDown className="w-4 h-4" />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        <Link href="/foods" className="card bg-gradient-to-br from-pink-500 to-pink-400 text-white flex items-center gap-3 active:scale-95 transition-transform">
          <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <p className="font-bold">رزرو غذا</p>
            <p className="text-xs text-white/80">برنامه هفتگی</p>
          </div>
        </Link>
        <Link href="/wallet" className="card bg-gradient-to-br from-amber-500 to-amber-400 text-white flex items-center gap-3 active:scale-95 transition-transform">
          <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
            <Wallet className="w-6 h-6" />
          </div>
          <div>
            <p className="font-bold">کیف پول</p>
            <p className="text-xs text-white/80">۵۰۰,۰۰۰ تومان</p>
          </div>
        </Link>
      </div>

      {/* Current Meal Status */}
      {currentMeal && (
        <div className="card border-pink-200 bg-pink-50/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-pink-600 font-medium">وعده فعلی</p>
              <p className="font-bold text-lg">{currentMeal}</p>
            </div>
            <span className="badge-pink">{hour}:{String(now.getMinutes()).padStart(2,'0')}</span>
          </div>
        </div>
      )}

      {/* Food Party - Today's extra foods */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-500" />
            <h2 className="section-title">غذاهای اضافه امروز</h2>
          </div>
          <span className="badge-amber">فقط امروز</span>
        </div>
        <p className="text-xs text-gray-400 -mt-2">غذاهایی که امروز قابل رزرو هستند ولی هنوز جا دارند</p>

        {TODAY_FOODS.filter(f => !currentMeal || f.meal === currentMeal).map((food, i) => (
          <Link key={i} href="/foods" className="card flex items-center justify-between active:bg-gray-50">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-pink-50 rounded-2xl flex items-center justify-center text-xl">
                {food.meal === 'ناهار' ? '🍱' : food.meal === 'شام' ? '🌙' : '☀️'}
              </div>
              <div>
                <h3 className="font-bold text-sm">{food.name}</h3>
                <p className="text-xs text-gray-400">{food.place} — {food.meal}</p>
              </div>
            </div>
            <div className="text-left">
              <p className="font-bold text-pink-600 text-sm">{food.price.toLocaleString('fa-IR')} تومان</p>
              <p className="text-[10px] text-emerald-500">{food.remain} عدد باقیمانده</p>
            </div>
          </Link>
        ))}
      </div>

      {/* This week summary */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="section-title">خلاصه این هفته</h2>
          <Link href="/foods" className="text-pink-600 text-sm font-medium flex items-center gap-1">مشاهده <ArrowLeft className="w-4 h-4" /></Link>
        </div>
        <div className="grid grid-cols-7 gap-1">
          {DAYS.map((d, i) => {
            const isToday = (now.getDay() === 0 ? 6 : now.getDay() - 1) === i;
            const hasReservation = i < 5;
            return (
              <div key={i} className={`text-center py-2 rounded-xl text-xs ${isToday ? 'bg-pink-500 text-white font-bold' : hasReservation ? 'bg-pink-50 text-pink-700' : 'bg-gray-50 text-gray-400'}`}>
                <p className="text-[9px]">{d.slice(0,3)}</p>
                <p className="font-bold mt-0.5">{i + 7}</p>
                {hasReservation && !isToday && <div className="w-1 h-1 bg-pink-400 rounded-full mx-auto mt-1" />}
              </div>
            );
          })}
        </div>
      </div>

      {/* Admin Panel Link */}
      <Link href="/panel/food-manage" className="card flex items-center gap-3 border-amber-200 bg-amber-50/50 active:bg-amber-50">
        <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
          <Shield className="w-5 h-5 text-amber-600" />
        </div>
        <div>
          <p className="font-bold text-sm">پنل مدیریت</p>
          <p className="text-xs text-gray-400">برنامه‌ریزی غذا، مدیریت کاربران و گزارشات</p>
        </div>
        <ChevronLeft className="w-4 h-4 text-gray-300 mr-auto" />
      </Link>
    </div>
  );
}
