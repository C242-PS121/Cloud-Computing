import { z } from 'zod'

export const post_product = z.object({
	owner: z.string().length(36),
	img_url: z.string().url(),
	name: z.string().min(1),
	price: z.number().int().nonnegative(),
	description: z.string().min(1),
	clothing_type: z.string(),
	sold: z.boolean().default(false),
})

export const product_response = z.object({ id: z.string().length(36) })
