import * as PopoverPrimitive from "@radix-ui/react-popover";

export type PopoverTriggerProps = Omit<
  PopoverPrimitive.PopoverTriggerProps,
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
