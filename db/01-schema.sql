-- 01-schema.sql
-- Estructura inicial del proyecto
-- Parte 1: Tablas base

DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS categories;

-- 1. Categorías
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

-- 2. Productos
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    category_id INT REFERENCES categories(id),
    price DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL DEFAULT 0,
    active BOOLEAN DEFAULT TRUE
);
