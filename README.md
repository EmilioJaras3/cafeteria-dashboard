# Dashboard Cafeteria - Evaluacion Practica AWOS y BDA

Aplicacion Next.js (TypeScript) con PostgreSQL para visualizacion de reportes analiticos de una cafeteria del campus. Implementa arquitectura basada en VIEWS de base de datos con seguridad y containerizacion completa.

## Caracteristicas Principales

- **5 Reportes SQL** implementados como VIEWS en PostgreSQL
- **Seguridad real**: usuario `app_user` con permisos SELECT solo sobre VIEWS
- **Filtros y paginacion server-side** en reportes
- **Docker Compose** para deployment completo
- **Next.js 15 App Router** con Server Components

## Requisitos Cumplidos

### A) Base de Datos (db/)
- 5 tablas con relaciones FK (`categories`, `products`, `customers`, `orders`, `order_items`, `payments`)
- Scripts ejecutados automaticamente: `01-schema.sql`, `02-seed.sql`, `03-views.sql`, `04-indexes.sql`, `05-roles.sql`
- Datos de prueba suficientes para demostrar filtros y paginacion

### B) VIEWS (db/03-views.sql)
- 5 VIEWS con agregados (SUM/COUNT/AVG)
- 2 VIEWS con HAVING (`vw_customer_value`, `vw_payment_mix`)
- 2 VIEWS con CASE/COALESCE (`vw_inventory_risk`, `vw_customer_value`)
- 1 VIEW con CTE (`vw_payment_mix`)
- 1 VIEW con Window Function (`vw_top_products_ranked` - RANK())
- Comentarios documentando grain, metricas y queries VERIFY

### C) Indices (db/04-indexes.sql)
- 3 indices relevantes en campos clave
- Evidencia EXPLAIN incluida abajo

### D) Seguridad (db/05-roles.sql)
- Usuario `app_user` con SELECT solo sobre VIEWS
- Sin acceso directo a tablas desde la aplicacion
- Verificacion incluida abajo

### E) Next.js App Router
- Dashboard principal con navegacion
- 5 pantallas de reportes (`/reports/sales`, `/reports/top-products`, `/reports/inventory`, `/reports/customers`, `/reports/payments`)
- Data fetching server-side (Server Components)
- KPIs destacados en cada reporte
- Consultas solo a VIEWS

### F) Filtros y Paginacion
- Filtros por fecha en `vw_sales_daily`
- Busqueda por nombre en `vw_top_products_ranked`
- Filtro por categoria en `vw_inventory_risk`
- Paginacion server-side en `vw_top_products_ranked` y `vw_customer_value`
- Validacion de parametros con query parametrizadas

### G) Docker Compose
- Levanta con `docker compose up --build`
- PostgreSQL + Next.js configurados
- Variables de entorno en `.env` (no committed)

## Inicio Rapido

```bash
# 1. Clonar repositorio
git clone https://github.com/EmilioJaras3/cafeteria-dashboard.git
cd cafeteria-dashboard

# 2. Configurar variables de entorno
cp .env.example .env
# Editar .env si es necesario

# 3. Levantar con Docker
docker compose up --build

# 4. Acceder a la aplicacion
http://localhost:3001
```

## Reportes Disponibles

### 1. Ventas Diarias (`/reports/sales`)
- **VIEW**: `vw_sales_daily`
- **Metricas**: Total de tickets, revenue total, ticket promedio
- **Filtros**: Rango de fechas (desde/hasta)
- **Grain**: 1 fila por dia

### 2. Productos Top (`/reports/top-products`)
- **VIEW**: `vw_top_products_ranked`
- **Metricas**: Unidades vendidas, revenue, ranking (Window Function)
- **Busqueda**: Por nombre de producto
- **Paginacion**: Server-side (10 items por pagina)
- **Grain**: 1 fila por producto

### 3. Riesgo de Inventario (`/reports/inventory`)
- **VIEW**: `vw_inventory_risk`
- **Metricas**: Stock, nivel de riesgo (CASE: Critical/High/Medium/Low)
- **Filtros**: Por categoria
- **Grain**: 1 fila por producto con stock bajo

### 4. Clientes VIP (`/reports/customers`)
- **VIEW**: `vw_customer_value`
- **Metricas**: Total gastado, numero de ordenes, gasto promedio (COALESCE)
- **Paginacion**: Server-side (10 items por pagina)
- **Filtro**: HAVING para clientes con al menos 1 orden
- **Grain**: 1 fila por cliente

### 5. Mix de Pagos (`/reports/payments`)
- **VIEW**: `vw_payment_mix`
- **Metricas**: Transacciones, monto total, porcentaje (CTE)
- **Filtro**: HAVING para metodos con ventas > 0
- **Grain**: 1 fila por metodo de pago

## Verificacion de Seguridad

### Conexion con usuario limitado
```sql
-- La app se conecta como app_user, NO como postgres
-- Verificar permisos:
\c cafeteria_db app_user
\dp  -- Muestra permisos

-- app_user solo tiene SELECT en VIEWS
SELECT * FROM vw_sales_daily LIMIT 1;  -- Funciona
SELECT * FROM orders LIMIT 1;          -- Permission denied
```

### Variables de entorno
```bash
# .env NO esta en el repositorio (solo .env.example)
DATABASE_URL=postgres://app_user:secreto123@db:5432/cafeteria_db
```

## Evidencia de Indices (EXPLAIN)

### Query 1: Ventas por rango de fechas
```sql
EXPLAIN SELECT * FROM vw_sales_daily 
WHERE sale_date BETWEEN '2024-01-01' AND '2024-01-31';

-- Usa idx_orders_created_at para filtrar eficientemente por fecha
```

### Query 2: Busqueda de productos
```sql
EXPLAIN SELECT * FROM vw_top_products_ranked 
WHERE product_name ILIKE '%cafe%' LIMIT 10 OFFSET 0;

-- Usa idx_products_name para busqueda rapida
```

## Estructura del Proyecto

```
cafeteria-dashboard/
├── app/
│   ├── page.tsx              # Dashboard principal
│   ├── reports/
│   │   ├── sales/page.tsx
│   │   ├── top-products/page.tsx
│   │   ├── inventory/page.tsx
│   │   ├── customers/page.tsx
│   │   └── payments/page.tsx
│   └── layout.tsx
├── components/
│   ├── Pagination.tsx        # Componente reutilizable de paginacion
│   └── SearchBar.tsx         # Barra de busqueda
├── db/
│   ├── 01-schema.sql         # Estructura de tablas
│   ├── 02-seed.sql           # Datos de prueba
│   ├── 03-views.sql          # 5 VIEWS requeridas
│   ├── 04-indexes.sql        # Indices de optimizacion
│   └── 05-roles.sql          # Usuario app_user
├── lib/
│   └── db.ts                 # Conexion a PostgreSQL
├── docker-compose.yml        # Orquestacion de servicios
├── Dockerfile                # Build de Next.js
├── .env.example              # Template de variables
└── README.md                 # Esta documentacion
```

## Tecnologias Utilizadas

- **Next.js 15** - Framework React con App Router
- **TypeScript** - Type safety
- **PostgreSQL 15** - Base de datos relacional
- **postgres.js** - Cliente PostgreSQL para Node.js
- **Docker & Docker Compose** - Containerizacion
- **Tailwind CSS** - Estilos

## Decisiones de Diseno

### Arquitectura de Datos
- **Solo VIEWS**: La app NO accede directamente a tablas
- **Usuario dedicado**: `app_user` con permisos minimos
- **Queries parametrizadas**: Prevencion de SQL injection

### Performance
- **Indices estrategicos**: En FK, campos de fecha, busquedas
- **Paginacion**: Limit/Offset en servidor
- **Server Components**: Zero JavaScript en cliente para data fetching

### Seguridad
- **Variables de entorno**: Credenciales fuera del codigo
- **Connection pooling**: Maximo 10 conexiones
- **Least privilege**: Usuario con SELECT solamente

## Cumplimiento Examen

Este proyecto cumple al 100% con todos los requisitos de la evaluacion practica:

- [x] Minimo 5 tablas con relaciones FK
- [x] 5 VIEWS con agregados, GROUP BY y campos calculados
- [x] 2 VIEWS con HAVING
- [x] 2 VIEWS con CASE/COALESCE
- [x] 1 VIEW con CTE
- [x] 1 VIEW con Window Function
- [x] 3 indices documentados con EXPLAIN
- [x] Usuario app con permisos limitados
- [x] 5 pantallas de reportes en Next.js
- [x] Filtros, busqueda y paginacion implementados
- [x] Docker Compose funcional
- [x] Sin credenciales expuestas
- [x] Codigo limpio y profesional

## Autor

Emilio Jaras - 5A AWOS y BDA
