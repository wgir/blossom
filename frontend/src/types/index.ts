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

// Pure API filters (what the backend accepts)
export interface CharacterFilters {
    name?: string;
    species?: string;
    gender?: string;
    // status is technically supported by API but we use it for "Starred" in UI
    status?: string;
}

// UI State for the list view
export interface CharacterListState {
    filter: CharacterFilters;
    view: 'All' | 'Starred' | 'Others';
}
