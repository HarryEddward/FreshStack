# 🟡 Business Functions relationated Configuration Flow

```mermaid
flowchart TB


    subgraph Web App
    direction TB
        BusinessEnterLicense[La empresa introducce el código de la licencia]
        BusinessLinkID[La empresa puede vincular los ID's de los móviles]
        subgraph Configuration - Advanced Plan
            BusinessLinkApiDrive[Vinculación API Google Drive]
        end
        
        BusinessConfiguration[Configuración]
        BusinessPreferences[Preferencias]
    end
    subgraph Web App Functions
        
        BusinessWebAppFunTablesVisualize[Visualización de mesas ocupadas/libres]
        BusinessWebAppFunAutomaticRecordingOfProductInputsAndOutputs[Registro autoamtico de entradas y salidas de productos]
        BusinessWebAppFunAlertsForLowStockThresholdsAndExpirationDates[Alertas de umbrales de stock bajos y fechas de vencimiento]
        BusinessWebAppFunAdvancedProductsManager[Gestión de productos avanzado, categorías, variantes: tamaño, color, presentación; precios y disponibilidad]
        BusinessWebAppFunBatchControlAndTraceability[Control de lotes & Trazabilidad de Productos]
        BusinessWebAppFunSupplierRegistrationAndMonitoring[Alta y seguimiento de proveedores]
        BusinessWebAppFunPurchaseHistoryAndPaymentTermsOfSuppliers[Historial de compras y condiciones de pagos de proveedores]
        
        subgraph BusinessWebAppFunAnalisis[Analisis Gráficos: ventas]
        end
        
        subgraph Web App Advanced[Advanced]
            BusinessWebAppFunAdvancedIAReports[Reportes por IA]
            BusinessWebAppFunAdvancedAnalisis[Analisis Gráficos: ventas, reembolsos, todas las analíticas aplicadas]
        end
    end

    subgraph Client App Functions
        BusinessClientAppFunTypeAutomatizationOrder[El cliente elige el tipo de autoamtización del pedido, manual/automatizado]
        BusinessClientAppFunLang[Cambio de idioma a la preferencia del cliente]
        BusinessClientAppFunLiveConexionToWebApp[Conexion constante con ws en la web app]
        BusinessClientAppFunWifi[Poder ver la información del wifi, si esta activado, en la landing page]
        BusinessClientAppFunMenu[Poder ver directamente la carta en la landing page]
    end

    subgraph Business App Functions
        
        BusinessAppFunOrderGeneralManager[Gestión general de pedidos]
        BusinessAppFunOrderDetailedManager[GestiGestión detallada de pedidos]

        BusinessAppFunFastFinalizeOrder[Finalización Rápida de Pedidos]
        BusinessAppFunNotesOrder[Añadir Notas a Pedidos]
        BusinessAppFunOrderRefound[Rembolsar Pedidos]

        BusinessAppFunModifyOrder[Modificar Pedidos]
        BusinessAppFunRepeatOrder[Repetir Pedido]

        BusinessAppFunFinalizeBarcodeScannOrder[Finalizar el pedido rapidamente]

        BusinessAppFunReassignmentOfOrdersByTable[reasignacion de pedidos por mesa]

        BusinessAppFunBasicInventory[Gestión de inventario básico]
        BusinessAppFunLowStockAlerts[Alertas de stock bajo]

        BusinessAppFunNewOrdersNotifications[Notificaciónes de nuevos pedidos]
        BusinessAppFunManageOrderProblems[Gestión de problemas sobre pedidos]

        BusinessAppFunViewOrderHistory[Ver historico de pedidos]
        BusinessAppFunCheckPastOrders[Consultar pedidos pasados]
        
        BusinessAppFunPaymentManagment[Generar Facturas de pedidos]
        
    end

    

    subgraph Client_App[Client App]
        direction TB
        ClientAppLinkBusinessID[La empresa añadé el identificador al móvil]
        ClientAppLinkApiKeySumUp[Vinculación API SumUp]
        ClientAppLinkDisplayName[Vinculación del Nombre del Negocio a enseñar]
        ClientAppLinkOpenSchedule[Vinculación Horario Abierto del Negocio]
        ClientAppLinkActivateOrderOptions[Vinculación de Opciones Activación de pedidos automatizados/manuales]
        ClientAppLinkWifiOptions[Vinculación de preferencias WIFI]
        ClientAppLinkMenus[Vinculación Menu's]
    end

    
    BusinessAccessLicense[La empresa puede usar el servicio con la licencia]
    
    BusinessAccessLicense ==> |Se guardará como sesión la licencia para poder seguir sin problemas| BusinessEnterLicense
    
    BusinessLinkID ==> |Establece conexión| ClientAppLinkBusinessID

    BusinessConfiguration --> ClientAppLinkApiKeySumUp
    BusinessConfiguration --> ClientAppLinkOpenSchedule
    BusinessConfiguration --> ClientAppLinkActivateOrderOptions
    BusinessConfiguration --> ClientAppLinkMenus
    BusinessPreferences --> ClientAppLinkDisplayName
    BusinessPreferences --> ClientAppLinkWifiOptions

    BusinessLinkApiDrive --> |Exportación externa a terceros| BusinessWebAppFunAdvancedIAReports
    ClientAppLinkApiKeySumUp --> Client_App
    
    



```