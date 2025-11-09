import { cn } from "@utils/cn";
import { Command as CommandPrimitive } from "cmdk";
import classes from "./styles.module.css";

export type CommandGroupProps = Omit<
  React.ComponentProps<typeof CommandPrimitive.Group>,
  "heading"
> & {
  /**
   * The text label of the group.
   */
  label: string;
};

export const CommandGroup: React.FC<CommandGroupProps> = props => {
  const { className, label, ...otherProps } = props;

  return (
    <CommandPrimitive.Group
      {...otherProps}
      heading={<strong className={classes["label"]}>{label}</strong>}
      className={cn(classes["root"], className)}
    />
  );
};
