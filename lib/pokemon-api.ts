import { Pokemon, PokemonListResponse, PokemonDetailResponse } from './types';
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
        
        // Process Pokemon in batches to avoid overwhelming the API
        const pokemonDetails = await batchRequests(
            pokemonList.results,
            10, // Process 10 Pokemon at a time
            processPokemonBatch
        );
        
        // Sort by ID to ensure consistent order
        return pokemonDetails.sort((a, b) => a.id - b.id);
    } catch (error) {
        console.error('Error fetching Pokemon data:', error);
        throw new Error('Failed to load Pokemon data. Please try again later.');
    }
}
