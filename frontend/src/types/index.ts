export interface Character {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    image: string;
    origin?: Location;
    location?: Location;
    episodes?: Episode[];
}

export interface Location {
    id?: number;
    name: string;
    type?: string;
    dimension?: string;
}

export interface Episode {
    id: number;
    name: string;
    air_date: string;
    episode_code: string;
}

export interface CharacterFilters {
    name?: string;
    status?: string;
    species?: string;
}
