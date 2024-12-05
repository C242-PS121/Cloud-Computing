import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi'
import { z } from 'zod'
import * as schema from '../../validator/users'
import { bearerAuth } from '../auth/auth_config'

const users_docs = new OpenAPIRegistry()
users_docs.registerPath({
	method: 'post',
	path: '/users',
	description: 'Register a user',
	tags: ['User'],
	request: {
		body: {
			content: {
				'application/json': {
					schema: schema.post_user,
				},
			},
		},
	},
	responses: {
		200: {
			description: 'User created',
			content: {
				'application/json': {
					schema: schema.post_user_response,
				},
			},
		},
	},
})

users_docs.registerPath({
	method: 'get',
	path: '/users/{id}',
	description: 'Get user by id',
	tags: ['User'],
	security: [{ [bearerAuth.name]: [] }],
	responses: {
		200: {
			description: 'The user details excluding the pass_hash',
			content: {
				'application/json': {
					schema: schema.get_user_response,
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

export default users_docs.definitions
