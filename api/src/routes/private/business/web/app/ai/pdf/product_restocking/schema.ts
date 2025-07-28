
// @/src/routes/private/business/web/app/ai/pdf/product_restocking/schema.ts

import { FromSchema, JSONSchema } from 'json-schema-to-ts';

export const GET_Schema_privateBusinessWebAppAIPdfProductRestocking = {
  type: 'object',
  properties: {
    name: { type: 'string', minLength: 1 },
    email: { type: 'string', format: 'email' },
    age: { type: 'integer', minimum: 18 },
  },
  required: ['name', 'email', 'age'],
  additionalProperties: false,
} as const satisfies JSONSchema;

export type GET_Body_privateBusinessWebAppAIPdfProductRestocking = FromSchema<typeof GET_Schema_privateBusinessWebAppAIPdfProductRestocking>;



export const POST_Schema_privateBusinessWebAppAIPdfProductRestocking = {
  type: 'object',
  properties: {
    name: { type: 'string', minLength: 1 },
    email: { type: 'string', format: 'email' },
    age: { type: 'integer', minimum: 18 },
  },
  required: ['name', 'email', 'age'],
  additionalProperties: false,
} as const satisfies JSONSchema;

export type POST_Body_privateBusinessWebAppAIPdfProductRestocking = FromSchema<typeof POST_Schema_privateBusinessWebAppAIPdfProductRestocking>;



export const PUT_Schema_privateBusinessWebAppAIPdfProductRestocking = {
  type: 'object',
  properties: {
    name: { type: 'string', minLength: 1 },
    email: { type: 'string', format: 'email' },
    age: { type: 'integer', minimum: 18 },
  },
  required: ['name', 'email', 'age'],
  additionalProperties: false,
} as const satisfies JSONSchema;

export type PUT_Body_privateBusinessWebAppAIPdfProductRestocking = FromSchema<typeof PUT_Schema_privateBusinessWebAppAIPdfProductRestocking>;




export const DELETE_Schema_privateBusinessWebAppAIPdfProductRestocking = {
  type: 'object',
  properties: {
    name: { type: 'string', minLength: 1 },
    email: { type: 'string', format: 'email' },
    age: { type: 'integer', minimum: 18 },
  },
  required: ['name', 'email', 'age'],
  additionalProperties: false,
} as const satisfies JSONSchema;

export type DELETE_Body_privateBusinessWebAppAIPdfProductRestocking = FromSchema<typeof DELETE_Schema_privateBusinessWebAppAIPdfProductRestocking>;
