import { ActionButton } from "@/components/ui/action-button";
import CircularProgressBar from "@/components/ui/circular-progress";
import { Text } from "@/components/ui/text";
import { useTimer } from "@/lib/hooks/useTimer";
import React from "react";
import { View } from "react-native";

interface PomodoroTimerProps {
  initialSeconds?: number;
  onComplete?: () => void;
  size?: number;
  strokeWidth?: number;
  fontSize?: number;
  current_session: number;
  total_sessions: number;
}

export const PomodoroTimer: React.FC<PomodoroTimerProps> = ({
  initialSeconds = 25 * 60,
  onComplete,
  size = 256,
  strokeWidth = 16,
  fontSize = 48,
  current_session = 0,
  total_sessions = 0,
}) => {
  const { 
    timeRemaining, 
    isRunning, 
    isCompleted, 
    progress, 
    formattedTime, 
    startTimer, 
    pauseTimer, 
    resetTimer 
  } = useTimer({ 
    initialSeconds,
    onComplete: () => {
      // Timer completed, could add notification or sound here
      console.log("Pomodoro session completed!");
      onComplete?.();
    }
  });

  const handleTimerAction = () => {
    if (isCompleted) {
      resetTimer();
    } else if (isRunning) {
      pauseTimer();
    } else {
      startTimer();
    }
  };

  const getButtonText = () => {
    if (isCompleted) return "Reset Timer";
    return isRunning ? "Pause" : "Start";
  };  

  return (
    <View className="items-center gap-16 w-full">
      <CircularProgressBar
        progress={progress}
        fontSize={fontSize}
        size={size}
        strokeWidth={strokeWidth}
        color={"#17CB17"}
        title={formattedTime}
        subtitle={`${current_session} of ${total_sessions} session`}
      />

      <View className="w-2/3 px-4">
        <ActionButton onPress={handleTimerAction}>
          <Text className="text-xl font-sans-semibold text-white">
            {getButtonText()}
          </Text>
        </ActionButton>
      </View>
    </View>
  );
};
