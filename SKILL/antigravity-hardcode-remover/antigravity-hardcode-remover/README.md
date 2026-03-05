# AntiGravity Hardcode Remover - Skill

Una skill completa para refactorizar código Node.js eliminando valores hardcodeados y migrándolos a configuración centralizada.

## 📋 Contenido

```
antigravity-hardcode-remover/
├── SKILL.md                    ← Instrucciones principales
├── scripts/
│   ├── detect_hardcode.py      ← Detecta hardcodeo en el código
│   └── migrate_hardcode.py     ← Genera archivos de configuración automáticamente
└── references/
    └── examples.md              ← Ejemplos prácticos de migración
```

## 🚀 Guía Rápida

### Paso 1: Detectar Hardcodeo

Primero, escanea tu proyecto para identificar todos los valores hardcodeados:

```bash
python scripts/detect_hardcode.py /ruta/a/tu/proyecto
```

Esto mostrará un JSON con todos los valores encontrados:
- URLs
- API keys
- Credenciales de base de datos
- SQL queries embebidas

### Paso 2: Ejecutar Migración Automática

Una vez identificado el hardcodeo, ejecuta la migración:

```bash
python scripts/migrate_hardcode.py /ruta/a/tu/proyecto
```

Esto genera automáticamente:
- `.env` - Variables de entorno
- `.env.example` - Template para otros devs
- `config/database.js` - Configuración de BD
- `config/api.js` - Configuración de APIs
- `MIGRATION.md` - Reporte de cambios

### Paso 3: Refactorizar Código Manual

Después de generar los archivos de configuración, necesitas actualizar tu código:

1. Reemplazar imports de configuración
2. Actualizar SQL queries
3. Testear toda la aplicación

**Ver `references/examples.md` para ejemplos completos**

## 📚 Descripción Detallada

### ¿Cuándo usar esta skill?

✅ **Usar cuando:**
- Tienes URLs hardcodeadas en tu código
- Hay API keys o secrets en archivos .js/.ts
- SQL queries directamente en rutas/controladores
- Credenciales de BD visibles en el código
- Quieres migrar a variables de entorno

❌ **No usar cuando:**
- Solo necesitas limpiar sintaxis
- Tu proyecto ya usa variables de entorno correctamente
- Es un archivo de datos (CSV, JSON) sin código ejecutable

## 🎯 Qué Soluciona

### Antes (Código con Hardcodeo)
```javascript
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'mi_contraseña_123',  // ❌ Hardcodeado
  database: 'antigravity_db'
});

app.get('/users', (req, res) => {
  connection.query('SELECT * FROM users WHERE id = 1', (err, results) => {  // ❌ SQL hardcodeado
    res.json(results);
  });
});

const stripeKey = 'sk_live_abc123xyz456';  // ❌ API key hardcodeada
```

### Después (Refactorizado)
```javascript
// config/database.js
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,  // ✅ Desde variables de entorno
  database: process.env.DB_NAME
});

// src/queries/userQueries.js
module.exports = {
  getUserById: 'SELECT * FROM users WHERE id = ?'  // ✅ SQL parametrizado
};

// src/routes/users.js
const userQueries = require('../queries/userQueries');
app.get('/users/:id', (req, res) => {
  connection.query(userQueries.getUserById, [req.params.id], (err, results) => {
    res.json(results);
  });
});

// config/api.js
const stripeKey = process.env.STRIPE_SECRET_KEY;  // ✅ Desde .env
```

## 🔐 Seguridad

✅ **Lo que esta skill implementa:**
- Centralización de secrets en `.env`
- Archivo `.env.example` sin valores sensibles
- Entrada automática a `.gitignore` para `.env`
- Separación de queries SQL
- Mejor control de credenciales

⚠️ **Responsabilidad tuya:**
- No committear `.env` a Git
- Mantener `.env.example` actualizado
- Usar variables de entorno en producción
- No compartir `.env` entre desarrolladores

## 📖 Estructura de Archivos Generados

### `.env` - Variables Sensibles
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=contraseña_segura
DB_NAME=antigravity_db
STRIPE_SECRET_KEY=sk_live_xxxxx
JWT_SECRET=tu_jwt_secret
```

### `.env.example` - Template Público
```
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=
STRIPE_SECRET_KEY=
JWT_SECRET=
```

### `config/database.js`
```javascript
require('dotenv').config();

const mysql = require('mysql');

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306
});

module.exports = connection;
```

### `config/api.js`
```javascript
require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  apiBaseUrl: process.env.API_BASE_URL,
  stripeKey: process.env.STRIPE_SECRET_KEY,
  jwtSecret: process.env.JWT_SECRET,
  // ... más configuración
};
```

## 🔧 Instalación de Dependencias

Después de ejecutar la migración, instala las dependencias necesarias:

```bash
npm install dotenv
```

Si usas MySQL:
```bash
npm install mysql
# o para mejor rendimiento:
npm install mysql2
```

Si usas PostgreSQL:
```bash
npm install pg
```

## ✅ Checklist de Migración

- [ ] Ejecutar script de detección
- [ ] Analizar hallazgos
- [ ] Ejecutar migración automática
- [ ] Instalar `dotenv` con npm
- [ ] Actualizar imports en rutas
- [ ] Refactorizar SQL queries
- [ ] Refactorizar servicios (email, payment, etc.)
- [ ] Actualizar middleware
- [ ] Testear conexión a BD
- [ ] Testear rutas principales
- [ ] Verificar `.gitignore`
- [ ] Documentar variables en `.env.example`
- [ ] Crear script de setup para nuevos devs
- [ ] Commit y push (sin `.env`)

## 📝 Ejemplos Completos

Para ver ejemplos detallados de cómo refactorizar:
1. Migración de BD
2. Migración de API keys
3. Migración de URLs
4. Estructura recomendada

**Ver archivo: `references/examples.md`**

## 🐛 Troubleshooting

### Error: "Cannot find module 'dotenv'"
```bash
npm install dotenv --save
```

### Error: "process.env.DB_HOST is undefined"
Asegúrate de:
1. Tener archivo `.env` en la raíz del proyecto
2. Llamar a `require('dotenv').config()` al inicio
3. Reiniciar el servidor

### Error: "Cannot find path 'config/database.js'"
Verifica que:
1. Existe la carpeta `config/`
2. La ruta en el import es correcta
3. Usas rutas relativas correctas

## 🚦 Diferencia entre Ambientes

```javascript
// .env.development
NODE_ENV=development
DB_HOST=localhost
API_BASE_URL=http://localhost:3000

// .env.production
NODE_ENV=production
DB_HOST=prod-db.example.com
API_BASE_URL=https://api.example.com
```

En `config/api.js`:
```javascript
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV || 'development'}`
});
```

## 📞 Soporte

Si encuentras problemas:
1. Revisar ejemplos en `references/examples.md`
2. Verificar que `.env` existe y tiene valores
3. Comprobar que `dotenv` está instalado
4. Ver MIGRATION.md generado con el reporte

## 📚 Recursos

- [Documentación de dotenv](https://github.com/motdotla/dotenv)
- [Variables de Entorno en Node.js](https://nodejs.org/en/knowledge/file-system/security/introduction/)
- [OWASP Secrets Management](https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)

---

## 📄 Licencia

Esta skill es parte del proyecto AntiGravity.

## 🎓 Aprendizaje

Cada paso genera documentación que te enseña:
- Cómo estructurar configuración en Node.js
- Mejores prácticas de seguridad
- Manejo de variables de entorno
- Refactorización de código legado
- Gestión de secrets y credenciales

¡Espero que esta skill te sea útil! 🚀
