import { cn } from "@utils/cn";
import { Command as CommandPrimitive } from "cmdk";
import { useCallback } from "react";
import classes from "./styles.module.css";

export type CommandItemProps = React.ComponentProps<
  typeof CommandPrimitive.Item
> & {
  /**
   */
  explicitlySelected?: boolean;
};

export const CommandItem: React.FC<CommandItemProps> = props => {
  const { className, explicitlySelected = false, ...otherProps } = props;

  const refCallback = useCallback(
    (node: HTMLDivElement | null) => {
      if (!node) return;

      const originalHighlightedState =
        node.getAttribute("data-selected") ?? "false";

      node.setAttribute("data-highlighted", originalHighlightedState);
      node.setAttribute("data-explicitly-selected", String(explicitlySelected));
    },
    [explicitlySelected],
  );

  return (
    <CommandPrimitive.Item
      {...otherProps}
      ref={refCallback}
      className={cn(classes["root"], className)}
    />
  );
};
