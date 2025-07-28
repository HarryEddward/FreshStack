//import { config } from "@config/index.ts"; // Asegúrate de tener tu config.mainApiUrl definida

// Interfaz para manejar respuestas y errores
interface ApiResponse<T> {
  data?: T;
  error?: string;
}


// Función auxiliar para manejar fetch con error
async function fetchWithError<T>(url: string, options: RequestInit): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      console.error(`Error al hacer fetch: ${response.statusText}`);
      return { error: `Error: ${response.status}` };
    }
    const data = await response.json();
    return { data };
  } catch (err) {
    console.error("Error en la solicitud:", err);
    return { error: "Ocurrió un error al hacer la solicitud" };
  }
}

async function findPublishedPosts(): Promise<ApiResponse<any[]>> {

    /*const queryBusiness = encodeURIComponent(JSON.stringify({ 
        "where": { "id": license },
        "select": {
            "business": {
                "select": {
                    "configuration": {
                        "select": {
                            "wifi": true,
                            "schedule": true,
                            "functionsActivated": true,
                            "displayUsername": true
                        }
                    },
                },
            },
        },
    }));*/
  

    const query = encodeURIComponent(JSON.stringify({ 
        "where": { "businessId": "cmbkpcqyw00052u55icbbri5h" },
    }));
    const url = `http://10.241.157.225:3800/api/v1/model/BusinessMenuCategoryPriceAdjustment/findMany?q=${query}`;
    return fetchWithError(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Cookie": "sessionId=QVl4UXYtb25va1QyVzYzSkRxeVlj.s0UoEg6UYK04xQYcj9NfwpwA9eiNI2WRSpXIfJnH4EQ"
      }
      

    });
}



// Ejemplo de uso
async function main() {

  // 2. Buscar posts publicados
  const publishedPosts = await findPublishedPosts();
  console.log("Posts publicados:", publishedPosts);
}

// Ejecutar el ejemplo
await main();