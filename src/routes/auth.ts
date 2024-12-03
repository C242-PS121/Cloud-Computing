import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'

import { post_login, put_login, del_login } from '../validator/auth'
import { get_user } from '../helpers/users'
import * as h from '../helpers/auth'

const auth = new Hono()

auth.post('/login', zValidator('json', post_login), async (c) => {
	const { email, password } = c.req.valid('json')
	const account = await get_user(email)

	if (!account) return c.json({ message: 'Wrong credentials' }, 401) // simplify
	const match = await Bun.password.verify(password, account.pass_hash, 'bcrypt')
	if (!match) return c.json({ message: 'Wrong credentials' }, 401) // simplify

	const [access_token, refresh_token] = await Promise.all([
		h.gen_access_token(account.id),
		h.gen_refresh_token(account.id),
	])

	await h.add_refresh_token(refresh_token)
	return c.json(
		{
			message: 'Successfully logged in',
			data: {
				user_id: account.id,
				access_token,
				refresh_token,
			},
		},
		201,
	)
})

auth.put('/login', zValidator('json', put_login), async (c) => {
	const { refresh_token } = c.req.valid('json')

	const result = await h.get_refresh_token(refresh_token)
	if (!result) return c.json({ message: "Invalid token, token doesn't exist" }, 401)

	const valid_token = await h.verify_refresh_token(result.token)
	if (!valid_token) return c.json({ message: 'Invalid token' }, 401)

	const access_token = await h.gen_access_token(valid_token.sub)

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

auth.delete('/logout', zValidator('json', del_login), async (c) => {
	const { refresh_token } = c.req.valid('json')

	const valid_token = await h.verify_refresh_token(refresh_token)
	if (!valid_token) return c.json({ message: 'Invalid token' }, 401)

	const result = await h.delete_refresh_token(refresh_token)
	if (!result) return c.json({ message: "Invalid token" }, 401)

	return c.json({ message: 'Successfully logged out' })
})

export default auth
