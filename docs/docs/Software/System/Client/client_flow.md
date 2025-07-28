
# Client Flow

```mermaid
flowchart TB
    User
    Email[Ingress Email]:::email
    Cart[Products Selected]
    Transaction{Success Transaction?}:::transaction
    Order[Creating Order]:::order
    OrderVerify[Verify Order Coherence]:::order_verify
    OrderSend[Obtain Barcode]:::order_send
    OrderFinished[Finished Order]:::order_finished
    NotifyOrderFinished[Notify Order Finished]:::notify_order_finished
    Ticket{Ticket Delivery Method}:::ticket
    GenerateBarcode[Generate Barcode Order]:::generate_barcode

    classDef ticket stroke:#f00
    classDef email stroke:#f00
    classDef transaction stroke:#f00
    classDef order stroke:#f00
    classDef order_finished stroke:#f00
    classDef tpv stroke:#0a8cff
    classDef notify_order_finished stroke:#0a8cff
    classDef generate_barcode stroke:#f00
    classDef order_send stroke:#f00



    subgraph StaffWeb
        direction TB
        OrderSend
        GenerateBarcode
    end
    
    subgraph ClientApp
        direction TB
        
        Email
        Cart
        Transaction
        Order
        OrderVerify
        OrderFinished
        NotifyOrderFinished
        
        subgraph TicketGraph[Ticket Processor]
        
            SendEmail[Email]
            SendPhysical[Thermal Receipt Printer]
            Ticket --> |Envía ticket digital al email| SendEmail
            Ticket --> |Entrega ticket físico con el pedido| SendPhysical
        end
    end
    
    
    
    

    User ==> |Ingresa su email para registro y ticket digital| Email
    Email ==> |Elige tipo de ticket| Ticket
    Ticket ===> |Selecciona productos| Cart
    Cart ==> |Intenta realizar la transacción| Transaction

    Transaction ---> |Falla: 3 intentos más, espera 10s entre cada uno| Cart
    Transaction ==> |Éxito: crea el pedido| Order

    Order --> |Verifica coherencia de productos con la BD - propiedades ACID| OrderVerify
    OrderVerify -.-> |Pasa al flujo del staff| OrderSend
    OrderSend --> |Genera código de barras para el client| GenerateBarcode
    GenerateBarcode ==> |Muestra barcode en ClientApp| OrderSend
    OrderSend -.-> |El staff escanea el barcode| OrderFinished
    OrderFinished -.-> |Notifica al cliente la finalización del pedido | NotifyOrderFinished
```

*Las flechas con puntos reflejan conexiónes asíncronas y procesos externos