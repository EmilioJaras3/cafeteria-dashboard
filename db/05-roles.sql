-- 05-roles.sql
-- Configuración de seguridad y roles

-- Crear usuario de aplicación si no existe (normalmente esto se hace a nivel instancia, 
-- pero para este ejercicio aseguramos permisos)

-- Nota: En un entorno real, el usuario 'app_user' se crea muchas veces desde docker-entrypoint o manualmente.
-- Aquí aseguraremos que el usuario tenga permisos SOLO de lectura sobre las VISTAS y nada más.

DO
$do$
BEGIN
   IF NOT EXISTS (
      SELECT FROM pg_catalog.pg_roles
      WHERE  rolname = 'app_user') THEN

      CREATE ROLE app_user WITH LOGIN PASSWORD 'secreto123';
   END IF;
END
$do$;

-- Revocar permisos excesivos schema public
REVOKE ALL ON SCHEMA public FROM app_user;
GRANT USAGE ON SCHEMA public TO app_user;

-- Dar permisos SELECT SOLO a las vistas, NO a las tablas
GRANT SELECT ON vw_sales_daily TO app_user;
GRANT SELECT ON vw_top_products_ranked TO app_user;
GRANT SELECT ON vw_inventory_risk TO app_user;
GRANT SELECT ON vw_customer_value TO app_user;
GRANT SELECT ON vw_payment_mix TO app_user;

-- Asegurarse que NO pueda leer las tablas base
REVOKE SELECT ON categories, products, customers, orders, order_items, payments FROM app_user;

-- Verificación:
-- SET ROLE app_user;
-- SELECT * FROM vw_sales_daily; -- Debería funcionar
-- SELECT * FROM orders; -- Debería fallar
