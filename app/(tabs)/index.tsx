import { PomodoroTimer } from "@/components/PomodoroTimer";
import { SelectPreview } from "@/components/SessionSelect";
import React from "react";
import { View } from "react-native";

export default function HomeScreen() {
  return (
    <View className="flex-1 items-center justify-center gap-16">
      <SelectPreview />
      <PomodoroTimer 
        initialMinutes={25}
        onComplete={() => {
          console.log("Pomodoro session completed from HomeScreen!");
        }}
        current_session={1}
        total_sessions={4}
      />
    </View>
  );
}
