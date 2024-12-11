import './env'
import { Hono } from 'hono'
import { db } from './db'

import auth from './routes/auth'
import docs from './routes/docs'
import images from './routes/images'
import products from './routes/products'
import products_v2 from './routes/products_v2' // discuss this later
import users from './routes/users'

const app = new Hono()

app.route('/api', docs)
app.route('/users', users)
app.route('/auth', auth)
app.route('/products', products)
app.route('/v2/products', products_v2)
app.route('/images', images)

process.on('SIGINT', async () => {
	// await db.$client.close()
	await db.$client.end()
	console.log('\n' + 'Exiting...')
	process.exit(0)
})

const is_prod = Bun.env.NODE_ENV === 'production'
export default {
	hostname: is_prod ? '0.0.0.0' : 'localhost',
	port: Bun.env.PORT,
	fetch: app.fetch,
}