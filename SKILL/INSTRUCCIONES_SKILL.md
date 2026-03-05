# 🚀 AntiGravity Hardcode Remover - Skill Completada

¡Tu skill está lista para usar! Aquí está la documentación completa.

---

## 📦 Qué Incluye

Tu skill `antigravity-hardcode-remover` contiene:

### 1. **SKILL.md** (Instrucciones Principales)
- Descripción completa de cuándo usar la skill
- Proceso paso a paso de refactorización
- Estructura recomendada de archivos
- Checklist de seguridad

### 2. **Scripts Python**

#### `scripts/detect_hardcode.py`
Detecta automáticamente valores hardcodeados:
```bash
python scripts/detect_hardcode.py /ruta/proyecto
```

**Detecta:**
- URLs y endpoints
- API keys y secrets
- Credenciales de BD
- SQL queries embebidas

#### `scripts/migrate_hardcode.py`
Genera automáticamente archivos de configuración:
```bash
python scripts/migrate_hardcode.py /ruta/proyecto
```

**Genera:**
- `.env` - Variables de entorno
- `.env.example` - Template público
- `config/database.js` - Config de BD
- `config/api.js` - Config de APIs
- `.gitignore` actualizado
- `MIGRATION.md` - Reporte detallado

### 3. **references/examples.md**
Ejemplos prácticos completos:
- ❌ Código ANTES (con hardcodeo)
- ✅ Código DESPUÉS (refactorizado)
- Múltiples casos de uso
- Soluciones para diferentes escenarios

### 4. **README.md**
Guía rápida de uso y troubleshooting

---

## 🎯 Flujo de Uso

### Fase 1: Análisis
```bash
# Analiza tu proyecto y encuentra hardcodeo
python scripts/detect_hardcode.py /tu/proyecto/antigravity

# Output JSON mostrará:
# - URLs encontradas
# - API keys detectadas
# - Credenciales de BD
# - SQL queries embebidas
```

### Fase 2: Migración
```bash
# Genera la estructura de configuración
python scripts/migrate_hardcode.py /tu/proyecto/antigravity

# Crea automáticamente:
# ✓ .env
# ✓ .env.example
# ✓ config/database.js
# ✓ config/api.js
# ✓ MIGRATION.md
```

### Fase 3: Refactorización Manual
Actualizar código usando ejemplos en `references/examples.md`:
1. Cambiar imports de rutas
2. Reemplazar SQL queries
3. Actualizar servicios
4. Testear todo

---

## 📋 Estructura Final que Genera

```
tu-proyecto-antigravity/
├── .env                          ← Variables sensibles (en .gitignore)
├── .env.example                  ← Template público
├── config/
│   ├── database.js               ← Config centralizada de BD
│   ├── api.js                    ← Config de APIs
│   └── constants.js              ← Constantes de la app
├── src/
│   ├── index.js
│   ├── routes/
│   │   ├── users.js             ← Refactorizado
│   │   └── products.js
│   ├── queries/                 ← SQL queries separadas
│   │   ├── userQueries.js
│   │   └── productQueries.js
│   └── services/
│       ├── emailService.js      ← Refactorizado
│       └── paymentService.js
└── MIGRATION.md                  ← Reporte de migración
```

---

## 🔐 Qué Se Protege

### ❌ ANTES - Valores Visibles
```javascript
const DB_PASSWORD = 'mi_contraseña_123';  // ¡Inseguro!
const API_KEY = 'sk_live_abc123xyz456';   // ¡En el código!
const URL = 'https://api.external.com';   // Hardcodeado
```

### ✅ DESPUÉS - Valores en .env
```
# .env (nunca se commitea)
DB_PASSWORD=mi_contraseña_123
API_KEY=sk_live_abc123xyz456

# Código JavaScript
const db = require('../config/database');
// Accede a process.env.DB_PASSWORD automáticamente
```

---

## 🚀 Cómo Instalar la Skill

### Opción 1: Instalar en Claude (Si tienes acceso)
```bash
npx skills add /ruta/a/antigravity-hardcode-remover
```

### Opción 2: Usar Directamente
Copia la carpeta `antigravity-hardcode-remover` a tu proyecto y úsala como referencia.

---

## 💡 Ejemplos Prácticos

### Ejemplo 1: Migrar BD
**ANTES:**
```javascript
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'mi_pass',
  database: 'antigravity_db'
});
```

**DESPUÉS:**
```javascript
// Archivos generados automáticamente:
// 1. .env contiene las credenciales
// 2. config/database.js las importa
// 3. Los archivos usan require('../config/database')

const db = require('../config/database');
```

### Ejemplo 2: Migrar API Keys
**ANTES:**
```javascript
const stripe = require('stripe')('sk_live_abc123xyz456');
```

**DESPUÉS:**
```javascript
// .env tiene STRIPE_SECRET_KEY=sk_live_abc123xyz456
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
```

### Ejemplo 3: Migrar SQL
**ANTES:**
```javascript
connection.query('SELECT * FROM users WHERE id = 1', callback);
```

**DESPUÉS:**
```javascript
// Archivo separado: src/queries/userQueries.js
const queries = {
  getUserById: 'SELECT * FROM users WHERE id = ?'
};

connection.query(queries.getUserById, [1], callback);
```

---

## ✅ Checklist de Implementación

- [ ] **Análisis**
  - [ ] Ejecutar `detect_hardcode.py`
  - [ ] Revisar resultados
  - [ ] Documentar hallazgos

- [ ] **Generación**
  - [ ] Ejecutar `migrate_hardcode.py`
  - [ ] Verificar archivos creados
  - [ ] Revisar contenido de `.env`

- [ ] **Instalación**
  - [ ] `npm install dotenv`
  - [ ] Verificar `.gitignore` tiene `.env`
  - [ ] Crear `.env.example` si no existe

- [ ] **Refactorización**
  - [ ] Actualizar imports de `config/`
  - [ ] Migrar SQL queries
  - [ ] Migrar servicios (email, payment, etc.)
  - [ ] Actualizar middleware

- [ ] **Testing**
  - [ ] Conectar a BD
  - [ ] Probar rutas principales
  - [ ] Probar autenticación
  - [ ] Probar servicios externos

- [ ] **Seguridad**
  - [ ] `.env` en `.gitignore`
  - [ ] `.env.example` sin valores reales
  - [ ] No hay secrets en Git
  - [ ] Variables de entorno en producción

- [ ] **Documentación**
  - [ ] Actualizar README.md
  - [ ] Documentar variables en `.env.example`
  - [ ] Crear script de setup
  - [ ] Commit sin `.env`

---

## 🔍 Archivos de Referencia

### Para Estudiar Ejemplos
Ver `references/examples.md` que contiene:
1. Migración paso a paso de BD
2. Migración de API Keys y Secrets
3. Migración de URLs y Endpoints
4. Organización recomendada
5. Instalación de dependencias
6. FAQ

### Patrones que Detecta
El script busca:
```
✓ http://localhost:3000
✓ host: 'localhost'
✓ password: 'mi_contraseña'
✓ api_key = 'sk_live_xxx'
✓ SELECT * FROM users
✓ INSERT INTO products
✓ UPDATE orders SET
```

---

## 🐛 Troubleshooting

### Error: "dotenv not found"
```bash
npm install dotenv --save
```

### Error: "Cannot find config/database"
Verifica:
1. La carpeta `config/` existe
2. Los archivos `.js` están dentro
3. Las rutas en los imports son relativas

### Las variables no se cargan
Asegúrate de:
1. Tener `.env` en la raíz del proyecto
2. Agregar `require('dotenv').config()` al inicio del archivo
3. Reiniciar el servidor (Node.js)

### ¿Cómo hacer variables por ambiente?
```
.env.development
.env.production
.env.staging
```

Luego en `config/api.js`:
```javascript
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
});
```

---

## 📚 Recursos de Aprendizaje

1. **Documentación de dotenv**
   - https://github.com/motdotla/dotenv

2. **Node.js Environment Variables**
   - https://nodejs.org/en/docs/

3. **OWASP Secrets Management**
   - https://cheatsheetseries.owasp.org/

4. **Node.js Best Practices**
   - https://github.com/goldbergyoni/nodebestpractices

---

## 🎓 Lo Que Aprenderás

Usando esta skill aprenderás:
- ✅ Cómo estructurar configuración en Node.js
- ✅ Mejores prácticas de seguridad
- ✅ Manejo de variables de entorno
- ✅ Refactorización de código legado
- ✅ Gestión de secrets y credenciales
- ✅ Organización de proyectos profesionales
- ✅ SQL parameterizado y seguro

---

## 📝 Notas Importantes

### Seguridad
⚠️ **NUNCA** commitear `.env` con valores reales
⚠️ **SIEMPRE** usar `.env.example` como template
⚠️ **SIEMPRE** agregar `.env` a `.gitignore`

### Producción
Para producción, NO usar archivos `.env`:
- Usar variables de entorno del servidor
- En Heroku, AWS, Docker: gestionar variables en panel
- En acciones de GitHub: usar Secrets

### Desarrollo
Para desarrollo local:
1. Crear `.env` basado en `.env.example`
2. Llenar con valores locales
3. No compartir con otros devs

---

## 🎯 Próximos Pasos

1. **Hoy**: Copiar la skill a tu proyecto
2. **Mañana**: Ejecutar script de análisis
3. **Luego**: Ejecutar migración automática
4. **Después**: Refactorizar código manualmente
5. **Final**: Testear y hacer commit

---

## 📞 Soporte

Si tienes dudas:
1. Lee `SKILL.md` para instrucciones detalladas
2. Consulta `references/examples.md` para ejemplos
3. Revisa `README.md` para troubleshooting
4. Ejecuta `MIGRATION.md` generado como guía

---

## ✨ Resumen

Tu skill **antigravity-hardcode-remover** es una herramienta completa que:

✅ **Detecta** valores hardcodeados  
✅ **Migra** automáticamente a configuración  
✅ **Genera** archivos de config listos  
✅ **Enseña** mejores prácticas  
✅ **Documenta** el proceso  
✅ **Protege** credenciales  
✅ **Escala** a producción  

🚀 **¡Lista para usar en tu proyecto AntiGravity!**

---

Creada: Marzo 5, 2026
Versión: 1.0
Tecnología: Node.js + JavaScript
