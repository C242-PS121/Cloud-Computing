import { z } from 'zod'

const env_schema = z.object({
	PORT: z.coerce.number().int().positive(),
	DATABASE_URL: z.string().min(1).default(''),
	ACCESS_TOKEN_SECRET: z.string().min(1).default(''),
	REFRESH_TOKEN_SECRET: z.string().min(1).default(''),
})

/** @see: https://bun.sh/docs/runtime/env#typescript */
declare module 'bun' {
	interface Env extends z.infer<typeof env_schema> {}
}

const { success, error } = env_schema.safeParse(process.env)
if (!success) {
	console.error('Invalid env variables:', error.message)
    process.exit(1)
}