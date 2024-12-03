import './env'
import { Hono } from 'hono'
import { db } from './db'

import docs from './routes/docs'
import users from './routes/users'
import auth from './routes/auth'
import products from './routes/products'
import images from './routes/images'

const app = new Hono()

app.route('/api', docs)
app.route('/users', users)
app.route('/auth', auth)
app.route('/products', products)
app.route('/images', images)

process.on('SIGINT', async () => {
	await db.$client.close()
	console.log('\n' + 'Exiting...')
	process.exit(0)
})

const is_prod = Bun.env.NODE_ENV === 'production'
export default {
	hostname: is_prod ? '0.0.0.0' : 'localhost',
	port: Bun.env.PORT,
	fetch: app.fetch,
}
