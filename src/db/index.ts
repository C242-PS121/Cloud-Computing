import { drizzle } from 'drizzle-orm/pglite';
import { PGlite } from '@electric-sql/pglite'

const client = new PGlite(process.env.DATABASE_URL!);
const db = drizzle({ client })

export { db }