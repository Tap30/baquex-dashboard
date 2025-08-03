import { cn } from "@/utils";
import classes from "./styles.module.css";

export type CommandShortcutProps = React.ComponentPropsWithRef<"span">;

export const CommandShortcut: React.FC<CommandShortcutProps> = props => {
  const { className, ...otherProps } = props;

  return (
    <kbd
      {...otherProps}
      className={cn(classes["root"], className)}
    />
  );
};
