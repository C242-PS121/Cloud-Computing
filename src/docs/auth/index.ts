import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi'
import { z } from 'zod'
import * as schema from '../../validator/auth'

const login_docs = new OpenAPIRegistry()

login_docs.registerPath({
	method: 'post',
	path: '/auth/login',
	description: 'Login as a user',
	tags: ['Auth'],
	request: {
		body: {
			content: {
				'application/json': {
					schema: schema.post_login,
				},
			},
		},
	},
	responses: {
		200: {
			description: 'User created',
			content: {
				'application/json': {
					schema: schema.post_login_response,
				},
			},
		},
	},
})

login_docs.registerPath({
	method: 'put',
	path: '/auth/login',
	description: "Refresh a user's access token",
	tags: ['Auth'],
	request: {
		body: {
			content: {
				'application/json': {
					schema: schema.put_login,
				},
			},
		},
	},
	responses: {
		200: {
			description: 'Successfully refreshed user access token',
			content: {
				'application/json': {
					schema: schema.put_login_response,
				},
			},
		},
	},
})

login_docs.registerPath({
	method: 'post',
	path: '/auth/logout',
	tags: ['Auth'],
	description: 'Logout a user and delete refresh token from database',
	request: {
		body: {
			content: {
				'application/json': {
					schema: schema.del_login,
				},
			},
		},
	},
	responses: {
		200: {
			description: 'Successfully logged out',
			content: {
				'application/json': {
					schema: z.object({ message: z.literal('Successfully logged out') }),
				},
			},
		},
	},
})

export default login_docs.definitions
