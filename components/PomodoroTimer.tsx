/**
 * Pomodoro Timer Component
 * A beautiful, animated timer for the Pomodoro Technique with state management
 */

import React from "react";
import { View } from "react-native";
import Animated from "react-native-reanimated";

import CircularProgressBar from "@/components/ui/circular-progress";
import { PomodoroButton } from "@/components/ui/pomodoro-button";
import {
  LAYOUT_DIMENSIONS,
  POMODORO_COLORS,
  POMODORO_DEFAULTS,
} from "@/lib/constants/pomodoro";
import { usePomodoroAnimations } from "@/lib/hooks/usePomodoroAnimations";
import { useTimer } from "@/lib/hooks/useTimer";
import type { PomodoroTimerProps } from "@/lib/types/pomodoro";
import {
  formatSessionInfo,
  getMainButtonConfig,
  getSplitButtonsConfig,
  getTimerState,
} from "@/lib/utils/pomodoroHelpers";
import { useTheme } from "@react-navigation/native";

export const PomodoroTimer: React.FC<PomodoroTimerProps> = ({
  initialSeconds = POMODORO_DEFAULTS.INITIAL_SECONDS,
  onComplete,
  size = LAYOUT_DIMENSIONS.DEFAULT_SIZE,
  strokeWidth = LAYOUT_DIMENSIONS.DEFAULT_STROKE_WIDTH,
  fontSize = LAYOUT_DIMENSIONS.DEFAULT_FONT_SIZE,
  currentSession = 1,
  totalSessions = POMODORO_DEFAULTS.DEFAULT_SESSIONS,
}) => {
  // Timer logic
  const {
    timeRemaining,
    isRunning,
    isPaused,
    isCompleted,
    progress,
    formattedTime,
    startTimer,
    pauseTimer,
    resetTimer,
  } = useTimer({
    initialSeconds,
    onComplete: () => {
      console.log("Pomodoro session completed!");
      onComplete?.();
    },
  });

  // Determine current state and get animations
  const timerState = getTimerState(isRunning, isPaused, isCompleted);
  const animations = usePomodoroAnimations(timerState);

  // Button configurations
  const mainButtonConfig = getMainButtonConfig(timerState, {
    onStart: startTimer,
    onPause: pauseTimer,
    onReset: resetTimer,
  });

  const splitButtonsConfig = getSplitButtonsConfig({
    onResume: startTimer,
    onStop: resetTimer,
  });
  const { dark } = useTheme();

  return (
    <View className="items-center gap-16 w-full">
      <CircularProgressBar
        progress={progress}
        fontSize={fontSize}
        size={size}
        strokeWidth={strokeWidth}
        color={POMODORO_COLORS.PRIMARY_GREEN}
        backgroundColor={dark ? "#18181b" : "#e5e7eb"}
        title={formattedTime}
        subtitle={formatSessionInfo(currentSession, totalSessions)}
      />

      <View
        className="w-full items-center justify-center"
        style={{ minHeight: LAYOUT_DIMENSIONS.BUTTON_CONTAINER_MIN_HEIGHT }}
      >
        {/* Main morphing button - appears for idle, running, completed states */}
        {timerState !== "paused" && (
          <Animated.View
            style={[
              animations.morphingButtonStyle,
              {
                width: LAYOUT_DIMENSIONS.MAIN_BUTTON_WIDTH,
                position: "absolute",
              },
            ]}
            className="rounded-full"
          >
            <PomodoroButton
              config={mainButtonConfig}
              className="w-full bg-transparent border-transparent"
            />
          </Animated.View>
        )}

        {/* Split buttons container - appears when paused */}
        {timerState === "paused" && (
          <Animated.View
            style={[
              animations.splitContainerStyle,
              { width: LAYOUT_DIMENSIONS.SPLIT_CONTAINER_WIDTH },
            ]}
            className="flex-row gap-3 items-center justify-center"
          >
            {/* Resume button (left) */}
            <Animated.View style={animations.leftSplitStyle} className="flex-1">
              <PomodoroButton
                config={splitButtonsConfig.left}
                className="px-2"
                textSize="text-lg"
              />
            </Animated.View>

            {/* Stop button (right) */}
            <Animated.View
              style={animations.rightSplitStyle}
              className="flex-1"
            >
              <PomodoroButton
                config={splitButtonsConfig.right}
                className="px-2"
                textSize="text-lg"
              />
            </Animated.View>
          </Animated.View>
        )}
      </View>
    </View>
  );
};
