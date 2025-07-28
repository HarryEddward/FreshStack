# 🟡 Order Flow App Client Logic

En esta sección explica los flujos de pedidos a través que maneja la app del cliente al resultado final para evitar incoherencias o redundancias del mismo sistema en otras plataformas. Se explica todas las funciones creadas relacionadas en el flujo que se hace para los pedidos.

```mermaid
flowchart TB
    Init["App de los clientes"]
    TypesInitOrders["Tipos de creación de pedidos"]

    subgraph ClientApp["App del cliente"]
        subgraph ManualOrder["Manual"]
            ClientOrderEmployee["Cliente llama al empleado y pide el pedido"]
        end

        subgraph AutomatizatedOrder["Automatizated"]
            LandingPageForm["Formulario previo desde la página de inicio"]
            ProductsSelectionPage["Página de Selección de Productos"]
            PaymentPage["Página de Pago"]
            TransactionPage["Página de Transacción"]
            TransactionPageSuccess{"Existosa?"}
            TransactionPageSuccessful["Crea el pedido"]
            TransactionPageFailed["No crea el pedido"]
            MakeOrderIsFailed{"Hubo un error?"}
            MakeOrderInternalFailed["Error Interno?"]
            MakeOrderInternalFailedStep["Reembolso urgente automatizado por devops en backend"]
            MakeOrderClientFailed["Fallo del cliente?"]
            MakeOrderClientFailedStep["Reembolso manual en la app del empleado"]
            MakeOrderSuccessful["Genera código de barras"]
            EndOrderFromEmployee["Empleado escanea & Finaliza el pedido"]
            ObtainTicket["Recibe la factura el cliente"]

            LandingPageForm -->|Seleccionar productos a pedir desde la página, seguira con el pedido si escojio algún producto| ProductsSelectionPage
            ProductsSelectionPage -->|Solo sigue con el pedido si tiene productos en la cesta y son validos los datos de la tarjeta bancaria| PaymentPage
            PaymentPage --> TransactionPage
            TransactionPage --> TransactionPageSuccess
            TransactionPageSuccess --> TransactionPageFailed
            TransactionPageFailed -->|Al fallar reintentará el pagamiento y por defecto lo reenviará a la página de productos| ProductsSelectionPage
            TransactionPageSuccess --> TransactionPageSuccessful
            TransactionPageSuccessful -->|Enseña el id del pedido en el código de barras| MakeOrderSuccessful
            MakeOrderSuccessful -->|El empleado escanea en la appel código de barras| EndOrderFromEmployee
            EndOrderFromEmployee -->|Puede ser híbrido como email o con la impresora física| ObtainTicket
            
            TransactionPageSuccessful --> MakeOrderIsFailed
            MakeOrderIsFailed -->|En alta demanda los pedidos o reembolso se pueden postergar| MakeOrderClientFailed
            MakeOrderClientFailed -->|Causas de desconexión repentina del internet o cualquier otro motivo| MakeOrderClientFailedStep

            MakeOrderIsFailed --> MakeOrderInternalFailed
            MakeOrderInternalFailed --> MakeOrderInternalFailedStep
            
            
        end

        Init ==> TypesInitOrders
        TypesInitOrders --> ClientOrderEmployee
        TypesInitOrders ----> LandingPageForm
    end

    subgraph EmployeeApp["App del empleado"]
        EmployeeCreatesOrder["El empleado crea el pedido por parte del cliente"]
        EmployeeFinalizeOrder["El empleado apreta el botón de finalización del pedido"]
        FinalizedManualOrder["Orden finalizado"]

        ClientOrderEmployee -->|Apreta un botón para llamar al empleado y ser atendido lo antes posible| EmployeeCreatesOrder
        EmployeeCreatesOrder -->|Lógica interna de la app de la empresa| EmployeeFinalizeOrder
        EmployeeFinalizeOrder --> FinalizedManualOrder
        
    end
```