import LangBusinessWebWWWComponentNavbar from '@components/routes/lang/business/web/www/Navbar.tsx';
import LangBusinessWebWWWIslandFooter from "@islands/routes/[lang]/business/web/www/Footer.tsx";
import LangBusinessWebWWWLoginIslandForm from "@islands/routes/[lang]/business/web/www/login/Form.tsx";
import { GET_langBusinessWebWWWLoginController, POST_langBusinessWebWWWLoginController, DELETE_langBusinessWebWWWLoginController, PUT_langBusinessWebWWWLoginController } from '@routes/[lang]/business/web/www/login/_routes/_controller.ts';
import { Handlers, FreshContext, PageProps } from '$fresh/server.ts';
import { State } from "@middleware/sessionHandler.ts";
import ClientAppLoginIslandView from '@islands/routes/[lang]/client/app/login/View.tsx';



export const handler: Handlers<unknown, State> = {
  async GET(req: Request, ctx: FreshContext<State>): Promise<Response> {
    return await GET_langBusinessWebWWWLoginController(req, ctx);
  },

  async POST(req: Request, ctx: FreshContext<State>): Promise<Response> {
    return await POST_langBusinessWebWWWLoginController(req, ctx);
  },

  async PUT(req: Request, ctx: FreshContext<State>): Promise<Response> {
    return await PUT_langBusinessWebWWWLoginController(req, ctx);
  },

  async DELETE(req: Request, ctx: FreshContext<State>): Promise<Response> {
    return await DELETE_langBusinessWebWWWLoginController(req, ctx);
  },
};


interface Props {

}

export default function langBusinessWebWWWLogin({  }: PageProps<Props>) {
  return (
    <>
    {/*<div className={"w-full w-full px-2 pt-7"}>
      <LangBusinessWebWWWComponentNavbar/>
      <LangBusinessWebWWWLoginIslandForm/>
    </div>
    <LangBusinessWebWWWIslandFooter/>*/}
    </>
  )
}



