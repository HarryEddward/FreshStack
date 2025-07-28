import { useCommonStore } from "../routes/[lang]/client/zustand/storeCommon.ts";
import { useCallback } from 'preact/hooks';

export function useTimeFormatter() {
    const { timeZone } = useCommonStore();
    const formatTime = useCallback((timeInput: string | Date | undefined): string => {
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
    }, [timeZone]);
    return { formatTime, timeZone };
}