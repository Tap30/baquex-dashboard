import { Spinner } from "@components/Spinner";
import { cn } from "@utils/cn";
import {
  BaseButton,
  type BaseButtonProps,
} from "../../internals/index.internal.ts";
import classes from "./styles.module.css";

export type ButtonProps<E extends React.ElementType = "button"> =
  BaseButtonProps<E, "children"> & {
    /**
     * The classnames of the component.
     */
    classNames?: Record<"root" | "text" | "startIcon" | "endIcon", string>;

    /**
     * The content of the button.
     */
    text: string;

    /**
     * The icon element placed before the text.
     */
    startIcon?: React.ReactNode;

    /**
     * The icon element placed after the text.
     */
    endIcon?: React.ReactNode;
  };

export const Button = <E extends React.ElementType = "button">(
  props: ButtonProps<E>,
) => {
  const {
    as = "button",
    className,
    classNames,
    text,
    startIcon,
    endIcon,
    pending = false,
    fluid = false,
    ...otherProps
  } = props as ButtonProps<"button">;

  const renderStartIcon = () => {
    if (!pending && !startIcon) return null;

    const icon = pending ? <Spinner /> : startIcon;

    return (
      <div
        aria-hidden
        className={cn(
          classes["icon"],
          classes["start-icon"],
          classNames?.startIcon,
        )}
      >
        {icon}
      </div>
    );
  };

  const renderEndIcon = () => {
    if (!endIcon) return null;

    return (
      <div
        aria-hidden
        className={cn(
          classes["icon"],
          classes["end-icon"],
          classNames?.endIcon,
        )}
      >
        {endIcon}
      </div>
    );
  };

  return (
    <BaseButton
      {...otherProps}
      as={as}
      pending={pending}
      fluid={fluid}
      className={cn(classes["root"], className, classNames?.root, {
        [classes["fluid"]!]: fluid,
      })}
      data-pending={pending}
      data-fluid={fluid}
    >
      {renderStartIcon()}
      <span className={cn(classes["text"], classNames?.text)}>{text}</span>
      {renderEndIcon()}
    </BaseButton>
  );
};
