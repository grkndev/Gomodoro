import { TextClassContext } from "@/components/ui/text";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { Platform, Pressable } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

const actionButtonVariants = cva(
  cn(
    "group rounded-full flex-row items-center justify-center gap-2 shadow-none border-b-4",
    Platform.select({
      web: "focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive whitespace-nowrap outline-none transition-all focus-visible:ring-[3px] disabled:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
    })
  ),
  {
    variants: {
      variant: {
        default: cn(
          "bg-[#17CB17] border-[#26FF26]",
          Platform.select({ web: "hover:bg-[#17CB17]/90" })
        ),
        stop: cn(
          "bg-red-300 border-red-500",
          Platform.select({
            web: "hover:bg-[#FFA2A2]/90",
          })
        ),
        pause: cn(
          "bg-orange-200 border-orange-500",
          Platform.select({
            web: "hover:bg-orange-200/90",
          })
        ),
        resume: cn(
          "bg-blue-200 border-blue-500",
          Platform.select({ web: "hover:bg-blue-200/90" })
        ),
        custom: cn(
          "bg-transparent border-transparent",
          Platform.select({ web: "hover:bg-transparent" })
        ),
      },
      size: {
        default: cn(
          "px-2 py-4 w-full group rounded-full",
          Platform.select({ web: "has-[>svg]:px-3" })
        ),
        sm: cn(
          "h-9 gap-1.5 px-3 sm:h-8",
          Platform.select({ web: "has-[>svg]:px-2.5 rounded-full" })
        ),
        lg: cn(
          "h-11 px-6 sm:h-10",
          Platform.select({ web: "has-[>svg]:px-4 rounded-full" })
        ),
        icon: "h-10 w-10 sm:h-9 sm:w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const actionButtonTextVariants = cva(
  cn(
    "text-foreground  font-sans-bold",
    Platform.select({ web: "pointer-events-none transition-colors" })
  ),
  {
    variants: {
      variant: {
        default: "text-primary-foreground",
        stop: "text-red-500",
        pause: "text-orange-500",
        resume: cn(
          "text-blue-500",
          Platform.select({
            web: "underline-offset-4 hover:underline group-hover:underline",
          })
        ),
        custom: "text-white",
      },
      size: {
        default: "",
        sm: "",
        lg: "",
        icon: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

type ActionButtonProps = React.ComponentProps<typeof Pressable> &
  React.RefAttributes<typeof Pressable> &
  VariantProps<typeof actionButtonVariants>;

function ActionButton({
  className,
  variant,
  size,
  ...props
}: ActionButtonProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePressIn = () => {
    scale.value = withSpring(0.95, {
      damping: 15,
      stiffness: 200,
    });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, {
      damping: 15,
      stiffness: 200,
    });
  };

  return (
    <TextClassContext.Provider
      value={actionButtonTextVariants({ variant, size })}
    >
      <Animated.View style={animatedStyle}>
        <Pressable
          className={cn(
            props.disabled && "opacity-50",
            actionButtonVariants({ variant, size }),
            className
          )}
          role="button"
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          {...props}
        />
      </Animated.View>
    </TextClassContext.Provider>
  );
}

export { ActionButton, actionButtonTextVariants, actionButtonVariants };
export type { ActionButtonProps };

