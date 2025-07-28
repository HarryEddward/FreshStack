# 🔵 App Business Logic Development

En esta sección explica todas las funciones de la app de la empresa simplificado y seccionando para visualizarse en una forma sencilla en las funciones de cada tipo de grupo de funciones generales que debe de tener la app.

```mermaid
mindmap
    root((App de la empresa))
        Funciones

```

--- 

### Funciones de la Web
```mermaid
mindmap
        root((Funciones))
            Gestión de pedidos

            Escaneo de código de barras

            Gestión de mesas

            Control de stock

            Notificaciónes & Alertas

            Historial de pedidos

            Gestión de pagos

```

--- 

### Gestión de pedidos
```mermaid
mindmap
    root((Gestión de pedidos, en tiempo real))
        Ver Pedidos
            Visualización detallada
            Vista general
        Finalizar & Completar pedidos
            Añadir notas, de forma opcional a los pedidos
            Reembolsos, a un botón de distancia
            Finalización rápida, uso del escaner de código de barras

```

--- 

### Escaneo de código de barras
```mermaid
mindmap
    root((Escaneo de código de barras))
        Finalizar pedido por código de barras rapidamente

```

--- 

### Gestión de mesas
```mermaid
mindmap
    root((Gestión de mesas))
        Reasignación de pedidos, se actualiza el pedido a otra mesa

```

--- 

### Control de stock
```mermaid
mindmap
    root((Control de stock))
        Inventario Báisco, añadir e eliminar y visualizar
        Alertas Stock Bajo, en tiempo real

```

--- 

### Notificaciónes & Alertas
```mermaid
mindmap
    root((Notificaciónes & Alertas))
        En tiempo real con sockets
            Notificaciónes de nuevos pedidos
                Al tener que contar con un sistema muy rápido justifica la sobrecarga
        Problemas de pedidos

```

--- 

### Historial de pedidos
```mermaid
mindmap
    root((Historial de pedidos))
        Ver historial de pedidos
            Poder ver el historial reciente de todos los pedidos hechos
        Consultar pedidos pasados
            Poder consultar pedidos de mas de 30 dias ya hechos

```

--- 

### Gestión de pagos
```mermaid
mindmap
    root((Gestion Operativa Detallada))
        Generar facturas simplificadas
            A través de ver el historial de pedidos poder con un simple boton generar la factura simplificada

```



**Author: Adrià Martín, 4 may 12:01**