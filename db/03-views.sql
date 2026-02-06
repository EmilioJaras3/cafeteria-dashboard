-- 03-views.sql
-- Vistas requeridas para los reportes

-- 1. vw_sales_daily: Ventas por día
-- Métrica agregada: SUM(total_ventas), COUNT(tickets)
CREATE OR REPLACE VIEW vw_sales_daily AS
SELECT 
    DATE(o.created_at) as sale_date,
    COUNT(DISTINCT o.id) as total_tickets,
    SUM(oi.qty * oi.unit_price) as total_revenue,
    AVG(oi.qty * oi.unit_price) as avg_ticket_value
FROM orders o
JOIN order_items oi ON o.id = oi.order_id
WHERE o.status = 'completed'
GROUP BY DATE(o.created_at)
ORDER BY sale_date DESC;

-- Verify query
-- SELECT * FROM vw_sales_daily;


-- 2. vw_top_products_ranked: Ranking de productos (Window Function)
-- Muestra el ranking de productos por ingresos generados
CREATE OR REPLACE VIEW vw_top_products_ranked AS
SELECT 
    p.id as product_id,
    p.name as product_name,
    c.name as category,
    SUM(oi.qty) as total_units_sold,
    SUM(oi.qty * oi.unit_price) as total_revenue,
    RANK() OVER (ORDER BY SUM(oi.qty * oi.unit_price) DESC) as revenue_rank
FROM products p
JOIN order_items oi ON p.id = oi.product_id
JOIN orders o ON oi.order_id = o.id
JOIN categories c ON p.category_id = c.id
WHERE o.status = 'completed'
GROUP BY p.id, p.name, c.name;

-- Verify query
-- SELECT * FROM vw_top_products_ranked WHERE revenue_rank <= 5;


-- 3. vw_inventory_risk: Productos con stock bajo
-- Utiliza CASE para definir el nivel de riesgo
CREATE OR REPLACE VIEW vw_inventory_risk AS
SELECT 
    p.id,
    p.name,
    c.name as category,
    p.stock,
    CASE 
        WHEN p.stock = 0 THEN 'Critical'
        WHEN p.stock < 10 THEN 'High'
        WHEN p.stock < 20 THEN 'Medium'
        ELSE 'Low'
    END as risk_level
FROM products p
JOIN categories c ON p.category_id = c.id
WHERE p.stock < 20
ORDER BY p.stock ASC;

-- Verify query
-- SELECT * FROM vw_inventory_risk;


-- 4. vw_customer_value: Valor del cliente
-- Agrega métricas por cliente para identificar VIPs
CREATE OR REPLACE VIEW vw_customer_value AS
SELECT 
    c.id as customer_id,
    c.name as customer_name,
    c.email,
    COUNT(orders.id) as total_orders,
    SUM(payments.paid_amount) as total_spent,
    AVG(payments.paid_amount) as avg_order_value
FROM customers c
LEFT JOIN orders ON c.id = orders.customer_id
LEFT JOIN payments ON orders.id = payments.order_id
GROUP BY c.id, c.name, c.email
HAVING COUNT(orders.id) > 0
ORDER BY total_spent DESC;

-- Verify query
-- SELECT * FROM vw_customer_value;


-- 5. vw_payment_mix: Mezcla de pagos
-- Porcentaje de ventas por método de pago usando CTE y Window Function implícita o Join
CREATE OR REPLACE VIEW vw_payment_mix AS
WITH TotalSales AS (
    SELECT SUM(paid_amount) as grand_total FROM payments
)
SELECT 
    p.method as payment_method,
    COUNT(p.id) as transaction_count,
    SUM(p.paid_amount) as total_amount,
    ROUND((SUM(p.paid_amount) / (SELECT grand_total FROM TotalSales)) * 100, 2) as percentage_share
FROM payments p
GROUP BY p.method;

-- Verify query
-- SELECT * FROM vw_payment_mix;
