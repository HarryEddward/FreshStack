import { authKeycloakHandler } from "@/middlewares/authKeycloak";
import { FastifyInstance } from "fastify";

module.exports = async function (fastify: FastifyInstance): Promise<void> {
  fastify.addHook('preHandler', authKeycloakHandler);
};