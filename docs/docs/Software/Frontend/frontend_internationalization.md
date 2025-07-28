
# 🟡 Frontend Internationalization

**Missing: Se debe de refactorizar el diseño del docuemnto y mejorar el entendimiento sobre los estados y las sesiónes. Los estados persisten en el navegador pero es información de contenido no crítico, mientars las sesión suelen obtener información sensible en tokens y infroamción mas personal y precisa del ususario identificado.**

En esta sección explcia el úso de la internacionalización en frontend, como aplicado en las rutas web y como se maneja internamnete con estrategias todos los procesos de cambios de idioma.

---

## Strategy
- ### Prefijos de idioma en las URLs


---
## Middleware & Cookie
Para el manejo con rutas puras SSR a través de Fresh implementamos un middleware para todas las páginas, como estrategía de SEO y como caracterítica de mejora en temas de mantenimiento e implementación a las páginas al implementar la internacionalización.

Verifica como la cookie donde tiene el idioma por defecto y el úso actual del idioma que usa, sin muchos problemas de enrutamiento.

Si no se encuentra la cookie establece un idioma por defecto, como es por ejemplo con el "Mallorquín" como para promover la cultura local con el idioma.

