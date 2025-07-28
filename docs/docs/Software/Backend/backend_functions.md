# 🟡 Backend Functions

Este documento detalla las funciones esenciales que debe cumplir el software "Cafeteria Flow" para la Web del Negocio (StaffWeb), la App del Negocio (StaffApp) y la App del Cliente (ClientApp). Estas funciones se derivan de los flujos descritos en "Software Flow", "Client Flow" y "Business Flow", asegurando que el sistema cubra las necesidades del cliente y el staff de manera eficiente y minimalista.

## Web del Negocio (StaffWeb)
La Web del Negocio es el panel de control que utiliza el staff para gestionar pedidos en tiempo real y coordinar la operativa de la cafetería.

1. **Mostrar pedidos nuevos**
    - Recibir notificaciones instantáneas de los pedidos enviados por los clientes, mostrando mesa (si aplica), productos y estado.
2. **Ver detalles de un pedido**
    - Acceder a la lista de productos, cantidades y preferencias de ticket (digital o físico) de cada pedido.
3. **Marcar pedidos en preparación**
    - Actualizar el estado de un pedido a "en proceso" cuando el staff comienza a prepararlo.
4. **Generar ticket físico**
    - Preparar un ticket imprimible para pedidos que lo requieran, con detalles como productos y total.
5. **Generar código de barras**
    - Crear un código de barras único para cada pedido listo, visible para el staff y el cliente.
6. **Listar pedidos pendientes**
    - Mostrar todos los pedidos activos (no finalizados) en una vista clara para priorizar tareas.
7. **Reenviar ticket digital**
    - Permitir al staff reenviar manualmente un ticket digital al email del cliente si falla el envío inicial.
8. **Ver métricas básicas**
    - Ofrecer un resumen simple de pedidos procesados por hora o ingresos del día (opcional, según roadmap).
9. **Autotraducción de productos**
    - Ofrecer un servicio de traducción automatica a los productos, sin tener que escribir manualmente el nombre de los productos. Con filosofía JIT (Just-In-Time) para solo cargar los recursos necesarios, y no sobrecargar 24/7 con servicios inecesarios.

## App del Negocio (StaffApp)
La App del Negocio es una herramienta móvil para el staff, enfocada en cerrar pedidos y mantener la sincronización con los clientes.

1. **Escanear códigos de barras**
    - Leer el código de barras del cliente con la cámara del dispositivo para marcar el pedido como entregado.
2. **Confirmar entrega de pedidos**
    - Actualizar el estado del pedido a "finalizado" tras el escaneo, cerrando el ciclo.
3. **Recibir notificaciones de finalización**
    - Alertar al staff cuando un pedido se completa, confirmando la entrega exitosa.
4. **Ver pedidos asignados**
    - Mostrar al empleado los pedidos específicos que está manejando en ese momento.
5. **Notificar retrasos (futuro)**
    - Avisar al staff si un pedido lleva demasiado tiempo sin cerrarse (según roadmap).

## App del Cliente (ClientApp)
La App del Cliente permite a los usuarios pedir y pagar de forma rápida y sencilla, interactuando con el staff de manera eficiente.

1. **Ingresar email**
    - Solicitar al cliente su email al inicio como identificador y para enviar tickets digitales.
2. **Elegir tipo de ticket**
    - Permitir al cliente decidir si quiere un ticket digital (email) o físico (impreso por el staff).
3. **Seleccionar productos**
    - Mostrar un catálogo de productos disponibles (ej. café, bocadillos) y permitir añadirlos a un carrito.
4. **Gestionar carrito**
    - Ver los productos seleccionados, ajustar cantidades y confirmar antes de pagar.
5. **Realizar pago**
    - Procesar el pago mediante una integración de microtransacciones (ej. SumUp), con reintentos automáticos si falla.
6. **Crear pedido**
    - Enviar el pedido al sistema tras un pago exitoso, iniciando el flujo del staff.
7. **Mostrar código de barras**
    - Presentar un código de barras único en pantalla para que el staff lo escanee al entregar el pedido.
8. **Recibir notificación de finalización**
    - Alertar al cliente cuando el pedido está listo y entregado, cerrando su experiencia.
9. **Funcionamiento offline (parcial)**
    - Guardar transacciones localmente si no hay red, sincronizándolas cuando vuelva la conexión.
10. **Ver la carta**
    - Poder ver en la pantalla principal la carta como acceso directo sin complicaciónes de ver los productos/servicios.
10. **Inspecciónar la red wifi**
    - Poder ver la contraseña wifi a través de un click a la pantalla de step_before, si wifi, si lo tiene activado poder ver la contraseña wifi.

## Resumen
- #### Web del Negocio (StaffWeb): 8 funciones para gestión operativa y visibilidad.
- #### App del Negocio (StaffApp): 5 funciones para cierre y sincronización móvil.
- #### App del Cliente (ClientApp): 9 funciones para pedido y experiencia del usuario.

### Total: 22 funciones que soportan el flujo completo del sistema.