import { Hono } from 'hono'
import { jwt, type JwtVariables } from 'hono/jwt'
import { zValidator } from '@hono/zod-validator'
import { post_product } from '../validator/products'

import * as h from '../helpers/products'

const products = new Hono<{ Variables: JwtVariables }>().use(
	jwt({ secret: Bun.env.ACCESS_TOKEN_SECRET }),
)

products.post('/', zValidator('json', post_product), async (c) => {
	const id = Bun.randomUUIDv7()
	const product_payload = c.req.valid('json')

	const result = await h.add_product({ id, ...product_payload })
	return c.json({
		message: 'Product added',
		data: result,
	}, 201)
})

export default products
