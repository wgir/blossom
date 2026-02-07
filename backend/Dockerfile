# Build stage
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build
RUN npm prune --production

# Production stage
FROM node:18-alpine

WORKDIR /app

# Copy production dependencies and build artifacts from the build stage
COPY --from=build /app/package*.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/.sequelizerc ./
COPY --from=build /app/src/config/config.js ./src/config/config.js
COPY --from=build /app/src/migrations ./src/migrations

EXPOSE 3000

CMD ["npm", "run", "start"]
