import Episode from '../models/episode.model';

export class EpisodeRepository {
    async findAll(): Promise<Episode[]> {
        return Episode.findAll();
    }
    async findOrCreate(data: Partial<Episode>): Promise<Episode> {
        const [episode] = await Episode.findOrCreate({
            where: { name: data.name },
            defaults: data,
        });
        return episode;
    }

    async findById(id: number): Promise<Episode | null> {
        return Episode.findByPk(id);
    }
}

export default new EpisodeRepository();
