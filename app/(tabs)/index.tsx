import { SelectPreview } from "@/components/SessionSelect";
import { ActionButton } from "@/components/ui/action-button";
import CircularProgressBar from "@/components/ui/circular-progress";
import { Text } from "@/components/ui/text";
import React from "react";
import { View } from "react-native";

export default function HomeScreen() {
  const [progress, setProgress] = React.useState(0);

  const handleProgress = () => {
    const val = Math.random() * 100;
    setProgress(val);
  };
  return (
    <View className="flex-1 items-center justify-center gap-16">
      <SelectPreview />
      <CircularProgressBar
        progress={progress}
        fontSize={48}
        size={256}
        strokeWidth={16}
        color="#17CB17"
      />

      <View className="w-2/3 px-4">
        <ActionButton onPress={handleProgress}>
          <Text className="text-xl font-sans-semibold text-white">
            Press me
          </Text>
        </ActionButton>
      </View>
    </View>
  );
}
