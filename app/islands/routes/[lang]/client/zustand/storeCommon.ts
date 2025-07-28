import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { useClientStore } from "@islands/hooks/useClientStore.ts";

interface IFunctionsActivatedOrders {
  manual: boolean;
  automatized: boolean;
}

interface IFunctionsActivated {
  orders: IFunctionsActivatedOrders;
}

interface Schedule {
  open: string;
  close: string;
}

interface CommonState {
  wifiEnabled: boolean;
  wifiPassword: string;
  setWifiConfiguration: (setter: { wifiEnabled: boolean; wifiPassword: string }) => void;
  isOpenWifiModal: boolean;
  setOpenWifiModal: (isOpenWifiModal: boolean) => void;

  scheduleMorning: Schedule;
  setScheduleMorning: (setter: Schedule) => void;
  scheduleAfternoon: Schedule;
  setScheduleAfternoon: (setter: Schedule) => void;

  functionsActivated: IFunctionsActivated;
  setFunctionsActivated: (setter: IFunctionsActivated) => void;

  displayUsername: string;
  setDisplayUsername: (setter: string) => void;

  isOpenMenuModal: boolean;
  setOpenMenuModal: (isOpenMenuModal: boolean) => void;

  timeZone: string;
  setTimeZone: (setter: string) => void;
}

interface PartialCommonState {
  isOpenWifiModal: boolean;
  setOpenWifiModal: (isOpenWifiModal: boolean) => void;
}

export const useCommonStoreZustand = create(
  persist<CommonState>(
    (set) => ({
      wifiEnabled: false,
      wifiPassword: "",
      setWifiConfiguration: ({ wifiEnabled, wifiPassword }) =>
        set(() => ({ wifiEnabled, wifiPassword })),
      isOpenWifiModal: false,
      setOpenWifiModal: (isOpenWifiModal) => set(() => ({ isOpenWifiModal })),

      scheduleMorning: { open: "", close: "" },
      setScheduleMorning: (schedule) => set(() => ({ scheduleMorning: schedule })),

      scheduleAfternoon: { open: "", close: "" },
      setScheduleAfternoon: (schedule) => set(() => ({ scheduleAfternoon: schedule })),

      functionsActivated: {
        orders: {
          manual: false,
          automatized: false,
        },
      },
      setFunctionsActivated: (value) => set(() => ({ functionsActivated: value })),

      displayUsername: "",
      setDisplayUsername: (name) => set(() => ({ displayUsername: name })),

      isOpenMenuModal: false,
      setOpenMenuModal: (isOpenMenuModal) => set(() => ({ isOpenMenuModal })),

      timeZone: "",
      setTimeZone: (name) => set(() => ({ timeZone: name })),

    }),
    {
      name: "ClientApp_storeCommon",
      storage: createJSONStorage(() => globalThis.localStorage),
      /*partialize: (state: PartialCommonState) => ({
        // El modal no se debe de guardar luego de su úso, ya que puede verse comportamientos extraños
        isOpenWifiModal: state.isOpenWifiModal,
        setOpenWifiModal: state.setOpenWifiModal
      })*/

    }
  )
);

export function useCommonStore() {
  return useClientStore(useCommonStoreZustand);
}
