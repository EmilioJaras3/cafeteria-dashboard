
import Link from 'next/link';

export function HomeView() {
    const reportes = [
        { nombre: 'Ventas Diarias', ruta: '/reports/sales' },
        { nombre: 'Productos Top', ruta: '/reports/top-products' },
        { nombre: 'Riesgo Inventario', ruta: '/reports/inventory' },
        { nombre: 'Clientes VIP', ruta: '/reports/customers' },
        { nombre: 'Mix de Pagos', ruta: '/reports/payments' },
    ];

    return (
        <main className="min-h-screen bg-gray-50 flex items-center justify-center p-10">
            <div className="max-w-2xl w-full">
                <h1 className="text-4xl font-bold text-center text-gray-900 mb-10">
                    Dashboard Cafeteria
                </h1>
                <div className="grid gap-4">
                    {reportes.map((reporte) => (
                        <Link
                            key={reporte.ruta}
                            href={reporte.ruta}
                            className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition text-center font-bold text-lg text-gray-800 hover:bg-blue-50"
                        >
                            {reporte.nombre}
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    );
}
