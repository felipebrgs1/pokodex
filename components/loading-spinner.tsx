export function LoadingSpinner() {
    return (
        <div className='min-h-screen bg-gradient-to-br from-blue-50 to-purple-600 flex items-center justify-center'>
            <div className='text-center'>
                <div className='animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4'></div>
                <p className='text-white text-xl font-semibold'>
                    Carregando Pokédex...
                </p>
            </div>
        </div>
    );
}
