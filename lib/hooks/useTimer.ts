import { useCallback, useEffect, useRef, useState } from 'react';
import { AppState, AppStateStatus } from 'react-native';

interface UseTimerProps {
  initialSeconds?: number;
  onComplete?: () => void;
}

interface UseTimerReturn {
  timeRemaining: number; // seconds
  isRunning: boolean;
  isPaused: boolean;
  isCompleted: boolean;
  progress: number; // 0-100
  formattedTime: string; // MM:SS
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
}

export const useTimer = ({ 
  initialSeconds = 25 * 60, 
  onComplete 
}: UseTimerProps = {}): UseTimerReturn => {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const backgroundTimeRef = useRef<number | null>(null);
  const completionCalledRef = useRef<boolean>(false);
  
  const initialTime = initialSeconds;
  const [timeRemaining, setTimeRemaining] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  // Format time to MM:SS
  const formatTime = useCallback((seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }, []);

  // Calculate progress percentage (remaining time)
  const progress = (timeRemaining / initialTime) * 100;

  // Start timer function
  const startTimer = useCallback(() => {
    if (timeRemaining <= 0 || isCompleted) return;
    
    setIsRunning(true);
    setIsPaused(false);
    intervalRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          setIsRunning(false);
          setIsPaused(false);
          setIsCompleted(true);
          if (!completionCalledRef.current) {
            completionCalledRef.current = true;
            onComplete?.();
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [timeRemaining, isCompleted, onComplete]);

  // Pause timer function
  const pauseTimer = useCallback(() => {
    setIsRunning(false);
    setIsPaused(true);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // Reset timer function
  const resetTimer = useCallback(() => {
    setIsRunning(false);
    setIsPaused(false);
    setIsCompleted(false);
    setTimeRemaining(initialTime);
    completionCalledRef.current = false;
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [initialTime]);

  // Handle app state changes (background/foreground)
  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (nextAppState === 'background' && isRunning) {
        // Save current time when going to background
        backgroundTimeRef.current = Date.now();
      } else if (nextAppState === 'active' && isRunning && backgroundTimeRef.current) {
        // Calculate elapsed time while in background
        const elapsedSeconds = Math.floor((Date.now() - backgroundTimeRef.current) / 1000);
        
        setTimeRemaining((prev) => {
          const newTime = Math.max(0, prev - elapsedSeconds);
          if (newTime <= 0) {
            setIsRunning(false);
            setIsPaused(false);
            setIsCompleted(true);
            if (!completionCalledRef.current) {
              completionCalledRef.current = true;
              onComplete?.();
            }
          }
          return newTime;
        });
        
        backgroundTimeRef.current = null;
      }
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);
    
    return () => {
      subscription?.remove();
    };
  }, [isRunning, onComplete]);

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return {
    timeRemaining,
    isRunning,
    isPaused,
    isCompleted,
    progress: Math.min(100, Math.max(0, progress)), // Clamp between 0-100
    formattedTime: formatTime(timeRemaining),
    startTimer,
    pauseTimer,
    resetTimer,
  };
};
