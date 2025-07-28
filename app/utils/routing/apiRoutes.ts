const STATIC_EXTENSIONS = [
    "/api"
];

// Función para verificar si la ruta es estática
export function isAnApiRoute(url: string): boolean {
    const pathname = new URL(url).pathname;
    return STATIC_EXTENSIONS.some((ext) => pathname.startsWith(ext));
}