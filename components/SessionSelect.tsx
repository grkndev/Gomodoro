import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { PortalHost } from "@rn-primitives/portal";
import type { TriggerRef } from "@rn-primitives/select";
import * as React from "react";
import { Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const fruits = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Blueberry", value: "blueberry" },
  { label: "Grapes", value: "grapes" },
  { label: "Pineapple", value: "pineapple" },
];

export function SelectPreview() {
  const ref = React.useRef<TriggerRef>(null);
  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: Platform.select({
      ios: insets.bottom,
      android: insets.bottom + 24,
    }),
    left: 12,
    right: 12,
  };

  // Workaround for rn-primitives/select not opening on mobile
  function onTouchStart() {
    ref.current?.open();
  }

  return (
    <>
      
      <Select>
            <SelectTrigger onTouchStart={onTouchStart} ref={ref}>
              <SelectValue
                className="text-foreground text-sm native:text-lg"
                placeholder="Select a role"
              />
            </SelectTrigger>
              <SelectContent
                insets={contentInsets}
                sideOffset={0}
                className="w-full z-40 bg-cyan-500"
                portalHost="select-furits"
              >
                <SelectGroup>
                  <SelectLabel>Roles</SelectLabel>
                  <SelectItem label="Staff" value="staff">
                    Staff
                  </SelectItem>
                  <SelectItem label="Manager" value="manager">
                    Manager
                  </SelectItem>
                  <SelectItem label="Admin" value="admin">
                    Admin
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
              <PortalHost name="select-furits" />
            
          </Select>
     
    </>
  );
}
