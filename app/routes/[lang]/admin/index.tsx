import LangAdminView from "@islands/routes/[lang]/admin/View.tsx";
import { GET_langAdminController, POST_langAdminController } from '@routes/[lang]/admin/_routes/_controller.ts';
import { Handlers, FreshContext, PageProps } from '$fresh/server.ts';
import { State } from '@middleware/sessionHandler.ts';
import { IGET_langAdminPayload } from '@routes/[lang]/admin/_routes/_payload.ts';


export const handler: Handlers<unknown, State> = {
  async GET(req: Request, ctx: FreshContext<State>): Promise<Response> {
    return await GET_langAdminController(req, ctx);
  },

  async POST(req: Request, ctx: FreshContext<State>): Promise<Response> {
    return await POST_langAdminController(req, ctx);
  },
};

export interface PropsData {
  licenseId: string;
}

export interface Props {
  data: IGET_langAdminPayload;
  
};


export default function index({ data }: PageProps<Props>) {
  return (
    <div>
        <LangAdminView data={data}/>
    </div>
  )
}
