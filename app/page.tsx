import { fetchAllPokemons } from '@/lib/pokemon-api';
import { typeColors } from '@/lib/constants';
import { Header } from '@/components/header';
import { PokemonGrid } from '@/components/pokemon-grid';

export default async function Home() {
    // Fetch Pokemon data on the server
    const pokemons = await fetchAllPokemons();
    const types = Object.keys(typeColors);

    return (
        <div className='min-h-screen bg-gradient-to-br from-blue-400 to-purple-600 p-4'>
            <div className='max-w-7xl mx-auto'>
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
