import { Browser } from '@capacitor/browser';
import { config } from '@config/frontend/index.ts';
import { useEffect } from 'preact/hooks';


export default function ClientApp_Login_IslandView({ data }: { data: Props }) {
    
    const openCapacitorSite = async () => {
        await Browser.open({ url: config.keycloakEndpoint });
    };
    
    useEffect(() => {
        
    }, []);
  
    return (
    <div>
        <button
        onClick={openCapacitorSite}
        >
            openCapacitorSite
        </button>
    </div>
  )
}
