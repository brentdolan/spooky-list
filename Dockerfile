FROM node:18-alpine AS base
LABEL authors="stephen"

FROM base AS deps
RUN apk add --no-cache libc6-compat g++ make py3-pip
WORKDIR /app

COPY package.json .
RUN npm i

FROM base AS dev
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME localhost

ENTRYPOINT npm run dev

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build
RUN ls ./.next && sleep 10

FROM base AS runner
WORKDIR /app

ENV NODE_ENV dev

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

USER nextjs

COPY --from=builder /app/public ./public

# Standalone only applies when you're using standalone to optimize build sizes.
# If true, Next scans all files to deploy only what's needed.
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME localhost

CMD ["node", "server.js"]