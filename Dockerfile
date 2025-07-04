# syntax=docker/dockerfile:1

FROM node:22-alpine AS base
WORKDIR /app
COPY .npmrc ./
COPY package*.json ./
RUN npm ci --quiet
COPY . .

FROM base AS storybook
RUN apk add --no-cache curl
CMD npm run storybook

FROM base AS dev
RUN apk add --no-cache openssl curl
RUN npm run prisma
WORKDIR /app
EXPOSE 3000
CMD export DATABASE_URL=$(cat /run/secrets/db_url) &&  \
    export AUTH_SECRET=$(cat /run/secrets/auth_secret) && \
    export AUTH_GITHUB_ID=$(cat /run/secrets/auth_github_id) && \
    export AUTH_GITHUB_SECRET=$(cat /run/secrets/auth_github_secret) && \
    export AUTH_GOOGLE_ID=$(cat /run/secrets/auth_google_id) && \
    export AUTH_GOOGLE_SECRET=$(cat /run/secrets/auth_google_secret) && \
    export AUTH_DISCORD_ID=$(cat /run/secrets/auth_discord_id) && \
    export AUTH_DISCORD_SECRET=$(cat /run/secrets/auth_discord_secret) && \
    npm run dev

FROM base AS builder
WORKDIR /app
# RUN --mount=type=secret,id=secret_env cat /run/secrets/.env > .env
RUN npm run prisma
RUN npm run build
RUN npm prune --omit=dev

FROM node:lts AS prod
ENV NODE_ENV=production

WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
RUN mkdir .next
RUN chown nextjs:nodejs .next
RUN npm i -g prisma

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma
EXPOSE 3000
CMD ["sh", "-c", "npm run prisma-force && node server.js"]
