
// @/src/routes/private/services/zenstack/BusinessFile/schema.ts

import { FromSchema, JSONSchema } from 'json-schema-to-ts';

export const GET_Schema_privateServicesZenstackBusinessFile = {
  type: 'object',
  properties: {
    name: { type: 'string', minLength: 1 },
    email: { type: 'string', format: 'email' },
    age: { type: 'integer', minimum: 18 },
  },
  required: ['name', 'email', 'age'],
  additionalProperties: false,
} as const satisfies JSONSchema;

export type GET_Body_privateServicesZenstackBusinessFile = FromSchema<typeof GET_Schema_privateServicesZenstackBusinessFile>;



export const POST_Schema_privateServicesZenstackBusinessFile = {
  type: 'object',
  properties: {
    name: { type: 'string', minLength: 1 },
    email: { type: 'string', format: 'email' },
    age: { type: 'integer', minimum: 18 },
  },
  required: ['name', 'email', 'age'],
  additionalProperties: false,
} as const satisfies JSONSchema;

export type POST_Body_privateServicesZenstackBusinessFile = FromSchema<typeof POST_Schema_privateServicesZenstackBusinessFile>;



export const PUT_Schema_privateServicesZenstackBusinessFile = {
  type: 'object',
  properties: {
    name: { type: 'string', minLength: 1 },
    email: { type: 'string', format: 'email' },
    age: { type: 'integer', minimum: 18 },
  },
  required: ['name', 'email', 'age'],
  additionalProperties: false,
} as const satisfies JSONSchema;

export type PUT_Body_privateServicesZenstackBusinessFile = FromSchema<typeof PUT_Schema_privateServicesZenstackBusinessFile>;




export const DELETE_Schema_privateServicesZenstackBusinessFile = {
  type: 'object',
  properties: {
    name: { type: 'string', minLength: 1 },
    email: { type: 'string', format: 'email' },
    age: { type: 'integer', minimum: 18 },
  },
  required: ['name', 'email', 'age'],
  additionalProperties: false,
} as const satisfies JSONSchema;

export type DELETE_Body_privateServicesZenstackBusinessFile = FromSchema<typeof DELETE_Schema_privateServicesZenstackBusinessFile>;
