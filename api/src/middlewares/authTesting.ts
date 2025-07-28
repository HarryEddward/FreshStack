// @/src/middlewares/authTesting.ts

import config from "@/config";
import { FastifyReply, FastifyRequest, HookHandlerDoneFunction, onRequestAbortAsyncHookHandler } from "fastify";
import status from "http-status";
import { StatusCodes } from "http-status-codes";
import { JWTPayload } from "jose";
import { createHmac } from 'crypto';
import { Session } from "@mgcrea/fastify-session";
const { serialize, parse } = require('@fastify/cookie');

export async function authTesting(request: FastifyRequest, reply: FastifyReply) {
    console.log("Auth testing middleware!");


    try {

        const cookies = request.cookies;

        const hasCookies = Object.keys(cookies).length > 0;
        const authHeader = request.headers.authorization;
        const hasJwt = authHeader && authHeader.startsWith('Bearer ');

        // ✅ Generar el token (firmar)
        /*
        const token = await reply.server.jwt.sign({
            session_id: "LXFoanZUVUt3R3ppY0N1ZGhYVzVz.eQbgQ%2FlNLyZjPQ4mI9ijqVKCtSr60K%2BT8aCWjHX5xiE",
        },
        { expiresIn: "30d" });

        console.log("Token generado:", token);
        // ✅ Verificar el token (firma válida y no expirado)
        try {
            const verified = request.server.jwt.verify(token);
            console.log("Verified JWT:", verified);
        } catch (err) {
            console.error("Token inválido:", err);
        }

        // ✅ Decodificar sin verificar
        const decoded = request.server.jwt.decode(token);
        console.log("Decoded JWT (sin verificar):", decoded);

        console.log(JSON.stringify({ token, decoded }));
        */

        if (hasCookies && hasJwt) {
            return reply.code(StatusCodes.BAD_REQUEST).send({
            v: config.currentApiVersion,
            method: request.originalUrl,
            meta: {},
            data: {},
            error: {
                code: status[`${StatusCodes.BAD_REQUEST}_NAME`] || 'BAD_REQUEST',
                message: 'Cannot provide both cookies and JWT token',
            },
            });
        }

        if (!hasCookies && !hasJwt) {
            return reply.code(StatusCodes.UNAUTHORIZED).send({
                v: config.currentApiVersion,
                method: request.originalUrl,
                meta: {},
                data: {},
                error: {
                    code: status[`${StatusCodes.UNAUTHORIZED}_NAME`] || 'UNAUTHORIZED',
                    message: 'Must provide cookies or a JWT token',
                },
            });
        };

        if (hasCookies) {
            const signedSessionId = cookies.sessionId;
            console.log('Session ID from session:', signedSessionId);

    
            
            if (!signedSessionId) {
                return reply.code(StatusCodes.UNAUTHORIZED).send({
                    v: config.currentApiVersion,
                    method: request.originalUrl,
                    meta: {},
                    data: {},
                    error: {
                    code: status[`${StatusCodes.UNAUTHORIZED}_NAME`] || 'UNAUTHORIZED',
                    message: 'Invalid or missing session ID',
                    },
                });
            }

        }

        if (hasJwt) {


            try {
                try {
                    const payload = await request.jwtVerify<{ session_id: string }>();
                    const sid = payload.session_id;

                    console.log("SessionId: ", sid);

                    const signedSessionId = request.server.signCookie(sid);

                    // Update request.cookies for @mgcrea/fastify-session
                    request.cookies.sessionId = signedSessionId;

                    // Set the signed sessionId cookie in the response
                    reply.setCookie('sessionId', signedSessionId, {
                        secure: false,
                        httpOnly: true,
                        maxAge: 86400 * 1000,
                        path: '/',
                    });

                    console.log('Signed sessionId from JWT:', signedSessionId);

                    const cookie = serialize('sessionId', signedSessionId, {
                        maxAge: 60_000,
                    })

                    reply.header('Set-Cookie', cookie);
                    return;


                } catch (err) {
                    return reply.code(StatusCodes.UNAUTHORIZED).send({
                        v: config.currentApiVersion,
                        method: request.originalUrl,
                        meta: {},
                        data: {},
                        error: {
                            code: status[`${StatusCodes.UNAUTHORIZED}_NAME`] || 'UNAUTHORIZED',
                            message: 'The sign of the JWT is invalid or are a bad decoded.',
                        },
                    });
                }

            } catch (err) {
                return reply.code(StatusCodes.UNAUTHORIZED).send({
                    v: config.currentApiVersion,
                    method: request.originalUrl,
                    meta: {},
                    data: {},
                    error: {
                    code: status[`${StatusCodes.UNAUTHORIZED}_NAME`] || 'UNAUTHORIZED',
                    message: `Invalid or expired JWT token: ${(err as Error).message}`,
                    },
                });
                
            } finally {
                
            }
        }

        
        
    } catch (err) {
        
    } finally {
        
    }

    
}
