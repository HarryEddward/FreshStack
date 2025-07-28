---
sidebar_position: 1
---

# Roadmap Features

- ✅ Caracteritica App Web para abrir el visor de pedidos del Dasboard Web App
- 🏗️ Añadir empleados en el Users deade la Web App (generando sublicencias únicas desde la licencia de la empresa)
- 🏗️ Iterar sublicencias de los empleados como QR en el Web App Dashboard abajo de la vista del TPV (2025/7/19)
- 🏗️ Crear ID's temporales para los pedidos en la Client App al apretar el botón que redirige al Payment (2025/7/21)
- 🏗️ Crear actualizaciónes por CSR hacia la API de Fastify por Prisma sobre el pedido al modificar la cesta en la Client App (2025/7/21)
- 🏗️ Comprobar actualizaciónes en Client App para verificar si se creo el pago por el último ID Temporal del Pedido, para pasar a la pantalla de finalización del pedido. Se aplicaría temporalmente en Redis y en la Employee App al verificarse se haría un pedido verificado gaurdado como regitro en Prisma (2025/7/21)
- 🏗️ El employee app investiga la ID Temporal del Pedido para saber el Phone ID del cliente de Redis, para formalmente crear en Prisma el pedido a pagar, ya verificado. (2025/7/21)
- 🏗️ Crear funcionalidad para crear registros de llamadas temporales por Redis en el Client App, para en futuro usarse en el panel de control. (2025/7/21)