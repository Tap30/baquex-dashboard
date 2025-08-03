import { usePortalConfig } from "@/components";
import type { WithRef } from "@/types";
import { cn, useIsomorphicValue } from "@/utils";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import classes from "./styles.module.css";

export type PopoverContentProps = Omit<
  WithRef<PopoverPrimitive.PopoverContentProps, "div">,
  "asChild" | "forceMount" | "arrowPadding" | "sticky" | "hideWhenDetached"
>;

export const PopoverContent: React.FC<PopoverContentProps> = props => {
  const { className, ...otherProps } = props;

  const { resolveContainer } = usePortalConfig();
  const container = useIsomorphicValue(resolveContainer, null);

  return (
    <PopoverPrimitive.Portal container={container}>
      <PopoverPrimitive.Content
        {...otherProps}
        className={cn(classes["root"], className)}
      />
    </PopoverPrimitive.Portal>
  );
};
