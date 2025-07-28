

const excludePathsList: string[] = [
    "/api",
    "/static",
    "/.well-known"
]

export function excludePathsMiddleware(pathname: string): boolean {
    if (excludePathsList.some((path) => pathname.startsWith(path) || pathname === path)) {
        // Si está excluido, pasa directamente al siguiente middleware o handler
        return true;
    }
    return false;
}