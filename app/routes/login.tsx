// routes/login.tsx

import { Handlers, PageProps } from "$fresh/server.ts";
import { State } from '@middleware/sessionHandler.ts';


export const handler: Handlers<unknown, State> = {
  async GET(_req, ctx) {
    //console.log('MAIN CLIENT');


    //const cookies = getCookies(_req.headers);
    //console.log(`MI COOKIE: ${cookies.miCookie}`);
    const session = ctx.state.sessions?.["sessionId"];

    console.log('--------------------')
    await session.store.set("attr", "que tal?");
    //session.store.destroy();
    const value = await session.store.get("attr") || "No hubo nada :(";
    session.store.rotate();
    console.log(value);
    
    const data = { number_products: 10, greeting: value }//, actualLang: ctx.state.lang, translation: ctx.state.translation, cookie: cookies.cookieLang };
    console.log(data)
    return ctx.render(data);
  },
}

export default function Login({ data }: PageProps<any>) {
  return <div>Login | {data.greeting}</div>;
}
