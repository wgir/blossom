import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import logger from '../utils/logger';

dotenv.config();

const databaseUrl = process.env.DATABASE_URL || 'postgres://postgres:password@localhost:5432/blossom';

const sequelize = new Sequelize(databaseUrl, {
    dialect: 'postgres',
    logging: (msg) => logger.debug(msg),
    define: {
        timestamps: true,
        underscored: true,
    },
});

export const connectDB = async () => {
    try {
        await sequelize.authenticate();
        logger.info('Database connection has been established successfully.');
    } catch (error) {
        logger.error('Unable to connect to the database:', error);
        process.exit(1);
    }
};

export default sequelize;
