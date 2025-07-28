
# 🟡 Development Fullstack

En esta sección se explica como se desarrolla el software con el framework que se usa para el proyecto, y que dificultades como este framework hacen que se tenga que desarrollar mas de la cuenta.

## Fresh (Fullstack Framework)
Fresh es un marco de trabajo para desarrollar webs como desde el backend hasta el frontend, es muy jóven este marco de trabajo pero muy prometedor a la hora de desarrollar con ella con temas de rendimiento y optimización internas que se han hecho.

Yo no solo **úso Fresh** para Edge Computing sino como un **marco de trabajo multiproposito** con enfoque híbrido para backend integrado con la API por (Iaas / On-Premise (Self-Hosted)) junto con un sistema de **frontend híbrido optimizado y ligero** para usarse para cargar de la forma mas flexible y optima los diferente tipo de datos que se lleguen a usarse en la web todo por preact de base.

### Problems

1. **Librerias obsoletas**
    - Fresh al ser jóven puede cambair de versiónes con cambios muy significativos que hagan inmediatamente inusables librerías que ofrecian una funcionalidad esencial a la web, a través de librerías de terceros.
  
2. **Creación de funcionalidades desde zero**
    - Al tener librerías obsoletas que no se pueden usar, **tuvé que hacer funcionalidades para fresh manualmente** como: menejar el estado por CSR en zustand, creación del manejo de sesiónes por DenoKV, la modulabilidad de las funciones de los middlewares, la gestión de la traducción por SSR de las páginas con enrutación de las pages entre muchas otras funcionalidades.

3. **Versionamiento con grandes cambios**
    - Con grandes cambios en Fresh puede ser que de aquí una semana todo lo que tenga puesto en producción en Fresh sea en vano, por cambios que tenga que **restructurar todas mis funcionalidades a su nueva verisón no es simplemente tarea fácil**.

### Not everything is problems
Como Fresh **no tiene un ecosostema tan garnde como NextJS no significa que no sea mejor y mas optimo**, simplemente no tiene personas respaldando tanto por popularidad y no tantos casos de úso en producción.