import { IconButton, type IconButtonProps } from "@components/IconButton";
import type { MergeElementProps } from "@types";
import { cn } from "@utils/cn";
import classes from "./styles.module.css";

export type SecondaryBadgeAction = Omit<
  IconButtonProps,
  "aria-label" | "aria-labelledby"
> & {
  /**
   * The label used for screen readers.
   */
  label: string;
};

export type BadgeProps = Omit<
  MergeElementProps<
    "div",
    {
      /**
       * The content of the badge.
       */
      text: string;

      /**
       * The icon used for the badge.
       */
      icon?: React.ReactNode;

      /**
       * The secondary action button used in the badge.
       */
      secondaryAction?: SecondaryBadgeAction;

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
  | "value"
  | "defaultValue"
  | "checked"
  | "defaultChecked"
>;

export const Badge: React.FC<BadgeProps> = props => {
  const {
    ref,
    className,
    text,
    icon,
    secondaryAction,
    color = "neutral",
    ...otherProps
  } = props;

  const renderIcon = () => {
    if (!icon) return null;

    return (
      <div
        aria-hidden
        className={classes["icon"]}
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
        className={classes["action"]}
        aria-label={label}
      />
    );
  };

  return (
    <div
      {...otherProps}
      ref={ref}
      className={cn(classes["root"], classes[color], className)}
    >
      {renderIcon()}
      <span className={classes["text"]}>{text}</span>
      {renderAction()}
    </div>
  );
};
