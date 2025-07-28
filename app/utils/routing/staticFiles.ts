const STATIC_EXTENSIONS = [
    ".css",
    ".js",
    ".js.map",
    ".png",
    ".jpg",
    ".jpeg",
    ".gif",
    ".svg",
    ".woff",
    ".woff2",
    ".ttf",
    ".eot",
    ".ico",
    ".html",
];

// Función para verificar si la ruta es estática
export function isStaticRoute(url: string): boolean {
    const pathname = new URL(url, "https://10.241.157.225").pathname;
    return STATIC_EXTENSIONS.some((ext) => pathname.endsWith(ext));
}