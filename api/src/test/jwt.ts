import * as jose from 'jose';
import { subtle } from 'crypto';
import drgam from 'dgram';


// --- Configuración de tu entorno de Keycloak ---
// DEBES reemplazar estos valores con los de tu configuración de Keycloak
const KEYCLOAK_ISSUER: string = 'https://10.241.157.225:8186/realms/cafebuy-realm';
const KEYCLOAK_AUDIENCE: string = 'account'; // 'audience' del cliente, ej: 'account', 'mi-api', etc.
const JWKS_URI: string = 'https://10.241.157.225:8186/realms/cafebuy-realm/protocol/openid-connect/certs';



/**
 * ⚠️ ADVERTENCIA DE SEGURIDAD IMPORTANTE ⚠️
 * La siguiente línea es necesaria SOLO si Keycloak usa un certificado autofirmado.
 * En un entorno de producción, SIEMPRE debes usar certificados válidos.
 * Descomenta esto solo para desarrollo local si tienes errores de 'UNABLE_TO_VERIFY_LEAF_SIGNATURE'.
 */
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

// Definiendo una interfaz para el payload del JWT para un tipado más fuerte
interface MyJwtPayload extends jose.JWTPayload {
  sub: string;
  name: string;
  roles: string[];
}

/**
 * Esta es tu clave privada. En una aplicación real, NUNCA la pongas directamente en el código.
 * Cárgala de forma segura desde una variable de entorno o un gestor de secretos.
 * Aquí generamos una para que el ejemplo funcione de manera autocontenida.
 */
async function generateRsaKeyPair(): Promise<{ publicKey: CryptoKey; privateKey: CryptoKey }> {
  const { publicKey, privateKey } = await subtle.generateKey(
    {
      name: 'RSA-OAEP',
      modulusLength: 2048,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: 'SHA-256',
    },
    true,
    ['encrypt', 'decrypt'],
  );
  return { publicKey, privateKey };
}

/**
 * Simula la creación de un JWE por parte de Keycloak.
 * Keycloak usaría la clave pública de tu cliente para cifrar el payload.
 * @param publicKey - La clave pública para cifrar.
 * @returns El token JWE como string.
 */
async function createEncryptedToken(publicKey: jose.CryptoKey): Promise<string> {
  console.log('1. Simulando la creación de un JWE por Keycloak...');

  const payload: MyJwtPayload = {
    sub: '1234567890',
    name: 'John Doe',
    iat: Math.floor(Date.now() / 1000),
    roles: ['user', 'reader'],
  };

  const jwe = await new jose.EncryptJWT(payload)
    .setProtectedHeader({ alg: 'RSA-OAEP-256', enc: 'A256GCM' }) // Algoritmos de cifrado
    .setIssuedAt()
    .setIssuer(KEYCLOAK_ISSUER)
    .setAudience(KEYCLOAK_AUDIENCE)
    .setExpirationTime('5m')
    .encrypt(publicKey);

  console.log('   -> JWE creado.\n');
  return jwe;
}

/**
 * Descifra un JWE y verifica sus claims (issuer, audience).
 * @param token - El token JWE recibido del cliente.
 * @param privateKey - Tu clave privada para descifrar.
 * @returns El payload y la cabecera del token.
 */
async function verifyAndDecryptToken(
  token: string,
  privateKey: jose.CryptoKey,
): Promise<{ payload: jose.JWTPayload; protectedHeader: jose.JWEHeaderParameters }> {
  console.log('2. Descifrando y verificando el JWE en tu API...');

  try {
    const { payload, protectedHeader } = await jose.jwtDecrypt(token, privateKey, {
      issuer: KEYCLOAK_ISSUER,
      audience: KEYCLOAK_AUDIENCE,
    });

    console.log('   -> ✅ Token descifrado y verificado con éxito!');
    return { payload, protectedHeader };
  } catch (error) {
    if (error instanceof Error) {
        console.error('   -> ❌ Error al verificar o descifrar el token:', error.message);
    } else {
        console.error('   -> ❌ Error desconocido al verificar o descifrar el token:', error);
    }
    throw error;
  }
}


async function main() {
  // --- Flujo principal de ejecución ---
  try {
    // Generamos el par de claves (en un caso real, tú solo tendrías la privada)
    const { publicKey, privateKey } = await generateRsaKeyPair();

    // 1. Simulamos que Keycloak crea un token cifrado con nuestra clave pública
    const jweToken = await createEncryptedToken(publicKey);
    console.log('   Token JWE (esto es lo que tu cliente enviaría a la API):\n   ' + jweToken + '\n');

    // 2. Tu API recibe el token y usa su clave privada para descifrarlo
    const { payload, protectedHeader } = await verifyAndDecryptToken(jweToken, privateKey);

    console.log('\n--- Resultados ---');
    console.log('Cabecera protegida (algoritmos):', protectedHeader);
    console.log('Payload descifrado (contenido del token):', payload);
    console.log(`Accediendo a un campo tipado del payload -> Rol: ${ (payload as MyJwtPayload).roles[0] }`);
    console.log('------------------');
  } catch (e) {
    console.log('\nEl proceso falló.');
  }
}

main();
