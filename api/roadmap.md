# Roadmap API

- Crear servicio para realizar verificación compelta para llamar a un camarero desde la App Web (requiere multiples querys de Zenstack)
- Crear un servicio para añadir PDF's con la información de los BusinessSuppliers referenciado con BusinessFile con S3 (Hay que crear mas rutas y para difernetes arhcivos en el supplier para guardar como imagene socmo pdf's)
- Crear un servicio para añadir imagenes a BusinessProducts referenciado de BusinessFile con S3
- Crear un servicio para añadir Documentos legales unicamente en PDF BusinessEmployee referenciado con BusinessFile con S3
- Crear un servicio para crear Pedidos Temporales (requiere multiples querys de Zenstack) desde BusinessTempOrder
- Crear un servicio para aplicar de ClientTempOrder (Pedidos Temporales) a ClientOrder (Pedidos Permanentes)


cafebuy_bp_fastify -n supplier -c privateBusinessWebAppDashboardSupplier -p @/src/routes/private/business/web/app/dashboard/supplier