import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { post_product } from '../../validator/products';

const products = new OpenAPIRegistry();

products.registerPath({
  method: 'post',
  path: '/products',
  tags: ['Products'],
  summary: 'Add a new product',
  request: {
    body: {
      content: {
        'application/json': {
          schema: post_product,
        },
      },
    },
  },
  responses: {
    201: {
      description: 'Product added successfully',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              message: { type: 'string', example: 'Product added' },
              data: { type: 'object' }, // Adjust if you have a specific product schema
            },
          },
        },
      },
    },
  },
});

products.registerPath({
  method: 'get',
  path: '/products',
  tags: ['Products'],
  summary: 'Get all products',
  responses: {
    200: {
      description: 'List of all products',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              data: { 
                type: 'array',
                items: { type: 'object' }, // Adjust to match your product schema
              },
            },
          },
        },
      },
    },
  },
});

products.registerPath({
  method: 'get',
  path: '/products/{id}',
  tags: ['Products'],
  summary: 'Get a product by ID',
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
          schema: {
            type: 'object',
            properties: {
              data: { type: 'object' }, // Adjust to match your product schema
            },
          },
        },
      },
    },
  },
});

products.registerPath({
  method: 'put',
  path: '/products/{id}',
  tags: ['Products'],
  summary: 'Update a product by ID',
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
          schema: post_product,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Product updated successfully',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              message: { type: 'string', example: 'Product updated' },
              data: { type: 'object' }, // Adjust to match your product schema
            },
          },
        },
      },
    },
  },
});

products.registerPath({
  method: 'delete',
  path: '/products/{id}',
  tags: ['Products'],
  summary: 'Delete a product by ID',
  parameters: [
    {
      name: 'id',
      in: 'path',
      required: true,
      schema: { type: 'string' },
      description: 'ID of the product to dePlete',
    },
  ],
  responses: {
    200: {
      description: 'Product deleted successfully',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              message: { type: 'string', example: 'Product deleted' },
              data: { type: 'object' }, // Adjust if needed
            },
          },
        },
      },
    },
  },
});

export default products.definitions;
