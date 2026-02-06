# Backend Requirements

## 1. Technology Stack
- Node.js with **Express** as the HTTP server
- **GraphQL** as the API query layer
- **TypeScript** for project development
- **Sequelize ORM** with a relational database: PostgreSQL
- **Redis** for caching is locally in port 6379 with password "123456"

---

## 2. GraphQL API
- Implement a GraphQL API to search for characters from the **Rick and Morty** universe. First backend must fill the local database with 15 characters from the public API: https://rickandmortyapi.com/ and then the API must make queries to local database. The API must be accessible at `http://localhost:3000/graphql`.  

### GraphQL Queries
- Implement a `characters` query with optional filters:
  - `name`
  - `status` (Alive, Dead, Unknown)
  - `species`
  - `gender`
  - `origin`
  - `image`

- Filters must be **combinable**.
- Query results must be retrieved:
  - From **Redis cache** when available
  - Otherwise from the **relational database**, then cached

---

## 3. Database Layer
- Configure Sequelize using **migrations** (avoid `sync()` in production).
### 3.1 characters
Stores information about Rick and Morty characters.
| Field | Type | Description |
|-----|-----|-------------|
| id | INTEGER | Primary key (matches API character ID) |
| name | VARCHAR(255) | Character name |
| status | VARCHAR(50) | Alive, Dead, or Unknown |
| species | VARCHAR(100) | Character species |
| type | VARCHAR(100) | Character subtype (optional) |
| gender | VARCHAR(50) | Gender |
| image | TEXT | Image URL |
| origin_id | INTEGER | Foreign key to `locations.id` (origin location) |
| location_id | INTEGER | Foreign key to `locations.id` (current location) |
| created | TIMESTAMP | Record creation timestamp |

---

### 3.2 locations
Stores character origin and current locations.

| Field | Type | Description |
|-----|-----|-------------|
| id | INTEGER | Primary key |
| name | VARCHAR(255) | Location name |
| type | VARCHAR(100) | Planet, Space station, etc. |
| dimension | VARCHAR(100) | Location dimension |
| created_at | TIMESTAMP | Record creation timestamp |
| updated_at | TIMESTAMP | Record last update timestamp |

---

### 3.3 episodes
Stores episode metadata.

| Field | Type | Description |
|-----|-----|-------------|
| id | INTEGER | Primary key |
| name | VARCHAR(255) | Episode name |
| air_date | VARCHAR(100) | Air date (API format) |
| episode_code | VARCHAR(20) | Episode code (e.g., S01E01) |
| created_at | TIMESTAMP | Record creation timestamp |
| updated_at | TIMESTAMP | Record last update timestamp |

---

### 3.4 character_episodes

Join table representing the many-to-many relationship between characters and episodes.

| Field | Type | Description |
|-----|-----|-------------|
| character_id | INTEGER | Foreign key to `characters.id` |
| episode_id | INTEGER | Foreign key to `episodes.id` |
| PRIMARY KEY | (character_id, episode_id) | Composite primary key |

---

### Relationships

- `characters.origin_id` → `locations.id`
- `characters.location_id` → `locations.id`
- `characters` ↔ `episodes` → Many-to-many via `character_episodes`

---

### 3.5 Initialize the database
Initialize the database with **15 characters** fetched from the Rick and Morty API using a seed script or startup process.

---

## 4. Caching (Redis)
- Cache character search results based on query parameters.
- Define a cache TTL between **6–12 hours**.
- Refresh or invalidate cache entries when character data is updated.

---

## 5. Middleware & Logging
- Implement an Express middleware that logs:
  - HTTP method
  - Request path
  - Timestamp
  - Request execution time
- Logs must be printed to the console.

---

## 6. Scheduled Jobs
- Implement a **cron job** that runs every **12 hours**.
- The cron job must:
  - Fetch updated character data from the Rick and Morty API
  - Update existing records in the database
  - Insert new characters if required
  - Refresh or invalidate Redis cache

---

## 7. Performance Monitoring
- Implement a **TypeScript method decorator** that:
  - Measures execution time of database queries or service methods
  - Logs execution time to the console
- Apply the decorator to character search logic.

---

## 8. Testing
- Implement **unit tests** for:
  - GraphQL `characters` query
  - Filtering logic
  - Cache hit vs cache miss behavior (mock Redis)
- Use **Jest** or an equivalent testing framework.

---

## 9. Software Design
- Apply software design patterns, including:
  - Repository pattern for database access
  - Service layer for business logic
  - Adapter pattern for external API integration
- Ensure clear separation of concerns between:
  - GraphQL resolvers
  - Services
  - Repositories
  - Infrastructure (database, Redis, cron jobs)

---

## 10. Optional Enhancements
- Environment-based configuration using `.env`
- Docker setup for API, database, and Redis
- Basic error handling and input validation
