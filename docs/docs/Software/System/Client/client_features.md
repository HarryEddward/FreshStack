
# Client Features

Este documento describe las funcionalidades clave que ofrece la aplicación al cliente final en el contexto de una cafetería de alta rotación. Diseñadas para ser intuitivas, rápidas y efectivas, estas características priorizan la experiencia del usuario mientras optimizan el flujo de pedidos y pagos.

## Filosofía del Cliente

La app está pensada para clientes que buscan rapidez y simplicidad en entornos de alta demanda, como cafeterías cerca de carreteras o en temporada alta. Evitamos opciones innecesarias que puedan ralentizar el proceso, enfocándonos en lo esencial: pedir, pagar y recibir.

## Características Principales

### 1. Registro Rápido con Email
- **Descripción**: El cliente ingresa su email al iniciar el proceso, sirviendo como identificador único y método de entrega para tickets digitales.
- **Beneficio**: Sin necesidad de cuentas complejas o contraseñas, el acceso es inmediato y seguro.
- **Detalles Técnicos**: El email se valida tras una transacción exitosa para evitar registros falsos.

### 2. Selección Intuitiva de Productos
- **Descripción**: Una interfaz simple permite elegir productos (ej. café, bocadillos) y añadirlos al carrito en pocos clics.
- **Beneficio**: Reduce el tiempo de decisión, ideal para clientes con prisa.
- **Detalles Técnicos**: Los productos se cargan desde una base de datos optimizada (PostgreSQL) vía API REST.

### 3. Microtransacciones Resilientes
- **Descripción**: Pago rápido mediante integración con SumUp, con reintentos automáticos en caso de fallo (3 intentos, 10s de espera entre cada uno).
- **Beneficio**: Garantiza que los pagos se completen sin frustrar al cliente, incluso con problemas de red.
- **Detalles Técnicos**: Cumple con propiedades ACID para asegurar consistencia entre cliente y servidor.

### 4. Elección Flexible de Ticket
- **Descripción**: El cliente decide si quiere un ticket digital (enviado por email) o físico (impreso en la cafetería).
- **Beneficio**: Adaptabilidad a preferencias sin complicar el flujo.
- **Detalles Técnicos**: Procesado por un "Ticket Processor" que gestiona ambas opciones de forma asíncrona.

### 5. Visualización de Código de Barras
- **Descripción**: Tras enviar el pedido, la app muestra un código de barras único que el staff escanea para finalizar el proceso.
- **Beneficio**: Conecta al cliente con el staff de forma tangible y eficiente, asegurando trazabilidad.
- **Detalles Técnicos**: Generado por el backend (Fresh) y renderizado en la app con Capacitor.

### 6. Notificación de Pedido Finalizado
- **Descripción**: El cliente recibe una notificación en la app cuando el pedido está listo y entregado.
- **Beneficio**: Cierra el ciclo de la experiencia con claridad, evitando esperas innecesarias.
- **Detalles Técnicos**: Enviada asíncronamente tras el escaneo del código por el staff.

## Características Técnicas del Cliente

- **Entorno Offline**: La app (con Capacitor) guarda transacciones localmente si hay fallos de red, sincronizándolas luego con el servidor.
- **Seguridad**: Comunicación cifrada con HTTPS (TLS 1.2/1.3) y autenticación vía Keycloak (OAuth2).
- **Rendimiento**: Frontend ligero con Fresh y Preact, optimizado para dispositivos en mesas (hasta 8100 RPS sin ajustes adicionales).

## Limitaciones Intencionadas
- **Sin programación de pedidos**: No se permite al cliente definir cuándo quiere el pedido, priorizando la acción inmediata del staff.
- **Sin personalización excesiva**: Opciones limitadas para mantener la simplicidad y velocidad del flujo.

## Beneficios para el Cliente
- **Rapidez**: Pedir y pagar en menos de un minuto, ideal para viajeros o clientes habituales con poco tiempo.
- **Confiabilidad**: Pagos y pedidos procesados sin errores, incluso en picos de demanda.
- **Autonomía**: Funciona en una LAN local, sin depender de internet externa.