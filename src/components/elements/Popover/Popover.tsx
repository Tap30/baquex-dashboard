import * as PopoverPrimitive from "@radix-ui/react-popover";

export const Popover = ({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Root>) => {
  return <PopoverPrimitive.Root {...props} />;
};
