import { main as fetchObtainCredentials } from "./tokens/obtainCredentials.ts";
import { main as fetchLogout } from "./tokens/logout.ts";
import { main as fetchObtainUserInfo } from "./users/info.ts";

import { OAuth2Client } from "jsr:@cmd-johnson/oauth2-client";


const client = new OAuth2Client({
  clientId: "fresh-client-mobile",
  tokenUri: "http://10.241.157.225:8187/realms/CafeBuy/protocol/openid-connect/token",
  authorizationEndpointUri: "http://10.241.157.225:8187/realms/CafeBuy/protocol/openid-connect/auth",
  defaults: { scope: "openid profile email" },
});

try {
  const tokens = await client.ropc.getToken({
    username: "he0780070@gmail.com",
    password: "he0780070@gmail.com",
  });
  console.log(tokens);
} catch (error) {
  console.error("Error:", error);
}

Deno.test("Autenticación: flujo completo con credenciales válidas", async () => {

  const client = new OAuth2Client({
    clientId: "fresh-client-mobile",
    tokenUri: "https://10.241.157.225:8187/realms/CafeBuy/protocol/openid-connect/token",
    authorizationEndpointUri: "https://10.241.157.225:8187/realms/CafeBuy/protocol/openid-connect/auth",
    defaults: { scope: "openid profile email" },
  });
  
  try {
    const tokens = await client.ropc.getToken({
      username: "he0780070@gmail.com",
      password: "he0780070@gmail.com",
    });
    console.log(tokens);
  } catch (error) {
    console.error("Error:", error);
  }

  await fetchObtainCredentials();
  console.log("Se obtuvo los tokens desde un usuario!");

  await fetchObtainUserInfo();
  console.log("Obtuvo la información del usuario!");

  await fetchLogout();
  console.log("Se cerro la sesión correctamente!");
})