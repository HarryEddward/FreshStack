
# 🟢 Software Dilemas

En esta sección identificamos los posibles problemas que podrían surgir al usar este sistema. No los ignoramos, porque abordarlos desde el inicio nos permitirá prevenir fallos críticos en el futuro. Anticiparnos a estos riesgos asegura un flujo de pedidos más robusto y confiable.

## Principales Riesgos Identificados

1. **Creación de IDs por Emails Falsos**
   - **Descripción**: Usuarios malintencionados o niños podrían ingresar emails falsos para generar pedidos no válidos, saturando la base de datos con identificadores innecesarios.
   - **Impacto**: Sobrecarga de datos persistentes y confusión en el flujo de pedidos.
   - **Mitigación Inicial**: El email solo se crea tras una transacción exitosa, y el pedido requiere confirmación manual del staff con un código único.

2. **Manejo de Intentos Fraudulentos de Transacciones**
   - **Descripción**: Intentos de pagos con tarjetas robadas o métodos no autorizados podrían interrumpir el sistema o generar pérdidas.
   - **Impacto**: Transacciones fallidas que consumen recursos o pedidos procesados sin pago real.
   - **Mitigación Inicial**: Integración con un sistema en la app confiable con (SumUp)  que valida pagos antes de avanzar en el flujo, y con un sistema de reintentos espaciado por la espera de un tiempo.

3. **Pedidos Realizados No Acabados**
   - **Descripción**: Pedidos que pasan la transacción pero no son confirmados por el staff (por olvido o alta demanda) quedan en un estado limbo.
   - **Impacto**: Retrasos en el flujo y molestias para los clientes.
   - **Mitigación Inicial**: El staff debe introducir un código para finalizar el pedido. Se podría añadir una notificación automática tras 5 minutos sin confirmación.

4. **Recibos No Enviados (Físico o Digital)**
   - **Descripción**: Fallos en el envío de tickets por email (problemas de red) o en la impresora térmica (falta de papel, fallo hardware) podrían dejar al cliente sin comprobante.
   - **Impacto**: Insatisfacción del cliente y pérdida de trazabilidad.
   - **Mitigación Inicial**: Almacenar tickets en la base de datos para reenvío manual si falla el envío automático.
5. **Pagos en físico en vez digitalmente**
   - **Descripción**: Puede no hacerse transacciónes de forma tan automatizada, y tener que hacerlo de forma manual al TPV. De forma que el cliente deba de acudir a la barra a cobrar a través del TPV.
   - **Impacto**: Empeorar el flujo de caja, y el orden por parte de los empleados.
   - **Mitigación Inicial**: Este programa trata de manejar la alta temporada de cafeterías, donde se requiera un mayor flujo de caja y flujo de pedidos, en el caso dependerá del cliente que opción mas le guste.
6. **Altos costes de comisión**
    - **Descripción**: Al usar al negocio, el banco de SumUp, puedes con un plan estandard poder pagar con el TPV una comisión del 1,5%, pero al usar la API de SumUp puede llegar al 1,95% o algo aproximado del 1,6%, no estoy seguro, pero  dentro de pagos dnetro de la EU (cliente) mientras que de un forma intenracional puede llegar al 2,9%.
    - **Impacto**: Puede no ajustarse con el críterio de comsión del negocio, y empeorar el margen de beneficio, o encarecer los precios.
    - **Mitigación Inicial**: Para evitar este tipico problema, debemos de saber que la app esta hecho para el úso de alta temporada para el negocio. Si realmente no hay mucha gente, podríamos permitirnos usar de forma manual el TPV a través del cliente y ahorrarnos un . Pero a veces los fines de semana o el mismo verano para las cafterías centrales puede ser un cahos y esta diseñado para cubir la alta demanda.


## Preguntas Frecuentes

### ¿Por qué se escribe un código al finalizar los pedidos?
Porque existe un problema de organización e identificación: el email solo se crea tras una transacción exitosa, y el pedido no se completa hasta que el staff introduce un código único generado por el sistema (ej. "A123").

#### ¿Por qué este enfoque?
Para evitar que personas inmaduras o niños **"trasteen" creando identificadores falsos**, lo que podría saturar el sistema con datos persistentes innecesarios o marcar pedidos ya realizados por error, empeorando el flujo de trabajo.