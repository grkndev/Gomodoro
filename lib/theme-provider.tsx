import React from "react";
import { Appearance, Platform } from "react-native";
import { ThemeProvider as NavigationThemeProvider } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

import { NAV_THEME } from "@/lib/theme";
import { colorScheme as nativewindColorScheme } from "nativewind";

type ThemeName = "light" | "dark";

type ThemeContextValue = {
  theme: ThemeName;
  isDark: boolean;
  setTheme: (theme: ThemeName) => void;
  toggleTheme: () => void;
};

const ThemeContext = React.createContext<ThemeContextValue | undefined>(undefined);

export function AppThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = React.useState<ThemeName>(() =>
    Appearance.getColorScheme() === "dark" ? "dark" : "light",
  );

  React.useEffect(() => {
    try {
      nativewindColorScheme.set(theme);
    } catch (error) {
      console.warn("Unable to update NativeWind color scheme", error);
    }

    if (Platform.OS === "web") {
      const root = globalThis.document?.documentElement;
      root?.classList.toggle("dark", theme === "dark");
    }
  }, [theme]);

  const setTheme = React.useCallback((nextTheme: ThemeName) => {
    setThemeState(nextTheme);
  }, []);

  const toggleTheme = React.useCallback(() => {
    setThemeState((current) => (current === "dark" ? "light" : "dark"));
  }, []);

  const value = React.useMemo(
    () => ({
      theme,
      isDark: theme === "dark",
      setTheme,
      toggleTheme,
    }),
    [theme, setTheme, toggleTheme],
  );

  return (
    <ThemeContext.Provider value={value}>
      <NavigationThemeProvider value={NAV_THEME[theme]}>{children}</NavigationThemeProvider>
      <StatusBar style={theme === "dark" ? "light" : "dark"} />
    </ThemeContext.Provider>
  );
}

export function useAppTheme() {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error("useAppTheme must be used within an AppThemeProvider");
  }

  return context;
}
