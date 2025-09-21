import React from 'react';
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Text } from "./ui/text";

export default function Header() {
  const insets = useSafeAreaInsets();
  return (
    <View
      className="items-center justify-center border-b border-border bg-background pb-2"
      style={{ marginTop: insets.top }}
    >
      <Text className="text-xl font-sans-bold text-green-500">Gomodoro</Text>
    </View>
  );
}
