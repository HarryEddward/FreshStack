# 🏗️ Frontend Software Flow

Este documento describe el flujo del software frontend para la aplicación de cafeterías, construido con **Fresh**, **Capacitor**, y **Zustand**. Se detalla cada pantalla principal, su propósito, diseño visual y notas técnicas, siguiendo una estructura clara para facilitar la comprensión y desarrollo. El flujo está dividido en dos servicios principales: `Client` (clientes) y `Business` (negocio), con un enfoque en simplicidad y seguridad para escanear tarjetas y procesar pagos vía SumUp.

---

## Índice
1. **Client**
   - 1.1 Consentimiento
   - 1.2 Escanear Tarjeta
   - 1.3 Confirmar Datos
   - 1.4 Pago Exitoso
2. **Business**
   - 2.1 Dashboard
3. **Flujos**
   - 3.1 Pago con Tarjeta

---

## 1. Client

### 1.1 Consentimiento
**Propósito**: Obtener el permiso del cliente para escanear su tarjeta, cumpliendo GDPR y LOPDGDD.

**Diseño Visual**:
+------------------+

Consentimiento
"Escanearemos tu
tarjeta para
facilitar el pago
a SumUp. Todo es
temporal y seguro
¿Aceptas?"
[Aceptar]
+------------------+

**Notas Técnicas**:
- **Ruta**: `/client/consent` (SSR carga el texto inicial).
- **Estado**: `consent` en Zustand (`true`/`false`).
- **Seguridad**: Aviso claro en español para GDPR.
- **Acción**: Botón "Aceptar" → Navega a "Escanear Tarjeta".

---

### 1.2 Escanear Tarjeta
**Propósito**: Capturar la imagen de la tarjeta con la cámara para extraer datos (PAN, fecha, nombre).

**Diseño Visual**:
+------------------+

Escanea Tarjeta
[Vista Cámara]
"Apunta tu
tarjeta aquí"
[Escanear]
+------------------+

**Notas Técnicas**:
- **Ruta**: `/client/scan` (SSR prepara la página).
- **Island**: `ScanIsland` (CSR con `@capacitor/camera`).
- **Técnica**: Usa `@capacitor/camera` para tomar la foto y `@capacitor-community/image-to-text` para OCR.
- **Estado**: `cardData` en Zustand (temporal).
- **Acción**: Botón "Escanear" → Procesa imagen y navega a "Confirmar Datos".

---

### 1.3 Confirmar Datos
**Propósito**: Mostrar datos extraídos y pedir el CVC manualmente para validar antes de enviar.

**Diseño Visual**:
+------------------+

Confirmar Datos
PAN: 4200...0042
Fecha: 12/25
Nombre: Juan P.
[CVC: ___]
[Confirmar]
+------------------+

**Notas Técnicas**:
- **Ruta**: `/client/confirm` (SSR pasa datos iniciales).
- **Island**: `ConfirmIsland` (CSR actualiza estado).
- **Estado**: `cardData` en Zustand (`pan`, `expiryMonth`, `expiryYear`, `cvc`, `name`).
- **Validación**: Regex para PAN y fecha; CVC manual (3-4 dígitos).
- **Acción**: Botón "Confirmar" → Navega a "Pago Exitoso".

---

### 1.4 Pago Exitoso
**Propósito**: Confirmar que el pago se envió a SumUp y borrar datos sensibles.

**Diseño Visual**:
+------------------+

Pago Exitoso
"¡Pago enviado a
SumUp! Datos
eliminados."
[Volver]
+------------------+

**Notas Técnicas**:
- **Ruta**: `/client/success` (SSR confirma envío).
- **Island**: `SuccessIsland` (CSR muestra mensaje).
- **Seguridad**: HTTPS (E2EE) a SumUp; borra `cardData` y foto (`localStorage.removeItem`).
- **Acción**: Botón "Volver" → Regresa a inicio o dashboard.

---

## 2. Business

### 2.1 Dashboard
**Propósito**: Mostrar estadísticas del negocio y permitir escanear nuevas tarjetas.

**Diseño Visual**:
+------------------+

Dashboard
Pagos Hoy: 5
Total: 27,50€
[Escanear]
[Historial]
+------------------+

**Notas Técnicas**:
- **Ruta**: `/business/dashboard` (SSR carga estadísticas desde DB).
- **Island**: `DashboardIsland` (CSR actualiza datos dinámicos).
- **Estado**: `scannedCards` en Zustand (lista de pagos).
- **Acción**:
  - "Escanear" → Navega a `/client/scan` (reutiliza flujo cliente).
  - "Historial" → Navega a `/business/history`.

---

## 3. Flujos

### 3.1 Pago con Tarjeta
**Propósito**: Detallar el flujo completo desde el consentimiento hasta el pago exitoso.

**Esquema**:
[Consentimiento] → [Selección de productos] → [Escanear Tarjeta] → [Confirmar Datos] → [Pago Exitoso]
(1.1)              (1.2)                      (1.3)                (1.4)


**Pasos**:
1. **Consentimiento**: Cliente acepta el escaneo (GDPR).
   - Acción: Botón "Aceptar" → `/client/scan`.
2. **Escanear Tarjeta**: Cámara captura la tarjeta.
   - Técnica: OCR extrae PAN, fecha, nombre.
   - Acción: Procesa y pasa a `/client/confirm`.
3. **Confirmar Datos**: Cliente revisa y añade CVC.
   - Validación: Algoritmo de Luhn para PAN.
   - Acción: Botón "Confirmar" → Envia a SumUp y pasa a `/client/success`.
4. **Pago Exitoso**: Confirma y limpia datos.
   - Seguridad: Borra todo tras HTTPS.

**Notas Técnicas**:
- **SSR**: Carga inicial de rutas y datos estáticos.
- **CSR**: Zustand maneja estado (`consent`, `cardData`); islands actualizan UI.
- **Persistencia**: LocalStorage guarda `cardData` temporalmente entre rutas.
- **Adaptabilidad**: `useDeviceStore` ajusta UI (PC, tablet, móvil).

---

## Consideraciones Generales
- **Seguridad**: 
  - E2EE con HTTPS a SumUp.
  - Datos temporales, borrados tras uso.
  - Sin tokenización a usos futuros.
- **Optimización**: 
  - SSR para rendimiento inicial.
  - Islands para interacciones rápidas.
- **Estructura**: 
  - Rutas separadas por servicio (`/client/*`, `/business/*`).
  - Estado modular con Zustand en los islands.

Este flujo asegura una experiencia fluida para clientes y negocios, alineada con los estándares de seguridad y rendimiento del proyecto.