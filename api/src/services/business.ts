import { ApiError } from "@/utils/error";
import { FastifyRequest } from "fastify";
import { StatusCodes } from "http-status-codes";


export function businessIdVerify(request: FastifyRequest) {
    const businessId: string | undefined = request.session.get('business_id');

    if (!businessId) {
        throw new ApiError(
            "UNAUTHORIZED",
            "No se ha encontrado el ID del negocio en la sesión.",
            StatusCodes.UNAUTHORIZED
        );
    };

    return businessId;
}