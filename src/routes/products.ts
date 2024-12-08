import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { type JwtVariables, jwt } from 'hono/jwt'
import { HTTPException } from 'hono/http-exception'
import { post_product, put_product } from '../validator/products'

import * as h from '../helpers/products'

const products = new Hono<{ Variables: JwtVariables }>().use(
	jwt({ secret: Bun.env.ACCESS_TOKEN_SECRET }),
)

products.post('/', zValidator('json', post_product), async (c) => {
	const id = Bun.randomUUIDv7()
	const product_payload = c.req.valid('json')

	const result = await h.add_product({ id, ...product_payload })
	return c.json(
		{
			message: 'Product added',
			data: result,
		},
		201,
	)
})

products.get('/', async (c) => {
	const result = await h.get_all_products()
	return c.json({
		data: result,
	})
})

products.get('/:id', async (c) => {
	const id = c.req.param('id')
	const result = await h.get_product(id)
	return c.json({
		data: result,
	})
})

products.put('/:id', zValidator('json', put_product), async (c) => {
	const id = c.req.param('id')
	const product_payload = c.req.valid('json')
	const user_id = c.get('jwtPayload').sub

	const { owner_id } = await h.get_product(id)
	if (user_id !== owner_id) throw new HTTPException(403)

	const result = await h.edit_product(id, product_payload)
	return c.json({
		message: 'Product updated',
		data: result,
	})
})

products.delete('/:id', async (c) => {
	const id = c.req.param('id')
	const user_id = c.get('jwtPayload').sub

	const { owner_id } = await h.get_product(id)
	if (user_id !== owner_id) throw new HTTPException(403)

	const result = await h.delete_product(id)
	return c.json({
		message: 'Product deleted',
		data: result,
	})
})

export default products
