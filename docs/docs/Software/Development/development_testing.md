
# 🔵 🔄 Development Testing
Esta sección describe los testeos para backend y frontend en un proyecto Fresh (Deno), detallando las técnicas según su propósito. Por ejemplo, pruebas de integración para funcionalidades completas y pruebas unitarias para utilidades cuya lógica requiere validación precisa.

#### Prioridad: Functional Testing
Se prioriza el testeo funcional para asegurar que APIs y componentes dinámicos cumplan los requisitos, verificando flujos críticos como interacciones con APIs y renderizado de datos.

### Testing Flow
- **Dynamic Testing**
- **Razón**: Fresh es dinámico (enrutamiento, middlewares, cookies), y pequeños cambios pueden causar errores inesperados. Los tests dinámicos detectan problemas en flujos web, desde APIs hasta páginas.

### Testing Automatization
- **Automated Testing** (Deno Native): Usa Deno.test para automatizar pruebas unitarias, de integración y E2E, optimizando la ejecución en proyectos livianos.

## Backend

### API

- **Técnica: E2E**
- **Descripción**: Simula interacciones reales con APIs, validando respuestas y estados del servidor. Asegura que los endpoints funcionen en un entorno similar a producción.

### Servicios

- **Técnica: Unitario**
- **Descripción**: Prueba lógica de negocio aislada (validaciones, cálculos) para garantizar fiabilidad sin dependencias externas.

## Frontend

### Islands

- **Técnica**: Integración con Mocks
- **Descripción**: Verifica que los componentes dinámicos (islands) rendericen datos y manejen interacciones, simulando APIs con mocks para pruebas rápidas y sin servidor.

### Páginas Estáticas
- **Técnica**: Ninguna (Validación Visual)
- **Descripción**: En proyectos livianos, las páginas estáticas no requieren pruebas automatizadas; se validan visualmente para ahorrar esfuerzo.

### Estructura de Tests
- `/tests/e2e/api/`: Tests E2E para APIs.
- `/tests/unit/services/`: Tests unitarios para lógica de negocio.
- `/tests/unit/playground/`: Tests unitarios para la experimentación de nuevos servicios para la fiabilidad de los servicios externos.
- `/tests/integration/islands/`: Tests de integración para islands.
- `/tests/mocks/`: Mocks y datos simulados.