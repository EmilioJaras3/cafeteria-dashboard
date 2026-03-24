# TienditaCampus

> Herramientas Digitales para Vendedores Universitarios — Universidad Politecnica de Chiapas

Aplicacion Web Progresiva (PWA) para vendedores universitarios. Permite entender rentabilidad real, reducir perdidas de productos perecederos y tomar mejores decisiones de inventario.

## Arquitectura

Arquitectura Orientada a Servicios (SOA) con 4 servicios desacoplados:

| Servicio | Tecnologia | Puerto |
|----------|-----------|--------|
| Frontend | Next.js 14 (PWA) | 3000 |
| Backend | NestJS | 3001 |
| Database | PostgreSQL 16 | 5432 |
| Proxy | Nginx | 80/443 |

## Inicio Rapido

### Prerequisitos
- Docker v20+ y Docker Compose v2+
- Node.js 20+ (para desarrollo local sin Docker)

### Configuracion

```bash
# 1. Clonar el repositorio
git clone <repo-url> && cd proyecto_integrador

# 2. Generar archivo .env
cp .env.example .env

# 3. Levantar en desarrollo
docker compose up -d --build

# 4. Acceder
# Frontend: http://localhost:3000
# Backend:  http://localhost:3001/api
```

## Configuración Centralizada

El proyecto utiliza configuración centralizada generada automáticamente por **AntiGravity Hardcode Remover**:

```
config/
├── api.js         # Configuración de APIs y variables de entorno
└── database.js    # Configuración de base de datos MySQL
```

### Variables de Entorno
- `.env` - Variables reales (NO versionar)
- `.env.example` - Template para desarrollo

## Estructura del Proyecto

```
proyecto_integrador/
├── config/          # Configuración centralizada (generada automáticamente)
├── devops/          # Docker, scripts, Nginx
├── database/        # Migraciones, seeds, init scripts
├── backend/         # NestJS API REST
├── frontend/        # Next.js 14 PWA
├── SKILL/           # Skills y herramientas de desarrollo
└── docs/            # Documentacion del proyecto
```

## Seguridad

- ✅ Cero credenciales hardcodeadas (migradas con AntiGravity)
- ✅ Variables de entorno via `.env` (nunca versionado)
- ✅ Roles PostgreSQL separados (admin, user, readonly)
- ✅ Configuración centralizada en `config/`

## Herramientas Aplicadas

- **AntiGravity Hardcode Remover**: Eliminó valores hardcodeados y generó configuración centralizada
- **Docker Compose**: Orquestación de servicios
- **PostgreSQL**: Base de datos relacional
- **Nginx**: Reverse proxy y balanceo de carga

## Mantenimiento Automático

El proyecto incluye scripts para mantenimiento automático:

### Scripts de Automatización
- **`auto-restart.sh`** - Reinicio automático de contenedores cada 4 horas
- **`auto-git-update.sh`** - Actualización automática del repositorio Git

### Configuración
Ver `MAINTENANCE.md` para instrucciones de configuración de cron jobs.

## Benchmarking y Analytics

### BigQuery Integration
- Envío automático de métricas a Google BigQuery
- Dataset: `benchmarking_warehouse`
- Tabla: `daily_query_metrics`
- Requiere credenciales de Google Cloud

### Variables de Entorno Requeridas
```bash
GOOGLE_CLOUD_PROJECT=data-from-software
BIGQUERY_PROJECT_ID=data-from-software
BIGQUERY_DATASET_ID=benchmarking_warehouse
BIGQUERY_TABLE_ID=daily_query_metrics
GOOGLE_APPLICATION_CREDENTIALS=/app/service-account-key.json
```
