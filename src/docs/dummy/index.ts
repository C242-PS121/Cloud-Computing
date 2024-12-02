import { registry } from "..";
import { post_user, user_response } from "../../schema/users";
import { z } from "zod";

const bearerAuth = registry.registerComponent('securitySchemes', 'bearerAuth', {
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT'
})

registry.registerPath({
    method: "get",
    path: "/dummy",
    description: "Dummy endpoint to test authentication. Will be removed later",
    tags: ['Data'],
    security: [{ [bearerAuth.name]: [] }],
    responses: {
        200: {
            description: "Dummy response",
            content: {
                'application/json': {
                    schema: z.object({ message: z.literal("skibidi sigma rizz") })
                }
            }
        },
        401: {
            description: "Unauthorized",
            content: {
                "text/plain": {
                    schema: z.literal("Unauthorized")
                }
            }
        }
    }
})