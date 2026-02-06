# Rick and Morty Backend API

Express.js backend with GraphQL, Sequelize (PostgreSQL), and Redis caching.

## Features
- **GraphQL API**: Search characters with combinable filters (name, status, species, gender, origin).
- **Layered Architecture**: Controller (Resolvers) -> Service -> Repository.
- **Caching**: Redis implementation for character search results (TTL: 8 hours).
- **External Integration**: Adapter pattern for the Rick and Morty Public API.
- **Performance Monitoring**: TypeScript decorator for measuring database query execution time.
- **Logging**: Custom Winston logger and request logging middleware.
- **Scheduled Jobs**: Cron job every 12 hours to sync characters.
- **Migrations**: Sequelize migrations for database schema.

## Prerequisites
- Node.js (v18+)
- PostgreSQL
- Redis (Port: 6379, Password: 123456)

## Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure environment**:
   Create a `.env` file based on the requirements:
   ```env
   PORT=3000
   DATABASE_URL=postgres://postgres:password@localhost:5432/blossom
   REDIS_HOST=localhost
   REDIS_PORT=6379
   REDIS_PASSWORD=123456
   NODE_ENV=development
   ```

3. **Run Migrations**:
   ```bash
   npm run migrate
   ```

4. **Seed initially**:
   ```bash
   npm run seed
   ```

5. **Start the server**:
   ```bash
   npm run dev
   ```

## API Usage
Access GraphQL at `http://localhost:3000/graphql`.

Example Query:
```graphql
query {
  characters(filter: { name: "Rick", status: "Alive" }) {
    id
    name
    status
    species
    origin {
      name
    }
    episodes {
      name
      episode_code
    }
  }
}
```

## Testing
```bash
npm test
```
