import { registry } from "..";
import { post_user, user_response } from "../../validator/users";

registry.registerPath({
    method: "post",
    path: "/users",
    description: "Register a user",
    tags: ['User'],
    request: {
        body: {
            content: {
                "application/json": {
                    schema: post_user
                }
            }
        }
    },
    responses: {
        200: {
            description: "User created",
            content: {
                "application/json": {
                    schema: user_response
                }
            }
        }
    }
})