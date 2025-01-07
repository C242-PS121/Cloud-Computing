import { Hono } from 'hono'

import auth from './routes/auth'
import docs from './routes/docs'
import images from './routes/images'
import products from './routes/products'
import products_v2 from './routes/products_v2' // discuss this later
import users from './routes/users'

const appRouter = new Hono()

appRouter.route('/api', docs)
appRouter.route('/users', users)
appRouter.route('/auth', auth)
appRouter.route('/products', products)
appRouter.route('/v2/products', products_v2)
appRouter.route('/images', images)

export default appRouter