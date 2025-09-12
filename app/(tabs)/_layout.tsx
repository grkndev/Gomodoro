import Icons from '@/components/ui/icons';
import { Tabs } from 'expo-router';
import React from 'react';


export default function TabLayout() {

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "black",
        headerShown: false,
        // tabBarButton: () => null,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Icons size={28} name="Activity" color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <Icons size={28} name="BookOpen" color={color} />,
        }}
      />
    </Tabs>
  );
}
