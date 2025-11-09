import type { MergeElementProps } from "@types";
import { cn } from "@utils/cn";
import classes from "./styles.module.css";

export type DotProps = Omit<
  MergeElementProps<
    "div",
    {
      /**
       * The color scheme of the dot.
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

export const Dot: React.FC<DotProps> = props => {
  const { ref, className, color = "neutral", ...otherProps } = props;

  return (
    <div
      {...otherProps}
      ref={ref}
      className={cn(classes["root"], classes[color], className)}
      data-color={color}
    />
  );
};
