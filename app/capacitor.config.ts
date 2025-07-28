import { CapacitorConfig } from "npm:@capacitor/cli";

// Aseguramos que la configuración está completamente definida
const config: CapacitorConfig = {
  appId: "com.app.cafebuyclientapp",
  appName: "FreshStack",
  webDir: "www",
  server: {
    url: "https://freshclientapp.ngrok.app",
    //cleartext: true
  },
  android: {
    allowMixedContent: true,
  }
};


export default config;