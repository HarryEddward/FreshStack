
// @/src/routes/private/services/zenstack/BusinessOrderUbication/schema.ts

import { FromSchema, JSONSchema } from 'json-schema-to-ts';

export const GET_Schema_privateServicesZenstackBusinessOrderUbication = {
  type: 'object',
  properties: {
    name: { type: 'string', minLength: 1 },
    email: { type: 'string', format: 'email' },
    age: { type: 'integer', minimum: 18 },
  },
  required: ['name', 'email', 'age'],
  additionalProperties: false,
} as const satisfies JSONSchema;

export type GET_Body_privateServicesZenstackBusinessOrderUbication = FromSchema<typeof GET_Schema_privateServicesZenstackBusinessOrderUbication>;



export const POST_Schema_privateServicesZenstackBusinessOrderUbication = {
  type: 'object',
  properties: {
    data: {
      type: 'object',
      properties: {
        title: { type: 'string' }, // Corregido: especificar tipo explícitamente
        position_x: { type: 'number' },
        position_y: { type: 'number' },
        isCalling: { type: 'boolean' },
        type: { type: 'string', enum: ['PHONE', 'STATIC'] },
      },
    },
  },
  required: [], // Ningún campo es obligatorio según AJV
  additionalProperties: true,
} as const satisfies JSONSchema;

export type POST_Body_privateServicesZenstackBusinessOrderUbication = FromSchema<
  typeof POST_Schema_privateServicesZenstackBusinessOrderUbication
>;


export const PUT_Schema_privateServicesZenstackBusinessOrderUbication = {
  type: 'object',
  properties: {
    name: { type: 'string', minLength: 1 },
    email: { type: 'string', format: 'email' },
    age: { type: 'integer', minimum: 18 },
  },
  required: ['name', 'email', 'age'],
  additionalProperties: false,
} as const satisfies JSONSchema;

export type PUT_Body_privateServicesZenstackBusinessOrderUbication = FromSchema<typeof PUT_Schema_privateServicesZenstackBusinessOrderUbication>;




export const DELETE_Schema_privateServicesZenstackBusinessOrderUbication = {
  type: 'object',
  properties: {
    name: { type: 'string', minLength: 1 },
    email: { type: 'string', format: 'email' },
    age: { type: 'integer', minimum: 18 },
  },
  required: ['name', 'email', 'age'],
  additionalProperties: false,
} as const satisfies JSONSchema;

export type DELETE_Body_privateServicesZenstackBusinessOrderUbication = FromSchema<typeof DELETE_Schema_privateServicesZenstackBusinessOrderUbication>;
