import * as SecureStore from 'expo-secure-store';

export async function storeCookie(cookie: string) {
  await SecureStore.setItemAsync('cookie', cookie);
}

export async function getCookie(): Promise<string | null> {
  return await SecureStore.getItemAsync('cookie');
}
