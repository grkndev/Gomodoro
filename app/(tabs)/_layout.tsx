import Header from "@/components/Header";
import Icons from "@/components/ui/icons";
import { Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        header: () => <Header />,
        tabBarActiveTintColor: "black",
        headerShown: true,
        tabBarStyle: {
          backgroundColor: "white",
          shadowColor: "white",
        },
        

        // tabBarButton: () => null,
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Icons size={24} name="House" color={color} />
          ),
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
