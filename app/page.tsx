import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 p-10">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">☕ Dashboard Cafetería</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Tarjeta 1 */}
        <Link href="/reports/sales" className="block p-6 bg-white rounded-xl shadow-sm hover:shadow-md border transition">
          <h2 className="text-xl font-semibold text-blue-600">💰 Ventas Diarias</h2>
          <p className="text-gray-600 mt-2">Reporte de ingresos por día y ticket promedio.</p>
        </Link>

        {/* Tarjeta 2 */}
        <Link href="/reports/top-products" className="block p-6 bg-white rounded-xl shadow-sm hover:shadow-md border transition">
          <h2 className="text-xl font-semibold text-green-600">🏆 Productos Top</h2>
          <p className="text-gray-600 mt-2">Ranking de los productos más vendidos.</p>
        </Link>

        {/* Tarjeta 3 */}
        <Link href="/reports/inventory" className="block p-6 bg-white rounded-xl shadow-sm hover:shadow-md border transition">
          <h2 className="text-xl font-semibold text-red-600">⚠️ Riesgo Inventario</h2>
          <p className="text-gray-600 mt-2">Alertas de stock bajo y crítico.</p>
        </Link>
        
        {/* Tarjeta 4 */}
        <Link href="/reports/customers" className="block p-6 bg-white rounded-xl shadow-sm hover:shadow-md border transition">
          <h2 className="text-xl font-semibold text-purple-600">💎 Clientes VIP</h2>
          <p className="text-gray-600 mt-2">Análisis de valor de cliente (LTV).</p>
        </Link>

         {/* Tarjeta 5 */}
         <Link href="/reports/payments" className="block p-6 bg-white rounded-xl shadow-sm hover:shadow-md border transition">
          <h2 className="text-xl font-semibold text-orange-600">💳 Mix de Pagos</h2>
          <p className="text-gray-600 mt-2">Distribución de métodos de pago.</p>
        </Link>
      </div>
    </main>
  );
}
