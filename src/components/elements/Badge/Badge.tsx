import { IconButton, type IconButtonProps } from "@components/IconButton";
import type { MergeElementProps } from "@types";
import { cn } from "@utils/cn";
import classes from "./styles.module.css";

export type BadgeAction<E extends React.ElementType = "button"> = Omit<
  IconButtonProps<E>,
  "aria-label" | "aria-labelledby"
> & {
  /**
   * The label used for screen readers.
   */
  label: string;
};

export type BadgeProps<E extends React.ElementType = "button"> = Omit<
  MergeElementProps<
    "div",
    {
      /**
       * The classnames of the component.
       */
      classNames?: Record<"root" | "icon" | "text" | "action", string>;

      /**
       * The content of the badge.
       */
      text: string;

      /**
       * The icon used for the badge.
       */
      icon?: React.ReactNode;

      /**
       * The action button used in the badge.
       */
      action?: BadgeAction<E>;

      /**
       * The color scheme of the badge.
       *
       * @default "neutral"
       */
      color?: "neutral" | "brand" | "positive" | "negative" | "warn" | "info";
    }
  >,
  | "children"
  | "aria-label"
  | "aria-labelledby"
  | "aria-describedby"
  | "defaultValue"
  | "defaultChecked"
>;

export const Badge = <E extends React.ElementType = "button">(
  props: BadgeProps<E>,
) => {
  const {
    ref,
    className,
    classNames,
    text,
    icon,
    action: secondaryAction,
    color = "neutral",
    ...otherProps
  } = props as BadgeProps<"button">;

  const renderIcon = () => {
    if (!icon) return null;

    return (
      <div
        aria-hidden
        className={cn(classes["icon"], classNames?.icon)}
      >
        {icon}
      </div>
    );
  };

  const renderAction = () => {
    if (!secondaryAction) return null;

    const { label, ...etc } = secondaryAction;

    return (
      <IconButton
        {...etc}
        size="sm"
        variant="ghost"
        className={cn(classes["action"], classNames?.action)}
        aria-label={label}
      />
    );
  };

  return (
    <div
      {...otherProps}
      ref={ref}
      className={cn(
        classes["root"],
        classes[color],
        className,
        classNames?.root,
      )}
      data-color={color}
    >
      {renderIcon()}
      <span className={cn(classes["text"], classNames?.text)}>{text}</span>
      {renderAction()}
    </div>
  );
};
