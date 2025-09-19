/**
 * TypeScript type definitions for Pomodoro Timer components
 */

/**
 * Props for the main PomodoroTimer component
 */
export interface PomodoroTimerProps {
  /** Initial duration in seconds (default: 25 minutes) */
  initialSeconds?: number;
  /** Callback function called when timer completes */
  onComplete?: () => void;
  /** Size of the circular progress bar */
  size?: number;
  /** Width of the progress bar stroke */
  strokeWidth?: number;
  /** Font size for the timer display */
  fontSize?: number;
  /** Current session number */
  currentSession: number;
  /** Total number of sessions planned */
  totalSessions: number;
}

/**
 * Timer states for button rendering logic
 */
export type TimerState = 
  | 'idle'      // Not started yet
  | 'running'   // Currently running
  | 'paused'    // Paused and can be resumed
  | 'completed' // Timer finished

/**
 * Button configuration for different timer states
 */
export interface ButtonConfig {
  /** Display text for the button */
  text: string;
  /** Action to perform when pressed */
  action: () => void;
  /** Visual variant of the button */
  variant: 'default' | 'pause' | 'resume' | 'stop' | 'custom';
}

/**
 * Split button configuration when timer is paused
 */
export interface SplitButtonsConfig {
  /** Left button (usually Resume) */
  left: ButtonConfig;
  /** Right button (usually Stop) */
  right: ButtonConfig;
}

/**
 * Animation state values for morphing effects
 */
export interface AnimationState {
  /** Button morph animation value (0=start, 1=pause, 2=split) */
  buttonMorph: number;
  /** Split progress animation value (0=single, 1=split) */
  splitProgress: number;
  /** Scale animation value */
  scale: number;
}

/**
 * Haptic feedback intensity levels
 */
export type HapticIntensity = 'light' | 'medium' | 'heavy';
