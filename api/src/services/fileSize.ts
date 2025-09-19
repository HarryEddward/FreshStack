import * as crypto from 'node:crypto';
// utils/fileSize.ts

export interface FileSizeInfo {
    bytes: number;
    kb: number;
    mb: number;
    gb: number;
}

/**
 * Convierte bytes a diferentes unidades de medida
 * @param bytes - Tamaño en bytes
 * @returns Objeto con el tamaño en diferentes unidades
 */
export function convertBytes(bytes: number): FileSizeInfo {
    return {
        bytes: bytes,
        kb: bytes / 1024,
        mb: bytes / (1024 * 1024),
        gb: bytes / (1024 * 1024 * 1024)
    };
}

/**
 * Obtiene información del tamaño de un Buffer
 * @param buffer - Buffer del archivo
 * @returns Información del tamaño del archivo
 */
export function getFileSize(buffer: Buffer): FileSizeInfo {
    return convertBytes(buffer.length);
}

/**
 * Valida si un archivo excede el tamaño máximo permitido
 * @param buffer - Buffer del archivo
 * @param maxSizeMB - Tamaño máximo en MB
 * @returns true si el archivo es válido, false si excede el límite
 */
export function validateFileSize(buffer: Buffer, maxSizeMB: number): boolean {
    const fileSize = getFileSize(buffer);
    return fileSize.mb <= maxSizeMB;
}

/**
 * Formatea el tamaño del archivo a una cadena legible
 * @param bytes - Tamaño en bytes
 * @param decimals - Número de decimales (por defecto 2)
 * @returns Cadena formateada (ej: "1.5 MB")
 */
export function formatFileSize(bytes: number, decimals: number = 2): string {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}


export function generateHashFile(buffer: Buffer): string {
    return crypto.createHash('sha256').update(buffer).digest('hex');
}