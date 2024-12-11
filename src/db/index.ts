// import { PGlite } from '@electric-sql/pglite'
// import { drizzle } from 'drizzle-orm/pglite'
import { Pool } from 'pg'
import { drizzle } from 'drizzle-orm/node-postgres'

// const client = new PGlite({Bun.env.DATABASE_URL})
const client = new Pool({
	connectionString: Bun.env.DATABASE_URL,
})

export const db = drizzle({ client })