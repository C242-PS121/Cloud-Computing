import { eq } from 'drizzle-orm'
import { HTTPException } from 'hono/http-exception'
import { db } from '../db'
import * as schema from '../db/schema'

import type { z } from 'zod'
import type { post_product, put_product } from '../validator/products'

type EditProduct = z.infer<typeof put_product>
interface Product extends z.infer<typeof post_product> {
	id: string
}

export const add_product = async (product: Product) => {
	const { products } = schema
	const [result] = await db
		.insert(products)
		.values(product)
		.returning({ id: products.id })
		.catch(() => [])
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
			img: products.img_url,
		})
		.from(products)
}

// E.g get products detail after click
export const get_product = async (id: string) => {
	const { products } = schema
	const [result] = await db.select().from(products).where(eq(products.id, id))

	if (!result) throw new HTTPException(404)
	return result
}

export const edit_product = async (id: string, product: EditProduct) => {
	const { products } = schema
	const [result] = await db
		.update(products)
		.set(product)
		.where(eq(products.id, id))
		.returning({ id: products.id })

	if (!result) throw new HTTPException(404)
	return result
}

export const delete_product = async (id: string) => {
	const { products } = schema
	const result = await db
		.delete(products)
		.where(eq(products.id, id))
		.returning({ id: products.id })

	if (!result) throw new HTTPException(404)
	return result
}