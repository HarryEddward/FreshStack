import { useMemo, useEffect, useState } from 'preact/hooks';
import {
  ListIcon,
  GridIcon,
  PackageIcon,
  SearchIcon,
  ShoppingCartIcon,
  ClockIcon,
  TagIcon,
  ImageIcon,
  PlusIcon,
  AlertTriangleIcon,
  CalendarIcon,
  DollarSignIcon,
  TruckIcon,
  CalendarSearchIcon,
  BlocksIcon,
  PencilIcon,
  WarehouseIcon
} from 'npm:lucide-preact@^0.485.0';
import clsx from 'npm:clsx@^2.1.1';
import useRPCAPI from '@islands/hooks/useRPCAPI.ts';
import useRPCAPIRequestList from '@islands/hooks/useRPCAPIRequestList.ts';
import Global_FilePreviewInput from '@islands/routes/[global]/FilePreviewInput.tsx';
import LangBusinessWebAppDashboardInventoryIslandProductsSettingEditor from "./ProductsSettingsEditorProduct.tsx";
import LangBusinessWebAppDashboardInventoryIslandProductsSettingsEditorStock from "./ProductsSettingsEditorStock.tsx";
import { useProductSettingsStore } from '@islands/routes/[lang]/business/web/app/dashboard/inventory/[stores]/storeProductSettings.ts';
import LangBusinessWebAppDashboardInventoryIslandProductsSettingCreateProduct from '@islands/routes/[lang]/business/web/app/dashboard/inventory/ProductsSettingsCreateProduct.tsx';
import LangBusinessWebAppDashboardInventoryIslandProductsSettingEditorProduct from '@islands/routes/[lang]/business/web/app/dashboard/inventory/ProductsSettingsEditorProduct.tsx';

// Interfaces actualizadas según el nuevo esquema
export interface BusinessProductStockBatch {
  id: string;
  batchNumber?: string;
  count: number;
  originalCount: number;
  reservedCount: number;
  costPerUnit?: number;
  totalCost?: number;
  purchaseDate: string;
  expirationDate?: string;
  status: 'AVAILABLE' | 'RESERVED' | 'EXPIRED' | 'CONSUMED' | 'DAMAGED';
  supplier?: {
    id: string;
    name: string;
  };
}

export interface BusinessProduct {
  id: string;
  menuId: string;
  name: string;
  unityAmount: number;
  stockBatches: BusinessProductStockBatch[];
  typeUnitConsumeMeasurement: string;
  minimumStockAlert?: number;
  tags?: string;
  nameLastModificationEmployee?: string;
  preparationDuration?: number;
  urlImage?: string;
  imageId?: string;
  businessId: string;
  createdAt: string;
  updatedAt: string;
  productGroupId?: string;
  parentId?: string;
  menu?: {
    id: string;
    title: string;
  };
  productGroup?: {
    id: string;
    name: string;
  };
}

export default function LangBusinessWebAppDashboardInventoryIslandProductsSettings() {
  // Estados para filtros y búsqueda
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [buttonExpireFilter, setButtonExpireFilter] = useState<boolean>(false);
  const [buttonStockFilter, setButtonStockFilter] = useState<boolean>(false);

  const [stockFilter, setStockFilter] = useState<string>("all");
  const [expirationFilter, setExpirationFilter] = useState<string>("all");
  const [products, setProducts] = useState<BusinessProduct[]>([]);


  const { 
    makeRequest: findProducts, 
    stateRequestSignal: productsState 
  } = useRPCAPI<{ data: BusinessProduct[]; count: number }>('/api/v1/model/BusinessProduct/findMany', { 
    method: "GET", 
    zenstackQuery: true 
  });

  useRPCAPIRequestList([
    () => findProducts({
      include: {
        stockBatches: {
          include: {
            supplier: true
          }
        },
        menu: true,
        productGroup: true
      },
      orderBy: {
        name: 'asc'
      }
    })
  ]);

  useEffect(() => {
    const data = productsState.value.data?.data || [];
    console.log('Productos recibidos:', JSON.stringify(data, null, 2));
    setProducts(Array.isArray(data) ? data : []);
  }, [productsState.value]);

  // Función para calcular el stock total disponible
  const getTotalAvailableStock = (product: BusinessProduct): number => {
    return product.stockBatches
      ?.filter(batch => batch.status === 'AVAILABLE')
      ?.reduce((sum, batch) => sum + (batch.count - batch.reservedCount), 0) || 0;
  };

  // Función para obtener batches próximos a vencer
  const getExpiringBatches = (product: BusinessProduct, days: number = 7): BusinessProductStockBatch[] => {
    const currentDate = new Date();
    const futureDate = new Date();
    futureDate.setDate(currentDate.getDate() + days);

    return product.stockBatches?.filter(batch => {
      if (!batch.expirationDate || batch.status !== 'AVAILABLE') return false;
      const expirationDate = new Date(batch.expirationDate);
      return expirationDate <= futureDate && expirationDate >= currentDate;
    }) || [];
  };

  // Función para obtener el costo promedio del stock
  const getAverageStockCost = (product: BusinessProduct): number => {
    const availableBatches = product.stockBatches?.filter(batch => 
      batch.status === 'AVAILABLE' && batch.costPerUnit
    ) || [];
    
    if (availableBatches.length === 0) return 0;
    
    const totalCost = availableBatches.reduce((sum, batch) => 
      sum + (batch.costPerUnit! * batch.count), 0
    );
    const totalQuantity = availableBatches.reduce((sum, batch) => sum + batch.count, 0);
    
    return totalQuantity > 0 ? totalCost / totalQuantity : 0;
  };

  // Filtrar productos basado en búsqueda y filtros
  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Filtrar por término de búsqueda
    if (searchTerm.trim()) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.tags && product.tags.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (product.menu?.title && product.menu.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (product.productGroup?.name && product.productGroup.name.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filtrar por stock
    if (stockFilter !== "all") {
      filtered = filtered.filter(product => {
        const totalStock = getTotalAvailableStock(product);
        const minAlert = product.minimumStockAlert || 10;
        
        switch (stockFilter) {
          case "low":
            return totalStock < minAlert;
          case "medium":
            return totalStock >= minAlert && totalStock < (minAlert * 3);
          case "high":
            return totalStock >= (minAlert * 3);
          case "out":
            return totalStock === 0;
          default:
            return true;
        }
      });
    }

    // Filtrar por vencimiento
    if (expirationFilter !== "all") {
      filtered = filtered.filter(product => {
        const expiringBatches = getExpiringBatches(product, 7);
        const expiredBatches = product.stockBatches?.filter(batch => 
          batch.expirationDate && new Date(batch.expirationDate) < new Date() && batch.status === 'AVAILABLE'
        ) || [];

        switch (expirationFilter) {
          case "expiring":
            return expiringBatches.length > 0;
          case "expired":
            return expiredBatches.length > 0;
          default:
            return true;
        }
      });
    }

    return filtered;
  }, [products, searchTerm, stockFilter, expirationFilter]);

  // Generar opciones de filtro por stock
  const stockFilterOptions = useMemo(() => {
    const allProducts = products;
    const outOfStock = allProducts.filter(p => getTotalAvailableStock(p) === 0).length;
    const lowStock = allProducts.filter(p => {
      const stock = getTotalAvailableStock(p);
      const minAlert = p.minimumStockAlert || 10;
      return stock > 0 && stock < minAlert;
    }).length;
    const mediumStock = allProducts.filter(p => {
      const stock = getTotalAvailableStock(p);
      const minAlert = p.minimumStockAlert || 10;
      return stock >= minAlert && stock < (minAlert * 3);
    }).length;
    const highStock = allProducts.filter(p => {
      const stock = getTotalAvailableStock(p);
      const minAlert = p.minimumStockAlert || 10;
      return stock >= (minAlert * 3);
    }).length;

    return [
      { value: "all", label: "Todos", count: allProducts.length },
      { value: "out", label: "Sin Stock", count: outOfStock },
      { value: "low", label: "Stock Bajo", count: lowStock },
      { value: "medium", label: "Stock Medio", count: mediumStock },
      { value: "high", label: "Stock Alto", count: highStock },
    ];
  }, [products]);

  // Generar opciones de filtro por vencimiento
  const expirationFilterOptions = useMemo(() => {
    const allProducts = products;
    const expiring = allProducts.filter(p => getExpiringBatches(p, 7).length > 0).length;
    const expired = allProducts.filter(p => {
      const expiredBatches = p.stockBatches?.filter(batch => 
        batch.expirationDate && new Date(batch.expirationDate) < new Date() && batch.status === 'AVAILABLE'
      ) || [];
      return expiredBatches.length > 0;
    }).length;

    return [
      { value: "all", label: "Todos", count: allProducts.length },
      { value: "expiring", label: "Próx. a Vencer", count: expiring },
      { value: "expired", label: "Vencidos", count: expired },
    ];
  }, [products]);

  const handleSearchChange = (e: Event) => {
    const target = e.currentTarget as HTMLInputElement;
    setSearchTerm(target.value);
  };


  const {
    openModalSettingsEditorProduct,
    openModalSettingsEditorStock,
    openModalSettingsCreateProduct,
    setOpenModalSettingsCreateProduct,
    setProductIdSelectedSettingsEditorStock,
  } = useProductSettingsStore();

  return (
    <div className="relative h-full flex flex-col animate-fade-in overflow-hidden">
      
      {
        openModalSettingsEditorProduct && (
          <LangBusinessWebAppDashboardInventoryIslandProductsSettingEditorProduct/>
        )
      }
      {
        openModalSettingsEditorStock && (
          <LangBusinessWebAppDashboardInventoryIslandProductsSettingsEditorStock/>
        )
      }
      {
        openModalSettingsCreateProduct && (
          <LangBusinessWebAppDashboardInventoryIslandProductsSettingCreateProduct/>
        )
      }

      {/* Header Fijo */}
      <div className="flex-shrink-0 p-6 border-b bg-gradient-to-r from-orange-50 to-yellow-50 rounded-t-lg">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
            <ShoppingCartIcon className="w-6 h-6 text-orange-600" />
          </div>
          <div className="w-full flex flex-row justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Productos</h2>
              <p className="text-sm text-gray-600 mt-1">
                Gestiona tu inventario con control de batches y vencimientos ({filteredProducts.length} productos)
              </p>
            </div>
            <button
              onClick={setOpenModalSettingsCreateProduct}
              className="p-4 bg-orange-200 rounded-xl text-orange-600 hover:bg-orange-300 transition-colors"
            >
              <PlusIcon />
            </button>
          </div>
        </div>
      </div>

      {/* Barra de Herramientas Fija */}
      <div className="flex-shrink-0 p-6 border-b bg-white">
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="relative flex gap-x-4 flex-1 max-w-md">
              <SearchIcon size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar productos, menús, grupos..."
                value={searchTerm}
                onInput={handleSearchChange}
                className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
              />
              <button
              onClick={() => setButtonExpireFilter(!buttonExpireFilter)}
              className={"p-2 p-3 rounded-lg bg-gray-100"}
              >
                <CalendarSearchIcon />
              </button>
              <button
              onClick={() => setButtonStockFilter(!buttonStockFilter)}
              className={"p-2 p-3 rounded-lg bg-gray-100"}
              >
                <BlocksIcon />
              </button>
            </div>
            <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode("list")}
                className={clsx(
                  "px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center gap-2",
                  viewMode === "list" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
                )}
              >
                <ListIcon size={16} />
                Lista
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={clsx(
                  "px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center gap-2",
                  viewMode === "grid" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
                )}
              >
                <GridIcon size={16} />
                Cuadrícula
              </button>
            </div>
          </div>
          
          {/* Filtros por stock */}
          {
            buttonStockFilter && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-medium text-gray-700 mr-2">Stock:</span>
                {stockFilterOptions.map(option => (
                  <button
                    key={option.value}
                    onClick={() => setStockFilter(option.value)}
                    className={clsx(
                      "inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium transition-all duration-200",
                      stockFilter === option.value
                        ? "bg-orange-100 text-orange-800 border border-orange-200 shadow-sm"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-transparent"
                    )}
                  >
                    <span>{option.label}</span>
                    <span className="bg-white bg-opacity-80 px-2 py-0.5 rounded-full text-xs font-medium">
                      {option.count}
                    </span>
                  </button>
                ))}
              </div>
            )
          }
          

          {/* Filtros por vencimiento */}
          {
            buttonExpireFilter && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-medium text-gray-700 mr-2">Vencimiento:</span>
                {expirationFilterOptions.map(option => (
                  <button
                    key={option.value}
                    onClick={() => setExpirationFilter(option.value)}
                    className={clsx(
                      "inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium transition-all duration-200",
                      expirationFilter === option.value
                        ? "bg-red-100 text-red-800 border border-red-200 shadow-sm"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-transparent"
                    )}
                  >
                    <span>{option.label}</span>
                    <span className="bg-white bg-opacity-80 px-2 py-0.5 rounded-full text-xs font-medium">
                      {option.count}
                    </span>
                  </button>
                ))}
              </div>
            )
          }
          
        </div>
      </div>

      {/* Contenido de Productos Scrolleable */}
      <div className="flex-1 overflow-y-auto p-6">
        {filteredProducts.length > 0 ? (
          <div className={clsx(
            "transition-all duration-300",
            viewMode === "grid" 
              ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
              : "flex flex-col space-y-4"
          )}>
            {filteredProducts.map(product => (
              <div key={product.id}>
                {viewMode === "grid" ? (
                  <ProductGridItem
                    product={product} 
                    getTotalAvailableStock={getTotalAvailableStock}
                    getExpiringBatches={getExpiringBatches}
                    getAverageStockCost={getAverageStockCost}
                  />
                ) : (
                  <ProductListItem
                    product={product}
                    getTotalAvailableStock={getTotalAvailableStock}
                    getExpiringBatches={getExpiringBatches}
                    getAverageStockCost={getAverageStockCost}
                  />
                )}
              </div>
            ))}
          </div>
        ) : (
          /* Estado vacío */
          <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <ShoppingCartIcon size={40} className="text-gray-300" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-3">
              {products.length === 0 ? "No hay productos disponibles" : "No se encontraron productos"}
            </h3>
            <p className="text-gray-500 max-w-md">
              {products.length === 0 
                ? "Crea tu primer producto para comenzar a gestionar tu inventario con control de batches"
                : "Ajusta tus filtros o búsqueda para ver resultados"
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// Props interfaces para los componentes
interface ProductItemProps {
  product: BusinessProduct;
  getTotalAvailableStock: (product: BusinessProduct) => number;
  getExpiringBatches: (product: BusinessProduct, days?: number) => BusinessProductStockBatch[];
  getAverageStockCost: (product: BusinessProduct) => number;
}

// Componente para mostrar producto en vista de cuadrícula
const ProductGridItem = ({
  product, 
  getTotalAvailableStock, 
  getExpiringBatches, 
  getAverageStockCost 
}: ProductItemProps) => {
  const totalStock = getTotalAvailableStock(product);
  const minAlert = product.minimumStockAlert || 10;
  const hasLowStock = totalStock > 0 && totalStock < minAlert;
  const isOutOfStock = totalStock === 0;
  const expiringBatches = getExpiringBatches(product, 7);
  const averageCost = getAverageStockCost(product);
  const totalBatches = product.stockBatches?.filter(b => b.status === 'AVAILABLE').length || 0;
  
  const {
      setOpenModalSettingsEditorProduct,
      setOpenModalSettingsEditorStock,
      setProductIdSelectedSettingsEditorStock
  } = useProductSettingsStore();

  const handleButtonClickEditorProduct = () => {
    setOpenModalSettingsEditorProduct();
  };

  const handleButtonClickEditorStock = (productId: string) => {
    setProductIdSelectedSettingsEditorStock(productId);
    setOpenModalSettingsEditorStock();
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-lg hover:border-orange-300 transition-all duration-300 group">
      {/* Imagen del producto */}
      <div className="mb-4 aspect-square bg-gray-50 rounded-lg overflow-hidden relative">
        {product.urlImage ? (
          <img 
            src={product.urlImage} 
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <PackageIcon size={48} className="text-gray-300" />
          </div>
        )}
        
        {/* Indicadores de estado */}
        <div className="absolute top-2 right-2 flex flex-col gap-1">
          {isOutOfStock && (
            <span className="px-2 py-1 bg-red-500 text-white text-xs font-medium rounded-full">
              Sin Stock
            </span>
          )}
          {hasLowStock && (
            <span className="px-2 py-1 bg-yellow-500 text-white text-xs font-medium rounded-full">
              Bajo
            </span>
          )}
          {expiringBatches.length > 0 && (
            <span className="px-2 py-1 bg-orange-500 text-white text-xs font-medium rounded-full">
              Vence
            </span>
          )}
        </div>
      </div>
      
      {/* Info del producto */}
      <div className="space-y-2">
        <div className="flex items-start justify-between">
          <h3 className="font-medium text-gray-800 text-sm line-clamp-2 flex-1">
            {product.name}
          </h3>
        </div>
        
        <div className="space-y-1">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Stock:</span>
            <span className={clsx(
              "font-medium", 
              isOutOfStock ? "text-red-600" : hasLowStock ? "text-yellow-600" : "text-green-600"
            )}>
              {totalStock} {product.typeUnitConsumeMeasurement}
            </span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Batches:</span>
            <span className="text-gray-600">{totalBatches}</span>
          </div>
          
          {averageCost > 0 && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Costo Prom:</span>
              <span className="font-medium text-gray-800">€{averageCost.toFixed(2)}</span>
            </div>
          )}
          
          {product.preparationDuration && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Preparación:</span>
              <span className="text-gray-600">{product.preparationDuration} min</span>
            </div>
          )}
        </div>

        {/* Información adicional */}
        <div className="pt-2 border-t border-gray-100 space-y-1">
          {product.menu && (
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <span>Menú:</span>
              <span className="font-medium">{product.menu.title}</span>
            </div>
          )}
          
          {product.productGroup && (
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <span>Grupo:</span>
              <span className="font-medium">{product.productGroup.name}</span>
            </div>
          )}
          
          {product.tags && (
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <TagIcon size={12} />
              <span className="truncate">{product.tags}</span>
            </div>
          )}
        </div>
        
        {/* Botones de acción */}
        <div className="flex items-center gap-2 pt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
          onClick={() => handleButtonClickEditorProduct()}
          className="flex-1 text-xs bg-blue-50 text-blue-600 py-2 rounded-md hover:bg-blue-100 transition-colors">
            Editar
          </button>
          <button
          onClick={() => handleButtonClickEditorStock(product.id)}
          className="flex-1 text-xs bg-green-50 text-green-600 py-2 rounded-md hover:bg-green-100 transition-colors">
            Ver Stock
          </button>
        </div>
      </div>
    </div>
  );
};

// Componente para mostrar producto en vista de lista
const ProductListItem = ({
  product, 
  getTotalAvailableStock, 
  getExpiringBatches, 
  getAverageStockCost 
}: ProductItemProps) => {
  const totalStock = getTotalAvailableStock(product);
  const minAlert = product.minimumStockAlert || 10;
  const hasLowStock = totalStock > 0 && totalStock < minAlert;
  const isOutOfStock = totalStock === 0;
  const expiringBatches = getExpiringBatches(product, 7);
  const averageCost = getAverageStockCost(product);
  const totalBatches = product.stockBatches?.filter(b => b.status === 'AVAILABLE').length || 0;
  

  const {
      setOpenModalSettingsEditorProduct,
      setOpenModalSettingsEditorStock,
      setProductIdSelectedSettingsEditorStock
  } = useProductSettingsStore();


  

  const handleButtonClickEditorProduct = () => {
    setOpenModalSettingsEditorProduct();
  };

  const handleButtonClickEditorStock = (productId: string) => {
    setProductIdSelectedSettingsEditorStock(productId);
    setOpenModalSettingsEditorStock();
  };

  //

  return (
    <div className="flex items-center p-4 hover:bg-gray-50 rounded-xl transition-all duration-200 border border-transparent hover:border-gray-200 hover:shadow-sm group">
      <div className="flex-shrink-0 mr-4">
        {product.urlImage ? (
          <img 
            src={product.urlImage} 
            alt={product.name}
            className="w-12 h-12 object-cover rounded-lg"
          />
        ) : (
          <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
            <PackageIcon className="w-6 h-6 text-orange-600" />
          </div>
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-medium text-gray-800 truncate">{product.name}</h3>
          <div className="flex gap-1">
            {isOutOfStock && (
              <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full">
                Sin Stock
              </span>
            )}
            {hasLowStock && (
              <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full">
                Stock Bajo
              </span>
            )}
            {expiringBatches.length > 0 && (
              <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs font-medium rounded-full">
                Próx. a Vencer ({expiringBatches.length})
              </span>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <PackageIcon size={14} />
            Stock: <span className={clsx(
              "font-medium", 
              isOutOfStock ? "text-red-600" : hasLowStock ? "text-yellow-600" : "text-green-600"
            )}>
              {totalStock} {product.typeUnitConsumeMeasurement}
            </span>
          </span>
          
          <span className="flex items-center gap-1">
            <TruckIcon size={14} />
            {totalBatches} batches
          </span>
          
          {averageCost > 0 && (
            <span className="flex items-center gap-1">
              {averageCost.toFixed(2)}€ prom.
            </span>
          )}
          
          {product.preparationDuration && (
            <span className="flex items-center gap-1">
              <ClockIcon size={14} />
              {product.preparationDuration} min
            </span>
          )}
        </div>
        
        <div className="flex items-center gap-4 text-xs text-gray-400 mt-1">
          {product.menu && (
            <span>Menú: {product.menu.title}</span>
          )}
          {product.productGroup && (
            <span>Grupo: {product.productGroup.name}</span>
          )}
          {product.tags && (
            <span className="flex items-center gap-1">
              <TagIcon size={12} />
              {product.tags}
            </span>
          )}
        </div>
      </div>
      
      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <button
          onClick={() => handleButtonClickEditorProduct()}
          title="Editar Producto" 
          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
        >
          <PencilIcon/> 
        </button>
        <button
          onClick={() => handleButtonClickEditorStock(product.id)} 
          title="Ver Stock y Batches" 
          className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200"
        >
          <WarehouseIcon/>
        </button>
      </div>
    </div>
  );
};