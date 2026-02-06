DROP TABLE IF EXISTS metodos_pago CASCADE;
DROP TABLE IF EXISTS detalle_orden CASCADE;
DROP TABLE IF EXISTS ordenes CASCADE;
DROP TABLE IF EXISTS productos CASCADE;
DROP TABLE IF EXISTS clientes CASCADE;
DROP TABLE IF EXISTS categorias CASCADE;

CREATE TABLE categorias (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);

CREATE TABLE clientes (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE productos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(200) NOT NULL,
    id_categoria INT REFERENCES categorias(id),
    precio DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL DEFAULT 0,
    activo BOOLEAN DEFAULT TRUE
);

CREATE TABLE ordenes (
    id SERIAL PRIMARY KEY,
    id_cliente INT REFERENCES clientes(id),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado VARCHAR(50) DEFAULT 'completado',
    canal VARCHAR(50) DEFAULT 'tienda'
);

CREATE TABLE detalle_orden (
    id SERIAL PRIMARY KEY,
    id_orden INT REFERENCES ordenes(id),
    id_producto INT REFERENCES productos(id),
    cantidad INT NOT NULL CHECK (cantidad > 0),
    precio_unitario DECIMAL(10, 2) NOT NULL
);

CREATE TABLE metodos_pago (
    id SERIAL PRIMARY KEY,
    id_orden INT REFERENCES ordenes(id),
    metodo VARCHAR(50) NOT NULL,
    monto DECIMAL(10, 2) NOT NULL
);
