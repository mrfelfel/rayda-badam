import { drizzle as drizzleSqlite } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from './schema';
const isProd = process.env.NODE_ENV === 'production';
function createDb() {
  const sqlite = new Database(process.env.SQLITE_DB || './dev.db');
  sqlite.pragma('journal_mode = WAL');
  return drizzleSqlite(sqlite, { schema });
}
export const db = createDb();
