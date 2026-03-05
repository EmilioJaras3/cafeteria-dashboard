---
name: antigravity-hardcode-remover
description: Refactorizar código Node.js para eliminar hardcodeo de URLs, API keys, secrets, configuraciones y queries SQL. Úsalo cuando el usuario quiera limpiar su backend de AntiGravity extrayendo valores hardcodeados a archivos de configuración (.env), variables de entorno y archivos de config. Incluye migraciones de SQL queries embebidas en rutas/controladores hacia archivos separados o variables de configuración. Aplica esto SIEMPRE que el usuario mencione "hardcodeo", "hardcoded", "limpiar backend", "variables de entorno" o cuando vea código con URLs/keys/SQL embebidos.
compatibility: Node.js, JavaScript/TypeScript, MySQL/PostgreSQL backends
---

# AntiGravity Hardcode Remover

Una skill para refactorizar código de backend en Node.js eliminando valores hardcodeados y migrándolos a configuración centralizada.

## ¿Cuándo usar esta skill?

✅ **Usar cuando:**
- El usuario tiene URLs, API keys, o secrets hardcodeados en archivos .js/.ts
- Hay SQL queries directamente en controladores/rutas
- Necesita migrar a variables de entorno (.env)
- Quiere centralizar configuración de base de datos
- Tiene credenciales de terceros embebidas en el código

❌ **No usar cuando:**
- Solo necesita limpiar sintaxis
- Requiere refactorización completa de arquitectura
- Es un proyecto de producción sin tests (requiere más cuidado)

---

## Proceso de Refactorización

### Paso 1: Analizar el código actual

Revisar archivos del usuario para identificar:
1. **URLs/Endpoints** hardcodeados (p.ej: `http://localhost:3000`)
2. **Secrets** (API keys, JWT, tokens)
3. **Credenciales de BD** (usuario, contraseña, host)
4. **SQL queries** embebidas en rutas
5. **Paths/configuraciones** fijas

### Paso 2: Crear estructura de configuración

Generar estos archivos:

```
proyecto/
├── .env              ← Variables sensibles
├── .env.example      ← Template sin valores reales
├── config/
│   ├── database.js   ← Conexión a BD
│   ├── api.js        ← Configuración de APIs
│   └── constants.js  ← Constantes de app
└── src/
    └── ... (código refactorizado)
```

### Paso 3: Extraer SQL queries

**Opción A: Archivos separados (Recomendado)**
```
src/
└── queries/
    ├── users.sql
    ├── products.sql
    └── orders.sql
```

**Opción B: Objeto de queries en JS**
```javascript
// src/queries/userQueries.js
module.exports = {
  getAllUsers: `SELECT * FROM users WHERE active = ?`,
  getUserById: `SELECT * FROM users WHERE id = ?`,
  // ...
}
```

### Paso 4: Actualizar rutas/controladores

**Antes:**
```javascript
app.get('/users', async (req, res) => {
  const query = `SELECT * FROM users WHERE active = 1`;
  const result = await db.query(query);
  res.json(result);
});
```

**Después:**
```javascript
const userQueries = require('../queries/userQueries');

app.get('/users', async (req, res) => {
  const result = await db.query(userQueries.getAllUsers);
  res.json(result);
});
```

### Paso 5: Configurar variables de entorno

**Archivo .env:**
```
# Base de datos
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=tu_contraseña
DB_NAME=antigravity_db

# API Keys
API_KEY_EXTERNAL=xxxxx
JWT_SECRET=tu_jwt_secret

# URLs
API_BASE_URL=http://localhost:3000
FRONTEND_URL=http://localhost:3001
```

**Archivo .env.example:**
```
# Base de datos
DB_HOST=
DB_PORT=
DB_USER=
DB_PASSWORD=
DB_NAME=

# API Keys
API_KEY_EXTERNAL=
JWT_SECRET=

# URLs
API_BASE_URL=
FRONTEND_URL=
```

---

## Checklist de Refactorización

- [ ] Identificadas todas las URLs hardcodeadas
- [ ] Extraídas todas las API keys y secrets
- [ ] Migradas credenciales de BD
- [ ] Separadas SQL queries
- [ ] Actualizado código para usar config
- [ ] Creado archivo .env
- [ ] Creado archivo .env.example
- [ ] Agregado .env a .gitignore
- [ ] Testeados cambios localmente
- [ ] Documentado el proceso

---

## Notas Importantes

⚠️ **Seguridad:**
- NUNCA commitear .env con valores reales a Git
- SIEMPRE usar .env.example como referencia
- Para producción, usar variables de entorno del servidor

⚠️ **Bases de datos:**
- Si tiene múltiples BD, crear config por BD
- Para conexión pools, centralizar en config/database.js
- Documentar cambios en queries

⚠️ **Testing:**
- Después de refactorizar, testear todas las rutas
- Verificar que las queries SQL funcionan
- Comprobar que env vars se cargan correctamente

---

## Ejemplos de Migración

Ver archivo `references/examples.md` para ejemplos completos de migración según tu stack específico.
