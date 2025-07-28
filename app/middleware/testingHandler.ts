// middleware/testingHandler.ts
import { FreshContext } from "$fresh/server.ts";
import { State } from "@middleware/sessionHandler.ts";
import { oauth2Client } from "@utils/oauth_client.ts";

function catchError(target: any, propertyName: any,descriptor: any) {
    const method = descriptor.value;

    descriptor.value = function(...args: any) {
        try {
            return method.apply(target, args);
        } catch(error) {
            throw new Error(`Special error message: ${error}`);
        }
    };
}

class MiddlewareTesting {

    public async handler(
        req: Request,
        ctx: FreshContext<State>,
        next: () => Promise<Response>
    ): Promise<Response> {

        console.log("🟢 Testing Handler");

        const resp = await next();

        return new Response(resp.body, {
            status: resp.status,
            statusText: resp.statusText,
            headers: resp.headers,
        });

    }

}

export default new MiddlewareTesting();

