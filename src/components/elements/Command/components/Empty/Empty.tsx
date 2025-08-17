import { cn } from "@/utils/cn";
import { Command as CommandPrimitive } from "cmdk";
import classes from "./styles.module.css";

export type CommandEmptyProps = React.ComponentProps<
  typeof CommandPrimitive.Empty
>;

export const CommandEmpty: React.FC<CommandEmptyProps> = props => {
  const { className, ...otherProps } = props;

  return (
    <CommandPrimitive.Empty
      {...otherProps}
      className={cn(classes["root"], className)}
    />
  );
};
