
// @/src/routes/private/services/zenstack/BusinessProduct/schema.ts

import { FromSchema, JSONSchema } from 'json-schema-to-ts';

export const GET_Schema_privateServicesZenstackBusinessProduct = {
  type: 'object',
  properties: {
    name: { type: 'string', minLength: 1 },
    email: { type: 'string', format: 'email' },
    age: { type: 'integer', minimum: 18 },
  },
  required: ['name', 'email', 'age'],
  additionalProperties: false,
} as const satisfies JSONSchema;

export type GET_Body_privateServicesZenstackBusinessProduct = FromSchema<typeof GET_Schema_privateServicesZenstackBusinessProduct>;




// Modelo con ajuntación de archivos aplicados
export const POST_Schema_privateServicesZenstackBusinessProductData = {
  type: 'object',
  required: ['data'],
  properties: {
    data: {
      type: 'object',
      required: ['name', 'menuId', 'unityAmount', 'unityConsumeStock', 'unityConsumePrice', 'typeUnitConsumeMeasurement', 'nameLastModificationEmployee', 'preparationDuration'],
      properties: {
        name: { 
          type: 'string',
          minLength: 1
        },
        menuId: { 
          type: 'string'
        },
        unityAmount: { 
          type: 'integer',
          minimum: 0
        },
        unityConsumeStock: { 
          type: 'integer',
          minimum: 0
        },
        unityConsumePrice: { 
          type: 'number', 
          multipleOf: 0.01,
          minimum: 0
        },
        typeUnitConsumeMeasurement: { 
          type: 'string',
          minLength: 1
        },
        nameLastModificationEmployee: { 
          type: 'string',
          minLength: 1
        },
        preparationDuration: { 
          type: 'integer',
          minimum: 0
        },
        // Propiedades opcionales
        tags: { 
          type: 'string'
        },
        urlImage: { 
          type: 'string',
          format: 'uri'
        },
        imageId: { 
          type: 'string'
        },
        productGroupId: { 
          type: 'string'
        },
        parentId: { 
          type: 'string'
        }
      },
      additionalProperties: false
    },
  },
  additionalProperties: false
} as JSONSchema;

export const POST_Schema_privateServicesZenstackBusinessProduct = {
  type: 'object',
  required: ['data'],
  properties: {
    data: {
      type: 'string',
    },
    file: {
      type: 'object',
    }
  },
  additionalProperties: true,
} as JSONSchema;

export type POST_Body_privateServicesZenstackBusinessProduct = FromSchema<typeof POST_Schema_privateServicesZenstackBusinessProduct>;


export const PUT_Schema_privateServicesZenstackBusinessProduct_UpdateFileData = {
  type: 'object',
  required: ['data'],
  properties: {
    data: {
      type: 'object',
      properties: {
        fileId: { type: "string" },
        productId: { type: "string" }
      }
    },
  },
  additionalProperties: true,
} as JSONSchema;

export const PUT_Schema_privateServicesZenstackBusinessProduct_UpdateFile = {
  type: 'object',
  required: ['data', 'file'],
  properties: {
    data: {
      type: 'string',
    },
    file: {
      type: 'object',
    }
  },
  additionalProperties: false,
} as JSONSchema;

export type PUT_Body_privateServicesZenstackBusinessProduct_UpdateFile =  typeof PUT_Schema_privateServicesZenstackBusinessProduct_UpdateFile;


export const PUT_Schema_privateServicesZenstackBusinessProduct = {
  type: 'object',
  properties: {
    name: { type: 'string', minLength: 1 },
    email: { type: 'string', format: 'email' },
    age: { type: 'integer', minimum: 18 },
  },
  required: ['name', 'email', 'age'],
  additionalProperties: false,
} as const satisfies JSONSchema;

export type PUT_Body_privateServicesZenstackBusinessProduct = FromSchema<typeof PUT_Schema_privateServicesZenstackBusinessProduct>;




export const DELETE_Schema_privateServicesZenstackBusinessProduct = {
  type: 'object',
  properties: {
    name: { type: 'string', minLength: 1 },
    email: { type: 'string', format: 'email' },
    age: { type: 'integer', minimum: 18 },
  },
  required: ['name', 'email', 'age'],
  additionalProperties: false,
} as const satisfies JSONSchema;

export type DELETE_Body_privateServicesZenstackBusinessProduct = FromSchema<typeof DELETE_Schema_privateServicesZenstackBusinessProduct>;
