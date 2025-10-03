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
envsubst < /etc/seaweedfs/s3.json.template > /etc/seaweedfs/s3.json
cat /etc/seaweedfs/s3.json


echo "Iniciando S3..."
exec weed s3 -filer=filer:8888 -ip.bind=0.0.0.0 -port=8333 -config=/etc/seaweedfs/s3.json -allowEmptyFolder=true -allowDeleteBucketNotEmpty=false