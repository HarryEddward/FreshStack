#!/bin/bash

# Script para configurar PostgreSQL con PgBouncer y alta disponibilidad

echo "Configurando PostgreSQL con PgBouncer para alta disponibilidad..."

# Crear directorios necesarios
mkdir -p pgbouncer haproxy

# Generar hash MD5 para las contraseñas (ejemplo con 'super_secure_pass')
# Reemplaza 'super_secure_pass' con tu contraseña real
PASSWORD="super_secure_pass"
USER="adrian"
HASH=$(echo -n "${PASSWORD}${USER}" | md5sum | awk '{print $1}')
echo "Hash MD5 generado: md5${HASH}"

# Crear archivo userlist.txt con los hashes correctos
cat > pgbouncer/userlist.txt << EOF
"adrian" "md5${HASH}"
"postgres" "md5${HASH}"
EOF

# Etiquetar nodos en Docker Swarm (ajustar según tu configuración)
echo "Etiquetando nodos..."
echo "docker node update --label-add role=db1 <NODE_ID_1>"
echo "docker node update --label-add role=db <NODE_ID_2>"
echo "docker node update --label-add role=db <NODE_ID_3>"
echo "docker node update --label-add role=lb <NODE_ID_4>"

# Crear la red externa si no existe
docker network create --driver overlay --attachable fresh_framework_network 2>/dev/null || echo "Red ya existe"

# Desplegar el stack
echo "Desplegando stack..."
docker stack deploy -c docker-compose.yml postgres-ha

# Verificar el estado
echo "Verificando estado del deployment..."
docker stack services postgres-ha

echo ""
echo "Configuración completada!"
echo ""
echo "Conexiones disponibles:"
echo "- Puerto 5432: PgBouncer (conexión directa)"
echo "- Puerto 5433: HAProxy -> PgBouncer (balanceado)"
echo "- Puerto 8080: Estadísticas HAProxy"
echo ""
echo "Cadenas de conexión:"
echo "- Escritura: postgresql://adrian:super_secure_pass@localhost:5433/freshstack_write"
echo "- Lectura: postgresql://adrian:super_secure_pass@localhost:5433/freshstack_read"
echo "- Balanceada: postgresql://adrian:super_secure_pass@localhost:5433/freshstack"