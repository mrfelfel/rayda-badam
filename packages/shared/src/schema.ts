import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  uid: text('uid').notNull().unique(),
  username: text('username').notNull().unique(),
  password: text('password').notNull(),
  nameSpace: text('name_space'),
  admin: integer('admin', { mode: 'boolean' }).default(false),
  createdAt: text('created_at').default(''),
});

export const profiles = sqliteTable('profiles', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  uid: text('uid').notNull().unique(),
  name: text('name').notNull(),
  family: text('family').notNull(),
});

export const universities = sqliteTable('universities', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  nameSpace: text('name_space').notNull(),
  uid: text('uid').notNull(),
});

export const unidatas = sqliteTable('unidatas', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  nameSpace: text('name_space').notNull().unique(),
  paymentIdentify: text('payment_identify').notNull(),
});

export const plannings = sqliteTable('plannings', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  nameSpace: text('name_space').notNull(),
  year: integer('year').notNull(),
  month: integer('month').notNull(),
  week: integer('week').notNull(),
  reserveMode: integer('reserve_mode', { mode: 'boolean' }).default(true),
  plan: text('plan', { mode: 'json' }).notNull().default('[]'),
  updatedAt: text('updated_at').default(''),
});

export const reserveds = sqliteTable('reserveds', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  nameSpace: text('name_space').notNull(),
  uid: text('uid').notNull(),
  year: integer('year').notNull(),
  week: integer('week').notNull(),
  dow: integer('dow').notNull(),
  meal: text('meal').notNull(),
  food: text('food').notNull(),
  place: text('place').default('سلف مرکزی'),
  stop: integer('stop', { mode: 'boolean' }).default(true),
  updatedAt: text('updated_at').default(''),
});

export const balances = sqliteTable('balances', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  uid: text('uid').notNull().unique(),
  value: real('value').default(0),
  updatedAt: text('updated_at').default(''),
});

export const transactions = sqliteTable('transactions', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  uid: text('uid').notNull(),
  amount: real('amount').notNull(),
  type: text('type').notNull(),
  description: text('description').notNull(),
  date: text('date').notNull(),
  issuer: text('issuer').default('rayda-system'),
  tag: text('tag').default('self-food'),
  updatedAt: text('updated_at').default(''),
});

export const cards = sqliteTable('cards', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  identify: text('identify').notNull().unique(),
  uid: text('uid').notNull(),
  lock: integer('lock', { mode: 'boolean' }).default(false),
  status: text('status'),
  updatedAt: text('updated_at').default(''),
});

export const places = sqliteTable('places', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  placeId: text('place_id').notNull(),
  name: text('name').notNull(),
  description: text('description').default('محل تحویل'),
  nameSpace: text('name_space').notNull(),
});

export const bankdata = sqliteTable('bankdata', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  terminalId: text('terminal_id').notNull(),
  merchantId: text('merchant_id').notNull(),
  amount: real('amount').notNull(),
  signData: text('sign_data').notNull(),
  returnUrl: text('return_url').notNull(),
  localDateTime: text('local_date_time').notNull(),
  paymentIdentity: text('payment_identity').notNull(),
  orderId: integer('order_id').notNull().unique(),
  nationalCode: text('national_code').notNull(),
  status: integer('status', { mode: 'boolean' }),
});

export const deliveryCounts = sqliteTable('delivery_counts', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  nameSpace: text('name_space').notNull(),
  uid: text('uid').notNull(),
  year: integer('year').notNull(),
  week: integer('week').notNull(),
  dow: integer('dow').notNull(),
  meal: text('meal').notNull(),
  updatedAt: text('updated_at').default(''),
});

export const apps = sqliteTable('apps', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  aid: text('aid').notNull().unique(),
  name: text('name').notNull(),
  scope: text('scope'),
  space: text('space'),
  type: text('type'),
});

export const tokens = sqliteTable('tokens', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  aid: text('aid').notNull(),
  uid: text('uid').notNull(),
  token: text('token').notNull(),
  admin: integer('admin', { mode: 'boolean' }).default(false),
  online: integer('online', { mode: 'boolean' }).default(true),
});
