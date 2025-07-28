import { Handlers, FreshContext, PageProps } from '$fresh/server.ts';
import { State } from "@middleware/sessionHandler.ts";
import { GET_lang_licenseController, POST_lang_licenseController } from "./[license]/_routes/_controller.ts";
import ViewLicenseForm from "@islands/routes/[lang]/ViewLicenseForm.tsx";


export const handler: Handlers<unknown, State> = {
  async GET(req: Request, ctx: FreshContext<State>): Promise<Response> {
    return await GET_lang_licenseController(req, ctx);
  },

  async POST(req: Request, ctx: FreshContext<State>): Promise<Response> {
    return await POST_lang_licenseController(req, ctx);
  },
};


export interface Props {
  errorLicense: boolean;
}

export default function license({ data }: PageProps<Props>) {


  return (
    <div className={"w-full h-screen p-4"}>
      <div className="w-full h-full flex flex-col items-center justify-evenly border-2 p-2">
        <h1 className="text-5xl font-dancing">License</h1>

        
        <ViewLicenseForm data={data}/>
        
        

      </div>
      
    </div>
  )
}
