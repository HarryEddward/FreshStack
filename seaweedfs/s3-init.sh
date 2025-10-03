#!/bin/sh
set -e

apk add --no-cache gettext

echo "Verificando secrets..."
test -f /run/secrets/seaweedfs_s3_access_key || { echo "Error: seaweedfs_s3_access_key no existe"; exit 1; }
test -f /run/secrets/seaweedfs_s3_secret_key || { echo "Error: seaweedfs_s3_secret_key no existe"; exit 1; }
test -f /run/secrets/seaweedfs_s3_username || { echo "Error: seaweedfs_s3_username no existe"; exit 1; }

echo "Leyendo secrets..."
export S3_ACCESS_KEY=$(cat /run/secrets/seaweedfs_s3_access_key | tr -d '\n\r\t ')
export S3_SECRET_KEY=$(cat /run/secrets/seaweedfs_s3_secret_key | tr -d '\n\r\t ')
export S3_USERNAME=$(cat /run/secrets/seaweedfs_s3_username | tr -d '\n\r\t ')

echo "Verificando valores de secrets..."
[ -n "$S3_USERNAME" ] || { echo "Error: S3_USERNAME está vacío"; exit 1; }
[ -n "$S3_ACCESS_KEY" ] || { echo "Error: S3_ACCESS_KEY está vacío"; exit 1; }
[ -n "$S3_SECRET_KEY" ] || { echo "Error: S3_SECRET_KEY está vacío"; exit 1; }

echo "Variables cargadas:"
echo "S3_USERNAME: $S3_USERNAME"
echo "S3_ACCESS_KEY length: $(echo -n "$S3_ACCESS_KEY" | wc -c)"
echo "S3_SECRET_KEY length: $(echo -n "$S3_SECRET_KEY" | wc -c)"


echo "Generando configuración S3 con envsubst..."
mkdir -p /etc/seaweedfs
envsubst < /tmp/s3.json.template > /etc/seaweedfs/s3.json
cat /etc/seaweedfs/s3.json

echo "Verificando sintaxis JSON básica..."
grep -q '^{.*}$' /etc/seaweedfs/s3.json || { echo "Error: JSON inválido"; cat /etc/seaweedfs/s3.json; exit 1; }

echo "Esperando filer (máx 30s)..."
for i in $(seq 1 30); do
  if nc -z filer 8888; then
    echo "Filer conectado!"
    break
  fi
  echo "Esperando filer, intento $i..."
  sleep 1
done
[ $? -eq 0 ] || { echo "Error: No se pudo conectar al filer en 30s"; exit 1; }

echo "Iniciando S3..."
exec weed s3 -filer=filer:8888 -ip.bind=0.0.0.0 -port=8333 -config=/etc/seaweedfs/s3.json -allowEmptyFolder=true -allowDeleteBucketNotEmpty=false