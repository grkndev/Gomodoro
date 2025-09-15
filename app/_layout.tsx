import "react-native-reanimated";


import "@/global.css";
import { NAV_THEME } from "@/lib/theme";
import { Montserrat_400Regular, Montserrat_500Medium, Montserrat_600SemiBold, Montserrat_700Bold, Montserrat_800ExtraBold, Montserrat_900Black, useFonts } from "@expo-google-fonts/montserrat";
import {
  ThemeProvider
} from "@react-navigation/native";
import { PortalHost } from "@rn-primitives/portal";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import * as SplashScreen from "expo-splash-screen";
import React from "react";
export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
    Montserrat_800ExtraBold,
    Montserrat_900Black,
  });
  React.useEffect(() => {
    if (fontsLoaded || error) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <ThemeProvider value={NAV_THEME["light"]}>
      
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        
      </Stack>
      <PortalHost />
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
