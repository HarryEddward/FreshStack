import { ApiError } from "@/utils/error";
import { FastifyRequest, FastifySchemaCompiler } from "fastify";
import { FastifyRouteSchemaDef } from "fastify/types/schema";
import { StatusCodes } from "http-status-codes";


export function multipartJsonData(
    data: string,
    request: FastifyRequest,
    schemaValidator: FastifyRouteSchemaDef<any>
) {

    let parsedData: unknown;
    try {
        parsedData = JSON.parse(data);
    } catch (err) {
        throw new ApiError(
        "INVALID_JSON",
        "El json proporcionado es invalido.",
        StatusCodes.BAD_REQUEST
        )
    }
    
    console.log(parsedData);
    
    let validate;
    if (typeof request.server.validatorCompiler === 'function') {
        validate = request.server.validatorCompiler(schemaValidator);
    } else {
        throw new ApiError(
        "VALIDATION_ERROR",
        "La validación sobre los datos a sido erronea.",
        StatusCodes.BAD_REQUEST
        )
    };
    
    const isValid = validate({
        data: parsedData,
    });
    console.log(isValid);
    
    
    if (!isValid) {
        throw new ApiError(
        "VALIDATION_ERROR",
        validate?.errors ? JSON.stringify(validate.errors) : "Unknown validation error",
        StatusCodes.BAD_REQUEST
        )
    }


    return parsedData;

}