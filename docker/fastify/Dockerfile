# Stage 1: Build
FROM node:18-alpine AS builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --omit=dev # Instala solo dependencias de producción
COPY . .
RUN npm run build

# Stage 2: Production
FROM node:18-alpine
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package*.json ./
# Copia prisma si es necesario para migraciones en tiempo de ejecución o el cliente query engine
COPY --from=builder /usr/src/app/prisma ./prisma
# Si necesitas el schema de Prisma en runtime para el cliente (a veces sí, a veces no dependiendo de cómo lo generes)
# RUN npx prisma generate # Podría ser necesario si no lo empaquetas bien

# Establece el entorno a producción
ENV NODE_ENV=production
# Exponer el puerto que usa la app
EXPOSE 3000

# Comando para correr la aplicación
CMD ["node", "dist/server.js"]