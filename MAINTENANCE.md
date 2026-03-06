# ============================================
# TienditaCampus - Automated Maintenance Setup
# ============================================
# Instrucciones para configurar mantenimiento automático

## Configuración de Cron Jobs

### 1. Reinicio Automático cada 4 horas
```bash
# Editar crontab
crontab -e

# Agregar esta línea (cambiar la ruta al proyecto real):
0 */4 * * * /path/to/proyecto-integrador-2/auto-restart.sh >> /var/log/tienditacampus-restart.log 2>&1
```

### 2. Actualización Git Automática cada 4 horas
```bash
# Agregar esta línea a crontab:
0 */4 * * * /path/to/proyecto-integrador-2/auto-git-update.sh >> /var/log/tienditacampus-git.log 2>&1
```

## Monitoreo

### Ver logs de reinicio:
```bash
tail -f /var/log/tienditacampus-restart.log
```

### Ver logs de git:
```bash
tail -f /var/log/tienditacampus-git.log
```

## Comandos Manuales

### Reinicio manual:
```bash
cd /path/to/proyecto-integrador-2
./auto-restart.sh
```

### Actualización git manual:
```bash
cd /path/to/proyecto-integrador-2
./auto-git-update.sh
```

## Troubleshooting

- Asegurar que Docker esté corriendo
- Verificar permisos de los scripts (chmod +x)
- Revisar logs si hay errores
- Cambiar rutas en los scripts según instalación real
