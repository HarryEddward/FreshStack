---
slug: manage-infra-to-production
title: Gestionando infraestructura a producción
authors: [adrian]
tags: [production, microservices]
---


# Gestionando infraestructura a producción

Al crear un programa a producción no es suficiente aplicar un db con PostgreSQL y la misma web expuesta con SSL. Hay que entender que a la vida real, cada minuto del programa que se usa cuenta como dinero indirecto dentro de las empresas clientes. Y a la practica todo la disponibilidad, acceso y ejecucción es altamente critico.

En este caso estaremos hablando a producción un gestor de contenedores en docker swarm, autoatización de servidores ansible entre muchos programas que se especializan en solucionar un problema.

En el caso de hacer pruebas a nivel local, no es suficiente manejable de configurar algo que se aplica a producción. En el caso de usar un dominio, aplicando SSL juntamente con DNS a producción con un servidor VPS, cambia compeltamente el paradigma de testeo. Claro pensando que con una persona debe de iterar rapido sin configruar 2 entornos separados a la vez.

Aquí es donde entramos a hacer pruebas en producción, sin 2 entornos separados de pruebas como tal. Sino un servidor de pruebas directo a producción.

```mermaid
flowchart LR
    Provider[OVHCloud VPS]
    Price[16.92€]

    Provider --> Price
```


