import { useMemo, useEffect, useState, useRef, useCallback } from 'preact/hooks';
import { XIcon, SearchIcon, ListIcon, GridIcon, PackageIcon, CalendarIcon, DollarSignIcon, TruckIcon, AlertTriangleIcon, CheckCircleIcon, ArchiveIcon, ClockIcon, LoaderIcon, PlusIcon } from "npm:lucide-preact@^0.485.0";
import { useProductSettingsStore } from '@islands/routes/[lang]/business/web/app/dashboard/inventory/[stores]/storeProductSettings.ts';
import useRPCAPI from '@islands/hooks/useRPCAPI.ts';
import { BusinessProductStockBatch } from './ProductsSettings.tsx'; // Asumiendo que la interfaz está aquí
import clsx from 'npm:clsx@^2.1.1';
import Global_GenericSelect from '@islands/routes/[global]/GenericSelect.tsx';

// --- Constantes y Tipos ---
const PAGE_SIZE = 20; // Número de lotes a cargar por página

// Tipo para el estado de la petición, para más claridad
type RequestState<T> = {
    loading: boolean;
    data: T | null;
    error: Error | null;
};

// --- Componente Principal del Modal ---
export default function LangBusinessWebAppDashboardInventoryIslandProductsSettingsEditorStock() {
    
    // --- State Management ---
    const { setOpenModalSettingsEditorStock, productIdSelectedSettingsEditorStock } = useProductSettingsStore();
    const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
    const [openCreateBatch, setOpenCreateBatch] = useState<boolean>(false);
    
    // --- Paginación e Infinite Scroll ---
    const [batches, setBatches] = useState<BusinessProductStockBatch[]>([]);
    const [page, setPage] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const observer = useRef<IntersectionObserver>();

    // --- API Hook ---
    const { makeRequest: findProductStockBatches, stateRequestSignal } = useRPCAPI<{ data: BusinessProductStockBatch[], count: number }>('/api/v1/model/BusinessProductStockBatch/findMany', {
        method: "GET",
        zenstackQuery: true
    });
    
    // --- Lógica de Carga de Datos ---
    const loadBatches = useCallback(async (currentPage: number, search: string) => {
        if (!productIdSelectedSettingsEditorStock) return;

        const whereClause = {
            productId: productIdSelectedSettingsEditorStock,
            ...(search && {
                OR: [
                    { batchNumber: { contains: search, mode: 'insensitive' } },
                    { supplier: { name: { contains: search, mode: 'insensitive' } } }
                ]
            })
        };

        await findProductStockBatches({
            where: whereClause,
            include: { supplier: true },
            orderBy: { expirationDate: 'asc' },
            take: PAGE_SIZE,
            skip: currentPage * PAGE_SIZE
        });
    }, [productIdSelectedSettingsEditorStock, findProductStockBatches]);

    // --- Efecto para Debounce de la Búsqueda ---
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
            setPage(0); // Resetear paginación al buscar
            setBatches([]); // Limpiar lotes actuales
            setHasMore(true); // Permitir cargar nuevos resultados
        }, 300); // 300ms de espera antes de buscar

        return () => clearTimeout(handler);
    }, [searchTerm]);

    // --- Efecto para Cargar Datos al cambiar búsqueda o página ---
    useEffect(() => {
        if (hasMore) {
            loadBatches(page, debouncedSearchTerm);
        }
    }, [page, debouncedSearchTerm, loadBatches, hasMore]);


    // --- Efecto para Procesar la Respuesta de la API ---
    // --- Efecto para Procesar la Respuesta de la API (CORREGIDO) ---
    useEffect(() => {
        const state = stateRequestSignal.value;
        if (!state.loading && state.data) {
            const newBatches = state.data.data || [];
            const total = state.data.count || 0;

            setTotalCount(total);
            setHasMore((batches.length + newBatches.length) < total);

            // Lógica robusta para evitar duplicados
            setBatches(prev => {
                if (page === 0) {
                    return newBatches; // Para búsquedas nuevas, simplemente reemplaza.
                }

                // Crea un Set con los IDs existentes para una búsqueda rápida y eficiente.
                const existingIds = new Set(prev.map(b => b.id));

                // Filtra los lotes nuevos para quedarte solo con los que no existen ya.
                const uniqueNewBatches = newBatches.filter(b => !existingIds.has(b.id));

                return [...prev, ...uniqueNewBatches];
            });
        }
    }, [stateRequestSignal.value.data]); // Depender solo de los datos para evitar re-ejecuciones innecesarias.
    
    // --- Lógica del Infinite Scroll (Intersection Observer) ---
    const loaderRef = useCallback((node: HTMLDivElement) => {
        if (stateRequestSignal.value.loading) return;
        if (observer.current) observer.current.disconnect();
        
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPage(prevPage => prevPage + 1);
            }
        });

        if (node) observer.current.observe(node);
    }, [stateRequestSignal.value.loading, hasMore]);


    return (
        <div className="fixed inset-0 w-full h-full bg-black bg-opacity-50 z-[999] flex justify-center items-center animate-fade-in">
            <div className="flex flex-col w-[90%] md:w-[80%] lg:w-[70%] max-w-6xl h-[90%] bg-gray-50 rounded-2xl shadow-2xl overflow-hidden">
                
                {/* Header Fijo */}
                <div className="flex-shrink-0 p-6 border-b bg-white rounded-t-2xl">
                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800">Gestión de Stock del Producto</h2>
                            <p className="text-sm text-gray-600 mt-1">
                                Visualiza, añade y gestiona los lotes. Total de lotes: {totalCount}
                            </p>
                        </div>
                        <button
                            onClick={setOpenModalSettingsEditorStock}
                            className="p-3 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition-colors">
                            <XIcon size={24}/>
                        </button>
                    </div>
                </div>

                {/* Barra de Herramientas Fija */}
                <div className="flex-shrink-0 p-4 border-b bg-white space-y-4">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                        <div className="relative w-full sm:w-auto flex flex-row flex-1 max-w-md gap-x-2">
                            <SearchIcon size={20} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Buscar por nº de lote, proveedor..."
                                value={searchTerm}
                                onInput={(e) => setSearchTerm((e.target as HTMLInputElement).value)}
                                className="w-full p-3 pl-11 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                            />
                            <button
                            onClick={() => setOpenCreateBatch(!openCreateBatch)}
                            className={"p-4 rounded-xl bg-orange-100 text-orange-500"}>
                                <PlusIcon/>
                            </button>
                        </div>
                        <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                            <button
                                onClick={() => setViewMode("list")}
                                className={clsx("px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2", viewMode === "list" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900")}>
                                <ListIcon size={16} /> Lista
                            </button>
                            <button
                                onClick={() => setViewMode("grid")}
                                className={clsx("px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2", viewMode === "grid" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900")}>
                                <GridIcon size={16} /> Cuadrícula
                            </button>
                        </div>
                    </div>
                </div>

                {/* Contenido Scrolleable */}
                <div className="flex-1 overflow-y-auto p-6">
                    {
                        openCreateBatch && (
                            <CreateStockBatchItem batch={{
                                id: '',
                                batchNumber: '',
                                status: 'AVAILABLE',
                                count: 0,
                                originalCount: 0,
                                costPerUnit: 0,
                                expirationDate: '',
                                purchaseDate: '',
                                supplier: mockSelectSuppliers[0].value
                            }} />
                        )
                    }
                    {batches.length > 0 ? (
                        <div className={clsx(
                            viewMode === 'grid'
                                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                                : "flex flex-col space-y-4"
                        )}>
                            {batches.map(batch => (
                                viewMode === 'grid'
                                    ? <StockBatchGridItem key={batch.id} batch={batch} />
                                    : <StockBatchListItem key={batch.id} batch={batch} />
                            ))}
                        </div>
                    ) : (
                        !stateRequestSignal.value.loading && (
                             <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
                                <PackageIcon size={48} className="mb-4 text-gray-300"/>
                                <h3 className="text-xl font-semibold text-gray-700">No se encontraron lotes</h3>
                                <p>Prueba a cambiar los términos de búsqueda o añade un nuevo lote.</p>
                             </div>
                        )
                    )}

                    {/* Loader para Infinite Scroll */}
                    <div ref={loaderRef} className="h-10 flex justify-center items-center">
                       {stateRequestSignal.value.loading && <LoaderIcon className="animate-spin text-orange-500" />}
                       {!hasMore && batches.length > 0 && <span className="text-sm text-gray-500">Fin de los resultados</span>}
                    </div>
                </div>
            </div>
        </div>
    );
}


// --- Componentes de Visualización de Lotes ---

interface StockBatchItemProps {
    batch: BusinessProductStockBatch;
}

// Formateador de fecha simple
const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
};

// Componente para el chip de estado
const StatusChip = ({ status }: { status: BusinessProductStockBatch['status'] }) => {
    const statusInfo = useMemo(() => {
        switch (status) {
            case 'AVAILABLE': return { text: 'Disponible', icon: <CheckCircleIcon size={14} />, color: 'bg-green-100 text-green-800' };
            case 'RESERVED': return { text: 'Reservado', icon: <ArchiveIcon size={14} />, color: 'bg-blue-100 text-blue-800' };
            case 'EXPIRED': return { text: 'Vencido', icon: <AlertTriangleIcon size={14} />, color: 'bg-red-100 text-red-800' };
            case 'CONSUMED': return { text: 'Consumido', icon: <PackageIcon size={14} />, color: 'bg-gray-100 text-gray-800' };
            case 'DAMAGED': return { text: 'Dañado', icon: <AlertTriangleIcon size={14} />, color: 'bg-yellow-100 text-yellow-800' };
            default: return { text: 'Desconocido', icon: <PackageIcon size={14}/>, color: 'bg-gray-100 text-gray-800' };
        }
    }, [status]);
    
    return (
        <span className={clsx("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium", statusInfo.color)}>
            {statusInfo.icon} {statusInfo.text}
        </span>
    );
};

// --- Vista en Cuadrícula ---
const StockBatchGridItem = ({ batch }: StockBatchItemProps) => (
    <div className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col gap-y-3 hover:shadow-md hover:border-orange-300 transition-all duration-300">
        <div className="flex justify-between items-start">
            <div>
                <p className="text-xs text-gray-500">Lote</p>
                <p className="font-bold text-gray-800">{batch.batchNumber || 'N/A'}</p>
            </div>
            <StatusChip status={batch.status} />
        </div>
        <div className="space-y-2 text-sm">
            <div className="flex justify-between">
                <span className="text-gray-500 flex items-center gap-1"><PackageIcon size={14}/> Cantidad</span>
                <span className="font-medium text-gray-700">{batch.count} / {batch.originalCount}</span>
            </div>
            <div className="flex justify-between">
                <span className="text-gray-500 flex items-center gap-1"><DollarSignIcon size={14}/> Coste/Ud</span>
                <span className="font-medium text-gray-700">{batch.costPerUnit || '0.00'} €</span>
            </div>
             <div className="flex justify-between">
                <span className="text-gray-500 flex items-center gap-1"><TruckIcon size={14}/> Proveedor</span>
                <span className="font-medium text-gray-700 truncate">{batch.supplier?.name || 'N/A'}</span>
            </div>
        </div>
        <div className="border-t pt-2 mt-auto space-y-2 text-sm">
             <div className="flex justify-between">
                <span className="text-gray-500 flex items-center gap-1"><CalendarIcon size={14}/> Compra</span>
                <span className="font-medium text-gray-700">{formatDate(batch.purchaseDate)}</span>
            </div>
            <div className="flex justify-between">
                <span className="text-gray-500 flex items-center gap-1"><ClockIcon size={14}/> Vencimiento</span>
                <span className="font-medium text-red-600">{formatDate(batch.expirationDate)}</span>
            </div>
        </div>
    </div>
);


const mockSelectSuppliers = [
    { label: "Local", value: "id977e90uau" }
]

// --- Vista en Lista ---
const StockBatchListItem = ({ batch }: StockBatchItemProps) => {
  const [expirationDate, setExpirationDate] = useState(batch.expirationDate);
  const [isValid, setIsValid] = useState(true);

  const validateDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return !isNaN(d.getTime());
  };

  useEffect(() => {
    setIsValid(validateDate(expirationDate));
  }, [expirationDate]);

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 hover:bg-gray-50 transition-colors duration-200">
      
      {/* Info Principal */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-4">
          <input
            value={batch.batchNumber || 'N/A'}
            className="font-bold text-lg text-gray-800 w-32 border-none bg-gray-50 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-400"
          />
          <StatusChip status={batch.status} />
        </div>
        <div className="text-sm text-gray-500 mt-2 flex items-center gap-x-2">
          <span>Proveedor:</span>
          <Global_GenericSelect
            className="!w-48 bg-gray-50 border rounded px-2 py-1"
            options={mockSelectSuppliers}
            defaultValue={mockSelectSuppliers[0].value}
          />
        </div>
      </div>

      {/* Detalles */}
      <div className="flex-shrink-0 flex flex-wrap sm:flex-nowrap items-center gap-x-6 gap-y-2 text-sm">

        {/* Cantidad */}
        <div className="text-center flex flex-col items-center">
          <p className="text-gray-500 mb-1">Cantidad</p>
          <div className="flex items-center gap-x-1">
            <input
              type="text"
              value={batch.count}
              className="font-semibold text-gray-800 w-16 text-center border border-gray-200 rounded px-1 py-0.5 focus:outline-none focus:ring-1 focus:ring-blue-400"
            />
            <span>/</span>
            <input
              type="text"
              value={batch.originalCount}
              className="font-semibold text-gray-800 w-16 text-center border border-gray-200 rounded px-1 py-0.5 focus:outline-none focus:ring-1 focus:ring-blue-400"
            />
          </div>
        </div>

        {/* Coste por unidad */}
        <div className="text-center flex flex-col items-center">
          <p className="text-gray-500 mb-1">Coste/Ud</p>
          <div className="flex items-center gap-x-1">
            <input
              type="text"
              value={batch.costPerUnit || '0.00'}
              className="font-semibold text-gray-800 w-20 text-center border border-gray-200 rounded px-1 py-0.5 focus:outline-none focus:ring-1 focus:ring-blue-400"
            />
            <span>€</span>
          </div>
        </div>

        {/* Vencimiento */}
        <div className="text-center flex flex-col items-center">
          <p className="text-gray-500 mb-1">Vencimiento</p>
          <input
            type="text"
            value={expirationDate}
            onChange={(e) => setExpirationDate(e.target.value)}
            className={`font-semibold text-center w-28 border border-gray-200 rounded px-1 py-0.5 focus:outline-none focus:ring-1 focus:ring-blue-400 ${
              isValid ? 'text-gray-800' : 'text-red-600'
            }`}
            placeholder="AAAA-MM-DD"
          />
        </div>

      </div>
    </div>
  );
};



const CreateStockBatchItem = ({ batch }: StockBatchItemProps) => {
  const [expirationDate, setExpirationDate] = useState(batch.expirationDate);
  const [isValid, setIsValid] = useState(true);

  const validateDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return !isNaN(d.getTime());
  };

  useEffect(() => {
    setIsValid(validateDate(expirationDate));
  }, [expirationDate]);

  return (
    <div className="mb-4 bg-orange-50 border border-orange-600 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 hover:bg-orange-100 transition-colors duration-200">
      
      {/* Info Principal */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-4">
          <input
            value={batch.batchNumber}
            placeholder={"LOTE-105..."}
            className="font-bold text-lg text-gray-800 w-32 border-none bg-orange-50 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-orange-400"
          />
          <StatusChip status={batch.status} />
        </div>
        <div className="text-sm text-gray-500 mt-2 flex items-center gap-x-2">
          <span>Proveedor:</span>
          <Global_GenericSelect
            className="!w-48 bg-orange-50 border rounded px-2 py-1"
            options={mockSelectSuppliers}
            defaultValue={mockSelectSuppliers[0].value}
          />
        </div>
      </div>

      {/* Detalles */}
      <div className="flex-shrink-0 flex flex-wrap sm:flex-nowrap items-center gap-x-6 gap-y-2 text-sm">

        {/* Cantidad */}
        <div className="text-center flex flex-col items-center">
          <p className="text-gray-500 mb-1">Cantidad</p>
          <div className="flex items-center gap-x-1">
            <input
              type="number"
              value={batch.count === 0 ? '' : batch.count}
              placeholder={"Cantidad Actual"}
              className="font-semibold text-gray-800 w-36 text-center border border-gray-200 rounded px-1 py-0.5 focus:outline-none focus:ring-1 focus:ring-orange-400"
            />
            <span>/</span>
            <input
              type="number"
              placeholder={"Cantidad Total Inicial"}
              value={batch.originalCount === 0 ? '' : batch.originalCount}
              className="font-semibold text-gray-800 w-44 text-center border border-orange-200 rounded px-1 py-0.5 focus:outline-none focus:ring-1 focus:ring-orange-400"
            />
          </div>
        </div>

        {/* Coste por unidad */}
        <div className="text-center flex flex-col items-center">
          <p className="text-gray-500 mb-1">Coste/Ud</p>
          <div className="flex items-center gap-x-1">
            <input
              type="number"
              value={batch.costPerUnit || 0.00}
              className="font-semibold text-gray-800 w-20 text-center border border-orange-200 rounded px-1 py-0.5 focus:outline-none focus:ring-1 focus:ring-orange-400"
            />
            <span>€</span>
          </div>
        </div>

        {/* Vencimiento */}
        <div className="text-center flex flex-col items-center">
          <p className="text-gray-500 mb-1">Vencimiento</p>
          <input
            type="text"
            value={expirationDate}
            onChange={(e) => setExpirationDate(e.target.value)}
            className={`font-semibold text-center w-28 border border-gray-200 rounded px-1 py-0.5 focus:outline-none focus:ring-1 focus:ring-orange-400 ${
              isValid ? 'text-gray-800' : 'text-red-600'
            }`}
            placeholder="AAAA-MM-DD"
          />
        </div>

      </div>
    </div>
  );
};
