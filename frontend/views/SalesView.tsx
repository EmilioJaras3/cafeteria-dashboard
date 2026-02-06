
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

type Venta = {
    fecha_venta: string | Date;
    total_tickets: number;
    venta_total: number;
    ticket_promedio: number;
};

interface VistaVentasProps {
    ventas: Venta[];
    desde?: string;
    hasta?: string;
    ingresosTotales: number;
}

export function VistaVentas({ ventas, desde, hasta, ingresosTotales }: VistaVentasProps) {
    return (
        <main className="min-h-screen bg-gray-50 p-10">
            <div className="max-w-5xl mx-auto">
                <div className="mb-8 flex items-center gap-4">
                    <Link href="/" className="p-2 hover:bg-gray-200 rounded-full transition"><ArrowLeft className="w-6 h-6 text-gray-600" /></Link>
                    <h1 className="text-3xl font-bold text-gray-900">Ventas Diarias</h1>
                </div>

                <div className="bg-white p-6 rounded-xl shadow border mb-8 text-center">
                    <p className="text-sm text-gray-500 uppercase font-bold">Ingresos Totales</p>
                    <p className="text-4xl font-bold text-blue-600">${ingresosTotales.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</p>
                </div>

                <form className="bg-white p-4 rounded-lg shadow mb-6 flex flex-wrap gap-4 items-end">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Desde</label>
                        <input type="date" name="from" defaultValue={desde} className="border rounded p-2 text-black" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Hasta</label>
                        <input type="date" name="to" defaultValue={hasta} className="border rounded p-2 text-black" />
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
                            {ventas.map((fila) => (
                                <tr key={fila.fecha_venta.toString()}>
                                    <td className="px-6 py-4 text-sm text-gray-900">{new Date(fila.fecha_venta).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500 text-right">{fila.total_tickets}</td>
                                    <td className="px-6 py-4 text-sm font-bold text-green-600 text-right">${Number(fila.venta_total).toLocaleString()}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500 text-right">${Number(fila.ticket_promedio).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    );
}
