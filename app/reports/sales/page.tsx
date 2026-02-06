import sql from '@/lib/db';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function SalesReport({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const { from, to } = await searchParams;

    const dateFrom = typeof from === 'string' ? from : undefined;
    const dateTo = typeof to === 'string' ? to : undefined;

    let query = sql`SELECT * FROM vw_sales_daily`;

    if (dateFrom && dateTo) {
        query = sql`SELECT * FROM vw_sales_daily WHERE sale_date BETWEEN ${dateFrom} AND ${dateTo} ORDER BY sale_date DESC`;
    } else if (dateFrom) {
        query = sql`SELECT * FROM vw_sales_daily WHERE sale_date >= ${dateFrom} ORDER BY sale_date DESC`;
    } else {
        query = sql`SELECT * FROM vw_sales_daily ORDER BY sale_date DESC LIMIT 30`;
    }

    const sales = await query;
    const totalRevenue = sales.reduce((acc, row) => acc + Number(row.total_revenue), 0);

    return (
        <main className="min-h-screen bg-gray-50 p-10">
            <div className="max-w-5xl mx-auto">
                <div className="mb-8 flex items-center gap-4">
                    <Link href="/" className="p-2 hover:bg-gray-200 rounded-full transition"><ArrowLeft className="w-6 h-6 text-gray-600" /></Link>
                    <h1 className="text-3xl font-bold text-gray-900">Ventas Diarias</h1>
                </div>

                <div className="bg-white p-6 rounded-xl shadow border mb-8 text-center">
                    <p className="text-sm text-gray-500 uppercase font-bold">Ingresos Totales</p>
                    <p className="text-4xl font-bold text-blue-600">${totalRevenue.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</p>
                </div>

                <form className="bg-white p-4 rounded-lg shadow mb-6 flex flex-wrap gap-4 items-end">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Desde</label>
                        <input type="date" name="from" defaultValue={dateFrom} className="border rounded p-2 text-black" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Hasta</label>
                        <input type="date" name="to" defaultValue={dateTo} className="border rounded p-2 text-black" />
                    </div>
                    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Filtrar</button>
                    <Link href="/reports/sales" className="text-gray-500 underline ml-auto text-sm self-center">Limpiar</Link>
                </form>

                <div className="bg-white rounded-xl shadow overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left">Fecha</th>
                                <th className="px-6 py-3 text-right">Tickets</th>
                                <th className="px-6 py-3 text-right">Venta Total</th>
                                <th className="px-6 py-3 text-right">Ticket Promedio</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {sales.map((row) => (
                                <tr key={row.sale_date.toString()}>
                                    <td className="px-6 py-4 text-sm text-gray-900">{new Date(row.sale_date).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500 text-right">{row.total_tickets}</td>
                                    <td className="px-6 py-4 text-sm font-bold text-green-600 text-right">${Number(row.total_revenue).toLocaleString()}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500 text-right">${Number(row.avg_ticket_value).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    );
}
