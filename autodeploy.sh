#!/bin/bash

# ============================================================
# TienditaCampus - Script de Auto-Despliegue
# ============================================================

set -e

echo "🚀 Iniciando auto-despliegue..."

# 1. Sincronizar código
echo "📡 Bajando últimos cambios de Git..."
git pull origin main

# 2. Reconstruir y levantar contenedores
echo "🐳 Reconstruyendo contenedores Docker..."
docker compose down
docker compose up -d --build

# 3. Limpieza
echo "🧹 Limpiando imágenes y volúmenes huérfanos..."
docker image prune -f

echo "✅ Despliegue completado con éxito."
echo "Frontend: http://localhost:80"
echo "Backend API: http://localhost:3001/api"
