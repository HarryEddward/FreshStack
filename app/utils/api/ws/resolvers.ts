export function resolvePath(dot_path: string): string {
  // 0. Eliminar todo lo que hay a partir del signo de pregunta (incluido)
  const cleanPath = dot_path.split('?')[0];

  // 1. Reemplazar puntos por barras
  let path = cleanPath.replace(/\./g, '/');

  // 2. Asegurar que empieza con una barra
  if (!path.startsWith('/')) {
    path = '/' + path;
  }

  return path;
}


  export function requestPath(route_path: string) {
    // 1. Quitar la primera barra si está al inicio
    let path = route_path.startsWith('/') ? route_path.slice(1) : route_path;
  
    // 2. Quitar la barra final si está al final
    path = path.endsWith('/') ? path.slice(0, -1) : path;
  
    // 3. Reemplazar todas las demás barras por puntos
    path = path.replace(/\//g, '.');
  
    return path;
}