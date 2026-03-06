#!/bin/bash

# ============================================
# TienditaCampus - Auto Restart Script
# ============================================
# Reinicia automáticamente los contenedores Docker cada 4 horas
# Configurar con cron: 0 */4 * * * /path/to/this/script.sh

echo "============================================"
echo "TienditaCampus - Auto Restart $(date)"
echo "============================================"

# Cambiar al directorio del proyecto
cd /path/to/proyecto-integrador-2 || exit 1

# Reiniciar contenedores
echo "Reiniciando contenedores Docker..."
docker compose down
docker compose up -d --build

# Verificar estado
echo "Verificando estado de contenedores..."
sleep 10
docker ps --filter "name=tienditacampus"

# Limpiar imágenes no utilizadas (opcional)
echo "Limpiando imágenes no utilizadas..."
docker image prune -f

echo "============================================"
echo "Reinicio completado - $(date)"
echo "============================================"
