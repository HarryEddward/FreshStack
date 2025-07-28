import { createHmac } from "node:crypto";
import console from "node:console";

const secretKey = "4Ft4GmWgvuUY9jRuG7Pxp/IEwzOWKTRRWjdnsDW64NU="; // Asegúrate de que esta clave sea la misma que se usa para firmar las cookies
const cookieValue = 'XKqO1Rx5naUFvAMcBaX74.66bed6a2c8413dbadaadae5c4dee4148dd9000eace71d6cc1f1483129fa57a51'; // <-- Pega aquí el valor de tu cookie

const [sessionId, signatureFromCookie] = cookieValue.split('.');

// Calcula la firma esperada
const hmac = createHmac('sha256', secretKey);
hmac.update(sessionId);
const calculatedSignature = hmac.digest('hex');

// Compara los resultados
console.log(`Session ID: ${sessionId}`);
console.log(`Firma de la cookie:    ${signatureFromCookie}`);
console.log(`Firma calculada por mí: ${calculatedSignature}`);
console.log('¿La firma es válida?', signatureFromCookie === calculatedSignature);