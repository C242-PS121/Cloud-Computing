import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { post_image, post_image_response } from "../../validator/images";
import { bearerAuth } from "../auth/auth_config";

const images = new OpenAPIRegistry()

images.registerPath({
    method: 'post',
    path: '/upload',
    tags: ['Images'],
    description: 'Upload an image to Google Cloud Storage, returns a publicly accessible URL',
    security: [{ [bearerAuth.name]: [] }],
    request: {
        body: {
            content: {
                'multipart/form-data': {
                    schema: post_image
                }
            }
        }
    },
    responses: {
        200: {
            description: 'Image uploaded successfully',
            content: {
                'application/json': {
                    schema: post_image_response
                }
            }
        }
    }
})

export default images.definitions