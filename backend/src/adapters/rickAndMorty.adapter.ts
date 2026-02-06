import axios from 'axios';
import logger from '../utils/logger';

const API_BASE_URL = 'https://rickandmortyapi.com/api';

export interface Character {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: {
        name: string;
        url: string;
    };
    location: {
        name: string;
        url: string;
    };
    image: string;
    episode: string[];
    url: string;
    created: string;
}

export interface Location {
    id: number;
    name: string;
    type: string;
    dimension: string;
    residents: string[];
    url: string;
    created: string;
}

export interface Episode {
    id: number;
    name: string;
    air_date: string;
    episode: string;
    characters: string[];
    url: string;
    created: string;
}

export class RickAndMortyAdapter {
    async getCharacters(ids?: number[]): Promise<Character[]> {
        const url = ids ? `${API_BASE_URL}/character/${ids.join(',')}` : `${API_BASE_URL}/character`;
        try {
            const response = await axios.get(url);
            return Array.isArray(response.data) ? response.data : [response.data];
        } catch (error) {
            logger.error('Error fetching characters from Rick and Morty API', error);
            throw error;
        }
    }

    private locationCache = new Map<string, Location>();
    private episodeCache = new Map<string, Episode>();

    private async delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async getLocationByUrl(url: string): Promise<Location | null> {
        if (!url) return null;
        if (this.locationCache.has(url)) return this.locationCache.get(url)!;

        try {
            await this.delay(100); // Small delay to avoid 429
            const response = await axios.get(url);
            this.locationCache.set(url, response.data);
            return response.data;
        } catch (error: any) {
            if (error.response?.status === 429) {
                logger.warn(`Rate limit hit fetching location: ${url}, retrying once...`);
                await this.delay(2000);
                return this.getLocationByUrl(url);
            }
            logger.error(`Error fetching location from URL: ${url}`, error);
            return null;
        }
    }

    async getEpisodeByUrl(url: string): Promise<Episode | null> {
        if (!url) return null;
        if (this.episodeCache.has(url)) return this.episodeCache.get(url)!;

        try {
            await this.delay(100); // Small delay to avoid 429
            const response = await axios.get(url);
            this.episodeCache.set(url, response.data);
            return response.data;
        } catch (error: any) {
            if (error.response?.status === 429) {
                logger.warn(`Rate limit hit fetching episode: ${url}, retrying once...`);
                await this.delay(2000);
                return this.getEpisodeByUrl(url);
            }
            logger.error(`Error fetching episode from URL: ${url}`, error);
            return null;
        }
    }

    // To fetch first 15 characters from the first page
    async getFirstCharacters(count: number = 15): Promise<Character[]> {
        try {
            const response = await axios.get(`${API_BASE_URL}/character`);
            return response.data.results.slice(0, count);
        } catch (error) {
            logger.error('Error fetching first page characters', error);
            throw error;
        }
    }
}

export default new RickAndMortyAdapter();
