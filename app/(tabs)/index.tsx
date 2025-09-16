import { AlertDialogPreview } from "@/components/AlertDialogPreview";
import { PomodoroTimer } from "@/components/PomodoroTimer";
import TaskSheet from "@/components/TaskSheet";
import React from "react";
import { View } from "react-native";

export default function HomeScreen() {
  return (
    <View className="flex-1 items-center justify-center gap-8 px-6">
     
        <TaskSheet />
     

      <PomodoroTimer
        initialSeconds={25 * 60}
        onComplete={() => {
          console.log("Pomodoro session completed from HomeScreen!");
        }}
        current_session={1}
        total_sessions={4}
      />

      <AlertDialogPreview />
    </View>
  );
}
