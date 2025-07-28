import { HandlerContext, Handlers, PageProps } from "$fresh/server.ts";

interface Data {
  hola: string;
}

export const handler: Handlers = {
  async GET(_req: Request, ctx: HandlerContext) {
    const resp = await ctx.render();
    resp.headers.set("X-Custom-Header", "Hello World");
    return resp;
  },
};

export default function Page(props: PageProps) {
  return (
    <>
      <h1>LOGOUT! :D</h1>
    </>
  );
}
