import Location from '../models/location.model';

export class LocationRepository {
    async findAll(): Promise<Location[]> {
        return Location.findAll();
    }
    async findOrCreate(data: Partial<Location>): Promise<Location> {
        const [location] = await Location.findOrCreate({
            where: { name: data.name },
            defaults: data,
        });
        return location;
    }

    async findById(id: number): Promise<Location | null> {
        return Location.findByPk(id);
    }
}

export default new LocationRepository();
