'use client';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export function Pagination({
    currentPage,
    totalPages,
    onPageChange,
}: PaginationProps) {
    if (totalPages <= 1) return null;

    const getVisiblePages = () => {
        const maxVisible = 5;

        if (totalPages <= maxVisible) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }

        if (currentPage <= 3) {
            return Array.from({ length: maxVisible }, (_, i) => i + 1);
        }

        if (currentPage >= totalPages - 2) {
            return Array.from(
                { length: maxVisible },
                (_, i) => totalPages - maxVisible + 1 + i,
            );
        }

        return Array.from(
            { length: maxVisible },
            (_, i) => currentPage - 2 + i,
        );
    };

    const visiblePages = getVisiblePages();

    return (
        <div className='flex justify-center items-center space-x-2 mb-6'>
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className='px-4 py-2 rounded-lg bg-white text-blue-600 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-50 transition-colors'
            >
                Anterior
            </button>

            <div className='flex space-x-1'>
                {visiblePages.map((page) => (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        className={`px-3 py-2 rounded-lg shadow-lg transition-colors ${
                            currentPage === page
                                ? 'bg-blue-600 text-white'
                                : 'bg-white text-blue-600 hover:bg-blue-50'
                        }`}
                    >
                        {page}
                    </button>
                ))}
            </div>

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className='px-4 py-2 rounded-lg bg-white text-blue-600 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-50 transition-colors'
            >
                Próximo
            </button>
        </div>
    );
}
