#!/bin/bash

# Script de diagnóstico completo para Docker Swarm
set -e

echo "======================================"
echo "  DIAGNÓSTICO DOCKER SWARM"
echo "======================================"
echo ""

# 1. Verificar estado de los servicios
echo "1. ESTADO DE SERVICIOS:"
echo "--------------------------------------"
sudo docker service ls
echo ""

# 2. Ver tasks fallidas de cada servicio
echo "2. TASKS FALLIDAS:"
echo "--------------------------------------"
for service in $(sudo docker service ls --format '{{.Name}}' | grep -v 'traefik_traefik\|traefik_crowdsec\|seaweedfs_volume'); do
    echo ""
    echo "=== $service ==="
    sudo docker service ps "$service" --no-trunc --format "table {{.ID}}\t{{.Name}}\t{{.CurrentState}}\t{{.Error}}" | head -n 5
done
echo ""

# 3. Verificar secrets
echo "3. SECRETS DISPONIBLES:"
echo "--------------------------------------"
sudo docker secret ls
echo ""

# 4. Verificar configs
echo "4. CONFIGS DISPONIBLES:"
echo "--------------------------------------"
sudo docker config ls
echo ""

# 5. Verificar networks
echo "5. NETWORKS DISPONIBLES:"
echo "--------------------------------------"
sudo docker network ls | grep -E 'traefik|seaweedfs|overlay'
echo ""

# 6. Logs de servicios críticos (últimas 20 líneas)
echo "6. LOGS DE SERVICIOS CRÍTICOS:"
echo "--------------------------------------"

CRITICAL_SERVICES=(
    "redis_redis-master"
    "postgresql_postgres-primary"
    "prelaunch_prelaunch"
    "seaweedfs_master"
)

for service in "${CRITICAL_SERVICES[@]}"; do
    echo ""
    echo "=== LOGS: $service ==="
    sudo docker service logs "$service" --tail 20 2>&1 || echo "No hay logs disponibles"
done

echo ""
echo "======================================"
echo "  DIAGNÓSTICO COMPLETADO"
echo "======================================"