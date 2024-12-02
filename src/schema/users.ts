import { z } from 'zod'

export const post_user = z.object({
	email: z.string().email(),
	password: z.string().min(8),
	fullname: z.string().min(3),
})

export const user_response = z.object({ id: z.string().length(36) })
