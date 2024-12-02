import { Hono } from 'hono'
import { apiReference } from '@scalar/hono-api-reference'

import openapi from '../docs'
const docs = new Hono()

docs.get('/', (c) => c.json(openapi))
docs.get('/docs', apiReference({
	pageTitle: 'Thriftify API Docs',
	theme: 'elysiajs',
	spec: { url: '/api' },
}))

export default docs