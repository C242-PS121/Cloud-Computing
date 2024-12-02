import { pgTable, text, varchar, integer } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
	id: varchar({ length: 36 }).primaryKey(),
	fullname: text().notNull(),
	email: text().notNull(),
	pass_hash: text().notNull(),
})

export const auth = pgTable('auth', {
	token: text().notNull(),
})

export const products = pgTable('products', {
	id: varchar({ length: 36 }).primaryKey(),
	owner: varchar({ length: 36 }).notNull(),
	img_url: text().notNull(),
	name: text().notNull(),
	price: integer().notNull(),
	description: text().notNull(),
	clothing_type: text()
})
