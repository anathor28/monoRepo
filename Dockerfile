# Stage de build
FROM node:20-alpine AS builder

# Installer pnpm
RUN npm install -g pnpm

WORKDIR /app

# Copier seulement les fichiers nécessaires pour l'installation des dépendances
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/*/package.json ./apps/
COPY packages/*/package.json ./packages/

# Installer les dépendances
RUN pnpm install --frozen-lockfile

# Copier le reste des fichiers source
COPY . .

# Construire les applications
RUN pnpm -r run build

# Stage final
FROM node:20-alpine AS runner

# Installer les outils nécessaires et PM2
RUN apk add --no-cache tcptraceroute iputils \
    && npm install -g pm2 \
    && rm -rf /var/cache/apk/* /root/.npm

# Créer un utilisateur non-root
RUN addgroup -g 1001 -S nodejs \
    && adduser -S nestjs -u 1001 -G nodejs

WORKDIR /app

# Copier les fichiers nécessaires du stage de build
COPY --from=builder --chown=nestjs:nodejs /app/package.json /app/pnpm-lock.yaml /app/pnpm-workspace.yaml ./
COPY --from=builder --chown=nestjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nestjs:nodejs /app/apps ./apps
COPY --from=builder --chown=nestjs:nodejs /app/packages ./packages

# Copier les binaires de pnpm
COPY --from=builder /usr/local/bin/pnpm /usr/local/bin/pnpm
COPY --from=builder /usr/local/bin/pnpx /usr/local/bin/pnpx

# Supprimer les binaires non nécessaires
RUN rm -f /sbin/apk \
    && rm -f /usr/bin/vi \
    && rm -f /usr/bin/nano

# Copier le fichier de configuration PM2
COPY ecosystem.config.js .

# Utiliser l'utilisateur non-root
USER nestjs

# Exposer le port 8096 pour l'API Gateway
EXPOSE 8096

# Définir les variables d'environnement
ENV NODE_ENV production
ENV PATH /app/node_modules/.bin:$PATH

# Démarrer l'application avec PM2
CMD ["sh", "-c", "SERVICE_NAME=$SERVICE_NAME pm2-runtime start ecosystem.config.js"]