import { createClient } from 'redis';
import logger from '../utils/logger';
import dotenv from 'dotenv';

dotenv.config();

const redisConfig = {
    password: process.env.REDIS_PASSWORD || '123456',
    socket: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT || '6379'),
    }
};

const redisClient = createClient(redisConfig);

redisClient.on('error', (err) => logger.error('Redis Client Error', err));
redisClient.on('connect', () => logger.info('Redis Client Connected'));

export const connectRedis = async () => {
    if (!redisClient.isOpen) {
        await redisClient.connect();
    }
};

export default redisClient;
