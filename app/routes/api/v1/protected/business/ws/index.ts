// routes/ws.ts
import { Handlers } from "$fresh/server.ts";

const sockets = new Set<WebSocket>();

export const handler: Handlers = {
  GET(req, _ctx) {
    

    const { socket, response } = Deno.upgradeWebSocket(req);

    

    socket.onopen = () => {

      

      sockets.add(socket);
      console.log("Cliente conectado");

      console.log('BRO IS THIS');
      console.log('greeting');
      const url = new URL(req.url);
      const greeting = url.searchParams.get("greeting");

      console.log('Greeting');
      console.log(greeting);
    };

    socket.onmessage = (e) => {
      console.log("Mensaje recibido:", e.data);
      // Broadcast
      sockets.forEach((s) => {
        if (s !== socket) s.send(e.data);
      });
    };

    socket.onclose = () => {
      sockets.delete(socket);
      console.log("Cliente desconectado");
    };

    return response;
  },
};
