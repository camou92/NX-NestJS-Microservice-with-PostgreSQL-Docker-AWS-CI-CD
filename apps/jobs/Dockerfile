# ---------- BUILD STAGE ----------
# using alpine to reduce base image size (~60MB vs ~80MB for slim)
FROM node:20-alpine AS builder

WORKDIR /workspace

# copier fichiers de dépendances pour cache Docker
COPY package.json package-lock.json nx.json tsconfig.base.json tsconfig.json ./

# copier les bibliothèques de monorepo pour que npm workspace fonctionne
COPY libs ./libs

# installer toutes les dépendances (incluant workspace libs)
RUN npm ci --no-audit --no-fund

# copier le code source complet
COPY apps/jobs ./apps/jobs

# ensure workspace tsconfig references are synced (fixes Docker build errors)
RUN npx nx sync

# build le microservice jobs
RUN npx nx build jobs --configuration=production

# préparer dist minimal avec NX prune
RUN npx nx run @jobber/jobs:prune


# ---------- RUNTIME STAGE ----------
FROM node:20-slim AS runtime

WORKDIR /app
ENV NODE_ENV=production

# copier le package.json nécessaire pour npm install
COPY --from=builder /workspace/package.json ./
COPY --from=builder /workspace/package-lock.json ./

# installer uniquement les dépendances runtime et vider le cache npm
RUN npm ci --omit=dev --no-audit --no-fund && npm cache clean --force

# copier le build minimal (seulement les artefacts nécessaires)
COPY --from=builder /workspace/apps/jobs/dist .

EXPOSE 3001

CMD ["node", "main.js"]