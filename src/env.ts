import { z } from 'zod'

const schema = z.object({
	PORT: z.coerce.number().int().positive(),
	DATABASE_URL: z.string().min(1).default(''),
	ACCESS_TOKEN_SECRET: z.string().min(1).default(''),
	REFRESH_TOKEN_SECRET: z.string().min(1).default(''),
})

/** @see: https://bun.sh/docs/runtime/env#typescript */
declare module 'bun' {
	interface Env extends z.infer<typeof schema> {}
}

const { success, error } = schema.safeParse(process.env)
if (!success) {
	console.error('Invalid environment variables:')
	for (const issue of error.issues) {
		console.error(`- ${issue.path}: ${issue.message}`)
	}
    process.exit(1)
}