// Componente Files optimizado con cache y throttling
import { useState, useMemo, useEffect, useRef, useCallback } from 'preact/hooks';
import { useSignal } from '@preact/signals';
import clsx from "clsx";
import {
  FilesIcon,
  FileTextIcon,
  ImageIcon,
  FileArchiveIcon,
  FolderArchiveIcon,
  DownloadIcon,
  Trash2Icon,
  SearchIcon,
  Loader2Icon,
} from "npm:lucide-preact@^0.485.0";
import prettyBytes from 'npm:pretty-bytes';
import useRPCAPI from '@islands/hooks/useRPCAPI.ts';
import useRPCAPIRequestList from '@islands/hooks/useRPCAPIRequestList.ts';

type FileType = 'WEBP' | 'PDF';

interface GroupByResult {
  mimeType: FileType;
  _count: { mimeType: number };
}

interface BusinessFile {
  id: string;
  name: string;
  path: string;
  mimeType: 'WEBP' | 'PDF';
  hash: string;
  sizeBytes: number;
  businessId: string;
  createdAt: string;
  updatedAt: string;
}

// Cache para archivos con filtros como clave
interface FilesCache {
  [key: string]: {
    files: BusinessFile[];
    totalCount: number;
    lastPage: number;
    hasMore: boolean;
    timestamp: number;
  };
}

const FileListItem = ({ file }: { file: BusinessFile }) => {
  const getFileIcon = (mimeType: string) => {
    switch (mimeType) {
      case "PDF": return <FileTextIcon className="text-red-500 w-6 h-6" />;
      case "WEBP": return <ImageIcon className="text-blue-500 w-6 h-6" />;
      default: return <FilesIcon className="text-gray-500 w-6 h-6" />;
    }
  };

  return (
    <div className="flex items-center p-4 hover:bg-gray-50 rounded-xl transition-all duration-200 border border-transparent hover:border-gray-200 hover:shadow-sm group">
      <div className="flex-shrink-0 mr-4">{getFileIcon(file.mimeType)}</div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-gray-800 truncate">{file.name}</p>
        <p className="text-sm text-gray-500">
          {prettyBytes(file.sizeBytes)} • {new Date(file.createdAt).toLocaleDateString()}
        </p>
      </div>
      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <button 
          title="Descargar" 
          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
        >
          <DownloadIcon size={18} />
        </button>
        <button 
          title="Eliminar" 
          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
        >
          <Trash2Icon size={18} />
        </button>
      </div>
    </div>
  );
};

const FileGridItem = ({ file }: { file: BusinessFile }) => {
  const getFileIcon = (mimeType: string) => {
    switch (mimeType) {
      case "PDF": return <FileTextIcon size={32} className="text-red-500" />;
      case "WEBP": return <ImageIcon size={32} className="text-blue-500" />;
      default: return <FilesIcon size={32} className="text-gray-500" />;
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-blue-300 transition-all duration-300 flex flex-col items-center text-center group">
      <div className="mb-4 p-3 bg-gray-50 rounded-full group-hover:bg-gray-100 transition-colors duration-200">
        {getFileIcon(file.mimeType)}
      </div>
      <h3 className="font-medium text-gray-800 text-sm mb-2 line-clamp-2 min-h-[2.5rem] flex items-center">
        {file.name}
      </h3>
      <p className="text-xs text-gray-500 mb-2">{prettyBytes(file.sizeBytes)}</p>
      <p className="text-xs text-gray-400 mb-4">{new Date(file.createdAt).toLocaleDateString()}</p>
      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <button 
          title="Descargar" 
          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
        >
          <DownloadIcon size={16} />
        </button>
        <button 
          title="Eliminar" 
          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
        >
          <Trash2Icon size={16} />
        </button>
      </div>
    </div>
  );
};

export const LangBusinessWebAppConfigurationsViewPageIslandFilesSettings = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  
  // Signals para estado reactivo
  const files = useSignal<BusinessFile[]>([]);
  const currentPage = useSignal(0);
  const hasMore = useSignal(true);
  const loading = useSignal(false);
  const initialLoad = useSignal(true);
  const totalCount = useSignal(0);
  
  // Cache para archivos
  const filesCache = useSignal<FilesCache>({});
  
  // Referencias para throttling y debounce
  const searchTimeoutRef = useRef<number | null>(null);
  const lastRequestTime = useRef(0);
  const requestQueue = useRef<Promise<any> | null>(null);

  const TAKE = 10;
  const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos
  const SEARCH_DEBOUNCE_MS = 300;
  const THROTTLE_MS = 500;

  // Hook para la API de archivos
  const { 
    makeRequest: findFiles, 
    stateRequestSignal: filesState 
  } = useRPCAPI<{ data: BusinessFile[]; count: number }>('/api/v1/model/BusinessFile/findMany', { 
    method: "GET", 
    zenstackQuery: true 
  });

  // Hook para contar archivos por tipo
  const { 
    makeRequest: findCountFilterMimeType, 
    stateRequestSignal: countFilterMimeTypeState 
  } = useRPCAPI<{ data: GroupByResult[] }>('/api/v1/model/BusinessFile/groupBy', { 
    method: "GET", 
    zenstackQuery: true
  });

  // Cargar conteos iniciales
  useRPCAPIRequestList([
    () => findCountFilterMimeType({
      by: ["mimeType"],
      _count: { "mimeType": true }
    })
  ]);

  // Debounce para búsqueda
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, SEARCH_DEBOUNCE_MS);

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchTerm]);

  // Generar clave de cache
  const generateCacheKey = useCallback((search: string, filter: string) => {
    return `${search}_${filter}`;
  }, []);

  // Verificar si hay datos en cache válidos
  const getCachedData = useCallback((search: string, filter: string) => {
    const key = generateCacheKey(search, filter);
    const cached = filesCache.value[key];
    
    if (cached && (Date.now() - cached.timestamp < CACHE_DURATION)) {
      return cached;
    }
    return null;
  }, [generateCacheKey]);

  // Guardar datos en cache
  const setCachedData = useCallback((search: string, filter: string, data: {
    files: BusinessFile[];
    totalCount: number;
    lastPage: number;
    hasMore: boolean;
  }) => {
    const key = generateCacheKey(search, filter);
    filesCache.value = {
      ...filesCache.value,
      [key]: {
        ...data,
        timestamp: Date.now()
      }
    };
  }, [generateCacheKey]);

  // Construir query para API
  const buildQuery = useCallback((currentPage: number, search: string, filter: string) => {
    const skip = currentPage * TAKE;
    const where: any = {};
    
    if (search.trim()) {
      where.name = { contains: search.trim(), mode: 'insensitive' };
    }
    
    if (filter !== 'all') {
      where.mimeType = filter;
    }

    return {
      skip,
      take: TAKE,
      where,
      orderBy: { createdAt: 'desc' },
    };
  }, []);

  // Función principal para cargar archivos con throttling
  const loadFiles = useCallback(async (reset = false, search = debouncedSearchTerm, filter = typeFilter) => {
    const now = Date.now();
    
    // Throttling: evitar requests muy frecuentes
    if (now - lastRequestTime.current < THROTTLE_MS && requestQueue.current) {
      await requestQueue.current;
    }

    if (loading.value && !reset) return;

    // Para búsquedas, siempre hacer request fresh (no usar cache)
    const isSearch = search.trim() !== "";
    
    // Para filtros sin búsqueda, verificar cache primero
    if (!isSearch && !reset) {
      const cached = getCachedData(search, filter);
      if (cached && currentPage.value <= cached.lastPage) {
        // Usar datos del cache
        if (reset) {
          files.value = cached.files.slice(0, TAKE);
          currentPage.value = 0;
        } else {
          const startIndex = currentPage.value * TAKE;
          const endIndex = startIndex + TAKE;
          const newFiles = cached.files.slice(startIndex, endIndex);
          files.value = [...files.value, ...newFiles];
        }
        
        hasMore.value = cached.hasMore;
        totalCount.value = cached.totalCount;
        currentPage.value = reset ? 1 : currentPage.value + 1;
        return;
      }
    }

    loading.value = true;
    const pageToLoad = reset ? 0 : currentPage.value;
    lastRequestTime.current = now;

    const requestPromise = (async () => {
      try {
        const query = buildQuery(pageToLoad, search, filter);
        await findFiles(query);
        
        if (filesState.value.data) {
          const newFiles = filesState.value.data.data || [];
          const newTotalCount = filesState.value.data.count || 0;
          
          if (reset) {
            files.value = newFiles;
            currentPage.value = 1;
            totalCount.value = newTotalCount;
            
            // Para filtros sin búsqueda, guardar en cache
            if (!isSearch) {
              setCachedData(search, filter, {
                files: newFiles,
                totalCount: newTotalCount,
                lastPage: 0,
                hasMore: newFiles.length === TAKE
              });
            }
          } else {
            const updatedFiles = [...files.value, ...newFiles];
            files.value = updatedFiles;
            currentPage.value = pageToLoad + 1;
            
            // Actualizar cache si no es búsqueda
            if (!isSearch) {
              setCachedData(search, filter, {
                files: updatedFiles,
                totalCount: newTotalCount,
                lastPage: pageToLoad,
                hasMore: newFiles.length === TAKE
              });
            }
          }
          
          hasMore.value = newFiles.length === TAKE;
        }
      } catch (error) {
        console.error('Error cargando archivos:', error);
        if (reset) {
          files.value = [];
          totalCount.value = 0;
        }
      } finally {
        loading.value = false;
        initialLoad.value = false;
      }
    })();

    requestQueue.current = requestPromise;
    await requestPromise;
  }, [debouncedSearchTerm, typeFilter, buildQuery, findFiles, getCachedData, setCachedData, filesState.value.data]);

  // Effect para cargar archivos cuando cambian los filtros
  useEffect(() => {
    files.value = [];
    currentPage.value = 0;
    hasMore.value = true;
    
    loadFiles(true, debouncedSearchTerm, typeFilter);
  }, [debouncedSearchTerm, typeFilter]);

  // Intersection Observer para scroll infinito
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore.value && !loading.value && !initialLoad.value) {
          loadFiles(false);
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [hasMore.value, loading.value, initialLoad.value, loadFiles]);

  // Memoizar tipos de archivo para filtros
  const fileTypes = useMemo(() => {
    const countMimeTypesData: GroupByResult[] =
      countFilterMimeTypeState.value.data?.data || [];

    const initialTypes: { value: FileType; label: string; count: number }[] = [
      { value: 'WEBP', label: 'WEBP', count: 0 },
      { value: 'PDF', label: 'PDF', count: 0 },
    ];

    const countAllFiles = initialTypes.map(type => {
      const found = countMimeTypesData.find(row => row.mimeType === type.value);
      return {
        ...type,
        count: found ? found._count.mimeType : 0,
      };
    });

    return [
      { 
        value: 'all', 
        label: 'Todos', 
        count: countMimeTypesData.reduce((sum, row) => sum + row._count.mimeType, 0) 
      },
      ...countAllFiles,
    ];
  }, [countFilterMimeTypeState.value.data]);

  const getTypeIcon = (mimeType: string) => {
    switch (mimeType) {
      case "WEBP": return <ImageIcon size={16} className="text-blue-500" />;
      case "PDF": return <FileTextIcon size={16} className="text-red-500" />;
      default: return <FilesIcon size={16} className="text-gray-500" />;
    }
  };

  // Manejadores de eventos
  const handleSearchChange = (e: Event) => {
    const target = e.currentTarget as HTMLInputElement;
    setSearchTerm(target.value);
  };

  const handleTypeFilterChange = (newFilter: string) => {
    setTypeFilter(newFilter);
  };

  return (
    <div className="h-full flex flex-col animate-fade-in overflow-hidden">
      {/* Header Fijo */}
      <div className="flex-shrink-0 p-6 border-b bg-gradient-to-r from-purple-50 to-violet-50 rounded-t-lg">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
            <FilesIcon className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Archivos de la Empresa</h2>
            <p className="text-sm text-gray-600 mt-1">
              Gestiona todos tus documentos
              {totalCount.value > 0 && (
                <span className="ml-2 px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
                  {totalCount.value} archivo{totalCount.value !== 1 ? 's' : ''}
                </span>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Barra de Herramientas Fija */}
      <div className="flex-shrink-0 p-6 border-b bg-white">
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <SearchIcon size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar archivos por nombre..."
                value={searchTerm}
                onInput={handleSearchChange}
                className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              />
              {searchTerm !== debouncedSearchTerm && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <Loader2Icon className="w-4 h-4 text-purple-500 animate-spin" />
                </div>
              )}
            </div>
            <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode("list")}
                className={clsx(
                  "px-4 py-2 rounded-md text-sm font-medium transition-all duration-200",
                  viewMode === "list" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
                )}
              >
                Lista
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={clsx(
                  "px-4 py-2 rounded-md text-sm font-medium transition-all duration-200",
                  viewMode === "grid" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
                )}
              >
                Cuadrícula
              </button>
            </div>
          </div>
          
          {/* Filtros por tipo */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-gray-700 mr-2">Filtrar por tipo:</span>
            {fileTypes.map(type => (
              <button
                key={type.value}
                onClick={() => handleTypeFilterChange(type.value)}
                className={clsx(
                  "inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium transition-all duration-200",
                  typeFilter === type.value
                    ? "bg-purple-100 text-purple-800 border border-purple-200 shadow-sm"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-transparent"
                )}
              >
                {type.value !== "all" && getTypeIcon(type.value)}
                <span>{type.label}</span>
                <span className="bg-white bg-opacity-80 px-2 py-0.5 rounded-full text-xs font-medium">
                  {type.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Contenido de Archivos Scrolleable */}
      <div className="flex-1 overflow-y-auto p-6">
        {/* Estado de carga inicial */}
        {initialLoad.value && loading.value ? (
          <div className="flex justify-center items-center h-64">
            <Loader2Icon className="w-8 h-8 text-purple-500 animate-spin" />
            <span className="ml-2 text-gray-600">Cargando archivos...</span>
          </div>
        ) : files.value.length > 0 ? (
          <>
            <div className={clsx(
              "transition-all duration-300",
              viewMode === "grid" 
                ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
                : "space-y-2"
            )}>
              {files.value.map(file => 
                viewMode === "grid" ? (
                  <FileGridItem key={file.id} file={file} />
                ) : (
                  <FileListItem key={file.id} file={file} />
                )
              )}
            </div>

            {/* Indicador de carga más archivos */}
            <div className="mt-6 flex justify-center">
              {loading.value ? (
                <div className="flex items-center gap-2">
                  <Loader2Icon className="w-6 h-6 text-purple-500 animate-spin" />
                  <span className="text-gray-600">Cargando más archivos...</span>
                </div>
              ) : hasMore.value ? (
                <div ref={loadMoreRef} className="h-10" />
              ) : (
                <p className="text-gray-500 text-sm">
                  {debouncedSearchTerm ? 'No hay más resultados de búsqueda' : 'No hay más archivos para cargar'}
                </p>
              )}
            </div>
          </>
        ) : (
          /* Estado vacío */
          <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <FilesIcon size={40} className="text-gray-300" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-3">No se encontraron archivos</h3>
            <p className="text-gray-500 max-w-md">
              {debouncedSearchTerm || typeFilter !== "all" 
                ? "Ajusta tus filtros o búsqueda para ver resultados"
                : "No hay archivos disponibles en este momento"
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};