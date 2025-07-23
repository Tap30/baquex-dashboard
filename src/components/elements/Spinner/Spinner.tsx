import type { MergeElementProps } from "@/types";
import { cn } from "@/utils";
import type { WithColorProps } from "../../types.ts";
import { SIZE } from "./constants.ts";
import classes from "./styles.module.css";

export type SpinnerProps = Omit<
  MergeElementProps<
    "div",
    WithColorProps<{
      /**
       * If `true`, the shrink animation is disabled.
       * This only works if variant is `indeterminate`.
       *
       * @default false
       */
      disableShrink?: boolean;

      /**
       * The size of the component.
       * If set to `"auto"`, the icon will get the parent's width and height.
       *
       * @default "auto"
       */
      size?: number | "auto";

      /**
       * The thickness of the circle.
       *
       * @default 4
       */
      thickness?: number;

      /**
       * The value of the progress indicator for the determinate variant.
       * Value between 0 and 100.
       *
       * @default 0
       */
      value?: number;

      /**
       * The variant to use.
       * Use indeterminate when there is no progress value.
       *
       * @default "indeterminate"
       */
      variant?: "determinate" | "indeterminate";
    }>
  >,
  "children"
>;

export const Spinner: React.FC<SpinnerProps> = props => {
  const {
    className,
    style,
    color = "currentcolor",
    variant = "indeterminate",
    disableShrink = false,
    size = "auto",
    thickness = 4,
    value = 0,
    ...otherProps
  } = props;

  const circleStyle: React.CSSProperties = {};
  const rootStyle: React.CSSProperties = {};
  const rootProps: SpinnerProps = {};

  const hasValidSize =
    (typeof size === "number" && !isNaN(size)) ||
    (typeof size === "string" && size === "auto");

  if (!hasValidSize) {
    // eslint-disable-next-line no-console
    console.error(`Expected a valid size prop, received \`size={${size}}\`.`);
  }

  const sizeStyles: React.CSSProperties =
    size === "auto"
      ? {
          width: "100%",
          height: "100%",
        }
      : typeof size === "number"
        ? {
            width: `${size / 16}rem`,
            height: `${size / 16}rem`,
            minWidth: `${size / 16}rem`,
            minHeight: `${size / 16}rem`,
          }
        : {
            width: "1rem",
            height: "1rem",
            minWidth: "1rem",
            minHeight: "1rem",
          };

  if (variant === "determinate") {
    const circumference = 2 * Math.PI * ((SIZE - thickness) / 2);

    rootProps["aria-valuenow"] = Math.round(value);
    rootStyle.transform = "rotate(-90deg)";
    circleStyle.strokeDasharray = circumference.toFixed(3);
    circleStyle.strokeDashoffset = `${(((100 - value) / 100) * circumference).toFixed(3)}px`;
  }

  return (
    <div
      {...otherProps}
      {...rootProps}
      role="progressbar"
      style={{ ...sizeStyles, ...rootStyle, ...style }}
      className={cn(
        classes["root"],
        classes[color],
        classes[variant],
        className,
        {
          [classes["shrinkable"]!]: !disableShrink,
        },
      )}
    >
      <svg
        className={classes["svg"]}
        viewBox={`${SIZE / 2} ${SIZE / 2} ${SIZE} ${SIZE}`}
      >
        <circle
          className={classes["circle"]}
          style={circleStyle}
          cx={SIZE}
          cy={SIZE}
          r={(SIZE - thickness) / 2}
          fill="none"
          strokeWidth={thickness}
        ></circle>
      </svg>
    </div>
  );
};
