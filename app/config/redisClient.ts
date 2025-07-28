import { createClient, RedisClientType } from "redis";

let redis: RedisClientType | undefined = undefined;
let isConnected = false;

export async function initRedis() {


  if (isConnected) {
    console.log("Redis ya está conectado.");
    return;
  }

  const redisUrl = "redis://:SECRETPWS@127.0.0.1:6381";
  console.log("🔌 Conectando a Redis:", redisUrl);

  redis = createClient({ url: redisUrl });

  redis.on("error", (err) => {
    console.error("Redis Client Error", err);
  });

  try {
    await redis.connect();
    isConnected = true;
    console.log("✅ Redis conectado con éxito.");
  } catch (error) {
    console.error("❌ Error al conectar a Redis:", error);
    throw new Error("Redis initialization failed");
  }
}

export function getRedisClient() {
  if (!isConnected) {
    throw new Error("Redis no conectado. Llama a initRedis() primero.");
  }
  return redis;
}
