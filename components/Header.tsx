import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from './ui/text';
export default function Header() {
    const insets = useSafeAreaInsets();
  return (
    <View className='border-b border-zinc-200 pb-2 items-center justify-center' style={{ marginTop: insets.top }}>
      <Text className='text-xl font-sans-bold text-green-500'>Gomodoro</Text>
    </View>
  )
}