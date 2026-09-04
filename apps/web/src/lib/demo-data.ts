// === University Hierarchy ===
export const UNIVERSITIES: Record<string, any> = {
  melimaharat: {
    name: 'دانشگاه ملی مهارت',
    units: {
      markazi: {
        name: 'واحد استان مرکزی',
        faculties: [
          { id: 'amirkabir', name: 'دانشکده پسران امیرکبیر' },
          { id: 'ataher', name: 'دانشکده دختران اطهر' },
          { id: 'saveh', name: 'دانشکده پسران ساوه' },
          { id: 'khomein', name: 'دانشکده پسران خمین' },
          { id: 'ashtian', name: 'دانشکده دختران آشتیان' },
        ],
      },
    },
  },
};

// === User Groups (food pricing tiers) ===
export const USER_GROUPS = [
  { id: 'student', name: 'دانشجو', color: 'primary' as const },
  { id: 'professor', name: 'استاد', color: 'warning' as const },
  { id: 'staff', name: 'کارمند', color: 'success' as const },
  { id: 'guest', name: 'مهمان', color: 'default' as const },
];

// === Access Roles (admin permissions) ===
export const ACCESS_ROLES = [
  { id: 'super_admin', name: 'مدیر اصلی', permissions: ['*'] },
  { id: 'food_manager', name: 'مدیر تغذیه', permissions: ['foods:*', 'schedule:*', 'places:*'] },
  { id: 'delivery_manager', name: 'مدیر تحویل', permissions: ['deliver:*', 'cards:*'] },
  { id: 'cashier', name: 'صندوقدار', permissions: ['reports:financial', 'wallet:*'] },
  { id: 'viewer', name: 'مشاهده‌گر', permissions: ['reports:view'] },
];

// === Users ===
export const DEMO_USERS = [
  { uid: '4311370891', name: 'محمد', family: 'فلفلی', group: 'professor', role: 'super_admin', faculty: 'amirkabir', balance: 1200000, phone: '09121234567' },
  { uid: '1234567890', name: 'علی', family: 'احمدی', group: 'student', role: 'viewer', faculty: 'amirkabir', balance: 500000, phone: '09351234567' },
  { uid: '9876543210', name: 'سارا', family: 'رضایی', group: 'student', role: 'viewer', faculty: 'ataher', balance: 350000, phone: '09191234567' },
  { uid: '5555555555', name: 'رضا', family: 'کریمی', group: 'staff', role: 'delivery_manager', faculty: 'amirkabir', balance: 800000, phone: '09181234567' },
  { uid: '1111111111', name: 'مریم', family: 'هاشمی', group: 'student', role: 'viewer', faculty: 'saveh', balance: 200000, phone: '09211234567' },
  { uid: '2222222222', name: 'امیر', family: 'نوری', group: 'professor', role: 'food_manager', faculty: 'amirkabir', balance: 950000, phone: '09129876543' },
  { uid: '3333333333', name: 'زهرا', family: 'محسنی', group: 'student', role: 'viewer', faculty: 'khomein', balance: 150000, phone: '09361234567' },
  { uid: '4444444444', name: 'حسن', family: '.Unity', group: 'guest', role: 'viewer', faculty: 'amirkabir', balance: 0, phone: '' },
];

// === Foods ===
export const DEMO_FOODS = [
  { id: 'f1', name: 'چلو کباب', category: 'گوشتی' },
  { id: 'f2', name: 'زرشک پلو با مرغ', category: 'مرغ' },
  { id: 'f3', name: 'قورمه سبزی', category: 'سبزیجات' },
  { id: 'f4', name: 'چلو مرغ بریان', category: 'مرغ' },
  { id: 'f5', name: 'باقلو پلو با گوشت', category: 'گوشتی' },
  { id: 'f6', name: 'رشته پلو', category: 'گوشتی' },
  { id: 'f7', name: 'چلو ماهی', category: 'دریایی' },
  { id: 'f8', name: 'آش رشته', category: 'آش' },
  { id: 'f9', name: 'خورشت قیمه بادمجان', category: 'خورشت' },
  { id: 'f10', name: 'چلو کتلت', category: 'گوشتی' },
];

// === Meals ===
export const DEMO_MEALS = [
  { id: '1', name: 'ناهار', start: '11:00', end: '14:00', icon: '🍱' },
  { id: '2', name: 'شام', start: '17:00', end: '22:00', icon: '🌙' },
  { id: '3', name: 'سحری', start: '02:00', end: '05:00', icon: '☀️' },
];

// === Delivery Places ===
export const DEMO_PLACES = [
  { id: 'p1', name: 'سلف مرکزی', faculty: 'amirkabir', allowedGroups: ['student', 'professor', 'staff', 'guest'] },
  { id: 'p2', name: 'سلف خوابگاه ۱', faculty: 'amirkabir', allowedGroups: ['student'] },
  { id: 'p3', name: 'سلف خوابگاه ۲', faculty: 'amirkabir', allowedGroups: ['student'] },
  { id: 'p4', name: 'سلف دختران', faculty: 'ataher', allowedGroups: ['student', 'professor', 'staff'] },
  { id: 'p5', name: 'سلف مرکزی ساوه', faculty: 'saveh', allowedGroups: ['student', 'professor', 'staff', 'guest'] },
  { id: 'p6', name: 'سلف خمین', faculty: 'khomein', allowedGroups: ['student'] },
];

// === Price Matrix: groupId → foodId → placeId → price ===
export const PRICE_MATRIX: Record<string, Record<string, Record<string, number>>> = {
  student: {
    f1: { p1: 45000, p2: 40000, p3: 40000, p5: 43000 },
    f2: { p1: 38000, p2: 35000, p3: 35000, p5: 36000 },
    f3: { p1: 42000, p2: 38000, p3: 38000, p5: 40000 },
    f4: { p1: 35000, p2: 32000, p3: 32000, p5: 33000 },
    f5: { p1: 48000, p2: 44000, p3: 44000, p5: 46000 },
    f6: { p1: 40000, p2: 37000, p3: 37000, p5: 38000 },
    f7: { p1: 55000, p2: 50000, p3: 50000, p5: 52000 },
    f8: { p1: 30000, p2: 27000, p3: 27000, p5: 28000 },
    f9: { p1: 40000, p2: 37000, p3: 37000, p5: 38000 },
    f10: { p1: 36000, p2: 33000, p3: 33000, p5: 34000 },
  },
  professor: {
    f1: { p1: 55000 }, f2: { p1: 48000 }, f3: { p1: 52000 }, f4: { p1: 45000 },
    f5: { p1: 58000 }, f6: { p1: 50000 }, f7: { p1: 65000 }, f8: { p1: 40000 },
    f9: { p1: 50000 }, f10: { p1: 46000 },
  },
  staff: {
    f1: { p1: 50000 }, f2: { p1: 43000 }, f3: { p1: 47000 }, f4: { p1: 40000 },
    f5: { p1: 53000 }, f6: { p1: 45000 }, f7: { p1: 60000 }, f8: { p1: 35000 },
    f9: { p1: 45000 }, f10: { p1: 41000 },
  },
  guest: {
    f1: { p1: 60000 }, f2: { p1: 53000 }, f3: { p1: 57000 }, f4: { p1: 50000 },
    f5: { p1: 63000 }, f6: { p1: 55000 }, f7: { p1: 70000 }, f8: { p1: 45000 },
    f9: { p1: 55000 }, f10: { p1: 51000 },
  },
};

// Get price for a food at a place for a user group
export function getPrice(foodId: string, placeId: string, groupId: string): number {
  return PRICE_MATRIX[groupId]?.[foodId]?.[placeId] || PRICE_MATRIX[groupId]?.[foodId]?.['p1'] || 0;
}

// === Weekly Schedule ===
export interface ScheduleSlot {
  dow: number; mealId: string; foodId: string; placeId: string; locked: boolean;
}
export const DEMO_SCHEDULE: ScheduleSlot[] = [
  { dow: 0, mealId: '1', foodId: 'f1', placeId: 'p1', locked: false },
  { dow: 0, mealId: '2', foodId: 'f2', placeId: 'p1', locked: false },
  { dow: 1, mealId: '1', foodId: 'f3', placeId: 'p1', locked: false },
  { dow: 1, mealId: '2', foodId: 'f4', placeId: 'p1', locked: false },
  { dow: 2, mealId: '1', foodId: 'f5', placeId: 'p1', locked: false },
  { dow: 2, mealId: '2', foodId: 'f6', placeId: 'p1', locked: false },
  { dow: 3, mealId: '1', foodId: 'f7', placeId: 'p1', locked: false },
  { dow: 3, mealId: '2', foodId: 'f8', placeId: 'p1', locked: false },
  { dow: 4, mealId: '1', foodId: 'f9', placeId: 'p1', locked: false },
  { dow: 4, mealId: '2', foodId: 'f10', placeId: 'p1', locked: false },
];

// === Reservations ===
export const DEMO_RESERVATIONS = [
  { uid: '1234567890', year: 2026, week: 36, dow: 0, mealId: '1', foodId: 'f1', placeId: 'p1', delivered: false, date: '۱۴۰۵/۰۶/۱۳' },
  { uid: '1234567890', year: 2026, week: 36, dow: 0, mealId: '2', foodId: 'f2', placeId: 'p1', delivered: true, date: '۱۴۰۵/۰۶/۱۳' },
  { uid: '1234567890', year: 2026, week: 36, dow: 1, mealId: '1', foodId: 'f3', placeId: 'p1', delivered: false, date: '۱۴۰۵/۰۶/۱۴' },
  { uid: '9876543210', year: 2026, week: 36, dow: 0, mealId: '1', foodId: 'f1', placeId: 'p4', delivered: false, date: '۱۴۰۵/۰۶/۱۳' },
  { uid: '5555555555', year: 2026, week: 36, dow: 0, mealId: '1', foodId: 'f1', placeId: 'p1', delivered: true, date: '۱۴۰۵/۰۶/۱۳' },
  { uid: '1111111111', year: 2026, week: 36, dow: 1, mealId: '1', foodId: 'f5', placeId: 'p5', delivered: false, date: '۱۴۰۵/۰۶/۱۴' },
  { uid: '3333333333', year: 2026, week: 36, dow: 2, mealId: '1', foodId: 'f7', placeId: 'p6', delivered: false, date: '۱۴۰۵/۰۶/۱۵' },
];

// === Transactions ===
export const DEMO_TRANSACTIONS = [
  { id: 't1', uid: '1234567890', amount: 45000, type: 'DOWN' as const, desc: 'رزرو غذا — چلو کباب', date: '۱۴۰۵/۰۶/۱۳ ۱۲:۳۰', issuer: 'سیستم رزرو' },
  { id: 't2', uid: '1234567890', amount: 500000, type: 'UP' as const, desc: 'خرید وجه از بانک', date: '۱۴۰۵/۰۶/۱۳ ۱۰:۰۰', issuer: 'درگاه پرداخت' },
  { id: 't3', uid: '1234567890', amount: 42000, type: 'DOWN' as const, desc: 'رزرو غذا — قورمه سبزی', date: '۱۴۰۵/۰۶/۱۲ ۱۱:۱۵', issuer: 'سیستم رزرو' },
  { id: 't4', uid: '9876543210', amount: 45000, type: 'DOWN' as const, desc: 'رزرو غذا — چلو کباب', date: '۱۴۰۵/۰۶/۱۳ ۱۳:۰۰', issuer: 'سیستم رزرو' },
  { id: 't5', uid: '9876543210', amount: 200000, type: 'UP' as const, desc: 'خرید وجه از بانک', date: '۱۴۰۵/۰۶/۱۲ ۰۹:۰۰', issuer: 'درگاه پرداخت' },
  { id: 't6', uid: '5555555555', amount: 35000, type: 'DOWN' as const, desc: 'رزرو غذا — چلو مرغ', date: '۱۴۰۵/۰۶/۱۳ ۱۱:۰۰', issuer: 'سیستم رزرو' },
  { id: 't7', uid: '1234567890', amount: 38000, type: 'UP' as const, desc: 'لغو غذا — زرشک پلو', date: '۱۴۰۵/۰۶/۱۱ ۱۴:۰۰', issuer: 'سیستم رزرو' },
  { id: 't8', uid: '1111111111', amount: 48000, type: 'DOWN' as const, desc: 'رزرو غذا — باقالو پلو', date: '۱۴۰۵/۰۶/۱۴ ۱۰:۳۰', issuer: 'سیستم رزرو' },
  { id: 't9', uid: '4444444444', amount: 60000, type: 'DOWN' as const, desc: 'فروش غذای آزاد — چلو کباب', date: '۱۴۰۵/۰۶/۱۳ ۱۲:۰۰', issuer: 'فروش آزاد' },
  { id: 't10', uid: '1234567890', amount: 25000, type: 'UP' as const, desc: 'انتقال اعتبار از ۹۸۷۶۵۴۳۲۱۰', date: '۱۴۰۵/۰۶/۱۰ ۱۶:۰۰', issuer: 'انتقال' },
];

// === Cards ===
export const DEMO_CARDS = [
  { id: 'CARD-001', uid: '1234567890', locked: false, status: '' },
  { id: 'CARD-002', uid: '9876543210', locked: false, status: '' },
  { id: 'CARD-003', uid: '5555555555', locked: true, status: 'معلق' },
  { id: 'CARD-004', uid: '1111111111', locked: false, status: '' },
];

// === Free Food Sales ===
export const DEMO_FREE_SALES = [
  { id: 'fs1', food: 'چلو کباب', buyer: 'مهمان', price: 60000, paid: true, date: '۱۴۰۵/۰۶/۱۳' },
  { id: 'fs2', food: 'زرشک پلو', buyer: '۴۴۴۴۴۴۴۴۴۴', price: 53000, paid: false, date: '۱۴۰۵/۰۶/۱۳' },
];

// === Days of week ===
export const DAYS = ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه'];
