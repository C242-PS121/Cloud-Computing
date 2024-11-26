import { eq } from 'drizzle-orm'
import { db } from '../db'
import schema from '../db/schema'

export const verify_email = async (email: string) => {
	const { users } = schema
	const [result] = await db.select().from(users).where(eq(users.email, email))
	return !!result
}

export const add_refresh_token = async (token: string) => {
	const { auth } = schema
	const [result] = await db
		.insert(auth)
		.values({ token })
		.returning({ token: auth.token })
	return !!result
}

export const verify_refresh_token = async (token: string) => {
	const { auth } = schema
	const [result] = await db.select().from(auth).where(eq(auth.token, token))
	return !!result
}
