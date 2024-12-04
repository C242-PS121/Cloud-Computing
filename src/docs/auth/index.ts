import { registry } from '..'
import {
	post_login,
	put_login,
	post_login_response,
	put_login_response,
	del_login,
} from '../../validator/auth'
import { z } from 'zod'
registry.registerPath({
	method: 'post',
	path: '/auth/login',
	description: 'Login as a user',
	tags: ['Auth'],
	request: {
		body: {
			content: {
				'application/json': {
					schema: post_login,
				},
			},
		},
	},
	responses: {
		200: {
			description: 'User created',
			content: {
				'application/json': {
					schema: post_login_response,
				},
			},
		},
	},
})

registry.registerPath({
	method: 'put',
	path: '/auth/login',
	description: "Refresh a user's access token",
	tags: ['Auth'],
	request: {
		body: {
			content: {
				'application/json': {
					schema: put_login,
				},
			},
		},
	},
	responses: {
		200: {
			description: 'Successfully refreshed user access token',
			content: {
				'application/json': {
					schema: put_login_response,
				},
			},
		},
	},
})

registry.registerPath({
	method: 'post',
	path: '/auth/logout',
	tags: ['Auth'],
	description: 'Logout a user and delete refresh token from database',
	request: {
		body: {
			content: {
				'application/json': {
					schema: del_login,
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
