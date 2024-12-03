import { eq } from 'drizzle-orm'
import { db } from '../db'
import { HTTPException } from 'hono/http-exception'
import * as schema from '../db/schema'

import type { post_product } from '../validator/products'
import type { z } from 'zod'

interface Product extends z.infer<typeof post_product> {
	id: string
}

export const add_product = async (product: Product) => {
	const { products } = schema
	const [result] = await db
		.insert(products)
		.values(product)
		.returning({ id: products.id })

	if (!result) throw new HTTPException()
	return result
}
