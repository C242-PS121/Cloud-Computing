import { Hono } from 'hono'
import { serveStatic } from 'hono/bun'
import { apiReference } from '@scalar/hono-api-reference'

import openapi from '../docs'

const docs = new Hono()

docs.get('/icon', serveStatic({ path: './src/docs/favicon.svg' }))
docs.get('/', (c) => c.json(openapi))
docs.get('/docs', apiReference({
	favicon: '/api/icon',
	pageTitle: 'Thriftify API Docs',
	theme: 'elysiajs',
	spec: { url: '/api' },
}))

export default docs