import { ArrowDown, KeyIcon, User2Icon } from "npm:lucide-preact@^0.485.0";
import LangBusinessWebWWWComponentPlans from "@components/routes/lang/business/web/www/Plans.tsx";
import LangBusinessWebWWWComponentNavbar from '@components/routes/lang/business/web/www/Navbar.tsx';
import LangBusinessWebWWWIslandViewGraph from "@islands/routes/[lang]/business/web/www/ViewGraph.tsx";
import LangBusinessWebWWWIslandButtonTrial from '@islands/routes/[lang]/business/web/www/ButtonTrial.tsx';
import LangBusinessWebWWWIslandFooter from "@islands/routes/[lang]/business/web/www/Footer.tsx";
import LangBusinessWebWWWIslandTrustedByCarousel from "@islands/routes/[lang]/business/web/www/TrustedByCarousel.tsx";
import { Handlers, FreshContext, PageProps } from '$fresh/server.ts';
import { State } from "@middleware/sessionHandler.ts";
import { GET_langBusinessWebWWWController, POST_langBusinessWebWWWController, DELETE_langBusinessWebWWWController, PUT_langBusinessWebWWWController } from '@routes/[lang]/business/web/www/_routes/_controller.ts';
import LangBusinessWebWWWComponentBusinessHeader from "@components/routes/lang/business/web/www/BusinessHeader.tsx";
import { middlewareList } from '@middleware/[lang]/business/web/www/index.ts';
import { composeMiddlewares } from "@utils/middleware.ts";
import { authHandler, uniqueAuthHandler } from "@middleware/[lang]/business/web/www/authHandler.ts";
import type { IGET_langBusinessWebWWWPayload } from '@routes/[lang]/business/web/www/_routes/_payload.ts';


export const handler: Handlers<unknown, State> = {
  async GET(req: Request, ctx: FreshContext<State>): Promise<Response> {
    
    const securedFn = uniqueAuthHandler(async (req, ctx) => {
      return await GET_langBusinessWebWWWController(req, ctx);
    });

    return await securedFn(req, ctx);
  },

  async POST(req: Request, ctx: FreshContext<State>): Promise<Response> {
    return await POST_langBusinessWebWWWController(req, ctx);
  },

  async PUT(req: Request, ctx: FreshContext<State>): Promise<Response> {
    return await PUT_langBusinessWebWWWController(req, ctx);
  },

  async DELETE(req: Request, ctx: FreshContext<State>): Promise<Response> {
    return await DELETE_langBusinessWebWWWController(req, ctx);
  },
};



export default function langBusinessWebWWW({ data }: PageProps<IGET_langBusinessWebWWWPayload>) {


    


    return (
        <>
        <div className={"w-full w-full"}>
            <LangBusinessWebWWWComponentBusinessHeader/>
            <LangBusinessWebWWWComponentNavbar/>
            <LangBusinessWebWWWIslandTrustedByCarousel/>
            
            <header className={"w-full md:pt-0 pt-6"}>
                <div className={"w-full flex md:flex-row flex-col justify-evenly items-center py-4 border-b-2 md:space-y-0 space-y-4"}>
                    
                    <div className={"text-5xl font-black max-w-96 flex flex-col"}>
                        <span className={"text-black"/** text-green-500 */}>Rentabiliza,</span>
                        <span className={"text-black"/** text-amber-500 */}>Ingresa mas,</span>
                        <span className={" font-thin"}>organiza menos, gasta menos</span>
                        <LangBusinessWebWWWIslandButtonTrial actualLang={data.actualLang}/>
                        <img src="/img/business/web/www/logos/no-ai-icon.png" className={"md:w-[25%] mt-5"} alt="" />
                    </div>
                    
                    <img src="/img/business/web/www/poster.png" className={"md:w-[25%] w-[55%]"} alt="" />

                </div>

            </header>
            
            <main className={"w-full flex flex-col p-4 "}>
                

                <section className={"flex flex-col items-center space-y-4 border-b-2 pb-16"}>
                    <div className={"w-full flex flex-row justify-center py-8"}>
                        <ArrowDown className={""}/>
                    </div>
                    <h2 className={"flex flex-row justify-center text-5xl font-semibold"}>Que ofrece?</h2>
                    
                    <h3 className={"pt-8 font-thin text-4xl"}>2 APP's & 1 Web unificada para toda la empresa</h3>
                    <img src="/img/business/web/www/devices.png" className={"md:w-[55%] w-[100%]"} alt="" />
                
                    <p className={"text-center text-2xl font-thin max-w-96"}>Una plataforma que integra todas las áreas de tu negocio, desde la gestión de clientes hasta la administración de pagos y ventas.</p>

                    {/*<div className={"py-4 pt-24 w-full flex md:flex-row flex-col items-center justify-center"}>
                        <div className="w-full flex justify-center">
                            <h4 className={"md:text-6xl text-5xl font-semibold mt-20"}>Client App</h4>
                        </div>
                        <div className="w-full flex justify-center">
                            <h4 className={"md:text-6xl text-5xl font-semibold mt-20"}>Employee App</h4>
                        </div>
                        <div className="w-full flex justify-center">
                            <h4 className={"md:text-6xl text-5xl font-semibold mt-20"}>Business Web</h4>
                        </div>

                    </div>*/}

                </section>
                <section className={"w-full flex py-16 justify-center md:px-0 px-4 border-b-2 mb-16 py-24"}>
                    <span className={"text-6xl"}>Porque más características incompletas?</span>
                </section>
            </main>
            <div className="w-full flex flex-col justify-center items-center">
                <div className="md:w-[65%] w-full flex">
                    <LangBusinessWebWWWIslandViewGraph/>
                </div>
            </div>
            <div className="w-full flex justify-end">
                <span className="md:w-1/2 w-full text-5xl font-black py-4 pt-32 text-right pr-8">
                    Es una suite empresarial, no un simple POS
                </span>
            </div>
            
            
            

            <LangBusinessWebWWWComponentPlans/>
        </div>
        <LangBusinessWebWWWIslandFooter/>
        </>
    )
}
