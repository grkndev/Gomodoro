import { Text } from "@/components/ui/text";
import { formatDuration } from "@/lib/utils";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import Icons from "./ui/icons";

interface Session {
  id: number;
  step: number;
  total_seconds: number;
  type: "work" | "break";
}

interface TaskButtonProps {
  title: string;
  sessions: Session[];
  borderColor?: string;
  onPress?: () => void;
}

export const TaskButton: React.FC<TaskButtonProps> = ({
  title,
  sessions,
  borderColor = "#3B82F6", // default blue color
  onPress,
}) => {
  const renderSessionDurations = () => {
    return sessions.sort((a, b) => a.step - b.step).map((session, index) => (
      <View key={session.id} className="flex-row items-center">
        <Text className="text-xs text-muted-foreground">
          {formatDuration(session.total_seconds)}
        </Text>
        {index < sessions.length - 1 && (
          <View className="mx-1">
            <Icons name="ArrowRight" size={12} color="#9CA3AF" />
          </View>
        )}
      </View>
    ));
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-primary-foreground rounded-3xl p-4 mb-3 border border-border"
      style={{
        borderLeftWidth: 4,
        borderLeftColor: borderColor,
      }}
    >
      {/* Title Row */}
      <View className="mb-2">
        <Text className="text-lg font-sans-medium text-foreground">{title}</Text>
      </View>
      
      {/* Session Info Row */}
      <View className="flex-row items-center flex-wrap">
        {renderSessionDurations()}
      </View>
    </TouchableOpacity>
  );
};

export default TaskButton;
