'use client';

interface ErrorProps {
    error: Error & { digest?: string };
    reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
    return (
        <div className='min-h-screen bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center p-4'>
            <div className='bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center'>
                <div className='mb-4'>
                    <h2 className='text-2xl font-bold text-gray-800 mb-2'>
                        Ops! Algo deu errado
                    </h2>
                    <p className='text-gray-600'>
                        Não foi possível carregar a Pokédex
                    </p>
                </div>

                <div className='mb-6'>
                    <p className='text-sm text-red-600 bg-red-50 p-3 rounded-lg'>
                        {error.message || 'Erro desconhecido'}
                    </p>
                </div>

                <button
                    onClick={reset}
                    className='w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold'
                >
                    Tentar novamente
                </button>
            </div>
        </div>
    );
}
