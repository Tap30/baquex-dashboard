import { Spinner } from "@components/Spinner";
import { cn } from "@utils/cn";
import { BaseButton, type BaseButtonProps } from "../../internals/index.ts";
import classes from "./styles.module.css";

export type IconButtonProps = Omit<
  BaseButtonProps & {
    /**
     * The icon of the button.
     */
    icon: React.ReactNode;
  },
  "children" | "fluid"
>;

export const IconButton: React.FC<IconButtonProps> = props => {
  const { className, icon: iconProp, pending = false, ...otherProps } = props;

  const icon = pending ? <Spinner /> : iconProp;

  return (
    <BaseButton
      {...otherProps}
      pending={pending}
      className={cn(classes["root"], className)}
    >
      <div
        aria-hidden
        className={classes["icon"]}
      >
        {icon}
      </div>
    </BaseButton>
  );
};
