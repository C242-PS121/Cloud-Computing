import { Hono } from 'hono'
import { jwt, type JwtVariables } from 'hono/jwt'

const dummy = new Hono<{ Variables: JwtVariables }>().use(
	jwt({ secret: Bun.env.ACCESS_TOKEN_SECRET }),
)

dummy.get('/', async (c) => {
	return c.json({ message: 'skibidi sigma rizz' })
})

export default dummy
