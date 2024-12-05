import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'

import { verify_email, add_user } from '../helpers/users'
import { post_user } from '../validator/users'

const users = new Hono()

users.post('/', zValidator('json', post_user), async (c) => {
	const { email, password, fullname, phone } = c.req.valid('json')

	const email_exists = await verify_email(email)
	if (email_exists) return c.json({ message: 'Email already exists' }, 400)

	const id = Bun.randomUUIDv7()
	const pass_hash = await Bun.password.hash(password, 'bcrypt')

	const result = await add_user({
		id,
		email,
		fullname,
		password: pass_hash,
		phone,
	})
	return c.json({ id: result.id }, 201)
})

export default users
