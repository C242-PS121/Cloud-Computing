import { Hono } from 'hono'
import { HTTPException } from 'hono/http-exception'
import { db } from '../db'
import schema from '../db/schema'
import { eq } from 'drizzle-orm'

import { get_user } from '../helpers/users'
import {
	add_refresh_token,
	delete_refresh_token,
	gen_access_token,
	gen_refresh_token,
	get_refresh_token,
	verify_refresh_token,
} from '../helpers/auth'

const auth = new Hono()

auth.post('/login', async (c) => {
	const { email, password } = await c.req.json()
	const account = await get_user(email)

	if (!account) return c.json({ message: 'Wrong credentials' }, 401) // simplify
	const match = await Bun.password.verify(password, account.pass_hash, 'bcrypt')
	if (!match) return c.json({ message: 'Wrong credentials' }, 401) // simplify

	const [access_token, refresh_token] = await Promise.all([
		gen_access_token(account.id),
		gen_refresh_token(account.id),
	])

	await add_refresh_token(refresh_token)
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

	const result = await get_refresh_token(refresh_token)
	if (!result) return c.json({ message: "Invalid token, token doesn't exist" }, 401)

	const valid_token = await verify_refresh_token(result.token)
	if (!valid_token) return c.json({ message: 'Invalid token' }, 401)

	const access_token = await gen_access_token(valid_token.sub)

	return c.json(
		{
			message: 'Successfully refreshed token',
			data: {
				access_token,
			},
		},
		201,
	)
})

auth.post('/logout', async (c) => {
	const { refresh_token } = await c.req.json()

	const valid_token = await verify_refresh_token(refresh_token)
	if (!valid_token) return c.json({ message: 'Invalid token' }, 401)

	const result = await delete_refresh_token(refresh_token)
	if (!result) throw new HTTPException()

	return c.json({ message: 'Successfully logged out' })
})

export default auth
