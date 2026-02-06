import Link from 'next/link';

export default function HomePage() {
  const reports = [
    { name: 'Ventas Diarias', path: '/reports/sales' },
    { name: 'Productos Top', path: '/reports/top-products' },
    { name: 'Riesgo Inventario', path: '/reports/inventory' },
    { name: 'Clientes VIP', path: '/reports/customers' },
    { name: 'Mix de Pagos', path: '/reports/payments' },
  ];

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-10">
      <div className="max-w-2xl w-full">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-10">
          Dashboard Cafeteria
        </h1>
        <div className="grid gap-4">
          {reports.map((report) => (
            <Link
              key={report.path}
              href={report.path}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition text-center font-bold text-lg text-gray-800 hover:bg-blue-50"
            >
              {report.name}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
