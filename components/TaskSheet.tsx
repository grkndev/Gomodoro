import { Text } from "@/components/ui/text";
import { currentPomodoro } from "@/lib/hooks/usePomodoro";
import {
    BottomSheetBackdrop,
    BottomSheetModal,
    BottomSheetView
} from "@gorhom/bottom-sheet";
import React, { useCallback, useRef } from "react";
import { TouchableOpacity, View } from "react-native";
import TaskButton from "./TaskButton";
import Icons from "./ui/icons";

const TaskSheet = () => {
  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  // renders
  return (
   
      <View className="w-full max-w-xs px-6">
        <TouchableOpacity className="flex-row items-center justify-between bg-zinc-100 rounded-md p-2" onPress={handlePresentModalPress}>
            <Text className="text-sm font-medium">Pomodoro #1</Text>
            <Icons name="ChevronDown" size={24} color="black" />
        </TouchableOpacity>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          onChange={handleSheetChanges}
          enableDynamicSizing={false}
          snapPoints={["45%", "75%"]}
          enablePanDownToClose={true}
          enableDismissOnClose={true}
          backgroundStyle={{
            backgroundColor: "#ffffff",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}
          handleIndicatorStyle={{
            backgroundColor: "#D1D5DB",
            width: 50,
          }}
         
          backdropComponent={(props) => (
            <BottomSheetBackdrop
              {...props}
              appearsOnIndex={0}
              disappearsOnIndex={-1}
              opacity={0.5}
            />
          )}
        >
          <BottomSheetView className="flex-1 px-5 pt-2.5">
            <Text className="text-xl font-bold text-gray-900 mb-4">
              Select Pomodoro Session
            </Text>
            
            <TaskButton
              title="Pomodoro #1"
              sessions={currentPomodoro().sessions}
              borderColor="#3B82F6"
              onPress={() => console.log("Selected Pomodoro #1")}
            />
            
            <TaskButton
              title="Study Session"
              sessions={[
                { id: 1, step: 1, total_seconds: 45 * 60, type: "work" },
                { id: 2, step: 2, total_seconds: 15 * 60, type: "break" },
                { id: 3, step: 3, total_seconds: 45 * 60, type: "work" },
                { id: 4, step: 4, total_seconds: 30 * 60, type: "break" },
              ]}
              borderColor="#10B981"
              onPress={() => console.log("Selected Study Session")}
            />
            
            <TaskButton
              title="Deep Work"
              sessions={[
                { id: 5, step: 1, total_seconds: 90 * 60, type: "work" },
                { id: 6, step: 2, total_seconds: 20 * 60, type: "break" },
              ]}
              borderColor="#F59E0B"
              onPress={() => console.log("Selected Deep Work")}
            />
          </BottomSheetView>
        </BottomSheetModal>
      </View>
    
  );
};


export default TaskSheet;
