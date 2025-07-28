import ClientAppProductsBasketButton from "@islands/routes/[lang]/client/app/products/BasketButton.tsx";
import { Product, useProductStore } from "../../zustand/storeProduct.ts";
import { ClockIcon, EggFriedIcon, UtensilsIcon } from "npm:lucide-preact@^0.485.0";
import clsx from 'npm:clsx';
import FooterAdminOptions from "@components/routes/client/app/FooterAdminOptions.tsx";
import ClientAppLoginIslandView from '@islands/routes/[lang]/client/app/[login]/View.tsx';
import { Menu, useMenuStore } from "../../zustand/storeMenu.ts";
import { useEffect, useMemo, useState } from 'preact/hooks';
import { ProductGroupPriceAdjustment, useProductGroupPriceAdjustmentStore } from "../../zustand/storeProductGroupPriceAdjustment.ts";
import { useMenuCategoryStore } from "../../zustand/storeMenuCategory.ts";
import { useMenuCategoryPriceAdjustmentStore } from "../../zustand/storeMenuCategoryPriceAdjustment.ts";
import { useMenuPriceAdjustmentStore } from "../../zustand/storeMenuPriceAdjustment.ts";
import { useProductGroupStore } from "../../zustand/storeProductGroup.ts";
import { MenuCategory } from '../../zustand/storeMenuCategory.ts';
import { MenuCategoryPriceAdjustment } from '../../zustand/storeMenuCategoryPriceAdjustment.ts';
import { MenuPriceAdjustment } from '../../zustand/storeMenuPriceAdjustment.ts';
import { ProductGroup } from '../../zustand/storeProductGroup.ts';
import { CategorySchedule, useMenuSectionStore } from "../../zustand/storeMenuSection.ts";
import { ComponentChildren } from 'preact/src/index.d.ts';
import { useCommonStore } from "../../zustand/storeCommon.ts";
import { getIANATimeZone } from "@utils/routing/timeZone.ts";
import { useTimeFormatter } from "../../../../../hooks/useTimeFormatter.ts";
import { config } from "@config/frontend/index.ts";
import useRPCAPIRequestList from "../../../../../hooks/useRPCAPIRequestList.ts";
import useRPCAPI from "../../../../../hooks/useRPCAPI.ts";

export interface Props {
    toBuyIt?: boolean;
    business_id: string;
    license: string;
}

function formatTimeTo12Hour(timeInput: string | Date | undefined): string {
    if (!timeInput) {
        return "N/A";
    }
    try {
        const date = new Date(timeInput);
        if (isNaN(date.getTime())) {
            return "Invalid";
        }
        // Format UTC time to CEST (Europe/Madrid) using toLocaleTime
        // String
        return date.toLocaleTimeString('en-US', {
            timeZone: 'Europe/Madrid', // <========================================= (HERE)
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        });
    } catch (error) {
        console.warn(`Error formatting time: ${timeInput}`, error);
        return "Invalid";
    }
}

function isMenuActive(catalog: Menu): boolean {
    // If no schedule is defined, menu is always active
    if (!catalog.haveSchedule || !catalog.schedule) {
        return true;
    }

    const now = new Date();
    const currentTimeUTC = new Date(now.toUTCString()).getTime(); // Current time in UTC

    const { morning, afternoon } = catalog.schedule.schedule;

    const isWithinPeriod = (open?: string, close?: string): boolean => {
        if (!open || !close) return false;
        try {
            const openDate = new Date(open);
            const closeDate = new Date(close);
            if (isNaN(openDate.getTime()) || isNaN(closeDate.getTime())) {
                return false;
            }
            // Adjust dates to today in UTC
            openDate.setUTCFullYear(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
            closeDate.setUTCFullYear(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
            // Handle past-midnight close times
            if (closeDate.getTime() < openDate.getTime()) {
                closeDate.setUTCDate(closeDate.getUTCDate() + 1);
            }
            const openTimeUTC = openDate.getTime();
            const closeTimeUTC = closeDate.getTime();
            return currentTimeUTC >= openTimeUTC && currentTimeUTC <= closeTimeUTC;
        } catch (error) {
            console.warn(`Error checking schedule for ${catalog.title}:`, error);
            return false;
        }
    };

    return isWithinPeriod(morning?.open, morning?.close) || isWithinPeriod(afternoon?.open, afternoon?.close);
}

function getMenuScheduleDisplay(catalog: Menu): ComponentChildren {
    if (!catalog.haveSchedule || !catalog.schedule) {
        return "No schedule";
    }

    const { morning, afternoon } = catalog.schedule.schedule;

    const { formatTime } = useTimeFormatter();
    const morningOpen = morning?.open ? formatTime(morning.open) : "N/A";
    const morningClose = morning?.close ? formatTime(morning.close) : "N/A";
    const afternoonOpen = afternoon?.open ? formatTime(afternoon.open) : null;
    const afternoonClose = afternoon?.close ? formatTime(afternoon.close) : null;

    // Log schedule data for debugging
    console.log(`Menu ${catalog.title} schedule:`, {
        haveSchedule: catalog.haveSchedule,
        morningOpen,
        morningClose,
        afternoonOpen,
        afternoonClose,
    });

    // Build the display string
    let display = "";
    if (morningOpen !== "N/A" && morningClose !== "N/A") {
        display += `${morningOpen}-${morningClose}`;
    }
    if (afternoonOpen && afternoonClose && afternoonOpen !== "N/A" && afternoonClose !== "N/A") {
        display += display ? `, ${afternoonOpen}-${afternoonClose}` : `${afternoonOpen}-${afternoonClose}`;
    }
    return (
        <div className="flex flex-col items-left gap-y-1 text-xs">
            {morningOpen && morningClose && morningOpen !== "N/A" && morningClose !== "N/A" ? (
                <span>{morningOpen} - {morningClose}</span>
            ) : (
                <span className="text-gray-500">No morning schedule</span>
            )}
            {afternoonOpen && afternoonClose && afternoonOpen !== "N/A" && afternoonClose !== "N/A" ? (
                <span>{afternoonOpen} - {afternoonClose}</span>
            ) : (
                <span className="text-gray-500">No afternoon schedule</span>
            )}
        </div>
    );
}

export default function ClientAppProductsProductsPanel({
    toBuyIt = true,
    business_id,
    license
}: Props) {

    
    const { makeRequest: makeRequestBusinessProduct, stateRequestSignal: stateRequestSignalBusinessProduct }                                            = useRPCAPI('/api/v1/model/BusinessProduct/findMany', { method: "GET", zenstackQuery: true });
    const { makeRequest: makeRequestBusinessConfigurationTimeZone, stateRequestSignal: stateRequestSignalBusinessConfigurationTimeZone }                  = useRPCAPI('/api/v1/model/BusinessConfiguration/findMany', { method: "GET", zenstackQuery: true });
    const { makeRequest: makeRequestBusinessProductGroup, stateRequestSignal: stateRequestSignalBusinessProductGroup }                                  = useRPCAPI('/api/v1/model/BusinessProductGroup/findMany', { method: "GET", zenstackQuery: true });
    const { makeRequest: makeRequestBusinessProductGroupPriceAdjustment, stateRequestSignal: stateRequestSignalBusinessProductGroupPriceAdjustment }    = useRPCAPI('/api/v1/model/BusinessProductGroupPriceAdjustment/findMany', { method: "GET", zenstackQuery: true });
    const { makeRequest: makeRequestBusinessMenu, stateRequestSignal: stateRequestSignalBusinessMenu }                                                  = useRPCAPI('/api/v1/model/BusinessMenu/findMany', { method: "GET", zenstackQuery: true });
    const { makeRequest: makeRequestBusinessMenuCategory, stateRequestSignal: stateRequestSignalBusinessMenuCategory }                                  = useRPCAPI('/api/v1/model/BusinessMenuCategory/findMany', { method: "GET", zenstackQuery: true });
    const { makeRequest: makeRequestBusinessMenuPriceAdjustment, stateRequestSignal: stateRequestSignalBusinessMenuPriceAdjustment }                    = useRPCAPI('/api/v1/model/BusinessMenuPriceAdjustment/findMany', { method: "GET", zenstackQuery: true });
    const { makeRequest: makeRequestBusinessMenuCategoryPriceAdjustment, stateRequestSignal: stateRequestSignalBusinessMenuCategoryPriceAdjustment }    = useRPCAPI('/api/v1/model/BusinessMenuCategoryPriceAdjustment/findMany', { method: "GET", zenstackQuery: true });
    console.log("License: " + business_id);
    

    useRPCAPIRequestList([
        () => makeRequestBusinessProduct({
            
            where: { businessId: business_id }
            
        }),
        () => makeRequestBusinessProductGroup({
                where: { businessId: business_id },
                include: {
                    products: {
                        select: { id: true },
                        where: { businessId: business_id },
                    },
                }
        }),
        () => makeRequestBusinessProductGroupPriceAdjustment({
            where: {
                businessId: business_id
            }
        }),
        () => makeRequestBusinessMenu({
                where: { businessId: business_id },
                include: {
                    products: {
                        select: { id: true },
                        where: { businessId: business_id },
                    },
                    priceAdjustments: {
                        select: { id: true },
                        where: { businessId: business_id },
                    },
                }
        }),
        () => makeRequestBusinessMenuCategory({

                where: { businessId: business_id },
                include: {
                    menus: {
                        select: { id: true },
                        where: { businessId: business_id },
                    },
                    priceAdjustments: {
                        select: { id: true },
                        where: { businessId: business_id },
                    },
                }
        }),
        () => makeRequestBusinessMenuPriceAdjustment({
            where: { businessId: business_id }
        }),
        () => makeRequestBusinessMenuCategoryPriceAdjustment({
            where: {
                businessId: business_id
            }
        }),
        () => makeRequestBusinessConfigurationTimeZone({
                where: {
                    id: business_id
                },
                select: { timeZone: true }
        }),

    ]);

    useEffect(() => {
        console.log("stateRequestSignalBusinessProduct: ");
        console.log(JSON.stringify(stateRequestSignalBusinessProduct.value.data));
        //console.log(stateRequestSignalBusinessConfigurationTimeZone.s.v);
    }, [stateRequestSignalBusinessProduct.value.data]);


    const { menu, loadingMenu, addMenu, clearMenu } = useMenuStore();
    const { products, addProduct, clearProduct, updateProduct } = useProductStore();
    const { menuCategories, addMenuCategory, clearMenuCategories } = useMenuCategoryStore();
    const { menuCategoryPriceAdjustments, addMenuCategoryPriceAdjustment, clearMenuCategoryPriceAdjustments } = useMenuCategoryPriceAdjustmentStore();
    const { menuPriceAdjustments, addMenuPriceAdjustment, clearMenuPriceAdjustments } = useMenuPriceAdjustmentStore();
    const { productGroup, addProductGroup, clearProductGroup } = useProductGroupStore();
    const { productGroupPriceAdjustment, addProductGroupPriceAdjustment, clearProductGroupPriceAdjustment } = useProductGroupPriceAdjustmentStore();
    const { setSelectedMenu, selectedMenu } = useMenuSectionStore();
    const { timeZone, setTimeZone } = useCommonStore();


    const formatTime = useMemo(() => {
        return (timeInput: string | Date | undefined): string => {
            if (!timeInput) return "N/A";
            try {
                const date = new Date(timeInput);
                if (isNaN(date.getTime())) return "Invalid";
                return date.toLocaleTimeString('en-US', {
                    timeZone: timeZone || 'UTC',
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true
                });
            } catch (error) {
                console.warn(`Error formatting time: ${timeInput}`, error);
                return "Invalid";
            }
        };
    }, [timeZone]);

    useEffect(() => {
        clearMenu();
        const businessMenus: Menu[] = stateRequestSignalBusinessMenu.value.data?.data || [];
        businessMenus.forEach((businessMenu) => {
            addMenu(businessMenu);
        });
        if (businessMenus.length !== 0) {
            const firstActiveMenu = businessMenus.find((menu) => isMenuActive(menu));
            if (firstActiveMenu) {
                const simplifiedMenu = {
                    id: firstActiveMenu.id,
                    productIds: firstActiveMenu.products.map((product) => product.id),
                };
                setSelectedMenu(simplifiedMenu);
            } else {
                setSelectedMenu(null); // Clear selection if no active menu
            }
        }
    }, [stateRequestSignalBusinessMenu.value.data]);
    useEffect(() => {
        if (selectedMenu && !menu.some((catalog) => catalog.id === selectedMenu.id && isMenuActive(catalog))) {
            const firstActiveMenu = menu.find((catalog) => isMenuActive(catalog));
            if (firstActiveMenu) {
                const simplifiedMenu = {
                    id: firstActiveMenu.id,
                    productIds: firstActiveMenu.products.map((product) => product.id),
                };
                setSelectedMenu(simplifiedMenu);
            } else {
                setSelectedMenu(null); // Clear selection if no active menu
            }
        }
    }, [menu, selectedMenu]);

    useEffect(() => {
        clearMenuCategories();
        const businessMenusCategories: MenuCategory[] = stateRequestSignalBusinessMenuCategory.value.data?.data || [];
        businessMenusCategories.forEach((businessMenuCategory) => {
            addMenuCategory(businessMenuCategory);
        });
    }, [stateRequestSignalBusinessMenuCategory.value.data]);

    useEffect(() => {
        clearMenuCategoryPriceAdjustments();
        const businessMenusCategoriesPricesAjustments: MenuCategoryPriceAdjustment[] = stateRequestSignalBusinessMenuCategoryPriceAdjustment.value.data?.data || [];
        businessMenusCategoriesPricesAjustments.forEach((businessMenuCategoryPriceAdjustment) => {
            addMenuCategoryPriceAdjustment(businessMenuCategoryPriceAdjustment);
        });
    }, [stateRequestSignalBusinessMenuCategoryPriceAdjustment.value.data]);

    useEffect(() => {
        clearMenuPriceAdjustments();
        const businessMenusPricesAjustments: MenuPriceAdjustment[] = stateRequestSignalBusinessMenuPriceAdjustment.value.data?.data || [];
        businessMenusPricesAjustments.forEach((businessMenuPriceAdjustment) => {
            addMenuPriceAdjustment(businessMenuPriceAdjustment);
        });
    }, [stateRequestSignalBusinessMenuPriceAdjustment.value.data]);

    useEffect(() => {
        clearProductGroup();
        const businessProductsGroups: ProductGroup[] = stateRequestSignalBusinessProductGroup.value.data?.data || [];
        businessProductsGroups.forEach((businessProductGroup) => {
            addProductGroup(businessProductGroup);
        });
    }, [stateRequestSignalBusinessProductGroup.value.data]);

    useEffect(() => {
        clearProductGroupPriceAdjustment();
        const businessProductsGroupsPricesAdjustments: ProductGroupPriceAdjustment[] = stateRequestSignalBusinessProductGroupPriceAdjustment.value.data?.data || [];
        businessProductsGroupsPricesAdjustments.forEach((businessProductGroupPriceAjustment) => {
            addProductGroupPriceAdjustment(businessProductGroupPriceAjustment);
        });
    }, [stateRequestSignalBusinessProductGroupPriceAdjustment.value.data]);


    useEffect(() => {
        const businessConfigurationTimeZone: Record<any, any>[] | [] = Array.isArray(stateRequestSignalBusinessConfigurationTimeZone.value.data?.data) ? stateRequestSignalBusinessConfigurationTimeZone.value.data?.data : [];
        console.log(JSON.stringify(businessConfigurationTimeZone));
        businessConfigurationTimeZone.forEach( businessConfiguration => { 
            const timeZoneProcesed = getIANATimeZone(businessConfiguration.timeZone);
            setTimeZone(timeZoneProcesed);
            return;
         });
        

    }, [stateRequestSignalBusinessConfigurationTimeZone.value.data]);

    useEffect(() => {
        const businessProducts: Product[] = stateRequestSignalBusinessProduct.value.data?.data || [];
        const businessProductGroups: ProductGroup[] = stateRequestSignalBusinessProductGroup.value.data?.data || [];
        const businessProductGroupPriceAdjustments: ProductGroupPriceAdjustment[] = stateRequestSignalBusinessProductGroupPriceAdjustment.value.data?.data || [];
        const businessMenus: Menu[] = stateRequestSignalBusinessMenu.value.data?.data || [];
        const businessMenuCategories: MenuCategory[] = stateRequestSignalBusinessMenuCategory.value.data?.data || [];
        const businessMenuPriceAdjustments: MenuPriceAdjustment[] = stateRequestSignalBusinessMenuPriceAdjustment.value.data?.data || [];
        const businessMenuCategoryPriceAdjustments: MenuCategoryPriceAdjustment[] = stateRequestSignalBusinessMenuCategoryPriceAdjustment.value.data?.data || [];

        clearProduct();
        businessProducts.forEach((product) => {
            addProduct(product);
        });

        businessProducts.forEach((product: Product) => {
            let adjustedPrice = Number(product.unityConsumePrice) || 0;

            if (adjustedPrice <= 0) {
                console.warn(`Invalid base price for ${product.name}: ${product.unityConsumePrice}`);
                return;
            }

            const productGroup = businessProductGroups.find(
                (group) => group.products.some((p) => p.id === product.id) || product.productGroupId === group.id
            );
            if (productGroup) {
                const groupAdjustments = businessProductGroupPriceAdjustments
                    .filter((adjustment) => adjustment.productGroupId === productGroup.id)
                    .sort((a, b) => (a.appliedAt ? new Date(a.appliedAt).getTime() : 0) - (b.appliedAt ? new Date(b.appliedAt).getTime() : 0));

                groupAdjustments.forEach((adjustment) => {
                    if (adjustment.percentageValue && adjustment.adjustmentType) {
                        const percentage = adjustment.percentageValue / 100;
                        adjustedPrice *= adjustment.adjustmentType === 'INCREASE' ? 1 + percentage : 1 - percentage;
                        adjustedPrice = Number(adjustedPrice.toFixed(4));
                    } else {
                        console.warn(`Invalid group adjustment for ${product.name}:`, adjustment);
                    }
                });
            }

            const menusWithProduct = businessMenus.filter((menu) =>
                menu.products.some((p) => p.id === product.id)
            );
            menusWithProduct.forEach((menu) => {
                const menuAdjustments = businessMenuPriceAdjustments
                    .filter((adjustment) => adjustment.menuId === menu.id)
                    .sort((a, b) => (a.appliedAt ? new Date(a.appliedAt).getTime() : 0) - (b.appliedAt ? new Date(b.appliedAt).getTime() : 0));

                menuAdjustments.forEach((adjustment) => {
                    if (adjustment.percentageValue && adjustment.adjustmentType) {
                        const percentage = adjustment.percentageValue / 100;
                        adjustedPrice *= adjustment.adjustmentType === 'INCREASE' ? 1 + percentage : 1 - percentage;
                        adjustedPrice = Number(adjustedPrice.toFixed(4));
                    } else {
                        console.warn(`Invalid menu adjustment for ${product.name}:`, adjustment);
                    }
                });
            });

            const categoriesWithProduct = businessMenuCategories.filter((category) =>
                category.menus.some((m) => menusWithProduct.some((menu) => menu.id === m.id))
            );
            categoriesWithProduct.forEach((category) => {
                const categoryAdjustments = businessMenuCategoryPriceAdjustments
                    .filter((adjustment) => adjustment.menuCategoryId === category.id)
                    .sort((a, b) => (a.appliedAt ? new Date(a.appliedAt).getTime() : 0) - (b.appliedAt ? new Date(b.appliedAt).getTime() : 0));

                categoryAdjustments.forEach((adjustment) => {
                    if (adjustment.percentageValue && adjustment.adjustmentType) {
                        const percentage = adjustment.percentageValue / 100;
                        adjustedPrice *= adjustment.adjustmentType === 'INCREASE' ? 1 + percentage : 1 - percentage;
                        adjustedPrice = Number(adjustedPrice.toFixed(4));
                    } else {
                        console.warn(`Invalid category adjustment for ${product.name}:`, adjustment);
                    }
                });
            });

            let finalPrice = Number(adjustedPrice.toFixed(2));
            if (Math.abs(adjustedPrice - finalPrice) > 0.0001) {
                finalPrice = Math.round(adjustedPrice * 100) / 100;
                console.log(`Applied fallback rounding for ${product.name}: ${adjustedPrice} -> ${finalPrice}`);
            }

            if (finalPrice !== Number(product.unityConsumePrice)) {
                updateProduct(product.id, {
                    unityConsumePrice: finalPrice,
                });
                console.log(`Updated ${product.name} price from ${product.unityConsumePrice} to ${finalPrice}`);
            }
        });
    }, [
        stateRequestSignalBusinessProduct.value.data,
        stateRequestSignalBusinessProductGroup.value.data,
        stateRequestSignalBusinessProductGroupPriceAdjustment.value.data,
        stateRequestSignalBusinessMenu.value.data,
        stateRequestSignalBusinessMenuCategory.value.data,
        stateRequestSignalBusinessMenuPriceAdjustment.value.data,
        stateRequestSignalBusinessMenuCategoryPriceAdjustment.value.data
    ]);

    const selectMenuHandler = (id: string) => {
        const selected = menu.find((catalog) => catalog.id === id);
        if (selected) {
            const simplifiedMenu = {
                id: selected.id,
                productIds: selected.products.map((product) => product.id),
            };
            setSelectedMenu(simplifiedMenu);
            console.log("Simplified menu:", simplifiedMenu);
        } else {
            console.warn(`Menu with id ${id} not found`);
        }
    };

    

    // Filter products based on selectedMenu
    const filteredProducts = selectedMenu && selectedMenu.id && selectedMenu.productIds.length > 0
        ? products.filter((product) => selectedMenu.productIds.includes(product.id))
        : []; // Show no products if no active menu


    return (
        <div className="w-full flex flex-wrap gap-y-3 gap-x-3 justify-center">
            <div className="border-2 w-full h-40 overflow-x-auto overflow-y-hidden mb-8 border-black bg-white rounded-md">
                <div className="flex gap-x-4 px-4 py-2">
                    {menu.length === 0 ? (
                        loadingMenu.map((catalog, i) => (
                            <div
                                key={i}
                                className={clsx(
                                    catalog.vip ? "bg-red-900 border-black text-white" : "bg-slate-200 border-slate-300",
                                    "border-l-4 font-dancing text-2xl w-40 h-80 transform rotate-12 border-2 flex flex-col justify-start items-center shrink-0 hover:-rotate-6 hover:z-30 z-0 hover:scale-105 transition-transform duration-300 ease-in-out py-4 px-4"
                                )}
                            >
                                <div
                                    className={clsx(
                                        catalog.vip ? "border-white" : "border-black",
                                        "w-full h-auto font-semibold px-4 flex justify-center items-center gap-x-2 border-b-2"
                                    )}
                                >
                                    <span>{catalog.title}{catalog.vip && "*"}</span>
                                </div>
                                <div className="flex w-full h-full flex-col justify-start items-center">
                                    {catalog.vip && (
                                        <img
                                            className="w-[80%] h-auto object-contain"
                                            src="/img/luxury-golden-ornament.png"
                                            alt=""
                                        />
                                    )}
                                    <span className="text-base pt-3">Not sure...</span>
                                </div>
                            </div>
                        ))
                    ) : (
                        menu.map((catalog, i) => {
                            const isActive = isMenuActive(catalog);
                            return (
                                <button
                                    key={i}
                                    onClick={isActive ? () => selectMenuHandler(catalog.id) : undefined}
                                    disabled={!isActive}
                                    className={clsx(
                                        catalog.vip
                                            ? isActive
                                                ? "bg-red-900 border-black text-white"
                                                : "bg-red-950 border-black text-white opacity-25 cursor-not-allowed translate-y-16 -translate-x-4"
                                            : isActive
                                                ? "bg-slate-200 border-slate-300"
                                                : "bg-gray-400 border-slate-300 opacity-50 cursor-not-allowed",
                                        "border-l-4 font-dancing text-2xl w-40 h-80 transform rotate-12 border-2 flex flex-col justify-start items-center shrink-0",
                                        isActive ? "hover:-rotate-6 hover:z-30 hover:scale-105" : "",
                                        "transition-transform duration-300 ease-in-out py-4 px-4"
                                    )}
                                    aria-label={
                                        isActive
                                            ? `Select menu: ${catalog.title}`
                                            : `Menu ${catalog.title} is currently unavailable`
                                    }
                                    aria-disabled={!isActive}
                                >
                                    <div
                                        className={clsx(
                                            catalog.vip ? "border-white" : "border-black",
                                            "w-full h-auto font-semibold px-4 flex justify-center items-center gap-x-2 border-b-2"
                                        )}
                                    >
                                        <span>{catalog.title}{catalog.vip && "*"}</span>
                                    </div>
                                    <div className="flex w-full h-full flex-col justify-start items-center">
                                        {catalog.vip && (
                                            <img
                                                className="w-[80%] h-auto object-contain"
                                                src="/img/luxury-golden-ornament.png"
                                                alt=""
                                            />
                                        )}
                                        <span className="text-base pt-3">
                                            {getMenuScheduleDisplay(catalog)}
                                        </span>
                                    </div>
                                </button>
                            );
                        })
                    )}
                </div>
            </div>
            {/*<span className="p-1">*Las cartas tienen sus propios horarios con tiempo limitado</span>*/}
            {filteredProducts.length > 0 ? (
                filteredProducts.map((product, i) => (
                    <div
                        key={i}
                        className="w-full bg-white max-h-60 p-4 border-2 rounded-lg"
                    >
                        <div className="w-full h-full flex flex-row justify-between">
                            <div className="w-full h-full flex flex-col gap-y-2">
                                <div className="text-2xl font-semibold w-full font-dancing">
                                    <span>{product.name}</span>
                                </div>
                                <div className="text-sm font-semibold w-full border-2 p-2 rounded-lg">
                                    <span>{product.unityConsumePrice} €</span>
                                </div>
                                {toBuyIt && (
                                    <div className="flex justify-start">
                                        <ClientAppProductsBasketButton id={product.id} />
                                    </div>
                                )}
                            </div>
                            <div className="w-1/2 flex flex-col justify-center">
                                <img
                                src={product.urlImage || "/img/client/app/unavailable.png"}
                                onError={(e) => {
                                    //e.currentTarget.onerror = null;
                                    e.currentTarget.src = "/img/client/app/unavailable.png";
                                }}
                                className={clsx("max-h-24 object-contain")}
                                alt="Imagen del producto"
                                />

                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className="w-full text-center py-16 border-2 rounded-md">
                    <span>Cargando productos.</span>
                </div>
            )}
            {/*<FooterAdminOptions />*/}
        </div>
    );
}