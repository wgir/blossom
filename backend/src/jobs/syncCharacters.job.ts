import cron from 'node-cron';
import characterService from '../services/character.service';
import logger from '../utils/logger';

export const initSyncJob = () => {
    // Run every 12 hours
    cron.schedule('0 */12 * * *', async () => {
        logger.info('Running scheduled character sync...');
        try {
            await characterService.syncCharacters(15);
            logger.info('Scheduled sync completed successfully');
        } catch (error) {
            logger.error('Scheduled sync failed', error);
        }
    });

    logger.info('Character sync job scheduled (every 12 hours)');
};
