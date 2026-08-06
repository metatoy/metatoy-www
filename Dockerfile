# sorb-www — the Sorb marketing site (www.sorbcloud.com).
# Next.js standalone output; JS-only (no TypeScript). Build context = this dir (www/).

# ---- deps + build ----
FROM node:20-slim AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
# next.config.mjs sets output:"standalone"; prebuild runs the JS-only guard.
RUN npm run build

# ---- runtime ----
FROM node:20-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
# Next's standalone server binds to $HOSTNAME (defaults to the container id, i.e.
# a non-loopback iface). Force 0.0.0.0 so both Traefik and the in-container
# curl healthcheck can reach it.
ENV HOSTNAME=0.0.0.0
# curl so Coolify's container healthcheck can probe the app (node:slim lacks it).
RUN apt-get update && apt-get install -y --no-install-recommends curl \
  && rm -rf /var/lib/apt/lists/*
# Standalone server + static assets + public/.
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD curl -fsS http://127.0.0.1:3000/ || exit 1
CMD ["node", "server.js"]
