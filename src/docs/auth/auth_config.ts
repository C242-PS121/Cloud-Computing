import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi'

const auth_config = new OpenAPIRegistry()
export const bearerAuth = auth_config.registerComponent(
	'securitySchemes',
	'bearerAuth',
	{
		type: 'http',
		scheme: 'bearer',
		bearerFormat: 'JWT',
	},
)

export default auth_config.definitions
