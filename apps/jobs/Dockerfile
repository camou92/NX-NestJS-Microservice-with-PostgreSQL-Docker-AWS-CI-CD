FROM node:20-slim AS builder

WORKDIR /workspace

# Copier package.json + package-lock.json
COPY package.json package-lock.json nx.json tsconfig.base.json tsconfig.json ./

# Copier tout le code
COPY apps/jobs ./apps/jobs
COPY libs ./libs

# Installer dépendances complètes
RUN npm ci


RUN apt-get update && apt-get install -y protobuf-compiler

# Synchroniser Nx tsconfig
RUN npx nx sync

# Builder l'application jobs
RUN npx nx run-many --target=build --all --configuration=production

# ---------- RUNTIME STAGE ----------
FROM node:20-slim AS runner

WORKDIR /app

# Installer openssl runtime

# Copier package.json + lock
COPY --from=builder /workspace/package.json ./
COPY --from=builder /workspace/package-lock.json ./

# Installer uniquement les dépendances runtime
RUN npm ci --omit=dev --no-audit --no-fund && npm cache clean --force

# Copier le build complet
COPY --from=builder /workspace/apps/jobs/dist ./dist

# Copier les libs buildées dans node_modules pour que Node les trouve
COPY --from=builder /workspace/libs/pulsar/dist ./node_modules/@jobber/pulsar
COPY --from=builder /workspace/libs/graphql/dist ./node_modules/@jobber/graphql
COPY --from=builder /workspace/libs/proto/dist ./node_modules/@jobber/proto
COPY --from=builder /workspace/libs/nestjs/dist ./node_modules/@jobber/nestjs

# Exposer port
EXPOSE 3001

CMD ["node", "dist/main.js"]