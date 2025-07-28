# PostgreSQL Tables

Este documento acredita a todas las tablas hechas y usadas p

## All Tables
```mermaid
erDiagram
    MERCHANT {
        string merchant_code PK "Código único del comerciante"
        string company_name "Nombre de la empresa"
        string email "Correo del comerciante"
    }
    CLIENT {
        string client_code PK "Código único del cliente"
        string email "Correo del cliente"
    }
```
```mermaid
erDiagram
    PRODUCT {
        string id PK "ID Único del producto"
        decimal amount "Coste del producto"
        string name "Nombre del producto"
        int stock "Stock disponible"
    }
    ORDER_PRODUCT {
        int order_id PK,FK "ID del pedido"
        int product_id PK,FK "ID del producto"
        int quantity "Cantidad comprada"
        decimal subtotal "Subtotal"
    }
```
```mermaid
erDiagram
    EMPLOYEE {
        string employee_id PK "ID del empleado"
        string merchant_code FK "Código del comerciante"
        string name "Nombre del empleado"
    }
    ORDER {
        string id PK "ID único del pedido"
        string transaction_id FK "ID de la transacción exitosa"
        string code "Código identificador único para finalizar el pedido"
        string status "Estado (ej. finished, pending)"
        datetime timestamp "Fecha y hora"
    }
    TRANSACTION {
        string id PK "ID único de la transacción"
        string merchant_code FK "Código del comerciante"
        string employee_id FK "ID del empleado"
        string client_code FK "ID del cliente"
        decimal amount "Monto"
        string currency "Moneda (ej. EUR)"
        datetime timestamp "Fecha y hora"
        string status "Estado (ej. successful, failed)"
        string checkout_reference "Referencia del pedido"
        string payment_method "Método de pago (ej. tarjeta, PayPal)"
    }
```


## Specific Tables

### Negocio
```mermaid
erDiagram
    MERCHANT {
        string merchant_code PK "Código único del comerciante"
        string company_name "Nombre de la empresa"
        string email "Correo del comerciante"
    }
```

### Cliente
```mermaid
erDiagram
    CLIENT {
        string client_code PK "Código único del cliente"
        string email "Correo del cliente"
    }
```


### Producto
```mermaid
erDiagram
    PRODUCT {
        string id FK "ID Único del producto"
        decimal amount "Coste del producto"
        string name "Nombre del producto"
        int stock "Stock disponible"
        string tags "Metadatos en formato de Etiquetas"
    }
```

### Stock Producto
```mermaid
erDiagram
    PRODUCT {
        string id PK "ID Único del producto"
        int consume_stock "Stock Objetivo"
        string type_unit_consume_measurement "Medida objetivo (unidad, litros, gramos entre muchos otros)"
    }
```

### Cantidad de producto referenciado al Pedido
El producto se referencia al pedido pero no debe de depender de lógica en el stock, ya que opera de forma variable durante el tiempo sin guardar el historial del stock.
La relacion es independiente al estado del stock
```mermaid
erDiagram
    ORDER_PRODUCT {
        int order_id PK,FK "ID del pedido"
        int product_id PK,FK "ID del producto"
        int quantity "Cantidad comprada"
        decimal subtotal "Subtotal"
    }
```

### Empleado
```mermaid
erDiagram
    EMPLOYEE {
        string employee_id PK "ID del empleado"
        string merchant_code FK "Código del comerciante"
        string name "Nombre del empleado"
    }
```

### Pedido
```mermaid
erDiagram
    ORDER {
        string id PK "ID único del pedido"
        string transaction_id FK "ID de la transacción exitosa"
        string code "Código identificador único para finalizar el pedido"
        string status "Estado (ej. finished, pending, canceled)"
        string information_notes "Notas informativas que pueden ayudar al empleado añadir extras al pedido (opcional)"
        string table_served "Mesa entendida"
        string employee_served "Empleado entendido"
        boolean refund "Se aplico un rembolso en el pedido, en caso de correcto True, en caso contrario False"
        datetime timestamp "Fecha y hora"
    }
```


### Transacción
```mermaid
erDiagram
    TRANSACTION {
        string id PK "ID único de la transacción"
        string merchant_code FK "Código del comerciante"
        string employee_id FK "ID del empleado"
        string client_code FK "ID del cliente"
        decimal amount "Monto"
        string currency "Moneda (ej. EUR)"
        datetime timestamp "Fecha y hora"
        string status "Estado (ej. successful, failed)"
        string checkout_reference "Referencia del pedido"
        string payment_method "Método de pago (ej. tarjeta, PayPal)"
    }
```

---
#### Author: Adría Martín Martorell - 22 de marzo del 2025 - 4:39AM