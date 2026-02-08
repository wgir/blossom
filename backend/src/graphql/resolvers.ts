import characterService from '../services/character.service';
import characterRepository from '../repositories/character.repository';
import locationRepository from '../repositories/location.repository';
import episodeRepository from '../repositories/episode.repository';

export const resolvers = {
    Query: {
        characters: async (_: any, { filter }: { filter?: any }) => {
            return characterService.searchCharacters(filter || {});
        },
        character: async (_: any, { id }: { id: number }) => {
            return characterRepository.findById(id);
        },
        locations: async () => {
            return locationRepository.findAll();
        },
        location: async (_: any, { id }: { id: number }) => {
            return locationRepository.findById(id);
        },
        episodes: async () => {
            return episodeRepository.findAll();
        },
        episode: async (_: any, { id }: { id: number }) => {
            return episodeRepository.findById(id);
        },
    },
    Mutation: {
        updateCharacterStatus: async (_: any, { characterId, status }: { characterId: number, status: boolean }) => {
            return characterService.updateCharacterStatus(characterId, status);
        },
    },
    Character: {
        origin: (character: any) => character.origin,
        location: (character: any) => character.location,
        episodes: (character: any) => character.episodes,
    }
};
