
# 🟡 Page Client Auth Flow


```mermaid
graph LR;

    subgraph "🖥️ Client App (Auth)"
    

        subgraph "🌐 Fresh - Middleware"
            FreshPages[Frontend - Pages SSR/CSR]
            MiddlewareAuth[Middleware Auth]
            FreshPages --> MiddlewareAuth
        end

        subgraph "🔐 Keycloak - IAM"
            KeycloakLogin[Login OAuth2 / OpenID]
            TokenIssuer[Access & ID Tokens]
        end

        Client[📱 Cliente - Browser/App] -->|Navega/Interacciona| FreshPages

        KeycloakRedirect(Redirect /api/v1/oauth/callback añadiendo la sesión por medio de cookies)

        MiddlewareAuth -->|Redirección login| KeycloakLogin
        KeycloakLogin --> KeycloakRedirect

        Client -->|Llama a API con Bearer Token| FastifyAPI
        
        FreshPages -->|Consume API interna| FastifyAPI

        MiddlewareAuth --> TokenIssuer
        TokenIssuer --> MiddlewareAuth

    end

```