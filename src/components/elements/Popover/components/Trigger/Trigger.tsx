import * as PopoverPrimitive from "@radix-ui/react-popover";

export const PopoverTrigger = ({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Trigger>) => {
  return <PopoverPrimitive.Trigger {...props} />;
};
