CREATE OR REPLACE VIEW vw_ventas_diarias AS
SELECT 
    DATE(o.fecha_creacion) as fecha_venta,
    COUNT(DISTINCT o.id) as total_tickets,
    SUM(det.cantidad * det.precio_unitario) as venta_total,
    AVG(det.cantidad * det.precio_unitario) as ticket_promedio
FROM ordenes o
JOIN detalle_orden det ON o.id = det.id_orden
WHERE o.estado = 'completado'
GROUP BY DATE(o.fecha_creacion)
ORDER BY fecha_venta DESC;

CREATE OR REPLACE VIEW vw_productos_top AS
SELECT 
    p.id as id_producto,
    p.nombre as nombre_producto,
    c.nombre as categoria,
    SUM(det.cantidad) as unidades_vendidas,
    SUM(det.cantidad * det.precio_unitario) as venta_total,
    RANK() OVER (ORDER BY SUM(det.cantidad * det.precio_unitario) DESC) as ranking_ventas
FROM productos p
JOIN detalle_orden det ON p.id = det.id_producto
JOIN ordenes o ON det.id_orden = o.id
JOIN categorias c ON p.id_categoria = c.id
WHERE o.estado = 'completado'
GROUP BY p.id, p.nombre, c.nombre;

CREATE OR REPLACE VIEW vw_riesgo_inventario AS
SELECT 
    p.id as id_producto,
    p.nombre as nombre_producto,
    c.nombre as categoria,
    p.stock as stock_actual,
    20 as umbral_reorden,
    CASE 
        WHEN p.stock = 0 THEN 'Critico'
        WHEN p.stock < 10 THEN 'Alto'
        WHEN p.stock < 20 THEN 'Bajo'
        ELSE 'Normal'
    END as nivel_riesgo
FROM productos p
JOIN categorias c ON p.id_categoria = c.id
WHERE p.stock < 20
ORDER BY p.stock ASC;

CREATE OR REPLACE VIEW vw_valor_cliente AS
SELECT 
    c.id as id_cliente,
    c.nombre as nombre_cliente,
    c.email,
    COUNT(o.id) as total_ordenes,
    COALESCE(SUM(mp.monto), 0) as valor_vida,
    COALESCE(AVG(mp.monto), 0) as valor_promedio_orden
FROM clientes c
LEFT JOIN ordenes o ON c.id = o.id_cliente
LEFT JOIN metodos_pago mp ON o.id = mp.id_orden
GROUP BY c.id, c.nombre, c.email
HAVING COUNT(o.id) > 0
ORDER BY valor_vida DESC;

CREATE OR REPLACE VIEW vw_mix_pagos AS
WITH TotalVentas AS (
    SELECT SUM(monto) as gran_total 
    FROM metodos_pago
)
SELECT 
    mp.metodo as metodo_pago,
    COUNT(mp.id) as conteo_transacciones,
    SUM(mp.monto) as monto_total,
    ROUND((SUM(mp.monto) / (SELECT gran_total FROM TotalVentas)) * 100, 2) as porcentaje_participacion
FROM metodos_pago mp
GROUP BY mp.metodo
HAVING SUM(mp.monto) > 0
ORDER BY monto_total DESC;
