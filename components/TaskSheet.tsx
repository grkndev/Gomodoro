import { Text } from "@/components/ui/text";
import { currentPomodoro } from "@/lib/hooks/usePomodoro";
import { THEME } from "@/lib/theme";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useTheme } from "@react-navigation/native";
import React, { useCallback, useRef } from "react";
import { Platform, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import TaskButton from "./TaskButton";
import Icons from "./ui/icons";

const BORDER_RADIUS = Platform.select({
  ios: 24 + 12,
  android: 24,
});

const BottomSheetBackground = ({ style }: { style?: any }) => {
  return (
    <View
      style={[
        {
          backgroundColor: "#ffffff",
          borderRadius: BORDER_RADIUS,
          overflow: "hidden",
        },
        style,
      ]}
    />
  );
};

const TaskSheet = () => {
  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const insets = useSafeAreaInsets();

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);
  const { dark } = useTheme();

  // renders
  return (
    <View className="w-full max-w-xs px-6">
      <TouchableOpacity
        className="flex-row items-center justify-between bg-zinc-100 dark:bg-zinc-800 rounded-md p-2"
        onPress={handlePresentModalPress}
      >
        <Text className="text-sm font-medium text-foreground">Pomodoro #1</Text>
        <Icons name="ChevronDown" size={24} color={"#d4d4d8"} />
      </TouchableOpacity>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        onChange={handleSheetChanges}
        enableDynamicSizing={true}
        // snapPoints={["45%", "75%"]}
        enablePanDownToClose={true}
        enableDismissOnClose={true}
        backgroundComponent={BottomSheetBackground}
        containerStyle={{
          margin: 12,
          marginBottom: Platform.select({
            ios: insets.bottom - 12,
            android: insets.bottom + 4,
          }),
          overflow: "hidden",
          borderRadius: BORDER_RADIUS,
        }}
        handleStyle={{
          backgroundColor: dark ? THEME.dark.primaryForeground : THEME.light.primaryForeground,
          borderTopLeftRadius: BORDER_RADIUS,
          borderTopRightRadius: BORDER_RADIUS,
        
        }}
        handleIndicatorStyle={{
          backgroundColor: dark ? THEME.dark.secondary : THEME.light.secondaryForeground,
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
        <BottomSheetView
          className="flex-1 px-5 bg-primary-foreground"
          style={{
            paddingBottom: Platform.select({
              ios: insets.bottom + 12,
              android: insets.bottom * 2 + 12,
            }),
          }}
        >
          <Text className="text-xl font-sans-semibold text-foreground mb-4">
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
