
# Prisma Schemas


### Negocio

```prisma
model Merchant {
  merchant_code String @id
  company_name  String
  email         String
  employees     Employee[]
  transactions  Transaction[]
  orderProducts OrderProduct[]
}
```

### Cliente

```prisma
model Client {
  client_code String @id
  email       String
  transactions Transaction[]
}
```

### Producto

```prisma
model Product {
  id            String  @id
  amount        Decimal
  name          String
  stock         Int
  orderProducts OrderProduct[]
}
```

### Cantidad de producto referenciado al Pedido

```prisma
model OrderProduct {
  order_id   Int
  product_id Int
  quantity   Int
  subtotal   Decimal
  order      Order   @relation(fields: [order_id], references: [id])
  product    Product @relation(fields: [product_id], references: [id])
  merchant   Merchant @relation(fields: [merchant_code], references: [merchant_code])
  merchant_code String
  @@id([order_id, product_id])
}
```

### Empleado

```prisma
model Employee {
  employee_id   String   @id
  merchant_code String
  name          String
  merchant      Merchant @relation(fields: [merchant_code], references: [merchant_code])
  transactions  Transaction[]
}
```

### Pedido

```prisma
model Order {
  id             Int      @id
  transaction_id String
  timestamp      DateTime
  code           String
  finished        Boolean
  transaction    Transaction @relation(fields: [transaction_id], references: [id])
  orderProducts  OrderProduct[]
}
```


### Transacción

```prisma
model Transaction {
  id                String   @id
  merchant_code     String
  employee_id       String
  client_code       String
  amount            Decimal
  currency          String
  timestamp         DateTime
  status            String
  checkout_reference String
  payment_method    String
  merchant          Merchant @relation(fields: [merchant_code], references: [merchant_code])
  employee          Employee @relation(fields: [employee_id], references: [employee_id])
  client            Client   @relation(fields: [client_code], references: [client_code])
  order             Order[]
}
```

---
#### Author: Adría Martín Martorell - 22 de marzo del 2025 - 4:40AM