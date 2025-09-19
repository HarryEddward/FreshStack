
export const resolveMimeType = (fileName: string): "image/webp" | "application/pdf" => {
    
    switch (fileName) {
        case 'WEBP':
            return 'image/webp';
        case 'PDF':
            return 'application/pdf';
        default:
            throw new Error('INVALID_MIME_TYPE');
    }
}