'use client';

import { useState, useEffect } from 'react';
import { fetchGenerations, fetchPokemonByGeneration } from '@/lib/pokemon-api';
import { Header } from '@/components/header';
import { PokemonGrid } from '@/components/pokemon-grid';
import { typeColors } from '@/lib/constants';
import { Generation, Pokemon } from '@/lib/types';
import { LoadingSpinner } from '@/components/loading-spinner';

export default function GenerationPage() {
    const [generations, setGenerations] = useState<Generation[]>([]);
    const [selectedGeneration, setSelectedGeneration] = useState<string>('');
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [loading, setLoading] = useState(false);
    const types = Object.keys(typeColors);

    // Fetch generations on component mount
    useEffect(() => {
        const loadGenerations = async () => {
            const response = await fetchGenerations();
            setGenerations(response.results);
        };
        loadGenerations();
    }, []);

    // Handle generation selection
    const handleGenerationChange = async (
        e: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        const generationName = e.target.value;
        setSelectedGeneration(generationName);

        if (generationName) {
            setLoading(true);
            try {
                const pokemonList = await fetchPokemonByGeneration(
                    generationName,
                );
                setPokemons(pokemonList);
            } catch (error) {
                console.error('Error fetching Pokemon:', error);
            } finally {
                setLoading(false);
            }
        } else {
            setPokemons([]);
        }
    };

    return (
        <div className='min-h-screen bg-gradient-to-br from-purple-900 via-violet-800 to-slate-900 relative p-4 overflow-hidden'>
            {/* Animated background elements */}
            <div className='absolute inset-0'>
                <div className='absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-purple-300/10 to-transparent animate-shimmer'></div>
                <div className='absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-radial from-purple-400/20 to-transparent rounded-full animate-float opacity-60'></div>
                <div
                    className='absolute bottom-1/3 right-1/4 w-48 h-48 bg-gradient-radial from-blue-400/20 to-transparent rounded-full animate-float opacity-60'
                    style={{ animationDelay: '2s' }}
                ></div>
                <div
                    className='absolute top-1/2 right-1/2 w-32 h-32 bg-gradient-radial from-violet-300/15 to-transparent rounded-full animate-float opacity-50'
                    style={{ animationDelay: '4s' }}
                ></div>
            </div>

            <div className='max-w-7xl mx-auto relative z-10'>
                <Header
                    title='Gerações'
                    subtitle='Explore os Pokémon por geração!'
                />

                <div className='max-w-md mx-auto mb-8'>
                    <select
                        value={selectedGeneration}
                        onChange={handleGenerationChange}
                        className='w-full p-3 rounded-lg bg-white text-gray-800 border-2 border-purple-500 focus:border-purple-600 focus:outline-none transition-colors'
                    >
                        <option value=''>Selecione uma geração</option>
                        {generations.map((generation) => {
                            const generationNumber = generation.name
                                .split('-')[1]
                                .toUpperCase();
                            return (
                                <option
                                    key={generation.name}
                                    value={generation.name}
                                >
                                    Geração {generationNumber}
                                </option>
                            );
                        })}
                    </select>
                </div>

                {loading ? (
                    <LoadingSpinner />
                ) : (
                    pokemons.length > 0 && (
                        <PokemonGrid
                            pokemons={pokemons}
                            types={types}
                        />
                    )
                )}
            </div>
        </div>
    );
}
