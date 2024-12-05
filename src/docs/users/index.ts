import { z } from 'zod'
import { registry, bearerAuth } from '..'

import {
	post_user,
	post_user_response,
	get_user_response,
} from '../../validator/users'

registry.registerPath({
	method: 'post',
	path: '/users',
	description: 'Register a user',
	tags: ['User'],
	request: {
		body: {
			content: {
				'application/json': {
					schema: post_user,
				},
			},
		},
	},
	responses: {
		200: {
			description: 'User created',
			content: {
				'application/json': {
					schema: post_user_response,
				},
			},
		},
	},
})

registry.registerPath({
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
					schema: get_user_response,
				},
			},
		},
        401: {
            description: "Unauthorized",
            content: {
                "text/plain": {
                    schema: z.literal("Unauthorized")
                }
            }
        }
	},
})
