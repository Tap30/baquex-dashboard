import { usePortalConfig } from "@/components";
import { cn, useIsomorphicValue } from "@/utils";
import * as SelectPrimitive from "@radix-ui/react-select";
import classes from "./styles.module.css";

export const SelectContent = ({
  className,
  children,
  position = "popper",
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) => {
  const { resolveContainer } = usePortalConfig();
  const container = useIsomorphicValue(resolveContainer, null);

  return (
    <SelectPrimitive.Portal container={container}>
      <SelectPrimitive.Content
        className={cn(classes["content"], className)}
        position={position}
        {...props}
      >
        <SelectPrimitive.Viewport
        // className={cn(
        //   "p-1",
        //   position === "popper" &&
        //     "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1",
        // )}
        >
          {children}
        </SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
};
