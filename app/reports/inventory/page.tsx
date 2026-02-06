import { ServicioProductos } from '@backend/lib/services';
import sql from '@backend/lib/db';
import { VistaInventario } from '@frontend/views/InventoryView';

export const dynamic = 'force-dynamic';

export default async function ReporteRiesgoInventario({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const params = await searchParams;
    const filtroCategoria = typeof params.categoria === 'string' ? params.categoria : '';

    const inventario = await ServicioProductos.obtenerRiesgoInventario(filtroCategoria || undefined);

    const resultadoCategorias = await sql`SELECT DISTINCT categoria FROM vw_riesgo_inventario ORDER BY categoria`;
    const categorias = resultadoCategorias.map(c => c.categoria);

    return (
        <VistaInventario
            inventario={inventario as any}
            categorias={categorias}
            filtroCategoria={filtroCategoria}
        />
    );
}
