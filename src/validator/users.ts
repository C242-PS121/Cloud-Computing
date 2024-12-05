import { z } from 'zod'

export const post_user = z.object({
	email: z.string().email(),
	password: z.string().min(8),
	phone: z.string().min(1),
	fullname: z.string().min(1),
})

export const user_response = z.object({ id: z.string().length(36) })
