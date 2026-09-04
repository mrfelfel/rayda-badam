# اتوماسیون تغذیه صورتی
# Surati Food Automation

سیستم مدیریت و رزرو غذا برای دانشگاه‌ها و سازمان‌ها.

University Cafeteria Automation Platform.

---

## مجوز / License

این نرم‌افزار تحت **لایسنس متن‌باز شبکه صورتی (SNOSL) v1.0** منتشر شده است.

This software is released under the **Surati Network Open Source License (SNOSL) v1.0**.

**استفاده غیرتجاری:** آزاد (با رعایت الزامات انتساب)
**Commercial Use:** نیاز به لایسنس تجاری دارد

لایسنس کامل: [LICENSE](LICENSE) (English) | [LICENSE-FA.txt](LICENSE-FA.txt) (فارسی)

برای دریافت لایسنس تجاری: network@surati.ir

---

## شروع سریع / Quick Start

```bash
git clone https://github.com/mrfelfel/rayda-badam.git
cd rayda-badam
pnpm install
cd apps/web && pnpm dev
```

SQLite به صورت خودکار ایجاد می‌شود — نیازی به سرور دیتابیس نیست.

---

## معماری / Architecture

```
apps/web/                  Next.js 14 + Tailwind CSS + Socket.IO
packages/server/           Go WebSocket Server (Rayconnect Core)
packages/shared/           Drizzle ORM + Types + Utilities
```

- **SQLite** برای محیط توسعه (بدون نیاز به نصب)
- **PostgreSQL** برای محیط production

---

## ویژگی‌ها / Features

- رزرو و لغو غذا هفتگی (تقویم جلالی)
- برنامه‌ریزی غذایی با سلسله مراتب دانشگاه
- قیمت‌گذاری متغیر به ازای گروه‌های کاربری (دانشجو، استاد، کارمند، مهمان)
- سیستم پرداخت بانکی (سداد)
- ردیابی تحویل غذا با اسکن کارت
- کیف پول و انتقال اعتبار
- پنل مدیریت (غذا، کاربران، گزارشات، نمودار)
- پشتیبانی از چند دانشگاه و چند دانشکده

---

## تاریخچه / History

پروژه از سال ۱۳۹۶ (۲۰۱۷) به عنوان سرور WebSocket با زبان Go شروع شد.
از طریق میکروسرویس‌های Node.js و فرانت‌اند Angular، به استک فعلی
React/Next.js ارتقا یافت.

موسسه غیرتجاری شبکه صورتی از سال ۱۴۰۵ (۲۰۲۶) مسئولیت نگهداری و
توسعه این پروژه را بر عهده گرفته است.

---

## درباره موسسه غیرتجاری شبکه صورتی

شبکه صورتی یک موسسه غیرتجاری انتفاعی با مدل اجتماعی است که اهداف
زیر را دنبال می‌کند:

- حمایت از کارآفرینی و توسعه اقتصاد دانش‌بنیان
- حمایت از آزادی نرم‌افزار به عنوان کد
- کمک به سازمان‌های غیردولتی (NGO) مختلف
- شفافیت مالی و انتشار صورت‌های مالی

تمام درآمد حاصل از لایسنس‌های تجاری صرف موارد زیر می‌شود:

- هزینه‌های هوش مصنوعی و توسعه‌دهندگان AI
- حقوق برنامه‌نویسان انسانی
- تحقیق و توسعه (R&D)
- حمایت از آزادی نرم‌افزار

---

Copyright (c) 2017-2026 Pink Network Non-Commercial Institute
موسسه غیرتجاری شبکه صورتی
All rights reserved.
