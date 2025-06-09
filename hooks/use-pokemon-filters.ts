'use client';

import { useState, useMemo } from 'react';
import { Pokemon } from '@/lib/types';

interface UsePokemonFiltersProps {
    pokemons: Pokemon[];
    pokemonsPerPage?: number;
}

export function usePokemonFilters({ pokemons, pokemonsPerPage = 60 }: UsePokemonFiltersProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    // Filter pokemons based on search and type
    const filteredPokemons = useMemo(() => {
        let filtered = pokemons;

        if (searchTerm) {
            filtered = filtered.filter(
                (pokemon) =>
                    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    pokemon.id.toString().includes(searchTerm)
            );
        }

        if (selectedType) {
            filtered = filtered.filter((pokemon) =>
                pokemon.types.includes(selectedType)
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

    return {
        searchTerm,
        selectedType,
        currentPage,
        filteredPokemons,
        currentPokemons,
        totalPages,
        startIndex,
        endIndex,
        handleSearchChange,
        handleTypeChange,
        handlePageChange,
    };
}
