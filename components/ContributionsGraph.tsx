import { calculateLevel, chunkArray, cn, getDaysInMonth } from "@/lib/utils";
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
}: {
  activity: number;
}): React.JSX.Element => {
  const level = calculateLevel(activity);
  return (
    <View
      className={cn(
        "size-9 rounded-lg bg-green-500",
        level === "very-high" && "opacity-100",
        level === "high" && "opacity-75",
        level === "medium" && "opacity-50",
        level === "low" && "opacity-25",
        level === "none" && "bg-background border-border border"
      )}
    />
  );
};
