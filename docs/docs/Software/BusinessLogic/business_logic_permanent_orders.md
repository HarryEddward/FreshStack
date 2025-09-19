# 🟡 Relación de Pedidos Temporales

Este diagrama muestra la relación entre los modelos involucrados en la creación de pedidos temporales, como `ClientTempOrder`, `ClientTempOrderLine`, `BusinessProduct` y `BusinessOrderUbication`.

```mermaid
erDiagram
    Business {
        string id PK
    }

    BusinessProduct {
        string id PK
        string name
        float unityAmount
    }

    ClientTempOrder {
        string id PK
        string businessId FK
        string phoneId "unique"
    }

    ClientTempOrderLine {
        string id PK
        string orderId FK
        string productId FK
        int quantity
    }

    ClientOrder {
        string id PK
        string businessId FK
        OrderStatus status
    }

    ClientOrderProductLine {
        string id PK
        string orderId FK
        json productSnapshot
        int quantity
    }

    Business ||--|{ ClientTempOrder : "tiene"
    Business ||--|{ ClientOrder : "tiene"
    Business ||--|{ BusinessProduct : "tiene"
    ClientTempOrder ||--o{ ClientTempOrderLine : "contiene"
    BusinessProduct ||--o{ ClientTempOrderLine : "referencia a"
    ClientOrder ||--|{ ClientOrderProductLine : "contiene"

    %% Nota: La relación ClientTempOrder -> ClientOrder es lógica, no física.
```