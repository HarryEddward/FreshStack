import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { StripeTerminalProvider, useStripeTerminal } from '@stripe/stripe-terminal-react-native';

import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import * as AuthSession from 'expo-auth-session';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/components/useColorScheme';
import { PermissionsAndroid } from 'react-native';
import { config } from '@/constants/Config';


const discovery = {
  authorizationEndpoint: 'https://tu-keycloak-dominio/realms/tu-realm/protocol/openid-connect/auth',
  tokenEndpoint: 'https://tu-keycloak-dominio/realms/tu-realm/protocol/openid-connect/token',
  revocationEndpoint: 'https://tu-keycloak-dominio/realms/tu-realm/protocol/openid-connect/logout',
};

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  
  const colorScheme = useColorScheme();

  const redirectUri = AuthSession.makeRedirectUri({
    native: 'employeeapp://es/public/callback',
  });

  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: 'fresh-client-mobile',
      redirectUri,
      scopes: ['openid', 'profile', 'email'],
      responseType: 'code',
      usePKCE: true,
    },
    discovery
  );

  console.log("Layout Root");



  return (
      
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
        </Stack>
      </ThemeProvider>
    
  );
}
