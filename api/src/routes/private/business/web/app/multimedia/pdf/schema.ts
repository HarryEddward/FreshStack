
// @/src/routes/private/business/web/app/multimedia/pdf/schema.ts

import { FromSchema, JSONSchema } from 'json-schema-to-ts';

export const GET_Schema_privateBusinessWebAppMultimediaPDF = {
  type: 'object',
  properties: {
    name: { type: 'string', minLength: 1 },
    email: { type: 'string', format: 'email' },
    age: { type: 'integer', minimum: 18 },
  },
  required: ['name', 'email', 'age'],
  additionalProperties: false,
} as const satisfies JSONSchema;

export type GET_Body_privateBusinessWebAppMultimediaPDF = FromSchema<typeof GET_Schema_privateBusinessWebAppMultimediaPDF>;



export const POST_Schema_privateBusinessWebAppMultimediaPDF = {
  type: 'object',
  properties: {
    name: { type: 'string', minLength: 1 },
    email: { type: 'string', format: 'email' },
    age: { type: 'integer', minimum: 18 },
  },
  required: ['name', 'email', 'age'],
  additionalProperties: false,
} as const satisfies JSONSchema;

export type POST_Body_privateBusinessWebAppMultimediaPDF = FromSchema<typeof POST_Schema_privateBusinessWebAppMultimediaPDF>;



export const PUT_Schema_privateBusinessWebAppMultimediaPDF = {
  type: 'object',
  properties: {
    name: { type: 'string', minLength: 1 },
    email: { type: 'string', format: 'email' },
    age: { type: 'integer', minimum: 18 },
  },
  required: ['name', 'email', 'age'],
  additionalProperties: false,
} as const satisfies JSONSchema;

export type PUT_Body_privateBusinessWebAppMultimediaPDF = FromSchema<typeof PUT_Schema_privateBusinessWebAppMultimediaPDF>;




export const DELETE_Schema_privateBusinessWebAppMultimediaPDF = {
  type: 'object',
  properties: {
    name: { type: 'string', minLength: 1 },
    email: { type: 'string', format: 'email' },
    age: { type: 'integer', minimum: 18 },
  },
  required: ['name', 'email', 'age'],
  additionalProperties: false,
} as const satisfies JSONSchema;

export type DELETE_Body_privateBusinessWebAppMultimediaPDF = FromSchema<typeof DELETE_Schema_privateBusinessWebAppMultimediaPDF>;
