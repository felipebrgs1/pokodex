'use server';

import { Pokemon, PokemonListResponse, PokemonDetailResponse, GenerationResponse } from './types';
import { withRetry, batchRequests } from './utils';

const API_BASE_URL = 'https://pokeapi.co/api/v2';

export async function fetchPokemonList(limit: number = 151): Promise<PokemonListResponse> {
    return withRetry(async () => {
        const response = await fetch(`${API_BASE_URL}/pokemon?limit=${limit}`, {
            next: { revalidate: 3600 } // Cache for 1 hour
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch Pokemon list: ${response.status}`);
        }

        return response.json();
    });
}

export async function fetchPokemonDetail(url: string): Promise<PokemonDetailResponse> {
    return withRetry(async () => {
        const response = await fetch(url, {
            next: { revalidate: 3600 } // Cache for 1 hour
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch Pokemon detail: ${response.status}`);
        }

        return response.json();
    });
}

async function processPokemonBatch(pokemonBatch: Array<{ name: string; url: string }>): Promise<Pokemon[]> {
    const pokemonDetails = await Promise.all(
        pokemonBatch.map(async (pokemon) => {
            const detail = await fetchPokemonDetail(pokemon.url);

            return {
                id: detail.id,
                name: detail.name,
                url: pokemon.url,
                image: detail.sprites.other['official-artwork'].front_default || detail.sprites.front_default,
                types: detail.types.map((type) => type.type.name),
                height: detail.height,
                weight: detail.weight,
                stats: {
                    hp: detail.stats[0].base_stat,
                    attack: detail.stats[1].base_stat,
                    defense: detail.stats[2].base_stat,
                    speed: detail.stats[5].base_stat,
                },
            };
        })
    );

    return pokemonDetails;
}

export async function fetchAllPokemons(): Promise<Pokemon[]> {
    try {
        const pokemonList = await fetchPokemonList();
        const pokemonDetails = await batchRequests(
            pokemonList.results,
            10,
            processPokemonBatch
        );

        return pokemonDetails.sort((a, b) => a.id - b.id);
    } catch (error) {
        console.error('Error fetching Pokemon data:', error);
        throw new Error('Failed to load Pokemon data. Please try again later.');
    }
}

export async function fetchGenerations(): Promise<GenerationResponse> {
    return withRetry(async () => {
        const response = await fetch(`${API_BASE_URL}/generation`, {
            next: { revalidate: 3600 } // Cache for 1 hour
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch generations: ${response.status}`);
        }

        return response.json();
    });
}

export async function fetchPokemonByGeneration(generationName: string): Promise<Pokemon[]> {
    return withRetry(async () => {
        const response = await fetch(`${API_BASE_URL}/generation/${generationName}`, {
            next: { revalidate: 3600 }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch generation: ${response.status}`);
        }

        const data = await response.json();
        const pokemonSpecies = data.pokemon_species;

        // Process Pokemon in smaller batches of 100
        const batchSize = 100;
        const batches = [];

        for (let i = 0; i < pokemonSpecies.length; i += batchSize) {
            const batch = pokemonSpecies.slice(i, i + batchSize).map((species: { name: string }) => ({
                name: species.name,
                url: `${API_BASE_URL}/pokemon/${species.name}`
            }));
            batches.push(batch);
        }

        const allPokemon = [];
        for (const batch of batches) {
            const pokemonDetails = await batchRequests(batch, 10, processPokemonBatch);
            allPokemon.push(...pokemonDetails);
        }

        return allPokemon.sort((a, b) => a.id - b.id);
    });
}
