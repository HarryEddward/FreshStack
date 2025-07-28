import { FreshContext } from "$fresh/server.ts";
import { State } from "@middleware/sessionHandler.ts";

// Jokes courtesy of https://punsandoneliners.com/randomness/programmer-jokes/
const JOKES = [
  "Why do Java developers often wear glasses? They can't C#.",
  "A SQL query walks into a bar, goes up to two tables and says “can I join you?”",
  "Wasn't hard to crack Forrest Gump's password. 1forrest1.",
  "I love pressing the F5 key. It's refreshing.",
  "Called IT support and a chap from Australia came to fix my network connection.  I asked “Do you come from a LAN down under?”",
  "There are 10 types of people in the world. Those who understand binary and those who don't.",
  "Why are assembly programmers often wet? They work below C level.",
  "My favourite computer based band is the Black IPs.",
  "What programme do you use to predict the music tastes of former US presidential candidates? An Al Gore Rhythm.",
  "An SEO expert walked into a bar, pub, inn, tavern, hostelry, public house.",
];

export const handler = async (_req: Request, ctx: FreshContext<State>): Promise<Response> => {

  const session = ctx.state.sessions?.["sessionId"];
  const accessToken = await session.store.get("access_token");
  const refreshToken = await session.store.get("refresh_token");
  const tokenExpiresIn = await session.store.get("token_expires_in");

    console.log("-------->", accessToken, "\n", refreshToken, "\n", tokenExpiresIn);
  const randomIndex = Math.floor(Math.random() * JOKES.length);
  const body = JOKES[randomIndex];
  return new Response(body);
};
