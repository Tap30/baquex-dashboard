import { Icon } from "@/components/Icon";
import { cn } from "@/utils/cn";
import { mdiMagnify } from "@mdi/js";
import { Command as CommandPrimitive } from "cmdk";
import classes from "./styles.module.css";

export type CommandInputProps = React.ComponentProps<
  typeof CommandPrimitive.Input
>;

export const CommandInput: React.FC<CommandInputProps> = props => {
  const { className, ...otherProps } = props;

  return (
    <div className={cn(classes["root"], className)}>
      <Icon
        className={classes["icon"]}
        data={mdiMagnify}
      />
      <CommandPrimitive.Input
        {...otherProps}
        className={classes["input"]}
      />
    </div>
  );
};
