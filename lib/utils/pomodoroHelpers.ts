/**
 * Utility functions for Pomodoro Timer logic
 * Pure functions for determining states and configurations
 */

import type { TimerState, ButtonConfig, SplitButtonsConfig, HapticIntensity } from '../types/pomodoro';

/**
 * Determines the current timer state based on timer hook values
 */
export function getTimerState(
  isRunning: boolean, 
  isPaused: boolean, 
  isCompleted: boolean
): TimerState {
  if (isCompleted) return 'completed';
  if (isRunning) return 'running';
  if (isPaused) return 'paused';
  return 'idle';
}

/**
 * Gets the main button configuration based on timer state
 */
export function getMainButtonConfig(
  state: TimerState,
  handlers: {
    onStart: () => void;
    onPause: () => void;
    onReset: () => void;
  }
): ButtonConfig {
  switch (state) {
    case 'idle':
      return {
        text: 'Start',
        action: handlers.onStart,
        variant: 'default',
      };
    case 'running':
      return {
        text: 'Pause',
        action: handlers.onPause,
        variant: 'custom',
      };
    case 'completed':
      return {
        text: 'Reset Timer',
        action: handlers.onReset,
        variant: 'custom',
      };
    case 'paused':
      // This case shouldn't be used for main button when split is active
      return {
        text: 'Resume',
        action: handlers.onStart,
        variant: 'default',
      };
  }
}

/**
 * Gets the split buttons configuration for paused state
 */
export function getSplitButtonsConfig(handlers: {
  onResume: () => void;
  onStop: () => void;
}): SplitButtonsConfig {
  return {
    left: {
      text: 'Resume',
      action: handlers.onResume,
      variant: 'resume',
    },
    right: {
      text: 'Stop',
      action: handlers.onStop,
      variant: 'stop',
    },
  };
}

/**
 * Determines the appropriate haptic feedback intensity for an action
 */
export function getHapticIntensity(action: string): HapticIntensity {
  switch (action) {
    case 'start':
    case 'resume':
    case 'reset':
      return 'medium';
    case 'pause':
      return 'light';
    case 'stop':
      return 'heavy';
    default:
      return 'medium';
  }
}

/**
 * Formats session information for display
 */
export function formatSessionInfo(current: number, total: number): string {
  return `${current} of ${total} session${total !== 1 ? 's' : ''}`;
}
