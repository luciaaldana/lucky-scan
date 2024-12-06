import { useEffect } from 'react';
import { Image } from 'react-native';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import 'react-native-reanimated';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    NunitoSans: require('../assets/fonts/NunitoSans.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTitle: () => (
          <Image source={require('../assets/logo.png')} style={{ width: 80, height: 30, objectFit: 'contain' }} />
        ),
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: true }} />
      <Stack.Screen name="photo" options={{ headerShown: false }} />
    </Stack>
  );
}
