import type { Overwrite } from "@types";
import { cn } from "@utils/cn";
import { Command as CommandPrimitive } from "cmdk";
import classes from "./styles.module.css";

export type CommandProps = Overwrite<
  React.ComponentProps<typeof CommandPrimitive>,
  {
    /**
     * Accessible label for this command menu. Not shown visibly.
     */
    label: string;
  }
>;

export const Command: React.FC<CommandProps> = props => {
  const { className, label, ...otherProps } = props;

  return (
    <CommandPrimitive
      {...otherProps}
      label={label}
      className={cn(classes["root"], className)}
    />
  );
};
