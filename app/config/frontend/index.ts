
const baseUrlHttp = "https://10.241.157.225";
const baseUrlWs = "wss://10.241.157.225";
const keycloakEndpoint = `${baseUrlHttp}:8187`;
const backendEndpoint = `${baseUrlHttp}:8000`;
const backendEndpointWs = `${baseUrlWs}:8000`;


const businessTeams = [
    {
        "name": "sales",
        "email": "sales@cafebuy.com",
        "phone": "123-456-7890",
        role: "Equipo de Ventas",
        description: "Nuestros expertos en ventas están dedicados a encontrar las mejores soluciones para tu negocio, impulsando tu crecimiento con estrategias personalizadas.",
    },
    {
        "name": "customer_service",
        "email": "customerservice@cafebuy.com",
        "phone": "987-654-3210",
        role: "Atención al Cliente",
        description: "Un equipo comprometido con tu satisfacción, ofreciendo soporte rápido y eficiente para resolver cualquier consulta.",
    },
    {
        "name": "technical_support",
        "email": "technicalsupporte@cafebuy.com",
        "phone": null,
        role: "Soporte Técnico",
        description: "Especialistas en tecnología que garantizan el funcionamiento óptimo de nuestras soluciones, listos para asistirte en todo momento.",
    },
    {
        "name": "billing",
        "email": "billing@cafebuy.com",
        "phone": null,
        role: "Facturación",
        description: "Gestionamos tus necesidades financieras con transparencia y precisión, asegurando una experiencia sin complicaciones.",
    },
    {
        "name": "marketing",
        "email": "marketing@cafebuy.com",
        "phone": null,
        "role": "Marketing",
        "description": "Creativos y estrategas que potencian la visibilidad de tu marca con campañas innovadoras y efectivas.",
    },
    {
        "name": "hr",
        "email": "hr@cafebuy.com",
        "phone": null,
        "role": "Recursos Humanos",
        "description": "Fomentamos un entorno laboral inclusivo y dinámico, atrayendo y apoyando al mejor talento para CafeBuy.",
    }
];

const mainApiConfigPort = 3800;
const mainApiConfigHost = "10.241.157.225";
const mainApiConfigSSL = true;
const mainApiVersion = "v1";


export const config = {
    mainApiConfig: {
        port: mainApiConfigPort,
        host: mainApiConfigHost,
        version: mainApiVersion,
    },
    mainApiUrl: `${mainApiConfigSSL ? "https" : "http"}://${mainApiConfigHost}:${mainApiConfigPort}`,
    keycloakEndpoint,
    backendEndpoint,
    backendEndpointWs,
    businessTeams
};

console.log(config);