/**
 * Specialized button component for Pomodoro Timer
 * Handles different states and haptic feedback
 */

import type { ButtonConfig, HapticIntensity } from '@/lib/types/pomodoro';
import { getHapticIntensity } from '@/lib/utils/pomodoroHelpers';
import * as Haptics from 'expo-haptics';
import React from 'react';
import { ActionButton } from './action-button';
import { Text } from './text';

interface PomodoroButtonProps {
  /** Button configuration */
  config: ButtonConfig;
  /** Additional CSS classes */
  className?: string;
  /** Button size variant */
  size?: 'default' | 'sm' | 'lg' | 'icon';
  /** Text size class */
  textSize?: string;
}

/**
 * Gets the appropriate haptic feedback style from intensity
 */
function getHapticStyle(intensity: HapticIntensity): Haptics.ImpactFeedbackStyle {
  switch (intensity) {
    case 'light':
      return Haptics.ImpactFeedbackStyle.Light;
    case 'medium':
      return Haptics.ImpactFeedbackStyle.Medium;
    case 'heavy':
      return Haptics.ImpactFeedbackStyle.Heavy;
  }
}

/**
 * Pomodoro-specific button with integrated haptic feedback
 */
export function PomodoroButton({ 
  config, 
  className = '', 
  size = 'default',
  textSize = 'text-xl'
}: PomodoroButtonProps) {
  const handlePress = async () => {
    // Determine action type from button text for haptic feedback
    const actionType = config.text.toLowerCase().replace(' timer', '');
    const intensity = getHapticIntensity(actionType);
    const hapticStyle = getHapticStyle(intensity);
    
    // Provide haptic feedback before action
    await Haptics.impactAsync(hapticStyle);
    
    // Execute the button's action
    config.action();
  };

  return (
    <ActionButton 
      onPress={handlePress}
      variant={config.variant}
      size={size}
      className={className}
    >
      <Text className={`${textSize} font-bold `}>
        {config.text}
      </Text>
    </ActionButton>
  );
}
