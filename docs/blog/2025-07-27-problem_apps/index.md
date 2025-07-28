---
slug: gestion-interaplicacion-ssr-nativa
title: Gestión interaplicación con Aplicaciones SSR embebidas y Aplicaciones nativas multiplataforma
authors: [adrian]
tags: [problem, arquitecturas-moviles, integracion]
---

En este artículo se analiza un problema común en arquitecturas móviles mixtas: la integración y gestión entre aplicaciones móviles **SSR embebidas** y aplicaciones móviles **nativas multiplataforma**, con especial énfasis en las limitaciones estructurales impuestas por el uso de WebViews y tecnologías centradas en el renderizado del lado del servidor. Asimismo, se detalla la interacción entre dichas aplicaciones mediante mecanismos de interoperabilidad como **deeplinks**.

## Enfoque de arquitectura

El ecosistema analizado se basa en el framework **Fresh**, del runtime **Deno**, el cual adopta una filosofía de **renderizado 100 % del lado del servidor (SSR)**. Esta decisión implica una arquitectura fuertemente acoplada al servidor y con una dependencia explícita en el uso de sesiones **stateful** persistidas en **Redis**.

Estas aplicaciones se empaquetan y distribuyen como aplicaciones móviles utilizando **Capacitor**, sirviendo toda la interfaz y lógica desde un **WebView**. No existe una SPA (Single Page Application), ni lógica reactiva en el cliente, ni se emplea CSR (Client-Side Rendering) de ningún tipo.

Como consecuencia, toda la aplicación móvil actúa como un contenedor estático que representa una página web renderizada desde el servidor, sin interacciones o actividades detectables a nivel del sistema operativo.

## Problemática principal

El modelo descrito presenta ventajas evidentes en términos de simplicidad, mantenimiento y peso de la aplicación, pero introduce una limitación crítica:

> Las aplicaciones SSR embebidas en WebViews carecen de actividad nativa reconocida por el sistema operativo, lo que impide gestionar correctamente flujos interaplicación mediante deeplinks u otras formas de invocación directa entre apps.

En otras palabras, al carecer de una "actividad" activa (como las que se generan automáticamente en entornos React Native o Flutter), el sistema operativo no es capaz de enrutar, restaurar o controlar de forma eficaz estas aplicaciones cuando se las invoca desde otra app móvil.

Esto genera dificultades significativas al intentar establecer una interacción fluida entre una aplicación SSR embebida y otra aplicación móvil nativa.

## Caso concreto: microtransacciones NFC

Un caso práctico que evidencia esta limitación es la necesidad de implementar **microtransacciones mediante tecnología NFC**, específicamente utilizando **Stripe Tap to Pay**.

Dado que estas funciones requieren acceso directo a APIs nativas del sistema operativo, no es viable integrarlas dentro de una WebView ni desde una aplicación SSR. Esto obliga a desarrollar una **aplicación móvil nativa real** con acceso a las capacidades del sistema.

La solución adoptada se basa en una aplicación desarrollada con **Expo (React Native)**, que permite:

- Soporte multiplataforma consistente.
- Estructura de rutas por sistema de archivos.
- Integración con middlewares de validación mediante la API centralizada.
- Gestión de sesiones a través de JWT firmados por el backend, usando identificadores seguros (SID) para el control de autenticación.

Esta aplicación actúa como el entorno operacional nativo para procesos sensibles como pagos físicos, comunicaciones NFC y notificaciones avanzadas.

## Conclusión

El uso de aplicaciones SSR embebidas en WebView constituye una solución adecuada para muchas interfaces móviles orientadas a contenido, formularios, o tareas administrativas. Sin embargo, cuando se requiere una integración profunda con funcionalidades del sistema operativo, es indispensable contar con una aplicación móvil nativa real que pueda ejecutar lógica sensible fuera del entorno WebView.

La coexistencia de ambos enfoques dentro de un mismo ecosistema requiere una arquitectura clara, donde se defina explícitamente qué tareas corresponden a cada entorno. Asimismo, se deben establecer mecanismos de comunicación estandarizados entre ambas aplicaciones (por ejemplo, deeplinks con tokens firmados) para garantizar una experiencia de usuario unificada, segura y consistente.


<!-- truncate -->
