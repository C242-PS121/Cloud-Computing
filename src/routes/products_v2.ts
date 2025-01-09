import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { type JwtVariables, jwt } from 'hono/jwt'

import * as h from '../helpers/products'
import { upload } from '../helpers/images'
import { z } from 'zod'

const products = new Hono<{ Variables: JwtVariables }>().use(
	jwt({ secret: Bun.env.ACCESS_TOKEN_SECRET }),
)

export const schema = z.object({
	owner_id: z.string().length(36),
    image: z.instanceof(File),
	name: z.string().min(1),
	price: z.coerce.number().int().nonnegative(),
	description: z.string().min(1),
	clothing_type: z.string().min(1),
	clothing_usage: z.string().min(1),
})

products.post('/', zValidator('form', schema), async (c) => {
	const product_payload = c.req.valid('form')

	const id = Bun.randomUUIDv7()
	const ext = product_payload.image.name.split('.').pop()?.toLowerCase() || 'png'
    const url = await upload(`clothing/${id}.${ext}`, product_payload.image)

	const result = await h.add_product({ id, main_img_url: url, ...product_payload })
	return c.json(
		{
			message: 'Product added',
			data: result,
		},
		201,
	)
})

export default products
