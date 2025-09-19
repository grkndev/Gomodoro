/**
 * Custom hook for managing Pomodoro Timer animations
 * Handles all animation states and transitions
 */

import { useEffect } from 'react';
import { 
  Easing, 
  interpolate, 
  interpolateColor, 
  useAnimatedStyle, 
  useSharedValue, 
  withSpring, 
  withTiming 
} from 'react-native-reanimated';
import { ANIMATION_TIMINGS, POMODORO_COLORS } from '../constants/pomodoro';
import type { TimerState } from '../types/pomodoro';

/**
 * Hook for managing Pomodoro timer animations
 */
export function usePomodoroAnimations(state: TimerState) {
  // Animation shared values
  const buttonMorph = useSharedValue(0); // 0 = start, 1 = pause, 2 = split
  const splitProgress = useSharedValue(0); // 0 = single, 1 = split
  const scaleValue = useSharedValue(1);

  // Update animations based on timer state
  useEffect(() => {
    const springConfig = { 
      damping: ANIMATION_TIMINGS.SPRING_DAMPING, 
      stiffness: ANIMATION_TIMINGS.SPRING_STIFFNESS 
    };

    switch (state) {
      case 'idle':
        buttonMorph.value = withTiming(0, { 
          duration: ANIMATION_TIMINGS.MORPH_DURATION, 
          easing: Easing.out(Easing.quad) 
        });
        splitProgress.value = withTiming(0, { duration: ANIMATION_TIMINGS.SPLIT_DURATION });
        scaleValue.value = withSpring(1, springConfig);
        break;

      case 'running':
        buttonMorph.value = withTiming(1, { 
          duration: ANIMATION_TIMINGS.MORPH_DURATION, 
          easing: Easing.out(Easing.quad) 
        });
        splitProgress.value = withTiming(0, { duration: ANIMATION_TIMINGS.SPLIT_DURATION });
        scaleValue.value = withSpring(1, springConfig);
        break;

      case 'paused':
        buttonMorph.value = withTiming(2, { 
          duration: ANIMATION_TIMINGS.MORPH_DURATION, 
          easing: Easing.out(Easing.quad) 
        });
        splitProgress.value = withTiming(1, { 
          duration: ANIMATION_TIMINGS.SPLIT_DURATION_WITH_BOUNCE, 
          easing: Easing.out(Easing.back(1.5)) 
        });
        scaleValue.value = withSpring(1, springConfig);
        break;

      case 'completed':
        buttonMorph.value = withTiming(0, { 
          duration: ANIMATION_TIMINGS.MORPH_DURATION, 
          easing: Easing.out(Easing.quad) 
        });
        splitProgress.value = withTiming(0, { duration: ANIMATION_TIMINGS.SPLIT_DURATION });
        scaleValue.value = withSpring(ANIMATION_TIMINGS.COMPLETED_SCALE, springConfig);
        break;
    }
  }, [state, buttonMorph, splitProgress, scaleValue]);

  // Animated style for the main morphing button
  const morphingButtonStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      buttonMorph.value,
      [0, 1, 2],
      [
        POMODORO_COLORS.PRIMARY_GREEN, 
        POMODORO_COLORS.PRIMARY_ORANGE, 
        POMODORO_COLORS.PRIMARY_ORANGE
      ]
    );

    const borderColor = interpolateColor(
      buttonMorph.value,
      [0, 1, 2],
      [
        POMODORO_COLORS.PRIMARY_GREEN_LIGHT, 
        POMODORO_COLORS.PRIMARY_ORANGE_DARK, 
        POMODORO_COLORS.PRIMARY_ORANGE_DARK
      ]
    );

    const scale = interpolate(
      scaleValue.value,
      [ANIMATION_TIMINGS.PRESS_SCALE, 1, ANIMATION_TIMINGS.COMPLETED_SCALE],
      [ANIMATION_TIMINGS.PRESS_SCALE, 1, ANIMATION_TIMINGS.COMPLETED_SCALE]
    );

    const opacity = interpolate(
      splitProgress.value,
      [0, 0.3, 1],
      [1, 0.5, 0]
    );

    return {
      backgroundColor,
      borderColor,
      borderBottomWidth: 4,
      transform: [{ scale }],
      opacity,
    };
  });

  // Animated style for split buttons container
  const splitContainerStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      splitProgress.value,
      [0, 0.3, 1],
      [0, 0.5, 1]
    );

    const scale = interpolate(
      splitProgress.value,
      [0, 0.8, 1],
      [0.8, 0.95, 1]
    );

    return {
      opacity,
      transform: [{ scale }],
    };
  });

  // Animated style for left split button (Resume)
  const leftSplitStyle = useAnimatedStyle(() => {
    const translateX = interpolate(
      splitProgress.value,
      [0, 0.5, 1],
      [50, -10, 0]
    );

    const scale = interpolate(
      splitProgress.value,
      [0, 0.6, 1],
      [0.3, 0.9, 1]
    );

    const opacity = interpolate(
      splitProgress.value,
      [0, 0.4, 1],
      [0, 0.7, 1]
    );

    return {
      transform: [{ translateX }, { scale }],
      opacity,
    };
  });

  // Animated style for right split button (Stop)
  const rightSplitStyle = useAnimatedStyle(() => {
    const translateX = interpolate(
      splitProgress.value,
      [0, 0.5, 1],
      [-50, 10, 0]
    );

    const scale = interpolate(
      splitProgress.value,
      [0, 0.6, 1],
      [0.3, 0.9, 1]
    );

    const opacity = interpolate(
      splitProgress.value,
      [0, 0.4, 1],
      [0, 0.7, 1]
    );

    return {
      transform: [{ translateX }, { scale }],
      opacity,
    };
  });

  return {
    morphingButtonStyle,
    splitContainerStyle,
    leftSplitStyle,
    rightSplitStyle,
  };
}
