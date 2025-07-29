import type { MergeElementProps } from "@/types";
import { cn } from "@/utils";
import classes from "./styles.module.css";

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

  return (
    <div
      {...otherProps}
      ref={ref}
      className={cn(classes["root"], classes[color], className)}
    >
      {renderIcon()}
      <span className={classes["text"]}>{text}</span>
    </div>
  );
};
