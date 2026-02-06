
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Pagination } from '@frontend/components/Pagination';

type Cliente = {
    id_cliente: number;
    nombre_cliente: string;
    email: string;
    total_ordenes: number;
    valor_vida: number;
    valor_promedio_orden: number;
};

interface VistaClientesProps {
    clientes: Cliente[];
    pagina: number;
    tieneMas: boolean;
}

export function VistaClientes({ clientes, pagina, tieneMas }: VistaClientesProps) {
    return (
        <main className="min-h-screen bg-gray-50 p-10">
            <div className="max-w-6xl mx-auto">
                <div className="mb-8 flex items-center gap-4">
                    <Link href="/" className="p-2 hover:bg-gray-200 rounded-full transition"><ArrowLeft className="w-6 h-6 text-gray-600" /></Link>
                    <h1 className="text-3xl font-bold text-gray-900">Clientes VIP</h1>
                </div>

                <div className="bg-white rounded-xl shadow overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left">Cliente</th>
                                <th className="px-6 py-3 text-left">Email</th>
                                <th className="px-6 py-3 text-right">Ordenes</th>
                                <th className="px-6 py-3 text-right">LTV (Total Gastado)</th>
                                <th className="px-6 py-3 text-right">Ticket Promedio</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {clientes.map((c) => (
                                <tr key={c.id_cliente} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-900">{c.nombre_cliente}</td>
                                    <td className="px-6 py-4 text-gray-500">{c.email}</td>
                                    <td className="px-6 py-4 text-right">{c.total_ordenes}</td>
                                    <td className="px-6 py-4 text-right font-bold text-purple-600">${Number(c.valor_vida).toLocaleString()}</td>
                                    <td className="px-6 py-4 text-right text-gray-500">${Number(c.valor_promedio_orden).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <Pagination pagina={pagina} tieneMas={tieneMas} urlBase="/reports/customers?busqueda=" />
            </div>
        </main>
    );
}
