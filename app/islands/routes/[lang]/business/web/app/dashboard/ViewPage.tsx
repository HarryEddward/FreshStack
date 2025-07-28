import { useSignal } from "@preact/signals";
import BusinessIslandLogoNavbar from '@islands/routes/[lang]/business/LogoNavbar.tsx';
import { EyeIcon, FileTextIcon, ImagePlusIcon, Phone, ReceiptIcon, Smartphone } from "npm:lucide-preact@^0.485.0";
import LogoNavbar from "@islands/routes/[lang]/client/LogoNavbar.tsx";
import Navbar from "@components/Navbar.tsx";
import Global_QrScanner from "../../../../../[global]/QRScanner.tsx";
import QrCode from "../../../../../[global]/QrSvg.tsx";
import LangBusinessWebWWWComponentNavbar from "@components/routes/lang/business/web/www/Navbar.tsx";
import LangBusinessWebWWWIslandFooter from '@islands/routes/[lang]/business/web/www/Footer.tsx';
import { useEffect } from 'preact/hooks';
import { Tooltip } from "../../www/Tooltip.tsx";

// Marcar el componente como un island
export const config = {
  island: true,
};

export default function LangBusinessWebAppDashboardIslandViewPage({ actualLang }: { actualLang: string }) {
  // Estado para la imagen de fondo
  const backgroundImage = useSignal<string>("/img/business/top_photo.png");
  // Estado para las coordenadas del cursor
  const cursorCoords = useSignal<{ x: number; y: number } | null>(null);
  // Estado para los puntos
  const points = useSignal<{ x: number; y: number; label: string; type: string }[]>([]);
  // Estado para el índice del punto que se está arrastrando
  const draggingPointIndex = useSignal<number | null>(null);

  const qrPhone = useSignal<string[]>([crypto.randomUUID()]);

  const orders = useSignal<{ id: string; name: string; product: string }[]>([
    { id: crypto.randomUUID(), name: "20", product: "Café con leche" },
    { id: crypto.randomUUID(), name: "1", product: "Té verde" },
  ]);

  const showOrders = useSignal<boolean>(true);



  // Función para manejar la subida de la imagen
  const handleImageUpload = (e: Event) => {
    const input = e.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      // Validar que el archivo sea una imagen
      if (file.type.startsWith("image/")) {
        const imageUrl = URL.createObjectURL(file);
        backgroundImage.value = imageUrl;
      } else {
        alert("Por favor, selecciona un archivo de imagen válido.");
      }
    }
  };

  // Función para calcular coordenadas relativas
  const calculateRelativeCoords = (e: MouseEvent, target: HTMLImageElement) => {
    const rect = target.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100; // Porcentaje X
    const y = ((e.clientY - rect.top) / rect.height) * 100; // Porcentaje Y
    return { x: Number(x.toFixed(2)), y: Number(y.toFixed(2)) };
  };

  // Resto de las funciones (handleMouseMove, handlePointMouseDown, etc.) permanecen igual
  const handleMouseMove = (e: MouseEvent) => {
    const target = e.currentTarget as HTMLImageElement;
    const coords = calculateRelativeCoords(e, target);
    cursorCoords.value = coords;

    if (draggingPointIndex.value !== null) {
      points.value = points.value.map((point, i) =>
        i === draggingPointIndex.value ? { ...point, x: coords.x, y: coords.y } : point
      );
    }
  };

  const handlePointMouseDown = (index: number) => (e: MouseEvent) => {
    e.stopPropagation();
    draggingPointIndex.value = index;
  };

  const handleMouseUp = () => {
    draggingPointIndex.value = null;
  };

  const handleClick = (e: MouseEvent) => {
    if (draggingPointIndex.value === null && cursorCoords.value) {
      points.value = [
        ...points.value,
        {
          x: cursorCoords.value.x,
          y: cursorCoords.value.y,
          label: `${points.value.length + 1}`,
          type: Math.random() < 0.5 ? "phone" : "smartphone",
        },
      ];
    }
  };

  const handleMouseLeave = () => {
    cursorCoords.value = null;
    draggingPointIndex.value = null;
  };

  const handleLabelChange = (index: number, newLabel: string) => {
    points.value = points.value.map((point, i) =>
      i === index ? { ...point, label: newLabel } : point
    );
  };

  const handleDeletePoint = (index: number) => {
    points.value = points.value.filter((_, i) => i !== index);
  };

  useEffect(() => {
    setInterval(() => {
      orders.value = [
         //.slice(-5), // conserva solo los últimos 5
        {
          id: crypto.randomUUID(),
          name: `${Math.floor(Math.random() * 100)}`,
          product: ["Capuccino", "Té negro", "Coca-Cola", "Empanada"][Math.floor(Math.random() * 4)],

        },
        ...orders.value,
      ];
    }, 4000); // cada 4 segundos

  }, [])
  


  return (
    <div className={"w-full h-full overflow-x-hidden"}>
    
    <div className="w-full flex flex-col">
      {/* Sección de la imagen ocupando toda la pantalla */}
      <div className="w-full h-screen relative overflow-hidden">
        <img
          className="w-full h-full object-cover select-none"
          src={backgroundImage.value} // Usar el estado para la imagen de fondo
          alt="Background photo"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onClick={handleClick}
          onMouseUp={handleMouseUp}
        />
        <button
          onClick={() => (showOrders.value = !showOrders.value)}
          className="absolute bottom-4 left-4 z-50 bg-white bg-opacity-60 hover:bg-opacity-90 backdrop-blur px-3 py-2 rounded-lg shadow-md transition-all"
        >
          {showOrders.value ? "➖" : "Ver pedidos"}
        </button>

        {/* Chat visual tipo Twitch con pedidos */}
        <div
          className={`absolute bottom-0 right-0 p-4 w-72 h-full overflow-y-auto overflow-x-hidden flex flex-col gap-2 z-50 transition-transform duration-500 ease-in-out ${
            showOrders.value ? "translate-x-0" : "translate-x-full"
          } bg-white bg-opacity-40 backdrop-blur-lg`}
        >
          {orders.value.map((order) => (
            <div
              key={order.id}
              className="backdrop-blur-xl text-black text-sm px-3 py-2 rounded-lg animate-fade-up shadow-lg w-full flex justify-between items-center"
            >
              <div>
                <span className="font-semibold bg-white border-2 p-4 text-2xl">{order.name}</span>
              </div>
               <div className={"flex flex-row justify-center items-center gap-x-3"}>
                <Tooltip label="Factura simplificada">
                  <button>
                    <ReceiptIcon/>
                  </button>
                </Tooltip>
                
                <Tooltip label="Número de mesa">
                  <button>
                    <FileTextIcon/>
                  </button>
                </Tooltip>

                <Tooltip label="Ver pedido">
                  <button>
                    <EyeIcon/>
                  </button>
                </Tooltip>
                
               </div>
            </div>
          ))}
        </div>


        {/* Puntos predefinidos */}
        {points.value.map((point, index) => (
          <div
            key={index}
            className={`absolute border-2 w-auto h-auto py-1 rounded-lg transform ${
              point.type === "phone" ? "bg-red-500" : "bg-blue-500 animate-rotate-vibrate"
            } cursor-grab ${draggingPointIndex.value === index ? "cursor-grabbing" : ""}`}
            style={{
              left: `${point.x}%`,
              top: `${point.y}%`,
            }}
            title={point.label}
            onMouseDown={handlePointMouseDown(index)}
          >
            {point.type === "phone" ? <Smartphone /> : <Phone />}
            <span className="absolute text-xs text-white bg-black bg-opacity-50 px-1 rounded hidden sm:block left-full ml-1 select-none">
              {point.label}
            </span>
          </div>
        ))}
        {/* Mostrar coordenadas en hover */}
        {cursorCoords.value && (
          <div className="absolute top-4 left-4 bg-black bg-opacity-75 text-white text-sm px-2 py-1 rounded z-10 select-none">
            X: {cursorCoords.value.x}% | Y: {cursorCoords.value.y}%
          </div>
        )}
      </div>


      <LangBusinessWebWWWComponentNavbar authenticated={true}/>

      {/* Sección de contenido debajo de la imagen */}
      {/* Navbar */}

      <div className="w-full max-w-7xl mx-auto px-4 py-8 flex flex-col gap-y-6">  
        {/*<div className="w-full flex justify-between items-center">
          <BusinessIslandLogoNavbar />
          <div className="relative">
            <input
              type="file"
              id="imageUpload"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
            <label
              htmlFor="imageUpload"
              className="p-4 border-2 rounded-lg cursor-pointer flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <ImagePlusIcon className="w-6 h-6" />
            </label>
          </div>
        </div>*/}

        {/* Lista de coordenadas como cards */}
        <div className="w-full flex flex-col items-center">
          <h2 className="text-xl font-bold mb-4">Lista de Coordenas & Licencias</h2>
          {points.value.length === 0 ? (
            <p className="text-gray-500">No hay puntos agregados.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {points.value.map((point, index) => (
                <div
                  key={index}
                  className="flex flex-col p-4 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="flex flex-col justify-evenly h-full min-h-48 gap-2">
                    <div className="text-sm font-semibold">
                      X: {point.x}% | Y: {point.y}%
                    </div>
                    <input
                      type="text"
                      value={point.label}
                      onInput={(e) =>
                        handleLabelChange(index, e.currentTarget.value)
                      }
                      className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Nombre de la mesa"
                    />
                    <QrCode text={"hola que tal"}/>
                    <button
                      onClick={() => handleDeletePoint(index)}
                      className="mt-2 py-3 w-full bg-red-500 text-white text-sm font-medium py-1 px-2 rounded hover:bg-red-600 transition-colors"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
    <LangBusinessWebWWWIslandFooter/>
    </div>
  );
}