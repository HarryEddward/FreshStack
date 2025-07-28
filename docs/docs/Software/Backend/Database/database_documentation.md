
# 🟡 Database Documentation

Este documento detalla todas las identidades de la base de datos requeridas para entender y aplicar las funciones del sistema de forma práctica.

## Índice
1. [Create Business](#create-business)
2. [Business Payment](#business-payment)
3. [Phones ID's](#phones-ids)
4. [Client Order](#client-order)
5. [Suppliers Information](#suppliers-information)
6. [Menú Category](#menú-category)
7. [Products](#products)
8. [Employee & Admin](#employee--admin)
9. [Analytics & AI Generated Reports](#analytics--ai-generated-reports)

## Create Business

Colecciones para almacenar la identidad empresarial, documentos de soporte y relaciones comerciales.

### business_recipient
Almacena la información principal de la empresa.

```json
{
    "id": "is7hs-6sh78-almn9-67w1", // Será el business_id de todo el sistema
    "legal_name": "Company B Inc.",
    "tax_id": "US123456789",
    "phone": "+34 643567016",
    "email": "example@gmail.com",
    "registered_address": "123 Example Street, New York, USA",
    "country_of_incorporation": "United States",
    "legal_form": "Inc.",
    "legal_representative": {
        "full_name": "Laura Gomez",
        "identification_document": "Passport X1234567",
        "position": "CEO"
    },
    "timestamp": "2025-05-13T17:56:37Z"
}
```

### business_supporting_documents
Registro de documentos corporativos disponibles.

```json
{
    "id": "is7hs-6sh78-almn9-67w1",
    "service_contract": true,
    "issued_invoice": true,
    "third_party_payment_agreement": true,
    "ultimate_beneficial_owner_certificate": false,
    "business_license": true,
    "business_id": "is7hs-6sh78-almn9-67w1",
    "timestamp": "2025-05-13T17:56:37Z"
}
```

### business_supporting_documents_attached
Almacena URLs de documentos adjuntos.

```json
{
    "id": "is7hs-6sh78-almn9-67w1",
    "url": "https://localhost:9000/business_general_sales_report_ai/is7hs-6sh78-almn9-67w1/GeneralReport_2025-05-13T17:56:37Z.pdf",
    "business_id": "is7hs-6sh78-almn9-67w1",
    "timestamp": "2025-05-13T17:56:37Z"
}
```

### business_commercial_relationship
Define el tipo de relación comercial.

```json
{
    "id": "is7hs-6sh78-almn9-67w1",
    "type": "Subcontracting",
    "signed_contract": true,
    "third_party_payment_permission": true,
    "business_id": "is7hs-6sh78-almn9-67w1",
    "timestamp": "2025-05-13T17:56:37Z"
}
```

### business_commercial_relationship_documents_attached
Almacena URLs de documentos adjuntos de la relación comercial.

```json
{
    "id": "is7hs-6sh78-almn9-67w1",
    "url": "https://localhost:9000/business_general_sales_report_ai/is7hs-6sh78-almn9-67w1/GeneralReport_2025-05-13T17:56:37Z.pdf",
    "business_id": "is7hs-6sh78-almn9-67w1",
    "timestamp": "2025-05-13T17:56:37Z"
}
```

### business_compliance
Estado de verificación y cumplimiento normativo.

```json
{
    "id": "is7hs-6sh78-almn9-67w1",
    "kyc_verified": true,
    "aml_approved": true,
    "tax_withholding_applicable": false,
    "business_id": "is7hs-6sh78-almn9-67w1",
    "timestamp": "2025-05-13T17:56:37Z"
}
```

### business_configuration
Configuración de variables estáticas de la empresa.

```json
{
    "id": "is7hs-6sh78-almn9-67w1",
    "wifi": {
        "password": "pescadorBar1234",
        "enabled": true,
    },
    "schedule": {
        "morning": {
            "open": "2025-05-14T08:26:58Z",
            "close": "2025-05-14T08:26:58Z"
        },
        "afternoon": {
            "open": "2025-05-14T08:26:58Z",
            "close": "2025-05-14T08:26:58Z"
        }
    },
    "functions_activated": {
        "orders": {
            "manual": true,
            "automatized": true
        }
    },
    "api_key": {
        "sumup": {
            "activated": true,
            "key": "msXypDIRSmviXyulEX4s8BsxJa7lB6YCa9AoChkiPRTyLrGYrwYdaMIf9VbSk1gOs3IGLCN6spb2kf65wV9dvr6NGjsS8BTD4An6DFbAJWmCLARsWsRI8aS3aDFo5Djc",
        },
        "google_drive": {
            "activated": true,
            "key": "msXypDIRSmviXyulEX4s8BsxJa7lB6YCa9AoChkiPRTyLrGYrwYdaMIf9VbSk1gOs3IGLCN6spb2kf65wV9dvr6NGjsS8BTD4An6DFbAJWmCLARsWsRI8aS3aDFo5Djc",
        }
    },
    "affiliate": true, // Se aplica en el plan avanzado para poder reducir comisiónes por parte del banco de SumUp
    "max_phones_devices": 30,
    "display_username": "CafeBuy",
    "business_id": "is7hs-6sh78-almn9-67w1",
    "timestamp": "2025-05-13T17:56:37Z"
}
```


## Business Payment

Colecciones relacionadas con pagos empresariales B2B para licencias y suscripciones a través de Stripe.

### business_bank_information
Información bancaria de la empresa.

```json
{
    "id": "is7hs-6sh78-almn9-67w1",
    "bank_name": "Chase Bank",
    "iban_or_account_number": "US12345678901234567890",
    "swift_bic": "CHASUS33XXX",
    "account_holder_name": "Company B Inc.",
    "bank_address": "270 Park Avenue, New York, USA",
    "currency": "USD",
    "business_id": "is7hs-6sh78-almn9-67w1",
    "timestamp": "2025-05-13T17:56:37Z"
}
```

### business_payment_history_details
Detalles de los pagos realizados.

```json
{
    "id": "bp_001",
    "description": "Consultoría mensual abril 2025",
    "amount": 5000.00,
    "currency": "USD",
    "taxes_included": true,
    "period": {
        "start": "2025-04-01",
        "end": "2025-04-30"
    },
    "business_id": "biz_123",
    "timestamp": "2025-05-01T12:00:00Z"
}
```

### business_payment_history
Registro de transacciones de pago.

```json
{
    "id": "txn_001",
    "business_id": "biz_123",
    "payment_detail_id": "bp_001",
    "amount": 5000.00,
    "currency": "USD",
    "type": "subscription",
    "status": "succeeded",
    "stripe_invoice_id": "in_1234",
    "business_id": "is7hs-6sh78-almn9-67w1",
    "timestamp": "2025-05-14T10:05:00Z"
}
```

### business_licenses
Licencias del sistema adquiridas por la empresa.

```json
{
    "id": "license_987xyz",
    "stripe_customer_id": "cus_ABC123",
    "stripe_subscription_id": "sub_XYZ789", // null si fue pago único
    "stripe_payment_intent_id": "pi_123456789", // null si fue por sub
    "license_type": "monthly" | "lifetime",
    "plan": "standard" | "premium" | "enterprise" | "custom",
    "status": "active" | "canceled" | "expired",
    "start_date": "2025-05-14T00:00:00Z",
    "end_date": "2025-06-14T00:00:00Z", // null si lifetime
    "is_paid": true,
    "lockin_months": 12,
    "business_id": "is7hs-6sh78-almn9-67w1",
    "timestamp": "2025-05-14T00:00:00Z"
}
```

### business_paying_company
Empresa autorizada para realizar pagos en nombre de otra.

```json
{
    "id": "is7hs-6sh78-almn9-67w1",
    "legal_name": "Company A LLC",
    "tax_id": "AR123456789",
    "country": "Argentina",
    "role": "Authorized third-party payer",
    "business_id": "is7hs-6sh78-almn9-67w1",
    "timestamp": "2025-05-13T17:56:37Z"
}
```

## Phones ID's

Identificadores para los dispositivos que se comunican con el panel de control mediante WebSockets.

### business_phones_ids
Registro de dispositivos identificados por ubicación.

```json
{
    "id": "is7hs-6sh78-almn9-67w1",
    "title": "Mesa 12",
    "timestamp": "2025-05-13T17:56:37Z",
    "business_id": "is7hs-6sh78-almn9-67w1"
}
```

## Client Order

Colecciones para gestionar pedidos de clientes y su procesamiento seguro.

### client_order
Información principal del pedido.

```json
{
    "id": "is7hs-6sh78-almn9-67w1",
    "status": "Pending",
    "information_notes": "El cliente quiere cocacola dentro del vino, tiene alergía a los cacahuetes",
    "table_served": "Mesa entendida en el momento (nombre del titulo del identificador)",
    "employee_served": "JuanJose Sánchez Pérez",
    "refund": false,
    "business_id": "is7hs-6sh78-almn9-67w1",
    "timestamp": "2025-05-13T17:56:37Z"
}
```

### client_order_products
Productos incluidos en el pedido.

```json
{
    "order_id": "is7hs-6sh78-almn9-67w1",
    "product": {
        "snapshot": true,
        "latest_id": "is7hs-6sh78-almn9-67w1",
        "name": "Vino Tinto de la Rioja"
    }, // Snapshot del Producto
    "quantity": 2,
    "subtotal": 300.50,
    "business_id": "is7hs-6sh78-almn9-67w1",
    "timestamp": "2025-05-13T17:56:37Z"
}
```

### client_order_thermical_printer
Impresoras térmicas disponibles para usarse.

```json
{
    "order_id": "is7hs-6sh78-almn9-67w1",
    "printers": [
        "Epson",
        "Phomemo"
    ],
    "timestamp": "2025-05-13T17:56:37Z",
    "business_id": "is7hs-6sh78-almn9-67w1"
}
```


### client_order_tickets
Gestión de tickets para el cliente.

```json
{
    "order_id": "is7hs-6sh78-almn9-67w1",
    "tickets": {
        "physical": false,
        "email": {
            "send": true,
            "client_email": "example@gmail.com"
            /**
            "send": false,
            "client_email": ""
            */
        }
    },
    "timestamp": "2025-05-13T17:56:37Z",
    "business_id": "is7hs-6sh78-almn9-67w1"
}
```

### client_order_transaction
Registro de transacciones financieras del pedido.

```json
{
    "id": "is7hs-6sh78-almn9-67w1",
    "order_id": "is7hs-6sh78-almn9-67w1",
    "transaction_id": "6sh78-67w1-almn9-is7hs",
    "transaction_amount": 10.50,
    "transaction_currency_iso": "EUR",
    "status": "successful" | "failed",
    "business_id": "is7hs-6sh78-almn9-67w1",
    "timestamp": "2025-05-13T17:56:37Z",
    "payment_method": "Debit Card" | "Credit Card"
}
```

## Suppliers Information

Colecciones para gestionar proveedores y su información de contacto.

### business_suppliers_information
Información principal de los proveedores.

```json
{
    "id": "is7hs-6sh78-almn9-67w1",
    "in_use": true,
    "title": "Merchant S.A.",
    "description": "## Nuevo Modelo de Negocios",
    "schedule": {
        "morning": {
            "open": "2025-05-14T08:26:58Z",
            "close": "2025-05-14T08:26:58Z"
        },
        "afternoon": {
            "open": "2025-05-14T08:26:58Z",
            "close": "2025-05-14T08:26:58Z"
        }
    },
    "timestamp": "2025-05-13T17:56:37Z",
    "business_id": "is7hs-6sh78-almn9-67w1"
}
```

### business_suppliers_information_anvoid_pictures
Imágenes asociadas a proveedores.

```json
{
    "id": "is7hs-6sh78-almn9-67w1",
    "id_supplier": "is7hs-6sh78-almn9-67w1",
    "url": "https://localhost:9000/users/is7hs-6sh78-almn9-67w1/hello.png",
    "timestamp": "2025-05-13T17:56:37Z",
    "business_id": "is7hs-6sh78-almn9-67w1"
}
```

## Menú Category

Colecciones para gestionar las categorías de menú y su disponibilidad horaria.

### business_menu_categories
Categorías de menú y horarios disponibles.

```json
{
    "id": "is7hs-6sh78-almn9-67w1",
    "id_menu": "is7hs-6sh78-almn9-67w1",
    "vip": false,
    "have_schedule": true,
    "schedule": {
        "morning": {
            "open": "2025-05-14T08:26:58Z",
            "close": "2025-05-14T08:26:58Z",
            "enabled": true
        },
        "afternoon": {
            "open": "2025-05-14T08:26:58Z",
            "close": "2025-05-14T08:26:58Z",
            "enabled": true
        },
        "enabled": true
    },
    "name_last_modification_employee": "JuanJosé Sánchez Pérez",
    "timestamp": "2025-05-13T17:56:37Z",
    "business_id": "is7hs-6sh78-almn9-67w1"
}
```

### business_menus
Menús disponibles en el negocio.

```json
{
    "id": "is7hs-6sh78-almn9-67w1",
    "title": "Copas",
    "tags": "vermuteria, vino, cerveza",
    "name_last_modification_employee": "JuanJosé Sánchez Pérez",
    "timestamp": "2025-05-13T17:56:37Z",
    "business_id": "is7hs-6sh78-almn9-67w1"
}
```

### business_products
Productos asociados a menús.

```json
{
    "id": "is7hs-6sh78-almn9-67w1",
    "id_menu": "is7hs-6sh78-almn9-67w1",
    "name": "Cava Mallorquín",
    "unity_amount": 25.5,
    "stock": [
        /*
        El stock añadido se correlaciona con la fecha de caducación,
        por tandas de introducción de productos dentro del almacén
        */
        650,
        1800
    ],
    "unity_consume_stock": 40,
    "expiration_date": [
        "2025-11-13T00:00:00Z",
        "2025-12-13T00:00:00Z"
    ],
    "type_unit_consume_measurement": "Und.",
    "tags": "ligero, dulce",
    "name_last_modification_employee": "JuanJosé Sánchez Pérez",
    "timestamp": "2025-05-13T17:56:37Z",
    "business_id": "is7hs-6sh78-almn9-67w1"
}
```

## Products

Colecciones para gestionar productos, stock y pedidos.

### business_products
Información detallada de los productos disponibles.

```json
{
    "id": "is7hs-6sh78-almn9-67w1",
    "id_menu": "is7hs-6sh78-almn9-67w1",
    "name": "Cava Mallorquín",
    "unity_amount": 25.5,
    "stock": 650,
    "unity_consume_stock": 40,
    "type_unit_consume_measurement": "Und.", // (Puede ser lt., gr., kg., etc)
    "tags": "ligero, dulce",
    "name_last_modification_employee": "JuanJosé Sánchez Pérez",
    "timestamp": "2025-05-13T17:56:37Z",
    "business_id": "is7hs-6sh78-almn9-67w1"
}
```

### client_order_products
Productos solicitados en un pedido con gestión de stock.

```json
{
    "id": "is7hs-6sh78-almn9-67w1",
    "order_id": "is7hs-6sh78-almn9-67w1",
    "product": {
        "latest_id": "is7hs-6sh78-almn9-67w1",
        "name": "Cava Mallorquín"
    }, // Snapshot del Producto
    "quantity": 80, // Por ejemplo 40x2: 80 por 2 productos
    "subtotal": 300.50,
    "timestamp": "2025-05-13T17:56:37Z",
    "business_id": "is7hs-6sh78-almn9-67w1"
}
```

## Employee & Admin

Sistema de gestión de usuarios mediante Keycloak que permite registrar las acciones y modificaciones realizadas por los empleados en el sistema, brindando trazabilidad.

![Keycloak Logo](https://www.keycloak.org/resources/images/logo.svg)

### business_employees
Gestión de empleados de un negocio.

```json
{
    "id": "is7hs-6sh78-almn9-67w1",
    "name_employee": "Juan Jóse Ortiz",
    "timestamp": "2025-05-13T17:56:37Z", // Cuando se creó el empleado
    "business_id": "is7hs-6sh78-almn9-67w1"
}
```

### business_employees_clock_records
Se registran las horas como entradas y salidas de los empleados de un negocio.

```json
{
    "id": "is7hs-6sh78-almn9-67w1",
    "name_employee": "Juan Jóse Ortiz",
    "timestamp": "2025-05-13T17:56:37Z", // Cuando se registra una hora en la entrada como en salida de un día.
    "business_id": "is7hs-6sh78-almn9-67w1"
}
```


## Analytics & AI Generated Reports

Colecciones para gestionar informes generados por IA y almacenar estadísticas (disponible solo en Cloud Safe Computing).

### business_general_sales_report_ai
Informes generales de ventas.

```json
{
    "id": "is7hs-6sh78-almn9-67w1",
    "url": "https://localhost:9000/business_general_sales_report_ai/is7hs-6sh78-almn9-67w1/GeneralReport_2025-05-13T17:56:37Z.pdf",
    "business_id": "is7hs-6sh78-almn9-67w1",
    "timestamp": "2025-05-13T17:56:37Z"
}
```

### business_general_warehouse_report_ai
Informes generales de almacén.

```json
{
    "id": "is7hs-6sh78-almn9-67w1",
    "url": "https://localhost:9000/business_general_sales_report_ai/is7hs-6sh78-almn9-67w1/GeneralSalesReport_2025-05-13T17:56:37Z.pdf",
    "business_id": "is7hs-6sh78-almn9-67w1",
    "timestamp": "2025-05-13T17:56:37Z"
}
```

### business_warehouse_replenishment_report_ai
Informes de reposición de inventario.

```json
{
    "id": "is7hs-6sh78-almn9-67w1",
    "url": "https://localhost:9000/business_general_sales_report_ai/is7hs-6sh78-almn9-67w1/WarehouseReplenishmentReport_2025-05-13T17:56:37Z.pdf",
    "business_id": "is7hs-6sh78-almn9-67w1",
    "timestamp": "2025-05-13T17:56:37Z"
}
```

## Notas sobre Modelos de Servicio

- **Plan Pro (Cloud Computing)**: Los informes y datos se guardan en la infraestructura propia.
- **Plan Básico**: Los informes se almacenan en Google Drive.
- **On-Premise**: Licencia de por vida (LifeTime) para autohospedaje en servidor local.
