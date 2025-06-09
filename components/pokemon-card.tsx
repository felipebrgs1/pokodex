'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Pokemon } from '@/lib/types';
import { TypeBadge } from './type-badge';
import { PokemonDetail } from './pokemon-detail';

interface PokemonCardProps {
    pokemon: Pokemon;
}

export function PokemonCard({ pokemon }: PokemonCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div
            className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl ${
                isExpanded ? 'ring-2 ring-blue-300' : ''
            }`}
        >
            {/* Pokemon Card Header */}
            <div
                className={`p-4 cursor-pointer transition-colors ${
                    isExpanded ? 'bg-blue-50' : ''
                }`}
                onClick={toggleExpand}
            >
                {' '}
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
                    <div className='text-gray-400'>
                        {isExpanded ? '▲' : '▼'}
                    </div>
                </div>
            </div>

            {/* Expanded Details */}
            {isExpanded && <PokemonDetail pokemon={pokemon} />}
        </div>
    );
}
