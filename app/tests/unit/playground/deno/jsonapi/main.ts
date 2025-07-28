// Importamos las clases necesarias desde jsonapi-serializer
import { Serializer, Deserializer } from "npm:jsonapi-serializer";

// Tipos para los datos de ejemplo (puedes adaptarlos a tus necesidades)
interface User {
  id: string;
  name: string;
  email: string;
  role?: string;
}

// 1. Serialización (salida): Convertir datos a JSON:API
function serializeUser(user: User): string {
  const serializer = new Serializer("users", {
    attributes: ["name", "email", "role"], // Campos que queremos incluir
    keyForAttribute: "camelCase", // Formato de las claves (camelCase, snake_case, etc.)
  });

  return serializer.serialize(user);
}

// 2. Deserialización (entrada): Parsear JSON:API a un objeto
async function deserializeUser<T>(jsonApiData: T): Promise<Record<any, any>> {
  const deserializer = new Deserializer({
    keyForAttribute: "camelCase", // Debe coincidir con el formato de entrada
  });

  const parsedData = await deserializer.deserialize(jsonApiData);
  return parsedData;
}

// Ejemplo de uso
async function main() {
  // Datos de ejemplo
  const user: User = {
    id: "1",
    name: "Juan Pérez",
    email: "juan@example.com",
    role: "admin",
  };

  // Serialización
  console.log("=== Serialización (salida) ===");
  const serialized = serializeUser(user);
  console.log(serialized);

  // Ejemplo de entrada JSON:API
  const jsonApiInput = 
    {
      "data": {
        "type": "users",
        "id": "2",
        "attributes": {
          "name": "María Gómez",
          "email": "maria@example.com",
          "role": "user"
        }
      }
    };

  // Deserialización
  console.log("\n=== Deserialización (entrada) ===");
  const deserialized = await deserializeUser<Record<any, any>>(jsonApiInput);
  console.log(deserialized);
}

// Ejecutar el programa
main().catch((error) => console.error("Error:", error));