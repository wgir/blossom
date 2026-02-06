import characterService from '../services/character.service';
import { connectDB } from '../config/database';
import logger from '../utils/logger';

const seed = async () => {
    try {
        await connectDB();
        await characterService.syncCharacters(15);
        logger.info('Data seeded successfully');
        process.exit(0);
    } catch (error) {
        logger.error('Error seeding data', error);
        process.exit(1);
    }
};

seed();
