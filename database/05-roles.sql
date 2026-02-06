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

REVOKE ALL ON SCHEMA public FROM app_user;
GRANT USAGE ON SCHEMA public TO app_user;

GRANT SELECT ON vw_ventas_diarias TO app_user;
GRANT SELECT ON vw_productos_top TO app_user;
GRANT SELECT ON vw_riesgo_inventario TO app_user;
GRANT SELECT ON vw_valor_cliente TO app_user;
GRANT SELECT ON vw_mix_pagos TO app_user;

REVOKE SELECT ON categorias, productos, clientes, ordenes, detalle_orden, metodos_pago FROM app_user;
