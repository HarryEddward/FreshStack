---
slug: structure-microservices-production
title: Gestión de microservicios relacionados en producción
authors: [adrian]
tags: [problem, arquitecture, integration, microservices]
---


# Estcutura de Microservicios en Producción

En este articulo se explica como se unificara a producción los certificados SSL como la seguridad en web (OSWAP), desde todo lo necesario a interconectarse al cliente final.

Implementa todo el flujo aplicado del cliente a los microservicios relacionando el SSL externo como interno, y como se aplican la seguridad entre ellos.


```mermaid
flowchart TB
    %% Cliente externo
    Client[Cliente - Navegador / App]

    %% Microservicios internos (HTTP)
    subgraph MicroservicesHTTP[Microservicios Internos - HTTP]
        PostgreSQKeycloak[PostgreSQL Keycloak - HA]
        PostgreSQGeneralAPI[PostgreSQL API - HA]
        OSWAP[Treafik Modsecurity Plugin]

        subgraph DockerSwarm[Docker Swarm - Network Encrypted]
            subgraph Traefik[Traefik - Proxy SSL / Router de Rutas]
                Keycloak[Keycloak - HTTP interno 8186]
                API[API General - HTTP interno 3800]
                Fresh[Web General - HTTP interno 8000]


                OSWAP --> Fresh
                Fresh --> |"/auth-keycloak/*"| Keycloak
                Fresh --> |"/api-services/*"| API
            end
            Keycloak --> PostgreSQKeycloak
        API --> PostgreSQGeneralAPI
        end
        
        
    end

    %% Frontend seguro
    subgraph MicroservicesHTTPS[Frontend - HTTPS Externo]
        FreshFrontend[Fresh Frontend - HTTPS]
        
        %% Flujo de tráfico externo hacia Traefik
        FreshFrontend --> |"/auth-keycloak/*"| Keycloak
        FreshFrontend --> |"/api-services/*"| API
    end

    %% Conexión del cliente con frontend HTTPS
    Client --> FreshFrontend
    Client --> |/*| OSWAP


```

<!-- truncate -->
