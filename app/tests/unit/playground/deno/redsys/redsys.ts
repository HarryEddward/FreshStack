// redsys.ts

/**
 * NOTA SOBRE LA LICENCIA DE USO DEL SOFTWARE
 * (Licencia original de Redsys omitida por brevedad, pero aplicable)
 * ---
 * Adaptación a Deno/TypeScript desde la versión oficial de PHP.
 * ESTA VERSIÓN UTILIZA 'crypto-js' para la criptografía (3DES y HMAC-SHA256).
 */

// Reemplazo de funciones de codificación usando Buffer (Node compatible)
function base64Encode(data: string | Uint8Array): string {
    return Buffer.from(data).toString("base64");
}

function base64Decode(data: string): Uint8Array {
    return new Uint8Array(Buffer.from(data, "base64"));
}

export function base64UrlEncode(data: Uint8Array): string {
    return Buffer.from(data)
        .toString("base64")
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");
}

function base64UrlDecode(data: string): Uint8Array {
    // Agregar relleno si falta
    const padded = data.padEnd(data.length + (4 - data.length % 4) % 4, "=")
        .replace(/-/g, "+")
        .replace(/_/g, "/");
    return new Uint8Array(Buffer.from(padded, "base64"));
}

// Importación de crypto-js desde un CDN compatible con Deno
import CryptoJS from "https://esm.sh/crypto-js@4.2.0";
import { Buffer } from "node:buffer";

/**
 * Convierte un objeto WordArray de crypto-js a un Uint8Array.
 * @param wordArray El WordArray a convertir.
 * @returns El Uint8Array resultante.
 */
function wordArrayToUint8Array(wordArray: CryptoJS.lib.WordArray): Uint8Array {
    const len = wordArray.sigBytes;
    const u8_array = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        u8_array[i] = (wordArray.words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
    }
    return u8_array;
}

export class RedsysAPI {
    private varsPay: Record<string, any> = {};

    public setParameter(key: string, value: any): void {
        this.varsPay[key] = value;
    }

    public getParameter(key: string): any {
        return this.varsPay[key];
    }

    // ============================================================================
    // FUNCIONES AUXILIARES DE CRIPTOGRAFÍA (usando crypto-js)
    // ============================================================================

    private _encrypt3DES(message: string, key: Uint8Array): Uint8Array {
        // Convertir la clave (Uint8Array) y el mensaje (string) a formato WordArray de crypto-js
        const keyWordArray = CryptoJS.enc.Base64.parse(base64Encode(key));
        const messageWordArray = CryptoJS.enc.Utf8.parse(message);
        
        // El IV para Redsys es siempre un vector de 8 bytes nulos
        const iv = CryptoJS.lib.WordArray.create([0, 0]);

        // Cifrar usando TripleDES en modo CBC con padding de ceros
        const encrypted = CryptoJS.TripleDES.encrypt(messageWordArray, keyWordArray, {
            iv: iv,
            padding: CryptoJS.pad.ZeroPadding,
            mode: CryptoJS.mode.CBC,
        });

        // Devolver el texto cifrado como un Uint8Array
        return wordArrayToUint8Array(encrypted.ciphertext);
    }

    private _mac256(data: string, key: Uint8Array): Uint8Array {
        // Convertir la clave (Uint8Array) a formato WordArray de crypto-js
        const keyWordArray = CryptoJS.enc.Base64.parse(base64Encode(key));

        // Calcular el HMAC-SHA256
        const hmac = CryptoJS.HmacSHA256(data, keyWordArray);

        // Devolver la firma como un Uint8Array
        return wordArrayToUint8Array(hmac);
    }

    // ============================================================================
    // FUNCIONES PARA LA GENERACIÓN DE LA PETICIÓN DE PAGO
    // ============================================================================

    public getOrder(): string {
        return this.varsPay['DS_MERCHANT_ORDER'] || this.varsPay['Ds_Merchant_Order'] || "";
    }
    
    public arrayToJson(): string {
        return JSON.stringify(this.varsPay);
    }
    
    public createMerchantParameters(): string {
        const json = this.arrayToJson();
        return base64Encode(json);
    }

    public createMerchantSignature(key: string): string {
        const decodedKey = base64Decode(key);
        const merchantParams = this.createMerchantParameters();
        const diversifiedKey = this._encrypt3DES(this.getOrder(), decodedKey);
        const signature = this._mac256(merchantParams, diversifiedKey);
        return base64Encode(signature);
    }

    // ============================================================================
    // FUNCIONES PARA LA RECEPCIÓN DE NOTIFICACIONES
    // ============================================================================
    
    public decodeMerchantParameters(data: string): string {
        const decoded = base64UrlDecode(data);
        const decoder = new TextDecoder();
        const jsonString = decoder.decode(decoded);
        this.varsPay = JSON.parse(jsonString);
        return jsonString;
    }

    public createMerchantSignatureNotif(key: string, data: string): string {
        const decodedKey = base64Decode(key);

        // Decodificar los parámetros para poder leer el número de pedido.
        // La firma se calcula sobre los datos originales en Base64URL.
        const decodedParamsString = new TextDecoder().decode(base64UrlDecode(data));
        const params = JSON.parse(decodedParamsString);
        const order = params['Ds_Order'] || params['DS_ORDER'] || "";

        const diversifiedKey = this._encrypt3DES(order, decodedKey);
        const signature = this._mac256(data, diversifiedKey);
        return base64UrlEncode(signature);
    }
}