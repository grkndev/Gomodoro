import { AlertDialogPreview } from "@/components/AlertDialogPreview";
import { PomodoroTimer } from "@/components/PomodoroTimer";
import TaskSheet from "@/components/TaskSheet";
import React from "react";
import { Dimensions, View } from "react-native";

export default function HomeScreen() {
  const width = Dimensions.get("window").width;
  return (
    <View className="flex-1 items-center justify-center gap-8 px-2">
      <TaskSheet />

      <PomodoroTimer
        size={width * 0.8}
        fontSize={width}
        strokeWidth={width * 0.05}
        initialSeconds={1 * 60}
        onComplete={() => {
          console.log("Pomodoro session completed from HomeScreen!");
        }}
        currentSession={1}
        totalSessions={4}
      />

      <AlertDialogPreview />
    </View>
  );
}
