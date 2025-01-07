import './env'
import route from './routes'

route.notFound(c => c.newResponse(null, 404))

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
	fetch: route.fetch,
}