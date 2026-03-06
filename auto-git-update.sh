#!/bin/bash

# ============================================
# TienditaCampus - Auto Git Update Script
# ============================================
# Actualiza automáticamente los repositorios Git
# Configurar con cron: 0 */4 * * * /path/to/this/script.sh

echo "============================================"
echo "TienditaCampus - Auto Git Update $(date)"
echo "============================================"

# Cambiar al directorio del proyecto
cd /path/to/proyecto-integrador-2 || exit 1

# Verificar si hay cambios locales no commitedos
if [[ -n $(git status --porcelain) ]]; then
    echo "Hay cambios locales no commitedos. Hacer commit primero."
    exit 1
fi

# Hacer pull de cambios remotos
echo "Actualizando repositorio..."
git pull origin main

# Si hay conflictos, abortar
if [[ $? -ne 0 ]]; then
    echo "Error en git pull. Resolver conflictos manualmente."
    exit 1
fi

# Verificar si hay actualizaciones disponibles
echo "Verificando actualizaciones disponibles..."
git fetch --tags

# Mostrar estado del repositorio
echo "Estado del repositorio:"
git status
git log --oneline -5

echo "============================================"
echo "Actualización completada - $(date)"
echo "============================================"
