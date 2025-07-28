import { Handlers, PageProps } from '$fresh/server.ts';
import { oauth2Client } from "@utils/oauth_client.ts";
import { State } from "@middleware/sessionHandler.ts";
import ClientAppLoginIslandView from '@islands/routes/[lang]/client/app/login/View.tsx';

export const handler: Handlers<unknown, State> = {
  async GET(req, ctx) {

    console.log("Login route");
    const { uri, codeVerifier } = await oauth2Client.code.getAuthorizationUri();
    console.log("uri", uri);

    const session = ctx.state.sessions?.["sessionId"];
    await session.store.set("code_verifier", codeVerifier);

    console.log(await session.store.get("code_verifier"));
    console.log(JSON.stringify(await session.store.getAll()));

    
    /*return ctx.render({
      location: uri.toString()
    })*/

    //console.log("URL");
    //console.log(uri.toString());
    return Response.redirect(uri.toString(), 302);

  },
};


export interface Props {
  location: string 
}

export default function Home({ data }: PageProps<{ location: string }>) {
  // Este componente no se renderizará porque el redirect ocurre en el servidor
  
  
  return (
    <div className="w-full h-full p-4">
      <h2>Redirigiendo a Keycloak...</h2>
      {/*<ClientAppLoginIslandView data={data}/>*/}
    </div>
  );
}