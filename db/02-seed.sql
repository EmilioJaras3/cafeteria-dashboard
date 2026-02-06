-- 02-seed.sql
-- Datos de prueba para verificar las vistas

INSERT INTO categories (name) VALUES 
('Bebidas Calientes'),
('Bebidas Frías'),
('Postres'),
('Sandwiches');

INSERT INTO customers (name, email) VALUES
('Juan Perez', 'juan@example.com'),
('Maria Lopez', 'maria@example.com'),
('Carlos Ruiz', 'carlos@example.com'),
('Ana Torres', 'ana@example.com'),
('Invitado', 'guest@cafeteria.com');

INSERT INTO products (name, category_id, price, stock) VALUES
('Café Americano', 1, 35.00, 100),
('Capuchino', 1, 45.00, 50),
('Latte', 1, 45.00, 50),
('Moka Frappé', 2, 60.00, 30),
('Té Helado', 2, 30.00, 40),
('Pay de Limón', 3, 40.00, 10), -- low stock
('Brownie', 3, 25.00, 15),
('Bagel de Salmón', 4, 85.00, 5), -- low stock
('Croissant Jamón', 4, 55.00, 20);

-- Generar algunas ordenes (simplificado)
-- Orden 1: Juan compra café y brownie
INSERT INTO orders (customer_id, created_at, status, channel) VALUES (1, NOW() - INTERVAL '2 days', 'completed', 'in_store');
INSERT INTO order_items (order_id, product_id, qty, unit_price) VALUES 
(1, 1, 1, 35.00), 
(1, 7, 1, 25.00);
INSERT INTO payments (order_id, method, paid_amount) VALUES (1, 'cash', 60.00);

-- Orden 2: Maria compra frappé
INSERT INTO orders (customer_id, created_at, status, channel) VALUES (2, NOW() - INTERVAL '1 day', 'completed', 'delivery');
INSERT INTO order_items (order_id, product_id, qty, unit_price) VALUES 
(2, 4, 2, 60.00);
INSERT INTO payments (order_id, method, paid_amount) VALUES (2, 'card', 120.00);

-- Orden 3: Invitado compra bagel (stock bajo)
INSERT INTO orders (customer_id, created_at, status, channel) VALUES (5, NOW(), 'completed', 'in_store');
INSERT INTO order_items (order_id, product_id, qty, unit_price) VALUES 
(3, 8, 1, 85.00);
INSERT INTO payments (order_id, method, paid_amount) VALUES (3, 'card', 85.00);

-- Orden 4: Carlos compra varios
INSERT INTO orders (customer_id, created_at, status, channel) VALUES (3, NOW(), 'completed', 'in_store');
INSERT INTO order_items (order_id, product_id, qty, unit_price) VALUES 
(4, 2, 1, 45.00),
(4, 9, 1, 55.00);
INSERT INTO payments (order_id, method, paid_amount) VALUES (4, 'cash', 100.00);
