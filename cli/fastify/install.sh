#!/bin/bash

# Compilar el programa
deno task compile

# Mover el ejecutable a /usr/local/bin/
sudo mv ./dist/cafebuy_bp_fastify /usr/local/bin/
sudo chmod +x /usr/local/bin/cafebuy_bp_fastify

echo "✅ cafebuy_bp_fastify instalado globalmente."