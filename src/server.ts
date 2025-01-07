import './env'
import { Hono } from 'hono'

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

app.notFound(c => c.newResponse(null, 404))

const signals = ['SIGINT', 'SIGTERM']
for (const signal of signals) {
	process.on(signal, () => {
		console.log('\n' + 'Shutting down...')
		process.exit(0)
	})
}

export default {
	hostname: Bun.env.NODE_ENV === 'production' ? '0.0.0.0' : 'localhost',
	port: Bun.env.PORT || 8080,
	fetch: app.fetch,
}