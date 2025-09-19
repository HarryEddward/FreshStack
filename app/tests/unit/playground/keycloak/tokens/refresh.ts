import { config } from '@config/index.ts';
// refresh_token.ts
const url = `${config.keycloakEndpoint}/realms/cafebuy-realm/protocol/openid-connect/token`;

const params = new URLSearchParams();
params.append("grant_type", "refresh_token");
params.append("client_id", "fresh-client-mobile");
// Si usas client_secret, descomenta esta línea y añade tu secreto:
params.append("client_secret", "0b2a990a-65fb-4aa0-9791-ab6f7e4beae3");
params.append("refresh_token", "eyJhbGciOiJIUzUxMiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI5ZDhiNTkxMS05MGNkLTRhMDEtYTJhMi0zMDIyYjM3NTI0OTEifQ.eyJleHAiOjE3NDgwMDY1NzgsImlhdCI6MTc0ODAwNDc3OCwianRpIjoiNjA5ZTE2ZjUtNTM4Ni00NGY2LTgzOWMtZWVhMmMxYjNmNGZkIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MTg3L3JlYWxtcy9DYWZlQnV5IiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo4MTg3L3JlYWxtcy9DYWZlQnV5Iiwic3ViIjoiZDY4MDg1ZTctYzQzNS00YzRkLTg0MDUtZjkzY2MyMTExYTg5IiwidHlwIjoiUmVmcmVzaCIsImF6cCI6ImZyZXNoLWNsaWVudC1tb2JpbGUiLCJzaWQiOiJiYmM3M2UwMi0xZGMwLTQ1MWItYWJhZC0zZjdhYjQ5ODRlMTkiLCJzY29wZSI6Im9wZW5pZCBiYXNpYyB3ZWItb3JpZ2lucyBwcm9maWxlIGVtYWlsIGFjciByb2xlcyJ9.PyRtc1-TaRMSlH8K_NwJrIAVAczpV9TktZBDRqBqNP-wmE5Yzidbus5jZ3QHlkXydKMzyUTH9IxkGE1P8oDwZw");

const response = await fetch(url, {
  method: "POST",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
  body: params.toString(),
});

if (response.ok) {
  const data = await response.json();
  console.log("Token refrescado con éxito:", data);
} else {
  const error = await response.json();
  console.error("Error al refrescar token:", error);
}
