'use client';
import { ShoppingCart } from 'lucide-react';
export default function MarketPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">بازار غذا</h2>
      <div className="card text-center py-12">
        <ShoppingCart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
        <p className="text-gray-500">بازار غذا فعال نیست</p>
        <p className="text-xs text-gray-400 mt-1">در این بخش می‌توانید غذای رزرو شده خود را به دیگران بفروشید</p>
      </div>
    </div>
  );
}
