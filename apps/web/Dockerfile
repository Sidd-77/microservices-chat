# Stage 1: Build the application
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json* ./
COPY apps/web/package.json ./apps/web/
COPY packages/models/package.json ./packages/models/

RUN npm ci

COPY . .

ENV VITE_AUTH_URL="messagepunk.com" \
    VITE_DB_URL="messagepunk.com" \
    VITE_SOCKET_URL="messagepunk.com" \
    VITE_FILE_URL="messagepunk.com" \
    VITE_NOTIFICATION_URL="messagepunk.com" \
    VITE_VAPID_PUBLIC_KEY=${VITE_VAPID_PUBLIC_KEY}

WORKDIR /app/packages/models
RUN npm run build

WORKDIR /app/apps/web
RUN npm run build

FROM nginx:stable-alpine

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=builder /app/apps/web/dist .

COPY --from=builder /app/apps/web/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
