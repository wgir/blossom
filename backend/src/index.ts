import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { rateLimit } from 'express-rate-limit';
import dotenv from 'dotenv';
import { typeDefs } from './graphql/schema';
import { resolvers } from './graphql/resolvers';
import { connectDB } from './config/database';
import { connectRedis } from './config/redis';
import { requestLogger } from './middleware/logging.middleware';
import { initSyncJob } from './jobs/syncCharacters.job';
import logger from './utils/logger';

dotenv.config();

const startServer = async () => {
    const app = express();
    const PORT = process.env.PORT || 3000;

    // Middlewares
    app.use(helmet({ contentSecurityPolicy: false })); // Disable CSP for GraphQL Playground
    app.use(cors());
    app.use(compression());
    app.use(express.json());
    app.use(requestLogger);

    // Rate limiting
    const limiter = rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
        standardHeaders: 'draft-7',
        legacyHeaders: false,
    });
    app.use(limiter);

    // Apollo Server
    const server = new ApolloServer({
        typeDefs,
        resolvers,
    });

    await server.start();

    app.use('/graphql', expressMiddleware(server) as any);

    // Health check
    app.get('/health', (req, res) => {
        res.status(200).json({ status: 'OK' });
    });

    // Connect to DB and Redis
    await connectDB();
    await connectRedis();

    // Initialize Jobs
    initSyncJob();

    app.listen(PORT, () => {
        logger.info(`Server running at http://localhost:${PORT}/graphql`);
    });
};

startServer().catch((error) => {
    logger.error('Failed to start server', error);
    process.exit(1);
});
