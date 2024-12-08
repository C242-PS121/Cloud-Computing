import { sql } from 'drizzle-orm';
import { boolean, integer, pgTable, text, varchar } from 'drizzle-orm/pg-core'

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
	owner_id: varchar({ length: 36 })
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	main_img_url: text().notNull(),
	image_urls: text().array().default(sql`ARRAY[]::text[]`),
	name: text().notNull(),
	price: integer().notNull(),
	description: text().notNull(),
	clothing_type: text().notNull(),
	sold: boolean().notNull().default(false),
})
