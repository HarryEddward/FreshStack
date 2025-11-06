---
sidebar_position: 1
---

# Introduction


## Que trata este proyecto?

### Programa Liviano Empresarial

Suite empresrial moderno de gestión de negocios para hostelería enfocado a pymes.

Proposito:
- **Mejorar el flujo de caja y el flujo de los pedidos** de cafeterias o hostelería de una forma minimalista rápida y efectiva.
- **Aplica Anliticas y ventas conjuntamente con configruaciones mas autoamtizadas en todo el negocio** con generación de informes PDF's con IA hasta manejar de una forma completa y unificada tu negocio, como el manejo de pedidos manuales de parte la app del staff al fin generando el mismo staff los reembolsos y los tickets a un simple click del pedido.
- **Integración interconectado por multifunciones avanzadas** aplicandose a integración difernetes componentes de la aplicación por la integración cohesiva y para reducir comportamientos manuales juntandose con difernetes funciones. Ej.: Usar una calaculadora donde se pueda finalizar un pedido automaticamente a la hora de calcular, imprimir ticket y recibir el cambio del cobro.


### Integración del Programa

#### 1. **Client App**: 
Usa una app inetgrada úso para los clientes para los **pagos y pedidos de forma mas automatizada o mas manual** en el proceso manejando las preferencias dle usuario o cuestiones comúnes (como pedir la contraseña wifi, ver la carta y los idiomas)

#### 2. **Employee App**: 
Usa una app integrada para los empleados para ver los pedidos de forma intuitiva y gestionarlos con sus propias funcionaldiades, y parte añadir rápidamente stock sin problemas en casos urgentes.

#### 3. **Business Web**: 
Usa una web integrada para el negocio para realizar **informes por IA en PDF's** a través de reposición de almacenamiento, ventas, analiticas, entre muchos otros con servicios IA GPT, menejó del **stock de productos en almacén avanzado**, manejar la configruación global de la información del negocio (contraseña wifi, uso del wifi, etc), aparte tendríamos **analíticas en tiempo real** y finalmente el dashboard para ver en **tiempo real las mesas** con la conexión de los teléfonos .

### Filosofía
Se caracteríza para **usarse en alta rotación y en alta demanda para cubrir de forma brusca a muchos clientes** con **una facilidad de implementación y úso**, enfocandonos en manejar lo mas fluidamente el flujo de caja y el flujo de pedidos con el fin de evitar features inecesarias que puedan estorbar el flujo.

En el enfoque de la gestión del negocio no se queda atras...

Se enfoca en un **sistema de microservcios auto-hospedado** con técnologías modernas y estandarizadas para un uso de modelo **SaaS**.

### Caracteríticas Únicas
- **Microtransacciónes de alta resilencia** con caracterísitcas ACID [Cliente - Servidor].
- **Software minimalista** y listo para usarlo.
- App para los empleadores de **cordinación de mesas para los pedidos** (Evitar perdida de segundos en la descordinación de mesas)
- App para **escanear la finalización de los pedidos**
- Dashboard intuitivo para ver de forma limpia y intuitiva a través de una **imagén "top" del negocio y situar mas intuitivamente las mesas con los pedidos**
- **App minimalista híbirda** para los **clientes usarlo para pagar o simplemente alertar para pedir al empleado que venga en físico** a través de un bóton. (Si no quiere usar la app, igualmente alertara en el dashboard que hay un pedido y con colores se diferenciaran los pedidos autoamtizados y manuales a través de emojis de colores para disitnguirlos. Por ejemplo: emojis de colores circulares para pedidos hechos autoamtizados y emojis de colores cuadrados para pedidos manuales que atender)


### Caracteríticas técnicas
- IAM: **Keycloak (HA) / Keycloakify (UI Theme) / Automatized Json Realm**
- API: **Fastify + Zenstack (Fastify Generator API CRUD + RBAC Auth Adapter for Prisma)**
- Infrastructure Multimedia Storage: **SeaweedFS (Instancia S3)**
- Persistant Database (HA): **PostgreSQL / repmgr / pgbouncer**
- CD Gestión Nodos Escalvos Docker Swarm: **Jenkins**
- CI/CD Gestión Nodos Maestros de Docker Swarm como en Producción / Testeo para Producción: **Github Actions**
- Server: **Fresh (Deno) (Frontend & Backend)**
- ORM: **Prisma**
- Registrador de imagenes privado: **Docker**
- Testing: **Deno**
- Métricas: **cAdvisor / Promethus / Grafana**
- Contenedores: **Imagenes oficiales en Docker / Imagenes Bitnami Docker**
- Orquestador de contenedores: **Docker Swarm**
- Cache Database: **Redis Server / Redis Cluster / Redis Sentinel**
- Docs: **Docosaurus**
- Client Payment: **Stripe: Tap To Pay (SDK) BC2C* / Suscription B2B** *Business Client to Client (Consumer)
- Business Payment: **Stripe**
- Reverse Proxy: **Treafik**
- Third-Party Multimedia Exporter: **Google Drive**
- CLI (Anit-boilerplate for Fresh & Fastify): **Commander.js**
- Generación de informes en PDF's: **LaTeX**
- Aplicación móvil para el Cliente: **Capacitor (SSR Embded)**
- Aplicación móvil para el Empleado: **React Native Expo**
- OWASP: **Traefik Crowsec Plugin**
- Automatize Installation Servers: **Ansible**

### Aspectos ténicos de Escalamiento Horizontal (HS)
Maneja por la conexión de los nodos sel mismo programa por ejemplo indpendiente del orquestador (Docker Swarm) a aplicarse, o puede ser aplicado por servicios contenarizados que se lanzan del mismo orquestador.

### Aspectos ténicos de Escalamiento Vertical (VS)
Aquí Docker Swarm limita las capacidades de los servicios del stack y puede gestiónar eficientemente los recursos de varios servicios.

### Como es el modelo del negocio?
Es un modelo de distribucción **SaaS**, para usarse sin problemas de infarestructura para cualquier empresa de forma muy intuitiva

### Que lenguajes de programación se usan para el proyecto?
##### Proposito General
- **Typescript** (Superset de Javascript)
##### Proposito Específico
- **SQL** (Structured Query Language)

### Como se manejan y guardan los datos?
- Se manejan la información backend por **API REST**
- Se guardan de forma persistente en **SQL**
- Archivos de configuración de documentación a través de **Markdown**
- Manejo de archivos declarativos de docker por **YAML**
- Manejo de cofiguraciónes frontend por **Typescript**

### Como puedo entender el estado de los documentos?
A través del **prefijo del emoji al titulo** referenciado del documento, podremos intuir fácilmente el estado del documento.

#### Documento de:

1. Creación:
   - **[🔴]** ...**no inicializado** 
   - **[🟡]** ...**no acabado**
   - **[🔵]** ...**a pulirse**
   - **[🟢]** ...**completado**
2. Refactorización:
   - **[🏗️]** ...**a modificarse**
   - **[❌]** ...**a eliminar**
   - **[🔄]** ...**a actualizarse**


### Como puedo entender el estado de las carpetas?

Por defecto la **mayoría** de las carpetas **no se requiren refactorizarse**, en el caso que si se tuviera que refactorizar será únicamente usar este prefijo:

- #### **[🚧]** Carpeta a refactorizarse


----

**Author** - Adrià Martín Martorell