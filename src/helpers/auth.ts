import { eq } from 'drizzle-orm'
import { db } from '../db'
import schema from '../db/schema'
import { sign, verify } from 'hono/jwt'

import type { JWTPayload } from 'hono/utils/jwt/types'
type TokenPayload = JWTPayload & { sub: string }

export const add_refresh_token = async (token: string) => {
	const { auth } = schema
	await db.insert(auth).values({ token })
}

export const delete_refresh_token = async (token: string) => {
	const { auth } = schema
	const [result] = await db
		.delete(auth)
		.where(eq(auth.token, token))
		.returning({ token: auth.token })
	return !!result
}

export const get_refresh_token = async (token: string) => {
	const { auth } = schema
	const [result] = await db
		.select({
			token: auth.token,
		})
		.from(auth)
		.where(eq(auth.token, token))
	return result
}

export const gen_access_token = async (payload: string) => {
	return sign({ sub: payload, exp: Math.floor(Date.now() / 1000) + 60 * 30 }, Bun.env.ACCESS_TOKEN_SECRET)
}

export const gen_refresh_token = async (payload: string) => {
	return sign({ sub: payload }, Bun.env.REFRESH_TOKEN_SECRET)
}

export const verify_refresh_token = async (token: string) => {
	return verify(token, Bun.env.REFRESH_TOKEN_SECRET) as Promise<TokenPayload>
}
