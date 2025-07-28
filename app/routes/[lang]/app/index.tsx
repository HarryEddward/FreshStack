import LangBusinessAppComponentNavbar from "@components/routes/lang/business/web/app/Navbar.tsx";
import { Handlers, FreshContext } from '$fresh/server.ts';
import { State } from "@middleware/sessionHandler.ts";
import { GET_langAppController, POST_langAppController } from '@routes/[lang]/app/_routes/_controller.ts';


export const handler: Handlers<unknown, State> = {
  async GET(req: Request, ctx: FreshContext<State>): Promise<Response> {
    return await GET_langAppController(req, ctx);
  },

  async POST(req: Request, ctx: FreshContext<State>): Promise<Response> {
    return await POST_langAppController(req, ctx);
  },
};

export default function Index() {
  return (
    <div className="w-full h-screen p-4">
      <LangBusinessAppComponentNavbar/>
      <div className={"w-full h-full flex flex-col items-center justify-evenly border-2 p-4"}>
        <div className={"text-5xl font-dancing text-center"}>
          What app you want to use?
        </div>

        <form method={"POST"} className="flex flex-col w-full gap-y-4">
            <button 
            type="submit"
            name="url_type_app"
            value={"/business/app"}
            className={"flex w-full border-2 p-4 rounded-md"}>
                Employee App
            </button>

            <button 
            type="submit"
            name="url_type_app"
            value={"/client/app/private/step_before"}
            className={"flex w-full border-2 p-4 rounded-md"}>
                Client App
            </button>

        </form>
        
      </div>
    </div>
    
  )
}
