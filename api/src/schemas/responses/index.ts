import { StatusCodes } from "http-status-codes";
import { FromSchema, JSONSchema } from "json-schema-to-ts";
import { globalResponseSchema } from "@/schemas";



// Variable con todos los códigos de estado
export const globalResponseStatuses: Record<number, JSONSchema> = {
    [StatusCodes.OK]: globalResponseSchema,
    [StatusCodes.CREATED]: globalResponseSchema,
    [StatusCodes.BAD_REQUEST]: globalResponseSchema,
    [StatusCodes.UNAUTHORIZED]: globalResponseSchema,
    [StatusCodes.FORBIDDEN]: globalResponseSchema,
    [StatusCodes.NOT_FOUND]: globalResponseSchema,
    [StatusCodes.INTERNAL_SERVER_ERROR]: globalResponseSchema,
} as const;