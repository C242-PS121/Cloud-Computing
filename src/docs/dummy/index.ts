import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi'
import { z } from 'zod'
import { bearerAuth } from '../auth/auth_config'

const dummy = new OpenAPIRegistry()
dummy.registerPath({
	method: 'get',
	path: '/dummy',
	description: 'Dummy endpoint to test authentication. Will be removed later',
	tags: ['Data'],
	security: [{ [bearerAuth.name]: [] }],
	responses: {
		200: {
			description: 'Dummy response',
			content: {
				'application/json': {
					schema: z.object({ message: z.literal('skibidi sigma rizz') }),
				},
			},
		},
		401: {
			description: 'Unauthorized',
			content: {
				'text/plain': {
					schema: z.literal('Unauthorized'),
				},
			},
		},
	},
})

export default dummy.definitions
