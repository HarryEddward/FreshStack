# Etapa de build
FROM denoland/deno:alpine-1.41.2 AS builder
WORKDIR /app
COPY . .

# Cacheamos las dependencias como root
RUN deno cache main.ts

RUN deno run -A dev.ts build

# Etapa final
FROM denoland/deno:alpine-1.41.2
WORKDIR /app
COPY --from=builder /app .
EXPOSE 8000
CMD ["deno", "run", "-A", "--allow-env", "main.ts"]