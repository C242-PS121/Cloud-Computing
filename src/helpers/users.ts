import { db } from '../db'
import schema from '../db/schema'
import { eq } from 'drizzle-orm'
import { HTTPException } from 'hono/http-exception'

interface User {
	id: string
	fullname: string
	email: string
	pass_hash: string
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

	if (!result) throw new HTTPException()
	return result
}

export const add_user = async (input: User) => {
	const { id, fullname, email, pass_hash } = input

	const { users } = schema
	const [result] = await db
		.insert(users)
		.values({
			id,
			fullname,
			email,
			pass_hash,
		})
		.returning({ id: users.id })

	if (!result) throw new HTTPException()
	return result
}
