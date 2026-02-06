import sql from '@/lib/db';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Pagination } from '@/components/Pagination';
import { SearchBar } from '@/components/SearchBar';

export const dynamic = 'force-dynamic';

export default async function TopProductsReport({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const params = await searchParams;
    const q = typeof params.q === 'string' ? params.q : '';
    const page = typeof params.page === 'string' ? parseInt(params.page) : 1;
    const limit = 5;
    const offset = (page - 1) * limit;

    let products;
    if (q) {
        products = await sql`
        SELECT * FROM vw_top_products_ranked 
        WHERE product_name ILIKE ${'%' + q + '%'}
        ORDER BY revenue_rank ASC 
        LIMIT ${limit} OFFSET ${offset}
    `;
    } else {
        products = await sql`
        SELECT * FROM vw_top_products_ranked 
        ORDER BY revenue_rank ASC 
        LIMIT ${limit} OFFSET ${offset}
    `;
    }

    const hasMore = products.length === limit;

    return (
        <main className="min-h-screen bg-gray-50 p-10">
            <div className="max-w-5xl mx-auto">
                <div className="mb-8 flex items-center gap-4">
                    <Link href="/" className="p-2 hover:bg-gray-200 rounded-full transition"><ArrowLeft className="w-6 h-6 text-gray-600" /></Link>
                    <h1 className="text-3xl font-bold text-gray-900">Productos Top</h1>
                </div>

                <form className="mb-6 flex gap-2">
                    <SearchBar placeholder="Buscar producto..." defaultValue={q} />
                    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg h-[42px]">Buscar</button>
                </form>

                <div className="bg-white rounded-xl shadow overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left">Rank</th>
                                <th className="px-6 py-3 text-left">Producto</th>
                                <th className="px-6 py-3 text-left">Categoría</th>
                                <th className="px-6 py-3 text-right">Unidades</th>
                                <th className="px-6 py-3 text-right">Ingresos</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {products.map((p) => (
                                <tr key={p.product_id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 font-bold">#{p.revenue_rank}</td>
                                    <td className="px-6 py-4 font-medium">{p.product_name}</td>
                                    <td className="px-6 py-4 text-gray-500">{p.category}</td>
                                    <td className="px-6 py-4 text-right">{p.total_units_sold}</td>
                                    <td className="px-6 py-4 text-right text-green-600 font-bold">${Number(p.total_revenue).toLocaleString()}</td>
                                </tr>
                            ))}
                            {products.length === 0 && (
                                <tr><td colSpan={5} className="p-8 text-center text-gray-500">No se encontraron productos.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <Pagination page={page} hasMore={hasMore} baseUrl={`/reports/top-products?q=${q}`} />
            </div>
        </main>
    );
}
