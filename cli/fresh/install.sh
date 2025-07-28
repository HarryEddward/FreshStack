#!/bin/bash

# Compilar el programa
cd ~/Documentos/FreshStack/cli
deno task compile

# Mover el ejecutable a /usr/local/bin/
sudo mv ./dist/cafebuy_bp_fresh /usr/local/bin/
sudo chmod +x /usr/local/bin/cafebuy_bp_fresh

echo "✅ cafebuy_bp_fresh instalado globalmente."