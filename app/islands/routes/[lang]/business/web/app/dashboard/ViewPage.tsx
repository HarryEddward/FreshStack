// @ts-nocheck
import { useSignal } from "@preact/signals";
import {
  EyeIcon,
  FileTextIcon,
  ReceiptIcon,
  Smartphone,
  Square,
  CalculatorIcon,
  Menu,
  X,
  BoxesIcon,
  ContactRoundIcon,
  Edit2Icon,
} from "npm:lucide-preact@^0.485.0";
import LangBusinessWebWWWComponentNavbar from "@components/routes/lang/business/web/www/Navbar.tsx";
import LangBusinessWebWWWIslandFooter from '@islands/routes/[lang]/business/web/www/Footer.tsx';
import { useEffect, useRef } from 'preact/hooks';
import { Tooltip } from "../../www/Tooltip.tsx";
import QrCode from "../../../../../[global]/QrSvg.tsx";
import LangBusinessWebAppDashboardIslandCalculator from "@islands/routes/[lang]/business/web/app/dashboard/Calculator.tsx";
import useRPCAPI from '@islands/hooks/useRPCAPI.ts';
import useRPCAPIRequestList from '@islands/hooks/useRPCAPIRequestList.ts';
import { IGET_langBusinessWebAppDashboardPayload } from "@routes/[lang]/business/web/app/dashboard/_routes/_payload.ts";
import { handleRedirect } from "@utils/frontend/redirect.ts";

export const config = {
  island: true,
};

interface IPoint {
  id: string;
  x: number;
  y: number;
  label: string;
  type: "mobile" | "fixed";
}

interface IOrderUbication {
  id: string;
  title: string;
  position_x: string;
  position_y: string;
  type: "PHONE" | "STATIC";
}

interface ICards {
  title: string;
  description: string;
  icon: JSX.Element;
  redirect: () => void;
}
const cards: ICards[] = [
    {
      title: "Inventario",
      description: "Gestiona tu inventario de productos.",
      icon: <BoxesIcon className="text-sky-500 w-10 h-10" />,
      redirect: (lang) => handleRedirect("/business/web/app/dashboard/inventory", lang),
    },
    {
      title: "Proveedores",
      description: "Administra tus proveedores y contactos.",
      icon: <ContactRoundIcon className="text-green-600 w-10 h-10" />,
      redirect: (lang) => handleRedirect("/business/web/app/dashboard/suppliers", lang),
    }
];

// Componente reutilizable para las tarjetas de ubicación
function UbicationCard({ point, onLabelChange, onDelete }) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleEditClick = () => {
    inputRef.current?.focus();
    inputRef.current?.select();
  };

  return (
    <div className="border rounded-lg p-3 bg-white/80 hover:shadow-lg transition-shadow duration-200 flex flex-col gap-2">
      <div className="flex justify-between items-center">
        {/* MEJORA UX: Input de tipo 'number' y placeholder actualizado */}
        <input
          ref={inputRef}
          type="number" // Cambiado a number para guiar al usuario
          value={point.label}
          onInput={(e) => onLabelChange(point.id, e.currentTarget.value)}
          className="font-bold w-full bg-transparent border-b border-transparent hover:border-gray-300 focus:border-blue-500 focus:outline-none text-gray-800 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          placeholder="Nº de Mesa"
        />
        <div className="flex items-center ml-2 flex-shrink-0 gap-1">
           <Tooltip label="Editar Número">
            <button onClick={handleEditClick} className="text-gray-500 hover:text-blue-600">
              <Edit2Icon size={16} />
            </button>
          </Tooltip>
          <Tooltip label="Eliminar">
            <button
              onClick={() => onDelete(point.id)}
              className="text-gray-500 hover:text-red-600"
              aria-label="Eliminar"
            >
              <X size={18} />
            </button>
          </Tooltip>
        </div>
      </div>
      
      <div className="mt-2 flex justify-center items-center flex-col">
        <div className="p-2 rounded-lg bg-gray-50">
           <QrCode text={`ID: ${point.id} | Mesa: ${point.label}`} size={100} />
        </div>
        <span className="text-xs text-gray-500 mt-2 font-mono select-all">ID: {point.id}</span>
      </div>
    </div>
  );
}

// Componente para el icono del punto con el número superpuesto
function PointIcon({ point }: { point: IPoint }) {
  const IconComponent = point.type === 'mobile' ? Smartphone : Square;
  const iconColor = point.type === 'mobile' ? 'fill-blue-600' : 'fill-green-600';
  
  return (
    <div className="relative flex justify-center items-center">
      <IconComponent
        className={`${iconColor} text-white drop-shadow-lg`}
        size={50} // Aumentamos un poco el tamaño para que el número quepa mejor
      />
      <span className="absolute text-white font-bold text-lg select-none pointer-events-none" style={{ textShadow: '0px 1px 3px rgba(0,0,0,0.5)' }}>
        {point.label}
      </span>
    </div>
  );
}

export default function LangBusinessWebAppDashboardIslandViewPage({
  actualLang,
  data
}: {
  actualLang: string,
  data: IGET_langBusinessWebAppDashboardPayload
}) {
  const backgroundImage = useSignal<string>("/img/business/top_photo.png");
  const points = useSignal<IPoint[]>([]);
  const draggingPointIndex = useSignal<number | null>(null);
  const placementMode = useSignal<'mobile' | 'fixed' | null>(null);

  const showLeftPanel = useSignal<boolean>(false);
  const showRightPanel = useSignal<boolean>(false);
  const showOrders = useSignal<boolean>(false);
  const showCalculator = useSignal<boolean>(false);

  const orders = useSignal<{ id: string; name: string; product: string }[]>([
    { id: crypto.randomUUID(), name: "20", product: "Café con leche" },
  ]);

  const { makeRequest: findUbications, revalidate: revalidateUbications, stateRequestSignal: stateFindUbications } = useRPCAPI('/api/v1/model/BusinessOrderUbication/findMany', { method: "GET", zenstackQuery: true });
  const { makeRequest: createUbication } = useRPCAPI('/api/v1/private/services/zenstack/BusinessOrderUbication/create', { method: "POST", zenstackQuery: true });
  const { makeRequest: updateUbication } = useRPCAPI('/api/v1/model/BusinessOrderUbication/update', { method: "PUT", zenstackQuery: true });
  const { makeRequest: deleteUbication } = useRPCAPI('/api/v1/model/BusinessOrderUbication/delete', { method: "DELETE", zenstackQuery: true });

  useRPCAPIRequestList([
    () => findUbications({ where: { businessId: data.businessId } }),
  ]);

  useEffect(() => {
    const apiData = stateFindUbications.value.data?.data;
    if (apiData && Array.isArray(apiData)) {
      points.value = apiData.map((ubication: IOrderUbication) => ({
        id: ubication.id,
        x: parseFloat(ubication.position_x),
        y: parseFloat(ubication.position_y),
        label: ubication.title,
        type: ubication.type === 'PHONE' ? 'mobile' : 'fixed',
      }));
    }
  }, [stateFindUbications.value.data]);

  const redirectInventory = () => {
    globalThis.window.location.href = `/${data.actualLang}/business/web/app/dashboard/inventory`;
  }

  const redirectSuppliers = () => {
    globalThis.window.location.href = `/${data.actualLang}/business/web/app/dashboard/suppliers`;
  }

  const calculateRelativeCoords = (e: MouseEvent, target: HTMLElement) => {
    const rect = target.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    return { x: Number(x.toFixed(2)), y: Number(y.toFixed(2)) };
  };

  const handleImageClick = async (e: MouseEvent) => {
    if (!placementMode.value) return;
    
    // MEJORA UX: Calcular el siguiente número de mesa disponible
    const existingNumbers = points.value
      .map(p => parseInt(p.label, 10))
      .filter(num => !isNaN(num));
    const maxNumber = existingNumbers.length > 0 ? Math.max(...existingNumbers) : 0;
    const newLabel = (maxNumber + 1).toString();

    const target = e.currentTarget as HTMLImageElement;
    const coords = calculateRelativeCoords(e, target);
    const newUbicationPayload = {
      data: {
        title: newLabel, // Usamos el nuevo número como título
        position_x: String(coords.x),
        position_y: String(coords.y),
        type: placementMode.value === 'mobile' ? 'PHONE' : 'STATIC',
        businessId: data.businessId,
      }
    };

    

    await createUbication(newUbicationPayload);
    revalidateUbications();
    placementMode.value = null;
  };

  const handleDeletePoint = async (id: string) => {
    if (!confirm("¿Estás seguro de que quieres eliminar esta ubicación?")) return;
    await deleteUbication({ where: { id } });
    revalidateUbications();
  };

  const handleMouseUp = () => {
    if (draggingPointIndex.value !== null) {
      const point = points.value[draggingPointIndex.value];
      if (point) {
        updateUbication({
          where: { id: point.id },
          data: {
            position_x: String(point.x),
            position_y: String(point.y),
          }
        });
      }
    }
    draggingPointIndex.value = null;
    document.body.style.cursor = 'default';
  };
  
  const handleLabelChange = (id: string, newLabel: string) => {
    const pointIndex = points.value.findIndex(p => p.id === id);
    if (pointIndex !== -1) {
      const allPoints = [...points.value];
      allPoints[pointIndex] = { ...allPoints[pointIndex], label: newLabel };
      points.value = allPoints;

      updateUbication({
        where: { id },
        data: { title: newLabel }
      });
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (draggingPointIndex.value !== null) {
      const target = e.currentTarget as HTMLImageElement;
      const coords = calculateRelativeCoords(e, target);
      const allPoints = [...points.value];
      const pointToDrag = allPoints[draggingPointIndex.value];
      if (pointToDrag) {
        pointToDrag.x = coords.x;
        pointToDrag.y = coords.y;
        points.value = allPoints;
      }
    }
  };

  const handlePointMouseDown = (index: number) => (e: MouseEvent) => {
    e.stopPropagation();
    draggingPointIndex.value = index;
    document.body.style.cursor = 'grabbing';
  };

  const handleMouseLeave = () => {
    if (draggingPointIndex.value !== null) {
      handleMouseUp();
    }
  };

  const togglePlacementMode = (mode: 'mobile' | 'fixed') => {
    placementMode.value = placementMode.value === mode ? null : mode;
  };

  const toggleLeftPanel = () => { showLeftPanel.value = !showLeftPanel.value; };
  const toggleRightPanel = () => { showRightPanel.value = !showRightPanel.value; };
  const toggleCalculator = () => { showCalculator.value = !showCalculator.value; };

  useEffect(() => {
    return () => { document.body.style.cursor = 'default'; };
  }, []);

  const mobilePoints = points.value.filter(p => p.type === 'mobile');
  const fixedPoints = points.value.filter(p => p.type === 'fixed');
  const showOverlay = showLeftPanel.value || showRightPanel.value || showOrders.value || showCalculator.value;

  useEffect(() => {
    const intervalId = setInterval(() => {
      orders.value = [
        {
          id: crypto.randomUUID(),
          name: `${Math.floor(Math.random() * 100)}`,
          product: ["Capuccino", "Té negro", "Coca-Cola", "Empanada"][Math.floor(Math.random() * 4)],
        },
        ...orders.value,
      ];
    }, 4000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={"w-full h-full overflow-x-hidden"}>
      {showOverlay && (
        <div className="fixed inset-0 z-20 bg-black bg-opacity-50 transition-opacity duration-300"></div>
      )}

      <div className="w-full flex flex-col h-screen">
        <div className="w-full h-full flex flex-1 overflow-hidden relative">
          
          {/* Panel Izquierdo (Móviles) */}
          <div
            className={`bg-white bg-opacity-80 backdrop-blur-lg shadow-2xl z-40 transition-all duration-300 ease-in-out overflow-y-auto flex flex-col ${
              showLeftPanel.value ? 'w-72 md:w-80' : 'w-0 opacity-0'
            }`}
          >
            <div className="p-4 flex justify-between items-center border-b sticky top-0 bg-white/80 backdrop-blur-lg z-10">
              <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                <Smartphone size={20} className="text-blue-600"/> Teléfonos
              </h3>
              <button onClick={toggleLeftPanel} className="p-1 rounded-full hover:bg-gray-200 transition-colors">
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 p-2">
              {mobilePoints.length === 0 ? (
                <p className="text-gray-500 text-sm p-2 text-center mt-4">Añade un punto móvil desde el mapa.</p>
              ) : (
                <div className="grid grid-cols-1 gap-3">
                  {mobilePoints.map((point) => (
                    <UbicationCard 
                      key={point.id}
                      point={point}
                      onLabelChange={handleLabelChange}
                      onDelete={handleDeletePoint}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {/* Área Central */}
          <div className="relative flex-1 overflow-hidden">
            <img
              className={`w-full h-full object-cover select-none transition-all ${
                placementMode.value ? 'cursor-crosshair filter brightness-90' : ''
              }`}
              src={backgroundImage.value}
              alt="Background photo"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onMouseUp={handleMouseUp}
              onClick={handleImageClick}
            />

            {/* Botones de control de paneles */}
            <button
              onClick={toggleLeftPanel}
              className="absolute top-4 left-4 z-20 bg-white/70 hover:bg-white backdrop-blur-md p-2.5 rounded-xl shadow-lg transition-all border border-gray-200/50 hover:scale-105 active:scale-95"
              aria-label="Mostrar panel de Teléfonos"
            >
              <Menu size={22} className="text-gray-700"/>
            </button>
            <button
              onClick={toggleRightPanel}
              className="absolute top-4 right-4 z-20 bg-white/70 hover:bg-white backdrop-blur-md p-2.5 rounded-xl shadow-lg transition-all border border-gray-200/50 hover:scale-105 active:scale-95"
              aria-label="Mostrar panel de Lugares Fijos"
            >
              <Menu size={22} className="text-gray-700"/>
            </button>

            {/* Isla de Controles inferior */}
            <div className="absolute bottom-4 left-4 z-20 flex items-center gap-x-2 bg-white/70 backdrop-blur-md rounded-2xl shadow-xl p-2 border border-gray-200/50">
              <Tooltip label="Calculadora">
                <button onClick={toggleCalculator} className={`p-3 rounded-xl transition-all ${showCalculator.value ? 'bg-blue-500 text-white shadow-inner' : 'hover:bg-gray-200/70'}`} aria-label="Mostrar calculadora">
                  <CalculatorIcon size={24} />
                </button>
              </Tooltip>
              <Tooltip label={showOrders.value ? "Ocultar Pedidos" : "Ver Pedidos"}>
                <button onClick={() => (showOrders.value = !showOrders.value)} className={`p-3 rounded-xl transition-all ${showOrders.value ? 'bg-blue-500 text-white shadow-inner' : 'hover:bg-gray-200/70'}`}>
                  <ReceiptIcon size={24} />
                </button>
              </Tooltip>
              <div class="h-8 w-px bg-gray-300 mx-2"></div>
              <Tooltip label="Colocar Teléfono">
                <button onClick={() => togglePlacementMode('mobile')} className={`p-3 rounded-xl transition-all ${placementMode.value === 'mobile' ? 'bg-blue-500 text-white shadow-inner ring-2 ring-blue-300' : 'hover:bg-gray-200/70'}`}>
                  <Smartphone size={24} />
                </button>
              </Tooltip>
              <Tooltip label="Colocar Lugar Fijo">
                <button onClick={() => togglePlacementMode('fixed')} className={`p-3 rounded-xl transition-all ${placementMode.value === 'fixed' ? 'bg-blue-500 text-white shadow-inner ring-2 ring-blue-300' : 'hover:bg-gray-200/70'}`}>
                  <Square size={24} />
                </button>
              </Tooltip>
            </div>
            
            {/* Panel de la Calculadora */}
            <div className={`fixed bottom-20 left-4 bg-white/0 backdrop-blur-lg shadow-xl rounded-2xl z-30 transition-all duration-300 ease-in-out ${showCalculator.value ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}`}>
              <button onClick={toggleCalculator} className="absolute top-2 right-2 z-40 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 shadow-md" aria-label="Cerrar calculadora">
                <X size={16} />
              </button>
              <div className="p-4 pt-8">
                {showCalculator.value && <LangBusinessWebAppDashboardIslandCalculator onClose={toggleCalculator} />}
              </div>
            </div>
            
            {/* Panel de Pedidos */}
            <div className={`absolute bottom-0 right-0 p-4 w-72 h-full overflow-y-auto flex flex-col gap-2 z-50 transition-transform duration-500 ease-in-out ${showOrders.value ? "translate-x-0" : "translate-x-full"} bg-white/60 backdrop-blur-lg`}>
              <h3 className="font-bold mb-2">Pedidos</h3>
              {orders.value.map((order) => (
                <div key={order.id} className="backdrop-blur-xl bg-white/70 text-black text-sm px-3 py-2 rounded-lg animate-fade-up shadow-lg w-full flex justify-between items-center">
                  <Tooltip label="Calcular precio del pedido">
                    <button>
                      <span className="font-semibold bg-white border p-3 text-xl rounded-md">{order.name}</span>
                    </button>
                  </Tooltip>
                  <div className={"flex flex-row justify-center items-center gap-x-3"}>
                    <Tooltip label="Factura simplificada"><button className="p-2 hover:bg-gray-200/50 rounded-full"><ReceiptIcon/></button></Tooltip>
                    <Tooltip label="Número de mesa"><button className="p-2 hover:bg-gray-200/50 rounded-full"><FileTextIcon/></button></Tooltip>
                    <Tooltip label="Ver pedido"><button className="p-2 hover:bg-gray-200/50 rounded-full"><EyeIcon/></button></Tooltip>
                  </div>
                </div>
              ))}
            </div>
            
            {/* MEJORA UI: Mapeo de puntos con el nuevo componente de icono */}
            {points.value.map((point, index) => (
              <div
                key={point.id}
                className={`absolute w-auto h-auto transform cursor-grab transition-all duration-100 ${draggingPointIndex.value === index ? "cursor-grabbing scale-110 z-10" : ""}`}
                style={{
                  left: `${point.x}%`,
                  top: `${point.y}%`,
                  transform: `translate(-50%, -50%)`,
                }}
                title={`Mesa ${point.label}`}
                onMouseDown={handlePointMouseDown(index)}
              >
                <PointIcon point={point} />
              </div>
            ))}
          </div>

          {/* Panel Derecho (Lugares Fijos) */}
          <div className={`bg-white bg-opacity-80 backdrop-blur-lg shadow-2xl z-40 transition-all duration-300 ease-in-out overflow-y-auto flex flex-col ${showRightPanel.value ? 'w-72 md:w-80' : 'w-0 opacity-0'}`}>
            <div className="p-4 flex justify-between items-center border-b sticky top-0 bg-white/80 backdrop-blur-lg z-10">
              <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                <Square size={20} className="text-green-600"/> Lugares Fijos
              </h3>
              <button onClick={toggleRightPanel} className="p-1 rounded-full hover:bg-gray-200 transition-colors">
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 p-2">
              {fixedPoints.length === 0 ? (
                <p className="text-gray-500 text-sm p-2 text-center mt-4">Añade un lugar fijo desde el mapa.</p>
              ) : (
                <div className="grid grid-cols-1 gap-3">
                  {fixedPoints.map((point) => (
                     <UbicationCard 
                      key={point.id}
                      point={point}
                      onLabelChange={handleLabelChange}
                      onDelete={handleDeletePoint}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col z-[999]">
          <LangBusinessWebWWWComponentNavbar actualLang={actualLang} authenticated={true} />
         <div className="w-full min-h-[50vh] flex justify-center items-center p-4 bg-gray-50 border-t">
            <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 gap-8 py-8">
              {cards.map((card) => (
                <button key={card.title} onClick={() => card.redirect(data.actualLang)} className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-start gap-4 border hover:shadow-xl hover:scale-[1.02] transition-all duration-300 select-none">
                  <div className="bg-gray-100 rounded-full p-3 shadow-inner">
                    {card.icon}
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">{card.title}</h2>
                  <p className="text-gray-600 text-lg text-left">{card.description}</p>
                </button>
              ))}
            </div>
          </div>
      </div>
      
      <LangBusinessWebWWWIslandFooter/>
    </div>
  );
}