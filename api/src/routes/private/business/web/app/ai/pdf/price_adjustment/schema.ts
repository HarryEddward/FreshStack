
// @/src/routes/private/business/web/app/ai/pdf/price_adjustment/schema.ts

import { FromSchema, JSONSchema } from 'json-schema-to-ts';

export const GET_Schema_privateBusinessWebAppAIPdfPriceAdjustment = {
  type: 'object',
  properties: {
    name: { type: 'string', minLength: 1 },
    email: { type: 'string', format: 'email' },
    age: { type: 'integer', minimum: 18 },
  },
  required: ['name', 'email', 'age'],
  additionalProperties: false,
} as const satisfies JSONSchema;

export type GET_Body_privateBusinessWebAppAIPdfPriceAdjustment = FromSchema<typeof GET_Schema_privateBusinessWebAppAIPdfPriceAdjustment>;



export const POST_Schema_privateBusinessWebAppAIPdfPriceAdjustment = {
  type: 'object',
  properties: {
    name: { type: 'string', minLength: 1 },
    email: { type: 'string', format: 'email' },
    age: { type: 'integer', minimum: 18 },
  },
  required: ['name', 'email', 'age'],
  additionalProperties: false,
} as const satisfies JSONSchema;

export type POST_Body_privateBusinessWebAppAIPdfPriceAdjustment = FromSchema<typeof POST_Schema_privateBusinessWebAppAIPdfPriceAdjustment>;



export const PUT_Schema_privateBusinessWebAppAIPdfPriceAdjustment = {
  type: 'object',
  properties: {
    name: { type: 'string', minLength: 1 },
    email: { type: 'string', format: 'email' },
    age: { type: 'integer', minimum: 18 },
  },
  required: ['name', 'email', 'age'],
  additionalProperties: false,
} as const satisfies JSONSchema;

export type PUT_Body_privateBusinessWebAppAIPdfPriceAdjustment = FromSchema<typeof PUT_Schema_privateBusinessWebAppAIPdfPriceAdjustment>;




export const DELETE_Schema_privateBusinessWebAppAIPdfPriceAdjustment = {
  type: 'object',
  properties: {
    name: { type: 'string', minLength: 1 },
    email: { type: 'string', format: 'email' },
    age: { type: 'integer', minimum: 18 },
  },
  required: ['name', 'email', 'age'],
  additionalProperties: false,
} as const satisfies JSONSchema;

export type DELETE_Body_privateBusinessWebAppAIPdfPriceAdjustment = FromSchema<typeof DELETE_Schema_privateBusinessWebAppAIPdfPriceAdjustment>;
