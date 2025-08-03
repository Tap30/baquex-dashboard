import { cn } from "@/utils";
import { Command as CommandPrimitive } from "cmdk";
import classes from "./styles.module.css";

export type CommandItemProps = React.ComponentProps<
  typeof CommandPrimitive.Item
>;

export const CommandItem: React.FC<CommandItemProps> = props => {
  const { className, ...otherProps } = props;

  return (
    <CommandPrimitive.Item
      {...otherProps}
      className={cn(classes["root"], className)}
    />
  );
};
