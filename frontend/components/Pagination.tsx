
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function Pagination({ pagina, tieneMas, urlBase }: { pagina: number; tieneMas: boolean; urlBase: string }) {
    const paginaAnterior = pagina > 1 ? pagina - 1 : 1;
    const paginaSiguiente = pagina + 1;

    return (
        <div className="flex justify-center gap-4 mt-6 items-center">
            {pagina > 1 ? (
                <Link
                    href={`${urlBase}&pagina=${paginaAnterior}`}
                    className="flex items-center gap-1 bg-white px-3 py-1 rounded shadow text-sm font-medium hover:bg-gray-50"
                >
                    <ChevronLeft className="w-4 h-4" /> Anterior
                </Link>
            ) : (
                <span className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded shadow text-sm font-medium text-gray-400 cursor-not-allowed">
                    <ChevronLeft className="w-4 h-4" /> Anterior
                </span>
            )}

            <span className="text-sm font-bold text-gray-600">Pag. {pagina}</span>

            {tieneMas ? (
                <Link
                    href={`${urlBase}&pagina=${paginaSiguiente}`}
                    className="flex items-center gap-1 bg-white px-3 py-1 rounded shadow text-sm font-medium hover:bg-gray-50"
                >
                    Siguiente <ChevronRight className="w-4 h-4" />
                </Link>
            ) : (
                <span className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded shadow text-sm font-medium text-gray-400 cursor-not-allowed">
                    Siguiente <ChevronRight className="w-4 h-4" />
                </span>
            )}
        </div>
    );
}
