# 🟡 Development Runtimes

En esta sección explica como se manejan activamente 2 runtimes a la vez de javascript, con la que hace uso de Deno y NodeJS

## Tool version manager: ASDF
Es un manejador de versiónes de difernetes entornos como Node, hasta Golang. Para eivtar lios inecesarios entre difernetes entornos activos a la vez en un misma carpeta los separa sin problemas.

## Porque se usa?
Deno usa Fresh pero, Deno no siempre son compatibles con las librerías no estan bien integradas con Nodejs. Y es un problema al menejar librerias robustas, que se basan de Node en el frontend.

No queda mas que usar varios entornos activos a la vez con Deno y Node.


Si no funciona bien por la mezcla de los entornos de node_modules, se aplica a forzar para parchear el problema:
`npm install --legacy-peer-deps` o
`npm install --force`