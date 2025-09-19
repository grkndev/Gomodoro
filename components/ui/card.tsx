import { TextClassContext } from "@/components/ui/text";
import { cn } from "@/lib/utils";
import { View, type ViewProps } from "react-native";

function Card({ className, ...props }: ViewProps & React.RefAttributes<View>) {
  return (
    <TextClassContext.Provider value="text-card-foreground">
      <View
        className={cn(
          "px-4 py-2 bg-card border-border flex flex-col rounded-2xl border  shadow-sm shadow-black/5",
          className
        )}
        {...props}
      />
    </TextClassContext.Provider>
  );
}

export { Card };
