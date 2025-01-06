import { z } from 'zod'

const schema = z.object({
	DATABASE_URL: z.string().min(1),
	BUCKET_NAME: z.string().min(1),
	ACCESS_TOKEN_SECRET: z.string().min(1),
	REFRESH_TOKEN_SECRET: z.string().min(1),
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
