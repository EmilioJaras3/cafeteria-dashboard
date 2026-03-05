# Ejemplos de Refactorización - AntiGravity Hardcode Remover

## 1. Migración de Configuración de Base de Datos

### ❌ ANTES (Hardcodeado)

**archivo: src/routes/users.js**
```javascript
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'mi_contraseña_123',
  database: 'antigravity_db',
  port: 3306
});

app.get('/users', (req, res) => {
  connection.query('SELECT * FROM users WHERE active = 1', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.post('/users', (req, res) => {
  const query = `INSERT INTO users (name, email) VALUES ('${req.body.name}', '${req.body.email}')`;
  connection.query(query, (err, results) => {
    if (err) throw err;
    res.json({ success: true });
  });
});
```

### ✅ DESPUÉS (Refactorizado)

**archivo: .env**
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=mi_contraseña_123
DB_NAME=antigravity_db
DB_PORT=3306
```

**archivo: .env.example**
```
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=
DB_PORT=
```

**archivo: config/database.js**
```javascript
const mysql = require('mysql');
require('dotenv').config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306
});

connection.connect((err) => {
  if (err) {
    console.error('Error conectando a BD:', err);
    return;
  }
  console.log('Conectado a BD exitosamente');
});

module.exports = connection;
```

**archivo: src/queries/userQueries.js**
```javascript
module.exports = {
  getAllActiveUsers: 'SELECT * FROM users WHERE active = 1',
  getUserById: 'SELECT * FROM users WHERE id = ?',
  createUser: 'INSERT INTO users (name, email) VALUES (?, ?)',
  updateUser: 'UPDATE users SET name = ?, email = ? WHERE id = ?',
  deleteUser: 'DELETE FROM users WHERE id = ?'
};
```

**archivo: src/routes/users.js (Refactorizado)**
```javascript
const express = require('express');
const connection = require('../../config/database');
const userQueries = require('../queries/userQueries');

const router = express.Router();

// GET all users
router.get('/', (req, res) => {
  connection.query(userQueries.getAllActiveUsers, (err, results) => {
    if (err) {
      console.error('Error:', err);
      return res.status(500).json({ error: 'Error obteniendo usuarios' });
    }
    res.json(results);
  });
});

// GET user by ID
router.get('/:id', (req, res) => {
  connection.query(userQueries.getUserById, [req.params.id], (err, results) => {
    if (err) {
      console.error('Error:', err);
      return res.status(500).json({ error: 'Error obteniendo usuario' });
    }
    res.json(results[0]);
  });
});

// CREATE user
router.post('/', (req, res) => {
  const { name, email } = req.body;
  
  connection.query(
    userQueries.createUser,
    [name, email],
    (err, results) => {
      if (err) {
        console.error('Error:', err);
        return res.status(500).json({ error: 'Error creando usuario' });
      }
      res.json({ success: true, id: results.insertId });
    }
  );
});

module.exports = router;
```

**archivo: .gitignore**
```
# Variables de entorno - NUNCA commitear esto
.env
.env.local
.env.*.local

# Dependencias
node_modules/

# Logs
logs/
*.log
npm-debug.log*
yarn-debug.log*

# Otros
dist/
build/
.DS_Store
```

---

## 2. Migración de API Keys y Secrets

### ❌ ANTES

**archivo: src/services/emailService.js**
```javascript
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'tu_email@gmail.com',
    pass: 'tu_contraseña_gmail'
  }
});

const sendEmail = (to, subject, text) => {
  transporter.sendMail({
    from: 'tu_email@gmail.com',
    to: to,
    subject: subject,
    text: text
  }, (err, info) => {
    if (err) console.log(err);
  });
};

module.exports = { sendEmail };
```

**archivo: src/services/paymentService.js**
```javascript
const stripe = require('stripe')('sk_live_abc123xyz456');

const processPayment = async (amount, token) => {
  try {
    const charge = await stripe.charges.create({
      amount: amount,
      currency: 'usd',
      source: token
    });
    return charge;
  } catch (err) {
    console.error(err);
  }
};

module.exports = { processPayment };
```

### ✅ DESPUÉS

**archivo: .env**
```
# Email
EMAIL_SERVICE=gmail
EMAIL_USER=tu_email@gmail.com
EMAIL_PASSWORD=tu_contraseña_gmail
EMAIL_FROM=noreply@antigravity.com

# Payment
STRIPE_SECRET_KEY=sk_live_abc123xyz456
STRIPE_PUBLIC_KEY=pk_live_abc123xyz456

# JWT
JWT_SECRET=tu_jwt_secret_muy_seguro_aqui
JWT_EXPIRES_IN=7d

# API Externa
EXTERNAL_API_KEY=xxxxx
EXTERNAL_API_URL=https://api.external.com
```

**archivo: config/services.js**
```javascript
require('dotenv').config();

module.exports = {
  email: {
    service: process.env.EMAIL_SERVICE,
    user: process.env.EMAIL_USER,
    password: process.env.EMAIL_PASSWORD,
    from: process.env.EMAIL_FROM
  },
  stripe: {
    secretKey: process.env.STRIPE_SECRET_KEY,
    publicKey: process.env.STRIPE_PUBLIC_KEY
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN
  },
  api: {
    externalKey: process.env.EXTERNAL_API_KEY,
    externalUrl: process.env.EXTERNAL_API_URL
  }
};
```

**archivo: src/services/emailService.js (Refactorizado)**
```javascript
const nodemailer = require('nodemailer');
const config = require('../../config/services');

const transporter = nodemailer.createTransport({
  service: config.email.service,
  auth: {
    user: config.email.user,
    pass: config.email.password
  }
});

const sendEmail = (to, subject, text) => {
  transporter.sendMail({
    from: config.email.from,
    to: to,
    subject: subject,
    text: text
  }, (err, info) => {
    if (err) console.log('Error enviando email:', err);
  });
};

module.exports = { sendEmail };
```

**archivo: src/services/paymentService.js (Refactorizado)**
```javascript
const stripe = require('stripe')(require('../../config/services').stripe.secretKey);

const processPayment = async (amount, token) => {
  try {
    const charge = await stripe.charges.create({
      amount: amount,
      currency: 'usd',
      source: token
    });
    return charge;
  } catch (err) {
    console.error('Error en pago:', err);
    throw err;
  }
};

module.exports = { processPayment };
```

---

## 3. Migración de URLs y Endpoints

### ❌ ANTES

**archivo: src/index.js**
```javascript
const frontendUrl = 'http://localhost:3001';
const apiBaseUrl = 'http://localhost:3000';
const externalApiUrl = 'https://api.external.com/v1';

app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true
}));

app.get('/config', (req, res) => {
  res.json({
    apiUrl: 'http://localhost:3000',
    environment: 'development'
  });
});

// En middleware de auth
const validateToken = (token) => {
  return fetch('http://localhost:3000/auth/validate', {
    method: 'POST',
    body: JSON.stringify({ token })
  });
};
```

### ✅ DESPUÉS

**archivo: .env**
```
NODE_ENV=development
FRONTEND_URL=http://localhost:3001
API_BASE_URL=http://localhost:3000
EXTERNAL_API_URL=https://api.external.com/v1
PORT=3000
```

**archivo: config/api.js**
```javascript
require('dotenv').config();

module.exports = {
  environment: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  frontendUrl: process.env.FRONTEND_URL,
  apiBaseUrl: process.env.API_BASE_URL,
  externalApiUrl: process.env.EXTERNAL_API_URL,
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production'
};
```

**archivo: src/index.js (Refactorizado)**
```javascript
const config = require('./config/api');
const cors = require('cors');

app.use(cors({
  origin: config.frontendUrl,
  credentials: true
}));

app.get('/config', (req, res) => {
  res.json({
    apiUrl: config.apiBaseUrl,
    environment: config.environment
  });
});

// En middleware de auth
const validateToken = (token) => {
  return fetch(`${config.apiBaseUrl}/auth/validate`, {
    method: 'POST',
    body: JSON.stringify({ token })
  });
};

app.listen(config.port, () => {
  console.log(`Servidor corriendo en puerto ${config.port}`);
});
```

---

## 4. Organización Recomendada de Proyecto

```
proyecto-antigravity/
├── .env                    ← Archivos sensibles (en .gitignore)
├── .env.example            ← Template para otros devs
├── .gitignore
├── package.json
├── config/                 ← Configuración centralizada
│   ├── api.js
│   ├── database.js
│   ├── services.js
│   └── constants.js
├── src/
│   ├── index.js
│   ├── routes/
│   │   ├── users.js
│   │   ├── products.js
│   │   └── orders.js
│   ├── controllers/
│   │   ├── userController.js
│   │   └── productController.js
│   ├── queries/           ← SQL queries separadas
│   │   ├── userQueries.js
│   │   ├── productQueries.js
│   │   └── orderQueries.js
│   ├── services/
│   │   ├── emailService.js
│   │   ├── paymentService.js
│   │   └── authService.js
│   ├── middleware/
│   │   └── auth.js
│   └── utils/
│       └── helpers.js
└── tests/
    └── ...
```

---

## 5. Checklist Completo de Migración

- [ ] **Análisis inicial**
  - [ ] Identificar todos los valores hardcodeados
  - [ ] Categorizar por tipo (URLs, keys, credenciales, SQL)
  - [ ] Documentar ubicaciones

- [ ] **Crear estructura**
  - [ ] Crear carpeta `config/`
  - [ ] Crear archivos `.env` y `.env.example`
  - [ ] Crear carpeta `src/queries/` (si aplica)

- [ ] **Migrar configuración**
  - [ ] Mover valores a `.env`
  - [ ] Crear archivos de config en `config/`
  - [ ] Instalar `dotenv` si no está

- [ ] **Refactorizar código**
  - [ ] Actualizar rutas
  - [ ] Actualizar servicios
  - [ ] Actualizar middleware
  - [ ] Reemplazar SQL inline

- [ ] **Testing**
  - [ ] Probar conexión a BD
  - [ ] Probar rutas principales
  - [ ] Verificar autenticación
  - [ ] Verificar servicios externos

- [ ] **Seguridad**
  - [ ] Verificar `.gitignore` incluye `.env`
  - [ ] No hay secrets en git history
  - [ ] Documentar variables en `.env.example`

- [ ] **Documentación**
  - [ ] README con instrucciones de setup
  - [ ] Listar variables de entorno necesarias
  - [ ] Indicar valores por defecto

---

## 6. Instalación de Dependencias Necesarias

```bash
npm install dotenv
npm install cors
npm install mysql  # o mysql2 para mejores características
# O si usas PostgreSQL:
npm install pg
```

**En package.json:**
```json
{
  "dependencies": {
    "dotenv": "^16.0.0",
    "express": "^4.18.0",
    "mysql": "^2.18.0"
  },
  "scripts": {
    "start": "node src/index.js",
    "dev": "nodemon src/index.js"
  }
}
```

---

## Preguntas Frecuentes

**P: ¿Y si tengo múltiples ambientes (dev, staging, prod)?**
```
.env.development
.env.staging
.env.production
```

Luego en `config/api.js`:
```javascript
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });
```

**P: ¿Cómo manejar variables en producción?**
- En producción, NO usar archivos `.env`
- Usar variables de entorno del servidor (Heroku, AWS, Docker, etc.)
- Las librerias como `dotenv` solo se cargan en desarrollo

**P: ¿Y si tengo SQL muy complejo?**
Opción: Usar archivos `.sql` reales:

```javascript
const fs = require('fs');
const userQueries = {
  getAllUsers: fs.readFileSync('src/queries/users/getAll.sql', 'utf8'),
  getUserById: fs.readFileSync('src/queries/users/getById.sql', 'utf8')
};
```

---

## Recursos Adicionales

- [Documentación dotenv](https://github.com/motdotla/dotenv)
- [OWASP - Secrets Management](https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)
