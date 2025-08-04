import type { WithRef } from "@/types";
import * as PopoverPrimitive from "@radix-ui/react-popover";

export type PopoverTriggerProps = Omit<
  WithRef<PopoverPrimitive.PopoverTriggerProps, "button">,
  "asChild"
>;

export const PopoverTrigger: React.FC<PopoverTriggerProps> = props => {
  return (
    <PopoverPrimitive.Trigger
      {...props}
      asChild
    />
  );
};
