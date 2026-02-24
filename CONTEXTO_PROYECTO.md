# TienditaCampus - Arquitectura y Flujo del Sistema

Este documento tiene el propósito de explicar de forma detallada e ingenieril cómo está construido TienditaCampus, cómo interactúan sus partes y cómo funciona el flujo completo, especialmente el módulo de Benchmarking (Unidad 2).

Úsalo para tener claro todo el contexto técnico del proyecto y poder explicárselo a cualquier profesor o a otra IA si necesitas seguir desarrollando funcionalidades.

---

## Hipótesis del Proyecto

## Hipótesis del Proyecto

*Proporcionar a los vendedores universitarios de snacks un dashboard analítico que registre su historial de ventas, mermas y ganancias, reducirá el desperdicio de productos perecederos en un 10% semanal. Esto se logrará porque la plataforma permitirá al vendedor realizar estimaciones manuales basadas en evidencia documental de su propio desempeño financiero, abandonando la preparación intuitiva o "al tanteo" por una toma de decisiones informada por datos duros.*

---

## 1. Arquitectura General (Microservicios en Docker)

El sistema está construido pensando en escalabilidad y está orquestado completamente mediante **Docker Compose**. Se compone de 4 servicios principales (basados en 4 contenedores):

1. **Frontend (Next.js 14 + React):** Corre en el puerto `3000` (interno). Es el cliente que ve el usuario. Usamos TailwindCSS para el diseño (estilo Neo-Brutalista). Gestiona el estado local del usuario con Zustand (`auth.store.ts`).
2. **Backend (NestJS + Node.js):** Corre en el puerto `3001` (interno). Es el cerebro de la aplicación. Maneja las reglas de negocio, la seguridad (JWT) y se conecta a las bases de datos.
3. **Database (PostgreSQL 16):** Corre en el puerto `5432`. Almacena los datos estructurados y relacionales (Usuarios, Productos, Ventas, Queries de Benchmark).
4. **Nginx (Reverse Proxy):** Es la puerta de entrada. Escucha en los puertos `80` y `8080`. Se encarga de recibir todas las peticiones desde el navegador y decidir hacia dónde mandarlas:
   - Si la ruta empieza por `/api/` ➔ Lo manda al contenedor del Backend.
   - Cualquier otra ruta ➔ Lo manda al contenedor del Frontend.
   Esto soluciona el problema de CORS y emula un entorno de producción real.

---

## 2. Flujo de Datos (Cómo se comunican las capas)

### Ejemplo: Registro y Login (Autenticación)
1. **Frontend:** El usuario llena el formulario en React. Se ejecuta la función `authService.login()`. El cliente de API (`api.ts`) hace un POST a `/api/auth/login`.
2. **Backend (NestJS):** El `AuthController` recibe la petición, valida los datos con DTOs y llama al `AuthService`.
3. **Seguridad (Argon2 + JWT):** El servicio compara la contraseña de la base de datos (PostgreSQL) usando Argon2. Si coincide, genera un JWT (Json Web Token) firmado.
4. **Respuesta:** El token regresa al Frontend y se guarda en el local storage via `Zustand`. Para cualquier otra petición privada (ej. Crear Producto), el frontend adjuntará este token en la cabecera `Authorization: Bearer <token>`.

### Ejemplo: Creación de un Producto con Imagen
1. **Frontend:** El usuario carga una foto. React toma el archivo físico y lo convierte en una larguísima cadena de texto llamada **Base64**.
2. **Nginx:** Permite la carga pesada gracias a la instrucción `client_max_body_size 50M;` que configuramos.
3. **Backend:** El `main.ts` de NestJS acepta JSONs pesados de hasta 10MB para procesar la cadena Base64 que viene en el atributo `imageUrl`.
4. **Database:** La entidad `Product` de TypeORM guarda esta cadena en un campo de tipo `text` en PostgreSQL.

---

## 3. Flujo Profundo de Benchmarking (Unidad 2)

El módulo más complejo del sistema. La meta es estresar la base de datos PostgreSQL, observar cómo rinde, hacer un corte estadístico y mandarlo a un almacén de datos gigante de Google Cloud (BigQuery).

### Estructura de PostgreSQL para esto:
Siguiendo las instrucciones del profesor, tenemos 3 tablas:
- `projects`: Identifica tu sistema (Tipo Ecommerce).
- `queries`: Almacena el SQL crudo de las "consultas de prueba" (ej. "Traer todos los usuarios inactivos").
- `executions`: (Opcional en este flujo automático) Diseñada para guardar historial de ejecuciones individuales a nivel BD.

### El Flujo de Trabajo en 4 Pasos:

1. **Acumulación Silenciosa (`pg_stat_statements`)**
   PostgreSQL tiene instalada una extensión especial (como una cámara de seguridad) llamada `pg_stat_statements`. Ésta anota en tiempo real **cuánto tardó** cada consulta (SELECT, INSERT, etc.) que se hizo a la base de datos y **cuántos bloques de memoria RAM o disco usó** (`shared_blks_hit`, `shared_blks_read`).

2. **Botón Amarillo: "ESTRESAR SISTEMA"**
   En el Frontend (`/benchmarking`), al darle clic a este botón, el Frontend le llama al Backend `POST /benchmarking/run-queries`. El backend recorre la tabla `queries` y lanza esos scripts contra la base de datos de manera invisible, pero lo suficiente para que la extensión `pg_stat_statements` lo registre y calcule medias estadísticas.

3. **Botón Negro: "ENVIAR A BIGQUERY" (Google OAuth)**
   - Al presionarlo, el frontend `(<GoogleOAuthProvider>)` levanta un popup donde inicias sesión con tu cuenta `@gmail.com`. Google nos devuelve un `access_token` temporal.
   - El frontend le envía ese token al backend en la ruta `POST /benchmarking/snapshot`.

4. **El "Corte del Día" (El Backend trabaja duro)**
   - El Backend toma ese token de Google.
   - Ejecuta `SELECT * FROM v_daily_export`. Ésta es una Vista de SQL que creamos (`01-benchmarking-views.sql`) que extrae y limpia mágicamente todos los datos recolectados por `pg_stat_statements` dejándolos listos con el formato que el profesor pidió.
   - Empleando la librería oficial `@google-cloud/bigquery`, el Backend se conecta a los servidores de Google y hace un **Insert Directo** hacia la tabla `daily_query_metrics` de tu proyecto personal en la nube.
   - Una vez comprobado que se guardó en Google, el Backend ejecuta `SELECT pg_stat_statements_reset();` borrando el historial de tu base de datos local para que el "Corte del Día" de mañana comience limpio. Todo esto se procesa en el `BenchmarkingService` (`benchmarking.service.ts`).

---

## Conclusión

Este stack no solo sirve como un proyecto escolar. Implementa separaciones reales a nivel empresarial:
- **NestJS** ofrece inyección de dependencias sólida.
- **Docker Compose** asegura que si cambias de computadora, la app corra exactamente igual sin tener que instalar "Node" "Postgres" "Mongo" o "Nginx" en tu PC.
- La **Observabilidad** a nivel base de datos (Benchmarking) te enseña la realidad del análisis de datos de aplicaciones de alto tráfico.
