# 🟡 Backend Sessions

En esta sección se habla la gestión de sessiones con enfoque multipropoito, explicando la unificación de las mismas sesiones y el tipo que se utilizan en cada tipo de plataforma.


## Tipo de sesión global
#### - Stateful (con Redis como base de datos caché)

### Sesión por Cookies
- **Encriptación**: HMAC-SHA256 + AES-CGM
- **Clave Secreta**
- **Nombre de la Cookie**
- **Prefijo de la Sesión**

### Sesión por JWT
- **Encriptación**: RS256 (JWT)
- **Clave Secreta**
- **Data**:
  - session_id

## Unificación de sesiones multiproposito

```mermaid
flowchart TB
    

    subgraph Cookies["Cookies (HttpOnly)"]
        direction LR

        client_web_cookies["Cliente Web"]

        framework_fresh_cookies["Fresh"]
        session_redis_cookies["Redis"]
        api_fastify_cookies["Fastify"]

        client_web_cookies --> framework_fresh_cookies
        framework_fresh_cookies --> api_fastify_cookies
        framework_fresh_cookies --> |Stateful| session_redis_cookies

        api_fastify_cookies --> |Stateful| session_redis_cookies
    end

    subgraph JWT["JWT (Json Web Token)"]
        direction LR
        client_app_jwt["Cliente App (CSR)"]

        session_redis_jwt["Redis"]
        api_fastify_jwt["Fastify"]

        client_app_jwt --> api_fastify_jwt
        api_fastify_jwt --> |Stateful| session_redis_jwt
    
    end

```
---

## Validación de sesiones

Aclarar una cosa, al tener las sesiones de forma stateful, tendríamos las sesiones de forma sincornizada a la hora de gaurdar los tokens, tendríamos mas facilidad de refrescar los tokens de forma fiable y centralizada.

Si tuveriamos que hacer un refresh, centralizaríamos desde la refrencia del session id, dentro refrescariamos o eliminariamos todo lo necesario de los tokens.

### Por cookies
##### Pasos:
1. Verifica si tiene la cookie
2. Si la tiene, obtiene su session id
3. De la session intentara extraer los tokens
4. Validará los tokens
5. Si fué exitoso la validación, realizara la petición

##### Flujo de autenticación
```mermaid
flowchart LR

    exists_cookie{"Existe la cookie?"}
    obtain_session_id_from_cookie["Obtiene el Session ID"]
    exists_tokens_from_session_id{"Existe los tokens de la sesión?"}
    verify_tokens_from_session_id{"Los tokens de la sesión son validas?"}
    verify_tokens_from_session_id_attempt_refresh_token{"Genera nuevos tokens validos, al refrescar el token refresh_token?"}
    make_the_request["Realiza la petición"]
    error_processing_request["Error al procesar la petición"]

    exists_cookie --> |Caso exitoso| obtain_session_id_from_cookie
    
    obtain_session_id_from_cookie --> |Caso exitoso| exists_tokens_from_session_id
    obtain_session_id_from_cookie --> |Caso fallido| error_processing_request

    exists_tokens_from_session_id --> |Caso exitoso| verify_tokens_from_session_id
    exists_tokens_from_session_id --> |Caso fallido| error_processing_request
    
    verify_tokens_from_session_id --> |Caso exitoso| make_the_request
    verify_tokens_from_session_id --> |Caso fallido| verify_tokens_from_session_id_attempt_refresh_token
    verify_tokens_from_session_id_attempt_refresh_token --> |Caso fallido| error_processing_request
    verify_tokens_from_session_id_attempt_refresh_token --> |Caso exitoso| make_the_request

```


### Por JWT
##### Pasos:
1. Verifica la validación del JWT
2. Si fúe exitoso, obtiene el session id
3. Realiza la petición entrante


##### Flujo de autenticación
```mermaid
flowchart LR

    exists_jwt{"Existe el token JWT?"}
    jwt_verify_tokens_from_session_id{"Los tokens de la sesión son validas?"}
    jwt_verify_tokens_from_session_id_attempt_refresh_token{"Genera nuevos tokens validos, al refrescar el token refresh_token?"}
    exists_session_id{"Existe el ID de la sesión dentro del JWT"}
    verify_tokens_from_session_id{"Los tokens de la sesión son validas?"}
    verify_tokens_from_session_id_attempt_refresh_token{"Genera nuevos tokens validos, al refrescar el token refresh_token?"}
    make_the_request["Realiza la petición"]
    error_processing_request["Error al procesar la petición"]

    exists_jwt --> |Caso exitoso| jwt_verify_tokens_from_session_id
    jwt_verify_tokens_from_session_id --> |Caso exitoso| exists_session_id
    jwt_verify_tokens_from_session_id --> |Caso fallido| jwt_verify_tokens_from_session_id_attempt_refresh_token
    jwt_verify_tokens_from_session_id_attempt_refresh_token --> |Caso fallido| error_processing_request
    jwt_verify_tokens_from_session_id_attempt_refresh_token --> |Caso exitoso| exists_session_id


    exists_session_id --> |Caso exitoso| verify_tokens_from_session_id
    exists_session_id --> |Caso fallido| error_processing_request
    

    verify_tokens_from_session_id --> |Caso exitoso| make_the_request
    verify_tokens_from_session_id --> |Caso fallido| verify_tokens_from_session_id_attempt_refresh_token
    verify_tokens_from_session_id_attempt_refresh_token --> |Caso fallido| error_processing_request
    verify_tokens_from_session_id_attempt_refresh_token --> |Caso exitoso| make_the_request


```