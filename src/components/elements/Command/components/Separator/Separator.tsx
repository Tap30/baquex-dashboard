import { cn } from "@/utils/cn";
import { Command as CommandPrimitive } from "cmdk";
import classes from "./styles.module.css";

export type CommandSeparatorProps = React.ComponentProps<
  typeof CommandPrimitive.Separator
>;

export const CommandSeparator: React.FC<CommandSeparatorProps> = props => {
  const { className, ...otherProps } = props;

  return (
    <CommandPrimitive.Separator
      {...otherProps}
      className={cn(classes["root"], className)}
    />
  );
};
