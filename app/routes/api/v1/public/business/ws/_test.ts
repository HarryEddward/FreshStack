// ws_client.ts
const socket = new WebSocket("ws://localhost:8000/api/v1/protected/business/ws");

socket.onopen = () => {
  console.log("✅ Conectado al servidor");
  socket.send("Hola desde Deno cliente");
};

socket.onmessage = (e) => {
  console.log("📨 Mensaje recibido:", e.data);
};

socket.onclose = () => {
  console.log("❌ Conexión cerrada");
};
