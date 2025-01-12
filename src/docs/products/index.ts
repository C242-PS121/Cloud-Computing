import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import * as schema from '../../validator/products';
import { schema as product_v2 } from '../../routes/products_v2';
import { bearerAuth } from '../auth/auth_config'
import { z } from 'zod';

const products = new OpenAPIRegistry();

products.registerPath({
  method: 'post',
  path: '/products',
  security: [{ [bearerAuth.name]: [] }],
  tags: ['Products'],
  request: {
    body: {
      content: {
        'application/json': {
          schema: schema.post_product,
        },
      },
    },
  },
  responses: {
    201: {
      description: 'Product added successfully',
      content: {
        'application/json': {
          schema: schema.post_product_response
        },
      },
    },
		401: {
			description: 'Unauthorized',
			content: {
				'text/plain': {
					schema: z.literal('Unauthorized'),
				},
			},
		},
  },
});

products.registerPath({
  method: 'post',
  path: '/v2/products',
  security: [{ [bearerAuth.name]: [] }],
  tags: ['Products'],
  request: {
    body: {
      content: {
        'multipart/form-data': {
          schema: product_v2
        }
      }
    },
  },
  responses: {
    201: {
      description: 'Product added successfully',
      content: {
        'application/json': {
          schema: z.object({
            message: z.literal('Product added'),
            data: z.object({
              id: z.string().length(36),
            })
          })
        },
      },
    },
    401: {
      description: 'Unauthorized',
      content: {
        'text/plain': {
          schema: z.literal('Unauthorized'),
        },
      },
    },
  }
})

products.registerPath({
  method: 'get',
  path: '/products',
  tags: ['Products'],
  security: [{ [bearerAuth.name]: [] }],
  responses: {
    200: {
      description: 'List of all products',
      content: {
        'application/json': {
          schema: schema.get_allproduct_response
        },
      },
    },
    401: {
			description: 'Unauthorized',
			content: {
				'text/plain': {
					schema: z.literal('Unauthorized'),
				},
			},
		},
  },
});

products.registerPath({
  method: 'get',
  path: '/products/{id}',
  security: [{ [bearerAuth.name]: [] }],
  tags: ['Products'],
  parameters: [
    {
      name: 'id',
      in: 'path',
      required: true,
      schema: { type: 'string' },
      description: 'ID of the product to retrieve',
    },
  ],
  responses: {
    200: {
      description: 'Product details',
      content: {
        'application/json': {
          schema: schema.get_product_response
        },
      },
    },
    401: {
			description: 'Unauthorized',
			content: {
				'text/plain': {
					schema: z.literal('Unauthorized'),
				},
			},
		},
    404: {
			description: 'Not found',
			content: {
				'text/plain': {
					schema: z.literal('404 Not found'),
				},
			},
		},
  },
});

products.registerPath({
  method: 'put',
  path: '/products/{id}',
  security: [{ [bearerAuth.name]: [] }],
  tags: ['Products'],
  parameters: [
    {
      name: 'id',
      in: 'path',
      required: true,
      schema: { type: 'string' },
      description: 'ID of the product to update',
    },
  ],
  request: {
    body: {
      content: {
        'application/json': {
          schema: schema.put_product,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Product updated successfully',
      content: {
        'application/json': {
          schema: schema.put_product_response
        },
      },
    },
    401: {
			description: 'Unauthorized',
			content: {
				'text/plain': {
					schema: z.literal('Unauthorized'),
				},
			},
		},
    404: {
			description: 'Not found',
			content: {
				'text/plain': {
					schema: z.literal('404 Not found'),
				},
			},
		},
  },
});

products.registerPath({
  method: 'delete',
  path: '/products/{id}',
    security: [{ [bearerAuth.name]: [] }],
  tags: ['Products'],
  parameters: [
    {
      name: 'id',
      in: 'path',
      required: true,
      schema: { type: 'string' },
      description: 'ID of the product to delete',
    },
  ],
  responses: {
    200: {
      description: 'Product deleted successfully',
      content: {
        'application/json': {
          schema: z.object({
            message: z.literal('Product deleted'),
            data: z.object({
              id: z.string().length(36),
            })
          })
        },
      },
    },
    401: {
			description: 'Unauthorized',
			content: {
				'text/plain': {
					schema: z.literal('Unauthorized'),
				},
			},
		},
    404: {
			description: 'Not found',
			content: {
				'text/plain': {
					schema: z.literal('404 Not found'),
				},
			},
		},
  },
});

export default products.definitions;
