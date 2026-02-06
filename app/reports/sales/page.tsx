import { ServicioVentas } from '@backend/lib/services';
import { VistaVentas } from '@frontend/views/SalesView';

export const dynamic = 'force-dynamic';

export default async function ReporteVentas({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const { from, to } = await searchParams;

    const desde = typeof from === 'string' ? from : undefined;
    const hasta = typeof to === 'string' ? to : undefined;

    let ventas;
    if (desde && hasta) {
        ventas = await ServicioVentas.obtenerVentasDiarias(desde, hasta);
    } else if (desde) {
        ventas = await ServicioVentas.obtenerVentasDiarias(desde);
    } else {
        ventas = await ServicioVentas.obtenerVentasDiarias();
    }
    const ingresosTotales = ventas.reduce((acc, fila) => acc + Number(fila.venta_total), 0);

    return (
        <VistaVentas
            ventas={ventas as any}
            desde={desde}
            hasta={hasta}
            ingresosTotales={ingresosTotales}
        />
    );
}
