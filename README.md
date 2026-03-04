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
docker compose up

# 4. Acceder
# Frontend: http://localhost:8080
# Backend:  http://localhost:3001/api
```

## Estructura del Proyecto

```
proyecto_integrador/
├── devops/          # Docker, scripts, Nginx
├── database/        # Migraciones, seeds, init scripts
├── backend/         # NestJS API REST
├── frontend/        # Next.js 14 PWA
└── docs/            # Documentacion del proyecto
```

## Seguridad

- Cero credenciales hardcodeadas
- Variables de entorno via `.env` (nunca versionado)
- Roles PostgreSQL separados (admin, user, readonly)

## Equipo

Universidad Politecnica de Chiapas — Proyecto Integrador
