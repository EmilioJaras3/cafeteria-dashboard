
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import clsx from 'clsx';

type ItemInventario = {
    id_producto: number;
    nombre_producto: string;
    stock_actual: number;
    nivel_riesgo: string;
    categoria: string;
};

interface VistaInventarioProps {
    inventario: ItemInventario[];
    categorias: string[];
    filtroCategoria: string;
}

export function VistaInventario({ inventario, categorias, filtroCategoria }: VistaInventarioProps) {
    return (
        <main className="min-h-screen bg-gray-50 p-10">
            <div className="max-w-6xl mx-auto">
                <div className="mb-8 flex items-center gap-4">
                    <Link href="/" className="p-2 hover:bg-gray-200 rounded-full transition"><ArrowLeft className="w-6 h-6 text-gray-600" /></Link>
                    <h1 className="text-3xl font-bold text-gray-900">Riesgo de Inventario</h1>
                </div>
                <form method="get" className="mb-8 bg-white p-4 rounded-lg shadow flex gap-4 items-end">
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Filtrar por Categoría</label>
                        <select name="categoria" defaultValue={filtroCategoria} className="w-full p-2 border rounded text-black bg-white">
                            <option value="">Todas</option>
                            {categorias.map(c => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded h-[42px]">Filtrar</button>
                    <Link href="/reports/inventory" className="text-gray-500 underline ml-auto text-sm self-center">Limpiar</Link>
                </form>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {inventario.map((item) => (
                        <div key={item.id_producto} className="bg-white p-6 rounded-xl shadow border border-gray-100 flex flex-col justify-between">
                            <div>
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-lg font-bold text-gray-800">{item.nombre_producto}</h3>
                                    <span className={clsx(
                                        "px-3 py-1 rounded-full text-xs font-bold uppercase",
                                        item.nivel_riesgo === 'Critico' ? "bg-red-100 text-red-800" :
                                            item.nivel_riesgo === 'Alto' ? "bg-orange-100 text-orange-800" :
                                                "bg-yellow-100 text-yellow-800"
                                    )}>
                                        {item.nivel_riesgo}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-500 mb-2">Categoría: {item.categoria}</p>
                            </div>

                            <div className="mt-4">
                                <div className="flex justify-between items-end mb-1">
                                    <span className="text-gray-600 text-sm">Stock actual:</span>
                                    <span className={clsx(
                                        "text-2xl font-bold",
                                        Number(item.stock_actual) === 0 ? "text-red-600" : "text-gray-900"
                                    )}>
                                        {item.stock_actual}
                                    </span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                    <div
                                        className={clsx("h-2.5 rounded-full",
                                            item.nivel_riesgo === 'Critico' ? "bg-red-600" : "bg-yellow-500"
                                        )}
                                        style={{ width: `${Math.min(Number(item.stock_actual) * 5, 100)}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    ))}
                    {inventario.length === 0 && (
                        <div className="col-span-full p-10 text-center bg-white rounded-xl text-gray-500">
                            No hay productos que coincidan con el filtro.
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
