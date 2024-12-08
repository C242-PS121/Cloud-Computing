import { z } from 'zod'

export const post_product = z.object({
	owner_id: z.string().length(36),
	main_img_url: z.string().url(),
	image_urls: z.array(z.string().url()),
	name: z.string().min(1),
	price: z.number().int().nonnegative(),
	description: z.string().min(1),
	clothing_type: z.string().min(1)
})

export const put_product = post_product.omit({ owner_id: true })

export const get_product_response = post_product

export const post_product_response = z.object({
	message: z.string(),
	data: z.object({
		id: z.string().length(36),
	}),
})

export const put_product_response = post_product_response

export const get_allproduct_response = z.object({
	data: z.object({
		id: z.string().length(36),
		name: z.string().min(1),
		main_img_url: z.string().url(),
		price: z.number().int().nonnegative(),
	}).array()
})