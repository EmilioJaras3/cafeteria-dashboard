import { ServicioProductos } from '@backend/lib/services';
import { VistaProductosTop } from '@frontend/views/TopProductsView';

export const dynamic = 'force-dynamic';

export default async function ReporteProductosTop({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const params = await searchParams;
    const busqueda = typeof params.busqueda === 'string' ? params.busqueda : '';
    const pagina = typeof params.pagina === 'string' ? parseInt(params.pagina) : 1;
    const limite = 5;
    const desplazamiento = (pagina - 1) * limite;

    let productos;
    if (busqueda) {
        productos = await ServicioProductos.obtenerProductosTop(busqueda, limite, desplazamiento);
    } else {
        productos = await ServicioProductos.obtenerProductosTop(undefined, limite, desplazamiento);
    }

    const tieneMas = productos.length === limite;

    return (
        <VistaProductosTop
            productos={productos as any}
            busqueda={busqueda}
            pagina={pagina}
            tieneMas={tieneMas}
        />
    );
}
