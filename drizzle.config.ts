import { defineConfig } from 'drizzle-kit'
import { env } from 'bun'

export default defineConfig({
	out: './drizzle',
	schema: './src/db/schema.ts',
	dialect: 'postgresql',
	driver: 'pglite',
	dbCredentials: {
		url: process.env.DATABASE_URL,
	},
})
