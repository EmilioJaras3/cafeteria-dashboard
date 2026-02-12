import { ServicioProductos } from '@backend/lib/services';
import { VistaProductosTop } from '@frontend/views/TopProductsView';

export const dynamic = 'force-dynamic';

type Props = {
    searchParams: Promise<{ busqueda?: string; page?: string }>;
};

type ProductoDB = {
    id_producto: number;
    nombre_producto: string;
    categoria: string;
    unidades_vendidas: number | string;
    venta_total: number | string;
    ranking_ventas: number | string;
};

export default async function TopProductsPage({ searchParams }: Props) {
    const params = await searchParams;
    const busqueda = params.busqueda || '';
    const pagina = Number(params.page) || 1;
    const limite = 10;
    const desplazamiento = (pagina - 1) * limite;

    const productos = await ServicioProductos.obtenerProductosTop(busqueda, limite, desplazamiento) as unknown as ProductoDB[];

    const tieneMas = productos.length === limite;

    return (
        <VistaProductosTop
            productos={productos.map(p => ({
                id_producto: p.id_producto,
                nombre_producto: p.nombre_producto,
                categoria: p.categoria,
                ranking_ventas: Number(p.ranking_ventas),
                venta_total: Number(p.venta_total),
                unidades_vendidas: Number(p.unidades_vendidas)
            }))}
            busqueda={busqueda}
            pagina={pagina}
            tieneMas={tieneMas}
        />
    );
}
