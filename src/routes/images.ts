import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { bodyLimit } from 'hono/body-limit'
import { type JwtVariables, jwt } from 'hono/jwt'
import { z } from 'zod'

import { upload } from '../helpers/images'
import { post_image } from '../validator/images'

const image = new Hono<{ Variables: JwtVariables }>().use(
	jwt({ secret: Bun.env.ACCESS_TOKEN_SECRET }),
	bodyLimit({ maxSize: 1024 * 1000 * 5 }),
)

image.post('/upload', zValidator('form', post_image), async (c) => {
	const { image } = c.req.valid('form')

	const ext = image.name.split('.').pop()?.toLowerCase() || 'png'
	const filename = `${Bun.randomUUIDv7()}.${ext}`
	const result = await upload(`images/${filename}`, image)

	return c.json({
		message: 'Image uploaded successfully',
		url: result,
	})
})

export default image
