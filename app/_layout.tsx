import { PlusJakartaSans_300Light_Italic, PlusJakartaSans_400Regular, PlusJakartaSans_500Medium, PlusJakartaSans_700Bold, useFonts } from '@expo-google-fonts/plus-jakarta-sans';
import { Stack } from "expo-router";
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { AuthProvider } from './contexts/AuthContext';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    PlusJakartaSans_300Light_Italic,
    PlusJakartaSans_400Regular,
    PlusJakartaSans_500Medium,
    PlusJakartaSans_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen 
          name="index" 
          options={{ 
            title: 'DogSpotter',
            headerShown: false 
          }} 
        />
        <Stack.Screen 
          name="login" 
          options={{ 
            title: 'Login',
            headerShown: false 
          }} 
        />
        <Stack.Screen 
          name="Map" 
          options={{ 
            title: 'Map',
            headerShown: false 
          }} 
        />
        <Stack.Screen 
          name="registerdog" 
          options={{ 
            title: 'Registrar Cachorro',
            headerShown: false 
          }} 
        />
      </Stack>
    </AuthProvider>
  );
}
