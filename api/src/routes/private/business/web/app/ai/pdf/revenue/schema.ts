
// @/src/routes/private/business/web/app/ai/pdf/revenue/schema.ts

import { FromSchema, JSONSchema } from 'json-schema-to-ts';

export const GET_Schema_privateBusinessWebAppAIPdfRevenue = {
  type: 'object',
  properties: {
    name: { type: 'string', minLength: 1 },
    email: { type: 'string', format: 'email' },
    age: { type: 'integer', minimum: 18 },
  },
  required: ['name', 'email', 'age'],
  additionalProperties: false,
} as const satisfies JSONSchema;

export type GET_Body_privateBusinessWebAppAIPdfRevenue = FromSchema<typeof GET_Schema_privateBusinessWebAppAIPdfRevenue>;



export const POST_Schema_privateBusinessWebAppAIPdfRevenue = {
  type: 'object',
  properties: {
    name: { type: 'string', minLength: 1 },
    email: { type: 'string', format: 'email' },
    age: { type: 'integer', minimum: 18 },
  },
  required: ['name', 'email', 'age'],
  additionalProperties: false,
} as const satisfies JSONSchema;

export type POST_Body_privateBusinessWebAppAIPdfRevenue = FromSchema<typeof POST_Schema_privateBusinessWebAppAIPdfRevenue>;



export const PUT_Schema_privateBusinessWebAppAIPdfRevenue = {
  type: 'object',
  properties: {
    name: { type: 'string', minLength: 1 },
    email: { type: 'string', format: 'email' },
    age: { type: 'integer', minimum: 18 },
  },
  required: ['name', 'email', 'age'],
  additionalProperties: false,
} as const satisfies JSONSchema;

export type PUT_Body_privateBusinessWebAppAIPdfRevenue = FromSchema<typeof PUT_Schema_privateBusinessWebAppAIPdfRevenue>;




export const DELETE_Schema_privateBusinessWebAppAIPdfRevenue = {
  type: 'object',
  properties: {
    name: { type: 'string', minLength: 1 },
    email: { type: 'string', format: 'email' },
    age: { type: 'integer', minimum: 18 },
  },
  required: ['name', 'email', 'age'],
  additionalProperties: false,
} as const satisfies JSONSchema;

export type DELETE_Body_privateBusinessWebAppAIPdfRevenue = FromSchema<typeof DELETE_Schema_privateBusinessWebAppAIPdfRevenue>;
