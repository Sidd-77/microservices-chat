# Stage 1: Builder
FROM node:20-alpine AS builder

WORKDIR /app

# Copy all package.json files
COPY package.json package-lock.json* ./
COPY apps/auth-service/package.json ./apps/auth-service/
COPY apps/db-service/package.json ./apps/db-service/
COPY packages/models/package.json ./packages/models/

# Install dependencies
RUN npm ci

# Copy the entire source code
COPY . .

# Build models
WORKDIR /app/packages/models
RUN npm run build

# Build db-service
WORKDIR /app/apps/db-service
RUN npm run build

# Stage 2: Production
FROM node:20-alpine

WORKDIR /app

# Copy only production dependencies
COPY package.json package-lock.json* ./
COPY --from=builder /app/node_modules ./node_modules

# Copy the built code
COPY --from=builder /app/packages/models/dist ./packages/models/dist
COPY --from=builder /app/apps/db-service/dist ./apps/db-service/dist

WORKDIR /app/apps/db-service

EXPOSE 4100

CMD ["node", "dist/index.js"]
