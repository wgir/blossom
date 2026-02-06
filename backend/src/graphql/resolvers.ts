import characterService from '../services/character.service';
import characterRepository from '../repositories/character.repository';

export const resolvers = {
    Query: {
        characters: async (_: any, { filter }: { filter?: any }) => {
            return characterService.searchCharacters(filter || {});
        },
        character: async (_: any, { id }: { id: number }) => {
            return characterRepository.findById(id);
        },
    },
    Character: {
        origin: (character: any) => character.origin,
        location: (character: any) => character.location,
        episodes: (character: any) => character.episodes,
    }
};
