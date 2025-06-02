# syntax=docker/dockerfile:1

FROM node:22-alpine AS base
WORKDIR /app
COPY .npmrc ./
COPY package*.json ./
RUN npm ci --quiet
COPY . .
RUN npm run prisma

FROM base AS storybook
RUN apk add --no-cache curl
CMD npm run storybook

FROM base AS dev
RUN apk add --no-cache openssl curl
WORKDIR /app
EXPOSE 3000
CMD export DATABASE_URL=$(cat /run/secrets/db_url) &&  \
    export AUTH_SECRET=$(cat /run/secrets/auth_secret) && \
    export AUTH_GITHUB_ID=$(cat /run/secrets/auth_github_id) && \
    export AUTH_GITHUB_SECRET=$(cat /run/secrets/auth_github_secret) && \
    npm run dev

FROM base AS builder
WORKDIR /app
# RUN --mount=type=secret,id=secret_env cat /run/secrets/.env > .env
RUN npm run build
RUN npm prune --omit=dev

FROM node:lts AS prod
WORKDIR /app
# copy from build image
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.ts ./next.config.ts
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
EXPOSE 3000
CMD ["npm", "run", "start"]
