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

## Equipo

Universidad Politecnica de Chiapas — Proyecto Integrador
