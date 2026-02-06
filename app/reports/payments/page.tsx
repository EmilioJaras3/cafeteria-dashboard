import sql from '@/lib/db';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function PaymentsReport() {
    const payments = await sql`SELECT * FROM vw_payment_mix`;

    return (
        <main className="min-h-screen bg-gray-50 p-10">
            <div className="max-w-5xl mx-auto">
                <div className="mb-8 flex items-center gap-4">
                    <Link href="/" className="p-2 hover:bg-gray-200 rounded-full transition"><ArrowLeft className="w-6 h-6 text-gray-600" /></Link>
                    <h1 className="text-3xl font-bold text-gray-900">Mix de Metodos de Pago</h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {payments.map((p) => (
                        <div key={p.payment_method} className="bg-white p-6 rounded-xl shadow border border-gray-100">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-bold capitalize text-gray-800">{p.payment_method}</h2>
                                <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-medium">
                                    {p.transaction_count} txns
                                </span>
                            </div>
                            <div className="flex items-end gap-2 mb-2">
                                <span className="text-4xl font-bold text-gray-900">${Number(p.total_amount).toLocaleString('es-MX')}</span>
                                <span className="text-gray-500 mb-2">generados</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                    className="bg-orange-500 h-2 rounded-full"
                                    style={{ width: `${p.percentage_share}%` }}
                                ></div>
                            </div>
                            <p className="text-right text-sm text-gray-500 mt-1">{p.percentage_share}% del total</p>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
