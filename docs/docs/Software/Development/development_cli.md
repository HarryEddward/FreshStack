# 🟡 Development CLI

## CLI anti-boilerplate de manejo de handlers de backend extremadamente escalable

En esta sección se habla como creé una CLI para facilitar mucho mas el desarrollo en Fresh para mejorar el evitar el boilerplate excesivo de la creación de handlers de backend para Fresh extremadamente escabales y muy bien seccionadas.

### Problema
Si hubiera **ido pegado uno por uno debería reescribir cada uno de los nombres** y diferentes tipos dentro de cada uno y es muy pero que muy pesado de hacer esto me **consumiría 10' a 20'**

### CLI vs Fresh Boilerplate

Fresh es un framework fulltack con efoque hibrido y optimo de creación de web's app's. A la hora de escalar con el backend suele ser tedioso tener que repetir por cada uno de los archivos que separan los handlers por archivos modularizados como: **_controller.ts**, **_payload.ts**, **_response.ts**, **_service.ts**, **_types.ts**, **_utils.ts** y **_validation.ts**.

Y claro tener que cambiar las variables uno por uno que no son pocos, desde la interfaces hasta las funciones abordando con los problemas humanos que también puede ser un coste de tiempo, me ahorra mucho tiempo envitando con un **CLI con commander.js** y luego **exportando el programa ya compilado desde Deno como acceso global en cualquier terminal**. Como lo hace React.js o Vue.js en su propia CLI.