// @routes/[lang]/admin/_routes/_payload.ts

import { FreshContext } from "$fresh/server.ts";
import { State } from "@middleware/sessionHandler.ts";
import { config } from "@config/index.ts";

export interface IGET_langAdminPayload {
  business?: any[]; // Cambiado a arreglo para reflejar la respuesta de findMany
  businessLicense?: any; // Agregado para reflejar la respuesta retornada
  error?: string;
}

export const GET_langAdminPayload = async (
  req: Request,
  ctx: FreshContext<State>
): Promise<IGET_langAdminPayload> => {
  try {
    const queryBusiness = encodeURIComponent(JSON.stringify({ where: { legalName: "TESTING" } }));
    const responseBusiness = await fetch(`${config.mainApiUrl}/api/v1/model/Business/findMany?q=${queryBusiness}`, {
      method: "GET"
    });

    if (!responseBusiness.ok) {
      console.error(`Error al hacer fetch: ${responseBusiness.statusText}`);
      return { error: `Error: ${responseBusiness.status}` };
    }

    const business = await responseBusiness.json(); // Ej: { data: [...] }
    console.log("Business encontradas:", business);

    const businessIds = business.data.map((b: any) => b.id);

    const licenseFetches = businessIds.map((id: string) => {
      const queryLicense = encodeURIComponent(JSON.stringify({ where: { businessId: id } }));
      return fetch(`${config.mainApiUrl}/api/v1/model/businessLicense/findMany?q=${queryLicense}`, {
        method: "GET"
      }).then(async res => {
        if (!res.ok) {
          throw new Error(`Error al obtener license para ID ${id}: ${res.statusText}`);
        }
        const result = await res.json();
        return { businessId: id, licenses: result.data };
      });
    });

    const businessLicense = await Promise.all(licenseFetches);

    return {
      business,
      businessLicense
    };
  } catch (err) {
    console.error("Error al obtener licencias:", err);
    return { error: "Ocurrió un error al hacer fetch de licencias" };
  }
};


// Resto de las funciones (POST, PUT, DELETE) sin cambios
export interface IPOST_langAdminPayload {}
export const POST_langAdminPayload = async (
  req: Request,
  ctx: FreshContext<State>
): Promise<IPOST_langAdminPayload> => {
  

  return {};
};

export interface IPUT_langAdminPayload {}
export const PUT_langAdminPayload = async (
  req: Request,
  ctx: FreshContext<State>
): Promise<IPUT_langAdminPayload> => {
  return {};
};

export interface IDELETE_langAdminPayload {}
export const DELETE_langAdminPayload = async (
  req: Request,
  ctx: FreshContext<State>
): Promise<IDELETE_langAdminPayload> => {
  return {};
};