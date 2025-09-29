import Header from "@/components/Header";
import Icons from "@/components/ui/icons";
import { THEME } from "@/lib/theme";
import { useAppTheme } from "@/lib/theme-provider";
import { Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
  const { isDark } = useAppTheme();
  const colors = THEME[isDark ? "dark" : "light"];
  return (
    <Tabs
      screenOptions={{
        header: () => <Header />,
        tabBarActiveTintColor: colors.mutedForeground,
        tabBarInactiveTintColor: colors.foreground,
        headerShown: true,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor: colors.border,
          shadowColor: colors.card,
        },
        

        // tabBarButton: () => null,
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <Icons size={24} name="House" color={color} />,
        }}
      />
      <Tabs.Screen
        name="Activity"
        options={{
          title: "Activity",
          tabBarIcon: ({ color }) => (
            <Icons size={24} name="ChartArea" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Calendar"
        options={{
          title: "Calendar",
          tabBarIcon: ({ color }) => (
            <Icons size={24} name="CalendarDays" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <Icons size={24} name="Settings" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
