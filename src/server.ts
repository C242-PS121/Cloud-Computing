import { Hono } from 'hono'
import { db } from './db'

import users from './routes/users'

const app = new Hono()
app.route('/users', users)

process.on('SIGINT', async () => {
  await db.$client.close()
  console.log('\n' + 'Exiting...')
  process.exit(0)
})

const is_prod = process.env.NODE_ENV === 'production'
export default {
  hostname: is_prod ? '0.0.0.0' : 'localhost',
  port: 8080,
  fetch: app.fetch
}
