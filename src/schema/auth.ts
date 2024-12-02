import { z } from 'zod'

export const post_login = z.object({
    email: z.string().email(),
    password: z.string().min(8),
})

export const put_del_login = z.object({
    refresh_token: z.string(),
})