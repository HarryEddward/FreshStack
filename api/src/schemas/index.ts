import { FromSchema, JSONSchema } from "json-schema-to-ts";

// Esquema global para todas las respuestas
export const globalResponseSchema = {
    type: 'object',
    properties: {
      v: { type: 'string' },
      
      method: { type: 'string' },
  
      meta: {
        type: 'object',
        additionalProperties: true,
      },
  
      data: {
        oneOf: [
          {
            type: 'object',
            properties: {
              message: { type: 'string' },
            },
            required: ['message'],
            additionalProperties: true, // permite más propiedades
          },
          {
            type: 'object',
            additionalProperties: true,
          },
        ],
      },
  
      error: {
        oneOf: [
          {
            type: 'object',
            properties: {
              code: { type: 'string' },
              message: { type: 'string' },
            },
            required: ['code', 'message'],
            additionalProperties: false,
          },
          {
            type: 'object',
            maxProperties: 0, // representa un objeto vacío {}
          },
        ],
      },
    },
    required: ['v', 'method', 'meta', 'data', 'error'],
    additionalProperties: false,
  } as const satisfies JSONSchema;

export type GlobalResponse = FromSchema<typeof globalResponseSchema>;
