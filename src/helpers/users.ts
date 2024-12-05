import { db } from '../db'
import * as schema from '../db/schema'
import { eq } from 'drizzle-orm'
import { HTTPException } from 'hono/http-exception'

import type { z } from 'zod'
import type { post_user } from '../validator/users'

interface User extends z.infer<typeof post_user> {
	id: string
}

export const verify_email = async (email: string) => {
	const { users } = schema
	const [result] = await db.select().from(users).where(eq(users.email, email))
	return !!result
}

export const get_user = async (email: string) => {
	const { users } = schema
	const [result] = await db
		.select()
		.from(users)
		.where(eq(users.email, email))

	if (!result) return false
	return result
}

export const add_user = async (input: User) => {
	const { id, fullname, email, phone, password } = input

	const { users } = schema
	const [result] = await db
		.insert(users)
		.values({
			id,
			fullname,
			email,
			phone,
			pass_hash: password,
		})
		.returning({ id: users.id })

	if (!result) throw new HTTPException()
	return result
}
