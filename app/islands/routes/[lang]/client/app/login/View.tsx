import { Browser } from '@capacitor/browser';
import { config } from '@config/frontend/index.ts';
import { useEffect } from 'preact/hooks';
import { Props } from "@routes/[lang]/client/app/public/services/login/index.tsx";
import { App, URLOpenListenerEvent } from '@capacitor/app';

export default function ClientAppLoginIslandView({ data }: { data: Props }) {
  useEffect(() => {
    let appUrlOpenListener: any;

    const handleAppDeepLink = async (event: URLOpenListenerEvent) => {
      console.log('Deep link recibido:', event.url);

      try {
        await Browser.close();
        const url = new URL(event.url);
        const code = url.searchParams.get('code');
        console.log('Código de autenticación:', code);

        // Aquí manejas el código como necesites (ej: enviarlo a tu backend o navegar)
        // Ejemplo: redirigir a la app principal o dashboard
        globalThis.window.location.href = '/client'; // Cambia según tu flujo
      } catch (err) {
        console.error('Error procesando deep link:', err);
      }
    };

    // Listener para capturar el deep link cuando el backend redirige a la app
    appUrlOpenListener = App.addListener('appUrlOpen', handleAppDeepLink);

    // Abrir el navegador externo para login
    const openLogin = async () => {
      try {
        await Browser.open({ url: data.location });
      } catch (err) {
        console.error('Error abriendo navegador:', err);
      }
    };

    openLogin();

    return () => {
      if (appUrlOpenListener) {
        appUrlOpenListener.remove();
      }
    };
  }, [data.location]);

  return <></>;
}
