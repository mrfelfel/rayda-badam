import Database from 'better-sqlite3';
import crypto from 'crypto';

const DB_PATH = process.env.SQLITE_DB || './dev.db';
const db = new Database(DB_PATH);

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    uid TEXT NOT NULL UNIQUE,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    name_space TEXT,
    admin INTEGER DEFAULT 0,
    created_at TEXT DEFAULT ''
  );
  CREATE TABLE IF NOT EXISTS profiles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    uid TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    family TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS plannings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name_space TEXT NOT NULL,
    year INTEGER NOT NULL,
    month INTEGER NOT NULL,
    week INTEGER NOT NULL,
    reserve_mode INTEGER DEFAULT 1,
    plan TEXT DEFAULT '[]',
    updated_at TEXT DEFAULT ''
  );
  CREATE TABLE IF NOT EXISTS reserveds (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name_space TEXT NOT NULL,
    uid TEXT NOT NULL,
    year INTEGER NOT NULL,
    week INTEGER NOT NULL,
    dow INTEGER NOT NULL,
    meal TEXT NOT NULL,
    food TEXT NOT NULL,
    place TEXT DEFAULT 'سلف مرکزی',
    stop INTEGER DEFAULT 1,
    updated_at TEXT DEFAULT ''
  );
  CREATE TABLE IF NOT EXISTS balances (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    uid TEXT NOT NULL UNIQUE,
    value REAL DEFAULT 0,
    updated_at TEXT DEFAULT ''
  );
  CREATE TABLE IF NOT EXISTS transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    uid TEXT NOT NULL,
    amount REAL NOT NULL,
    type TEXT NOT NULL,
    description TEXT NOT NULL,
    date TEXT NOT NULL,
    issuer TEXT DEFAULT 'rayda-system',
    tag TEXT DEFAULT 'self-food',
    updated_at TEXT DEFAULT ''
  );
  CREATE TABLE IF NOT EXISTS cards (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    identify TEXT NOT NULL UNIQUE,
    uid TEXT NOT NULL,
    lock INTEGER DEFAULT 0,
    status TEXT,
    updated_at TEXT DEFAULT ''
  );
  CREATE TABLE IF NOT EXISTS universities (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name_space TEXT NOT NULL,
    uid TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS unidatas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name_space TEXT NOT NULL UNIQUE,
    payment_identify TEXT NOT NULL
  );
`);

// Hash password with SHA-256 (simple for dev)
function hash(p: string): string {
  return crypto.createHash('sha256').update(p).digest('hex');
}

// Seed admin user
const adminPassword = hash('admin123');
db.prepare(`
  INSERT OR IGNORE INTO users (uid, username, password, name_space, admin, created_at)
  VALUES (?, ?, ?, ?, 1, datetime('now'))
`).run('4311370891', '4311370891', adminPassword, 'fani.markazi.amirkabir');

// Seed admin profile
db.prepare(`
  INSERT OR IGNORE INTO profiles (uid, name, family)
  VALUES (?, ?, ?)
`).run('4311370891', 'محمد', 'فلفلی');

// Seed a test student
const studentPassword = hash('student123');
db.prepare(`
  INSERT OR IGNORE INTO users (uid, username, password, name_space, admin, created_at)
  VALUES (?, ?, ?, ?, 0, datetime('now'))
`).run('1234567890', '1234567890', studentPassword, 'fani.markazi.amirkabir');

db.prepare(`
  INSERT OR IGNORE INTO profiles (uid, name, family)
  VALUES (?, ?, ?)
`).run('1234567890', 'علی', 'احمدی');

// Seed balance for student
db.prepare(`
  INSERT OR IGNORE INTO balances (uid, value, updated_at)
  VALUES (?, 500000, datetime('now'))
`).run('1234567890');

// Seed university
db.prepare(`
  INSERT OR IGNORE INTO universities (name_space, uid)
  VALUES (?, ?)
`).run('fani.markazi.amirkabir', '4311370891');

// Seed planning for current week
const now = new Date();
const weekNum = Math.ceil(((now.getTime() - new Date(now.getFullYear(), 0, 1).getTime()) / 86400000 + 1) / 7);
const plan = JSON.stringify([
  { dow: 0, food: { id: 'f1', name: 'چلو کباب' }, meal: { id: '1', name: 'ناهار' }, price: 45000, lock: false, place: 'سلف مرکزی' },
  { dow: 0, food: { id: 'f2', name: 'زرشک پلو' }, meal: { id: '2', name: 'شام' }, price: 38000, lock: false, place: 'سلف مرکزی' },
  { dow: 1, food: { id: 'f3', name: 'قورمه سبزی' }, meal: { id: '1', name: 'ناهار' }, price: 42000, lock: false, place: 'سلف مرکزی' },
  { dow: 1, food: { id: 'f4', name: 'چلو مرغ' }, meal: { id: '2', name: 'شام' }, price: 35000, lock: false, place: 'سلف مرکزی' },
  { dow: 2, food: { id: 'f5', name: 'باقلو پلو' }, meal: { id: '1', name: 'ناهار' }, price: 48000, lock: false, place: 'سلف مرکزی' },
  { dow: 2, food: { id: 'f6', name: 'رشته پلو' }, meal: { id: '2', name: 'شام' }, price: 40000, lock: false, place: 'سلف مرکزی' },
  { dow: 3, food: { id: 'f7', name: 'چلو ماهی' }, meal: { id: '1', name: 'ناهار' }, price: 55000, lock: false, place: 'سلف مرکزی' },
  { dow: 3, food: { id: 'f8', name: 'آش رشته' }, meal: { id: '2', name: 'شام' }, price: 30000, lock: false, place: 'سلف مرکزی' },
  { dow: 4, food: { id: 'f9', name: 'خورشت قیمه' }, meal: { id: '1', name: 'ناهار' }, price: 40000, lock: false, place: 'سلف مرکزی' },
  { dow: 4, food: { id: 'f10', name: 'cheon polow' }, meal: { id: '2', name: 'شام' }, price: 36000, lock: false, place: 'سلف مرکزی' },
]);

db.prepare(`
  INSERT OR IGNORE INTO plannings (name_space, year, month, week, reserve_mode, plan, updated_at)
  VALUES (?, ?, ?, ?, 1, ?, datetime('now'))
`).run('fani.markazi.amirkabir', now.getFullYear(), now.getMonth() + 1, weekNum, plan);

console.log('Seed complete!');
console.log('Admin: 4311370891 / admin123');
console.log('Student: 1234567890 / student123');
console.log(`Week: ${weekNum}, Year: ${now.getFullYear()}`);

db.close();
