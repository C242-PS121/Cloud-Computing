import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'

import * as h from '../helpers/users'
import { get_user, post_user } from '../validator/users'

const users = new Hono()

users.post('/', zValidator('json', post_user), async (c) => {
	const payload = c.req.valid('json')

	const email_exists = await h.verify_email(payload.email)
	if (email_exists) return c.json({ message: 'Email already exists' }, 400)

	const id = Bun.randomUUIDv7()
	payload.password = await Bun.password.hash(payload.password, 'bcrypt')

	const result = await h.add_user({ id, ...payload })
	return c.json({ id: result.id }, 201)
})

users.get('/:id', zValidator('param', get_user), async (c) => {
	const { id } = c.req.valid('param')
	const result = await h.get_user_by_id(id)

	return c.json({ data: result })
})

export default users
