import { ServicioVentas } from '@backend/lib/services';
import { VistaVentas } from '@frontend/views/SalesView';

export const dynamic = 'force-dynamic';

type Props = {
    searchParams: Promise<{ from?: string; to?: string }>;
};

type VentaDB = {
    fecha_venta: string | Date;
    total_tickets: number | string;
    venta_total: number | string;
    ticket_promedio: number | string;
};

export default async function SalesPage({ searchParams }: Props) {
    const params = await searchParams;
    const ventas = await ServicioVentas.obtenerVentasDiarias(params.from, params.to) as unknown as VentaDB[];

    const ingresosTotales = ventas.reduce((acc, v) => acc + Number(v.venta_total), 0);

    return (
        <VistaVentas
            ventas={ventas.map(v => ({
                fecha_venta: v.fecha_venta,
                total_tickets: Number(v.total_tickets),
                venta_total: Number(v.venta_total),
                ticket_promedio: Number(v.ticket_promedio)
            }))}
            desde={params.from}
            hasta={params.to}
            ingresosTotales={ingresosTotales}
        />
    );
}
