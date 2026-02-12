import { ServicioFinanzas } from '@backend/lib/services';
import { VistaPagos } from '@frontend/views/PaymentsView';

export const dynamic = 'force-dynamic';

type PagoDB = {
    metodo_pago: string;
    monto_total: number | string;
    conteo_transacciones: number | string;
    porcentaje_participacion: number | string;
};

export default async function PaymentsPage() {
    const pagos = await ServicioFinanzas.obtenerMixPagos() as unknown as PagoDB[];

    return (
        <VistaPagos
            pagos={pagos.map(p => ({
                metodo_pago: p.metodo_pago,
                monto_total: Number(p.monto_total),
                conteo_transacciones: Number(p.conteo_transacciones),
                porcentaje_participacion: Number(p.porcentaje_participacion)
            }))}
        />
    );
}
