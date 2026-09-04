import type { Config } from 'drizzle-kit';
export default { schema: './src/schema.ts', out: './drizzle', dialect: 'sqlite', dbCredentials: { url: './dev.db' } } satisfies Config;
