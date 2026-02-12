import { ServicioClientes } from '@backend/lib/services';
import { VistaClientes } from '@frontend/views/CustomersView';

export const dynamic = 'force-dynamic';

type Props = {
    searchParams: Promise<{ page?: string }>;
};

type ClienteDB = {
    id_cliente: number;
    nombre_cliente: string;
    email: string;
    total_ordenes: number | string;
    valor_vida: number | string;
    valor_promedio_orden: number | string;
};

export default async function CustomersPage({ searchParams }: Props) {
    const params = await searchParams;
    const pagina = Number(params.page) || 1;
    const limite = 10;
    const desplazamiento = (pagina - 1) * limite;

    const clientes = await ServicioClientes.obtenerClientesVip(limite, desplazamiento) as unknown as ClienteDB[];
    const tieneMas = clientes.length === limite;

    return (
        <VistaClientes
            clientes={clientes.map(c => ({
                id_cliente: c.id_cliente,
                nombre_cliente: c.nombre_cliente,
                email: c.email,
                total_ordenes: Number(c.total_ordenes),
                valor_vida: Number(c.valor_vida),
                valor_promedio_orden: Number(c.valor_promedio_orden)
            }))}
            pagina={pagina}
            tieneMas={tieneMas}
        />
    );
}
