import fetch from 'node-fetch';
import https from 'https';
import { CookieJar } from 'tough-cookie';
import fetchCookie from 'fetch-cookie';

// Crear un agente HTTPS que ignore SSL autofirmado (solo para desarrollo)
const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

// Crear un jar de cookies para almacenar y gestionar cookies
const jar = new CookieJar();

// Wrappear fetch para que soporte cookies con el jar
const fetchWithCookies = fetchCookie(fetch, jar);

async function main() {
  // Primera petición (por ejemplo login o healthcheck) que devuelve una cookie
  const response1 = await fetchWithCookies('https://10.241.157.225:3800/api/v1/healthcheck/', {
    method: 'GET',
    agent: httpsAgent,
  });

  // Leer body
  const data1 = await response1.json();

  // Mostrar la respuesta
  console.log('Respuesta primera petición:', data1);

  // Mostrar todas las cookies almacenadas en el jar para la URL
  const cookiesString = await jar.getCookieString('https://10.241.157.225:3800');
  console.log('Cookies almacenadas tras primera petición:', cookiesString);

  // Segunda petición reutilizando las cookies almacenadas (sesión)
  const response2 = await fetchWithCookies('https://10.241.157.225:3800/api/v1/healthcheck/', {
    method: 'GET',
    agent: httpsAgent,
  });

  const data2 = await response2.json();
  console.log('Respuesta segunda petición (con cookie):', data2);
}

main().catch(console.error);
