import { createHmac } from 'crypto';

const sessionId = 'ZG6CsqKksmtwKIkEvX8nG';
const secret = '4Ft4GmWgvuUY9jRuG7Pxp/IEwzOWKTRRWjdnsDW64NU=';
const encodedSessionId = Buffer.from(sessionId);
const hmac = createHmac('sha256', secret);
hmac.update(encodedSessionId);
const computedSignature = hmac.digest('hex');
console.log('Firma calculada:', computedSignature);

// Fresh signed: 74e6d787cf406714dda1247b3f7c3042ac345487738a7794c0af9b4dc6226987

// Code signed: bb1e19ce0d30607c3c932da6a743174ce02589c3a4b761f9e02ceb096fb5388f

// Fastify signed: 4a4ebfdc9c1571bf813af334437d3ca4aebe0b1cd434cee44ba9ca959a7c8379


/**
 * Esto es lo que me dice en el API: SessionId: ZG6CsqKksmtwKIkEvX8nG
Firma recibida: dc3e38903878f3e8d002f7e7c02adb83feb8c8f31a2f422c89266e15da7b9f41
Firma calculada: 4a4ebfdc9c1571bf813af334437d3ca4aebe0b1cd434cee44ba9ca959a7c8379
La firma es inválida
 */