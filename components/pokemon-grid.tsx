'use client';

import { useState, useMemo } from 'react';
import { Pokemon } from '@/lib/types';
import { PokemonCard } from './pokemon-card';
import { SearchBar } from './search-bar';
import { TypeFilter } from './type-filter';
import { Pagination } from './pagination';

interface PokemonGridProps {
    pokemons: Pokemon[];
    types: string[];
}

export function PokemonGrid({ pokemons, types }: PokemonGridProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const pokemonsPerPage = 60;

    // Filter pokemons based on search and type
    const filteredPokemons = useMemo(() => {
        let filtered = pokemons;

        if (searchTerm) {
            filtered = filtered.filter(
                (pokemon) =>
                    pokemon.name
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                    pokemon.id.toString().includes(searchTerm),
            );
        }

        if (selectedType) {
            filtered = filtered.filter((pokemon) =>
                pokemon.types.includes(selectedType),
            );
        }

        return filtered;
    }, [pokemons, searchTerm, selectedType]);

    // Calculate pagination
    const totalPages = Math.ceil(filteredPokemons.length / pokemonsPerPage);
    const startIndex = (currentPage - 1) * pokemonsPerPage;
    const endIndex = startIndex + pokemonsPerPage;
    const currentPokemons = filteredPokemons.slice(startIndex, endIndex);

    // Reset page when filters change
    const handleSearchChange = (value: string) => {
        setSearchTerm(value);
        setCurrentPage(1);
    };

    const handleTypeChange = (type: string) => {
        setSelectedType(type);
        setCurrentPage(1);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <>
            {/* Search and Filter Controls */}
            <div className='max-w-md mx-auto mb-6 space-y-4'>
                <SearchBar onSearchChange={handleSearchChange} />
                <TypeFilter
                    types={types}
                    onTypeChange={handleTypeChange}
                />
            </div>

            {/* Pokemon Grid */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-6'>
                {currentPokemons.map((pokemon) => (
                    <PokemonCard
                        key={pokemon.id}
                        pokemon={pokemon}
                    />
                ))}
            </div>

            {/* Pagination */}
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />

            {/* Results info */}
            <div className='text-center text-white mb-4'>
                <p className='text-sm opacity-90'>
                    Mostrando {startIndex + 1}-
                    {Math.min(endIndex, filteredPokemons.length)} de{' '}
                    {filteredPokemons.length} Pokémon
                </p>
            </div>

            {/* No results message */}
            {filteredPokemons.length === 0 && (
                <div className='text-center py-8'>
                    <p className='text-white text-lg'>
                        Nenhum Pokémon encontrado
                    </p>
                </div>
            )}
        </>
    );
}
