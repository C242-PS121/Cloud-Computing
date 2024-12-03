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

// E.g get in the homescreen
export const get_all_products = async () => {
	const { products } = schema
	return await db
		.select({
			id: products.id,
			name: products.name,
			price: products.price,
		})
		.from(products)
}

// E.g get products detail after click
export const get_product = async (id: string) => {
	const { products } = schema
	const [result] = await db.select().from(products).where(eq(products.id, id))

	if (!result) throw new HTTPException(404, { message: 'Product not found' })
	return result
}
