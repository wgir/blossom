# Rick and Morty Blossom - Docker Setup

This project is containerized using Docker and Docker Compose. It includes the backend (Express + GraphQL), frontend (Vite + React), PostgreSQL, and Redis.

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Quick Start

1. **Clone the repository** (if you haven't already):
   ```bash
   git clone <repository-url>
   cd blossom
   ```

2. **Run with Docker Compose**:
   ```bash
   docker-compose up --build
   ```

3. **Database Migration & Seeding**:
   Once the containers are running, you must run the migrations and then you can seed the data:
   ```bash
   # Run migrations
   docker-compose exec backend npm run migrate
   
   # Run seed (Sync characters from Rick and Morty API)
   docker-compose exec backend npm run seed
   ```

4. **Access the Applications**:
   - **Frontend**: [http://localhost:3100](http://localhost:3100)
   - **Backend (GraphQL Explorer)**: [http://localhost:3000/graphql](http://localhost:3000/graphql)

## Architecture

- **Frontend**: Vite + React app served by Nginx.
- **Backend**: Express + Apollo Server + Sequelize.
- **Database**: PostgreSQL 15.
- **Cache**: Redis.

## Environment Variables

The default configuration is set in the `docker-compose.yml` file. You can override them by creating a `.env` file in the root directory.

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Backend Port | `3000` |
| `DATABASE_URL` | PostgreSQL Connection URL | `postgres://root:secret@postgres:5432/blossom` |
| `REDIS_HOST` | Redis Host | `redis` |
| `REDIS_PORT` | Redis Port | `6379` |
| `REDIS_PASSWORD`| Redis Password | `123456` |
