
# 🟡 Frontend Architecture

Esta sección define la arquitectura del frontend para el proyecto, utilizando Fresh como framework principal. Se combina SSR (Server-Side Rendering) para enrutamiento y tareas previas al cliente con CSR (Client-Side Rendering) para manejar el estado dinámico, optimizando la experiencia con islands y persistencia en LocalStorage. El estado se gestiona con Zustand, separando lógica por tipo de usuario (client y business) y adaptándose al dispositivo/pantalla (PC, tablet, móvil).

## Principios Generales
- **SSR**: Enrutamiento, carga inicial de datos (DB, peticiones estáticas HTTP), y procesamiento asíncrono subyacente antes de enviar contenido al cliente.
- **CSR**: Gestión del estado en el cliente con Zustand, actualizaciones dinámicas mediante islands, y adaptabilidad a dispositivos/pantallas.
- **Islands**: Componentes hidratados en el cliente, organizados por servicios (client y business), optimizados para interacciones específicas.
- **LocalStorage & @capacitor/preferences**: Persistencia temporal del estado entre rutas para facilitar la navegación y mantener datos del usuario.

## Enrutamiento
### SSR para Enrutamiento

- **Framework**: Fresh utiliza SSR por defecto para generar rutas en el servidor.
- **Rutas**: Definidas en el directorio `routes/`:
  - `/client/*`: Rutas para clientes (ej. `/client/pay`, `/client/orders`).
  - `/business/*`: Rutas para negocios (ej. `/business/dashboard`, `/business/scan`).
- **Tareas Previas**:
  - Conexión a la base de datos (ej. Deno KV) para cargar datos iniciales.
  - Validaciones estáticas HTTP (ej. autenticación con Keycloak).
  - Resolución de tareas asíncronas (ej. preprocesar pedidos antes de renderizar).

Ejemplo:
```ts


// routes/client/pay.tsx
import { Handlers, PageProps } from "$fresh/server.ts";

export const handler: Handlers = {
  async GET(_req, ctx) {
    const order = await db.getOrder(ctx.params.id); // Carga desde DB
    return ctx.render({ order });
  },
};

export default function PayPage({ data }: PageProps) {
  return <ClientPayIsland order={data.order} />;
}
```

CSR para Navegación Dinámica
Persistencia: LocalStorage guarda el estado entre rutas (ej. datos de la tarjeta escaneada).
Navegación: Los islands manejan transiciones dinámicas sin recargar la página completa.
Ejemplo:

```ts
// Guardar en LocalStorage tras escanear
localStorage.setItem("cardData", JSON.stringify({ pan: "4200000000000042", expiry: "12/25" }));

// Leer en otra ruta
const cardData = JSON.parse(localStorage.getItem("cardData") || "{}");
```

## Gestión del Estado con Zustand
Separación por Tipo de Usuario
Stores:
clientStore: Estado para clientes (ej. datos de tarjeta, pedido actual).
businessStore: Estado para negocios (ej. dashboard, escaneo de tarjetas).
Ejemplo:

```ts

// stores/clientStore.ts
import { create } from "zustand";

export const useClientStore = create((set) => ({
  card: { pan: "", expiryMonth: "", expiryYear: "", cvc: "", name: "" },
  setCard: (card) => set({ card }),
}));

// stores/businessStore.ts
export const useBusinessStore = create((set) => ({
  scannedCards: [],
  addCard: (card) => set((state) => ({ scannedCards: [...state.scannedCards, card] })),
}));
```

Adaptación a Dispositivos/Pantallas
Detección: Usamos media queries o window.innerWidth para identificar PC, tablet o móvil.
Estado dinámico:
```ts


// stores/deviceStore.ts
import { create } from "zustand";

export const useDeviceStore = create((set) => ({
  device: "mobile", // Por defecto
  setDevice: () =>
    set({
      device:
        window.innerWidth > 1024 ? "pc" : window.innerWidth > 768 ? "tablet" : "mobile",
    }),
}));

// Uso en un island
import { useDeviceStore } from "../stores/deviceStore.ts";
export default function ResponsiveIsland() {
  const { device } = useDeviceStore();
  return <div>{device === "pc" ? "Vista PC" : "Vista Móvil/Tablet"}</div>;
}
```

Islands: Componentes por Servicio
Organización
Directorios:
islands/client/: Componentes para clientes (ej. PayIsland.tsx, OrderIsland.tsx).
islands/business/: Componentes para negocios (ej. ScanIsland.tsx, DashboardIsland.tsx).
Rutas asociadas:
/client/pay usa PayIsland.
/business/scan usa ScanIsland.
Ejemplo: Dashboard de Pasos
Un island para un dashboard de pasos (ej. escanear tarjeta, confirmar, pagar) que usa LocalStorage:

```tsx

import { useState, useEffect } from "react";
import { useBusinessStore } from "../stores/businessStore.ts";
import { Camera } from "@capacitor/camera";
import { ImageToText } from "@capacitor-community/image-to-text";

export default function ScanIsland() {
  const [step, setStep] = useState(1);
  const [cardData, setCardData] = useState({ pan: "", expiryMonth: "", expiryYear: "", cvc: "", name: "" });
  const { addCard } = useBusinessStore();

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("cardData") || "{}");
    if (savedData.pan) setCardData(savedData);
  }, []);

  const scanCard = async () => {
    const image = await Camera.getPhoto({ resultType: CameraResultType.Uri });
    const { text } = await ImageToText.extractText({ path: image.path! });
    const pan = text.match(/\d{4}\s?\d{4}\s?\d{4}\s?\d{4}/)?.[0].replace(/\s/g, "") || "";
    const expiry = text.match(/\d{2}\/\d{2}/)?.[0].split("/") || ["", ""];
    const name = text.match(/[A-Z\s]{2,}/)?.[0].trim() || "";
    const newCard = { ...cardData, pan, expiryMonth: expiry[0], expiryYear: expiry[1], name };
    setCardData(newCard);
    localStorage.setItem("cardData", JSON.stringify(newCard));
    setStep(2);
  };

  const confirmCard = () => {
    addCard(cardData);
    setStep(3);
  };

  return (
    <div>
      {step === 1 && (
        <>
          <p>Paso 1: Escanea la tarjeta</p>
          <button onClick={scanCard}>Escanear</button>
        </>
      )}
      {step === 2 && (
        <>
          <p>Paso 2: Confirma los datos</p>
          <p>PAN: {cardData.pan}</p>
          <p>Fecha: {cardData.expiryMonth}/{cardData.expiryYear}</p>
          <input
            value={cardData.cvc}
            onChange={(e) => setCardData({ ...cardData, cvc: e.target.value })}
            placeholder="CVC"
          />
          <button onClick={confirmCard}>Confirmar</button>
        </>
      )}
      {step === 3 && (
        <>
          <p>Paso 3: Enviado a SumUp</p>
          {/* Lógica de envío */}
        </>
      )}
    </div>
  );
}
```

## SSR vs CSR: Responsabilidades
### SSR (Server-Side Rendering)
Enrutamiento: Genera las páginas en el servidor (routes/).
Carga inicial: Consulta la DB o APIs externas antes de enviar al cliente.
Tareas asíncronas: Procesa operaciones pesadas (ej. validar un pedido) en el servidor.
Ejemplo:
```ts
// routes/business/dashboard.tsx
export const handler: Handlers = {
  async GET(_req, ctx) {
    const stats = await db.getStats(); // Carga desde DB
    return ctx.render({ stats });
  },
};
```

### CSR (Client-Side Rendering)
Estado dinámico: Zustand actualiza el UI en tiempo real (ej. pasos del dashboard).
Interacciones: Islands manejan clics, escaneos, etc., en el cliente.
Persistencia: LocalStorage guarda datos entre rutas.

## Optimización con LocalStorage
Uso: Almacena datos temporales como cardData para reutilizarlos en otras rutas.
Limpieza: Borra los datos tras enviar a SumUp:

```ts
localStorage.removeItem("cardData");
````

Ventaja: Reduce recargas y mejora la navegación entre islands.
Adaptabilidad a Dispositivos
Detección: useDeviceStore ajusta el UI según el tamaño de pantalla.
Estilos: CSS responsivo en islands:
css

```css
@media (max-width: 768px) {
  .container { font-size: 14px; }
}
```