# Arquitectura, Infraestructura y Despliegue — TienditaCampus

## 1. Infraestructura Docker unificada

- **Carpeta canónica de Dockerfiles de infraestructura**: `devops/docker/`
  - `devops/docker/frontend/Dockerfile`
  - `devops/docker/backend/Dockerfile`
  - `devops/docker/database/Dockerfile`
  - `devops/docker/nginx/Dockerfile`
- **Uso en `docker-compose.yml` (monorepo académico)**:
  - Frontend: `dockerfile: ../devops/docker/frontend/Dockerfile`
  - Backend: `dockerfile: ../devops/docker/backend/Dockerfile`
  - Database: `dockerfile: ../devops/docker/database/Dockerfile`

> Nota: Existen Dockerfiles duplicados bajo `frontend/devops/docker/**` pensados para cuando se usan repos separados de frontend/backend. Para el **monorepo actual**, la verdad de referencia es siempre `devops/docker/**`.

## 2. Base de datos centralizada

- **Fuente canónica de esquema y datos**: carpeta `database/`
  - `database/init/**` → extensiones y roles iniciales
  - `database/migrations/**` → migraciones SQL (Flyway)
  - `database/seeds/**` → datos de prueba
  - `database/scripts/**` → helpers (backup, reset, etc.)
- **Migraciones adicionales específicas de backend**:
  - `backend/src/database/migrations/**` → migraciones TypeORM en TypeScript cuando se ejecutan desde NestJS.

Regla práctica:
- Para **despliegues automatizados** con Docker/Flyway, usa siempre `database/migrations/**` como **fuente de verdad**.
- Las migraciones TS del backend se usan sólo cuando corres `npm run migration:*` desde el propio servicio.

## 3. Estructura de tests

- **Backend**:
  - Carpeta reservada: `backend/test/`
  - Recomendado:
    - Unit tests: `backend/test/unit/**`
    - E2E tests: `backend/test/e2e/**`
- **Frontend**:
  - Carpeta reservada: `frontend/tests/`
  - Recomendado:
    - Unit/Component tests: `frontend/tests/**/*.test.tsx`

Estas carpetas ya existen (con `.gitkeep`) para que el CI/CD tenga un lugar estándar donde buscar pruebas.

## 4. Capa de features en el frontend

- **Estructura base de dominio**:
  - `frontend/src/features/auth/**`
  - `frontend/src/features/products/**`
  - `frontend/src/features/sales/**`

Ejemplos ya conectados:

- **Productos**:
  - Componente de tarjeta de producto expuesto como feature:
    - `frontend/src/features/products/product-card.tsx`
    - Reexporta desde `@/components/product-card` para no duplicar lógica.
  - Uso actual:
    - `frontend/src/app/seller/[id]/page.tsx` importa `ProductCard` desde `@/features/products/product-card`.

- **Cierre de día (ventas)**:
  - `frontend/src/features/sales/close-day-dialog.tsx`
  - Reexporta desde `@/components/sales/close-day-dialog`.

Regla:
- **`src/components/ui/**`** → componentes puramente de presentación y reutilizables (botones, inputs, dialogs, etc.).
- **`src/features/**`** → componentes y lógica de **dominio** (auth, products, sales, etc.).

## 5. Documentación vs tooling

- **Documentación funcional del producto**:
  - Ahora centralizada en `docs/` (este archivo y futuros manuales).
  - Ejemplos de contenido para `docs/`:
    - Manual de arquitectura.
    - Guía de uso de la app.
    - Estrategia de pruebas.

- **Material de tooling / skills**:
  - Permanece en `SKILL/`:
    - `azure-deploy`, `azure-observability`, `azure-diagnostics`, `azure-cost-optimization`, `web-design-guidelines`, `find-skills`, `antigravity-hardcode-remover`, etc.
  - Son utilidades y guías para herramientas externas (Azure, hardcode remover, etc.), no documentación de negocio de TienditaCampus.

## 6. Repositorios Git e instancias (3-tier)

Según `backend/docs/DECISIONES_Y_TROUBLESHOOTING.md` y `resumen_sesion_aws.md`, la arquitectura académica se despliega con **3 repos** y **3 instancias**:

- **Repos lógicos** (a partir del monorepo original):
  1. **Repo Frontend** — contenido de `frontend/` (Next.js 14 PWA).
  2. **Repo Backend** — contenido de `backend/` (NestJS API).
  3. **Repo Database/Infra** — contenido de `database/` + `devops/` (migraciones y Docker de BD).

- **Instancias AWS documentadas**:
  1. **Base de Datos**
     - Instancia: `i-0bbd2a3ecd5858169` (`base-de-d`)
     - IP pública: `34.235.94.221`
     - Servicios: PostgreSQL + MongoDB en Docker.
  2. **Backend**
     - Instancia: `i-0bbd2a3ecd5858169` (`TienditaCampus-Backend`)
     - IP pública: `98.82.69.208`
     - Servicios: NestJS + Docker compose para backend.
  3. **Frontend**
     - Instancia: `i-0a5003dda1ea6b075` (`fronted-tienditacampus`)
     - IP pública: `54.157.136.124`
     - Servicios: Nginx + Frontend (Next.js).

### 6.1. Mapeo recomendado para un auto-deployer

Para un sistema de auto-deploy (fuera de este repo), el mapeo típico sería:

- **FRONTEND_REPO_URL** → repo que contiene sólo `frontend/`
  - **TARGET_HOST** → `fronted-tienditacampus`
  - **SSH_KEY** → llave asociada a esa instancia (ver sección 7)

- **BACKEND_REPO_URL** → repo que contiene sólo `backend/`
  - **TARGET_HOST** → `TienditaCampus-Backend`
  - **SSH_KEY** → llave asociada a backend

- **DATABASE_REPO_URL** → repo que contiene sólo `database/` + `devops/docker/database`
  - **TARGET_HOST** → `base-de-d`
  - **SSH_KEY** → llave asociada a base de datos

El auto-deployer debería:
1. Clonar el repo correspondiente.
2. Ejecutar `docker compose` (o el comando que definas) en la carpeta adecuada.
3. Usar la llave `.pem` correcta para cada instancia.

## 7. Llaves `.pem` y credenciales

### 7.1. Llaves documentadas (no incluidas en texto plano)

En `resumen_sesion_aws.md` se mencionan las llaves:

- Llave para Backend/Frontend: nombre de archivo `CLAVE-CLAVES-INTEGRADOR.pem` y una nueva `llaves-fronted-tiendita` (nombre lógico).
- Llave para Base de Datos: `clave-base-de-datos.pem`.

Estas llaves **no deben guardarse en Git**. Deben vivir sólo:
- En tu máquina local (carpeta segura, permisos `600`).
- En un gestor de secretos (si tu auto-deployer lo soporta).

### 7.2. Llaves detectadas en el repo

- Archivo físico encontrado: `linux-clave.pem` en la raíz del proyecto.

Aunque `.gitignore` ya tiene `*.pem`, este archivo quedó **versionado** en algún momento. Recomendación:
- Dejar de rastrearlo en Git (`git rm --cached linux-clave.pem`) pero conservarlo local si lo necesitas.
- Rotar la llave en AWS si sospechas que se compartió el repo.

### 7.3. Uso típico en auto-deployer (ejemplo conceptual)

Variables de entorno para tu auto-deployer:

- `FRONTEND_SSH_KEY=/ruta/CLAVE-CLAVES-INTEGRADOR.pem`
- `BACKEND_SSH_KEY=/ruta/CLAVE-CLAVES-INTEGRADOR.pem`
- `DATABASE_SSH_KEY=/ruta/clave-base-de-datos.pem`

Y comandos tipo:

```bash
ssh -i "$BACKEND_SSH_KEY" ec2-user@98.82.69.208 "cd /ruta/backend && docker compose pull && docker compose up -d"
ssh -i "$FRONTEND_SSH_KEY" ec2-user@54.157.136.124 "cd /ruta/frontend && docker compose pull && docker compose up -d"
ssh -i "$DATABASE_SSH_KEY" ec2-user@34.235.94.221 "cd /ruta/database && docker compose pull && docker compose up -d"
```

> Importante: estos comandos son sólo una guía. Ajusta usuario SSH, rutas y comandos exactos a tu configuración real. Nunca subas las llaves `.pem` ni contraseñas a Git.

