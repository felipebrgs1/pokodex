'use client';

import Image from 'next/image';
import { Pokemon } from '@/lib/types';
import { TypeBadge } from './type-badge';

interface PokemonCardProps {
    pokemon: Pokemon;
    onClick?: () => void;
}

export function PokemonCard({ pokemon, onClick }: PokemonCardProps) {
    return (
        <div
            className='bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer'
            onClick={onClick}
        >
            <div className='p-4'>
                <div className='flex items-center space-x-4'>
                    <Image
                        src={pokemon.image}
                        alt={pokemon.name}
                        width={80}
                        height={80}
                        className='w-16 h-16 md:w-20 md:h-20 object-contain'
                    />
                    <div className='flex-1'>
                        <div className='flex items-center justify-between mb-2'>
                            <h3 className='text-lg md:text-xl font-bold text-gray-800 capitalize'>
                                {pokemon.name}
                            </h3>
                            <span className='text-gray-500 font-semibold text-sm'>
                                #{pokemon.id.toString().padStart(3, '0')}
                            </span>
                        </div>
                        <div className='flex flex-wrap gap-1'>
                            {pokemon.types.map((type) => (
                                <TypeBadge
                                    key={type}
                                    type={type}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
