
// @/src/routes/private/s3/schema.ts

import { FromSchema, JSONSchema } from 'json-schema-to-ts';

export const GET_Schema_privateS3 = {
  type: 'object',
  properties: {
    '*': { type: 'string' },
  }
}

export type GET_Body_privateS3 = typeof GET_Schema_privateS3;



export const POST_Schema_privateS3 = {
    type: "object",
    properties: {
      file: { type: "object" },
      description: { type: "string" },
    }
};

export type POST_Body_privateS3 = typeof POST_Schema_privateS3;



export const PUT_Schema_privateS3 = {
    type: "object",
    properties: {
      file: { type: "object" },
      description: { type: "string" },
    }
};

export type PUT_Body_privateS3 = typeof PUT_Schema_privateS3;




export const DELETE_Schema_privateS3 = {
  type: 'object',
  required: ['file'],
  properties: {
    file: {
      isFile: true,
      type: 'object',
      /*properties: {
        mimetype: { type: 'string', enum: ['image/webp', 'application/pdf'] },
      },
      required: ['mimetype']*/
    }
  },
  additionalProperties: true,
};

export type DELETE_Body_privateS3 = typeof DELETE_Schema_privateS3;
