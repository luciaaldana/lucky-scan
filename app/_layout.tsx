import { useEffect } from 'react';
import { Image, Pressable } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import Entypo from '@expo/vector-icons/Entypo';
import 'react-native-reanimated';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const router = useRouter();

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
      <Stack.Screen name="index" options={{ headerShown: true, headerBackVisible: false }} />
      <Stack.Screen
        name="photo"
        options={{
          headerShown: true,
          headerLeft: () => {
            const handleDismiss = () => {
              if (router.canDismiss()) {
                router.dismiss(1);
              }
            };
            return (
              <Pressable onPress={handleDismiss}>
                <Entypo name="chevron-left" size={24} color="#4dba7a" />
              </Pressable>
            );
          },
        }}
      />
      <Stack.Screen
        name="results"
        options={{
          headerShown: true,
          headerBackVisible: false,
        }}
      />
    </Stack>
  );
}
