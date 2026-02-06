import { Character, Location, Episode } from '../models';
import { Op } from 'sequelize';
import { MonitorPerformance } from '../utils/performance.decorator';

export interface CharacterFilters {
    name?: string;
    status?: string;
    species?: string;
    gender?: string;
    origin?: string;
}

export class CharacterRepository {
    @MonitorPerformance()
    async findAll(filters: CharacterFilters = {}): Promise<Character[]> {
        const where: any = {};
        if (filters.name) where.name = { [Op.iLike]: `%${filters.name}%` };
        if (filters.status) where.status = filters.status;
        if (filters.species) where.species = { [Op.iLike]: `%${filters.species}%` };
        if (filters.gender) where.gender = filters.gender;

        const include: any[] = [
            { model: Location, as: 'origin' },
            { model: Location, as: 'location' },
            { model: Episode, as: 'episodes' },
        ];

        if (filters.origin) {
            include[0].where = { name: { [Op.iLike]: `%${filters.origin}%` } };
        }

        return Character.findAll({
            where,
            include,
        });
    }

    async findById(id: number): Promise<Character | null> {
        return Character.findByPk(id, {
            include: [
                { model: Location, as: 'origin' },
                { model: Location, as: 'location' },
                { model: Episode, as: 'episodes' },
            ],
        });
    }

    async upsert(data: any): Promise<Character> {
        await Character.upsert(data);
        const character = await Character.findByPk(data.id, {
            include: [
                { model: Location, as: 'origin' },
                { model: Location, as: 'location' },
                { model: Episode, as: 'episodes' },
            ],
        });
        if (!character) throw new Error(`Failed to retrieve character with id ${data.id} after upsert`);
        return character;
    }
}

export default new CharacterRepository();
