import sql from '@/lib/db';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Pagination } from '@/components/Pagination';

export const dynamic = 'force-dynamic';

export default async function CustomersReport({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const params = await searchParams;
    const page = typeof params.page === 'string' ? parseInt(params.page) : 1;
    const limit = 10;
    const offset = (page - 1) * limit;

    // Consulta con paginación
    const customers = await sql`
    SELECT * FROM vw_customer_value 
    ORDER BY total_spent DESC 
    LIMIT ${limit} OFFSET ${offset}
  `;

    // Check simple de "Siguiente" página
    const hasMore = customers.length === limit;

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
                            {customers.map((c) => (
                                <tr key={c.customer_id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-900">{c.customer_name}</td>
                                    <td className="px-6 py-4 text-gray-500">{c.email}</td>
                                    <td className="px-6 py-4 text-right">{c.total_orders}</td>
                                    <td className="px-6 py-4 text-right font-bold text-purple-600">${Number(c.total_spent).toLocaleString()}</td>
                                    <td className="px-6 py-4 text-right text-gray-500">${Number(c.avg_order_value).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <Pagination page={page} hasMore={hasMore} baseUrl="/reports/customers?q=" />
            </div>
        </main>
    );
}
