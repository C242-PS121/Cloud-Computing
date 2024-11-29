import { eq } from 'drizzle-orm'
import { db } from '../db'
import schema from '../db/schema'
import { sign, verify } from 'hono/jwt'

import type { JWTPayload } from 'hono/utils/jwt/types'
interface TokenPayload extends JWTPayload {
	sub: string
}

export const verify_email = async (email: string) => {
	const { users } = schema
	const [result] = await db.select().from(users).where(eq(users.email, email))
	return !!result
}

export const delete_refresh_token = async (token: string) => {
	const { auth } = schema
	const [result] = await db
		.delete(auth)
		.where(eq(auth.token, token))
		.returning({ token: auth.token })
	return !!result
}

export const gen_access_token = async (payload: string) => {
	return sign({ sub: payload }, Bun.env.ACCESS_TOKEN_SECRET)
}

export const gen_refresh_token = async (payload: string) => {
	return sign({ sub: payload }, Bun.env.REFRESH_TOKEN_SECRET)
}

export const verify_refresh_token = async (token: string) => {
	return verify(token, Bun.env.REFRESH_TOKEN_SECRET) as Promise<TokenPayload>
}
