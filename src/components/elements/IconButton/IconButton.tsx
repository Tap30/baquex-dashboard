import { Spinner } from "@components/Spinner";
import { cn } from "@utils/cn";
import {
  BaseButton,
  type BaseButtonProps,
} from "../../internals/index.internal.ts";
import classes from "./styles.module.css";

export type IconButtonProps<E extends React.ElementType = "button"> =
  BaseButtonProps<E, "children" | "fluid"> & {
    /**
     * The classnames of the component.
     */
    classNames?: Partial<Record<"root" | "icon", string>>;

    /**
     * The icon of the button.
     */
    icon: React.ReactNode;
  };

export const IconButton = <E extends React.ElementType = "button">(
  props: IconButtonProps<E>,
): React.ReactNode => {
  const {
    as = "button",
    className,
    classNames,
    icon: iconProp,
    pending = false,
    ...otherProps
  } = props as IconButtonProps<"button">;

  const icon = pending ? <Spinner /> : iconProp;

  return (
    <BaseButton
      {...otherProps}
      as={as}
      pending={pending}
      className={cn(classes["root"], className, classNames?.root)}
      data-pending={pending}
    >
      <div
        aria-hidden
        className={cn(classes["icon"], classNames?.icon)}
      >
        {icon}
      </div>
    </BaseButton>
  );
};
