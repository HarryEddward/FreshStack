# Business Features

Este documento describe las funcionalidades clave que el sistema ofrece al negocio (cafeterías u hostelería), diseñadas para optimizar la operativa, mejorar el flujo de caja y gestionar alta demanda de forma eficiente. Nos enfocamos en herramientas prácticas que empoderan al staff y al propietario, evitando complejidad innecesaria.

## Filosofía del Negocio
El sistema está construido para transformar el caos de la alta rotación en un flujo ordenado y predecible. Priorizamos la acción activa del staff y la estabilidad financiera del negocio sobre personalizaciones excesivas, asegurando una implementación rápida y un retorno tangible.

## Características Principales

### 1. Gestión de Pedidos en Tiempo Real
- **Descripción**: Los pedidos llegan instantáneamente al panel web del staff (StaffWeb), mostrando detalles como mesa, productos y estado.
- **Beneficio**: Reduce tiempos muertos y errores, permitiendo al staff actuar sin demoras.
- **Detalles Técnicos**: Notificaciones push vía WebSocket desde el backend (Fresh) sobre una LAN segura.

### 2. Procesamiento Eficiente de Pagos
- **Descripción**: Integración con SumUp para microtransacciones automáticas, con opción de pagos manuales en el TPV para flexibilidad.
- **Beneficio**: Mejora el flujo de caja al garantizar pagos rápidos y reducir colas en temporada alta.
- **Detalles Técnicos**: API REST con SumUp, validación ACID y reintentos automáticos (3 intentos, 10s de espera).

### 3. Cierre de Pedidos con Código de Barras
- **Descripción**: El staff escanea un código de barras único desde la app del cliente para marcar el pedido como finalizado.
- **Beneficio**: Evita pedidos incompletos o duplicados, asegurando trazabilidad y control operativo.
- **Detalles Técnicos**: Generación de códigos en el backend y escaneo vía StaffApp con Capacitor.

### 4. Notificaciones Operativas
- **Descripción**: El staff recibe alertas en tiempo real sobre nuevos pedidos y finalizaciones a través de StaffApp y StaffWeb.
- **Beneficio**: Mantiene al equipo sincronizado, incluso en picos de demanda.
- **Detalles Técnicos**: Procesos asíncronos con notificaciones push desde el servidor.

### 5. Autonomía con Infraestructura Local
- **Descripción**: El sistema opera en una LAN (on-premise o IaaS), sin dependencia de internet externa.
- **Beneficio**: Reduce costes variables y asegura funcionamiento continuo ante fallos de red.
- **Detalles Técnicos**: Docker Swarm orquesta contenedores en un servidor ligero (8-16 GB RAM).

### 6. Costes Predecibles
**Descripción**: Modelo SaaS con despliegue autohospedado, evitando comisiones altas de terceros (ej. Vercel, AWS Lambda).
- **Beneficio**: Margen de beneficio estable y planificación financiera clara para el negocio.
- **Detalles Técnicos**: Infraestructura IaC con Ansible y contenedores Docker.

## Características Técnicas del Negocio
- Escalabilidad Ligera: Soporta hasta 130 mesas con un servidor modesto, ampliable con Docker Swarm.
- Seguridad Empresarial: Cifrado AES-256 para datos sensibles, HTTPS (TLS 1.2/1.3) y autenticación RBAC vía Keycloak.
- Monitoreo: Métricas en tiempo real con cAdvisor para detectar cuellos de botella durante alta demanda.

## Limitaciones Intencionadas
- Sin gestión de horarios por cliente: El staff controla el ritmo de los pedidos para maximizar eficiencia operativa.
- Sin integraciones complejas: Evitamos dependencias externas innecesarias para mantener el sistema ligero y autónomo.

## Beneficios para el Negocio
Flujo de Caja Optimizado: Pagos rápidos y confiables incrementan ingresos en temporada alta.
Eficiencia Operativa: Menos errores y retrasos gracias a un flujo claro entre cliente y staff.
Implementación Sencilla: Listo para usar en horas, no semanas, con hardware básico.