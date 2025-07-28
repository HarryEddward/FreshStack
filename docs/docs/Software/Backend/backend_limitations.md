# 🟡 Backend Limitations

## Sobrecarga de recursos sobre Paginación por SSR
Fastify no se puede exponer como API sin ninguna seguridad, pero claro implementar doble middleware con keycloak podria tener problemas de latencia o limitaciónes del programa en responder a muchas peticiónes.

Si que la authentication lo genero por el Backend de Fresh solo cuando lo necesito en las páginas por sessiones. Añadir a fastify authentication sería como manejar mucha seguridad inecesaria por sacrificar rendimiento.

Si que Fresh depende de la API de Fastify, y de paso esta desacoplado rinde mejor con el backend rápido de Fastify y escala mucho mejor.

## Dinamismo pesado con Websockets
Al no aplicar CSR al hacer peticiones por API desde el servidor API de Fastify, necesitaríamos usar de algúna manera dinamismo seguro por backend de Fresh. Y la forma es redireccionar funciones de WS por fastify, de forma controlada y segura.
