import { SelectPreview } from '@/components/SelectPreview'
import { Text } from '@/components/ui/text'
import React from 'react'
import { View } from 'react-native'
export default function ActivityScreen() {
  return (
    <View className='flex-1 items-center justify-center'>
      <Text>ActivityScreen</Text>
      <SelectPreview />
    </View>
  )
}