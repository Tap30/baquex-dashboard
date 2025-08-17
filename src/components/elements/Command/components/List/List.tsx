import type { Overwrite } from "@/types";
import { cn } from "@/utils/cn";
import { Command as CommandPrimitive } from "cmdk";
import classes from "./styles.module.css";

export type CommandListProps = Overwrite<
  React.ComponentProps<typeof CommandPrimitive.List>,
  {
    /**
     * Accessible label for this command menu. Not shown visibly.
     */
    label: string;
  }
>;

export const CommandList: React.FC<CommandListProps> = props => {
  const { className, label, ...otherProps } = props;

  return (
    <CommandPrimitive.List
      {...otherProps}
      label={label}
      className={cn(classes["root"], className)}
    />
  );
};
