import { z } from 'zod'

export const post_product = z.object({
	owner: z.string().length(36),
	img_url: z.string().url(),
	name: z.string().min(1),
	price: z.number().int().nonnegative(),
	description: z.string().min(1),
	clothing_type: z.string().min(1)
})

export const put_product = post_product.omit({ owner: true })

export const post_product_response = z.object({
	message: z.string(),
	data: z.object({
		id: z.string().length(36),
	}),
})
