import { z } from 'zod'

export const post_user = z.object({
	email: z.string().email(),
	password: z.string().min(8),
	phone: z.string().min(1),
	fullname: z.string().min(1),
})

export const get_user = z.object({ id: z.string().length(36) })

export const post_user_response = z.object({ id: z.string().length(36) })
export const get_user_response = post_user.omit({ password: true })
