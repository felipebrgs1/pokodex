import { fetchAllPokemons } from '@/lib/pokemon-api';
import { typeColors } from '@/lib/constants';
import { Header } from '@/components/header';
import { PokemonGrid } from '@/components/pokemon-grid';

export default async function Home() {
    // Fetch Pokemon data on the server
    const pokemons = await fetchAllPokemons();
    const types = Object.keys(typeColors);
    return (
        <div className='min-h-screen bg-gradient-to-br from-purple-900 via-violet-800 to-slate-900 relative p-4 overflow-hidden'>
            {/* Animated background elements */}
            <div className='absolute inset-0'>
                <div className='absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-purple-300/10 to-transparent animate-shimmer'></div>
                <div className='absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-radial from-purple-400/20 to-transparent rounded-full animate-float opacity-60'></div>{' '}
                <div
                    className='absolute bottom-1/3 right-1/4 w-48 h-48 bg-gradient-radial from-blue-400/20 to-transparent rounded-full animate-float opacity-60'
                    style={{ animationDelay: '2s' }}
                ></div>
                <div
                    className='absolute top-1/2 right-1/2 w-32 h-32 bg-gradient-radial from-violet-300/15 to-transparent rounded-full animate-float opacity-50'
                    style={{ animationDelay: '4s' }}
                ></div>
            </div>

            {/* Pokéball pattern overlay */}
            <div className='absolute inset-0 opacity-5'>
                <div className='absolute top-10 left-10 w-32 h-32 rounded-full border-8 border-white transform rotate-12'></div>
                <div className='absolute top-32 right-20 w-24 h-24 rounded-full border-6 border-white transform -rotate-12'></div>
                <div className='absolute bottom-20 left-1/4 w-28 h-28 rounded-full border-7 border-white transform rotate-45'></div>
                <div className='absolute bottom-32 right-1/3 w-20 h-20 rounded-full border-5 border-white transform -rotate-30'></div>
            </div>

            <div className='max-w-7xl mx-auto relative z-10'>
                <Header
                    title='Pokédex'
                    subtitle='Descubra todos os Pokémon!'
                />

                <PokemonGrid
                    pokemons={pokemons}
                    types={types}
                />
            </div>
        </div>
    );
}
