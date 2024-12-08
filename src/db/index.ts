import { PGlite } from '@electric-sql/pglite'
import { drizzle } from 'drizzle-orm/pglite'

const client = new PGlite(Bun.env.DATABASE_URL)
export const db = drizzle({ client })