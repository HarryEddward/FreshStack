# Etapa de build
FROM denoland/deno:alpine-1.41.2 AS builder

# Instalar Node.js y PNPM
RUN apk add --no-cache nodejs npm
RUN npm install -g pnpm

WORKDIR /app

# Copiar archivos de dependencias primero (para aprovechar cache)
COPY package.json pnpm-lock.yaml* ./
COPY deno.json* deno.lock* ./

# Instalar dependencias de frontend con PNPM
RUN if [ -f pnpm-lock.yaml ]; then pnpm install --frozen-lockfile; else pnpm install; fi

# Copiar el resto del código
COPY . .

# Cachear dependencias de Deno
RUN deno cache main.ts

# Build de la aplicación Fresh
RUN deno run -A dev.ts build

# Etapa final
FROM denoland/deno:alpine-1.41.2

# Instalar Node.js si es necesario en runtime (opcional, solo si Fresh lo necesita)
# RUN apk add --no-cache nodejs

WORKDIR /app

# Copiar todo desde el builder
COPY --from=builder /app .

EXPOSE 8000

CMD ["deno", "run", "-A", "--allow-env", "main.ts"]