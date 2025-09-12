import { Button } from "@/components/ui/button";
import CircularProgressBar from "@/components/ui/circular-progress";
import React from "react";
import { Text, View } from "react-native";

export default function HomeScreen() {
  const [progress, setProgress] = React.useState(0);

  const handleProgress = () => {
   const val = Math.random() * 100;
    setProgress(val);
  };
  return (
    <View className="flex-1 items-center justify-center">
      <Text>HomeScreen</Text>
      <Button onPress={handleProgress}>
        <Text className="text-white">Button</Text>
      </Button>
      <CircularProgressBar progress={progress} />
    </View>
  );
}
