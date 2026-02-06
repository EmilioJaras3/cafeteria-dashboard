-- Vistas para reportes

-- vw_sales_daily: Devuelve ventas diarias con metricas agregadas
-- Grain: 1 fila por dia
-- Metricas: total_tickets (COUNT), total_revenue (SUM), avg_ticket_value (AVG)
-- VERIFY: SELECT * FROM vw_sales_daily WHERE sale_date >= '2024-01-01' AND sale_date <= '2024-01-31';
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

-- vw_top_products_ranked: Devuelve ranking de productos por revenue (Window Function)
-- Grain: 1 fila por producto
-- Metricas: total_units_sold (SUM), total_revenue (SUM), revenue_rank (RANK Window)
-- VERIFY: SELECT * FROM vw_top_products_ranked WHERE product_name ILIKE '%cafe%' LIMIT 10 OFFSET 0;
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

-- vw_inventory_risk: Devuelve productos con stock bajo clasificados por riesgo
-- Grain: 1 fila por producto con stock bajo
-- Metricas: stock, risk_level (CASE calculado)
-- VERIFY: SELECT * FROM vw_inventory_risk WHERE category = 'Bebidas';
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

-- vw_customer_value: Devuelve valor de vida del cliente (LTV)
-- Grain: 1 fila por cliente
-- Metricas: total_orders (COUNT), total_spent (SUM), avg_order_value (AVG)
-- Filtro HAVING: solo clientes con al menos 1 orden
-- VERIFY: SELECT * FROM vw_customer_value LIMIT 10 OFFSET 0;
CREATE OR REPLACE VIEW vw_customer_value AS
SELECT 
    c.id as customer_id,
    c.name as customer_name,
    c.email,
    COUNT(orders.id) as total_orders,
    COALESCE(SUM(payments.paid_amount), 0) as total_spent,
    COALESCE(AVG(payments.paid_amount), 0) as avg_order_value
FROM customers c
LEFT JOIN orders ON c.id = orders.customer_id
LEFT JOIN payments ON orders.id = payments.order_id
GROUP BY c.id, c.name, c.email
HAVING COUNT(orders.id) > 0
ORDER BY total_spent DESC;

-- vw_payment_mix: Devuelve distribucion porcentual por metodo de pago (CTE)
-- Grain: 1 fila por metodo de pago
-- Metricas: transaction_count (COUNT), total_amount (SUM), percentage_share (calculado)
-- VERIFY: SELECT * FROM vw_payment_mix;
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
GROUP BY p.method
HAVING SUM(p.paid_amount) > 0;
