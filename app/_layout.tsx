import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { InterestsProvider } from '../src/context/InterestsContext';
import { ToastProvider } from '../src/context/ToastContext';

export default function RootLayout() {
  return (
    <InterestsProvider>
      <ToastProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen
            name="profile"
            options={{
              presentation: 'modal',
              headerShown: true,
              headerTitle: 'Profile',
              gestureEnabled: true,
              gestureDirection: 'vertical',
            }}
          />
        </Stack>
        <StatusBar style="dark" />
      </ToastProvider>
    </InterestsProvider>
  );
}
