// hooks/useAuthGuard.ts
import { useEffect } from 'react';
import { useRouter, useSegments } from 'expo-router';

export function useAuthGuard(isLoggedIn: boolean) {
  const router = useRouter();
  const segments = useSegments(); // ["(tabs)", "home"]

  useEffect(() => {
    const inAuthGroup = segments[0] === "[lang]" && segments[1] === "private"; // Rutas públicas (login, etc.)

    if (!isLoggedIn && !inAuthGroup) {
      router.replace("/(auth)/login"); // Redirigir a login
    }
    if (isLoggedIn && inAuthGroup) {
      router.replace("/(tabs)/home"); // Redirigir al home si ya logueado
    }
  }, [isLoggedIn, segments]);
}
