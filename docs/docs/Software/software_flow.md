---
sidebar_position: 3
---

# 🟢 Software Flow

En esta sección se describe el flujo del software desde la perspectiva del cliente (consumidor final), que es la parte crítica del sistema, y del staff, que gestiona los pedidos. Este flujo asegura una experiencia intuitiva y un procesamiento eficiente.

```mermaid
flowchart TB
    User
    App[Client App]
    TPV[Received Order in Web Panel]:::tpv
    Email[Ingress Email]:::email
    Cart[Products Selected]
    Transaction{Success Transaction?}:::transaction
    Order[Creating Order]:::order
    OrderVerify[Verify Order Coherence]:::order_verify
    OrderProcess[Processing The Order]:::order_process
    OrderSend[Send Order with Ticket & Barcode]:::order_send
    OrderFinished[Finished Order]:::order_finished
    NotifyOrderFinished[Notify Order Finished]:::notify_order_finished
    Ticket{Ticket Delivery Method}:::ticket
    GenerateBarcode[Generate Barcode]:::generate_barcode

    classDef ticket stroke:#f00
    classDef email stroke:#f00
    classDef transaction stroke:#f00
    classDef order stroke:#f00
    classDef order_finished stroke:#f00
    classDef tpv stroke:#0a8cff
    classDef notify_order_finished stroke:#0a8cff
    classDef generate_barcode stroke:#f00
    classDef order_send stroke:#f00

    subgraph Client
        User
        App
        subgraph ClientApp
            Email
            Cart
            Transaction
            Order
            OrderVerify
            subgraph TicketGraph[Ticket Processor]
                SendEmail[Email]
                SendPhysical[Thermal Receipt Printer]
                Ticket --> |Envía ticket digital al email| SendEmail
                Ticket --> |Entrega ticket físico con el pedido| SendPhysical
            end
        end
    end
    subgraph Staff
        subgraph StaffWeb
            TPV
            OrderProcess
            OrderSend
            GenerateBarcode
        end
        subgraph StaffApp
            OrderFinished
            NotifyOrderFinished
        end
    end

    User ==> |Accede a la app| App
    App ==> |Ingresa su email para registro y ticket digital| Email
    Email ==> |Elige tipo de ticket| Ticket
    Ticket ===> |Selecciona productos| Cart
    Cart ==> |Intenta realizar la transacción| Transaction

    Transaction ---> |Falla: 3 intentos más, espera 10s entre cada uno| Cart
    Transaction ==> |Éxito: crea el pedido| Order

    Order --> |Verifica coherencia de productos con la BD - propiedades ACID| OrderVerify
    OrderVerify ==> |Notifica al panel de control| TPV
    TPV ==> |El staff prepara el pedido| OrderProcess
    OrderProcess ==> |Procesa el pedido y genera ticket/barcode| OrderSend
    OrderSend --> |Procesa entrega del ticket| TicketGraph
    OrderSend --> |Genera código de barras para el cliente| GenerateBarcode
    GenerateBarcode ==> |Muestra barcode en StaffWeb| OrderSend
    OrderSend ==> |El staff escanea el barcode| OrderFinished
    OrderFinished -.-> |Notifica al cliente y staff - asíncrono | NotifyOrderFinished
```

Los nodos con **bordes rojos son críticos**: fallos en Email, Transaction, Order, Ticket o OrderFinished pueden colapsar el sistema.
Los nodos con **bordes azules son no críticos pero mejoran la experiencia**: TPV notifica al staff, GenerateBarcode y NotifyOrderFinished agilizan y completan el flujo.
Razones críticas: "Email" asegura identificación, "Transaction" valida pagos, "Order" crea el pedido, "Ticket" entrega comprobantes, "OrderFinished" cierra el flujo.

## ¿Por qué se completa el pedido con un código del staff?
Para resolver problemas de organización e identificación: el email se crea solo tras una transacción exitosa, y el pedido no se completa hasta que el staff escanea un código de barras único generado por el sistema.

### ¿Por qué este enfoque?
Para evitar que personas inmaduras o niños "trasteen" creando identificadores falsos, lo que podría saturar la base de datos con datos innecesarios o marcar pedidos ya realizados por error, empeorando el flujo.