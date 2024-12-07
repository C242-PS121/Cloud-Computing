import { z } from 'zod'

export const post_image = z.object({ image: z.instanceof(File) })

export const post_image_response = z.object({
    message: z.string(),
    url: z.string(),
})