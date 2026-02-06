INSERT INTO categorias (nombre) VALUES 
('Bebidas Calientes'),
('Bebidas Frias'),
('Postres'),
('Sandwiches');

INSERT INTO clientes (nombre, email) VALUES
('Juan Perez', 'juan@example.com'),
('Maria Lopez', 'maria@example.com'),
('Carlos Ruiz', 'carlos@example.com'),
('Ana Torres', 'ana@example.com'),
('Invitado', 'guest@cafeteria.com');

INSERT INTO productos (nombre, id_categoria, precio, stock) VALUES
('Cafe Americano', 1, 35.00, 100),
('Capuchino', 1, 45.00, 50),
('Latte', 1, 45.00, 50),
('Moka Frappe', 2, 60.00, 30),
('Te Helado', 2, 30.00, 40),
('Pay de Limon', 3, 40.00, 10),
('Brownie', 3, 25.00, 15),
('Bagel de Salmon', 4, 85.00, 5),
('Croissant Jamon', 4, 55.00, 20);

INSERT INTO ordenes (id_cliente, fecha_creacion, estado, canal) VALUES (1, NOW() - INTERVAL '2 days', 'completado', 'tienda');
INSERT INTO detalle_orden (id_orden, id_producto, cantidad, precio_unitario) VALUES 
(1, 1, 1, 35.00), 
(1, 7, 1, 25.00);
INSERT INTO metodos_pago (id_orden, metodo, monto) VALUES (1, 'efectivo', 60.00);

INSERT INTO ordenes (id_cliente, fecha_creacion, estado, canal) VALUES (2, NOW() - INTERVAL '1 day', 'completado', 'envio');
INSERT INTO detalle_orden (id_orden, id_producto, cantidad, precio_unitario) VALUES 
(2, 4, 2, 60.00);
INSERT INTO metodos_pago (id_orden, metodo, monto) VALUES (2, 'tarjeta', 120.00);

INSERT INTO ordenes (id_cliente, fecha_creacion, estado, canal) VALUES (5, NOW(), 'completado', 'tienda');
INSERT INTO detalle_orden (id_orden, id_producto, cantidad, precio_unitario) VALUES 
(3, 8, 1, 85.00);
INSERT INTO metodos_pago (id_orden, metodo, monto) VALUES (3, 'tarjeta', 85.00);

INSERT INTO ordenes (id_cliente, fecha_creacion, estado, canal) VALUES (3, NOW(), 'completado', 'tienda');
INSERT INTO detalle_orden (id_orden, id_producto, cantidad, precio_unitario) VALUES 
(4, 2, 1, 45.00),
(4, 9, 1, 55.00);
INSERT INTO metodos_pago (id_orden, metodo, monto) VALUES (4, 'efectivo', 100.00);
