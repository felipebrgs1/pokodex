import { Pokemon } from '@/lib/types';
import { TypeBadge } from './type-badge';
import { StatBar } from './stat-bar';

interface PokemonDetailProps {
    pokemon: Pokemon;
}

export function PokemonDetail({ pokemon }: PokemonDetailProps) {
    return (
        <div className='border-t bg-gray-50 p-4 space-y-4'>
            {/* Physical Stats */}
            <div className='grid grid-cols-2 gap-4'>
                <div className='text-center'>
                    <p className='text-sm text-gray-600'>Altura</p>
                    <p className='text-lg font-semibold'>
                        {pokemon.height / 10}m
                    </p>
                </div>
                <div className='text-center'>
                    <p className='text-sm text-gray-600'>Peso</p>
                    <p className='text-lg font-semibold'>
                        {pokemon.weight / 10}kg
                    </p>
                </div>
            </div>

            {/* Stats */}
            <div className='space-y-2'>
                <h4 className='font-semibold text-gray-800 mb-3'>
                    Estatísticas Base
                </h4>

                <div className='space-y-2'>
                    <StatBar
                        label='HP'
                        value={pokemon.stats.hp}
                        color='bg-green-500'
                    />
                    <StatBar
                        label='Ataque'
                        value={pokemon.stats.attack}
                        color='bg-red-500'
                    />
                    <StatBar
                        label='Defesa'
                        value={pokemon.stats.defense}
                        color='bg-blue-500'
                    />
                    <StatBar
                        label='Velocidade'
                        value={pokemon.stats.speed}
                        color='bg-yellow-500'
                    />
                </div>
            </div>
        </div>
    );
}
