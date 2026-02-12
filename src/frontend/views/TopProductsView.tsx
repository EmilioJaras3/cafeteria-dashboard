
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Pagination } from '@frontend/components/Pagination';
import { SearchBar } from '@frontend/components/SearchBar';

type Producto = {
    id_producto: number;
    nombre_producto: string;
    categoria: string;
    unidades_vendidas: number;
    venta_total: number;
    ranking_ventas: number;
};

interface VistaProductosTopProps {
    productos: Producto[];
    busqueda: string;
    pagina: number;
    tieneMas: boolean;
}

export function VistaProductosTop({ productos, busqueda, pagina, tieneMas }: VistaProductosTopProps) {
    return (
        <main className="min-h-screen bg-gray-50 p-10">
            <div className="max-w-5xl mx-auto">
                <div className="mb-8 flex items-center gap-4">
                    <Link href="/" className="p-2 hover:bg-gray-200 rounded-full transition"><ArrowLeft className="w-6 h-6 text-gray-600" /></Link>
                    <h1 className="text-3xl font-bold text-gray-900">Productos Top</h1>
                </div>

                <form method="get" className="mb-6 flex gap-2">
                    <SearchBar textoAyuda="Buscar producto..." nombre="busqueda" valorPorDefecto={busqueda} />
                    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg h-[42px]">Buscar</button>
                </form>

                <div className="bg-white rounded-xl shadow overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left">Ranking</th>
                                <th className="px-6 py-3 text-left">Producto</th>
                                <th className="px-6 py-3 text-left">Categoría</th>
                                <th className="px-6 py-3 text-right">Unidades</th>
                                <th className="px-6 py-3 text-right">Ingresos</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {productos.map((p) => (
                                <tr key={p.id_producto} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 font-bold">#{p.ranking_ventas}</td>
                                    <td className="px-6 py-4 font-medium">{p.nombre_producto}</td>
                                    <td className="px-6 py-4 text-gray-500">{p.categoria}</td>
                                    <td className="px-6 py-4 text-right">{p.unidades_vendidas}</td>
                                    <td className="px-6 py-4 text-right text-green-600 font-bold">${Number(p.venta_total).toLocaleString()}</td>
                                </tr>
                            ))}
                            {productos.length === 0 && (
                                <tr><td colSpan={5} className="p-8 text-center text-gray-500">No se encontraron productos.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <Pagination pagina={pagina} tieneMas={tieneMas} urlBase={`/reports/top-products?busqueda=${busqueda}`} />
            </div>
        </main>
    );
}
