---
sidebar_position: 2
---

# 🟡 🔄 Software Decisions

**Missing: Falta justificar la decision usar Keycloak mucho mejor, y uso como cache de sesiones con Deno KV**


Este documento describe las decisiones tomadas sobre el software aplicado al negocio de una cafetería, enfocado en mejorar el flujo de caja y la gestión de pedidos, especialmente en temporadas altas. A continuación, justifico cada elección tecnológica, desde el CI/CD hasta el backend, frontend, base de datos y más, considerando un entorno empresarial ligero pero completo.

## Backend - Fresh (Full Stack Framework)

**Decisión**: Elegí Fresh como framework full-stack para el backend por su ligereza, productividad y facilidad para implementar y corregir features en tiempo crítico. Aunque frameworks como FastAPI o Express.js son populares, su peso los hace menos ideales para un servidor on-premise de 8-16 GB de RAM, típico en pequeñas empresas como una cafetería.

**Justificación**: Fresh combina backend y frontend en un solo paquete optimizado, lo que reduce la sobrecarga de recursos. Está construido sobre Deno, que es seguro por defecto (sin node_modules), y su diseño minimalista asegura que el servidor no sufra pérdidas de rendimiento significativas, incluso con un volumen moderado de hasta 130 mesas. Para una cafetería cerca de una carretera con picos de demanda, necesito un backend que responda rápido y sea fácil de mantener, y Fresh cumple con eso. Aparte en vez de usar un  base de datos cache, el mismo Fresh peude cachear las mismas respuestas si hace falta.

### ORM - Prisma
**Decisión**: Usé Prisma como ORM para gestionar la base de datos.

**Justificación**: Prisma ofrece un enfoque moderno y tipado para interactuar con PostgreSQL, lo que reduce errores en el desarrollo y mejora la mantenibilidad. Su integración con TypeScript es fluida, lo que me permite definir modelos de datos claros (como mesas, pedidos y transacciones) con un código limpio y seguro. Además, su rendimiento es óptimo para consultas frecuentes, como las necesarias en una cafetería con alta rotación. Comparado con alternativas como TypeORM o Sequelize, Prisma es más ligero y tiene mejor soporte para entornos empresariales pequeños, además de una comunidad activa que asegura actualizaciones constantes. Para un proyecto escalable a mediano plazo, Prisma me da flexibilidad sin sacrificar velocidad.

## Frontend Web - Fresh (Full Stack Framework)
**Decisión**: Fresh también maneja el frontend web, utilizando SSR (Server Side Rendering) como base y islands de CSR (Client Side Rendering) para interactividad.

**Justificación**: La combinación de SSR y CSR es ideal para una cafetería: SSR asegura tiempos de carga rápidos para los clientes que acceden desde dispositivos en las mesas, mientras que las islands permiten interactividad (como confirmar pedidos o procesar pagos) sin recargar toda la página. Fresh usa Preact, una alternativa ligera a React, logrando hasta 8100 RPS (Requests per Second) sin optimizaciones adicionales. Aunque Fresh es joven (menos de 3 años), su simplicidad y rendimiento lo hacen perfecto para un proyecto escalable pero optimizado. Para una cafetería con picos de uso, esta eficiencia asegura que el sistema no se sature.

## Frontend Mobile - Fresh & Capacitor (Full Stack Framework & Crossplatform App)
**Decisión**: Para la app móvil multiplataforma, combiné Fresh con Capacitor.

**Justificación**: Capacitor reutiliza el frontend de Fresh y lo convierte en una app nativa para iOS y Android vía WebView, ideal para dispositivos en mesas. La mejora clave es su capacidad offline: guarda transacciones localmente en caso de fallos de red, ethernet o luz, y las sincroniza luego con el servidor, verificando pedidos contra transacciones. Esto sigue el patrón ACID (Atomicidad, Consistencia, Aislamiento, Durabilidad) en la interacción cliente-servidor, asegurando fiabilidad.

## CI/CD - Pipelight
**Decisión**: Elegí Pipelight para la automatización de flujos CI/CD.

**Justificación**: Pipelight es una herramienta ligera escrita en TypeScript que permite definir pipelines de forma imperativa y sencilla. Para un proyecto empresarial pequeño, no necesito la complejidad de GitHub Actions o Jenkins. Pipelight me da control total sobre despliegues y automatización (como construir contenedores Docker o actualizar documentación) sin sobrecargar el servidor on-premise. Su enfoque minimalista encaja con la filosofía de este proyecto: eficiencia sin excesos.

## OAuth2/OpenID - Keycloak
**Decisión**: Implementé Keycloak para autenticación con OAuth2 y OpenID.

**Justificación**: Keycloak ofrece un sistema de autenticación robusto y listo para usar, compatible con el flujo Authorization Code with PKCE, ideal para múltiples sesiones en dispositivos de mesas y TPVs. En una cafetería, necesito que los camareros accedan rápido y seguro desde distintos puntos, y Keycloak lo logra sin complicaciones. Su estándar abierto (OAuth2/OpenID) asegura que pueda integrarse con otras herramientas en el futuro, y su ligereza lo hace viable para un entorno on-premise.

## Container - Docker
**Decisión**: Usé Docker para empaquetar la aplicación.

**Justificación**: Docker crea contenedores ligeros y aislados, perfectos para un servidor on-premise o IaaS. Esto asegura que el software sea portable, fácil de instalar y consistente en cualquier entorno. Para una cafetería, donde el hardware puede ser limitado, Docker optimiza los recursos y simplifica actualizaciones.

## Container Orchestrator - Docker Swarm
**Decisión**: Docker Swarm para orquestar los contenedores.

**Justificación**: Swarm es simple y suficiente para una PYME como una cafetería. Comparado con Kubernetes, que es más pesado, Swarm me permite gestionar varios contenedores (backend, base de datos, etc.) en un servidor modesto sin complejidad innecesaria. Es ideal para escalar a mediano plazo si la cafetería crece, pero mantiene los costos y la curva de aprendizaje bajos.

## Database - PostgreSQL (SQL)
**Decisión**: PostgreSQL como base de datos.

**Justificación**: PostgreSQL es optimizado, flexible y tiene una gran comunidad. Para una cafetería, necesito una base de datos que maneje transacciones rápidas (pedidos, pagos) y soporte picos de demanda sin fallar. Su tipado fuerte y extensiones (como PostGIS, si se expande a geolocalización) lo hacen superior a alternativas como MySQL en entornos empresariales. Además, combina perfectamente con Prisma.

## Documentation - Docusaurus + Mermaid Plugin
**Decisión**: Docusaurus con el plugin Mermaid para documentación.

**Justificación**: Docusaurus es rápido, escalable y fácil de usar para documentar el proyecto. Con Mermaid, puedo incluir diagramas (como flujos de pedidos) de forma visual y clara, lo que ayuda a los usuarios (dueños o camareros) a entender el sistema. Es ligero y no requiere servidores pesados, ideal para mi enfoque.

## Metrics - cAdvisor
**Decisión**: cAdvisor para monitoreo de métricas.

**Justificación**: cAdvisor es una herramienta simple para rastrear el rendimiento de los contenedores Docker (CPU, memoria, etc.) en tiempo real. En una cafetería, necesito saber si el servidor está bajo presión durante temporadas altas, y cAdvisor me da esa visibilidad sin complicaciones ni recursos extras.

## Microtransactions - SumUp API
**Decisión**: Integré la API de SumUp para pagos.

**Justificación**: SumUp es una solución de microtransacciones económica y fácil de usar, perfecta para una cafetería con clientes en tránsito. Su API permite procesar pagos desde los dispositivos en las mesas y vincularlos al TPV, agilizando el flujo de caja. Para un negocio cerca de una carretera, donde la velocidad es clave, SumUp es una elección práctica y confiable.

---
#### Author: Adría Martín Martorell - 22 de marzo del 2025 - 3:44AM