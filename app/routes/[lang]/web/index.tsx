import LangBusinessAppComponentNavbar from "@components/routes/lang/business/web/app/Navbar.tsx";
import { Handlers, FreshContext } from '$fresh/server.ts';
import { State } from "@middleware/sessionHandler.ts";
import { GET_langWebController, POST_langWebController } from '@routes/[lang]/web/_routes/_controller.ts';


export const handler: Handlers<unknown, State> = {
  async GET(req: Request, ctx: FreshContext<State>): Promise<Response> {
    return await GET_langWebController(req, ctx);
  },

  async POST(req: Request, ctx: FreshContext<State>): Promise<Response> {
    return await POST_langWebController(req, ctx);
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
            name="url_type_web"
            value={"/business/web/app/dashboard"}
            className={"flex w-full border-2 p-4 rounded-md"}>
                Business Web
            </button>

        </form>
        
      </div>
    </div>
    
  )
}
