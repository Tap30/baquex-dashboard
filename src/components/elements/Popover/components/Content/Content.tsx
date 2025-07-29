import { PORTAL_DESTINATION_ID } from "@/constants";
import { cn } from "@/utils";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import classes from "./styles.module.css";

export const PopoverContent = ({
  className,
  align = "center",
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Content>) => {
  const container = document.getElementById(PORTAL_DESTINATION_ID);

  // TODO: fix HMR issue
  return (
    <PopoverPrimitive.Portal container={container}>
      <PopoverPrimitive.Content
        align={align}
        sideOffset={sideOffset}
        className={cn(classes["content"], className)}
        {...props}
      />
    </PopoverPrimitive.Portal>
  );
};
