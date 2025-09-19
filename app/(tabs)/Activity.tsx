import ContributionsGraph from "@/components/ContributionsGraph";
import { Card } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import React from "react";
import { View } from "react-native";
export default function ActivityScreen() {
  return (
    <View className="flex-1 items-center justify-start px-4 pt-4 gap-4">
      <Card className="w-full items-center p-4">
        <ContributionsGraph />
      </Card>

      <View className=" flex-row gap-2 w-full">
        <Card className="flex-auto items-start gap-0">
          <Text className="font-sans-semibold text-zinc-900 text-base">
            Seri
          </Text>
          <View className="flex-row gap-2">
            <Text className="font-sans-bold text-green-500 text-2xl">
              15 Gün
            </Text>
          </View>
          <View className="flex-row gap-2">
            <Text className="font-sans-normal text-muted-foreground text-xs">
              4 Eyl - 18 Eyl 2025
            </Text>
          </View>
        </Card>
        <Card className="flex-auto items-start gap-0">
          <Text className="font-sans-semibold text-foreground text-base">
            Seri
          </Text>
          <View className="flex-row gap-2">
            <Text className="font-sans-bold text-green-500 text-2xl">
              15 Gün
            </Text>
          </View>
          <View className="flex-row gap-2">
            <Text className="font-sans-normal text-muted-foreground text-xs">
              4 Eyl - 18 Eyl 2025
            </Text>
          </View>
        </Card>
      </View>

      <View className="w-full">
        <Card className="items-start gap-0 w-full p-4">
          <Text className="font-sans-semibold text-foreground text-base">
            Favori seans
          </Text>
          <Text className="font-sans-bold text-green-500 text-2xl">
            Pomodoro #1
          </Text>
        </Card>
      </View>

      <View className=" flex-row gap-2 w-full">
        <Card className="flex-auto items-start justify-center">
          <Text className="mb-1 font-sans-semibold text-foreground text-xs text-wrap max-w-[80%]">
            Günlük seans
          </Text>
          <View className="flex-row gap-2">
            <Text className="font-sans-bold text-green-500 text-xl">
              8sa 24dk
            </Text>
          </View>
        </Card>
        <Card className="flex-auto items-start justify-center gap-0">
          <Text className="mb-1 font-sans-semibold text-foreground text-xs text-wrap max-w-[80%]">
            En uzun seans
          </Text>
          <View className="flex-row gap-2">
            <Text className="font-sans-bold text-green-500 text-xl">
              14sa 37dk
            </Text>
          </View>
          <View className="flex-row gap-2">
            <Text className="font-sans-normal text-muted-foreground text-xs">
              12 Eyl 2025
            </Text>
          </View>
        </Card>
      </View>
    </View>
  );
}
