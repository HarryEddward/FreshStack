import ClientAppStep_BeforeIslandViewStepBefore from "@islands/routes/[lang]/client/app/[step_before]/ViewStepBefore.tsx";
import { Handlers, FreshContext, PageProps } from '$fresh/server.ts';
import { State } from '@middleware/sessionHandler.ts';
import { GET_langClient_step_beforeController } from '@routes/[lang]/client/app/private/[step_before]/_routes/_controller.ts';
import { IGET_langClient_step_beforePayload } from '@routes/[lang]/client/app/private/[step_before]/_routes/_payload.ts';


export const handler: Handlers<unknown, State> = {
  async GET(req: Request, ctx: FreshContext<State>): Promise<Response> {
    return await GET_langClient_step_beforeController(req, ctx);
  },
};


export default function Home({ data }: PageProps<IGET_langClient_step_beforePayload>) {

  
  return (
    <ClientAppStep_BeforeIslandViewStepBefore data={data}/>
  )
}
