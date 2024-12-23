FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json* ./
COPY apps/file-service/package.json ./apps/file-service/
COPY packages/models/package.json ./packages/models/

RUN npm ci

COPY . .

WORKDIR /app/packages/models
RUN npm run build

WORKDIR /app/apps/file-service
RUN npm run build

FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/package.json /app/package-lock.json* ./
COPY --from=builder /app/apps/file-service/package.json ./apps/file-service/
COPY --from=builder /app/packages/models/package.json ./packages/models/

RUN npm ci --only=production

COPY --from=builder /app/packages/models/dist ./packages/models/dist
COPY --from=builder /app/apps/file-service/dist ./apps/file-service/dist

WORKDIR /app/apps/file-service

EXPOSE 4300

CMD ["node", "dist/index.js"]