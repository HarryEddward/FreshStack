import { create } from 'zustand';
import { useClientStore } from "@islands/hooks/useClientStore.ts";

interface ConnectionState {
    isConnectionFailed: boolean;
    setIsConnectionFailed: (value: boolean) => void;
    deviceId: string;
    setDeviceId: (id: string) => void;
}

const useConnectionStore = create<ConnectionState>((set) => ({
    isConnectionFailed: false,
    setIsConnectionFailed: (value: boolean) => set({ isConnectionFailed: value }),
    deviceId: '',
    setDeviceId: (id: string) => set({ deviceId: id }),
}));

export function useLanguageStore() {
    return useClientStore(useConnectionStore);
};