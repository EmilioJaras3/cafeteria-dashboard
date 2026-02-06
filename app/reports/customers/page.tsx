import { ServicioClientes } from '@backend/lib/services';
import { VistaClientes } from '@frontend/views/CustomersView';

export const dynamic = 'force-dynamic';

export default async function ReporteClientes({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const params = await searchParams;
    const pagina = typeof params.pagina === 'string' ? parseInt(params.pagina) : 1;
    const limite = 10;
    const desplazamiento = (pagina - 1) * limite;

    const clientes = await ServicioClientes.obtenerClientesVip(limite, desplazamiento);

    const tieneMas = clientes.length === limite;

    return <VistaClientes clientes={clientes as any} pagina={pagina} tieneMas={tieneMas} />;
}
