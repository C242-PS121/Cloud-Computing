import { Hono } from 'hono'
import { db } from '../db'
import schema from '../db/schema'
import { verify_email } from '../helpers'

const users = new Hono()

users.post('/', async (c) => {
	const { email, password, fullname } = await c.req.json()
	//TODO: Add validation

	const email_exists = await verify_email(email)
	if (email_exists) return c.json({ message: 'Email already exists' }, 400)

	const id = Bun.randomUUIDv7()
	const pass_hash = await Bun.password.hash(password, 'bcrypt')

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

	if (!result) return c.json({ message: 'Failed to register user' }, 500)

	return c.json({ id: result.id }, 201)
})

export default users
