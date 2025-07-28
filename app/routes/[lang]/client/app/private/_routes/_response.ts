// @routes/[lang]/client/_response.ts

import { FreshContext } from '$fresh/server.ts';
import { State } from "@middleware/sessionHandler.ts";
import { IPOST_langClientApp_formSchema } from "./_validation.ts";
import { IGET_langClientAppPayload, IPOST_langClientAppPayload } from "./_payload.ts";


export const GET_langClientAppResponse_Success = (req: Request, ctx: FreshContext<State>, payload: IGET_langClientAppPayload): Promise<Response> => {
    
  return Promise.resolve(
    ctx.render(payload)
  );

}


export const POST_langClientAppResponse_Success = async (req: Request, ctx: FreshContext<State>, payload: IPOST_langClientAppPayload, validation: IPOST_langClientApp_formSchema): Promise<Response> => {
    
    const { terms, ticket, ticket_email } = validation.data;

    console.log("Validation data:");
    console.log(validation.data);

    const session = ctx.state.sessions?.["sessionId"];
    await session.store.set("terms_accepted", terms === "accepted" ? "accepted" : "not_accepted");
    await session.store.set("wants_ticket", ticket === "requested" ? "requested" : "not_requested");
    if (await session.store.get("wants_ticket") === "requested") {
      await session.store.set("ticket_email", ticket_email);
    };

    console.log("Session data:");
    console.log(await session.store.get("terms_accepted"));

    console.log('End -- langClientAppController');
    
    
    return new Response(null, {
      status: 303,
      headers: { Location: `/${payload.actualLang}/client/app/private/services/products` },
    });
  
    
}