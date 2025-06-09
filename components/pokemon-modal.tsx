'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { Pokemon } from '@/lib/types';
import { TypeBadge } from './type-badge';
import { StatBar } from './stat-bar';

interface PokemonModalProps {
    pokemon: Pokemon | null;
    isOpen: boolean;
    onClose: () => void;
}

export function PokemonModal({ pokemon, isOpen, onClose }: PokemonModalProps) {
    // Handle ESC key to close modal
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEsc);
            // Prevent body scroll when modal is open
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen || !pokemon) {
        return null;
    }

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
            {/* Backdrop */}
            <div
                className='absolute inset-0 backdrop-blur-sm bg-opacity-50 '
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className='relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto'>
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className='absolute top-4 right-4 z-10 bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors'
                >
                    <svg
                        className='w-6 h-6 text-gray-600'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                    >
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M6 18L18 6M6 6l12 12'
                        />
                    </svg>
                </button>

                {/* Pokemon Header */}
                <div className='p-6 pb-4'>
                    <div className='flex items-center space-x-6'>
                        <Image
                            src={pokemon.image}
                            alt={pokemon.name}
                            width={120}
                            height={120}
                            className='w-24 h-24 md:w-30 md:h-30 object-contain'
                        />
                        <div className='flex-1'>
                            <div className='flex items-center justify-between mb-3'>
                                <h2 className='text-2xl md:text-3xl font-bold text-gray-800 capitalize'>
                                    {pokemon.name}
                                </h2>
                                <span className='text-gray-500 font-semibold text-lg'>
                                    #{pokemon.id.toString().padStart(3, '0')}
                                </span>
                            </div>
                            <div className='flex flex-wrap gap-2'>
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

                {/* Pokemon Details */}
                <div className='px-6 pb-6'>
                    {/* Physical Stats */}
                    <div className='grid grid-cols-2 gap-4 mb-6'>
                        <div className='text-center'>
                            <p className='text-gray-600 text-sm font-medium'>
                                Altura
                            </p>
                            <p className='text-xl font-bold text-gray-800'>
                                {(pokemon.height / 10).toFixed(1)}m
                            </p>
                        </div>
                        <div className='text-center'>
                            <p className='text-gray-600 text-sm font-medium'>
                                Peso
                            </p>
                            <p className='text-xl font-bold text-gray-800'>
                                {(pokemon.weight / 10).toFixed(1)}kg
                            </p>
                        </div>
                    </div>

                    {/* Base Stats */}
                    <div>
                        <h3 className='text-lg font-semibold text-gray-800 mb-4'>
                            Estatísticas Base
                        </h3>
                        <div className='space-y-3'>
                            <StatBar
                                label='HP'
                                value={pokemon.stats.hp}
                                maxValue={255}
                                color='bg-green-500'
                            />
                            <StatBar
                                label='Ataque'
                                value={pokemon.stats.attack}
                                maxValue={255}
                                color='bg-red-500'
                            />
                            <StatBar
                                label='Defesa'
                                value={pokemon.stats.defense}
                                maxValue={255}
                                color='bg-blue-500'
                            />
                            <StatBar
                                label='Velocidade'
                                value={pokemon.stats.speed}
                                maxValue={255}
                                color='bg-yellow-500'
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
