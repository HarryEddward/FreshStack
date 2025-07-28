
# 🔵 Backend Architecture & Coding Standards v1.0

En esta sección se definen los estándares de software para programar el backend de este proyecto. La falta de estandarización puede complicar las implementaciones y el mantenimiento, por lo que establecer estas guías desde el inicio asegura un desarrollo consistente y eficiente.

## Backend Standards are presented by:

### API Architecture Standard
- **Arquitectura RESTful**, siguiendo principios de recursos identificados por URI y métodos HTTP estándar (GET, POST, PUT, DELETE).

### API Response Standard
- **LightLike-JSON:API (v1.0)**: Inspirado en JSON:API, pero adaptado a respuestas más ligeras y con menor overhead. Se estandariza el campo `v` para versionado y `method` para trazabilidad.

```typescript
{
    // Request
    // POST /api/v1/public/business
    {
        v: "v1",
        meta: {},
        data: {
            message: "Hi from the API"
        }
    }

    //Response
    {
        v: "v1",
        method: "api.v1.public.business",
        meta: {},
        data: {
            message: "Hi from the API"
        },
        error?: {} | {
            msg: "There was a possible error!",
            code: "SPECIFIC_ERROR"
        }
    }
}
```

### Security Standard

#### OWASP
- **Mod Security** como WAF con reglas básicas para mitigar inyecciones SQL, XSS y CSRF.

#### Authentication
- **OAuth2/OpenID Connect** mediante **Keycloak**, ~~usando JWT para sesiones~~ y **RBAC** con roles como "staff" (confirmación de pedidos) y "cliente" (realización de pedidos).

#### Encryption
- **HTTPS (TLS 1.2/1.3)** para tráfico en red.
- **AES-256** para cifrar datos sensibles en la base de datos (emails, detalles de transacciones).

## Bank Card Image (Recognition Image)
- **Cumplimiento: PCI DSS**, a la lectura de datos sensibles para facilitar pagos pero no a procesar pagos.
- **E2EE (End-to-End Encryption)(Client-Server)**: Los datos sensibles recolectados (si aplica) se encriptan desde el cliente hasta SumUp, sin almacenamiento local.

#### Protection against attacks
- **Rate Limiting**: Máximo 100 peticiones/minuto por IP.
- **CORS**: Restringido a dominios autorizados.
- **Content Security Policy (CSP)**: Previene ejecución de scripts no confiables.

### Development Standard

#### Code Conventions
- **Airbnb Style Guide** para JavaScript/TypeScript, con Prettier y ESLint para enforcement automático.

#### Software Testing
- **Integration Testing** con Jest y Supertest, enfocadas en flujos completos (ej. crear pedido, validar transacción), apuntando a un 80% de cobertura.

#### CI/CD (Continuous Integration & Deployment)
- **Pipelight** para ejecutar tests y builds.
- **Docker Swarm** para orquestar contenedores.
- **Ansible** para provisionar infraestructura.

### Documentation Standards
- **OpenAPI (Swagger)** para documentar endpoints REST, generado automáticamente desde el código con herramientas como swagger-jsdoc.