import FileType from 'file-type';
import { ApiError } from './error';



export const resolveMimeType = (fileName: FileType.FileTypeResult): "WEBP" | "PDF" => {
    const mimeType = fileName.mime;
    switch (mimeType) {
        case 'image/webp':
            return 'WEBP';
        //case 'image/png':
        //    return 'image/png';
        //case 'image/jpeg':
        //    return 'image/jpeg';
        //case 'image/gif':
        //    return 'image/gif';
        case 'application/pdf':
            return 'PDF';
        default:
            throw new ApiError('INVALID_MIME_TYPE', `Tipo de archivo no soportado: ${mimeType}`);
    }
}