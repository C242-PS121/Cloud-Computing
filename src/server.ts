import './env'
import { Hono } from 'hono'
import { db } from './db'

import users from './routes/users'
import auth from './routes/auth'

const app = new Hono()
app.route('/users', users)
app.route('/auth', auth)

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
