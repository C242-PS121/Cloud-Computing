import { pgTable, text, varchar, decimal, boolean } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
	id: varchar({ length: 36 }).primaryKey(),
	fullname: text().notNull(),
	phone: text().notNull(),
	email: text().notNull(),
	pass_hash: text().notNull(),
})

export const auth = pgTable('auth', {
	token: text().notNull(),
})

export const products = pgTable('products', {
	id: varchar({ length: 36 }).primaryKey(),
	owner: varchar({ length: 36 })
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	img_url: text().notNull(),
	name: text().notNull(),
	price: decimal({ precision: 12, scale: 2 }).notNull(),
	description: text().notNull(),
	clothing_type: text().notNull(),
	sold: boolean().notNull().default(false),
})