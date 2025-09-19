
// @/src/routes/private/client/app/web/call_waiter/schema.ts

import { FromSchema, JSONSchema } from 'json-schema-to-ts';

export const GET_Schema_privateClientAppWebWaiter = {
  type: 'object',
  properties: {
    name: { type: 'string', minLength: 1 },
    email: { type: 'string', format: 'email' },
    age: { type: 'integer', minimum: 18 },
  },
  required: ['name', 'email', 'age'],
  additionalProperties: false,
} as const satisfies JSONSchema;

export type GET_Body_privateClientAppWebWaiter = FromSchema<typeof GET_Schema_privateClientAppWebWaiter>;



export const POST_Schema_privateClientAppWebWaiter = {
  type: 'object',
  properties: {
    name: { type: 'string', minLength: 1 },
    email: { type: 'string', format: 'email' },
    age: { type: 'integer', minimum: 18 },
  },
  required: ['name', 'email', 'age'],
  additionalProperties: false,
} as const satisfies JSONSchema;

export type POST_Body_privateClientAppWebWaiter = FromSchema<typeof POST_Schema_privateClientAppWebWaiter>;



export const PUT_Schema_privateClientAppWebWaiter = {
  type: 'object',
  properties: {
    name: { type: 'string', minLength: 1 },
    email: { type: 'string', format: 'email' },
    age: { type: 'integer', minimum: 18 },
  },
  required: ['name', 'email', 'age'],
  additionalProperties: false,
} as const satisfies JSONSchema;

export type PUT_Body_privateClientAppWebWaiter = FromSchema<typeof PUT_Schema_privateClientAppWebWaiter>;




export const DELETE_Schema_privateClientAppWebWaiter = {
  type: 'object',
  properties: {
    name: { type: 'string', minLength: 1 },
    email: { type: 'string', format: 'email' },
    age: { type: 'integer', minimum: 18 },
  },
  required: ['name', 'email', 'age'],
  additionalProperties: false,
} as const satisfies JSONSchema;

export type DELETE_Body_privateClientAppWebWaiter = FromSchema<typeof DELETE_Schema_privateClientAppWebWaiter>;
