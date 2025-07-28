
# 🟡 Backend Client App Flow


```mermaid
graph LR;

    subgraph "🖥️ Cafetería Server"
    
        subgraph "🧠 Fastify - Lógica de negocio"
            FastifyAPI[API REST - Fastify]
            PrismaORM[Prisma ORM]
            PostgreSQL[Server PostgreSQL]
            MinIOStorage[MinIO Storage]
            
            FastifyAPI <--> PrismaORM
            FastifyAPI <--> MinIOStorage
            PrismaORM <--> PostgreSQL
        end

        subgraph "🌐 Fresh - Frontend SSR + Middleware"
            FreshPages[Frontend - Pages SSR/CSR]
            MiddlewareAuth[Middleware Auth]
            FreshPages --> MiddlewareAuth
        end

        subgraph "🌐 Fresh API - Frontend CSR"
            FreshWebsocketRPC[Websocket RPC]
            WebsocketMiddlewareAuth((Middleware Auth))
            RefreshTokenEndpoint[Refresh token from cookies]
            WebsocketMiddlewareAuth --> |Successful| FreshWebsocketRPC
            WebsocketMiddlewareAuth --> |Failed, redirect to /api/v1/public/business/ws/tokens/refresh| RefreshTokenEndpoint
            RefreshTokenEndpoint --> |Retry| WebsocketMiddlewareAuth
        end

        subgraph "🔐 Keycloak - IAM"
            KeycloakLogin[Login OAuth2 / OpenID]
            TokenIssuer[Access & ID Tokens]
        end

        Client[📱 Cliente - Browser/App] -->|Navega/Interacciona| FreshPages
        Client --> |Handshake one-only auth request| WebsocketMiddlewareAuth
        FreshWebsocketRPC --> |Peticiónes ilimitadas RPC sin auth excesivo por conexión autenticada| FastifyAPI

        MiddlewareAuth -->|Redirección login| KeycloakLogin
        KeycloakLogin -->|Devuelve Access Token| Client

        Client -->|Llama a API con Bearer Token| FastifyAPI
        
        FreshPages -->|Consume API interna| FastifyAPI

        MiddlewareAuth --> TokenIssuer
        TokenIssuer --> MiddlewareAuth

    end

```