import { z } from 'zod'

export const post_product = z.object({
    owner: z.string().length(36),
    img_url: z.string().url(),
    name: z.string(),
    price: z.number().int().nonnegative(),
    description: z.string(),
    clothing_type: z.string().optional(),
})

export const product_response = z.object({ id: z.string().length(36) })