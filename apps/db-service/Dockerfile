FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json* ./
COPY apps/db-service/package.json ./apps/db-service/
COPY packages/models/package.json ./packages/models/

RUN npm ci

COPY . .

WORKDIR /app/packages/models
RUN npm run build

WORKDIR /app/apps/db-service
RUN npm run build

FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/package.json /app/package-lock.json* ./
COPY --from=builder /app/apps/db-service/package.json ./apps/db-service/
COPY --from=builder /app/packages/models/package.json ./packages/models/

RUN npm ci --only=production

COPY --from=builder /app/packages/models/dist ./packages/models/dist
COPY --from=builder /app/apps/db-service/dist ./apps/db-service/dist

WORKDIR /app/apps/db-service

EXPOSE 4100

CMD ["node", "dist/index.js"]