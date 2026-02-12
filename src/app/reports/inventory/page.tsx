import { ServicioProductos } from '@backend/lib/services';
import { VistaInventario } from '@frontend/views/InventoryView';
import sql from '@backend/lib/db';

export const dynamic = 'force-dynamic';

type Props = {
    searchParams: Promise<{ categoria?: string }>;
};

type InventarioDB = {
    id_producto: number;
    nombre_producto: string;
    stock_actual: number | string;
    nivel_riesgo: string;
    categoria: string;
};

export default async function InventoryPage({ searchParams }: Props) {
    try {
        const params = await searchParams;
        const inventario = await ServicioProductos.obtenerRiesgoInventario(params.categoria) as unknown as InventarioDB[];

        const categoriasResult = await sql`SELECT DISTINCT nombre FROM categorias ORDER BY nombre`;
        const categorias = categoriasResult.map((c: any) => c.nombre);

        return (
            <VistaInventario
                inventario={inventario.map(i => ({
                    id_producto: i.id_producto,
                    nombre_producto: i.nombre_producto,
                    stock_actual: Number(i.stock_actual),
                    nivel_riesgo: i.nivel_riesgo,
                    categoria: i.categoria
                }))}
                categorias={categorias}
                filtroCategoria={params.categoria || ''}
            />
        );
    } catch (error: any) {
        return (
            <div className="p-10 bg-white min-h-screen text-red-600">
                <h1 className="text-2xl font-bold mb-4">Error al cargar el Inventario</h1>
                <pre className="bg-gray-100 p-4 rounded">{error.message}</pre>
                <a href="/" className="text-blue-600 underline mt-4 block">Volver al Dashboard</a>
            </div>
        );
    }
}
