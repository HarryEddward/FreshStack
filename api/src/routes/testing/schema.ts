
// @/src/lang/business/man/testing//schema.ts

import { FromSchema, JSONSchema } from 'json-schema-to-ts';

export const GET_Schema_testing = {
  type: 'object',
  properties: {
    name: { type: 'string', minLength: 1 },
    email: { type: 'string', format: 'email' },
    age: { type: 'integer', minimum: 18 },
  },
  //required: ['name', 'email', 'age'],
  additionalProperties: false,
} as const satisfies JSONSchema;

export type GET_Body_testing = FromSchema<typeof GET_Schema_testing>;

export const POST_Schema_testing = {
  type: 'object',
  properties: {
    legalName: { type: 'string', minLength: 1 },
    phone: { type: 'string', maxLength: 18, minLength: 11 },
    email: { type: 'string', format: 'email' },
    registeredAddress: { type: 'string', minLength: 1 },
    countryOfIncorporation: { type: 'string', minLength: 1, maxLength: 5 },
    legalForm: { type: 'string', minLength: 1, maxLength: 30 },
    legalRepresentative: {
      type: 'object',
      properties: {
        full_name: { type: 'string', minLength: 1, maxLength: 80 },
        identification_document: { type: 'string', minLength: 1, maxLength: 80 },
        position: { type: 'string', minLength: 1, maxLength: 80 },
      },
      required: ['full_name', 'identification_document', 'position'],
      additionalProperties: false,
    } 

  },
  required: [
    'legalName',
    'phone',
    'email',
    'registeredAddress',
    'countryOfIncorporation',
    'legalForm',
    'legalRepresentative'
  ],
  
  additionalProperties: false,
} as const satisfies JSONSchema;

export type POST_Body_testing = FromSchema<typeof POST_Schema_testing>;



export const PUT_Schema_testing = {
  type: 'object',
  properties: {
    name: { type: 'string', minLength: 1 },
    email: { type: 'string', format: 'email' },
    age: { type: 'integer', minimum: 18 },
  },
  required: ['name', 'email', 'age'],
  additionalProperties: false,
} as const satisfies JSONSchema;

export type PUT_Body_testing = FromSchema<typeof PUT_Schema_testing>;




export const DELETE_Schema_testing = {
  type: 'object',
  properties: {
    name: { type: 'string', minLength: 1 },
    email: { type: 'string', format: 'email' },
    age: { type: 'integer', minimum: 18 },
  },
  required: ['name', 'email', 'age'],
  additionalProperties: false,
} as const satisfies JSONSchema;

export type DELETE_Body_testing = FromSchema<typeof DELETE_Schema_testing>;
