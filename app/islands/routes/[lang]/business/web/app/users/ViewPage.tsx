import { useSignal, Signal } from "@preact/signals";
import { useEffect, useState, useCallback, useMemo } from "preact/hooks";
import clsx from "clsx";
import useRPCAPI from "@islands/hooks/useRPCAPI.ts";
import { IGET_langBusinessWebAppUsersPayload } from "@routes/[lang]/business/web/app/users/_routes/_payload.ts";
import {
  PlusIcon,
  TrashIcon,
  FileChartColumnIncreasingIcon,
  FilterIcon,
  DownloadIcon,
  Loader2Icon,
  UsersIcon,
  ChevronDownIcon,
  ChefHatIcon,
  ShuffleIcon,
  HandPlatterIcon,
  StickyNoteIcon,
  XIcon, // NUEVO: Icono para cerrar el panel
} from "npm:lucide-preact@^0.485.0";

// --- Componentes y Tipos Reutilizables ---
import LangBusinessWebWWWIslandFooter from "@islands/routes/[lang]/business/web/www/Footer.tsx";
import LangBusinessWebWWWComponentNavbar from "@components/routes/lang/business/web/www/Navbar.tsx";
import Global_GenericSelect from "@islands/routes/[global]/GenericSelect.tsx";
import Global_ToggleSwitch from "../../../../../[global]/ToggleSwitch.tsx";
import { Tooltip } from "@islands/routes/[lang]/business/web/www/Tooltip.tsx";
import LangBusinessWebWWWIslandLineChart from '@islands/routes/[lang]/business/web/www/LineChart.tsx';
import LangBusinessWebWWWIslandHorizontalBarChart from '@islands/routes/[lang]/business/web/www/_examples/graphs/HorizontalBarChart.tsx';
import LangBusinessWebWWWIslandDoughnutChart from '@islands/routes/[lang]/business/web/www/DoughnutChart.tsx';
import LangBusinessWebWWWIslandRadarChart from '@islands/routes/[lang]/business/web/www/_examples/graphs/RadarChart.tsx';

// --- Constantes y Tipos ---
enum EmployeeRole {
  ALL = "ALL",
  WAITER = "WAITER",
  CHEF = "CHEF",
}

const editableRoleOptions = [
  { label: "Polivalente", value: EmployeeRole.ALL },
  { label: "Camarero", value: EmployeeRole.WAITER },
  { label: "Cocinero", value: EmployeeRole.CHEF },
];

type FilterRole = EmployeeRole | "VIEW_ALL";
const filterRoleOptions = [
  { label: "Ver todos los roles", value: "VIEW_ALL" },
  { label: "Camareros (incl. polivalentes)", value: EmployeeRole.WAITER },
  { label: "Cocineros (incl. polivalentes)", value: EmployeeRole.CHEF },
  { label: "Solo Polivalentes", value: EmployeeRole.ALL },
];

interface Employee {
  id: string;
  name: string;
  job: EmployeeRole;
  activated: boolean;
  businessId: string;
  createdAt: Date;
  updatedAt: Date;
}

type ActiveFilterStatus = null | boolean;


// --- Componente Raíz de la Página (MODIFICADO) ---
// Se simplifica la estructura, eliminando las pestañas y la barra lateral de navegación interna.
export default function LangBusinessWebAppUsersIslandViewPage({ data }: { data: IGET_langBusinessWebAppUsersPayload; }) {
  return (
    <div className="w-full h-screen flex flex-col bg-slate-50 overflow-hidden">
      <LangBusinessWebWWWComponentNavbar authenticated={true} />
      <main className="flex-1 w-full flex items-center justify-center p-4 lg:p-6 overflow-hidden">
        {/* El componente UserManagementView ahora contiene toda la lógica de la página */}
        <UserManagementView data={data} />
      </main>
    </div>
  );
}


// --- Vista Principal Unificada: Gestión y Análisis de Equipo (MODIFICADO) ---
function UserManagementView({ data }: { data: IGET_langBusinessWebAppUsersPayload }) {
  const listEmployees = useSignal<Employee[]>([]);
  const isListLoading = useSignal<boolean>(true);
  
  // NUEVO: Estado para saber qué empleado está seleccionado para ver sus análisis.
  // Si es `null`, se muestra el panel de creación.
  const selectedEmployeeForAnalytics = useSignal<Employee | null>(null);

  const showFilters = useSignal(false);
  const jobFilter = useSignal<FilterRole>("VIEW_ALL");
  const activatedFilter = useSignal<ActiveFilterStatus>(null);

  const { makeRequest: findEmployees, stateRequestSignal: findState } = useRPCAPI('/api/v1/model/BusinessEmployee/findMany', { method: "GET", zenstackQuery: true });
  const { makeRequest: updateEmployee } = useRPCAPI('/api/v1/model/BusinessEmployee/update', { method: "PUT" });
  const { makeRequest: deleteEmployee } = useRPCAPI('/api/v1/model/BusinessEmployee/delete', { method: "DELETE", zenstackQuery: true });
  const { makeRequest: createEmployee } = useRPCAPI('/api/v1/model/BusinessEmployee/create', { method: "POST" });

  const fetchEmployees = useCallback(() => {
    isListLoading.value = true;
    const where: any = { businessId: data.businessId };
    const selectedJob = jobFilter.value;

    if (selectedJob === EmployeeRole.WAITER) where.OR = [{ job: EmployeeRole.WAITER }, { job: EmployeeRole.ALL }];
    else if (selectedJob === EmployeeRole.CHEF) where.OR = [{ job: EmployeeRole.CHEF }, { job: EmployeeRole.ALL }];
    else if (selectedJob === EmployeeRole.ALL) where.job = EmployeeRole.ALL;

    if (activatedFilter.value !== null) where.activated = activatedFilter.value;
    
    findEmployees({ where, orderBy: { name: 'asc' } });
  }, [data.businessId, jobFilter.value, activatedFilter.value]);

  useEffect(() => { fetchEmployees() }, [fetchEmployees]);

  useEffect(() => {
    const { data, loading } = findState.value;
    if (data?.data && Array.isArray(data.data)) {
      listEmployees.value = data.data.map((e: any) => ({ ...e, createdAt: new Date(e.createdAt), updatedAt: new Date(e.updatedAt) }));
    }
    if (!loading) isListLoading.value = false;
  }, [findState.value]);

  const runCRUD = async (operation: Promise<any>) => {
    isListLoading.value = true;
    try {
      await operation;
      fetchEmployees();
    } catch (error: any) {
      console.error("Error en operación CRUD:", error);
      isListLoading.value = false;
    }
  };
  
  // MODIFICADO: Al eliminar un empleado, si era el que se estaba analizando, se cierra el panel.
  const onEmployeeDelete = (id: string) => {
    if (selectedEmployeeForAnalytics.value?.id === id) {
      selectedEmployeeForAnalytics.value = null;
    }
    runCRUD(deleteEmployee({ where: { id } }));
  }
  
  const onEmployeeUpdate = (id: string, updates: Partial<Employee>) => runCRUD(updateEmployee({ where: { id }, data: updates }));
  const onEmployeeCreate = (employeeData: Omit<Employee, 'id' | 'createdAt' | 'updatedAt'>) => runCRUD(createEmployee({ data: { ...employeeData, businessId: data.businessId } }));

  // MODIFICADO: El layout principal ahora es un grid que ocupa todo el contenedor.
  return (
    <div className="w-full max-w-7xl h-full grid grid-cols-1 lg:grid-cols-5 xl:grid-cols-3 gap-6 animate-fade-in">
      {/* Columna Izquierda: Lista de Empleados (sin cambios estructurales) */}
      <div className="lg:col-span-3 xl:col-span-2 w-full bg-white rounded-xl border border-slate-200 flex flex-col h-full overflow-hidden shadow-sm">
        <div className="flex-shrink-0 p-4 border-b border-slate-200 bg-white rounded-t-xl">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <UsersIcon className="w-6 h-6 text-gray-700" />
              <h2 className="text-xl font-bold text-gray-800">Miembros del Equipo</h2>
              <div className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full">
                {listEmployees.value.length}
              </div>
            </div>
            <Tooltip label={showFilters.value ? "Ocultar Filtros" : "Mostrar Filtros"}>
              <button onClick={() => showFilters.value = !showFilters.value} className={clsx("p-2 rounded-lg transition-all duration-200", showFilters.value ? "bg-blue-100 text-blue-600 shadow-sm" : "text-gray-500 hover:bg-gray-100 hover:text-gray-700")}>
                <FilterIcon className="w-5 h-5" />
              </button>
            </Tooltip>
          </div>
        </div>

        {showFilters.value && (
          <div className="flex-shrink-0 border-b border-slate-200 bg-gray-50/50">
            <FilterPanel jobFilter={jobFilter} activatedFilter={activatedFilter} />
          </div>
        )}
        
        <div className="flex-1 relative overflow-hidden">
          {isListLoading.value && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-20 backdrop-blur-sm">
              <div className="flex flex-col items-center gap-3">
                <Loader2Icon className="w-8 h-8 animate-spin text-blue-500" />
                <p className="text-sm text-gray-600 font-medium">Cargando empleados...</p>
              </div>
            </div>
          )}
          
          <div className={clsx("h-full overflow-y-auto overflow-x-hidden", "scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400", isListLoading.value && "opacity-50")}>
            <div className="p-4 space-y-3">
              {listEmployees.value.length > 0 ? (
                <>
                  {listEmployees.value.map((employee) => (
                    <EmployeeCard 
                      key={employee.id} 
                      employee={employee} 
                      onUpdate={onEmployeeUpdate} 
                      onDelete={onEmployeeDelete}
                      // NUEVO: Props para gestionar la selección de análisis
                      isSelected={selectedEmployeeForAnalytics.value?.id === employee.id}
                      onSelectForAnalytics={() => selectedEmployeeForAnalytics.value = employee}
                    />
                  ))}
                  <div className="h-4"></div>
                </>
              ) : (
                !isListLoading.value && (
                  <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-center px-4">
                     <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <UsersIcon className="w-8 h-8 text-gray-400" />
                     </div>
                     <h3 className="text-lg font-semibold text-gray-800 mb-2">No se encontraron empleados</h3>
                     <p className="text-sm text-gray-500 max-w-sm">{showFilters.value ? "Intenta ajustar los filtros para encontrar empleados." : "Añade tu primer empleado usando el panel de la derecha."}</p>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Columna Derecha: Panel de Acción Dinámico (MODIFICADO) */}
      <div className="lg:col-span-2 xl:col-span-1 w-full bg-white rounded-xl border border-slate-200 h-full overflow-hidden shadow-sm flex flex-col">
        {selectedEmployeeForAnalytics.value ? (
          // NUEVO: Si hay un empleado seleccionado, muestra su panel de análisis.
          <EmployeeAnalyticsPanel 
            employee={selectedEmployeeForAnalytics.value} 
            onClose={() => selectedEmployeeForAnalytics.value = null}
          />
        ) : (
          // Si no, muestra el panel para crear un nuevo empleado.
          <ViewCreateEmployee data={data} createEmployee={onEmployeeCreate} isLoading={isListLoading} />
        )}
      </div>
    </div>
  );
}

// --- NUEVO: Panel de Análisis de Empleado ---
function EmployeeAnalyticsPanel({ employee, onClose }: { employee: Employee; onClose: () => void; }) {
  return (
    <div className="w-full h-full flex flex-col animate-fade-in">
      {/* Header Fijo */}
      <div className="flex-shrink-0 flex justify-between items-start p-4 border-b bg-white">
        <div className="flex-1 min-w-0">
            <h2 className="flex items-center text-xl font-bold text-gray-800 gap-2">
                <FileChartColumnIncreasingIcon className="w-6 h-6 text-blue-600" />
                <span>Análisis de Rendimiento</span>
            </h2>
            <p className="text-sm text-gray-500 truncate mt-1" title={employee.name}>{employee.name}</p>
            <div className="mt-2">
                <RoleBadge role={employee.job} />
            </div>
        </div>
        <Tooltip label="Cerrar análisis">
            <button
              onClick={onClose}
              aria-label="Cerrar análisis"
              className="p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700 rounded-lg transition-colors"
            >
              <XIcon className="w-5 h-5" />
            </button>
        </Tooltip>
      </div>
      
      {/* Contenido Scrolleable */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-gray-50 hover:scrollbar-thumb-gray-300">
        <div className="grid grid-cols-1 gap-6">
          {/* Aquí irían los gráficos reales, con datos del 'employee' */}
          <div>
            <h3 className="text-base font-semibold text-gray-700 mb-2">Productividad Mensual</h3>
            <LangBusinessWebWWWIslandLineChart />
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-700 mb-2">Distribución de Tareas</h3>
            <LangBusinessWebWWWIslandDoughnutChart />
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-700 mb-2">Habilidades Clave</h3>
            <LangBusinessWebWWWIslandRadarChart />
          </div>
           <div>
            <h3 className="text-base font-semibold text-gray-700 mb-2">Satisfacción del Cliente</h3>
            <LangBusinessWebWWWIslandHorizontalBarChart />
          </div>
        </div>
        <div className="h-4"></div> {/* Espaciado final */}
      </div>
       {/* Footer con acciones */}
       <div className="flex-shrink-0 p-4 border-t bg-gray-50/70 rounded-b-xl">
          <button
            onClick={() => { /* Lógica de descarga aquí */ }}
            aria-label="Descargar análisis del empleado"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all flex items-center justify-center gap-2"
          >
            <DownloadIcon className="w-5 h-5" />
            <span>Descargar Informe</span>
          </button>
        </div>
    </div>
  );
}


// --- Componentes Hijos (EmployeeCard MODIFICADO) ---

function EmployeeCard({ employee, onUpdate, onDelete, isSelected, onSelectForAnalytics }: { employee: Employee, onUpdate: (id: string, updates: Partial<Employee>) => void, onDelete: (id: string) => void, isSelected: boolean, onSelectForAnalytics: () => void }) {
  const [isEditingRole, setIsEditingRole] = useState(false);
  
  // MODIFICADO: Se usa `clsx` para aplicar estilos condicionales si la tarjeta está seleccionada.
  return (
    <div className={clsx(
      "w-full flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-white border rounded-xl transition-all duration-300 gap-4 group",
      isSelected 
        ? "border-blue-400 shadow-lg ring-2 ring-blue-200/50 bg-blue-50/30" 
        : "border-gray-200 hover:shadow-md hover:border-blue-300"
    )}>
      <div className="flex-grow flex items-center gap-4">
        <div className={clsx(
          "w-1 h-12 rounded-full transition-all duration-300", 
          employee.activated ? "bg-green-500" : "bg-gray-300",
          isSelected && "shadow-sm"
        )}></div>
        <div className="min-w-0 flex-1">
          <input type="text" defaultValue={employee.name} onBlur={(e) => onUpdate(employee.id, { name: e.currentTarget.value })} className="font-bold text-lg text-gray-800 bg-transparent focus:outline-none focus:bg-gray-50 rounded-md p-2 -m-2 w-full transition-colors duration-200" placeholder="Nombre del empleado" />
          <div className="relative mt-2">
            {isEditingRole ? (
              <Global_GenericSelect autoFocus className="!w-auto" options={editableRoleOptions} value={employee.job} onChange={(v: string) => { onUpdate(employee.id, { job: v as EmployeeRole }); setIsEditingRole(false); }} onBlur={() => setIsEditingRole(false)} />
            ) : (
              <button onClick={() => setIsEditingRole(true)} className="flex items-center hover:bg-gray-50 rounded-md p-1 -m-1 transition-colors duration-200">
                <RoleBadge role={employee.job} />
                <ChevronDownIcon className="w-3.5 h-3.5 ml-2 text-gray-400 group-hover:text-gray-600 transition-colors" />
              </button>
            )}
          </div>
        </div>
      </div>
      {/* MODIFICADO: Se añade el botón de análisis */}
      <div className="flex items-center gap-1 sm:gap-2 shrink-0 self-end sm:self-center">
        <Tooltip label="Ver análisis">
          <button onClick={onSelectForAnalytics} className={clsx("p-2 rounded-lg transition-all duration-200", isSelected ? "bg-blue-100 text-blue-600" : "text-gray-400 hover:text-blue-600 hover:bg-blue-50")}>
            <FileChartColumnIncreasingIcon className="w-5 h-5" />
          </button>
        </Tooltip>
        <Tooltip label={employee.activated ? "Desactivar empleado" : "Activar empleado"}>
          <button onClick={() => onUpdate(employee.id, { activated: !employee.activated })} className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-200">
            <Global_ToggleSwitch checked={employee.activated} onChange={() => {}} />
          </button>
        </Tooltip>
        <Tooltip label="Eliminar empleado">
          <button onClick={() => onDelete(employee.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200">
            <TrashIcon className="w-5 h-5" />
          </button>
        </Tooltip>
      </div>
    </div>
  );
}


// --- Componentes Hijos (Sin cambios, solo se listan por completitud) ---

function FilterPanel({ jobFilter, activatedFilter }: { jobFilter: Signal<FilterRole>, activatedFilter: Signal<ActiveFilterStatus> }) {
  const statusOptions = [ { label: 'Todos', value: null }, { label: 'Activos', value: true }, { label: 'Inactivos', value: false } ];
  return (
    <div className="p-4 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Global_GenericSelect label="Filtrar por rol" options={filterRoleOptions} value={jobFilter.value} onChange={(v: string) => jobFilter.value = v as FilterRole} />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Filtrar por estado</label>
          <div className="flex bg-gray-200 rounded-lg p-1 w-full">
            {statusOptions.map(({ label, value }) => (
              <button key={label} onClick={() => activatedFilter.value = value} className={clsx("flex-1 text-center text-sm py-2 px-1 rounded-md transition-all duration-200", activatedFilter.value === value ? "bg-white shadow-sm text-blue-600 font-semibold transform scale-95" : "text-gray-600 hover:bg-gray-300/50")}>
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ViewCreateEmployee({ data, createEmployee, isLoading: isListLoading }: { data: IGET_langBusinessWebAppUsersPayload, createEmployee: Function, isLoading: Signal<boolean> }) {
  const [name, setName] = useState('');
  const [job, setJob] = useState<EmployeeRole>(EmployeeRole.WAITER);
  const [error, setError] = useState('');
  const isLoading = useSignal(false);
  useEffect(() => { isLoading.value = isListLoading.value }, [isListLoading.value]);
  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    if (!name.trim()) { setError('El nombre es requerido'); return; }
    isLoading.value = true; setError('');
    try {
      await createEmployee({ name: name.trim(), job, activated: true });
      setName(''); setJob(EmployeeRole.WAITER);
    } catch (err: any) {
      setError(`Error: ${err.message || 'Desconocido'}`);
    }
  };
  return (
    <div className="h-full flex flex-col animate-fade-in">
      <div className="flex-shrink-0 p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-xl">
        <div className="text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3"><PlusIcon className="w-6 h-6 text-blue-600" /></div>
          <h2 className="text-xl font-bold text-gray-800">Añadir Empleado</h2>
          <p className="text-sm text-gray-600 mt-1">Crea un nuevo miembro para tu equipo</p>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center p-6">
        <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nombre completo</label>
              <input type="text" value={name} onInput={(e) => setName(e.currentTarget.value)} placeholder="Ej: María García" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:bg-gray-100" disabled={isLoading.value} />
            </div>
            <div>
              <Global_GenericSelect label="Rol del empleado" options={editableRoleOptions} value={job} onChange={(v: string) => setJob(v as EmployeeRole)} disabled={isLoading.value} />
            </div>
          </div>
          <button type="submit" disabled={isLoading.value || !name.trim()} className="w-full flex items-center justify-center gap-2 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]">
            {isLoading.value ? (<Loader2Icon className="w-5 h-5 animate-spin" />) : (<PlusIcon className="w-5 h-5" />)}
            <span className="font-medium">{isLoading.value ? 'Creando empleado...' : 'Añadir Empleado'}</span>
          </button>
          {error && (<div className="p-3 bg-red-50 border border-red-200 rounded-lg"><p className="text-red-600 text-sm text-center font-medium">{error}</p></div>)}
        </form>
      </div>
    </div>
  );
}

function RoleBadge({ role }: { role: EmployeeRole }) {
  const { label, icon, color } = useMemo(() => {
    switch (role) {
      case EmployeeRole.CHEF: return { label: "Cocinero", icon: <ChefHatIcon className="w-4 h-4 mr-1.5" />, color: "bg-red-100 text-red-700 border-red-200" };
      case EmployeeRole.WAITER: return { label: "Camarero", icon: <HandPlatterIcon className="w-4 h-4 mr-1.5" />, color: "bg-purple-100 text-purple-700 border-purple-200" };
      case EmployeeRole.ALL: return { label: "Polivalente", icon: <ShuffleIcon className="w-4 h-4 mr-1.5" />, color: "bg-yellow-100 text-yellow-800 border-yellow-200" };
      default: return { label: "Desconocido", icon: null, color: "bg-gray-100 text-gray-700 border-gray-200" };
    }
  }, [role]);
  return (<span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium border transition-colors duration-200 ${color}`}>{icon}{label}</span>);
}