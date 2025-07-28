import { createCipheriv, createDecipheriv, createHmac, createHash, randomBytes } from 'crypto';
import { Buffer } from 'buffer';

// Esta función deriva una clave de 32 bytes para AES-256 a partir de cualquier secreto.
// Es idéntica a la que usamos en el middleware de Fresh.
function getAesKey(secret: string): Buffer {
    return createHash('sha256').update(secret).digest();
}

/**
 * Cifra datos usando AES-256-GCM.
 * El formato de salida es 'iv:authTag:encryptedData' en hexadecimal.
 * @param data La cadena de texto a cifrar (ej. un objeto JSON stringified).
 * @param secret La clave secreta principal.
 */
export async function encryptData(data: string, secret: string): Promise<string> {
    const secretKey = getAesKey(secret);
    const iv = randomBytes(12); // IV de 96 bits es estándar para GCM.
    const cipher = createCipheriv('aes-256-gcm', secretKey, iv);
    const encrypted = Buffer.concat([cipher.update(data, 'utf8'), cipher.final()]);
    const authTag = cipher.getAuthTag();
    // Concatenamos IV, AuthTag y el dato cifrado para su posterior descifrado.
    return `${iv.toString('hex')}:${authTag.toString('hex')}:${encrypted.toString('hex')}`;
}

/**
 * Descifra datos que fueron cifrados con `encryptData`.
 * @param encryptedData La cadena cifrada en formato 'iv:authTag:encryptedData'.
 * @param secret La clave secreta principal.
 * @returns La cadena de texto original, o null si el descifrado falla.
 */
export async function decryptData(encryptedData: string, secret: string): Promise<string | null> {
    try {
        const secretKey = getAesKey(secret);
        const parts = encryptedData.split(':');
        if (parts.length !== 3) {
            console.error("Decryption error: Invalid encrypted data format.");
            return null;
        }
        const [ivHex, tagHex, encryptedHex] = parts;
        
        const iv = Buffer.from(ivHex, 'hex');
        const authTag = Buffer.from(tagHex, 'hex');
        const encrypted = Buffer.from(encryptedHex, 'hex');

        const decipher = createDecipheriv('aes-256-gcm', secretKey, iv);
        decipher.setAuthTag(authTag);
        
        const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
        return decrypted.toString('utf8');
    } catch (error) {
        console.error("Decryption error:", error);
        return null;
    }
}
