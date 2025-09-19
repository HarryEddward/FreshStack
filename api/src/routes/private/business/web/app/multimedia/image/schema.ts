
// @/src/routes/private/business/web/app/multimedia/image/schema.ts

import { FromSchema, JSONSchema } from 'json-schema-to-ts';

export const GET_Schema_privateBusinessWebAppMultimediaImage = {
  type: 'object',
  properties: {
    name: { type: 'string', minLength: 1 },
    email: { type: 'string', format: 'email' },
    age: { type: 'integer', minimum: 18 },
  },
  required: ['name', 'email', 'age'],
  additionalProperties: false,
} as const satisfies JSONSchema;

export type GET_Body_privateBusinessWebAppMultimediaImage = FromSchema<typeof GET_Schema_privateBusinessWebAppMultimediaImage>;



export const POST_Schema_privateBusinessWebAppMultimediaImage = {
  type: 'object',
  properties: {
    name: { type: 'string', minLength: 1 },
    email: { type: 'string', format: 'email' },
    age: { type: 'integer', minimum: 18 },
  },
  required: ['name', 'email', 'age'],
  additionalProperties: false,
} as const satisfies JSONSchema;

export type POST_Body_privateBusinessWebAppMultimediaImage = FromSchema<typeof POST_Schema_privateBusinessWebAppMultimediaImage>;



export const PUT_Schema_privateBusinessWebAppMultimediaImage = {
  type: 'object',
  properties: {
    name: { type: 'string', minLength: 1 },
    email: { type: 'string', format: 'email' },
    age: { type: 'integer', minimum: 18 },
  },
  required: ['name', 'email', 'age'],
  additionalProperties: false,
} as const satisfies JSONSchema;

export type PUT_Body_privateBusinessWebAppMultimediaImage = FromSchema<typeof PUT_Schema_privateBusinessWebAppMultimediaImage>;




export const DELETE_Schema_privateBusinessWebAppMultimediaImage = {
  type: 'object',
  properties: {
    name: { type: 'string', minLength: 1 },
    email: { type: 'string', format: 'email' },
    age: { type: 'integer', minimum: 18 },
  },
  required: ['name', 'email', 'age'],
  additionalProperties: false,
} as const satisfies JSONSchema;

export type DELETE_Body_privateBusinessWebAppMultimediaImage = FromSchema<typeof DELETE_Schema_privateBusinessWebAppMultimediaImage>;
