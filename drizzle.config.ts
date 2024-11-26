import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema.ts',
  dialect: 'postgresql',
  driver: 'pglite',
  dbCredentials: {
    url: './.pglite_db',
  },
});
