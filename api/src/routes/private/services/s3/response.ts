import { globalResponseStatuses } from "@/schemas/responses";
import { StatusCodes } from "http-status-codes";
import { FromSchema, JSONSchema } from "json-schema-to-ts";

// Esquema global para todas las respuestas
export const GET_OK_ResponseSchema_privateS3 = {
    type: 'string',
    format: 'binary',
    description: 'Archivo binario devuelto como stream',
} as const satisfies JSONSchema;

export type GET_OK_ResponseSchema_privateS3_Schema = FromSchema<typeof GET_OK_ResponseSchema_privateS3>;



export const GET_Response_privateS3 = {
    ...globalResponseStatuses,
    [StatusCodes.OK]: GET_OK_ResponseSchema_privateS3,
};
