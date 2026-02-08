import characterService from '../../src/services/character.service';
import characterRepository from '../../src/repositories/character.repository';
import redisClient from '../../src/config/redis';
import logger from '../../src/utils/logger';

jest.mock('../../src/repositories/character.repository');
jest.mock('../../src/config/redis', () => ({
    __esModule: true,
    default: {
        get: jest.fn(),
        setEx: jest.fn(),
        isOpen: true,
        connect: jest.fn(),
        keys: jest.fn(),
        del: jest.fn(),
    },
    connectRedis: jest.fn(),
}));
jest.mock('../../src/utils/logger');

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

        it('should pass active filter to repository', async () => {
            const filters = { active: true };
            const activeCharacters = [{ id: 1, name: 'Rick', active: true }];

            (redisClient.get as jest.Mock).mockResolvedValue(null);
            (characterRepository.findAll as jest.Mock).mockResolvedValue(activeCharacters);

            const result = await characterService.searchCharacters(filters);

            expect(result).toEqual(activeCharacters);
            expect(characterRepository.findAll).toHaveBeenCalledWith(filters);
        });
    });

    describe('updateCharacterStatus', () => {
        it('should update character status and clear cache', async () => {
            const characterId = 1;
            const newStatus = false;
            const updatedCharacter = { id: characterId, active: newStatus };

            (characterRepository.update as jest.Mock).mockResolvedValue(updatedCharacter);
            (redisClient.keys as jest.Mock).mockResolvedValue(['characters:search:1']);

            const result = await characterService.updateCharacterStatus(characterId, newStatus);

            expect(result).toEqual(updatedCharacter);
            expect(characterRepository.update).toHaveBeenCalledWith(characterId, { active: newStatus });
            expect(redisClient.keys).toHaveBeenCalledWith('characters:*');
            expect(redisClient.del).toHaveBeenCalled();
        });
    });
});
