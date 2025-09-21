import { Text } from "@/components/ui/text";
import { useAppTheme } from "@/lib/theme-provider";
import React from "react";
import { Switch, View } from "react-native";

export default function SettingsScreen() {
  const { isDark, setTheme } = useAppTheme();

  const handleToggle = React.useCallback(
    (value: boolean) => {
      setTheme(value ? "dark" : "light");
    },
    [setTheme],
  );

  return (
    <View className="flex-1 bg-background p-6">
      <View className="flex-row items-center justify-between rounded-xl border border-border bg-card p-4">
        <View className="flex-1 pr-6">
          <Text className="text-lg font-sans-semibold text-foreground">Koyu Mod</Text>
          <Text className="text-muted-foreground text-sm">
            Uygulama temasını geçici olarak değiştir.
          </Text>
        </View>
        <Switch
          value={isDark}
          onValueChange={handleToggle}
          ios_backgroundColor="#3f3f46"
        />
      </View>
    </View>
  );
}
