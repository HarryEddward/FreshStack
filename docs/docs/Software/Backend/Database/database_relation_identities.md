# 🟡 Database Platform relationated with Identities

En esta sección se aclara todas las identidades de la base de datos que se require para entender y aplicar todas las funciones de forma practica a través de sus propias plataformas que se úsan.



```mermaid
flowchart TB

    subgraph WWW Internet Business["WWW Internet (Business)"]
        create_business["Create Business"]
        business_payment["Business Payment"]

    end

    subgraph Web Business
        phones_ids_web_business["Phones ID's"]
        suppliers_information_web_business["Suppliers Information"]
        products_app_client_web_business["Products"]
        menu_category_app_client_web_business["Menú Category"]
        ia_reports["Analíticas sobre Informes Generados por IA & Analíticas sobre Estadísticas"]
        employee_and_admin["Manage Employee & Admin"]
    end

    subgraph App Business
        client_order_app_business["Client Order"]
    
    end
    
    subgraph App Client
        phones_ids_app_client["Phones ID's"]
        client_order_app_client["Client Order"]
        menu_category_app_client["Menú Category"]
        
    end

```