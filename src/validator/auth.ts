import { messages } from '@electric-sql/pglite'
import { z } from 'zod'

export const post_login = z.object({
    email: z.string().email(),
    password: z.string().min(8),
})

export const put_login = z.object({
    refresh_token: z.string().min(1),
})

export const del_login = put_login

export const post_login_response = z.object({
    message: z.literal('Successfully logged in'),
    data: z.object({
        user_id: z.string(),
        access_token: z.string(),
        refresh_token: z.string(),
    }),
})

export const put_login_response = z.object({
    message: z.literal('Successfully refreshed token'),
    data: z.object({
        access_token: z.string(),
    }),
})