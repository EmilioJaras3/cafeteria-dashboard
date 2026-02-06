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

CREATE OR REPLACE VIEW vw_inventory_risk AS
SELECT 
    p.id as product_id,
    p.name as product_name,
    c.name as category,
    p.stock as current_stock,
    20 as reorder_threshold,
    CASE 
        WHEN p.stock = 0 THEN 'Alta'
        WHEN p.stock < 10 THEN 'Media'
        WHEN p.stock < 20 THEN 'Baja'
        ELSE 'Normal'
    END as risk_level
FROM products p
JOIN categories c ON p.category_id = c.id
WHERE p.stock < 20
ORDER BY p.stock ASC;

CREATE OR REPLACE VIEW vw_customer_value AS
SELECT 
    c.id as customer_id,
    c.name as customer_name,
    c.email,
    COUNT(o.id) as total_orders,
    COALESCE(SUM(p.paid_amount), 0) as lifetime_value,
    COALESCE(AVG(p.paid_amount), 0) as avg_order_value
FROM customers c
LEFT JOIN orders o ON c.id = o.customer_id
LEFT JOIN payments p ON o.id = p.order_id
GROUP BY c.id, c.name, c.email
HAVING COUNT(o.id) > 0
ORDER BY lifetime_value DESC;

CREATE OR REPLACE VIEW vw_payment_mix AS
WITH TotalSales AS (
    SELECT SUM(paid_amount) as grand_total 
    FROM payments
)
SELECT 
    p.method as payment_method,
    COUNT(p.id) as transaction_count,
    SUM(p.paid_amount) as total_amount,
    ROUND((SUM(p.paid_amount) / (SELECT grand_total FROM TotalSales)) * 100, 2) as percentage_share
FROM payments p
GROUP BY p.method
HAVING SUM(p.paid_amount) > 0
ORDER BY total_amount DESC;
