import {
  calculateLevel,
  chunkArray,
  cn,
  ContributionLevel,
  getDaysInMonth,
} from "@/lib/utils";
import React from "react";
import { View } from "react-native";
import { Text } from "./ui/text";

export default function ContributionsGraph() {
  const daysInMonth = getDaysInMonth(
    new Date().getFullYear(),
    new Date().getMonth()
  );
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const weeks = chunkArray(days, 7);
  return (
    <View className="gap-2">
      <Text className="font-sans-bold text-foreground text-2xl">
        Eylül 2025
      </Text>
      {weeks.map((week, index) => (
        <View key={index} className="flex-row gap-2">
          {week.map((day, index) => (
            <ContributionBox
              key={index}
              day={day}
              activity={Math.floor(Math.random() * 100)}
            />
          ))}
        </View>
      ))}
    </View>
  );
}

const ContributionBox = ({
  activity,
  day,
}: {
  activity: number;
  day: number;
}): React.JSX.Element => {
  const level = calculateLevel(activity);
  return (
    <View
      className={cn(
        "size-9 rounded-lg flex items-center justify-center",
        
        level === ContributionLevel.VERY_HIGH && "bg-green-500",
        level === ContributionLevel.HIGH      && "bg-green-500/75",
        level === ContributionLevel.MEDIUM    && "bg-green-500/50",
        level === ContributionLevel.LOW       && "bg-green-500/25",
        level === ContributionLevel.NONE      && "bg-background border-border border bg-opacity-100"
      )}
    >
      <Text className="font-sans-normal text-foreground text-xs">{day}</Text>
    </View>
  );
};
