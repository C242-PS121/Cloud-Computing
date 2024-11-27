import { pgTable, text, varchar } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
	id: varchar({ length: 36 }).primaryKey(),
	fullname: text().notNull(),
	email: text().notNull(),
	pass_hash: text().notNull(),
})

export const auth = pgTable('auth', {
	token: text().notNull(),
})

// Why double export?
// the explicit export is because drizzle-kit doesn't detect default exports
// causing no table to be created in the database
export default { users, auth }
