import sql from './db';

export const ServicioVentas = {
    async obtenerVentasDiarias(desde?: string, hasta?: string) {
        if (desde && hasta) {
            return await sql`SELECT * FROM vw_ventas_diarias WHERE fecha_venta BETWEEN ${desde} AND ${hasta} ORDER BY fecha_venta DESC`;
        } else if (desde) {
            return await sql`SELECT * FROM vw_ventas_diarias WHERE fecha_venta >= ${desde} ORDER BY fecha_venta DESC`;
        }
        return await sql`SELECT * FROM vw_ventas_diarias ORDER BY fecha_venta DESC LIMIT 30`;
    }
};

export const ServicioProductos = {
    async obtenerProductosTop(busqueda?: string, limite = 10, desplazamiento = 0) {
        if (busqueda) {
            return await sql`SELECT * FROM vw_productos_top WHERE nombre_producto ILIKE ${'%' + busqueda + '%'} LIMIT ${limite} OFFSET ${desplazamiento}`;
        }
        return await sql`SELECT * FROM vw_productos_top LIMIT ${limite} OFFSET ${desplazamiento}`;
    },

    async obtenerRiesgoInventario(categoria?: string) {
        if (categoria) {
            return await sql`SELECT * FROM vw_riesgo_inventario WHERE categoria = ${categoria}`;
        }
        return await sql`SELECT * FROM vw_riesgo_inventario`;
    }
};

export const ServicioClientes = {
    async obtenerClientesVip(limite = 10, desplazamiento = 0) {
        return await sql`SELECT * FROM vw_valor_cliente LIMIT ${limite} OFFSET ${desplazamiento}`;
    }
};

export const ServicioFinanzas = {
    async obtenerMixPagos() {
        return await sql`SELECT * FROM vw_mix_pagos`;
    }
};
