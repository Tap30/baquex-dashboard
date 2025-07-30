import { usePortalConfig } from "@/components";
import { cn, useIsomorphicValue } from "@/utils";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import classes from "./styles.module.css";

export const PopoverContent = ({
  className,
  align = "center",
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Content>) => {
  const { resolveContainer } = usePortalConfig();
  const container = useIsomorphicValue(resolveContainer, null);

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
