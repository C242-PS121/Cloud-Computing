import { OpenApiGeneratorV31 } from '@asteasolutions/zod-to-openapi'

import login_docs from './auth'
import auth_config from './auth/auth_config'
import users_docs from './users'
import products from './products'
import image_docs from './images'

const definitions = [...auth_config, ...users_docs, ...login_docs, ...products, ...image_docs]

const openAPI = new OpenApiGeneratorV31(definitions).generateDocument({
	openapi: '3.1.0',
	info: {
		title: 'Thriftify API',
		version: '1.0.0',
		description: 'API Routes and Definitions for Thriftify',
	},
})

export default openAPI
