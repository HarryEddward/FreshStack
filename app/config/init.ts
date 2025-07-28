
import { initRedis } from "@config/redisClient.ts";

export async function init() {
    // Aquí puedes inicializar cualquier cosa que necesites al inicio de la aplicación
    // Por ejemplo, cargar configuraciones, inicializar bases de datos, etc.
    
    console.log("Aplicación inicializando.");

    
    
    // Si necesitas realizar alguna acción asíncrona, puedes usar async/await aquí.
    // Por ejemplo, si necesitas conectarte a una base de datos:
    // await connectToDatabase();
    
    // O si necesitas cargar configuraciones desde un archivo o variable de entorno:
    // loadConfigurations();
    
    await initRedis();

    

    console.log("Aplicación inicializada correctamente.");
}