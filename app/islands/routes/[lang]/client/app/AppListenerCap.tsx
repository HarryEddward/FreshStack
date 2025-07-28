
import { App } from '@capacitor/app';


export default function AppListenerCap() {
    
    App.addListener('appUrlOpen', (event) => {
        console.log('Deep link opened:', event.url);
        // Aquí puedes redirigir dentro de Fresh (si usas algún router)
    });

}
