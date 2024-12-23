FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json* ./
COPY apps/notification-service/package.json ./apps/notification-service/
COPY packages/models/package.json ./packages/models/

RUN npm ci

COPY . .

WORKDIR /app/packages/models
RUN npm run build

WORKDIR /app/apps/notification-service
RUN npm run build

FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/package.json /app/package-lock.json* ./
COPY --from=builder /app/apps/notification-service/package.json ./apps/notification-service/
COPY --from=builder /app/packages/models/package.json ./packages/models/

RUN npm ci --only=production

COPY --from=builder /app/packages/models/dist ./packages/models/dist
COPY --from=builder /app/apps/notification-service/dist ./apps/notification-service/dist

WORKDIR /app/apps/notification-service

EXPOSE 4000

CMD ["node", "dist/index.js"]