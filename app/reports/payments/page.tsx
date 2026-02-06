import { ServicioFinanzas } from '@backend/lib/services';
import { VistaPagos } from '@frontend/views/PaymentsView';

export const dynamic = 'force-dynamic';

export default async function ReportePagos() {
    const pagos = await ServicioFinanzas.obtenerMixPagos();

    return <VistaPagos pagos={pagos as any} />;
}
