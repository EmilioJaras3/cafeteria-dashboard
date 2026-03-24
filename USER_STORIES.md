# Historias de Usuario - TienditaCampus

## 🎯 HISTORIAS DE USUARIO PRINCIPALES

### 👤 **HU-001: Registro de Usuario**
**Como** estudiante universitario
**Quiero** registrarme en la plataforma
**Para** poder comprar y vender productos

**Criterios de Aceptación:**
- ✅ Registro con email institucional
- ✅ Validación de contraseña segura
- ✅ Selección de rol (comprador/vendedor)
- ✅ Confirmación por email
- ✅ Mensaje de éxito

**Escenarios de Prueba:**
- Registro exitoso con datos válidos
- Error con email ya registrado
- Error con contraseña débil
- Validación de campos requeridos

---

### 🔐 **HU-002: Inicio de Sesión**
**Como** usuario registrado
**Quiero** iniciar sesión
**Para** acceder a mi cuenta

**Criterios de Aceptación:**
- ✅ Login con email/contraseña
- ✅ Redirección según rol (comprador → /buyer/dashboard, vendedor → /dashboard)
- ✅ Manejo de sesiones
- ✅ Opción "¿Olvidaste tu contraseña?"

**Escenarios de Prueba:**
- Login exitoso
- Credenciales inválidas
- Usuario bloqueado por intentos fallidos
- Sesión expirada

---

### 🛒 **HU-003: Explorar Marketplace**
**Como** comprador
**Quiero** explorar productos disponibles
**Para** encontrar lo que necesito

**Criterios de Aceptación:**
- ✅ Lista de productos con imágenes
- ✅ Filtros por categoría/precio
- ✅ Búsqueda por nombre
- ✅ Vista de producto detallada
- ✅ Información del vendedor

**Escenarios de Prueba:**
- Búsqueda funcional
- Filtros aplicados correctamente
- Paginación de resultados
- Productos sin stock ocultos

---

### 🛍️ **HU-004: Realizar Compra**
**Como** comprador
**Quiero** comprar un producto
**Para** adquirirlo para mi uso

**Criterios de Aceptación:**
- ✅ Diálogo de compra con confirmación
- ✅ Validación de stock disponible
- ✅ Cálculo automático del total
- ✅ Confirmación de recepción
- ✅ Actualización de inventario

**Escenarios de Prueba:**
- Compra exitosa con stock suficiente
- Error con stock insuficiente
- Validación de datos de entrega
- Confirmación de recepción

---

### 📊 **HU-005: Dashboard de Vendedor**
**Como** vendedor
**Quiero** ver mis estadísticas de venta
**Para** entender mi rendimiento

**Criterios de Aceptación:**
- ✅ KPIs principales (ventas, ganancia, ROI)
- ✅ Gráfico de historial de ventas
- ✅ Tabla de ventas recientes
- ✅ Sugerencias de productos IA
- ✅ Gestión de inventario

**Escenarios de Prueba:**
- Carga correcta de datos
- Actualización en tiempo real
- Navegación entre secciones
- Funcionalidad de filtros por fecha

---

### 📦 **HU-006: Gestión de Productos**
**Como** vendedor
**Quiero** gestionar mi catálogo
**Para** mantener productos actualizados

**Criterios de Aceptación:**
- ✅ Crear nuevos productos
- ✅ Editar productos existentes
- ✅ Gestionar stock por lote
- ✅ Marcar productos perecederos
- ✅ Eliminar productos

**Escenarios de Prueba:**
- Creación de producto exitosa
- Validación de campos requeridos
- Gestión de stock correcta
- Eliminación con confirmación

---

### 📈 **HU-007: Sistema de Ventas**
**Como** vendedor
**Quiero** registrar ventas diarias
**Para** controlar mi inventario

**Criterios de Aceptación:**
- ✅ Inicio de día de ventas
- ✅ Registro de productos a vender
- ✅ Seguimiento de ventas en tiempo real
- ✅ Registro de mermas
- ✅ Cierre automático al final del día

**Escenarios de Prueba:**
- Inicio de día exitoso
- Registro de venta correcto
- Actualización de stock en tiempo real
- Validación de cantidades disponibles

---

### 📊 **HU-008: Benchmarking y Analytics**
**Como** administrador del sistema
**Quiero** obtener métricas de rendimiento
**Para** optimizar la plataforma

**Criterios de Aceptación:**
- ✅ Envío automático a BigQuery
- ✅ Métricas de consultas SQL
- ✅ Dashboard de rendimiento
- ✅ Exportación de datos históricos

**Escenarios de Prueba:**
- Recolección automática de métricas
- Envío exitoso a BigQuery
- Visualización correcta en dashboard
- Exportación de datos

---

## 🧪 **ESCENARIOS DE PRUEBA PARA TESTING**

### Selenium WebDriver
- ✅ Navegación completa del flujo de compra
- ✅ Formularios de registro y login
- ✅ Interacciones del dashboard
- ✅ Validación de elementos dinámicos

### JUnit (Backend)
- ✅ APIs REST endpoints
- ✅ Validación de datos
- ✅ Autenticación y autorización
- ✅ Lógica de negocio

### JMeter (Performance)
- ✅ Carga concurrente de usuarios
- ✅ Tiempo de respuesta de APIs
- ✅ Rendimiento bajo stress
- ✅ Validación de estabilidad

---

## 📋 **CHECKLIST DE VALIDACIÓN**

### Funcionalidades Core
- [ ] Registro de usuarios
- [ ] Autenticación
- [ ] Marketplace funcional
- [ ] Sistema de compras
- [ ] Dashboard vendedor
- [ ] Gestión de productos
- [ ] Sistema de ventas
- [ ] Benchmarking

### Calidad de Código
- [ ] Sin errores de compilación
- [ ] Tests unitarios pasan
- [ ] Cobertura de código > 80%
- [ ] Documentación actualizada

### Despliegue
- [ ] Docker containers corriendo
- [ ] Base de datos conectada
- [ ] APIs respondiendo correctamente
- [ ] Frontend accesible

### Seguridad
- [ ] Variables de entorno configuradas
- [ ] Autenticación funcionando
- [ ] Datos sensibles protegidos
- [ ] CORS configurado correctamente
