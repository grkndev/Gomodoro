import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  
  if (hours > 0 && minutes > 0) {
    return `${hours}sa ${minutes}dk`;
  } else if (hours > 0) {
    return `${hours}sa`;
  } else {
    return `${minutes}dk`;
  }
}

export function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

export function chunkArray(array: any[], size: number) {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}

export function calculateLevel(activity: number): ContributionLevel {
  if (activity === 0) return "none";
  if (activity < 25) return "low";
  if (activity < 50) return "medium";
  if (activity < 75) return "high";
  return "very-high";
}

export type ContributionLevel = "none" | "low" | "medium" | "high" | "very-high";