import config from "@/config";
import { FastifyReply, FastifyRequest } from "fastify";
import { StatusCodes } from "http-status-codes";

export function sendSuccess<T>(
    reply: FastifyReply,
    request: FastifyRequest<{ Body: T }>,
    data: Record<string, unknown> = {},
    code: number = StatusCodes.OK
  ) {
    return reply.code(code).send({
      v: config.currentApiVersion,
      method: requestPath(request.originalUrl),
      meta: {},
      data,
      error: {}, // opcional: estructura vacía por convención
    });
}
  



export function requestPath(route_path: string) {
  // 0. Quitar la query string (todo lo que venga después de '?')
  let path = route_path.split('?')[0];

  // 1. Quitar la primera barra si está al inicio
  path = path.startsWith('/') ? path.slice(1) : path;

  // 2. Quitar la barra final si está al final
  path = path.endsWith('/') ? path.slice(0, -1) : path;

  // 3. Reemplazar todas las demás barras por puntos
  path = path.replace(/\//g, '.');

  return path;
}
