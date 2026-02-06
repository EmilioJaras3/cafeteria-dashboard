import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function Pagination({ page, hasMore, baseUrl }: { page: number; hasMore: boolean; baseUrl: string }) {
    const prevPage = page > 1 ? page - 1 : 1;
    const nextPage = page + 1;

    return (
        <div className="flex justify-center gap-4 mt-6 items-center">
            {page > 1 ? (
                <Link
                    href={`${baseUrl}&page=${prevPage}`}
                    className="flex items-center gap-1 bg-white px-3 py-1 rounded shadow text-sm font-medium hover:bg-gray-50"
                >
                    <ChevronLeft className="w-4 h-4" /> Anterior
                </Link>
            ) : (
                <span className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded shadow text-sm font-medium text-gray-400 cursor-not-allowed">
                    <ChevronLeft className="w-4 h-4" /> Anterior
                </span>
            )}

            <span className="text-sm font-bold text-gray-600">Pag. {page}</span>

            {hasMore ? (
                <Link
                    href={`${baseUrl}&page=${nextPage}`}
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
