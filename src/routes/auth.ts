import { Hono } from 'hono'
import { db } from '../db'
import schema from '../db/schema'
import { eq } from 'drizzle-orm'

import {
	gen_access_token,
	gen_refresh_token,
	verify_refresh_token,
} from '../helpers'

const auth = new Hono()

auth.post('/login', async (c) => {
	const { email, password } = await c.req.json()

	const { users } = schema
	const [account] = await db
		.select({
			id: users.id,
			pass_hash: users.pass_hash,
		})
		.from(users)
		.where(eq(users.email, email))

	if (!account) return c.json({ message: 'Wrong credentials' }, 401)
	const match = await Bun.password.verify(password, account.pass_hash, 'bcrypt')
	if (!match) return c.json({ message: 'Wrong credentials' }, 401)

	const [access_token, refresh_token] = await Promise.all([
		gen_access_token(account.id),
		gen_refresh_token(account.id),
	])

	const { auth } = schema
	await db.insert(auth).values({ token: refresh_token })

	return c.json(
		{
			message: 'Successfully logged in',
			data: {
				access_token,
				refresh_token,
			},
		},
		201,
	)
})

auth.put('/login', async (c) => {
	const { refresh_token } = await c.req.json()

	const { auth } = schema
	const [result] = await db
		.select({
			token: auth.token,
		})
		.from(auth)
		.where(eq(auth.token, refresh_token))

	if (!result) return c.json({ message: 'Invalid token' }, 401)
	const valid_token = await verify_refresh_token(result.token)
	if (!valid_token) return c.json({ message: 'Invalid token' }, 401)

	const [access_token, new_refresh_token] = await Promise.all([
		gen_access_token(valid_token.sub),
		gen_refresh_token(valid_token.sub),
	])

	await db
		.update(auth)
		.set({ token: new_refresh_token })
		.where(eq(auth.token, refresh_token))

	return c.json(
		{
			message: 'Successfully refreshed token',
			data: {
				access_token,
				refresh_token: new_refresh_token,
			},
		},
		201,
	)
})

auth.post('/logout', async (c) => {
	const { refresh_token } = await c.req.json()

	const valid_token = await verify_refresh_token(refresh_token)
	if (!valid_token) return c.json({ message: 'Invalid token' }, 401)

	const { auth } = schema
	await db.delete(auth).where(eq(auth.token, refresh_token))

	return c.json({ message: 'Successfully logged out' })
})

export default auth
