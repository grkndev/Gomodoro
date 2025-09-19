/**
 * Constants for Pomodoro Timer component
 * Centralizes all magic numbers and configuration values
 */

export const POMODORO_COLORS = {
  // Primary colors
  PRIMARY_GREEN: '#17CB17',
  PRIMARY_GREEN_LIGHT: '#26FF26',
  PRIMARY_ORANGE: '#fb923c',
  PRIMARY_ORANGE_DARK: '#f97316',
  
  // Button colors
  STOP_BG: '#fca5a5', // red-300
  STOP_BORDER: '#ef4444', // red-500
  STOP_TEXT: '#ef4444', // red-500
  
  RESUME_BG: '#93c5fd', // blue-300
  RESUME_BORDER: '#3b82f6', // blue-500
  RESUME_TEXT: '#3b82f6', // blue-500
  
  // Text colors
  TEXT_WHITE: '#ffffff',
  TEXT_ZINC_900: '#18181b',
  TEXT_ZINC_400: '#a1a1aa',
} as const;

export const ANIMATION_TIMINGS = {
  // Button morphing animations
  MORPH_DURATION: 400,
  SPLIT_DURATION: 300,
  SPLIT_DURATION_WITH_BOUNCE: 500,
  
  // Spring animation configs
  SPRING_DAMPING: 15,
  SPRING_STIFFNESS: 200,
  
  // Scale animations
  PRESS_SCALE: 0.95,
  COMPLETED_SCALE: 1.05,
} as const;

export const LAYOUT_DIMENSIONS = {
  // Button widths as percentages
  MAIN_BUTTON_WIDTH: '66.666667%', // 2/3
  SPLIT_CONTAINER_WIDTH: '83.333333%', // 5/6
  
  // Minimum heights
  BUTTON_CONTAINER_MIN_HEIGHT: 64,
  
  // Default component sizes
  DEFAULT_SIZE: 256,
  DEFAULT_STROKE_WIDTH: 16,
  DEFAULT_FONT_SIZE: 48,
} as const;

export const POMODORO_DEFAULTS = {
  INITIAL_SECONDS: 25 * 60, // 25 minutes
  DEFAULT_SESSIONS: 4,
} as const;
