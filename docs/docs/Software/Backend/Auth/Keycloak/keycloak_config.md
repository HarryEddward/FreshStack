# 🟡 Keycloak Configuration

Este documento detalla la configuración de Keycloak para el proyecto, incluyendo los flujos de autenticación utilizados en el software del frontend (PWA con Fresh y aplicación móvil con Capacitor) y el backend. Se describen los protocolos, diseños de autenticación, y justificaciones técnicas para garantizar seguridad, escalabilidad y compatibilidad con Single Sign-On (SSO).

## Auth Protocol
El proyecto utiliza **OAuth 2.0** y **OpenID** Connect como protocolos de autenticación:

- **OAuth 2.0**: Gestiona la autorización para acceder a recursos protegidos mediante roles asignados a diferentes tipos de clientes.
- **OpenID Connect**: Verifica la identidad del usuario, construyendo sobre OAuth 2.0 para proporcionar información de autenticación (e.g., `id_token`) y habilitar SSO.
Estos protocolos permiten una gestión segura de sesiones y recursos, asegurando que los usuarios autenticados accedan solo a los recursos autorizados según sus roles.

## Design Frontend Auth
### Flow Auth - Authorization Code with PKCE
### Method Auth: Single Sign-On (SSO)

Para el frontend, que incluye una **PWA** (ejecutada en `http://localhost:8000`) y una aplicación móvil con **Capacitor**, se implementa un flujo con **Authorization Code con PKCE**. Este enfoque permite autenticar usuarios con credenciales directamente desde el backend, mientras se aprovecha la seguridad de PKCE para proteger el intercambio de tokens.

**Justificación**
- **ROPC inicial del servidor web de Keycloack**: Permite autenticar usuarios enviando credenciales (correo y contraseña) al backend, evitando la redirección al formulario de login de Keycloak (`/[lang]/client/app/login`). Esto da mayor control al servidor y cumple con la preferencia de manejar credenciales directamente.

- **Transición a PKCE**: Una vez autenticadas las credenciales, el backend inicia un flujo PKCE generando `code_verifier` y `code_challenge`, lo que añade una capa de seguridad para proteger el `code` sin depender de un `client_secret`.

- **Capacitor**: En la aplicación móvil, los tokens se almacenan de forma segura usando el plugin **capacitor-secure-storage-plugin**, que protege los datos sensibles en el dispositivo. PKCE es ideal para clientes públicos como Capacitor, ya que no requiere un `client_secret`.

- **SSO**: Keycloak habilita SSO, permitiendo que los usuarios autenticados en la PWA o Capacitor accedan a otras aplicaciones del realm `CafeBuy` sin volver a iniciar sesión.

**Flujo Detallado**
1. **Formulario de login**:
El usuario ingresa sus credenciales en `/[lang]/client/app/login` (correo y contraseña).
El frontend envía las credenciales y un `sessionId` (generado con `crypto.randomUUID()`) al backend (`/api/v1/public/oauth/callback`).
1. **Autenticación ROPC**:
El backend envía las credenciales al endpoint `/api/v1/public/oauth/callback` de Keycloak.
Keycloak valida las credenciales, devuelve un `access_token` temporal y el `refresh_token`.
1. **Inicio de PKCE**:
El backend genera `code_verifier`, `code_challenge`, y `state`.
Usa el `access_token` temporal para solicitar un `code` al endpoint `/auth` sin interacción del usuario.
1. **Intercambio de tokens**:
El backend envía el `code` y `code_verifier` al endpoint `/token` para obtener tokens definitivos (`access_token`, `refresh_token`, `id_token`).
Almacena los tokens en cookies HTTP-only.
1. **Redirección**:
Redirige al usuario a `/client` si la autenticación es exitosa, o a `/login` con un error si falla.
1. **Capacitor**:
   - Los tokens se almacenan usando **capacitor-secure-storage-plugin**.
   - Un flujo asíncrono gestiona la autenticación y recuperación de tokens en la WebView.

**Seguridad**
- **Credenciales**: Enviadas desde el frontend al backend a través de HTTPS.
- **SessionId**: Protege contra ataques de repetición, similar a `code_verifier`.
- **Cookies HTTP-only**: Los tokens se almacenan en cookies con atributos `HttpOnly`, `Secure`, y `SameSite=Strict`.
- **PKCE**: Asegura que solo el cliente legítimo pueda intercambiar el `code` por tokens.


## Design Backend Auth
### Flow Auth - Authorization Code without PKCE
Para el backend, que utiliza **Fresh** con Server-Side Rendering (SSR), se implementa el flujo **Authorization Code sin PKCE** para gestionar sesiones de usuarios autenticados en el servidor.

**Justificación**
- **Seguridad del navegador**: Las sesiones en el backend se gestionan con cookies HTTP-only y políticas `SameSite=Strict`, lo que proporciona un nivel de seguridad adecuado para navegadores modernos.
- **SSR con Fresh**: Fresh usa SSR, lo que permite manejar sesiones de forma síncrona a través de cookies, optimizando el flujo de autenticación y reduciendo la latencia.
- **Cliente confidencial**: El backend actúa como un cliente confidencial, usando un `client_secret` almacenado de forma segura en variables de entorno (e.g., `Deno.env.get("CLIENT_SECRET")`).
- **Sin PKCE**: PKCE no es necesario en el backend, ya que el `client_secret` autentica al cliente, y las solicitudes se realizan desde un entorno seguro (servidor).

**Flujo Detallado**
1. **Inicio de sesión**:
El usuario accede a `/login`, que redirige al endpoint `/auth` de Keycloak.
El backend genera un `state` y lo almacena en una cookie.

2. **Autenticación en Keycloak**:
El usuario ingresa sus credenciales en el formulario de Keycloak.
Keycloak redirige a `/callback` con un `code` y `state`.

3. **Validación y tokens**:
El backend valida el `state` y envía el `code` junto con el `client_secret` al endpoint `/token`.
Keycloak devuelve tokens (`access_token`, `refresh_token`, `id_token`).
Los tokens se almacenan en cookies HTTP-only.

4. **Redirección**:
El usuario es redirigido a `/client`, que está protegida por un auth wall.

5. **Auth wall**:
Verifica el `access_token` en cada solicitud a rutas protegidas, consultando el endpoint `/userinfo` de Keycloak.

**Seguridad**
- **Client Secret**: Almacenado en variables de entorno, accesible solo en el servidor.
- **Cookies**: Usan atributos `HttpOnly`, `Secure`, y `SameSite=Strict`.
- **State**: Protege contra ataques CSRF.
- **SSR**: Reduce la exposición de lógica en el frontend.