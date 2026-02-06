CREATE INDEX idx_ordenes_fecha ON ordenes(fecha_creacion);
CREATE INDEX idx_productos_categoria ON productos(id_categoria);
CREATE INDEX idx_clientes_email ON clientes(email);
CREATE INDEX idx_detalle_producto ON detalle_orden(id_producto);
CREATE INDEX idx_detalle_orden ON detalle_orden(id_orden);
