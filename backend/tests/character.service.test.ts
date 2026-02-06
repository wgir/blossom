import characterService from '../src/services/character.service';
import characterRepository from '../src/repositories/character.repository';
import redisClient from '../src/config/redis';
import logger from '../src/utils/logger';

jest.mock('../src/repositories/character.repository');
jest.mock('../src/config/redis', () => ({
    __esModule: true,
    default: {
        get: jest.fn(),
        setEx: jest.fn(),
        isOpen: true,
        connect: jest.fn(),
    },
    connectRedis: jest.fn(),
}));
jest.mock('../src/utils/logger');

describe('CharacterService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('searchCharacters', () => {
        it('should return cached data if available', async () => {
            const filters = { name: 'Rick' };
            const cachedCharacters = [{ id: 1, name: 'Rick Sanchez' }];
            (redisClient.get as jest.Mock).mockResolvedValue(JSON.stringify(cachedCharacters));

            const result = await characterService.searchCharacters(filters);

            expect(result).toEqual(cachedCharacters);
            expect(redisClient.get).toHaveBeenCalledWith(expect.stringContaining('Rick'));
            expect(characterRepository.findAll).not.toHaveBeenCalled();
        });

        it('should query database and cache result if no cache', async () => {
            const filters = { name: 'Morty' };
            const dbCharacters = [{ id: 2, name: 'Morty Smith' }];
            (redisClient.get as jest.Mock).mockResolvedValue(null);
            (characterRepository.findAll as jest.Mock).mockResolvedValue(dbCharacters);

            const result = await characterService.searchCharacters(filters);

            expect(result).toEqual(dbCharacters);
            expect(characterRepository.findAll).toHaveBeenCalledWith(filters);
            expect(redisClient.setEx).toHaveBeenCalled();
        });
    });
});
