
# 🔵 🔄 Frontend Store
**Missing: Falta enfatizar que el úso interno del estado solo es úso para manejo de datos públicos realciónado sobre los productos y no importantes como la misma sesión que se gestiona con cookies seguras junto con la autenticación segura con keycloak**

En este articulo sobre el menajo del CSR del estado por el frontend, explicaremos como funciona, como se gestiona y como se usa, dependiendo en cada caso que modulo apliquemos al código y estructura del proyecto.

### Stores Modules
- Zustand

### Why these store modules?
La librería zustand lo úso por su flexibilidad, ligereza y madurez que se tiene de una gestión de forma descentralizada y a medida de los datos a usarse. Con zustand se puede aplicar un middleware para hacer que los datos sean peristentes de una forma flexible y fácil de usarse sin complicaciónes con operaciones centralizadas como Redux. Es mas es ideal para este proyecto con Fresh hacinedo liviano con los islands usando en el CSR de forma optimizada.

### Storages Modules

- #### Web
  - @capacitor/preferences (localStorage)

- #### App
  - @capacitor/preferences (native)

### Why these storage modules?
Por úso de datos persistentes en web como en app, usa Zustand un middleware donde puedo personalizar las funciones persistentes para aplicar `@capacitor/preferences` para poder realizar operaciones persistentes clave/valor como web y app de la forma fácil.
