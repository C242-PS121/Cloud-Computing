import {
	OpenAPIRegistry,
	OpenApiGeneratorV31,
    extendZodWithOpenApi
} from '@asteasolutions/zod-to-openapi'

export const registry = new OpenAPIRegistry()

// Anti-pattern bcoz side effect import, but it works lmao
await import('../docs/users')
await import('../docs/auth')
await import('../docs/dummy')

const generator = new OpenApiGeneratorV31(registry.definitions)
const openAPI = generator.generateDocument({
    openapi: "3.1.0",
    info: {
        title: "Thriftify API",
        version: "1.0.0",
        description: "API Routes and Definitions for Thriftify",
    },
})

export default openAPI