import { Hono } from 'hono'
import { verify_email, add_user } from '../helpers/users'

const users = new Hono()

users.post('/', async (c) => {
	const { email, password, fullname } = await c.req.json()
	//TODO: Add validation

	const email_exists = await verify_email(email)
	if (email_exists) return c.json({ message: 'Email already exists' }, 400)

	const id = Bun.randomUUIDv7()
	const pass_hash = await Bun.password.hash(password, 'bcrypt')

	const result = await add_user({ id, email, fullname, pass_hash })
	return c.json({ id: result.id }, 201)
})

export default users
