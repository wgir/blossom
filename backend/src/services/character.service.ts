import { Character, Location, Episode } from '../models';
import characterRepository, { CharacterFilters } from '../repositories/character.repository';
import locationRepository from '../repositories/location.repository';
import episodeRepository from '../repositories/episode.repository';
import rickAndMortyAdapter, { Character as ExternalCharacter } from '../adapters/rickAndMorty.adapter';
import redisClient, { connectRedis } from '../config/redis';
import logger from '../utils/logger';

const CACHE_TTL = 3600 * 8; // 8 hours (between 6-12 requirement)
const CACHE_KEY_CHARACTERS_PATTERN = 'characters:*';

export class CharacterService {
    async searchCharacters(filters: CharacterFilters) {
        const cacheKey = `characters:${JSON.stringify(filters)}`;

        try {
            await connectRedis();
            const cachedData = await redisClient.get(cacheKey);
            if (cachedData) {
                logger.info('Cache hit for characters search');
                return JSON.parse(cachedData);
            }
        } catch (error) {
            logger.warn('Redis error, falling back to database', error);
        }

        logger.info('Cache miss for characters search, querying database');
        const characters = await characterRepository.findAll(filters);

        try {
            if (redisClient.isOpen) {
                await redisClient.setEx(cacheKey, CACHE_TTL, JSON.stringify(characters));
            }
        } catch (error) {
            logger.error('Error caching data in Redis', error);
        }

        return characters;
    }

    async syncCharacters(count: number = 15) {
        logger.info(`Starting sync for ${count} characters...`);
        const externalCharacters = await rickAndMortyAdapter.getFirstCharacters(count);

        for (const char of externalCharacters) {
            await this.saveCharacter(char);
            await new Promise(resolve => setTimeout(resolve, 500)); // Delay between characters
        }

        // Invalidate all character caches
        try {
            await connectRedis();
            const keys = await redisClient.keys(CACHE_KEY_CHARACTERS_PATTERN);
            if (keys.length > 0) {
                await redisClient.del(keys);
            }
        } catch (error) {
            logger.error('Error clearing cache after sync', error);
        }

        logger.info('Sync completed');
    }

    async saveCharacter(externalChar: ExternalCharacter) {
        // Process locations
        let originId: number | undefined;
        let locationId: number | undefined;

        if (externalChar.origin.url) {
            const extOrigin = await rickAndMortyAdapter.getLocationByUrl(externalChar.origin.url);
            if (extOrigin) {
                const origin = await locationRepository.findOrCreate({
                    name: extOrigin.name,
                    type: extOrigin.type,
                    dimension: extOrigin.dimension,
                });
                originId = origin.id;
            }
        }

        if (externalChar.location.url) {
            const extLoc = await rickAndMortyAdapter.getLocationByUrl(externalChar.location.url);
            if (extLoc) {
                const location = await locationRepository.findOrCreate({
                    name: extLoc.name,
                    type: extLoc.type,
                    dimension: extLoc.dimension,
                });
                locationId = location.id;
            }
        }

        // Process character
        const character = await characterRepository.upsert({
            id: externalChar.id,
            name: externalChar.name,
            status: externalChar.status,
            species: externalChar.species,
            type: externalChar.type,
            gender: externalChar.gender,
            image: externalChar.image,
            originId,
            locationId,
            created: new Date(externalChar.created),
        });

        // Process episodes
        const episodeIds: number[] = [];
        for (const episodeUrl of externalChar.episode) {
            const extEp = await rickAndMortyAdapter.getEpisodeByUrl(episodeUrl);
            if (extEp) {
                const episode = await episodeRepository.findOrCreate({
                    name: extEp.name,
                    airDate: extEp.air_date,
                    episodeCode: extEp.episode,
                });
                episodeIds.push(episode.id);
            }
        }

        if (episodeIds.length > 0) {
            await (character as any).setEpisodes(episodeIds);
        }

        return character;
    }
    async updateCharacterStatus(id: number, active: boolean) {
        const character = await characterRepository.update(id, { active } as any);

        try {
            if (redisClient.isOpen) {
                const keys = await redisClient.keys(CACHE_KEY_CHARACTERS_PATTERN);
                if (keys.length > 0) {
                    await redisClient.del(keys);
                }
            }
        } catch (error) {
            logger.error('Error clearing cache after status update', error);
        }

        return character;
    }
}

export default new CharacterService();
