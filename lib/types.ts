// Types for Pokemon data
export interface Pokemon {
    id: number;
    name: string;
    url: string;
    image: string;
    types: string[];
    height: number;
    weight: number;
    stats: {
        hp: number;
        attack: number;
        defense: number;
        speed: number;
    };
}

export interface PokemonListResponse {
    results: {
        name: string;
        url: string;
    }[];
    count: number;
    next: string | null;
    previous: string | null;
}

export interface PokemonDetailResponse {
    id: number;
    name: string;
    height: number;
    weight: number;
    types: {
        type: {
            name: string;
        };
    }[];
    sprites: {
        front_default: string;
        other: {
            'official-artwork': {
                front_default: string;
            };
        };
    };
    stats: {
        base_stat: number;
        stat: {
            name: string;
        };
    }[];
}
