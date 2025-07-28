# 🟡 API Overview

En esta sección explica porque se tomo la decisión sobre no juntar la API integrada de Fresh a producción y cuales repercuten sobre sus propias funcionalidades.

---

Al trabajar solo en un proyecto de tal magnitud **no me permito errores de tipados con +30 tablas** en una base de datos. Podría costarme errores simples de consultas de tablas inexistentes durante días o problemas de incoherencias realmente complejo de solucionar.

En este caso Deno es un runtime de JavaScript con muchas cacracteríticas nativas muy buenas, pero aunque es compatible con Node.js no es 100% compatible. Y al usar 2 entornos a la vez de Node.js/Deno en un proyecto de Deno surgen problemas de compatibilidad, porque una cosa es que sea compatible y otra cosa es manejar 2 entornos activos a la vez.

Ok, para manejar tantas tablas de SQL no perdiendo la cabeza, encontre un ORM llamado Prisma, te genera incluso los tipados de las tablas hasta las migraciónes e incluso una web para encontrar información por esquemas Prisma.

---

**Prisma no es del todo compatible con Deno**, y mucho menos en 2 entornos activos difernetes de Javascript.

En el caso de usarse completamente el entorno fullstack de Fresh, opté por hacer un **API-for-Backend (AFB)** a través de una **Arquitectura modular monolítica distribuida** con un servidor API con **Fastify** y otro servidor con manejador de rutas SSR y frontend CSR/SSR con **Fresh**.

## Arquitectura modular monolítica distribuida
### API-for-Backend (AFB)

- ### API Server
  - Fastify (Node.js)

- ### SSR/CSR Web Server
  - Fresh (Deno)


## Que hace la API?
- Valida los datos
- 